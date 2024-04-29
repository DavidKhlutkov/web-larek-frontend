export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }
  
  export interface ApiListResponse {
    total: number;
    products: IProductItem[];
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

  export interface IModal {
    open: () => void;
    close: () => void;
    submit: () => void;
  }

  export interface IEventEmitter {
    on: (event: string, callback: () => void) => void;
    emit: (event: string) => void;
    trigger: (event: string) => () => void;
  }

  export interface IFormState {
    valid: boolean;
  }

  export type FormErrors = Partial<Record<keyof IOrder, string>>;

  export interface IModalBasket {
    modal: IModal;
    basket: IBasket;
  }

  export interface IModalOrder extends IFormState {
    modal: IModal;
    order: IOrder;
  }
  
  export interface IModalContact extends IFormState {
    modal: IModal;
    contact: IContact;
  }

  export interface ISuccess {
    close: () => void;
  }

  export interface ISuccessResult {
    id: string;
    total: number;
  }
  
  export interface IModalSuccess extends IFormState {
    modal: IModal;
    success: ISuccess;  
  }

