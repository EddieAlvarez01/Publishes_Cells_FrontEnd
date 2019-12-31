export class Cart{

	constructor(
		public idProduct: number,
		public description: string,
		public price: number,
		public quantity: number,
		public stock: number,
		public code: string
	){}

}