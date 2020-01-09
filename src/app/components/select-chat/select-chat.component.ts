import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

import { User } from '../../../models/user';

//Libreria JS
import * as toastr from 'toastr';
declare var $:any;

@Component({
  selector: 'app-select-chat',
  templateUrl: './select-chat.component.html',
  styleUrls: ['./select-chat.component.css'],
  providers: [ApiService]
})
export class SelectChatComponent implements OnInit {

	public roomList: any[];
	public user: User;

  	constructor(
  		private _apiService: ApiService,
  		private _router: Router
  	) { 
  		this.user = JSON.parse(localStorage.getItem("user"));
  	}

  	ngOnInit() {
  		this._apiService.GetRoomUser(this.user.id).subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.roomList = rows;
  				}else{
  					toastr.info("No hay rooms para mostrar");
  				}
  			},
  			err => {
  				toastr.error("Error al traer los rooms");
  			}
  		);
  	}

  	EnterRoom(idRoom: number){
  		this._router.navigate(['/chatView/' + idRoom]);
  	}

}
