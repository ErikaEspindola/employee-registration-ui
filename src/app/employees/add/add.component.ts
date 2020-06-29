import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DomSanitizer } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import Constants from '../constants';
import { EmployeesService } from './../employees.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  selectedCharge: string;
  profilePic;
  
  visible = true;
  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];

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
  
  skills: string[] = [];
  uploadFiles: File[] = [];
  teamList: string[] = Constants.teamList;
  allskills: string[] = Constants.skillsList;
  chargeList: string[] = Constants.chargeList;
  
  experienceList = [
    {
      uploadFiles: [],
      picture: undefined,
      description: new FormControl()
    }
  ];

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private router: Router,
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

    this.service.addEmployees(request)
      .subscribe(() => this.router.navigate(['/list-employees']));
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
