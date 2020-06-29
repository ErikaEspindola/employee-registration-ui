import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { EmployeeDetail } from '../entities';
import { EmployeesService } from './../employees.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: EmployeeDetail[] = [];
  filteredList: EmployeeDetail[] = [];

  filter = new FormControl();

  chips = [
    { name: 'Nome', state: false },
    { name: 'Cargo', state: false },
    { name: 'Competências', state: false },
    { name: 'Time', state: false }
  ];

  constructor(private router: Router, private service: EmployeesService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.listEmployees();
  }

  detail(id: number) {
    this.router.navigate(['/detail-employees'], { queryParams: { id } });
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }

  listEmployees() {
    this.service.listEmployees().subscribe((res: any) => {
      this.list = res;

      this.list.forEach(employee => {
        employee.profilePicture = this.sanitizer.bypassSecurityTrustResourceUrl(employee.profilePicture.toString());
        employee.skills = employee.skills.map(skill => skill.toLowerCase())
      });

      this.filteredList = this.list;
    });
  }

  changeSelected(chip) {
    this.chips.forEach(c => c.state = false);
    chip.state = true;
  }

  filterList() {
    this.filteredList = this.list;

    if (this.chips.some(chip => chip.state)) {
      this.chips.forEach((chip, i) => {
        if (chip.state) {
          this.defineFilter(i);
        }
      })
    } else {
      this.filteredList = this.filteredList.filter(el => {
        return el.charge.toLowerCase().includes(this.filter.value.toLowerCase()) ||
          el.skills.find(skill => skill.includes(this.filter.value.toLowerCase())) ||
          el.name.toLowerCase().includes(this.filter.value.toLowerCase()) ||
          el.team.toLowerCase().includes(this.filter.value.toLowerCase())
      });
    }
  }

  defineFilter(i: number) {
    switch (i) {
      case 0:
        this.filteredList = this.filteredList.filter(el =>
          el.name.toLowerCase().includes(this.filter.value.toLowerCase())
        );
        break;
      case 1:
        this.filteredList = this.filteredList.filter(el =>
          el.charge.toLowerCase().includes(this.filter.value.toLowerCase())
        );
        break;
      case 2:
        this.filteredList = this.filteredList.filter(el =>
          el.skills.find(skill => skill.includes(this.filter.value.toLowerCase()))
        );
        break;
      case 3:
        this.filteredList = this.filteredList.filter(el =>
          el.team.toLowerCase().includes(this.filter.value.toLowerCase())
        );
        break;
    }
  }
}
