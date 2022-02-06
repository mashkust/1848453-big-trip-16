import AbstractView from './abstract-view.js';
import {FilterType} from '../utils/arrays.js';

const noPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future tasks',
  [FilterType.PAST]: 'There are no past tasks',
};

const createListTemplate = (filterType) => `<p class="trip-events__msg">${noPointsTextType[filterType]}</p>`;

export default class filterMessageView extends AbstractView{
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListTemplate(this.#filterType);
  }
}
