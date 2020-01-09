import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { User } from '../../../models/user';

//Libreria JS
import * as toastr from 'toastr';
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css'],
  providers: [ApiService]
})
export class UserCrudComponent implements OnInit {

	 public userList: any[];
   public user: User;

  	constructor(
  		private _apiService: ApiService,
  		private _router: Router
  	) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }

  	ngOnInit() {
  		this._apiService.GetUserCrud().subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){	
  					this.userList = rows;
  				}else{
  					toastr.info("No hay usuarios para mostrar");
  				}
  			},
  			err => {
  				toastr.error("Error al cargar los usuarios");
  			}
  		);
  	}

  	RedirectCreateUser(){
  		this._router.navigate(['/createUser']);
  	}

    DeleteUser(id: number){
      this._apiService.DeleteUserCrud(id).subscribe(
        result => {
          toastr.success("Usuario eliminado correctamente");
          let indexErase: number;
          this.userList.forEach((element, index) => {
            if(element.ID == id){
              indexErase = index;
              return;
            }
          });
          this.userList.splice(indexErase, 1);
        },
        err => {
          toastr.error("Error al eliminar el usuario");
        }
      );
    }

    Unsubscribe(id: number){
      this._apiService.UpdateState(id, this.user.id, 2).subscribe(
        result => {
          var idErase;
          this.userList.forEach((element, index) => {
            if(element.ID == id){
              idErase = index;
              return;
            }
          });
          this.userList[idErase].STATE = 3;
        },
        err => {
          toastr.error("Error al dar de baja usuario");
        }
      );
    }

    ToRegister(id: number){
      this._apiService.UpdateState(id, this.user.id, 1).subscribe(
        result => {
          var idErase;
          this.userList.forEach((element, index) => {
            if(element.ID == id){
              idErase = index;
              return;
            }
          });
          this.userList[idErase].STATE = 2;
        },
        err => {
          toastr.error("Error al dar de alta el usuario");
        }
      );
    }

}
