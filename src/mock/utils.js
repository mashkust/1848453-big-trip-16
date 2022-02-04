import dayjs from 'dayjs';
import {FilterType} from './arrays.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.slice().filter((point) => new Date(point.dateTo) > new Date()),
  [FilterType.PAST]: (points) => points.slice().filter((point) => new Date(point.dateTo) < new Date())
};

const createPriceStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => {
    const filterType = points.filter((point) => point.type === type);
    const sum = filterType.reduce((acc, val) => (acc + val.baseprice), 0);
    return [type, sum];
  })
  .sort(([,a],[, b]) => b - a);

const createTypeStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => [type, points.filter((point) => point.type === type).length])
  .sort(([,a],[, b]) => b - a);

const createTimeStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => {
    let sum = 0;
    const filterType = points.filter((point) => point.type === type);
    sum = filterType.reduce((acc, val) => (dayjs(val.dateTo).diff(val.dateFrom)),0) ;
    return [type, dayjs(sum).hour()];
  })
  .sort(([,a],[, b]) => b - a);


// const createTimeStats = (points, types) => {
//     const itemsTimes = [];
//     let time = 0;
//     types.forEach((type) => {
//       points.forEach((point) => {
//         if (point.type === type) {
//           time += (dayjs(point.dateTo).diff(dayjs(point.dateFrom)));
//         }
//       });
//       itemsTimes.push(Math.round(time));
//       time = 0;
//     });
//     return itemsTimes;
// };
export {createPriceStats, createTypeStats, createTimeStats};

export const parseServerPoints = (serverPoints) =>
  serverPoints.map((el) => ({
    baseprice: el['base_price'],
    dateFrom: new Date(el['date_from']),
    dateTo: new Date(el['date_to']),
    isFavorite: el['is_favorite'],
    offers: {
      offers: el.offers.map((elem) => ({
        type: el.type,
        offers: elem,
      }))
    },
    id: Number(el.id),
    type: el.type,
    destination:el.destination,
  }));

export const parseServerOffers = (serverOffers) => serverOffers.map((el) => ({offers: el}));

export const parseServerDestinations = (serverDestination) =>
  serverDestination.map((destination) => ({
    destination: destination,
  }));

export const prepareLocalPoint = (point) =>
  ({
    // eslint-disable-next-line camelcase
    base_price: Number(point.baseprice),
    // eslint-disable-next-line camelcase
    date_from: String(point.dateFrom),
    // eslint-disable-next-line camelcase
    date_to: String(point.dateTo),
    // eslint-disable-next-line camelcase
    is_favorite: point.isFavorite,
    offers: point.offers.offers.length > 0 ?  point.offers.offers.map((el) => ({
      ...el
    })) : [],
    type: point.type,
    destination: point.destination,
  });

export const preparePoint = (point) => ({
  // eslint-disable-next-line camelcase
  base_price: Number(point.baseprice),
  // eslint-disable-next-line camelcase
  date_from: String(point.dateFrom),
  // eslint-disable-next-line camelcase
  date_to: String(point.dateTo),
  // eslint-disable-next-line camelcase
  is_favorite: point.isFavorite,
  offers: point.offers.offers.length > 0 ?  point.offers.offers.map((el) => ({
    ...el
  })) : [],
  id: String(point.id),
  type: point.type,
  destination: point.destination,
});

