const paymentQuery = (facilityId?: string, val?: string) => {
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
      'orderInfo.orderObj.order_category': 'Prescription',
      billing_status: 'Unpaid',
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

const subwalletQuery = (facilityId: string, clientId: string) => {
  return {
    query: {
      client: clientId,
      organization: facilityId,
      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

export { paymentQuery, subwalletQuery };
