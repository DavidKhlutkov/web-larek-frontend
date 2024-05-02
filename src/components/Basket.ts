import {IBasket} from '../types';
import { EventEmitter } from './base/events';
import { Component } from './base/Component';
import { ensureElement , createElement } from '../utils/utils';

/*export class Basket implements IBasket {
    items: Map<string, number> = new Map();
    add(id: string): void {
      if(!this.items.has(id)) this.items.set(id, 0)
        this.items.set(id, this.items.get(id)! + 1); 
  }  
    remove(id: string): void {
      if(!this.items.has(id)) return;
      if(this.items.get(id)! > 0) {
        this.items.set(id, this.items.get(id)! - 1);
        if(this.items.get(id) === 0) this.items.delete(id);
      }
  }
}*/

// export class BasketModel implements IBasket {
//   constructor(protected events: EventEmitter) {}
// }

