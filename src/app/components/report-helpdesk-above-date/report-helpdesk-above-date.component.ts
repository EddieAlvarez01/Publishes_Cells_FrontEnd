import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-report-helpdesk-above-date',
  templateUrl: './report-helpdesk-above-date.component.html',
  styleUrls: ['./report-helpdesk-above-date.component.css'],
  providers: [ApiService]
})
export class ReportHelpdeskAboveDateComponent implements OnInit {

	public year: number;
	public usersList: any[];

  	constructor(
  		private _apiService: ApiService
  	) { }

  	ngOnInit() {
  	}

  	Search(){
  		this.usersList = [];
  		this._apiService.GetDataReport2(this.year).subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.usersList = rows;
  				}else{
  					toastr.info("No hay resultados para la búsqueda");
  				}
  			},
  			err => {
  				toastr.error("Error al realizar la busqueda");
  			}
  		);
  	}

  	Download(){
  		var doc = new jsPDF();
  		doc.text("Listado de Usuarios help desk masculinos nacidos arriba del año " + this.year, 10, 10);
  		doc.autoTable({ html: '#helpDeskYear' });
  		doc.save('Reporte_Help_Desk_Archivos.pdf');
  	}

}
