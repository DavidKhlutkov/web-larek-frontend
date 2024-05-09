import './scss/styles.scss';
import { 
    ensureElement,
    cloneTemplate,
    createElement
} from './utils/utils';
import { 
    ICard,
    IForm,
    IBasketView,
    ISuccess,
    IProductItem,
    IFormResponse,
    IAppState,
} from './types';
import { Api , ApiListResponse } from './components/base/api'
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi} from './components/WebLarekApi';
import { CatalogChangeEvent} from './components/AppData';
import { EventEmitter } from './components/base/events';
import { Card} from './components/Card';
import { Page } from './components/Page';
import { AppState } from './components/AppData';
import { Order} from './components/Order';
import { Modal } from './components/common/Modal';

const api = new AppApi(API_URL, CDN_URL );
const events = new EventEmitter();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const cardTemlate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

//Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

//TODO: Переиспользуемые части интерфейса


// Каталог
events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card(cloneTemplate(cardTemlate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
    });
});

// отображение карточки
events.on('card:select', (item: IProductItem) => {
    appData.setPreview(item); 
})

// Выбор карточки
events.on('card:select', (item: IProductItem) => {
    page.locked = true;
    const card = new Card(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
            events.emit('card:toBasket', item)
        },
    });
    modal.render({
        content: card.render({
            id: item.id,
            title: item.title,
            image: item.image,
            category: item.category,
            description: item.description,
            price: item.price,
            buttonTitle: 'Добавить в корзину',
        }),
    });
});


// При открытии модального окна блокируем страницу
events.on('modal:open', () => {
	page.locked = true;
});

// При закрытии модального окна разблокируем страницу
events.on('modal:close', () => {
	page.locked = false;
});

// Получение и отправка данных
api.getProductList()
.then(appData.setCatalog.bind(appData))
.catch(err => {
    console.error(err);
});