import { Model } from "./base/Model";
import {
  IProductItem,
  IForm,
  IAppState,
  FormErrors,
  IOrder,
  IContact,
} from "../types";

  
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
    payment: 'Онлайн',
    adress: '',
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

  clearBasket() {
    this.basket = [];
    this.UpdateBasket();
  }
  
  UpdateBasket() {
    this.events.emit('catalog:change', {
      products: this.basket
    });
  }
  
  clearOrder() {
    this.order = {
      total: 0,
      items: [],
      phone: '',
      email: '',
      payment: 'Онлайн',
      adress: '',
    };
  }

  setCatalog(products: IProductItem[]) {
    this.catalog = products;
    this.emitChanges('items:changed', { catalog: this.catalog });
  }

  setOrderField(field: keyof  IOrder , value: string) {
    this.order[field] = value;

    if (this.validateOrder()) {
        this.events.emit('order:ready', this.order);
    }
}

setContactField(field: keyof  IContact , value: string) {
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
}

