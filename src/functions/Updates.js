export const updateOnCreated = (array, update) => {
  return [update, ...array];
};

export const updateOnPatched = (array, update) => {
  const newArray = array.map(item => {
    if (item._id === update._id) {
      return update;
    } else {
      return item;
    }
  });
  console.log(newArray);

  return newArray;
};

export const updateOnUpdated = (array, update) => {
  const newArray = array.map(item => {
    if (item._id === update._id) {
      return update;
    } else {
      return item;
    }
  });

  return newArray;
};

export const updateOnDeleted = (array, update) => {
  const newArray = array.filter(item => item._id !== update._id);

  return newArray;
};
