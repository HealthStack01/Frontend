import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  bandType: string;
  description: string;
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
    name: 'Band Type',
    selector: row => row.bandType,
    sortable: true,
  },
  {
    name: 'Description',
    selector: row => row.description,
    sortable: true,
  },
];

export const rowData = [
  {
    id: 1,
    name: 'Band 1',
    bandType: 'Company',
    description: 'Band...',
  },
  {
    id: 2,
    name: 'Band 3',
    bandType: 'Company',
    description: 'Band...',
  },
  {
    id: 3,
    name: 'Band 3',
    bandType: 'Company',
    description: 'Band...',
  },
  {
    id: 4,
    name: 'Band 4',
    bandType: 'Company',
    description: 'Band...',
  },
  {
    id: 5,
    name: 'Band 5',
    bandType: 'Company',
    description: 'Band...',
  },
  {
    id: 6,
    name: 'Band 6',
    bandType: 'Company',
    description: 'Band...',
  },
  {
    id: 7,
    name: 'Band 7',
    bandType: 'Company',
    description: 'Band...',
  },
];

export const dataEmployees = [
  {
    id: 1,
    fname: 'Bebby ',
    lname: 'Imayoh',
    profession: 'Lab Technician',
    phone: '08066858155',
    email: 'obi.test.com',
    department: 'Laboratory',
    departmentalUnit: 'Laboratory',
  },
];
