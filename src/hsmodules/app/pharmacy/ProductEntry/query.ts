const productEntryQuery = (
  facilityId?: string,
  locationId?: string,
  val?: string,
) => {
  return {
    query: {
      $or: val && [
        {
          source: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          type: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      facility: facilityId,
      storeId: locationId,
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

export { productEntryQuery };
