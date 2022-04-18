/* eslint-disable indent */
export const queryEmployee = (facilityId: string, searchText?: string) => {
  return {
    query: {
      firstname: searchText
        ? {
            $regex: searchText,
            $options: 'i',
          }
        : undefined,
      facility: facilityId,
      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    },
  };
};
