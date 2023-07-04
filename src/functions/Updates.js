export const updateOnCreated = (array, update) => {
  return [update, ...array];
};

export const updateOnPatched = async (array, update) => {
  const newArray = await array.map(item => {
    if (item._id === update._id) {
      return update;
    } else {
      return item;
    }
  });

  return newArray;
};

export const updateOnUpdated = async (array, update) => {
  const newArray = await array.map(item => {
    if (item._id === update._id) {
      return update;
    } else {
      return item;
    }
  });

  return newArray;
};

export const updateOnDeleted = async (array, update) => {
  const newArray = await array.filter(item => item._id !== update._id);

  return newArray;
};
