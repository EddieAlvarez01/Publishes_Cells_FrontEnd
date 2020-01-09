import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TransferService{

	private createUserSource = new Subject<any>();
	private createLogoSource = new Subject<any>();

	public createSource$ = this.createUserSource.asObservable();
	public creteoLogo$ = this.createLogoSource.asObservable();

	CreateUserLogin(user){
		this.createUserSource.next(user);
	}

	UpdateImage(image: string){
		this.createLogoSource.next(image);
	}

}