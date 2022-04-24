/* eslint-disable indent */
export const queryCaseDefinition = (facilityId, searchText) => {
  return {
    query: {
      ['disease.name']: searchText
        ? {
            $regex: searchText,
            $options: 'i',
          }
        : undefined,
    },
    facility: facilityId,
    $limit: 100,
    $sort: {
      createdAt: -1,
    },
  };
};

export const querySignal = (facilityId, searchText) => {
  return {
    query: {
      ['disease.name']: searchText
        ? {
            $regex: searchText,
            $options: 'i',
          }
        : undefined,
    },
    facility: facilityId,
    $limit: 100,
    $sort: {
      createdAt: -1,
    },
  };
};
