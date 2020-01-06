import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-report-top3-worst-score',
  templateUrl: './report-top3-worst-score.component.html',
  styleUrls: ['./report-top3-worst-score.component.css'],
  providers: [ApiService]
})
export class ReportTop3WorstScoreComponent implements OnInit {

	public productList: any[];

  	constructor(
  		private _apiService: ApiService
  	) { }

  	ngOnInit() {
  		this._apiService.GetTop3WorstScore().subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length >  0){	
  					this.productList = rows;
  				}else{	
  					toastr.info("No hay datos para mostrar");
  				}
  			},
  			err => {
  				toastr.error("Error al cargar la información");
  			}
  		);
  	}

  	Download(){
  		var doc = new jsPDF();
  		doc.text("Top 3 productos con peor puntuación", 10, 10);
  		doc.autoTable({ html: '#top3WorstScore' });
  		doc.save('Reporte_top_3_productos_peor_calificados.pdf');
  	}

}
