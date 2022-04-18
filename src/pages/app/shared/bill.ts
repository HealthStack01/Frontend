import { Models } from '../Constants';
import { toDurationString, toShortDate } from '../DateUtils';
import { InputType } from '../schema/util';

export const BillCustomerSchema = [
  {
    name: 'ID',
    key: '_id',
    description: 'ID',
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Client',
    key: 'clientId',
    description: 'Search for  Client',
    selector: (row) => `${row.firstname} ${row.lastname}`,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.CLIENT,
      or: [
        'firstname',
        'lastname',
        'middlename',
        'phone',
        'clientTags',
        'mrn',
        'specificDetails',
      ],
      labelSelector: (obj) =>
        `${obj.firstname} ${obj.lastname} ${toDurationString(obj.dob)} ${
          obj.gender
        } ${obj.profession} ${obj.phone} ${obj.email}`,
      valueSelector: (obj) => obj,
    },
  },
  {
    name: 'Billing Mode',
    description: 'Billing Mode',
    key: 'billing_mode',
    selector: (row) => row.appointment_type,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ['Cash', 'Family', 'Hmo'],
  },
  {
    name: 'Date and Time',
    key: 'start_time',
    description: 'Time and Date',
    selector: (row) => row.start_time,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Name of Location',
    key: 'invoice',
    description: 'Invoice',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    options: [],
  },
];

export const BillsSummary = [
  { name: 'S/N', selector: (row) => row.sn },
  { name: 'Client Name', selector: (row) => row.clientname },
  { name: 'Bills', selector: (row) => row.bills.length },
  {
    name: 'Bill Items',
    selector: (row) => row.bills.map((obj) => obj.order).flat().length,
  },
];

export const BillServiceSchema = [
  {
    name: 'Category',
    key: 'category',
    selector: (row) => row.category,
    description: 'Category',
    sortable: true,
    required: true,
  },
  {
    name: 'Service',
    key: 'inventoryId',
    description: 'Search for  Service',
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.BILLING,
      or: ['baseunit', 'category', 'facilityname'],
      labelSelector: (obj) => `${obj.name} ${obj.category}`,
      valueSelector: (obj) => obj,
    },
  },
  {
    name: 'Quantity',
    key: 'quantity',
    description: 'Quantity',
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Amount',
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Date',
    selector: (obj) => toShortDate(obj.createdAt),
  },
  {
    name: 'Description',
    selector: (obj) => obj.serviceInfo.name,
  },
  {
    name: 'Status',
    selector: (obj) => obj.billing_status,
  },
  {
    name: 'Amount',
    selector: (obj) => obj.serviceInfo.amount,
  },
];

export const BillCreateDetailSchema = [
  {
    name: 'S/N',
    key: 'clientId',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'category',
    key: 'category',
    description: 'Enter category',
    selector: (row) => row.category,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Name',
    key: 'name',
    description: 'Enter Name',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Quantity',
    key: 'quantity',
    description: 'Enter quantity',
    selector: (row) => row.quantity,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Unit',
    key: 'baseunit',
    description: 'Enter Unit',
    selector: (row) => row.baseunit,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Selling Price',
    key: 'sellingprice',
    description: 'Enter selling price',
    selector: (row) => row.sellingprice,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter amount',
    selector: (row) => row.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];

export const BillPrescriptionSchema = [
  {
    name: 'S/N',
    key: 'sn',
    selector: (row) => row.sn,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Date',
    key: 'date',
    description: 'Enter date',
    selector: (row) => row.createdAt && row.createdAt.substring(0, 10),
    sortable: true,
    required: true,
    inputType: InputType.DATE,
  },
  {
    name: 'Name',
    key: 'name',
    description: 'Enter name of band',
    selector: (row) => row.order,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Fufilled',
    key: 'Fufilled',
    description: 'Fufilled',
    selector: (row) => (row.fufilled ? 'Yes' : 'No'),
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Status',
    key: 'order_status',
    description: 'Enter status',
    selector: (row) => row.order_status,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Requesting Physician',
    key: 'physician',
    description: 'Enter physician',
    selector: (row) => row.requestingdoctor_Name,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];

export const BillPrescriptionSentDetailsSchema = [
  {
    name: 'ID',
    key: '_id',
    selector: (row) => row._id && row._id.substring(0, 7),
    description: 'ID',
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Service',
    key: 'inventoryId',
    description: 'Search for  Service',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.SERVICE,
      or: ['baseunit', 'category', 'facilityname'],
      labelSelector: (obj) => `${obj.name}  `,
      valueSelector: ({ _id, baseunit, contracts, category, name }) => ({
        inventoryId: _id,
        baseunit,
        price: (contracts.length && contracts[0].price) || 0.0,
        category,
        name,
      }),
    },
  },
  [
    {
      name: 'Quantity',
      description: 'Enter quantity',
      key: 'quantity',
      selector: (row) => row.quantity,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Amount',
      description: 'Enter Amount',
      key: 'Amount',
      selector: (row) => row.Amount,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
  ],
];
