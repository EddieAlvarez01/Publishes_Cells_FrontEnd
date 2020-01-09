import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-user-crud',
  templateUrl: './edit-user-crud.component.html',
  styleUrls: ['./edit-user-crud.component.css'],
  providers: [ApiService]
})
export class EditUserCrudComponent implements OnInit {

	public idUser: number;
	public user: any;

  	constructor(
  		private _apiService: ApiService,
  		private _route: ActivatedRoute,
  		private _router: Router
  	) { }

  	ngOnInit() {
  		this._route.params.subscribe((params: Params) => {
  			this.idUser = parseInt(params.id);
  			this._apiService.GetUserForEditCrud(this.idUser).subscribe(
  				result => {
  					this.user = result.rows[0];
  				},
  				err => {
  					toastr.error("Error al traer la información del usuario");
  				}
  			);
  		});
  	}

  	OnSubmit(){
  		this._apiService.UpdateUserCrud(this.idUser, this.user.NAME, this.user.LASTNAME, this.user.PASSWORD, this.user.EMAIL, this.user.PHONE, this.user.ADDRESS).subscribe(
  			result => {
  				toastr.success("Usuario editado correctamente");
  				this._router.navigate(['/userCrud']);
  			},
  			err => {
  				toastr.error("No se pudo editar la información de este usuario");
  			}
  		);
  	}

}
