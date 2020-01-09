import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

	public mision: string;
	public vision: string;
	public aboutMe: string;
	public video: string;
  public slogan: string;

  	constructor(
  		private _apiService: ApiService
  	) { 
  	}

  	ngOnInit() {
  		//Se llama al servicio y por medio de una subscripcion se recibe el response del api 
  		this._apiService.GetDataHome().subscribe(
  			result => {
  				let info = result.rows[0];
  				this.mision = info.MISION;
  				this.vision = info.VISION;
  				this.aboutMe = info.ABOUTME;
  				this.video = info.VIDEO;
          this.slogan = info.SLOGAN;
  			},
  			err => {
  				alert("Error en el servidor");
  			}
  		);
  	}

}
