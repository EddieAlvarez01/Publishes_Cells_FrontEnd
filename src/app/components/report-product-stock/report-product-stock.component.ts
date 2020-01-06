import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-report-product-stock',
  templateUrl: './report-product-stock.component.html',
  styleUrls: ['./report-product-stock.component.css'],
  providers: [ApiService]
})
export class ReportProductStockComponent implements OnInit {

	public stock: number;
	public productList: any[];

  	constructor(
  		private _apiService: ApiService
  	) { }

  	ngOnInit() {
  	}

  	Search(){
  		this.productList = [];
  		this._apiService.GetStockProduct(this.stock).subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.productList = rows;
  				}else{
  					toastr.info("No hay resultados");
  				}
  			},
  			err => {
  				toastr.error("Error al relizar la busqueda de datos");
  			}
  		);
  	}

  	Download(){
  		var doc = new jsPDF();
  		doc.text("Productos con " + this.stock + ' cantidad disponible', 10, 10);
  		doc.autoTable({ html: '#productStock' });
  		doc.save('Reporte_productos_con_cantidad_disponible.pdf');
  	}

}
