import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		MessagesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		NgbModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressBarModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
