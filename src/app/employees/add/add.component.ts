import { EmployeesService } from './../employees.service';
import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  uploadFiles: File[] = [];
  experienceList = [
    {
      uploadFiles: [],
      picture: undefined,
      description: new FormControl()
    }
  ];

  form: FormGroup;
  contact: FormGroup;
  experienceForm: FormGroup;
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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills = [];

  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private service: EmployeesService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [''],
      charge: [''],
      team: ['']
    });

    this.contact = this.formBuilder.group({
      phone: [''],
      cellPhone: [''],
      workPhone: [''],
      mail: [''],
      facebook: [''],
      linkedin: [''],
      address: ['']
    });

    this.experienceForm = this.formBuilder.group({
      skills: ['']
    });
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

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  addExperience() {
    this.experienceList.push({
      picture: '',
      uploadFiles: [],
      description: new FormControl()
    });
  }

  save() {
    let formData = new FormData();
    formData.append('file', this.uploadFiles[0], this.uploadFiles[0].name);

    let request = this.mountRequest();

    this.service.addEmployees(request)
      .subscribe((res) => console.log(res));
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
      id: 3,
      name: this.form.value.name,
      charge: this.form.value.charge,
      team: this.form.value.team,
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
