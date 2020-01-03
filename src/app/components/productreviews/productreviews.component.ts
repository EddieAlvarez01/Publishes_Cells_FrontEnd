import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../../services/api.service';

import { User } from '../../../models/user';
import { Comentary } from '../../../models/comentary';

//Libreria JS
import * as toastr from 'toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-productreviews',
  templateUrl: './productreviews.component.html',
  styleUrls: ['./productreviews.component.css'],
  providers: [ApiService]
})
export class ProductreviewsComponent implements OnInit {

	public user: User;
	public idProduct: number;
	public productDetail: any;
	public radioValue: string;
	public radioValueForUser: string;
	public commentList: Array<Comentary>;
	public contentC: string;
	public titleC: string;

  	constructor(
  		private _router: Router,
  		private _route: ActivatedRoute,
  		private _apiService: ApiService
  	) { 
  		this.user = JSON.parse(localStorage.getItem("user"));
  		this.commentList = new Array();
  	}

  	ngOnInit() {
  		this._route.params.subscribe((params: Params) => {
  			this.idProduct = parseInt(params.id);
  			this._apiService.GetProductRating(this.idProduct).subscribe(
  				result => {
  					this.productDetail = result.rows[0];
  					this._apiService.GetRatingProduct(this.idProduct).subscribe(
  						result => {
  							let rT = result.rows[0].RATING;
  							if(rT != null){
  								this.radioValue = Math.round(rT).toString();
  							}else{
  								this.radioValue = '0';
  							}
  							this._apiService.GetCommentsProduct(this.idProduct).subscribe(
  								result => {
  									let rowsComments: any[] = result.rows;
  									if(rowsComments.length > 0){
  										rowsComments.forEach((element) => {
  											let newComentary: Comentary = new Comentary(element.QUANTITY.toString(), element.NAME + ' ' + element.LASTNAME, element.COMMENTDATE, element.TITLE, element.CONTENT);
  											this.commentList.push(newComentary);
  										});
  									}
  									this._apiService.GetScoreProductByUser(this.idProduct, this.user.id).subscribe(
  										result => {
  											let score: any[] = result.rows;
  											if(score.length > 0){
  												this.radioValueForUser = score[0].QUANTITY.toString();
  											}else{
  												this.radioValueForUser = '0';
  											}
  										},
  										err => {
  											toastr.error("Error al cargar la puntuacion del usuario a este producto");
  										}
  									);
  								},
  								err => {
  									toastr.error("Error al cargar los comentarios de este producto");
  								}
  							);
  						},
  						err => {
  							toastr.error("Error al traer la ponderación del producto");
  						}
  					);
  				},
  				err => {
  					toastr.err("Error al traer el producto");
  				}
  			);
  		});
  	}

  	ChangeRating(){
  		let valueInt = parseInt(this.radioValueForUser);
  		this._apiService.UpdateScoreByUser(this.idProduct, this.user.id, valueInt).subscribe(
  			result => {
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
  						toastr.error("Error al actualizar ponderación del producto");
  					}
  				);
  			},
  			err => {
  				toastr.error("Error al actualizar puntuación del producto");
  			}
  		);
  	}

  	NewCommentary(){
  		let creationDate = moment().format('DD-MM-YYYY HH:mm:ss');
  		this._apiService.NewCommentary(creationDate, this.titleC, this.contentC, this.user.id, this.idProduct).subscribe(
  			result => {
  				this.commentList.push(new Comentary(this.radioValueForUser, this.user.name + ' ' + this.user.lastName, creationDate, this.titleC, this.contentC));
  				this.titleC = '';
  				this.contentC = '';
  			},
  			err => {
  				toastr.error("Error al comentar el producto");
  			}
  		);
  	}

}
