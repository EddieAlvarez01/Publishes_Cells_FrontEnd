import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {

	public url: string = 'http://192.168.43.109:3700';
	private socket  = io(this.url);

	constructor(){
	}

	JoinRoom(data: any){
		this.socket.emit('join', data);
	}

	SendMessage(data: any){
		this.socket.emit('message', data);
	}

	newMessageReceived(){
		let observable = new Observable<any>(observer => {
			this.socket.on('new-message', (data) => {
				observer.next(data);
			});
			return () => { this.socket.disconnect(); }
		});

		return observable;
	}	

	/*connect(): Rx.Subject<MessageEvent>{
		this.socket = io(this.uri);
		return Rx.Subject.create(Obs)
	}

	listen(eventName: string){
		return new Observable((subscriber) => {
			this.socket.on(eventName, (data) => {
				subscriber.next(data);
			})
		});
	}

	emit(eventName: string, data: any){
		this.socket.emit(eventName, data);
	}*/

}