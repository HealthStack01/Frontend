export const dispensoryQuery = (facilityId?: string, val?: string) => {
  return {
    query: {
      order: val && {
        $regex: val,
        $options: 'i',
      },
      order_status: val && {
        $regex: val,
        $options: 'i',
      },
      'participantInfo.billingFacility': val ? undefined : facilityId,
      'orderInfo.orderObj.order_category': val ? undefined : 'Prescription',
      order_category: val ? 'Prescription' : undefined,
      billing_status: val ? undefined : { $ne: 'Unpaid' },
      'orderInfo.orderObj.fulfilled': val ? undefined : { $ne: 'True' },
      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    },
  };
};
