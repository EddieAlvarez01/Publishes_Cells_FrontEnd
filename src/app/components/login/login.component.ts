import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { TransferService } from '../../services/transfer.service';

import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

	public email: string;
	public password: string;
	public user: User;
  	
  	constructor(
  		private _apiService: ApiService,
  		private _transferService: TransferService,
  		private _router: Router
  	) { }

  	ngOnInit() {
  		this.user = new User(null, null, null, null, null, null, null, null, null, 0, null);
  	}

  	onSubmitLogin(){
  		this._apiService.LoginUser(this.email, this.password).subscribe(
  			result => {
  				let user: any[] = result.rows;
  				if(user.length > 0){
  					switch(user[0].STATE){
  						case 1:
  							alert("Error: Verifique su correo electronico");
  						break;
  						case 2:
  							this.user.id = user[0].ID;
  							this.user.name = user[0].NAME;
  							this.user.lastName = user[0].LASTNAME;
  							this.user.password = user[0].PASSWORD;
  							this.user.email = user[0].EMAIL;
  							this.user.photo = user[0].PHOTO;
  							this.user.registrationDate = user[0].REGISTRATIONDATE;
  							this.user.availableCredit = user[0].AVAILABLECREDIT;
  							this.user.state = user[0].STATE;
  							this.user.role = user[0].IDROLE;
  							this.user.shoppingCart = user[0].IDSHOPPINGCART;
  							switch(this.user.role){
  								case 1:
  									localStorage.setItem("user", JSON.stringify(this.user));
                    this.SetUserNav();
                    this.RedirectHomeAdmin();
  								break;
  								case 2:
                    localStorage.setItem("user", JSON.stringify(this.user));
                    this.SetUserNav();
                    this.RedirectHomeHelpDesk();
  								break;
  								case 3:
  									localStorage.setItem("user", JSON.stringify(this.user));
  									this.SetUserNav();
  									this.RedirectShop();
  								break;
  								default:
  									alert("Error no existe el rol");
  							}
  						break;
  						case 0:
  							alert("Error: Su cuenta ha sido dada de baja");
  						break;
  						default:
  							alert("Error el estado del usuario, no existe");
  					}
  				}else{
  					alert("Credenciales incorrectos");
  				}
  			},
  			err => {
  				alert("Error en el servidor");
  			}
  		);
  	}

  	SetUserNav(){
  		this._transferService.CreateUserLogin(this.user);
  	}

  	RedirectBulkLoad(){
  		this._router.navigate(['/bulkLoad']);
  	}

    RedirectShop(){
      this._router.navigate(['/catalogue']);
    }

    RedirectHomeAdmin(){
      this._router.navigate(['/configHome']);
    }

    RedirectHomeHelpDesk(){
      this._router.navigate(['/selectChat']);
    }

}
