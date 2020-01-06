import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

//Libreria JS
import * as toastr from 'toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $:any;

@Component({
  selector: 'app-customers-more-profits',
  templateUrl: './customers-more-profits.component.html',
  styleUrls: ['./customers-more-profits.component.css'],
  providers: [ApiService]
})
export class CustomersMoreProfitsComponent implements OnInit {

	public userList: any[];

  	constructor(
  		private _apiService: ApiService
  	) { }

  	ngOnInit() {
  		this._apiService.GetClientsMoreProfits().subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.userList = rows;
  				}else{
  					toastr.info("No hay ningún resultado");
  				}
  			},
  			err => {
  				toastr.error("Error al traer la información");
  			}
  		);
  	}

  	Download(){
  		var doc = new jsPDF();
  		doc.text("Clientes que mas ganacnias han generado ", 10, 10);
  		doc.autoTable({ html: '#clientsMore' });
  		doc.save('Reporte_Cliente_MayorGanancia_Archivos.pdf');
  	}

}
