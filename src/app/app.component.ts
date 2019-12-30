import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs';
import { Router } from '@angular/router';

import { TransferService } from './services/transfer.service';
import { ApiService } from './services/api.service';

import { User } from '../models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TransferService, ApiService]
})
export class AppComponent implements OnInit{

  	title = 'PublishesCells';
  	public user: User;
    public logo: string;

  	constructor(
      private _transferService: TransferService,
      private _router: Router,
      private _apiService: ApiService
  	){
      let user: User = JSON.parse(localStorage.getItem("user"));
      if(user != null || user != undefined){
        this.user = user;
      }else{
        this.user = new User(null, null, null, null, null, null, null, null, null, 0, null); 
      }
      this._transferService.createSource$.subscribe(
        result => {
          this.user = result; 
        }        
      );
  	}

  	Logout(){
  		let logUser = new User(null, null, null, null, null, null, null, null, null, 0, null);
      this.user = logUser;
      localStorage.removeItem("user");
      this.RedirectToHome();
  	}

    RedirectToHome(){
      this._router.navigate(['/home']);
    }

    ngOnInit(){
      this._apiService.GetNameLogo().subscribe(
        result => {
          this.logo = result.rows[0].LOGO;
        },
        err => {
          alert("Error al cargar el logo");
        }
      );
    }

}
