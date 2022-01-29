import dayjs from 'dayjs';

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
    const filterType = points.filter((point) => point.type === type);
    const sum = filterType.reduce((acc, val) => (acc + dayjs(val.dateTo).diff(val.dateFrom)), 0);
    return [type, sum];
  })
  .sort(([,a],[, b]) => b - a);

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

export const parseServerOffers = (serverOffers) =>
  serverOffers.map((el) => ({
    offers: el.map((elem) => ({
      type: el.type,
      offers: elem,
    }))
  }));

export const parseServerDestinations = (serverDestination) =>
  serverDestination.map((destination) => ({
    destination: destination,
  }));
