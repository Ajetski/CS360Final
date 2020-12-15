import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

export interface Message {
	displayName: string;
	message: string;
	timestamp: Date;
};

export interface Login {
	username: string;
	displayName?: string;
	password: string;
	error?: string;
}

export interface Register {
	username: string;
	displayName: string;
	password: string;
	error?: string;
}

export interface WebSocketMessage {
	type: string;
	content: Message | Login | Register;
}

@Injectable({
	providedIn: 'root'
})
export class WebSocketService {

	ws: WebSocket;
	messages: Message[] = [];
	errorMessage = '';
	showErrorMessage = false;

	constructor(
		private userService: UserService
	) {
		this.ws = new WebSocket(environment.wsUrl);
		this.ws.onmessage = (event) => {
			const webSocketMessage: WebSocketMessage = JSON.parse(event.data);
			console.log(webSocketMessage);
			if (webSocketMessage.type === 'message') {
				const msg = webSocketMessage.content as Message;
				this.messages.unshift(msg);
			} else if (webSocketMessage.type === 'login') {
				const result = webSocketMessage.content as Login;
				if (result.error != null) {
					this.setErrorMessage(result.error);
				} else {
					this.userService.setUser(result.username, result.displayName, result.password);
				}
			}
			else if (webSocketMessage.type === 'register') {
				const result = webSocketMessage.content as Register;
				if (result.error != null) {
					this.setErrorMessage(result.error);
				} else {
					this.userService.setUser(result.username, result.displayName, result.password);
				}
			}
		}
	}

	sendMessage(msg: Message) {
		const webSocketMessage: WebSocketMessage = {
			type: 'message',
			content: msg
		};
		this.ws.send(JSON.stringify(webSocketMessage));
		this.messages.unshift(msg);
	}

	login(login: Login) {
		const webSocketMessage: WebSocketMessage = {
			type: 'login',
			content: login
		};
		this.ws.send(JSON.stringify(webSocketMessage));
	}

	register(register: Register) {
		const webSocketMessage: WebSocketMessage = {
			type: 'register',
			content: register
		};
		this.ws.send(JSON.stringify(webSocketMessage));
	}

	setErrorMessage(msg: string) {
		this.errorMessage = msg;
		this.showErrorMessage = true;
	}

	closeErrorMessage() {
		this.errorMessage = '';
		this.showErrorMessage = false;
	}
}
