import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.css'],
  providers: [ApiService]
})
export class CategoryCrudComponent implements OnInit {

	public categoryList: any[];

  	constructor(
  		private _apiService: ApiService,
  		private _router: Router
  	) { }

  	ngOnInit() {
  		this._apiService.GetAllCategoriesForCrud().subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.categoryList = rows;
  				}else{
  					toastr.info("No hay datos para mostrar");
  				}
  			},
  			err => {
  				toastr.error("Error al cargar las categorias");
  			}
  		);
  	}

  	RedirectCreateCategory(){
  		this._router.navigate(['/createCategory']);
  	}

  	DeleCategory(idCategory: number){
  		this._apiService.DeleteCategory(idCategory).subscribe(
  			result => {
  				toastr.success("Categoria eliminada correctamente");
  				let indexDelete: number;
  				this.categoryList.forEach((element, index) => {
  					if(element.ID == idCategory){
  						indexDelete = index;
  						return;
  					}
  				});
  				this.categoryList.splice(indexDelete, 1);
  			},
  			err => {
  				toastr.error("Error al eliminar la categoria");
  			}
  		);
  	}

}
