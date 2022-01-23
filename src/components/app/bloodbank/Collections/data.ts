import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  locationType: string;
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
    name: 'Location Type',
    selector: row => row.locationType,
    sortable: true,
  },
];

export const rowData = [
  {
    id: '1',
    name: 'Location 1',
    locationType: 'Company',
  },
  {
    id: '2',
    name: 'Location 2',
    locationType: 'Company',
  },
  {
    id: '3',
    name: 'Location 3',
    locationType: 'Company',
  },
  {
    id: '4',
    name: 'Location 4',
    locationType: 'Company',
  },
  {
    id: '5',
    name: 'Location 5',
    locationType: 'Company',
  },
  {
    id: '6',
    name: 'Location 6',
    locationType: 'Company',
  },
  {
    id: '6',
    name: 'Location 6',
    locationType: 'Company',
  },
  {
    id: '7',
    name: 'Location 7',
    locationType: 'Company',
  },
  {
    id: '8',
    name: 'Location 1',
    locationType: 'Company',
  },
];
