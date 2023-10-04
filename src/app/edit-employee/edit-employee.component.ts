import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee.component.ts',
  template: `
    <h2>
      Edit an Employee
    </h2>
    <app-employee-form [initialState]="employee" (formSubmitted)="editEmployee($event)"></app-employee-form>
  `,
  styles: [
  ]
})
export class EditEmployeeComponent implements OnInit{
  employee: BehaviorSubject<Employee> = new BehaviorSubject({});

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      alert('No id provide')
    }

    this.employeeService.getEmployee(id !).subscribe((employee) =>{
      this.employee.next(employee);
    })
  }

  editEmployee(employee: Employee){
    this.employeeService.updateEmployee(this.employee.value._id || '', employee)
      .subscribe({
        next: () =>{
          this.router.navigate(['/employees'])
        },
        error: (error) => {
          alert('Failed to update employee')
          console.error(error)
        }
      })
  }
}
