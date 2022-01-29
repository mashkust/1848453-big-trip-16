import {generateOfferForEdititing} from './task.js';
import {offers} from './arrays.js';
import dayjs from 'dayjs';
const MINUTES = 60;

export const createOffersPointTemplate = (POINT) => {
  const ARRAY = [];
  if (POINT.offers.offers !== undefined || POINT.offers.offers.length !== 0) {
    POINT.offers.offers.forEach((el) => {
      const offersTemplate= `<span class="event__offer-title">${el.offers.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${el.offers.price}</span>`;
      ARRAY.push(offersTemplate);
    });
    return ARRAY.join(',');
  }
  return '';
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

export const createDuration = (to, from) => {
  let difference = dayjs(to).diff(from, 'minutes');

  if (difference > MINUTES) {
    difference = `${Math.floor(difference / MINUTES)}H ${difference % MINUTES}M`;
  } else if (difference % MINUTES === 0) {
    difference = `${Math.floor(difference / MINUTES)}H`;
  } else {
    difference = `${difference} + M`;
  }

  return difference;
};

export const editOffersPointTemplate = (type, pointId, checkedOffers) => {
  const offerForEdititing = generateOfferForEdititing(type, offers);
  const ARRAY = [];
  if (offerForEdititing.offers !== undefined || offerForEdititing.offers.length !== 0) {
    offerForEdititing.offers.forEach((el) => {
      const foundCheckedOffer = checkedOffers.offers.find((elem) => elem.title === el.title);
      const template= `<div class="event__offer-selector">
      <input ${foundCheckedOffer && 'checked'} class="event__offer-checkbox  visually-hidden" id="${`${el.id}${pointId}`}" type="checkbox" name="${`${el.id}${pointId}`}" >
      <label class="event__offer-label" for="${`${el.id}${pointId}`}">
        <span class="event__offer-title">${el.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${el.price}</span>
      </label>
    </div>`;
      ARRAY.push(template);
    });
  }
  return ARRAY.join('');
};
