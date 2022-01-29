import AbstractView from './abstract-view.js';
import {SortType} from '../mock/arrays.js';

const createSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden " type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortType.DAY ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortType.TIME ? 'checked' : ''} >
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortType.PRICE ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`);


export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    // return createSortTemplate();
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.querySelector('.trip-sort__item--price').addEventListener('click', this.#sortTypeChangePrice);
    this.element.querySelector('.trip-sort__item--day').addEventListener('click', this.#sortTypeChangeDay);
    this.element.querySelector('.trip-sort__item--time').addEventListener('click', this.#sortTypeChangeTime);
  }

  #sortTypeChangePrice = (evt) => {
    document.getElementById('sort-price').checked = 'true';
    evt.preventDefault();
    this._callback.sortTypeChange(SortType.PRICE);
  }

  #sortTypeChangeTime = (evt) => {
    document.getElementById('sort-time').checked = 'true';
    evt.preventDefault();
    this._callback.sortTypeChange(SortType.TIME);
  }

  #sortTypeChangeDay = (evt) => {
    document.getElementById('sort-day').checked = 'true';
    evt.preventDefault();
    this._callback.sortTypeChange(SortType.DAY);
  }
}

