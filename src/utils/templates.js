import {generateOfferForEdititing} from './utils.js';
import dayjs from 'dayjs';

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

const transformsDuration = (days, hours, minutes) => {
  if (days !== 0) {
    const day = dayjs().date(days).format('DD');
    const hour = dayjs().hour(hours).format('HH');
    const minute = dayjs().minute(minutes).format('mm');

    return `${day}D ${hour}H ${minute}M`;
  } else if (hours !== 0) {
    const hour = dayjs().hour(hours).format('HH');
    const minute = dayjs().minute(minutes).format('mm');
    return `${hour}H ${minute}M`;
  } else {
    const minute = dayjs().minute(minutes).format('mm');
    return `${minute}M`;
  }
};

export const createDuration = (to, from) => {
  const durationMinute = dayjs(to).diff(from, 'm');
  const durationTimeHour = dayjs(to).diff(from, 'h');
  const durationTimeDay = dayjs(to).diff(from, 'd');
  const durationTime = transformsDuration(durationTimeDay, durationTimeHour,  durationMinute);

  return durationTime;
};

export const editOffersPointTemplate = (type, pointId, checkedOffers, offers, isDisabled) => {
  const offerForEdititing = generateOfferForEdititing(type, offers);
  const someArray = [];
  if (offerForEdititing.offers !== undefined ) {
    offerForEdititing.offers.forEach((el) => {
      let foundCheckedOffer = false;
      if (checkedOffers.offers.length > 0) {
        foundCheckedOffer = checkedOffers.offers.find((elem) => elem.offers.title === el.title);
      }
      const template= `<div class="event__offer-selector">
      <input ${foundCheckedOffer && 'checked'} class="event__offer-checkbox  visually-hidden" id="${`${el.id}${pointId}`}" type="checkbox" name="${`${el.id}${pointId}`}" ${isDisabled ? 'disabled' : ''}>
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
