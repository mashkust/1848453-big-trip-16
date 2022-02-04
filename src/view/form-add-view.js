import SmartView from './smart-view.js';
import {createPhotosTemplate, editOffersPointTemplate, createCheckedTemplate, createDestinationsName} from '../mock/templates.js';
import {generateDestination} from '../mock/task.js';
import {types} from '../mock/arrays.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

const addPointTemplate = (POINT, destinations ,offers)=> {
  const {type, destination, baseprice, id, dateFrom, dateTo} = POINT;
  return (
    `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${createCheckedTemplate(type,types[0])}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${createCheckedTemplate(type,types[1])}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${createCheckedTemplate(type,types[2])}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${createCheckedTemplate(type,types[3])}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${createCheckedTemplate(type,types[4])}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${createCheckedTemplate(type,types[5])}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${createCheckedTemplate(type,types[6])}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${createCheckedTemplate(type,types[7])}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${createCheckedTemplate(type,types[8])}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${createDestinationsName(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY H:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY H:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${baseprice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
      <span class="visually-hidden">Open event</span>
    </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${editOffersPointTemplate(type, id, POINT.offers, offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createPhotosTemplate(destination.pictures)}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`
  );
};

export default class FormAddView extends SmartView  {

  constructor(point, destinationsModel, offersModel) {
    super();
    this._data = this.parsePointToData(point);
    this._datepickerFrom = null;
    this._datepickers = {};
    this._destinations = destinationsModel.destinations;
    this._data.destination = this._destinations[0].destination;
    this._offers = offersModel.offers;
    // this._data.offers.offers = this._offers.find((el)=> el.offers.type === this._data.type).offers;

    this.#dateFromChangeHandler = this.#dateFromChangeHandler.bind(this);
    this.#dateToChangeHandler = this.#dateToChangeHandler.bind(this);
    this.#typeChangeHandler = this.#typeChangeHandler.bind(this);
    this.#destinationChangeHandler = this.#destinationChangeHandler.bind(this);
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
    this.parseDataToPoint= this.parseDataToPoint.bind(this);
  }

  get template() {
    return addPointTemplate(this._data,this._destinations , this._offers);
  }

  reset = (point) => {
    this.updateData(
      this.parsePointToData(point)
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #typeChangeHandler = (evt) =>{
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  #priceChangeHandler = (evt) =>{
    evt.preventDefault();
    this.updateData({
      baseprice: evt.target.value,
    });
  }

  #destinationChangeHandler =(evt) =>{
    const newDestination = generateDestination(evt.target.value, this._destinations);
    if (newDestination) {
      this.updateData({
        destination: newDestination.destination
      });
    }
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  #deleteClickHandler = () => {
    this._callback.deleteClick(this.parseDataToPoint(this._data));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const inputs = this.element.querySelectorAll('.event__offer-checkbox');
    const checkedLabels = [];
    if (inputs.length > 0) {
      const checkedInputs = [];
      inputs.forEach((el) => {
        if (el.checked) {
          checkedInputs.push(el.id);
        }
      });
      const allLabels = this.element.querySelectorAll('.event__offer-label');
      allLabels.forEach((label) => {
        if (checkedInputs.includes(label.htmlFor) ) {
          const text = label.querySelector('.event__offer-title').textContent;
          if (text) {
            checkedLabels.push(text);
          }
        }
      });
    }
    this._callback.formSubmit(this.parseDataToPoint(this._data, checkedLabels));
  }

  parsePointToData = (point) => Object.assign({}, point)

  parseDataToPoint = (data, checkedInputs) => {
    data = Object.assign({}, data);
    if (checkedInputs) {
      const offerOfType = this._offers.find((el) => el.offers.type === data.type);
      if (offerOfType) {
        const checkedOffers =  offerOfType.offers.offers.slice(0).filter((el) => checkedInputs.includes(el.title));
        if (checkedOffers.length > 0) {
          data.offers.offers = checkedOffers;
        } else {
          data.offers.offers = [];
        }
      }
    }
    return data;
  }

  #setDateFromDatepicker = () => {
    this.#setupDatepicker(
      'dateFrom',
      '#event-start-time-1',
      {
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler
      }
    );
  }

  #setDateToDatepicker = () => {
    this.#setupDatepicker(
      'dateTo',
      '#event-end-time-1',
      {
        defaultDate: this._data.dateTo,
        minDate: this._data.dateFrom,
        onChange: this.#dateToChangeHandler
      }
    );
  }

  #setupDatepicker = (name, selector, configuration) => {
    if (this._datepickers[name]) {
      this._datepickers[name].destroy();
    }
    const defaults = {
      enableTime: true,
      dateFormat: 'd/m/Y H:i'
    };

    const flatpickrConfig = Object.assign({},
      defaults,
      configuration
    );

    this._datepickers[name] = flatpickr(this.element.querySelector(selector), flatpickrConfig);
  }

  #dateFromChangeHandler = ([userDateFrom]) => {
    this.updateData({
      dateFrom:userDateFrom
    }, true);
  }

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateData({
      dateTo:userDateTo
    }, true);
  }
}

