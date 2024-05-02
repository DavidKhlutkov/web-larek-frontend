export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }

  export interface ICard extends IProductItem {
    index: number;
    buttonTitle: string;
  }

  export interface IBasket {
    items: Map<string, number>;
    add: (id: string) => void;
    remove: (id: string) => void;
  }

  export interface IOrder {
    adress: string;
    payment: string;
  }

  export interface IContact {
    phone: string;
    email: string;
  }

  export interface Order extends IOrder, IContact, IProductItem {
    total: number;
    items: IProductItem[];
  }

  export interface IOrderResponse {
    id: string;
    total: number;
  }

  export type FormErrors = Partial<Record<keyof IOrder, string>>;

  export interface ISuccess {
    close: () => void;
  }

  export interface ISuccessResult {
    id: string;
    total: number;
  }

  export interface IAppState {
    products: IProductItem[];
    basket: IBasket | null;
    contact: IContact | null;
    order: IOrder | null;
    success: ISuccessResult | null;
  }
