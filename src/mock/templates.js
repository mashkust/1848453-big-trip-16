import {generateOfferForEdititing} from './task.js';
import {offers} from './arrays.js';

export const createOffersPointTemplate = (POINT) => {
  const ARRAY = [];
  if (POINT.offers.offers !== undefined || POINT.offers.offers.length !== 0) {
    POINT.offers.offers.forEach((el) => {
      const offersTemplate= `<span class="event__offer-title">${el.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${el.price}</span>`;
      ARRAY.push(offersTemplate);
    });
  }
  return ARRAY;
};

export const createFavotiteTemplate = (POINT) => {
  if (POINT.isFavorite===true) {
    return 'event__favorite-btn--active';
  }
  return '';
};

export const createPhotosTemplate = (pictures) => {
  const ARRAY = [];
  if (pictures !== undefined || pictures.length !== 0) {
    for (let i=0; i<pictures.length ;i++) {
      const photo= `<img class="event__photo" src=${pictures[i].src} alt="Event photo">`;
      ARRAY.push(photo);
    }
  }
  return ARRAY;
};

export const createCheckedTemplate= (type,someValue) => {
  if (type === String(someValue)) {
    return 'checked';
  }
  return '';
};

export const editOffersPointTemplate = (type) => {
  const offerForEdititing = generateOfferForEdititing(type, offers);
  const ARRAY = [];
  if (offerForEdititing.offers !== undefined || offerForEdititing.offers.length !== 0) {
    //console.log('offerForEdititing.offers', offerForEdititing.offers);
    offerForEdititing.offers.forEach((el) => {
      const template= `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${el.id}" type="checkbox" name="${el.id}" >
      <label class="event__offer-label" for="${el.id}">
        <span class="event__offer-title">${el.title}e</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${el.price}</span>
      </label>
    </div>`;
      ARRAY.push(template);
    });
  }
  return ARRAY;
};
