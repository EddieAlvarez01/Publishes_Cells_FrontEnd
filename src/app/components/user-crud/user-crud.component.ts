import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

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

  	constructor(
  		private _apiService: ApiService,
  		private _router: Router
  	) { }

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

}
