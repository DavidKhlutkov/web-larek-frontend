import { Model } from "./base/Model";
import {
  IProductItem,
  IBasket,
  Order,
  ISuccessResult,
  IAppState,
  FormErrors
} from "../types";

  
export interface CatalogChangeEvent {
  products: IProductItem[];
}

export interface AppState extends Model<IAppState> {
  basket: IBasket | null;
  order: Order | null;
  formErrors: FormErrors | null;
  catalog: IProductItem[] | null;
  success: ISuccessResult | null;

  SetCatalog(items: IProductItem[]) {
    this.catalog = items;
    this.emitChanges("items:changed", { catalog: this.catalog })
  }
  
  SetSuccess(success: ISuccessResult) {
    
  }
}

