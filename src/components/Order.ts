import { Form } from './common/Form';
import { IOrder } from '../types';
import { IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IOrder> {
	protected _cash: HTMLButtonElement;
	protected _card: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._cash = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.container
		);
		this._card = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.container
		);

		this._card.addEventListener('click', () => (this.payment = 'Онлайн'));
		this._cash.addEventListener(
			'click',
			() => (this.payment = 'При получении')
		);
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set payment(value: string) {
		const isOnline = value === 'Онлайн';
		const isOnDelivery = value === 'При получении';

		this._card.classList.toggle('button_alt-active', isOnline);
		this._cash.classList.toggle('button_alt-active', isOnDelivery);
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}
}

export class Contact extends Form<IOrder> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}
}
