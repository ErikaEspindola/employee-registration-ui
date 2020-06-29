import { EmployeesService } from './../employees.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: any[] = [];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private router: Router, private service: EmployeesService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.listEmployees();
  }

  listEmployees() {
    this.service.listEmployees().subscribe((res: any) => {
      this.list = res;
      this.list.forEach(employee => {
        employee.profilePicture = this.sanitizer.bypassSecurityTrustResourceUrl(employee.profilePicture.toString());
      });
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  detail(id: number) {
    this.router.navigate(['/detail-employees'], { queryParams: { id } });
  }

  addEmployee() {
    this.router.navigate(['/add-employee'], { queryParams: { l: this.list.length } });
  }
}
