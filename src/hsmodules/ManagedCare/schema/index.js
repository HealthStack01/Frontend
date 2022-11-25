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

export const EnrolleSchema2 = [
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
    selector: (row) => row.Beneficiary?.dependant.firstname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'Last Name',
    key: 'lastname',
    description: 'Last Name',
    selector: (row) => row.Beneficiary?.dependant.lastname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'payment',
    key: 'payment',
    description: 'Payment',
    selector: (row) =>
      row.Beneficiary?.dependant.paymentinfo
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
      formatDistanceToNowStrict(new Date(row.Beneficiary?.dependant.dob)),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'gender',
    key: 'gender',
    description: 'Gender',
    selector: (row) => row.Beneficiary?.dependant.gender,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'phone',
    key: 'phone',
    description: 'Phone',
    selector: (row) => row.Beneficiary?.dependant.phone,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'email',
    key: 'email',
    description: 'Email',
    selector: (row) => row.Beneficiary?.dependant.email,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'tags',
    key: 'tags',
    description: 'Tags',
    selector: (row) => row.Beneficiary?.dependant.clientTags,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
];

export const principalData = [
  {
    firstname: 'Motun',
    lastname: 'Oyewole',
    paymentinfo: 'Cash',
    age: '1996-11-08T21:32:26.004Z',
    gender: 'Male',
    phone: '08012345678',
    email: 'test@motun.com',
    clientTags: '4532',
  },
];

export const EnrolleSchema3 = [
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
    selector: (row) => row.firstname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'Last Name',
    key: 'lastname',
    description: 'Last Name',
    selector: (row) => row.lastname,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'payment',
    key: 'payment',
    description: 'Payment',
    selector: (row) => row.paymentinfo,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'age',
    key: 'age',
    description: 'Age',
    selector: (row) => formatDistanceToNowStrict(new Date(row.age)),
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },

  {
    name: 'gender',
    key: 'gender',
    description: 'Gender',
    selector: (row) => row.gender,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'phone',
    key: 'phone',
    description: 'Phone',
    selector: (row) => row.phone,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'email',
    key: 'email',
    description: 'Email',
    selector: (row) => row.email,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'tags',
    key: 'tags',
    description: 'Tags',
    selector: (row) => row.clientTags,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
];
