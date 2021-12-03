export const createOffersPointTemplate = (POINT) => {
  const ARRAY = [];
  if (POINT.offers.offers !== undefined || POINT.offers.offers.length !== 0) {
    for (let i=0; i<POINT.offers.offers.length ;i++) {
      const offers= `<span class="event__offer-title">${POINT.offers.offers[i].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${POINT.offers.offers[i].price}</span>`;
      ARRAY.push(offers);
    }
  }
  return ARRAY;
};

export const createFavotiteTemplate = (POINT) => {
  if (POINT.isfavorite===true) {
    return `event__favorite-btn--active`;
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

export const editOffersPointTemplate = (POINT) => {
  const ARRAY = [];
  if (POINT.offers.offers !== undefined || POINT.offers.offers.length !== 0) {
    for (let i=0; i<POINT.offers.offers.length ;i++) {
      const offers= `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${POINT.offers.offers[i].id}" type="checkbox" name="${POINT.offers.offers[i].id}" >
      <label class="event__offer-label" for="${POINT.offers.offers[i].id}">
        <span class="event__offer-title">${POINT.offers.offers[i].title}e</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${POINT.offers.offers[i].price}</span>
      </label>
    </div>`;
      ARRAY.push(offers);
    }
  }
  return ARRAY;
};
