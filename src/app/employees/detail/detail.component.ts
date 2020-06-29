import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import Constants from '../constants';
import { EmployeesService } from './../employees.service';
import { ContactList, EmployeeDetail } from './../entities';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id: number;
  employeeDetails: EmployeeDetail;
  contactList: ContactList[] = Constants.contactList;

  constructor(
    private route: ActivatedRoute,
    private service: EmployeesService,
    private sanitizer: DomSanitizer,
    private router: Router
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

  editEmployee() {
    this.router.navigate(['/edit-employee'], { queryParams: { id: this.id } });
  }
}
