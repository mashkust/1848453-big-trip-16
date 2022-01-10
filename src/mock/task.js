import {types,offers,cities,descriptions} from './arrays.js';
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArray = (some) => {
  const ARRAY = [];
  if (some===undefined ) {
    return ARRAY;
  }
  const MAX_LENGHT = some.length;
  const LENGHT_ARRAY = getRandomInteger(0, MAX_LENGHT);
  for(let index = 0; index < LENGHT_ARRAY; index++) {
    const INDEX_EL = getRandomInteger(0, LENGHT_ARRAY-1);
    const ELEM = some[INDEX_EL];
    if (!ARRAY.includes(ELEM)) {
      ARRAY.push(ELEM);
    }
  }
  return ARRAY;
};

const generateOffer = (someType, offersArray) => {
  const someoffer = offersArray.find((el) => el.type === someType);
  if (someoffer) {
    const offer ={
      type: someType,
      offers: getRandomArray(someoffer.offers)
    };
    return offer;
  }
  else {
    const offer ={
      type: someType,
      offers: [],
    };
    return offer;
  }
};

export const generateOfferForEdititing = (someType, offersArray) => {
  const someoffer = offersArray.find((el) => el.type === someType);
  if (someoffer) {
    const offer ={
      type: someType,
      offers: someoffer.offers,
    };
    return offer;
  }
  else {
    const offer ={
      type: someType,
      offers: [],
    };
    return offer;
  }
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

export const generateDestination = (name) => {
  const someDescriptions = getRandomArray(descriptions).join(' ');
  if (name!== undefined || name !== null) {
    name = generateCity();
  }
  const destination ={
    description: someDescriptions,
    name: name,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: someDescriptions,
      }
    ]
  };
  return destination;
};

const generateType = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generatePrice = () => {
  const randomPrice = getRandomInteger(0, 2000);
  return randomPrice;
};

export const generatePoint = (numberId) => {
  const someType = generateType();
  return {
    baseprice: generatePrice (),
    datefrom: '2019-07-10T22:55:56.845Z',
    dateto: '2019-07-11T11:22:13.375Z',
    destination: generateDestination(),
    id: String(numberId),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffer(someType,offers),
    type: someType
  };
};

export const defaultPoint = () => {
  const someType = 'train';
  return {
    baseprice: 0,
    datefrom: '0',
    dateto: '0',
    destination: generateDestination(),
    id: 0,
    isFavorite: false,
    offers: generateOffer(someType,offers),
    type: someType
  };
};
