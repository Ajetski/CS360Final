import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { Message, WebSocketService } from '../services/web-socket.service';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

	currentMessage = '';
	errorMessage = '';

	// MatPaginator Inputs
	pageSize = 3;
	pageSizeOptions: number[] = [3, 5, 10, 25, 100];

	// MatPaginator Output
	pageEvent: PageEvent = {
		pageIndex: 0,
		pageSize: this.pageSize,
		length: this.webSocketService.messages.length
	};

	constructor(
		private userService: UserService,
		public webSocketService: WebSocketService
	) { }

	ngOnInit(): void { }

	ngOnDestroy() { }

	sendMessage(form: NgForm) {
		if (this.currentMessage.length > 0) {
			const msg: Message = {
				displayName: this.userService.displayName,
				message: this.currentMessage,
				timestamp: new Date()
			};
			this.webSocketService.sendMessage(msg);
			this.currentMessage = '';
			form.reset();
		}
	}

	signOut() {
		this.userService.signOut();
	}
}
