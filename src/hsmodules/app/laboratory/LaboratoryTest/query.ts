const labTestQuery = (facilityId?: string, val?: string) => {
  return {
    query: {
      $or: val && [
        {
          'participantInfo.paymentmode.detail.principalName': {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      'participantInfo.billingFacility': facilityId,
      'orderInfo.orderObj.order_category': 'Lab Order',
      billing_status: 'Fully Paid',
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

export { labTestQuery };
