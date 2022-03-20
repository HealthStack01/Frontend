import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  date: string;
  client: string;
  description: string;
  amount: string;
  mode: string;
}

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: 'Client',
    selector: (row) => row.client,
    sortable: true,
  },
  {
    name: 'Description',
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: 'Mode',
    selector: (row) => row.mode,
    sortable: true,
  },
];

export const rowData = [
  {
    id: '1',
    date: '2022-01-20 19:45',
    description: 'lorem',
    client: 'Alex Doe',
    amount: '40000',
    mode: 'Cash',
  },
  {
    id: '2',
    date: '2022-01-20 19:45',
    description: 'lorem',
    client: 'Alex Doe',
    amount: '40000',
    mode: 'Cash',
  },
  {
    id: '3',
    date: '2022-01-20 19:45',
    description: 'lorem',
    client: 'Alex Doe',
    amount: '40000',
    mode: 'Cash',
  },
  {
    id: '4',
    date: '2022-01-20 19:45',
    description: 'lorem',
    client: 'Alex Doe',
    amount: '40000',
    mode: 'Cash',
  },
  {
    id: '5',
    date: '2022-01-20 19:45',
    description: 'lorem',
    client: 'Alex Doe',
    amount: '40000',
    mode: 'Cash',
  },
];
