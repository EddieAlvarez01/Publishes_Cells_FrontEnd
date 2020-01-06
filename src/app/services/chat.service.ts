import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebSocketService {


	constructor(){
		
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