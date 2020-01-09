import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { WebSocketService } from '../../services/chat.service';
import { ApiService } from '../../services/api.service';

import { User } from '../../../models/user';

//Libreria JS
import * as toastr from 'toastr';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [WebSocketService, ApiService]
})
export class ChatComponent implements OnInit {


    public idRoom: number;
    public textMsg: string;
    public user: User;
    public messages: any[];

  	constructor(
  		private _wbService: WebSocketService,
      private _apiService: ApiService,
      private _route: ActivatedRoute
  	) { 
      this.user = JSON.parse(localStorage.getItem("user"));
      this.messages = [];
  	}

  	ngOnInit() {
      this._route.params.subscribe((params: Params) => {
        this.idRoom = parseInt(params.id);
        this._wbService.JoinRoom({idRoom: this.idRoom});
        this._apiService.GetAllMessagesRoom(this.idRoom).subscribe(
          result => {
            let rows = result.rows;
            if(rows.length > 0){
              rows.forEach((element) => {
                this.messages.push({ transmitter: element.IDUSER, content: element.CONTENT, photo: element.PHOTO });
              });
            }
          },
          err => {
            toastr.error("Error al cargar los mensajes");
          }
        );
      });
      this._wbService.newMessageReceived().subscribe(
        data => {
          if(data.transmitter != this.user.id){
            this.messages.push(data);
          }
        }
      );
  	}

    SendMessage(){
      let msg = {
        idRoom: this.idRoom, transmitter: this.user.id, content: this.textMsg, photo: this.user.photo
      }
      this.messages.push(msg);
      this._wbService.SendMessage(msg);
      this._apiService.CreateNewMessage(this.user.id, this.idRoom, this.textMsg).subscribe(
        result => {
            this.textMsg = '';
          },
        err => {
          toastr.error("No se ha podido guardar el mensaje");
        }
      );
    }

}
