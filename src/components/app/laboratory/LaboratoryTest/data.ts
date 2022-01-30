import { TableColumn } from 'react-data-table-component';
export interface LabDataRow {
  id: number;
  date: string;
  client: string;
  test: string;
  amount: string;
  paymentStatus: string;
  resultStatus: string;
}

export const columnHead: TableColumn<LabDataRow>[] = [
  {
    name: 'S/N',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row.date,
    sortable: true,
  },
  {
    name: 'Client',
    selector: row => row.client,
    sortable: true,
  },
  {
    name: 'Test',
    selector: row => row.test,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    sortable: true,
  },
  {
    name: 'Payment Status',
    selector: row => row.paymentStatus,
    sortable: true,
  },
  {
    name: 'Result Status',
    selector: row => row.resultStatus,
    sortable: true,
  },
];

export const rowData = [
  {
    id: 1,
    date: '2022-01-20 19',
    client: 'Client 2',
    test: 'fbc',
    amount: '54000',
    paymentStatus: 'Fully Paid',
    resultStatus: 'Final',
  },
  {
    id: 2,
    date: '2022-01-20 19',
    client: 'Client 2',
    test: 'fbc',
    amount: '54000',
    paymentStatus: 'Fully Paid',
    resultStatus: 'Final',
  },
  {
    id: 3,
    date: '2022-01-20 19',
    client: 'Client 2',
    test: 'fbc',
    amount: '54000',
    paymentStatus: 'Fully Paid',
    resultStatus: 'Final',
  },
  {
    id: 4,
    date: '2022-01-20 19',
    client: 'Client 2',
    test: 'fbc',
    amount: '54000',
    paymentStatus: 'Fully Paid',
    resultStatus: 'Final',
  },
  {
    id: 5,
    date: '2022-01-20 19',
    client: 'Client 2',
    test: 'fbc',
    amount: '54000',
    paymentStatus: 'Fully Paid',
    resultStatus: 'Final',
  },
  {
    id: 6,
    date: '2022-01-20 19',
    client: 'Client 2',
    test: 'fbc',
    amount: '54000',
    paymentStatus: 'Fully Paid',
    resultStatus: 'Final',
  },
  {
    id: 7,
    date: '2022-01-20 19',
    client: 'Client 2',
    test: 'fbc',
    amount: '54000',
    paymentStatus: 'Fully Paid',
    resultStatus: 'Final',
  },
  {
    id: 8,
    date: '2022-01-20 19',
    client: 'Client 2',
    test: 'fbc',
    amount: '54000',
    paymentStatus: 'Fully Paid',
    resultStatus: 'Final',
  },
];
