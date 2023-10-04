import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  template: `
    <h2 class="text-center m-5"> Users List </h2>
    <table class="table table.striped table-bordered">
      <thead>
        <tr>
          <th>Name </th>
          <th>Email </th>
          <th>Genre </th>
          <th>Action </th>
        </tr>
      </thead>
      <tbody>
          <tr *ngFor="let user of users$ | async">
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td>{{user.genre}}</td>
              <td>
                  <button class="btn btn-info me-1" [routerLink] = "['edit/', user._id]">Edit</button>
                  <button class="btn btn-danger" (click)="deleteUser(user._id || '')">Delete</button>
              </td>
          </tr>
      </tbody>
  </table>

<button class="btn btn-primary mt-3" [routerLink] = "['new/']">Add a new User</button>
  `,
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]> = new Observable();

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.fetchUsers();
  }

  deleteUser(id:string): void{
    this.userService.deleteUser(id).subscribe({
      next: () => this.fetchUsers()
    })
  }

  private fetchUsers():void{
    this.users$ = this.userService.getUsers();
  }
}
