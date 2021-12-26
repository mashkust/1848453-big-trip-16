import {generateOfferForEdititing} from './task.js';
import {offers} from './arrays.js';

export const createOffersPointTemplate = (POINT) => {
  const ARRAY = [];
  if (POINT.offers.offers !== undefined || POINT.offers.offers.length !== 0) {
    for (let i=0; i<POINT.offers.offers.length ;i++) {
      const offersTemplate= `<span class="event__offer-title">${POINT.offers.offers[i].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${POINT.offers.offers[i].price}</span>`;
      ARRAY.push(offersTemplate);
    }
  }
  return ARRAY;
};

export const createFavotiteTemplate = (POINT) => {
  if (POINT.isFavorite===true) {
    return 'event__favorite-btn--active';
  }
  return '';
};

export const createPhotosTemplate = (POINT) => {
  const ARRAY = [];
  if (POINT.destination.pictures !== undefined || POINT.destination.pictures.length !== 0) {
    for (let i=0; i<POINT.destination.pictures.length ;i++) {
      const photo= `<img class="event__photo" src=${POINT.destination.pictures[i].src} alt="Event photo">`;
      ARRAY.push(photo);
    }
  }
  return ARRAY;
};

export const createCheckedTemplate= (POINT,someValue) => {
  if (POINT.type === String(someValue)) {
    return 'checked';
  }
  return '';
};

export const editOffersPointTemplate = (POINT) => {
  const offerForEdititing = generateOfferForEdititing(POINT.type, offers);
  const ARRAY = [];
  if (offerForEdititing.offers !== undefined || offerForEdititing.offers.length !== 0) {
    for (let i=0; i<offerForEdititing.offers.length ;i++) {
      const template= `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offerForEdititing.offers[i].id}" type="checkbox" name="${offerForEdititing.offers[i].id}" >
      <label class="event__offer-label" for="${offerForEdititing.offers[i].id}">
        <span class="event__offer-title">${offerForEdititing.offers[i].title}e</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offerForEdititing.offers[i].price}</span>
      </label>
    </div>`;
      ARRAY.push(template);
    }
  }
  return ARRAY;
};
