interface EventEmitter {
    emit: <T extends object>(event: string, data?: T) => void;
}
interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }
  
  interface IProductList {
    total: number;
    products: IProductItem[];
  }
  
  interface IError {
    error: string;
  }
  
  interface IBasket {
    items: Map<string, number>;
    add: (id: string) => void;
    remove: (id: string) => void;
  }

  interface IOrder {
    adress: string;
    payment: string;
  }

  interface IContact {
    phone: string;
    email: string;
  }

  interface IModal {
    open: () => void;
    close: () => void;
    submit: () => void;
  }

  interface IForm {
    on: <T extends object>(event: string, callback: (data: T) => void) => void;
    emit: <T extends object>(event: string, data?: T) => void;
    trigger: <T extends object>(event: string, context?: Partial<T>) => (data: T) => void;
    reset: () => void;
  }

  interface IModalBasket extends IForm {
    modal: IModal;
    basket: IBasket;
  }

  interface IModalOrder extends IForm {
    modal: IModal;
    order: IOrder;
  }
  
  interface IModalContact extends IForm {
    modal: IModal;
    contact: IContact;
  }

  interface ISuccess {
    close: () => void;
  }
  
  interface IModalSuccess extends IForm {
    modal: IModal;
    success: ISuccess;  
  }

