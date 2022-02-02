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
