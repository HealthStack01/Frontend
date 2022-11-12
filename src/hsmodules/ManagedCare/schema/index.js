import { format, formatDistanceToNowStrict } from 'date-fns';

export const EnrolleSchema = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'SN',
    selector: (row) => row.sn,
    sortable: true,
    inputType: 'HIDDEN',
  },
  {
    name: 'First Name',
    key: 'firstname',
    description: 'First Name',
    selector: (row) => row.Beneficiary?.principal.firstname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'Last Name',
    key: 'lastname',
    description: 'Last Name',
    selector: (row) => row.Beneficiary?.principal.lastname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'payment',
    key: 'payment',
    description: 'Payment',
    selector: (row) =>
      row.Beneficiary?.principal.paymentinfo
        .map((item) => `${item.paymentmode} - `)
        .join('')
        .slice(0, -2),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'age',
    key: 'age',
    description: 'Age',
    selector: (row) =>
      formatDistanceToNowStrict(new Date(row.Beneficiary?.principal.dob)),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'gender',
    key: 'gender',
    description: 'Gender',
    selector: (row) => row.Beneficiary?.principal.gender,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'phone',
    key: 'phone',
    description: 'Phone',
    selector: (row) => row.Beneficiary?.principal.phone,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'email',
    key: 'email',
    description: 'Email',
    selector: (row) => row.Beneficiary?.principal.email,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'tags',
    key: 'tags',
    description: 'Tags',
    selector: (row) => row.Beneficiary?.principal.clientTags,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
];
