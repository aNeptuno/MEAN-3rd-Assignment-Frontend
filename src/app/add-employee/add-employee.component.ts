import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';


@Component({
  selector: 'app-add-employee',
  template: `
    <h2 class="text-center m-5">
        Add a New Employee
    </h2>
    <app-employee-form (formSubmitted)="addEmployee($event)"></app-employee-form>
  `,
  styles: [
  ]
})
export class AddEmployeeComponent {

  constructor(
    private router:Router,
    private employeeService: EmployeeService
  ){}

  addEmployee(employee:Employee){
    this.employeeService.createEmployee(employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        }, 
        error: (error) => {
          alert('Failed to create employee')
          console.error(error)
        }
      })
  }
}
