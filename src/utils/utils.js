import dayjs from 'dayjs';
const SEC = 60*1000;

const createPriceStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => {
    const filterType = points.filter((point) => point.type === type);
    const sum = filterType.reduce((acc, val) => (acc + val.baseprice), 0);
    return [type.toUpperCase(), sum];
  })
  .sort(([,a],[, b]) => b - a);

const createTypeStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => [type.toUpperCase(), points.filter((point) => point.type === type).length])
  .sort(([,a],[, b]) => b - a);

const createTimeStats = (points) => [...new Set(points.map((point) => point.type))]
  .map((type) => {
    let sum = 0;
    const filterType = points.filter((point) => point.type === type);
    sum = filterType.reduce((acc, index) => {
      if (dayjs(index.dateFrom)>= dayjs(index.dateTo)) {
        const someDate=index.dateFrom;
        index.dateFrom=index.dateTo;
        index.dateTo=someDate;
      }
      return (acc + (dayjs(index.dateTo).diff(index.dateFrom)));},0) ;
    return [type.toUpperCase(), Math.floor(sum/SEC)];
  })
  .sort(([,a],[, b]) => b - a);

export {createPriceStats, createTypeStats, createTimeStats};

export const parseServerPoints = (serverPoints) =>
  serverPoints.map((el) => ({
    baseprice: el['base_price'],
    dateFrom: new Date(el['date_from']),
    dateTo: new Date(el['date_to']),
    isFavorite: Boolean(el['is_favorite']),
    offers: {
      offers: el.offers.map((elem) => ({
        offers: elem,
      })),
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
    'base_price': Number(point.baseprice),
    'date_from': String(point.dateFrom),
    'date_to': String(point.dateTo),
    'is_favorite': point.isFavorite,
    offers: point.offers.offers.length > 0 ?  point.offers.offers.map((el) => ({
      ...el.offers,
    })) : [],
    type: point.type,
    destination: point.destination,
  });

export const preparePoint = (point) => ({
  'base_price': Number(point.baseprice),
  'date_from': String(point.dateFrom),
  'date_to': String(point.dateTo),
  'is_favorite': point.isFavorite,
  offers: point.offers.offers.length > 0 ?  point.offers.offers.map((el) => ({
    ...el.offers,
  })) : [],
  id: String(point.id),
  type: point.type,
  destination: point.destination,
});

export const generateOfferForEdititing = (someType, offersArray) => {
  const someoffer = offersArray.find((el) => el.offers.type === someType);
  let offer ={
    type: someType,
    offers: [],
  };
  if (someoffer) {
    offer ={
      type: someType,
      offers: someoffer.offers.offers,
    };
  }
  return offer;
};

export const generateDestination = (name, destinations) => {
  const someDestination = destinations.find((destination) => destination.destination.name === name);
  return someDestination;
};


export const defaultPoint = () => {
  const someType = 'drive';
  return {
    baseprice: 0,
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: null,
    isFavorite: false,
    offers: {
      offers:{
        offers:
        {
          id: Number,
          title: String,
          price:Number,
        },
        type:someType,
      },
    },
    type: someType,
  };
};

export const defaultDestinations = {
  name:'',
  description:'',
};

export const makePointsTypes = (items) => {
  const someArray = [];
  items.forEach((item) => someArray.push(item.type));
  return [...new Set(someArray)];
};
