import { Component, OnInit } from '@angular/core';
import { TreeViewComponent, NodeSelectEventArgs } from '@syncfusion/ej2-angular-navigations';

import { ApiService } from '../../services/api.service';

import { Category } from '../../../models/category';
import { User } from '../../../models/user';
import { Product } from '../../../models/product';

declare var $:any;

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
	public itemsCategory: Array<Category>;
	public productCatalog: Array<Product>;
	public idCategorySelected: number;
	public user: User;
	public matchText: string;

  	constructor(
  		private _apiService: ApiService
  	) { 
  		this.dataTree = new Array();
  		this.itemsCategory = new Array();
  		this.productCatalog = new Array();
  		this.idCategorySelected = 0;
  		this.user = JSON.parse(localStorage.getItem("user"));
  	}

  	ngOnInit() {
  		this._apiService.GetAllCategories().subscribe(
  			result => {
  				let arrayCategories: any[] = result.rows;
  				if(arrayCategories.length > 0){
  					arrayCategories.forEach((item) => {
  						let newCategoy: Category = new Category(item.ID, item.NAME, item.FATHERCATEGORY);
  						this.itemsCategory.push(newCategoy);
  						if(newCategoy.idFather != null){
  							this.dataTree.push({id: newCategoy.id, pid: newCategoy.idFather, name: newCategoy.name, hasChild: true});
  						}else{
  							this.dataTree.push({id: newCategoy.id, name: newCategoy.name, hasChild: true});
  						}
  					});
  				}
  				this.field = { dataSource: this.dataTree, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
			  	if(this.user != null && this.user != undefined){
			  	}else{
			  		this._apiService.GetAllProductsNoLoggedCustomer().subscribe(
			  			result => {
			  				let listProducts: any[] = result.rows;
			  				if(listProducts.length > 0){
			  					listProducts.forEach((item) => {
			  						let product: Product = new Product(item.ID, item.IMAGE, item.DESCRIPTION, item.PRICE, item.NOMBRE, item.NAME + " " + item.LASTNAME);
			  						this.productCatalog.push(product);
			  					});
			  				}
			  			},
			  			err => {
			  				alert("Error al cargar productos");
			  			}
			  		);
			  	}
  			},
  			err => {
  				alert("Error al cargar las categorias");
  			}
  		);
  	}

  	nodeSelected(e: NodeSelectEventArgs) {
  		this.idCategorySelected = <number>e.nodeData.id;
  		if(this.user != null && this.user != undefined){
  		}else{
  			this.ReloadCatalogNoLogged();
  		}
       /* if(text.includes(".")){
        	this.idArchivo = <number>e.nodeData.id;
          this.nameFile = text;
        	this.idCarpeta = null;
          this.parentFile = <number>e.nodeData.parentID;
          this.LoadContent();
        }else{	
       		this.idCarpeta = <number>e.nodeData.id;
       		this.idArchivo = null;
       		//this.tree.addNodes([item]);
        }*/
    }

    ReloadCatalogNoLogged(){
    	this.productCatalog = [];
    	this._apiService.GetAllProductsNoLoggedByCategory(this.idCategorySelected).subscribe(
    		result => {
    			let listProducts: any[] = result.rows;
			  	if(listProducts.length > 0){
			  		listProducts.forEach((item) => {
			  			let product: Product = new Product(item.ID, item.IMAGE, item.DESCRIPTION, item.PRICE, item.NOMBRE, item.NAME + " " + item.LASTNAME);
			  			this.productCatalog.push(product);
			  		});
			  	}
    		},
    		err => {
    			alert("Error al cargar los productos");
    		}	
    	);
    }

    onSubmitSearch(){
    	this.productCatalog = [];
    	this.idCategorySelected = parseInt($('#slCategory').val());
    	console.log(this.idCategorySelected);
    	if(this.idCategorySelected == 0){
    		if(this.user != null && this.user != undefined){
    		}else{
    			this._apiService.GetAllProductsNoLoggedMatch(this.matchText).subscribe(
    				result => {
    					let listProducts: any[] = result.rows;
			  			if(listProducts.length > 0){
			  				listProducts.forEach((item) => {
			  					let product: Product = new Product(item.ID, item.IMAGE, item.DESCRIPTION, item.PRICE, item.NOMBRE, item.NAME + " " + item.LASTNAME);
			  					this.productCatalog.push(product);
			  				});
			  			}
    				},
    				err => {
    					alert("Error al cargar productos");
    				}
    			);
    		}
    	}else{
    		if(this.user != null && this.user != undefined){

    		}else{
    			this._apiService.GetAllProductsNoLoggedMatchByCategory(this.idCategorySelected, this.matchText).subscribe(
    				result => {
    					let listProducts: any[] = result.rows;
			  			if(listProducts.length > 0){
			  				listProducts.forEach((item) => {
			  					let product: Product = new Product(item.ID, item.IMAGE, item.DESCRIPTION, item.PRICE, item.NOMBRE, item.NAME + " " + item.LASTNAME);
			  					this.productCatalog.push(product);
			  				});
			  			}
    				},
    				err => {
    					alert("Error al cargar productos");
    				}
    			);
    		}
    	}
    }

}
