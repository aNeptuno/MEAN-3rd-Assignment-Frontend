import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private url = `${environment.baseURL}`;
	private users$: Subject<User[]> = new Subject();

	constructor(private httpClient: HttpClient) {}

	/** Refreshes the list of Users by making a GET request to the server */
	private refreshUsers() {
		this.httpClient.get<User[]>(`${this.url}/users`).subscribe(users => {
			this.users$.next(users);
		});
	}

	getUsers(): Subject<User[]> {
		this.refreshUsers();
		return this.users$;
	}

	getUser(id: string): Observable<User> {
		return this.httpClient.get<User>(`${this.url}/users/${id}`);
	}

	createUser(user: User): Observable<string> {
		return this.httpClient.post(`${this.url}/users`, user, {
			responseType: 'text',
		});
	}

	updateUser(id: string, user: User): Observable<string> {
		return this.httpClient.put(`${this.url}/users/${id}`, user, {
			responseType: 'text',
		});
	}

	deleteUser(id: string): Observable<string> {
		return this.httpClient.delete(`${this.url}/users/${id}`, {
			responseType: 'text',
		});
	}
}
