export const generateOfferForEdititing = (someType, offersArray) => {
  const someoffer = offersArray.find((el) => el.offers.type === someType);
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
    id: 0,
    isFavorite: false,
    offers: {
      offers:[{
        offers:{id: 1, title: 'With automatic transmission', price: 110},
        type:someType,
      },
      {offers:{id: 2, title: "With air conditioning", price: 180},
        type:someType,
      }]},
    type: someType,
  };
};
// baseprice: 500
// dateFrom: Fri Feb 04 2022 06:15:25 GMT+0300 (Москва, стандартное время) {}
// dateTo: Sat Feb 05 2022 01:18:36 GMT+0300 (Москва, стандартное время) {}
// destination: {name: 'Madrid', description: 'Madrid, with crowded streets, with a beautiful old town.', pictures: Array(6)}
// id: 2
// isFavorite: false

// type: "bus"
// offers:
// offers: Array(2)
// 0:
// offers: {id: 1, title: 'With automatic transmission', price: 110}
// type: "drive"
