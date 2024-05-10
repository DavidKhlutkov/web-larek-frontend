import { IOrder, IContact, IForm, IFormResponse, IProductItem } from '../types';
import { Api, ApiListResponse } from './base/api';

export interface IAppAPI {
	getProductList: () => Promise<IProductItem[]>;
	getProductItem: (id: string) => Promise<IProductItem>;
	order: (order: IForm) => Promise<IFormResponse>;
}

export class AppApi extends Api implements IAppAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);

		this.cdn = cdn;
	}

	getProductList(): Promise<IProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	// getProductList(): Promise<IProductItem[]> {
	// 	return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
	// 		data.items.map((item) => ({
	// 			...item,
	// 			image: this.cdn + item.image,
	// 		}))
	// 	);
	// }

	getProductItem(id: string): Promise<IProductItem> {
		return this.get(`/product/${id}`).then((item: IProductItem) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	order(order: IForm): Promise<IFormResponse> {
		return this.post('/order', order).then((data: IFormResponse) => data);
	}
}