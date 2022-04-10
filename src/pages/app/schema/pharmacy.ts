import { InputType } from './util';

export const PaymentsSummary = [
  { name: 'S/N', selector: (row) => row.sn },
  { name: 'Client Name', selector: (row) => row.clientname },
  { name: 'Bills', selector: (row) => row.bills.length },
  { name: 'Bill Items', selector: (row) => row.bills.map((obj) => obj.order).flat().length },
];

export const PaymentLineSchema = [
  {
    name: 'Description of Band',
    key: 'description',
    description: 'Enter description of band',
    selector: (row) => row.orderInfo.orderObj.order,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Status',
    key: 'billing_status',
    description: 'Enter status',
    selector: (row) => row.billing_status,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter amount',
    selector: (row) => row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
  {
    name: 'Paid',
    key: 'paid',
    selector: (row) => row.paymentInfo?.amountpaid || 0,
    sortable: true,
    required: false,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Balance',
    key: 'balance',
    selector: (row) => row.paymentInfo?.balance || row.serviceInfo.amount,
    sortable: true,
    required: false,
    inputType: InputType.HIDDEN,
  },
];

export const PaymentWalletSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: '',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'payment Options',
    key: 'paymentmode',
    description: 'Enter payment Option',
    selector: (row) => row.paymentmode,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ['Cash', 'Wallet', 'Bank Transfer', 'Card', 'Cheque'],
  },
  {
    name: 'Amount',
    key: 'amount',
    description: 'Enter Amount',
    selector: (row) => row.amount,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Description',
    key: 'description',
    description: 'Enter description',
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];
