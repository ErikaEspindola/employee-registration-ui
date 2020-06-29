import { ContactList, EmployeeDetail } from './../entities';
import { EmployeesService } from './../employees.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id: number;
  employeeDetails: EmployeeDetail;

  contactList: ContactList[] = [
    {
      icon: 'phone',
      text: ''
    },
    {
      icon: 'mobile',
      text: ''
    },
    {
      icon: 'building',
      text: ''
    },
    {
      icon: 'envelope-o',
      text: ''
    },
    {
      icon: 'facebook',
      text: ''
    },
    {
      icon: 'linkedin',
      text: ''
    }
  ];


  constructor(
    private route: ActivatedRoute,
    private service: EmployeesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.id = this.route.queryParams['_value'].id;

    this.service.getEmployee(this.id)
      .subscribe((res: EmployeeDetail) => {
        this.employeeDetails = res;
        this.employeeDetails.profilePicture = this.sanitizer.bypassSecurityTrustResourceUrl(this.employeeDetails.profilePicture.toString());
        this.employeeDetails.professionalExperience.forEach(exp => {
          exp.experienceImage = this.sanitizer.bypassSecurityTrustResourceUrl(exp.experienceImage.toString());
        });

        this.defineContacts();
      });
  }

  defineContacts() {
    let contact: string[] = Object.values(this.employeeDetails.contact);
    contact.pop();

    contact.forEach((ct, i) => {
      this.contactList[i].text = ct;
    });
  }
}
