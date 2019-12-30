import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

import { User } from '../../../models/user';
import { Cart } from '../../../models/cart';

//Libreria JS
import * as toastr from 'toastr';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
  providers: [ApiService]
})
export class ShoppingcartComponent implements OnInit {

	public total: number;
	public listCart: Array<Cart>;
	public user: User;

  	constructor(
  		private _apiService: ApiService
  	) { 
  		this.user = JSON.parse(localStorage.getItem("user"));
  		this.listCart = new Array();
  		this.total = 0;
  	}

  	ngOnInit() {
  		this._apiService.GetProductsShoppingCart(this.user.shoppingCart).subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					rows.forEach((element) => {
  						let newCart = new Cart(element.IDPRODUCT, element.DESCRIPTION, element.PRICE, element.QUANTITY, element.STOCK);
  						this.listCart.push(newCart);
  						this.total += (newCart.price * newCart.quantity);
  					});
  				}
  			},
  			err => {
  				toastr.error("Error al cargar los productos");
  			}
  		);
  	}

}
