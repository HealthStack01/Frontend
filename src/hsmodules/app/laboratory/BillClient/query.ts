const LabClientQuery = (facilityId?: string, val?: string) => {
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
      billing_status: 'Unpaid',
      $limit: 30,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

export { LabClientQuery };
