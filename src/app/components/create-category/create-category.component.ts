import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  providers: [ApiService]
})
export class CreateCategoryComponent implements OnInit {

	public name: string;
	public description: string;
	public slcFather: string;
	public categoriesList: any[];

  	constructor(
  		private _apiService: ApiService,
  		private _router: Router
  	) {
  		this.description = null;
  		this.slcFather = '0';
  	}

  	ngOnInit() {
  		this._apiService.GetAllCategories().subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.categoriesList = rows;
  				}
  			},
  			err => {
  				toastr.error("Error al traer categorías");
  			}
  		);
  	}

  	onSubmitForm(){
  		let idFather = parseInt(this.slcFather);
  		if(idFather == 0){
  			idFather = null;
  		}
  		this._apiService.CreateCategory(this.name, this.description, idFather).subscribe(
  			result => {
  				toastr.success("Categoría creada exitosamente");
  				this._router.navigate(['/categoryCrud']);
  			},
  			err => {
  				toastr.error("Error al crear la categoria");
  			}
  		);
  	}

}
