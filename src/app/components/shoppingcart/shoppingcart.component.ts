import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

import { User } from '../../../models/user';
import { Cart } from '../../../models/cart';

//Libreria JS
import * as toastr from 'toastr';
import * as moment from 'moment';

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
  		private _apiService: ApiService,
  		private _router: Router
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
  						let newCart = new Cart(element.IDPRODUCT, element.DESCRIPTION, element.PRICE, element.QUANTITY, element.STOCK, element.CODE);
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

  	RedirectToShop(){
  		this._router.navigate(['/catalogue']);
  	}

  	BuyProducts(){
  		if((this.user.availableCredit - this.total) >= 0){
  			let flag: boolean = false;
  			let nameProduct: string;
  			this.listCart.forEach((element) => {
  				if((element.stock - element.quantity) < 0){
  					flag = true;
  					nameProduct = element.description;
  					return;
  				}
  			});
  			if(!flag){
  				let date = moment().format('DD-MM-YYYY HH:mm:ss');
  				this._apiService.BuyProducts(this.user.id, this.user.name + " " + this.user.lastName, this.user.shoppingCart, date, this.total).subscribe(
  					result => {
  						let idBill = result.data.v_id;
  						let html: string = '<p>Factura: ' + idBill + '</p>\n';
  						html += '<p>Cliente: ' + this.user.name + ' ' + this.user.lastName + '</p>\n';
  						html += '<p>Carrito: ' + this.user.shoppingCart +'</p>\n';
  						html += '<p>Fecha: ' + date + '</p>\n';
  						html += '<p>items: </p>\n <hr>\n';
  						let trForTable: string = '';
  						this.listCart.forEach((element) => {
  							trForTable += '<tr>\n';
  							trForTable += '<th scope="row">' + element.quantity + '</th>\n';
  							trForTable += '<td>' + element.code + '</td>\n';
  							trForTable += '<td>' + element.description + '</td>\n';
  							trForTable += '<td>' + element.price + '</td>\n';
  							trForTable += '<td>' + (element.price * element.quantity) + '</td>\n';
  							trForTable += '</tr>\n';
  						});
  						html += '<table class="table">\n<thead class="thead-dark">\n' +
										    '<tr>\n' +
										      '<th scope="col">Cantidad</th>\n' +
										      '<th scope="col">Codigo</th>\n' +
										      '<th scope="col">Producto</th>' + 
										      '<th scope="col">Precio Unitario</th>\n' +
										      '<th scope="col">Total</th>\n' +
										    '</tr>\n' +
										  '</thead>\n' +
										  '<tbody>\n' +
										  trForTable; 
						this._apiService.SendBillEmail(this.user.email, this.user.id, this.user.name + ' ' + this.user.lastName, html, this.total).subscribe(
							result => {
								this.user.availableCredit -= this.total;
								localStorage.setItem("user", JSON.stringify(this.user));
								this.total = 0;
								this.listCart = [];
								toastr.success("Productos comprados, su factura llegara por correo");
							},
							err => {
								toastr.error("Error al enviar la factura por correo");
							}
						);
  					},
  					err => {
  						toastr.error("Error al efectuar la compra");
  					}
  				);
  			}else{
  				toastr.error("No hay suficientes productos " + nameProduct + " en stock");
  			}
  		}else{
  			toastr.error("No tiene suficientes fondos para comprar estos productos");
  		}
  	}

}
