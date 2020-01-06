import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { ProductReport } from '../../../models/ProductReport';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-report-products-category',
  templateUrl: './report-products-category.component.html',
  styleUrls: ['./report-products-category.component.css'],
  providers: [ApiService]
})
export class ReportProductsCategoryComponent implements OnInit {

	public hashTable: Array<ProductReport>;
	public productList: Array<ProductReport>;

  	constructor(
  		private _apiService: ApiService
  	) { 
  		this.hashTable = new Array();
  		this.productList = new Array();
  	}

  	ngOnInit() {
  		this._apiService.GetAllProducts().subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					rows.forEach((element) => {
  						let newProductReport = new ProductReport(element.ID, element.DESCRIPTION, element.PRICE, element.CODE, element.NAME + ' ' + element.LASTNAME, null, element.NAMCATEGORY, element.NOMBRE);
  						this.hashTable[element.ID] = newProductReport;
  					});
  					rows.forEach((element) => {
  						this._apiService.GetFatherCategory(element.IDCATEGORY).subscribe(
  							result => {
  								let id = element.ID;
  								let rows2 = result.rows;
  								if(rows2.length > 0){
  									this.hashTable[id].fatherCategory = rows2[0].NAME;
  								}
  							},
  							err => {
  								toastr.error("Error al traer el padre");
  							}
  						);
  					});
  					this.hashTable.forEach((element) => {
  						this.productList.push(element);
  					});
  				}else{
  					toastr.info("No datos encontrados");
  				}
  			},
  			err => {
  				toastr.error("Error al cargar los productos");
  			}
  		);
  	}

  	Download(){
  		var doc = new jsPDF();
  		doc.text("Listado de productos con su categoria", 10, 10);
  		doc.autoTable({ html: '#productCategory' });
  		doc.save('Reporte_productos_categorias.pdf');
  	}

}
