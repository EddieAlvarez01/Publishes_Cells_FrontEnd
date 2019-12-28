import { Component, OnInit } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

import { ApiService } from '../../services/api.service';

import { Category } from '../../../models/category';
import { User } from '../../../models/user';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  providers: [ApiService]
})
export class CatalogueComponent implements OnInit {

	public tree: TreeViewComponent;
	public dataTree: Array<Object>;
	public field: Object;

  	constructor(
  		private _apiService: ApiService
  	) { 
  		this.dataTree = new Array();
  	}

  	ngOnInit() {
  		this._apiService.GetAllCategories().subscribe(
  			result => {
  				let arrayCategories: any[] = result.rows;
  				if(arrayCategories.length > 0){
  					arrayCategories.forEach((item) => {
  						let newCategoy: Category = new Category(item.ID, item.NAME, item.FATHERCATEGORY);
  						if(newCategoy.idFather != null){
  							this.dataTree.push({id: newCategoy.id, pid: newCategoy.idFather, name: newCategoy.name, hasChild: true});
  						}else{
  							this.dataTree.push({id: newCategoy.id, name: newCategoy.name, hasChild: true});
  						}
  					});
  					this.field = { dataSource: this.dataTree, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
  					let user: User = JSON.parse(localStorage.getItem("user"));
			  		if(user != null && user != undefined){

			  		}else{

			  		}
  				}
  			},
  			err => {
  				alert("Error al cargar las categorias");
  			}
  		);
  	}

}
