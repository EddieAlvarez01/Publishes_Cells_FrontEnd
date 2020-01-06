import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { TransferService } from '../../services/transfer.service';

import { User } from '../../../models/user';

//Libreria JS
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [ApiService]
})
export class EditProfileComponent implements OnInit {

  	public user: User
  	public address: string;
  	public phone: string;
  	public fileToUploadImage: Array<File>;

  	constructor(
  		private _apiService: ApiService,
  		private _transferService: TransferService
  	) { 
  		this.fileToUploadImage = new Array();
  		this.user = this.user = JSON.parse(localStorage.getItem("user"));
  	}

  	ngOnInit() {
  		this._apiService.GetUserForEdit(this.user.id).subscribe(
  			result => {
  				let rows = result.rows[0];
  				this.address = rows.ADDRESS;
  				this.phone = rows.PHONE;
  			},
  			err => {
  				toastr.error("Error al traer la información del usuario");
  			}
  		);
  	}

  	OnSubmit(){
  		if(this.fileToUploadImage.length >  0){
  			this._apiService.makeFileRequest([], this.fileToUploadImage, 'image')
  			.then((result: any) => {
  				let nameImage = result.image;
  				this._apiService.UpdateUserProfile(this.user.id, this.user.name, this.user.lastName, this.user.email, this.address, this.phone, this.user.password, nameImage).subscribe(
  					result => {
  						this.user.photo = nameImage;
  						toastr.success("Usuario actualizado correctamente");
  						localStorage.setItem("user", JSON.stringify(this.user));
  						this.SetUserNav();
  					},
  					err => {
  						toastr.error("Error al actualizar el usuario");
  					}
  				);
  			})
  			.catch((err) => {
  				toastr.error(err);
  			});
  		}else{
  			this._apiService.UpdateUserProfile(this.user.id, this.user.name, this.user.lastName, this.user.email, this.address, this.phone, this.user.password, null).subscribe(
  					result => {
  						toastr.success("Usuario actualizado correctamente");
  						localStorage.setItem("user", JSON.stringify(this.user));
  						this.SetUserNav();
  					},
  					err => {
  						toastr.error("Error al actualizar el usuario");
  					}
  			);
  		}
  	}

  	fileEvent(file: any){
  		this.fileToUploadImage = <Array<File>>file.target.files;
  	}

  	SetUserNav(){
  		this._transferService.CreateUserLogin(this.user);
  	}

}
