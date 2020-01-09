import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  providers: [ApiService]
})
export class EditCategoryComponent implements OnInit {

  	public idCategory: number;
  	public name: string;
  	public description: string;

  	constructor(
  		private _apiService: ApiService,
  		private _route: ActivatedRoute,
  		private _router: Router
  	) { }

  	ngOnInit() {
  		this._route.params.subscribe((params: Params) => {
  			this.idCategory = parseInt(params.id);
  			this._apiService.GetCategoryId(this.idCategory).subscribe(
  				result => {
  					this.name = result.rows[0].NAME;
  					this.description = result.rows[0].DESCRIPTION;
  				},
  				err => {
  					toastr.error("Error al cargar información de la categoría");
  				}
  			);
  		});
  	}

  	onSubmitForm(){
  		this._apiService.UpdateCategory(this.idCategory, this.name, this.description).subscribe(
  			result => {
  				toastr.success("categoría editada correctamente");
  				this._router.navigate(['/categoryCrud']);
  			},
  			err => {
  				toastr.error("Error al editar categoría");
  			}
  		);
  	}

}
