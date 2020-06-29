import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { EmployeesService } from '../employees.service';
import { EmployeeDetail } from '../entities';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  // Auxiliar

  id: number;
  profilePic;
  skills: string[] = [];
  uploadFiles: File[] = [];
  employeeDetail: EmployeeDetail;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // Control

  visible: boolean = true;
  removable: boolean = true;
  selectable: boolean = true;

  //Form

  filteredSkills: Observable<string[]>;
  skillControl = new FormControl();

  filteredTeams: Observable<string[]>;
  teamsControl = new FormControl();

  filteredCharges: Observable<string[]>;
  chargeControl = new FormControl();

  nameControl = new FormControl();
  contact: FormGroup;

  // Lists

  experienceList = [
    {
      uploadFiles: [],
      picture: undefined,
      description: ''
    }
  ];

  allskills: string[] = [
    'HTML',
    'CSS',
    'Javascript',
    'Angular',
    'Java',
    'Spring Boot',
    'MongoDB'
  ];

  chargeList = [
    'Assessor',
    'CEO',
    'Cientista de dados',
    'Desenvolvedor',
    'Engenheiro de Software',
    'Estagiário',
    'Gerente',
  ];

  teamList = [
    'Squad Inovação',
    'Squad Engenharia',
    'Squad IA'
  ];

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private service: EmployeesService,
    private location: Location
  ) {
    this.id = this.route.queryParams['_value'].id;

    this.filteredSkills = this.skillControl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill, this.allskills) : this.allskills.slice()));

    this.filteredTeams = this.teamsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.teamList))
    );

    this.filteredCharges = this.chargeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.chargeList))
    );
  }

  ngOnInit() {
    this.contact = this.formBuilder.group({
      phone: [''],
      cellPhone: [''],
      workPhone: [''],
      mail: [''],
      facebook: [''],
      linkedin: [''],
      address: ['']
    });

    this.service.getEmployee(this.id)
      .subscribe((res: EmployeeDetail) => {
        this.employeeDetail = res;

        let file = new File([], null, null);
        this.uploadFiles.push(file);

        this.nameControl.setValue(res.name);
        this.teamsControl.setValue(res.team);
        this.chargeControl.setValue(res.charge);

        this.profilePic = this.sanitizer.bypassSecurityTrustResourceUrl(res.profilePicture.toString());

        this.experienceList = res.professionalExperience.map(exp => {
          return {
            picture: this.sanitizer.bypassSecurityTrustResourceUrl(exp.experienceImage.toString()),
            description: exp.description,
            uploadFiles: this.uploadFiles
          }
        });

        this.contact.setValue({
          phone: res.contact.phone,
          cellPhone: res.contact.cellPhone,
          workPhone: res.contact.workPhone,
          mail: res.contact.mail,
          facebook: res.contact.facebook,
          linkedin: res.contact.linkedin,
          address: res.contact.address
        });

        this.skills = res.skills;
      });
  }

  private _filter(value: string, array): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  getBase64 = async (file, state, i) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (state === 1) {
        this.profilePic = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
      } else {
        this.experienceList[i].picture = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
      }
    };
  }

  async onFilesAdded(files: any) {
    this.uploadFiles = files.addedFiles;
    await this.getBase64(new Blob(this.uploadFiles), 1, 0);
  }

  async onFilesAdded2(files: any, i: number) {
    this.experienceList[i].uploadFiles = files.addedFiles;
    await this.getBase64(new Blob(this.experienceList[i].uploadFiles), 2, i);
  }

  onRemove(event) {
    this.uploadFiles.splice(this.uploadFiles.indexOf(event), 1);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skills.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.skillControl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillControl.setValue(null);
  }

  addExperience() {
    this.experienceList.push({
      picture: '',
      uploadFiles: [],
      description: ''
    });
  }

  save() {
    let request = this.mountRequest();

    this.service.editEmployee(request)
      .subscribe(() => this.location.back());
  }

  mountProfessionalExperience() {
    return this.experienceList.map(exp => {
      return {
        experienceImage: exp.picture.changingThisBreaksApplicationSecurity,
        description: exp.description
      };
    })
  }

  mountRequest() {
    return {
      id: this.employeeDetail.id,
      name: this.nameControl.value,
      charge: this.chargeControl.value,
      team: this.teamsControl.value,
      profilePicture: this.profilePic.changingThisBreaksApplicationSecurity,
      professionalExperience: this.mountProfessionalExperience(),
      skills: this.skills,
      contact: {
        phone: this.contact.value.phone,
        cellPhone: this.contact.value.cellPhone,
        workPhone: this.contact.value.workPhone,
        mail: this.contact.value.mail,
        facebook: this.contact.value.facebook,
        linkedin: this.contact.value.linkedin,
        address: this.contact.value.address
      }
    }
  }
}
