import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-report-comments-assigned',
  templateUrl: './report-comments-assigned.component.html',
  styleUrls: ['./report-comments-assigned.component.css'],
  providers: [ApiService]
})
export class ReportCommentsAssignedComponent implements OnInit {

  	public date: string;
  	public productList: any[];

  	constructor(
  		private _apiService: ApiService
  	) { }

  	ngOnInit() {

  	}

  	Search(){
  		this.productList = [];
  		this.date = moment(this.date, 'YYYY-MM-DD').format('DD-MM-YYYY');
  		this._apiService.GetProductsComments(this.date).subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.productList = rows;
  				}else{
  					toastr.info("No hay resultados para la busqueda");
  				}
  			},
  			err => {
  				toastr.error("Error al realizar la busqueda");
  			}
  		);
  	}

  	Download(){
  		var doc = new jsPDF();
  		doc.text("Cantidad de comentarios de los productos en la fecha " + this.date, 10, 10);
  		doc.autoTable({ html: '#commentsAssigned' });
  		doc.save('Reporte_cantidad_comentarios_productos.pdf');
  	}

}
