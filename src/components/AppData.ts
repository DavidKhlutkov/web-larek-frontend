import { Model } from './base/Model';
import {
	IProductItem,
	IForm,
	IAppState,
	FormErrors,
	IOrder,
	IContact,
} from '../types';

export interface CatalogChangeEvent {
	products: IProductItem[];
}

export class AppState extends Model<IAppState> {
	catalog: IProductItem[];
	basket: IProductItem[] = [];
	order: IForm = {
		total: 0,
		items: [],
		phone: '',
		email: '',
		payment: '',
		address: '',
	};
	orderError: FormErrors = {};
	preview: string | null;

	addBasket(product: IProductItem) {
		this.basket.push(product);
		this.UpdateBasket();
	}

	removeBasket(product: IProductItem) {
		this.basket = this.basket.filter((item) => item.id !== product.id);
		this.UpdateBasket();
	}
	// TODO: refactor a pich form
	clearBasket() {
		this.basket = [];
		this.UpdateBasket();
	}

	UpdateBasket() {
		this.events.emit('catalog:change', {
			products: this.basket,
		});
		this.events.emit('basket:change', {
			products: this.basket,
		});
	}

	getTotal(): number {
		return this.order.items.reduce(
			(acc, item) => acc + this.catalog.find((i) => i.id === item).price,
			0
		);
	}

	setCatalog(products: IProductItem[]) {
		this.catalog = products;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setOrderField(field: keyof IOrder, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setContactField(field: keyof IContact, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.orderError = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.orderError = errors;
		this.events.emit('formErrors:change', this.orderError);
		return Object.keys(errors).length === 0;
	}

	validateContact() {
		const errors: typeof this.orderError = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.orderError = errors;
		this.events.emit('formErrors:change', this.orderError);
		return Object.keys(errors).length === 0;
	}

	setPreview(item: IProductItem) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	orderReset(): void {
		this.order.address = '';
		this.order.payment = '';
	}

	contactReset(): void {
		this.order.email = '';
		this.order.phone = '';
	}
}
