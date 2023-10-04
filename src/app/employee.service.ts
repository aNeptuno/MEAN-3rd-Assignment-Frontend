import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = `${environment.baseURL}`;
  private employees$: Subject<Employee[]> = new Subject;
  

  constructor(private httpClient: HttpClient) { }

  /** Refreshes the list of employees by making a GET request to the server */
  private refreshEmployees(){
    this.httpClient.get<Employee[]>(`${this.url}/employees`)
    .subscribe(employees => {
      this.employees$.next(employees);
    })
  }

  getEmployees(): Subject<Employee[]>{
    this.refreshEmployees();
    return this.employees$;
  }

  getEmployee(id:string):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`)
  }

  createEmployee(employee:Employee):Observable<string>{
    return this.httpClient.post(`${this.url}/employees`, employee, {responseType: 'text'})
  }

  updateEmployee(id:string, employee:Employee):Observable<string>{
    return this.httpClient.put(`${this.url}/employees/${id}`, employee, {responseType: 'text'})
  }

  deleteEmployee(id:string):Observable<string>{
    return this.httpClient.delete(`${this.url}/employees/${id}`, {responseType: 'text'})
    
  }



}
