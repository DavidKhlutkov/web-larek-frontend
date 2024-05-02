import './scss/styles.scss';
import { 
    ensureElement,
    cloneTemplate,
    createElement
} from './utils/utils';
import { Api , ApiListResponse } from './components/base/api'
import { API_URL } from './utils/constants';
import { CatalogChangeEvent} from './components/AppData';
import { EventEmitter } from './components/base/events';
import { Card} from './components/Card';
import { Page } from './components/Page';
import { AppState } from './components/AppData';

const api = new Api(API_URL);
const events = new EventEmitter();

// Темплейты
const cardTemlate = ensureElement<HTMLTemplateElement>('#card-catalog');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
// const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card(cloneTemplate(productTemlate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
            },
        });
    });
});