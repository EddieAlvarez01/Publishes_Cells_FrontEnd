import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

import { User } from '../../../models/user';

//Libreria JS
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.css'],
  providers: [ApiService]
})
export class BulkLoadComponent implements OnInit {

	public preview: string;

  	constructor(
      private _apiService: ApiService
    ) { }

  	ngOnInit() {
  	}

  	FileEvent(fileInput: any){
  		var files = fileInput.target.files[0];
  		if(!files){
  			return;
  		}
  		var text;
  		var reader = new FileReader();
  		reader.onload = (e: any) => {
  			this.preview = e.target.result;
  		}
  		reader.readAsText(files);
  	}

  	LoadProducts(){
  		var productsLine = this.preview.split('\n');
  		productsLine.forEach((element) => {
  			var productProperties = element.split(',');
  			let code: string = productProperties[0].trim();
  			let img: string = productProperties[1].trim();
        let pathImg: string[] = img.split('/');
        let imgName: string = pathImg[pathImg.length - 1];
  			let description: string = productProperties[2].trim();
  			let fatherCategory: string = null;
  			let daughterCategory: string = null;
  			if(productProperties[3].includes("-")){
  				var categories = productProperties[3].trim().split('-');
  				fatherCategory = categories[0].trim();
  				daughterCategory = categories[1].trim();
  			}else{
  				fatherCategory = productProperties[3].trim();
  			}
  			let price: number = parseFloat(productProperties[4].trim());
        let stock: number = parseInt(productProperties[5].trim());
  			let color: string = productProperties[6].trim();
  			let publicationDate: string = moment().format('DD-MM-YYYY');
  			let user: User = JSON.parse(localStorage.getItem("user"));
  			let idUser: number = user.id;
        this._apiService.RegisterNewProduct(code, imgName, description, fatherCategory, daughterCategory, price, color, publicationDate, idUser, stock).subscribe(
          result => {
          },
          err => {
            console.log("Error en el seridor");
          }
        );
  		});
      alert("Productos cargados exitosamente");
  	}

}
