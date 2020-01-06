export class ProductReport{

	constructor(
		public id: number,
		public description: string,
		public price: number,
		public code: string,
		public seller: string,
		public fatherCategory: string,
		public category: string,
		public color: string
	){}

}