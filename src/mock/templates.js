import {generateOfferForEdititing} from './utils.js';
import dayjs from 'dayjs';
const MINUTES = 60;

export const createOffersPointTemplate = (POINT) => {
  const someArray = [];
  if (POINT.offers.offers !== undefined && POINT.offers.offers.length !== 0) {
    POINT.offers.offers.forEach((el) => {
      const offersTemplate= `<span class="event__offer-title">${el.offers.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${el.offers.price}</span>`;
      someArray.push(offersTemplate);
    });
    return someArray.join(',');
  }
  return '';
};

export const createDestinationsName = (destinations) => {
  const someArray = [];
  destinations.forEach((el) => {
    const offersTemplate= `<option value="${el.destination.name}">${el.destination.name}</option>`;
    someArray.push(offersTemplate);
  });
  return someArray.join(' ');
};

export const createFavotiteTemplate = (POINT) => {
  if (POINT.isFavorite===true) {
    return 'event__favorite-btn--active';
  }
  return '';
};

export const createPhotosTemplate = (pictures) => {
  const someArray = [];
  if (pictures !== undefined && pictures.length !== 0) {
    pictures.forEach((el) => {
      const photo= `<img class="event__photo" src=${el.src} alt="Event photo">`;
      someArray.push(photo);
    });
  }
  return someArray;
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

export const editOffersPointTemplate = (type, pointId, checkedOffers, offers) => {
  const offerForEdititing = generateOfferForEdititing(type, offers);
  const someArray = [];
  if (offerForEdititing.offers !== undefined ) {
    offerForEdititing.offers.forEach((el) => {
      let foundCheckedOffer = false;
      if (checkedOffers.offers.length > 0) {
        foundCheckedOffer = checkedOffers.offers.find((elem) => elem.offers.title === el.title);
      }
      const template= `<div class="event__offer-selector">
      <input ${foundCheckedOffer && 'checked'} class="event__offer-checkbox  visually-hidden" id="${`${el.id}${pointId}`}" type="checkbox" name="${`${el.id}${pointId}`}" >
      <label class="event__offer-label" for="${`${el.id}${pointId}`}">
        <span class="event__offer-title">${el.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${el.price}</span>
      </label>
      </div>`;
      someArray.push(template);
    });
  }
  return someArray.join('');
};
