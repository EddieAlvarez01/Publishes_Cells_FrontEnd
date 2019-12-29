import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../../services/api.service';

import { User } from '../../../models/user';

@Component({
  selector: 'app-individual-view',
  templateUrl: './individual-view.component.html',
  styleUrls: ['./individual-view.component.css'],
  providers: [ApiService]
})
export class IndividualViewComponent implements OnInit {

	public idProduct: number;
	public user: User;
	public product: Object;

  	constructor(
  		private _router: Router,
  		private _route: ActivatedRoute,
  		private _apiService: ApiService
  	) {
  		this.user = JSON.parse(localStorage.getItem("user"));
  	}

  	ngOnInit() {
  		this._route.params.subscribe((params: Params) => {
  			this.idProduct = params.id;
  			this._apiService.GetProductId(this.idProduct).subscribe(
  				result => {
  					this.product = result.rows[0];
  				},
  				err => {
  					alert("Error al cargar producto");
  				}
  			);
  		});
  	}

  	ReditectShop(){
  		this._router.navigate(['/catalogue']);
  	}

}
