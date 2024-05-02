import { Api , ApiListResponse } from './base/api';
import {
    IProductItem,
    Order,
    IOrderResponse,
} from '../types';


interface IApi {
  getProductList: () => Promise<IProductItem[]>;
  getProductItems: (id: string) => Promise<IProductItem[]>;
  postOrder: (order: Order) => Promise<IOrderResponse>;
}

export class ApiWebLarek extends Api implements IApi { 
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
  
  getProductItems(id: string): Promise<IProductItem[]> {
    return this.get(`/product/${id}`).then((item: IProductItem) => ({
			...item,
			image: this.cdn + item.image,
		}));
  }

  postOrder(order: Order): Promise<IOrderResponse> {
		return this.post('/order', order).then((data: IOrderResponse) => data);
	}
}