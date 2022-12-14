import { format, formatDistanceToNowStrict } from 'date-fns';
export const WardAppointmentSchema = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'SN',
    selector: (row) => row.sn,
    sortable: true,
    inputType: 'HIDDEN',
  },
  {
    name: 'Date/Time',
    key: 'createdAt',
    description: 'Date/Time',
    selector: (row) => format(new Date(row?.createdAt), 'dd/MM/yyyy HH:mm'),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'First Name',
    key: 'firstname',
    description: 'First Name',
    selector: (row) => row.client.firstname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Last Name',
    key: 'lastname',
    description: 'Last Name',
    selector: (row) => row.client.lastname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Admission Order',
    key: 'order',
    description: 'Admission Order',
    selector: (row) => row.order,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Fulfilled',
    key: 'fulfilled',
    description: 'Fulfilled',
    selector: (row) => (row.fulfilled ? 'Yes' : 'No'),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'Status',
    key: 'order_status',
    description: 'Status',
    selector: (row) => row.order_status,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Requesting Practitioner',
    key: 'requestingdoctor_Name',
    description: 'Practitioner',
    selector: (row) => row.requestingdoctor_Name,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
];

export const WardInPatient = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'SN',
    selector: (row) => row.sn,
    sortable: true,
    inputType: 'HIDDEN',
  },
  {
    name: 'Bed',
    key: 'bed',
    description: 'Bed',
    selector: (row) => row.bed,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'First Name',
    key: 'firstname',
    description: 'First Name',
    selector: (row) => row.client.firstname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Last Name',
    key: 'lastname',
    description: 'Last Name',
    selector: (row) => row.client.lastname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Gender',
    key: 'gender',
    description: 'Gender',
    selector: (row) => row.client.gender,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Age',
    key: 'age',
    description: 'Age',
    selector: (row) => formatDistanceToNowStrict(new Date(row.client.dob)),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Day of Admission',
    key: 'dayofadmission',
    description: 'Day of Admission',
    selector: (row) =>
      formatDistanceToNowStrict(new Date(row.createdAt), {
        addSuffix: true,
      }),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Payment Mode',
    key: 'paymentmode',
    description: 'Payment Mode',
    selector: (row) =>
      row.client.paymentinfo
        .map((item) => `${item.paymentmode} - `)
        .join('')
        .slice(0, -2),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Tags',
    key: 'tags',
    description: 'Tags',
    selector: (row) => row.client.clientTags,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
];

export const WardDischargedPatient = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'SN',
    selector: (row) => row.sn,
    sortable: true,
    inputType: 'HIDDEN',
  },
  {
    name: 'Date',
    key: 'createdAt',
    description: 'Date',
    selector: (row) => format(new Date(row.createdAt), 'dd/MM/yyyy'),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Name',
    key: 'clientname',
    description: 'Name',
    selector: (row) => row.clientname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Discharge Order',
    key: 'order',
    description: 'Discharge Order',
    selector: (row) => row.order,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Fulfilled',
    key: 'fulfilled',
    description: 'Fulfilled',
    selector: (row) => (row.fulfilled ? 'Yes' : 'No'),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'Status',
    key: 'order_status',
    description: 'Status',
    selector: (row) => row.order_status,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Requesting Physician',
    key: 'requestingdoctor_Name',
    description: 'Requesting Physician',
    selector: (row) => row.requestingdoctor_Name,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
];
