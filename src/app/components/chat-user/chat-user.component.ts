import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { WebSocketService } from '../../services/chat.service';

import { User } from '../../../models/user';

//Libreria JS
import * as toastr from 'toastr';
declare var $:any;

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css'],
  providers: [ApiService, WebSocketService]
})
export class ChatUserComponent implements OnInit {

	public user: User;
	public helpDeskList: any[];
	public slcHelpDesk: string;
	public idRoomUser: number;
	public messages: any[];
	public textMsg: string;
  public idHD: number;
  public nameHelpDesk: string;

  	constructor(
  		private _apiService: ApiService,
  		private _webSocketService: WebSocketService
  	) { 
  		this.user = JSON.parse(localStorage.getItem("user"));
  		this.idRoomUser = 0;
  		this.messages = [];
  	}

  	ngOnInit() {
  		this._apiService.GetRoomUser(this.user.id).subscribe(
  			result => {
  				let rows = result.rows;
  				if(rows.length > 0){
  					this.idRoomUser = rows[0].IDROOM;
  					this._webSocketService.JoinRoom({idRoom: this.idRoomUser});
            this._apiService.GetAllMessagesRoom(this.idRoomUser).subscribe(
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
  					this._webSocketService.newMessageReceived().subscribe(
  						data => {
  							if(data.transmitter != this.user.id){
  								this.messages.push(data);
  							}
  						}
  					);
  				}else{
  					this._apiService.GetAllHelpDesk().subscribe(
  						result => {
  							this.helpDeskList = result.rows;
  						},
  						err => {
  							toastr.error("Error al cargar los help desk");
  						}
  					);
  				}
  			},
  			err => {
  				toastr.error("Error al cargar el room del usuario");
  			}
  		);
  	}

  	CreateRoom(){
  		let idHelpDesk = parseInt(this.slcHelpDesk);
  		this._apiService.CreateRoomUser(idHelpDesk, this.user.id).subscribe(
  			result => {
  				this.idRoomUser = result.data.v_id;
  				this._webSocketService.JoinRoom({idRoom: this.idRoomUser});
  				this._webSocketService.newMessageReceived().subscribe(
  						data => {
  							if(data.transmitter != this.user.id){
  								this.messages.push(data);
  							}
  						}
  				);
  			},
  			err => {
  				toastr.error("Error al crear el room del chat");
  			}
  		);
  	}

  	SendMessage(){
  		let msg = {
  			idRoom: this.idRoomUser, transmitter: this.user.id, content: this.textMsg, photo: this.user.photo
  		}
  		this.messages.push(msg);
  		this._webSocketService.SendMessage(msg);
      this._apiService.CreateNewMessage(this.user.id, this.idRoomUser, this.textMsg).subscribe(
        result => {
            this.textMsg = '';
          },
        err => {
          toastr.error("No se ha podido guardar el mensaje");
        }
      );
  	}

    InitializeModel(){
      this._apiService.GetHelpDeskRoom(this.idRoomUser).subscribe(
        result => {
          result.rows.forEach((element) => {
            if(element.IDUSER != this.user.id){
              this.idHD = element.IDUSER;
              this.nameHelpDesk = element.NAME + ' ' + element.LASTNAME;
              $('#modalScore').modal();
              return;
            }
          });
        },
        err => {
          toastr.error("Error al traer al help desk");
        }
      );
    }

    ConfirmScore(){
      let score = parseInt($('#slModalStock').val());
      this._apiService.CreateNewRating(this.idRoomUser, this.idHD, this.user.id, score).subscribe(
        result => {
          $('#modalScore').modal("hide");
          this.idRoomUser = 0;
          toastr.success("Finalizo la sesión con el help disk");
        },
        err => {
          toastr.error("Error al reportar score del helpdesk");
        }
      );
    }

}
