import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-report-helpdesk-average',
  templateUrl: './report-helpdesk-average.component.html',
  styleUrls: ['./report-helpdesk-average.component.css'],
  providers: [ApiService]
})
export class ReportHelpdeskAverageComponent implements OnInit {

	public userList: any[];

  	constructor(
  		private _apiService: ApiService
  	) { }

  	ngOnInit() {
  		this._apiService.GetHelpDeskAverage().subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.userList = rows;
  				}else{
  					toastr.info("No hay resultados disponibles");
  				}
  			},
  			err => {
  				toastr.error("Error al cargar los help desk");
  			}
  		);
  	}

  	Download(){
  		var doc = new jsPDF();
  		doc.text("Listado de help desk por puntuación", 10, 10);
  		doc.autoTable({ html: '#helpDeskAverage' });
  		doc.save('Reporte_Help_Desk_Puntuación.pdf');
  	}

}
