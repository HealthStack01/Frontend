import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  client: string;
  amount: string;
  mode: string;
}

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Client',
    selector: row => row.client,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    sortable: true,
  },
  {
    name: 'Mode',
    selector: row => row.mode,
    sortable: true,
  },
];

export const rowData = [
  {
    id: '1',
    name: 'Client 1',
    client: 'Client',
    amount: '300000',
    mode: 'Cash',
  },
  {
    id: '2',
    name: 'Client 1',
    client: 'Client',
    amount: '300000',
    mode: 'Cash',
  },
  {
    id: '3',
    name: 'Client 1',
    client: 'Client',
    amount: '300000',
    mode: 'Cash',
  },
  {
    id: '3',
    name: 'Client 1',
    client: 'Client',
    amount: '300000',
    mode: 'Cash',
  },
  {
    id: '4',
    name: 'Client 1',
    client: 'Client',
    amount: '300000',
    mode: 'Cash',
  },
  {
    id: '5',
    name: 'Client 1',
    client: 'Client',
    amount: '300000',
    mode: 'Cash',
  },
  {
    id: '6',
    name: 'Client 1',
    client: 'Client',
    amount: '300000',
    mode: 'Cash',
  },
  {
    id: '7',
    name: 'Client 1',
    client: 'Client',
    amount: '300000',
    mode: 'Cash',
  },
];
