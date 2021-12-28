// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForPrice = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTaskUp = (taskA, taskB) => {
  const weight = getWeightForPrice(taskA.baseprice, taskB.baseprice);

  return weight ?? taskA.baseprice.diff(taskB.baseprice);
};

// export const sortTaskDown = (taskA, taskB) => {
//   const weight = getWeightForPrice(taskA.baseprice, taskB.baseprice);

//   return weight ?? taskB.baseprice.diff(taskA.baseprice);
// };
