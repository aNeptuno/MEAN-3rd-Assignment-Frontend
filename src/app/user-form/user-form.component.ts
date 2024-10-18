import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-user-form',
	template: `
		<form
			class="user-form"
			autocomplete="off"
			[formGroup]="userForm"
			(ngSubmit)="submitForm()"
		>
			<div class="form-floating mb-3">
				<input
					class="form-control"
					type="text"
					id="name"
					formControlName="name"
					placeholder="Name"
					required
				/>
				<label for="name">Name </label>
			</div>

			<div
				*ngIf="name.invalid && (name.dirty || name.touched)"
				class="alert alert-danger"
			>
				<div *ngIf="name.errors?.['required']">Name is required</div>
				<div *ngIf="name.errors?.['minLength']">
					Name must be at least 3 characters long
				</div>
			</div>

			<div class="form-floating mb-3">
				<input
					class="form-control"
					type="text"
					formControlName="email"
					placeholder="email"
					required
				/>
				<label for="email">email </label>
			</div>

			<div
				*ngIf="email.invalid && (email.dirty || email.touched)"
				class="alert alert-danger"
			>
				<div *ngIf="email.errors?.['required']">email is required</div>
				<div *ngIf="email.errors?.['minLength']">
					email must be at least 5 characters long
				</div>
			</div>

			<div class="mb-3">
				<span>Gender</span>
				<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						formControlName="genre"
						name="genre"
						id="genre-woman"
						value="woman"
						required
					/>
					<label class="form-check-genre" for="genre-woman">Woman</label>
				</div>
				<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						formControlName="genre"
						name="genre"
						id="genre-men"
						value="men"
					/>
					<label class="form-check-genre" for="genre-men">Men</label>
				</div>
				<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						formControlName="genre"
						name="genre"
						id="genre-other"
						value="other"
					/>
					<label class="form-check-genre" for="genre-other">Other</label>
				</div>
			</div>

			<button
				class="btn btn-primary"
				type="submit"
				[disabled]="userForm.invalid"
			>
				Add user
			</button>
		</form>
	`,
	styles: [
		`
			.user-form {
				max-width: 560px;
				margin-left: auto;
				margin-right: auto;
			}
		`,
	],
})
export class UserFormComponent implements OnInit {
	@Input()
	initialState: BehaviorSubject<User> = new BehaviorSubject({});

	@Output()
	formValuesChanged = new EventEmitter<User>();

	@Output()
	formSubmitted = new EventEmitter<User>();

	userForm: FormGroup = new FormGroup({});

	constructor(private fb: FormBuilder) {}

	get name() {
		return this.userForm.get('name')!;
	}
	get email() {
		return this.userForm.get('email')!;
	}
	get genre() {
		return this.userForm.get('genre')!;
	}

	ngOnInit(): void {
		this.initialState.subscribe(user => {
			this.userForm = this.fb.group({
				name: [user.name, [Validators.required]],
				email: [user.email, [Validators.required, Validators.minLength(5)]],
				genre: [user.genre, [Validators.required]],
			});
		});

		this.userForm.valueChanges.subscribe(val => {
			this.formValuesChanged.emit(val);
		});
	}

	submitForm() {
		this.formSubmitted.emit(this.userForm.value);
	}
}
