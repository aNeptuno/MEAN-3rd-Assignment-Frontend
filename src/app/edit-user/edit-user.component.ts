import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User} from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user.component.ts',
  template: `
    <h2>
      Edit an User
    </h2>
    <app-user-form [initialState]="user" (formSubmitted)="editUser($event)"></app-user-form>
  `,
  styles: [
  ]
})
export class EditUserComponent implements OnInit{
  user: BehaviorSubject<User> = new BehaviorSubject({});

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private userService: UserService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      alert('No id provide')
    }

    this.userService.getUser(id !).subscribe((user) =>{
      this.user.next(user);
    })
  }

  editUser(user: User){
    this.userService.updateUser(this.user.value._id || '', user)
      .subscribe({
        next: () =>{
          this.router.navigate(['/users'])
        },
        error: (error) => {
          alert('Failed to update user')
          console.error(error)
        }
      })
  }
}
