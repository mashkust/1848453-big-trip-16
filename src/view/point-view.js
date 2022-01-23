import AbstractView from './abstract-view.js';
import {createFavotiteTemplate,createOffersPointTemplate, createDuration} from '../mock/templates.js';
import dayjs from 'dayjs';

const createPointTemplate = (POINT) => {
  const point= `<li class="trip-events__item" id=${POINT.id} >
      <div class="event">
        <time class="event__date" datetime="${dayjs(POINT.dateFrom).format('YYYY-MM-DD')}">${dayjs(POINT.dateFrom).format('MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${POINT.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${POINT.type} ${POINT.destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayjs(POINT.dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(POINT.dateFrom).format('H:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${dayjs(POINT.dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(POINT.dateTo).format('H:mm')}</time>
          </p>
          <p class="event__duration">${createDuration(POINT.dateTo, POINT.dateFrom)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${POINT.baseprice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            ${createOffersPointTemplate(POINT)}
          </li>
        </ul>
        <button class="event__favorite-btn  ${createFavotiteTemplate(POINT)}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
  return point;
};

export default class PointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}

