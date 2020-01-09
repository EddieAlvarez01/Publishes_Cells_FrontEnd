import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { TransferService } from '../../services/transfer.service';

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
    public slogan: string;
  	public fileToUploadImage: Array<File>;
  	public fileToUploadVideo: Array<File>;

  	constructor(
  		private _apiService: ApiService,
      private _transferService: TransferService
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
          this.slogan = configs.SLOGAN;
  			},
  			err => {
  				toastr.error("Error al cargar la información de la página principal");
  			}
  		);
  	}

  	SendInformation(){
  		this._apiService.UpdateDataHome(this.mision, this.vision, this.aboutme, this.slogan).subscribe(
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
  		this.fileToUploadImage = <Array<File>>fileInput.target.files;
  	}

    SaveChangesVideo(){
      this._apiService.makeFileRequestVideo([], this.fileToUploadVideo, 'video')
      .then((result: any) => {
        let nameVideo = result.video;
        this._apiService.UpdateVideoHome(nameVideo).subscribe(
          result => {
            toastr.success("Video actualizado correctamente");
          },
          err => {
            toastr.error("Error al actualizar el video");
          }
        );
      })
      .catch((err) => {
        toastr.error(err);
      });
    }

    SaveChanges(){
      this._apiService.makeFileRequest([], this.fileToUploadImage, 'image')
      .then((result: any) => {
        let nameImage = result.image;
        this._transferService.UpdateImage(nameImage);
        this._apiService.UpdateLogo(nameImage).subscribe(
          result => {
            toastr.success("Logo actualizado correctamente");
          },
          err => {
            toastr.error("Error al actualizar el Logo");
          }
        );
      })
      .catch((err) => {
        toastr.error(err);
      });
    }

}
