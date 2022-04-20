import { InputType } from '../schema/util';
export const LabTestSummary = [
  { name: 'S/N', selector: (row) => row.sn },
  { name: 'Date', selector: (row) => row.createdAt.substring(0, 10) },
  { name: 'Client', selector: (row) => row.orderInfo.orderObj.clientname },
  {
    name: 'Test',
    selector: (row) => row.serviceInfo.name,
  },
  {
    name: 'Amount',
    selector: (row) => row.serviceInfo.amount,
  },
  {
    name: 'Payment Status',
    selector: (row) => row.billing_status,
  },
  {
    name: 'Result Status',
    selector: (row) => row.report_status,
  },
];

export const LabResultSchema = [
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
