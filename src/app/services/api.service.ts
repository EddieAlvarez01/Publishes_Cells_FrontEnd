import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService{

	public url: string;

	constructor(
		public _http: HttpClient 
	){
		this.url = 'http://localhost:3700/api'
	}

	//Consume la api de un metodo get, que devuelve la info de la pagina
	GetDataHome(): Observable<any>{
		return this._http.get(this.url + '/getDataHome');
	}

	//Consume la api, por metodo post para insertar un usuario
	RegisterUser(name: string, lastname: string, password: string, email: string, phone: string, photo: string, gender: string, birthDay: string, registrationDate: string, 
				address: string, availableCredit: number, profitEarned: number, state: number, idRole: number, idMemberClass: number): Observable<any>{
		return this._http.post(this.url + '/registerUser', 
			{
				name: name,
				lastName: lastname,
				password: password,
				email: email,
				phone: phone,
				photo: photo,
				gender: gender,
				birthDay: birthDay,
				registrationDate: registrationDate,
				address: address,
				availableCredit: availableCredit,
				profitEarned: profitEarned,
				state: state,
				idRole: idRole,
				idMemberClass: idMemberClass
			}
		);
	}

	//envia el email para confirmación de correo
	SendConfirmation(email: string, name: string): Observable<any>{
		return this._http.post(this.url + '/sendEmailRegister', 
			{
				email: email,
				name: name
			}
		);
	}

	//Consume endpoint de login
	LoginUser(email: string, password: string): Observable<any>{
		return this._http.post(this.url + '/loginUser', 
			{
				email: email,
				password: password
			}
		);
	}

	//consume el update del estado de un usuario
	EmailConfirm(email: string): Observable<any>{
		return this._http.put(this.url + '/emailConfirm/' + email, null);
	}

	//llama al procedimineto que inserta productos
	RegisterNewProduct(code: string, img: string, description: string, fatherCategory: string, daughterCategory: string, price: number, color: string, publicationDate: string,
						idUser: number, stock: number): Observable<any>{
		return this._http.post(this.url + '/registerProduct', 
			{
				code: code,
				img: img,
				description: description,
				fatherCategory: fatherCategory,
				daughterCategory: daughterCategory,
				price: price,
				color: color,
				publicationDate: publicationDate,
				idUser: idUser,
				stock: stock
			}
		);
	}

	//Devuelve todas las categorias
	GetAllCategories(): Observable<any>{
		return this._http.get(this.url + '/getAllCategories');
	}

	//Devuelve todos los productos a un cliente no logeado
	GetAllProductsNoLoggedCustomer(): Observable<any>{
		return this._http.get(this.url + '/getAllProduct_AllCategories');
	}

	//Devuelve todos los productos filtrado por categoria a un cliente no logeado
	GetAllProductsNoLoggedByCategory(idCategory: number): Observable<any>{
		return this._http.get(this.url + '/getAllProductNoLogedByCategory/' + idCategory);
	}

	//Devuelve todos los productos por una coincidencia de texto
	GetAllProductsNoLoggedMatch(matchTxt: string): Observable<any>{
		return this._http.get(this.url + '/getAllProductsNoLoggedMatch/' + matchTxt.toLowerCase());
	}

	//Devuelve todos los productos por una coincidencia de texto y por categoria
	GetAllProductsNoLoggedMatchByCategory(idCategory: number, matchTxt: string): Observable<any>{
		return this._http.get(this.url + '/getAllProductsNoLoggedMatchByCategory/' + idCategory + "/" + matchTxt.toLowerCase());
	}

	//Devuelve un producto para la pantalla individual
	GetProductId(idProduct: number): Observable<any>{
		return this._http.get(this.url + '/getProductId/' + idProduct);
	}

	//Devuelve para un usuario logeado los productos publicados que no son suyos
	GetProductsByUser(idUser: number): Observable<any>{
		return this._http.get(this.url + '/getProductsUser/' + idUser);
	}

	//Devuele para un usuario logeado los productos publicados que no son suyos por categoria seleccionada
	GetProductsUserByCategory(idCategory: number, idUser: number): Observable<any>{
		return this._http.get(this.url + '/getProductsUserByCategory/' + idUser + '/' + idCategory);
	}

	//DDevuele para un usuario logeado los productos publicados que no son suyos por filtrado de busqueda
	GetProductsUserMatch(idUser: number, matchTxt: string): Observable<any>{
		return this._http.get(this.url + '/getProductsUserMatch/' + idUser + '/' + matchTxt.toLowerCase());
	} 

	//Devuele para un usuario logeado los productos publicados que no son suyos por filtrado de busqueda y categoria
	GetProductsUserMatchByCategory(idUser: number, matchTxt: string, idCategory: number): Observable<any>{
		return this._http.get(this.url + '/getProductsUserMatchByCategory/' + idUser + '/' + idCategory + '/' + matchTxt.toLowerCase());
	}
}