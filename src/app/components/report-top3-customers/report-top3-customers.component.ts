import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-report-top3-customers',
  templateUrl: './report-top3-customers.component.html',
  styleUrls: ['./report-top3-customers.component.css']
})
export class ReportTop3CustomersComponent implements OnInit {

  	public customerList: any[];

  	public table = $('#top3Customerssss');

  	constructor(
  		private _apiService: ApiService
  	) { 
  		console.log(this.table);
  	}

  	ngOnInit() {
  		this._apiService.GetTop3Customers().subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.customerList = rows;
  				}else{
  					toastr.info("No hay información para mostrar");
  				}
  			},
  			err => {
  				toastr.error("Error al cargar la información");
  			}
  		);
  	}

  	Download(){
  		var doc = new jsPDF();
  		doc.text("Top 3 clientes con mas prductos en su catálogo", 10, 10);
  		doc.autoTable({ html: '#top3Customers' });
  		doc.save('Reporte_3_Clientes_con_mas_productos_Archivos.pdf');
  	}

}
