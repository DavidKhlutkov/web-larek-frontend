export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }

  export  interface IProductData {
    items: IProductItem[];
    preview: string;
  }


  export interface IBasketView {
    items: HTMLElement[];
    price: number;
    selected: string[];
  }

  export interface IOrder {
    adress: string;
    payment: string;
  }

  export interface IContact {
    phone: string;
    email: string;
  }

  export interface IForm extends IOrder, IContact {
    total: number;
    items: string[];
  }

  export interface IFormResponse {
    id: string;
    total: number;
  }

  export type FormErrors = Partial<Record<keyof IForm, string>>;

  export interface ISuccess {
    total: number;
  }

  export interface IAppState {
    products: IProductItem[];
    basket: IProductItem[];
    order: IForm;
    orderResponse: IFormResponse | null;
    prewiew: string | null;
  }
