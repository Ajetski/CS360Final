import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	username = '';
	displayName = '';
	password = '';
	confirmPassword = '';
	mode = 'Login'

	constructor(
		public webSocketService: WebSocketService
	) { }

	ngOnInit(): void {
	}

	closeErrorAlert() {
		this.webSocketService.closeErrorMessage();
	}

	login(form: HTMLFormElement) {
		if (form.checkValidity()) {
			this.webSocketService.login({
				username: this.username,
				password: this.password
			});
		}
		else {
			this.webSocketService.setErrorMessage("Cannot submit with invalid data");
		}
		this.password = '';
		this.confirmPassword = '';
	}

	register(form) {
		if (form.checkValidity()) {
			this.webSocketService.register({
				username: this.username,
				displayName: this.displayName,
				password: this.password
			});
		}
		else {
			this.webSocketService.setErrorMessage("Cannot submit with invalid data");
		}
		this.password = '';
		this.confirmPassword = '';
	}
}
