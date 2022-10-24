export const autoSuggestQuery = (options, searchText) => {
  const params = {
    query: {
      $limit: 10,
      $sort: {
        createdAt: -1,
      },
    },
  };
  if (options.or) {
    params.query['$or'] = options.or.map((field) => ({
      [field]: {
        $regex: searchText,
        $options: 'i',
      },
    }));
  }
  if (options.field) {
    params.query[options.field] = {
      $regex: searchText,
      $options: 'i',
    };
  }
  if (options.fields) {
    params.query = { ...params.query, ...options.fields };
  }
  return params;
};
