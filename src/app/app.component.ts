import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  	title = 'PublishesCells';
  	public user: User;

  	constructor(

  	){
  		this.user = new User(null, null, null, null, null, null, null, null, null, 0, null);
  	}

  	Logout(){
  		
  	}

}
