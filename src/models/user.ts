export class User{

	constructor(
		public id: number,
		public name: string,
		public lastName: string,
		public password: string,
		public email: string,
		public photo: string,
		public registrationDate: string,
		public availableCredit: number,
		public state: number,
		public role: number,
		public shoppingCart: number
	){}

}