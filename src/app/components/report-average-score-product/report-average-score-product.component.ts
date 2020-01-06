import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-report-average-score-product',
  templateUrl: './report-average-score-product.component.html',
  styleUrls: ['./report-average-score-product.component.css'],
  providers: [ApiService]
})
export class ReportAverageScoreProductComponent implements OnInit {

	public productList: any[];
	public selectValue: string;

    constructor(
  		private _apiService: ApiService
  	) { 
  		this.selectValue = '1';
  	}

  	ngOnInit() {
  		this._apiService.GetProductsByAverage(1).subscribe(
        result => {
          let rows = result.rows;
          if(rows.length > 0){  
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
      doc.text("Productos con una puntuacion promedio de " + this.selectValue + " estrellas", 10, 10);
      doc.autoTable({ html: '#productAverage' });
      doc.save('Reporte_productos_por_promedio.pdf');
  	}

  	ReturnData(){
      this.productList = [];
      let stars = parseInt(this.selectValue);
      this._apiService.GetProductsByAverage(stars).subscribe(
        result => {
          let rows = result.rows;
          if(rows.length > 0){
            this.productList = rows;
          }else{
            toastr.info("No hay datos para mostrar");
          }
        },
        err => {
          toastr.error("Error al cargar los datos");
        }
      );
  	}

}
