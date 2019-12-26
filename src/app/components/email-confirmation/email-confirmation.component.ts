import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
  providers: [ApiService]
})
export class EmailConfirmationComponent implements OnInit {

	public email: string;

  	constructor(
  		private _router: Router,
  		private _route: ActivatedRoute,
  		private _apiService: ApiService
  	) { }

  	ngOnInit() {
  		this._route.params.subscribe((params: Params) => {
  			this.email = params.email;
  		});
  		this._apiService.EmailConfirm(this.email).subscribe(
  			result => {
  				console.log(this.email);
  				alert("Correo confirmado correctamente");
  				this.RedirectLogin();
  			},
  			err => {
  				alert("Error al confirmar correo");
  			}
  		);
  	}

  	RedirectLogin(){
  		this._router.navigate(['/login']);
  	}

  	Confirm(){
  		
  	}
}
