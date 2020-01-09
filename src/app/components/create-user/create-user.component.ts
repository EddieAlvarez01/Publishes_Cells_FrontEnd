import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

	public name: string;
	public lastName: string;
	public password: string;
	public email: string;
	public phone: string;
	public gender: string;
	public birthDate: string;
	public address: string;
	public role: string;
	public registrationDate: string;
	public idMemberClass: number;
    public availableCredit: number;
    public state: number;

  	constructor(
  		private _apiService: ApiService
  	) { 
  		this.gender = 'M';
  		this.role = '1';
  	}

  	ngOnInit() {
  	}

  	onSubmitForm(){
  		let roleInt = parseInt(this.role);
  		this.registrationDate = moment().format('DD-MM-YYYY HH:mm:ss');
  		let birthDay = moment(this.birthDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
  		if(roleInt == 1 || roleInt == 2){
  			this.state = 2;
  			this.idMemberClass = 1;
  			this._apiService.RegisterUser(this.name, this.lastName, this.password, this.email, this.phone, null, this.gender, birthDay, this.registrationDate, this.address,
  											0, 0, this.state, roleInt, 1).subscribe(
  												result => {
  													toastr.success("Usuario creado exitosamente");
  												},
  												err => {
  													toastr.error("Error al crear usuario");
  												}
  											);
  		}else{
  			this.state = 1;
  			this.idMemberClass = Math.floor(Math.random() * 5);
      		if(this.idMemberClass == 0) this.idMemberClass = 1;
      		switch(this.idMemberClass){
        		case 1:
          			this.availableCredit = 50000;
        		break;
        		case 2:
			        this.availableCredit = 25000;
			    break;
			    case 3:
			       	this.availableCredit = 10000;
			    break;
			    case 4:
			        this.availableCredit = 5000;
			    break;
			    case 5:
			        this.availableCredit = 1000;
			    break;
			    default:
			        alert("Error con el idMemberClass");
      		}
      		if(this.idMemberClass <= 5){
      			this._apiService.RegisterUser(this.name, this.lastName, this.password, this.email, this.phone, null, this.gender, birthDay, this.registrationDate, this.address,
  											this.availableCredit, 0, this.state, roleInt, this.idMemberClass).subscribe(
  												result => {
  													this._apiService.SendConfirmation(this.email, this.name).subscribe(
  														result => {
  															toastr.success("Usuario creaado exitosamente");
  														},
  														err => {
  															toastr.error("Error al enviar el correo de confirmación");
  														}
  													);
  												},
  												err => {
  													toastr.error("Error al crear usuario");
  												}
  											);
      		}
  		}
  	}

}
