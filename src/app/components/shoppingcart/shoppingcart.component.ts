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

  	DeleteProduct(idProduct: number){
  		this._apiService.DeleteProductCart(this.user.shoppingCart, idProduct).subscribe(
  			result => {
  				let indexDelete = 0;
  				this.listCart.forEach((element, index) => {
  					if(element.idProduct == idProduct){
  						indexDelete = index;
  						this.total -= (element.price * element.quantity);
  						return;
  					}
  				});
  				this.listCart.splice(indexDelete, 1);
  				toastr.success("Producto eliminado exitosamente");
  			},
  			err => {
  				toastr.error("Error al eliminar el prodcuto");
  			}
  		);
  	}

}
