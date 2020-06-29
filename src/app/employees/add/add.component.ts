import { startWith, map } from 'rxjs/operators';
import { EmployeesService } from './../employees.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  listLength: number;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillControl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
  allskills: string[] = ['HTML', 'CSS', 'Javascript', 'Angular', 'Java', 'Spring Boot', 'MongoDB'];

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  filteredTeams: Observable<string[]>;
  teamsControl = new FormControl();

  filteredCharges: Observable<string[]>;
  chargeControl = new FormControl();

  nameControl = new FormControl();

  uploadFiles: File[] = [];
  experienceList = [
    {
      uploadFiles: [],
      picture: undefined,
      description: new FormControl()
    }
  ];

  contact: FormGroup;
  selectedCharge: string;
  profilePic;

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

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private service: EmployeesService
  ) {
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
    this.listLength = this.route.queryParams['_value'].l;
    console.log(this.listLength);

    this.contact = this.formBuilder.group({
      phone: [''],
      cellPhone: [''],
      workPhone: [''],
      mail: [''],
      facebook: [''],
      linkedin: [''],
      address: ['']
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
      description: new FormControl()
    });
  }

  save() {
    let request = this.mountRequest();

    console.log(request)

    // this.service.addEmployees(request)
    //   .subscribe((res) => console.log(res));
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
      id: this.listLength + 1,
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
