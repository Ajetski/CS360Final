import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface User {
	username: string;
	displayName: string;
	password: string;
};

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private user: User;

	constructor(
		private http: HttpClient
	) { }

	get username() {
		if (this.user == null)
			return null;
		return this.user.username;
	}

	get displayName() {
		if (this.user == null)
			return null;
		return this.user.displayName;
	}

	get isLoggedIn() {
		return this.user != null;
	}

	setUser(username: string, displayName: string, password: string) {
		this.user = {
			username,
			displayName,
			password
		};
	}

	signOut() {
		this.user = null;
	}
}
