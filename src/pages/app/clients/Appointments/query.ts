const queryAppointments = (facilityId?: string, locationId?: string, val?: string) => {
  return {
    query: {
      $or: val && [
        {
          firstname: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          lastname: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          middlename: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          phone: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_type: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_status: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_reason: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          location_type: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          location_name: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_department: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_profession: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_name: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      facility: facilityId,
      locationId,
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
  // if (state.employeeLocation.locationType !== 'Front Desk') {
  // }
};

const queryTests = (clientId) => {
  return {
    query: {
      order_category: 'Lab Order',

      clientId,
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

const queryPrescriptions = (clientId, val?: string) => ({
  query: {
    $or: val && [
      {
        order: {
          $regex: val,
          $options: 'i',
        },
      },
      {
        order_status: {
          $regex: val,
          $options: 'i',
        },
      },
    ],
    order_category: 'Prescription',
    clientId: clientId,
    $limit: 20,
    $sort: {
      createdAt: -1,
    },
  },
});

const queryDocumentations = (documentName?: string, clientId?: string) => {
  return {
    query: {
      documentname: documentName && {
        ['$regex']: documentName,
        ['$options']: 'i',
      },
      client: clientId,
      $limit: 50,
      $sort: {
        name: 1,
      },
    },
  };
};

export { queryAppointments, queryDocumentations, queryPrescriptions, queryTests };
