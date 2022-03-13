import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  shortName: string;
}

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Short Name',
    selector: (row) => row.shortName,
    sortable: true,
  },
];

export const rowData = [
  {
    id: '1',
    name: 'Biodata Qustionnaire',
    shortName: 'Biodata ',
    questions: [],
  },
  {
    id: '2',
    name: 'Meals Qustionnaire',
    shortName: 'Meals ',
    questions: [],
  },
];
