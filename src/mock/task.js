import {cities,descriptions} from './arrays.js';
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

// const generateOffer = (someType, offersArray) => {
//   const someoffer = offersArray.find((el) => el.type === someType);
//   if (someoffer) {
//     const offer ={
//       type: someType,
//       offers: getRandomArray(someoffer.offers)
//     };
//     return offer;
//   }
//   else {
//     const offer ={
//       type: someType,
//       offers: [],
//     };
//     return offer;
//   }
// };

export const generateOfferForEdititing = (someType, offersArray) => {
  const someoffer = offersArray.find((el) => el.offers.type === someType);
  // console.log('offersArray',someoffer.offers.offers)
  if (someoffer) {
    const offer ={
      type: someType,
      offers: someoffer.offers.offers,
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

export const generateDestination = (name, destinations) => {
  const someDestination = destinations.find((destination) => destination.destination.name === name);
  return someDestination;
};

export const defaultPoint = () => {
  const someType = 'train';
  return {
    baseprice: 0,
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: null,
    id: 0,
    isFavorite: false,
    offers: {
      offers:[]
    },
    type: someType
  };
};
