import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  date: string;
  type: string;
  source: string;
  documentNo: string;
  amount: string;
  actions: boolean;
  data: [];
}

export const columnHead: TableColumn<DataProps>[] = [
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
    name: 'Type',
    selector: row => row.type,
    sortable: true,
  },
  {
    name: 'Source',
    selector: row => row.source,
    sortable: true,
  },
  {
    name: 'Document No',
    selector: row => row.documentNo,
    sortable: true,
  },
  {
    name: 'Total Amount',
    selector: row => row.amount,
    sortable: true,
  },
  {
    name: 'Actions',
    selector: row => row.actions,
    sortable: true,
  },
];

export const rowData = [
  {
    id: '1',
    date: '2021-03-19 19:45',
    type: 'Dispense',
    source: 'Pharm Medical',
    documentNo: '01234',
    amount: '50000',
    actions: false,
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: '2',
    date: '2021-03-19 19:45',
    type: 'Dispense',
    source: 'Pharm Medical',
    documentNo: '01234',
    amount: '50000',
    actions: false,
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: '3',
    date: '2021-03-19 19:45',
    type: 'Dispense',
    source: 'Pharm Medical',
    documentNo: '01234',
    amount: '50000',
    actions: false,
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: '4',
    date: '2021-03-19 19:45',
    type: 'Dispense',
    source: 'Pharm Medical',
    documentNo: '01234',
    amount: '50000',
    actions: false,
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
  {
    id: '5',
    date: '2021-03-19 19:45',
    type: 'Dispense',
    source: 'Pharm Medical',
    documentNo: '01234',
    amount: '50000',
    actions: false,
    data: [
      {
        id: '1',
        date: '2021-03-19 19:45',
        type: 'Dispense',
        source: 'Pharm Medical',
        documentNo: '01234',
        amount: '50000',
        actions: false,
      },
    ],
  },
];
