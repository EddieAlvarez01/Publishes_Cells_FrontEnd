import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService{

	public url: string;

	constructor(
		public _http: HttpClient 
	){
		this.url = 'http://192.168.43.109:3700/api'
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

	//Devuelve el logo del sitio
	GetNameLogo(): Observable<any>{
		return this._http.get(this.url + '/getNameLogo');
	}

	//Inserta en la tabla del carrito, añadir nuevos productos
	AddProductToCart(idShoppingCart: number, idProduct: number, quantity: number): Observable<any>{
		return this._http.post(this.url + '/addProductToCart', 
			{
				idShoppingCart: idShoppingCart,
				idProduct: idProduct,
				quantity: quantity
			}
		);
	}

	//Verificar si esta ya el producto en el carrito
	VerifyProductCart(idShoppingCart: number, idProduct: number): Observable<any>{
		return this._http.get(this.url + '/VerifyProductCart/' + idShoppingCart + '/' + idProduct);
	}

	//Devuelve los productos del carrito del usuario en sesion
	GetProductsShoppingCart(idShoppingCart: number): Observable<any>{
		return this._http.get(this.url + '/getProductsShoppingCart/' + idShoppingCart);
	}

	//Borra un elemento del carro de compras
	DeleteProductCart(idShoppingCart: number, idProduct: number): Observable<any>{
		return this._http.delete(this.url + '/deleteProductCart/' + idShoppingCart + '/' + idProduct);
	}

	//Genera la factura, devuelve el id de la factura, resta el monto al usuario, le suma e monto al vendedor y borra los productos del carrito
	BuyProducts(idUser: number, nameClient: string, idShoppingCart: number, dateBill: string, total: number): Observable<any>{
		return this._http.post(this.url + '/buyProducts', 
			{
				idUser: idUser,
				nameClient: nameClient,
				idShoppingCart: idShoppingCart,
				dateBill: dateBill,
				total: total
			}
		);
	}

	//Manda el correo de la factura
	SendBillEmail(email: string, idUser: number, name: string, htmlPart: string, total: number): Observable<any>{
		return this._http.post(this.url + '/sendEmailBill', 
			{
				email: email,
				idUser: idUser,
				name: name,
				htmlPart: htmlPart,
				total: total
			}
		);
	}

	//Traer la ponderacion un producto
	GetRatingProduct(idProduct: number): Observable<any>{
		return this._http.get(this.url + '/getRatingProduct/' + idProduct);
	}

	//Traer las dos propiedades para el detalle de ponderacion y comentarios de producto
	GetProductRating(idProduct: number): Observable<any>{
		return this._http.get(this.url + '/getProductForReview/' + idProduct);
	}

	//Traer los comentarios y puntuaciones de ese producto
	GetCommentsProduct(idProduct: number): Observable<any>{
		return this._http.get(this.url + '/GetCommentaryProduct/' + idProduct);
	}

	//Traer la puntuacion del usuario en sesion para un producto
	GetScoreProductByUser(idProduct: number, idUser: number): Observable<any>{
		return this._http.get(this.url + '/GetRatingByUserForProduct/' + idProduct + '/' + idUser);
	}

	//Actualiza o inserta una nueva puntuación que un usuario le da a un producto
	UpdateScoreByUser(idProduct: number, idUser: number, quantity: number): Observable<any>{
		return this._http.post(this.url + '/UpdateScoreByUserForProduct', 
			{
				idProduct: idProduct,
				idUser: idUser,
				quantity: quantity
			}
		);
	}

	//Nuevos comentarios en un producto
	NewCommentary(creationDate: string, title: string, content: string, idUser: number, idProduct: number): Observable<any>{
		return this._http.post(this.url + '/InsertNewCommentary', 
			{
				creationDate: creationDate,
				title: title,
				content: content,
				idUser: idUser,
				idProduct: idProduct
			}
		);
	}

	//Actualizar datos de la pagina home
	UpdateDataHome(mision: string, vision: string, aboutme: string, slogan: string): Observable<any>{
		return this._http.put(this.url + '/updateDataHome', 
			{
				mision: mision,
				vision: vision,
				aboutme: aboutme,
				slogan: slogan
			}
		);
	}

	//Trae la información buscada del reporte 2 del enunciado
	GetDataReport2(year: number): Observable<any>{
		return this._http.get(this.url + '/getHelDeskMaleAboveYear/' + year);
	}

	//Trear la información del reporte 3
	GetDataReport3(year: number): Observable<any>{
		return this._http.get(this.url + '/getAdminYear/' + year);
	}

	//Traer informacion del reporte 4, mas ganancias
	GetClientsMoreProfits(): Observable<any>{
		return this._http.get(this.url + '/getUsersHigherProfit');
	}

	//Traer la información del reporte 6, top 3 productos
	GetTop3Productos(): Observable<any>{
		return this._http.get(this.url + '/getTop3Products');
	}

	//Traer la informacion del reporte 7, top 3 clientes con mas productos
	GetTop3Customers(): Observable<any>{
		return this._http.get(this.url + '/getTop3Customers');
	}

	//Trear la informacion del reporte 9, cantidad de comentarios de productos por fecha
	GetProductsComments(date: string): Observable<any>{
		return this._http.get(this.url + '/getProductsComments/' + date);
	}

	//Traer la informacion del reporte 10 productos con alguna cantidad disponible
	GetStockProduct(stock: number):Observable<any>{
		return this._http.get(this.url + '/getProductsStock/' + stock);
	}

	//Traer la información del reporte 11, 3 productos peor calificados
	GetTop3WorstScore(): Observable<any>{
		return this._http.get(this.url + '/getProductsRatingTop3');
	}

	//Traer la informacion del reporte 5
	GetProductsByAverage(stars: number): Observable<any>{
		return this._http.get(this.url + '/getProductsByWeighing/' + stars);
	}

	GetUserForEdit(idUser: number): Observable<any>{
		return this._http.get(this.url + '/getUserForEdit/' + idUser);
	}

	//Sube la imagen al servidor y devuelve su nombre
	makeFileRequest(params: Array<string>, files: Array<File>, name: string){
		return new Promise((resolve, reject) => {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();
			for(let i = 0; i < files.length; i++){
				formData.append(name, files[i], files[i].name);
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}
			xhr.open('POST', this.url + '/uploadImage', true);
			xhr.send(formData);
		});
	}

	//Sube el video al servidor y devuelve el nombre
	makeFileRequestVideo(params: Array<string>, files: Array<File>, name: string){
		return new Promise((resolve, reject) => {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();
			for(let i = 0; i < files.length; i++){
				formData.append(name, files[i], files[i].name);
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}
			xhr.open('POST', this.url + '/uploadVideo', true);
			xhr.send(formData);
		});
	}

	UpdateUserProfile(idUser: number, name: string, lastName: string, email: string, address: string, phone: string, password: string, nameImg: string): Observable<any>{
		return this._http.put(this.url + '/updateUserProfile', 
			{
				idUser: idUser,
				name: name,
				lastName: lastName,
				address: address,
				phone: phone,
				password: password,
				nameImg: nameImg,
				email: email
			}
		);
	}

	GetAllProducts(): Observable<any>{
		return this._http.get(this.url + '/getAllProducts');
	}

	GetFatherCategory(idCategory: number): Observable<any>{
		return this._http.get(this.url + '/getFatherCategory/' + idCategory);
	}

	//Trae los usuarios para listar en el crud de usuarios del administrador
	GetUserCrud(): Observable<any>{
		return this._http.get(this.url + '/getUserCrud');
	}

	//Actualiza un usuario seleccionado en el crud
	UpdateUserCrud(idUser: number, name: string, lastName: string, password: string, email: string, phone: string, address: string): Observable<any>{
		return this._http.put(this.url + '/updateUserCrud', 
			{
				idUser: idUser,
				name: name,
				lastName: lastName,
				password: password,
				email: email,
				phone: phone,
				address: address
			}
		);
	}

	//ELiminar un usuario desde el crud(Si da error es porque tiene amarrado cosas[foraneas])
	DeleteUserCrud(idUser: number): Observable<any>{
		return this._http.delete(this.url + '/deleteUser/' + idUser);
	}

	//Trae un usuario en base al id, solo con los datos para editar en el crud
	GetUserForEditCrud(idUser: number): Observable<any>{
		return this._http.get(this.url + '/getUserForCrud/' + idUser);
	}

	//Trae la categoria para listar en el crud
	GetAllCategoriesForCrud(): Observable<any>{
		return this._http.get(this.url + '/getAllCategoriesForCrud');
	}

	//Crear una nueva categoria, si el nombre esta repetido no se creará
	CreateCategory(name: string, description: string, idFather: number): Observable<any>{
		return this._http.post(this.url + '/createCategory', 
			{
				name: name,
				description: description,
				idFather: idFather
			}
		);
	}

	//Actualizar informacion por medio del crud de una categoria
	UpdateCategory(id: number, name: string, description: string): Observable<any>{
		return this._http.put(this.url + '/updateCategory', 
			{
				idCategory: id,
				name: name,
				description: description
			}
		);
	}

	/*ELiminar una categoria, si es padre y posee hijas dara error, puesto que una padre eliminaria todas las hijas y si estas estan anidadas a un producto
	tendrian que eliminar esos productos o quedarse sin clasificar, es un error, igual si estan refrencias a un proucto dara error la eliminación*/
	DeleteCategory(idCategory: number): Observable<any>{
		return this._http.delete(this.url + '/deleteCategory/' + idCategory);
	}

	//Traer por un id, la categoria para su edición
	GetCategoryId(idCategory: number): Observable<any>{
		return this._http.get(this.url + '/getCategoryByid/' + idCategory);
	}

	//Traer el room del chat del usuario
	GetRoomUser(idUser: number): Observable<any>{
		return this._http.get(this.url + '/getRoomUser/' + idUser);
	}

	//Crear el room de chat para un usuario
	CreateRoomUser(idHelpDesk: number, idUser: number): Observable<any>{
		return this._http.post(this.url + '/createRoomUser', 
			{
				idHelpDesk: idHelpDesk,
				idUser: idUser
			}
		);
	}

	//Trae la lista de todos los help desk
	GetAllHelpDesk(): Observable<any>{
		return this._http.get(this.url + '/getAllHelpDesk');
	}

	//Traer todos los mensajes de un room
	GetAllMessagesRoom(idRoom: number): Observable<any>{
		return this._http.get(this.url + '/getAllMessagesRoom/' + idRoom);
	}

	//Inserta un nuevo mensaje en la bd
	CreateNewMessage(idUser: number, idRoom: number, content: string): Observable<any>{
		return this._http.post(this.url + '/createNewMessage', 
			{
				idUser: idUser,
				idRoom: idRoom,
				content: content
			}
		);
	}

	//TRae al help desk para ser calificado
	GetHelpDeskRoom(idRoom: number): Observable<any>{
		return this._http.get(this.url + '/getHelpDeskRoom/' + idRoom);
	}

	//Inserta en la tabal de calificacion a un help desk y borra el room del chat
	CreateNewRating(idRoom: number, idHelpDesk: number, idUser: number, quantity: number): Observable<any>{
		return this._http.post(this.url + '/newRatingUser', 
			{
				idHelpDesk: idHelpDesk,
				idUser: idUser,
				quantity: quantity,
				idRoom: idRoom
			}
		);
	}

	//Devuelve todos los help desk con su promedio de puntuación
	GetHelpDeskAverage(): Observable<any>{
		return this._http.get(this.url + '/getHelpDeskAverage');
	}

	//Actualiza el video de home
	UpdateVideoHome(video: string): Observable<any>{
		return this._http.put(this.url + '/updateVideo',
			{
				video: video
			}
		);
	}

	//Actualiza el logo de la pagina
	UpdateLogo(image: string): Observable<any>{
		return this._http.put(this.url + '/updateLogo',
			{
				image: image
			}
		);
	}

	//Actualiza el estado para dar de baja o alta y registra en la bitacora
	UpdateState(idUser: number, idAdmin: number, idAction: number){
		return this._http.put(this.url + '/updateStatus', 
			{
				idUser: idUser,
				idAdmin: idAdmin,
				idAction: idAction
			}
		);
	}

}