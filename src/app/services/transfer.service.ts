import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TransferService{

	private createUserSource = new Subject<any>();

	public createSource$ = this.createUserSource.asObservable();

	CreateUserLogin(user){
		this.createUserSource.next(user);
	}

}