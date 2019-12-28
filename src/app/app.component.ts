import { Component } from '@angular/core';
import { Subscription }   from 'rxjs';
import { Router } from '@angular/router';

import { TransferService } from './services/transfer.service';

import { User } from '../models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TransferService]
})
export class AppComponent {

  	title = 'PublishesCells';
  	public user: User;

  	constructor(
      private _transferService: TransferService,
      private _router: Router
  	){
  		this.user = new User(null, null, null, null, null, null, null, null, null, 0, null);
      this._transferService.createSource$.subscribe(
        result => {
          this.user = result; 
        }        
      );
  	}

  	Logout(){
  		let logUser = new User(null, null, null, null, null, null, null, null, null, 0, null);
      this.user = logUser;
      localStorage.setItem("user", JSON.stringify(logUser));
      this.RedirectToHome();
  	}

    RedirectToHome(){
      this._router.navigate(['/home']);
    }

}
