import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

import { User } from '../../../models/user';

// Librerias JS
import * as toastr from 'toastr';

@Component({
  selector: 'app-page-setup-home',
  templateUrl: './page-setup-home.component.html',
  styleUrls: ['./page-setup-home.component.css'],
  providers: [ApiService]
})
export class PageSetupHomeComponent implements OnInit {

  	public mision: string;
  	public vision: string;
  	public aboutme: string;
  	public fileToUploadImage: Array<File>;
  	public fileToUploadVideo: Array<File>;

  	constructor(
  		private _apiService: ApiService
  	) { 
  		this.fileToUploadImage = new Array();
  		this.fileToUploadVideo = new Array();
  	}

  	ngOnInit() {
  		this._apiService.GetDataHome().subscribe(
  			result => {
  				let configs = result.rows[0];
  				this.mision = configs.MISION;
  				this.vision = configs.VISION;
  				this.aboutme = configs.ABOUTME;
  			},
  			err => {
  				toastr.error("Error al cargar la información de la página principal");
  			}
  		);
  	}

  	SendInformation(){
  		this._apiService.UpdateDataHome(this.mision, this.vision, this.aboutme).subscribe(
  			result => {
  				toastr.success("Información actualizada correctamente");
  			},
  			err => {
  				toastr.error("Error al actualizar la información de la página");
  			}	
  		);
  	}

  	FileEventVideo(fileInput: any){
  		this.fileToUploadVideo = <Array<File>>fileInput.target.files;
  	}

  	FileEventImage(fileInput: any){
  		this.fileToUploadVideo = <Array<File>>fileInput.target.files;
  	}

}
