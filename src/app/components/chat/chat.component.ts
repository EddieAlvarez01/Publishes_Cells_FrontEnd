import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [WebSocketService]
})
export class ChatComponent implements OnInit {


  	constructor(
  		private _wbService: WebSocketService
  	) { 
  		/*console.log("Hola");
  		this.socket = io(this.uri);-*/
  	}

  	ngOnInit() {
  		/*this._wbService.listen('test event').subscribe((data) => {
  			console.log(data);
  		});*/
  	}

}
