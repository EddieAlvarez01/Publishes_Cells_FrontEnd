import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ApiService]
})
export class RegisterComponent implements OnInit {

  	public name: string;
  	public lastName: string;
  	public password: string;
  	public email: string;
  	public phone: string;
  	public birhtday: string;
  	public address: string;
  	public gender: string;
    public registrationDate: string;
    public state: number;
    public role: number;
    public idMemberClass: number;
    public availableCredit: number;

  	constructor(
      private _router: Router,
      private _apiService: ApiService
    ) { 
  		this.gender = "M";
  	}

  	ngOnInit() {
  	}

  	onSubmitForm(){
  		this.registrationDate = moment().format('DD-MM-YYYY HH:mm:ss');
      console.log(this.birhtday);
      this.birhtday = moment(this.birhtday, 'YYYY-MM-DD').format('DD-MM-YYYY');
      this.state = 1;
      this.role = 3;
      this.idMemberClass = Math.floor(Math.random() * 5);
      console.log(this.idMemberClass);
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
        //llama al servicio para registrar un usuario
        this._apiService.RegisterUser(this.name, this.lastName, this.password, this.email, this.phone, null, this.gender, this.birhtday, this.registrationDate, this.address, 
                                      this.availableCredit, 0, this.state, this.role, this.idMemberClass).subscribe(
                                        result => {
                                          this._apiService.SendConfirmation(this.email, this.name).subscribe(
                                            result => {
                                              alert("Usuario registrado correctamente");
                                              this.RedirectLogin();
                                            },
                                            err => {
                                              alert("Error al mandar el correo de confirmacion");
                                            }
                                          );
                                        },
                                        err => {
                                          alert("Error en el sevidor al registrar el usuario");
                                        }
                                      );
      }
  	}

    RedirectHome(){
      this._router.navigate(['/home']);
    }

    RedirectLogin(){
      this._router.navigate(['/login']);
    }

}
