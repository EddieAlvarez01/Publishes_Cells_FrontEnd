import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from "@angular/forms";

import { ApiService } from '../../services/api.service';

import { User } from '../../../models/user';

//Libreria JS
import * as toastr from 'toastr';
declare var $:any;

@Component({
  selector: 'app-individual-view',
  templateUrl: './individual-view.component.html',
  styleUrls: ['./individual-view.component.css'],
  providers: [ApiService]
})
export class IndividualViewComponent implements OnInit {

	public idProduct: number;
	public user: User;
	public product: any;
	public isCart: number;
	public listStock: Array<number>;
  public radioValue: string;

  	constructor(
  		private _router: Router,
  		private _route: ActivatedRoute,
  		private _apiService: ApiService
  	) {
  		this.user = JSON.parse(localStorage.getItem("user"));
  		this.isCart = null;
  		this.listStock = new Array();
  	}

  	ngOnInit() {
  		this._route.params.subscribe((params: Params) => {
  			this.idProduct = parseInt(params.id);
  			this._apiService.GetProductId(this.idProduct).subscribe(
  				result => {
  					this.product = result.rows[0];
  					if(this.user != null || this.user != undefined){
  						this._apiService.VerifyProductCart(this.user.shoppingCart, this.idProduct).subscribe(
  							result => {
  								let verify = result.rows;
  								if(verify.length > 0){
  									this.isCart = 1;
  								}
  							},
  							err => {
  								toastr.error("Error al verificar el producto");
  							}
  						);
  					}
  				},
  				err => {
  					alert("Error al cargar producto");
  				}
  			);
        this._apiService.GetRatingProduct(this.idProduct).subscribe(
                    result => {
                      let rT = result.rows[0].RATING;
                      if(rT != null){
                        this.radioValue = Math.round(rT).toString();
                      }else{
                        this.radioValue = '0';
                      }
                    },
                    err => {
                      toastr.error("Error al consultar ponderación del producto");
                    }
        );
  		});
  	}

  	ReditectShop(){
  		this._router.navigate(['/catalogue']);
  	}

    RedirectToReviewProduct(){
      this._router.navigate(['/productReviews/' + this.idProduct]);
    }

  	AddCart(){
  		this.listStock = [];
  		for(let x=0; x<this.product.STOCK; x++){
  			this.listStock.push(x+1);
  		}
  		$('#modalAddCart').modal();
  	}

  	ConfirmAddToCart(){
  		let quantity = parseInt($('#slModalStock').val());
  		this._apiService.AddProductToCart(this.user.shoppingCart, this.idProduct, quantity).subscribe(
  			result => {
  				this.isCart = 1;
  				$('#modalAddCart').modal("hide");
  				toastr.success("Agregado al carrito exitosamente");
  			},
  			err => {
  				toastr.error("Error al agregar al carrito");
  			}
  		);
  	}

}
