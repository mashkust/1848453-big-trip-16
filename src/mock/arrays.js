export const types = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const cities = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

export const offers=[
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }, {
        id: 3,
        title: 'Order Ubern',
        price: 20
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 4,
        title: 'Add luggage',
        price: 50
      }, {
        id: 5,
        title: 'Switch to comfort',
        price: 100
      }, {
        id: 6,
        title: 'Add meal',
        price: 15
      }, {
        id: 7,
        title: 'Choose seats',
        price: 5
      }, {
        id: 8,
        title: 'Travel by train',
        price: 40
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 9,
        title: 'Rent a carn',
        price: 200
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 10,
        title: 'Add breakfast',
        price: 50
      },
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 11,
        title: 'Book tickets',
        price: 40
      }, {
        id: 12,
        title: 'Lunch in city',
        price: 30
      },
    ]
  },
];
// export const offers=[
//   {
//     id: 1,
//     title: 'Upgrade to a business class',
//     price: 120
//   }, {
//     id: 2,
//     title: 'Choose the radio station',
//     price: 60
//   }, {
//     id: 3,
//     title: 'Order Ubern',
//     price: 20
//   }, {
//     id: 4,
//     title: 'Add luggage',
//     price: 50
//   }, {
//     id: 5,
//     title: 'Switch to comfort',
//     price: 100
//   }, {
//     id: 6,
//     title: 'Add meal',
//     price: 15
//   }, {
//     id: 7,
//     title: 'Choose seats',
//     price: 5
//   }, {
//     id: 8,
//     title: 'Travel by train',
//     price: 40
//   }, {
//     id: 9,
//     title: 'Rent a carn',
//     price: 200
//   }, {
//     id: 10,
//     title: 'Add breakfast',
//     price: 50
//   }, {
//     id: 11,
//     title: 'Book tickets',
//     price: 40
//   }, {
//     id: 12,
//     title: 'Lunch in city',
//     price: 30
//   }
// ];

export const descriptions=[
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];
