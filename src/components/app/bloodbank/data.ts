import { TableColumn } from 'react-data-table-component';
export interface BandDataRow {
  id: number;
  name: string;
  bandType: string;
  description: string;
}

export interface EmployeesDataRow {
  id: number;
  fname: string;
  lname: string;
  profession: string;
  phone: string;
  email: string;
  department: string;
  departmentalUnit: string;
}

export const columnBand: TableColumn<BandDataRow>[] = [
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
export const columnEmployees: TableColumn<EmployeesDataRow>[] = [
  {
    name: 'S/N',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: row => row.fname,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lname,
    sortable: true,
  },
  {
    name: 'Profession',
    selector: row => row.profession,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
  },
  {
    name: 'Departmental Unit',
    selector: row => row.departmentalUnit,
    sortable: true,
  },
];

export const dataBands = [
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
