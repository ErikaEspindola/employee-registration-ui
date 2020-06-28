import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private httpClient: HttpClient) { }

  addEmployees(request) {
    return this.httpClient.post(environment.url + 'addEmployee', request)
  }

  listEmployees() {
    return this.httpClient.get(environment.url + 'listEmployees');
  }
}
