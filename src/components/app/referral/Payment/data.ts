import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  fname: string;
  lname: string;
  profession: string;
  phone: string;
  email: string;
  department: string;
  departmentalUnit: string;
}

export const columnHead: TableColumn<DataProps>[] = [
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
    name: 'Phone Number',
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

export const rowData = [
  {
    id: '1',
    fname: 'John',
    lname: 'Doe',
    profession: 'Medical Doctor',
    phone: '080 200 0000',
    email: 'doc@test.com',
    department: 'Medical',
    departmentalUnit: 'Medical',
  },
  {
    id: '2',
    fname: 'John',
    lname: 'Doe',
    profession: 'Medical Doctor',
    phone: '080 200 0000',
    email: 'doc@test.com',
    department: 'Medical',
    departmentalUnit: 'Medical',
  },
  {
    id: '3',
    fname: 'John',
    lname: 'Doe',
    profession: 'Medical Doctor',
    phone: '080 200 0000',
    email: 'doc@test.com',
    department: 'Medical',
    departmentalUnit: 'Medical',
  },
  {
    id: '4',
    fname: 'John',
    lname: 'Doe',
    profession: 'Medical Doctor',
    phone: '080 200 0000',
    email: 'doc@test.com',
    department: 'Medical',
    departmentalUnit: 'Medical',
  },
  {
    id: '5',
    fname: 'John',
    lname: 'Doe',
    profession: 'Medical Doctor',
    phone: '080 200 0000',
    email: 'doc@test.com',
    department: 'Medical',
    departmentalUnit: 'Medical',
  },
  {
    id: '6',
    fname: 'John',
    lname: 'Doe',
    profession: 'Medical Doctor',
    phone: '080 200 0000',
    email: 'doc@test.com',
    department: 'Medical',
    departmentalUnit: 'Medical',
  },
  {
    id: '7',
    fname: 'John',
    lname: 'Doe',
    profession: 'Medical Doctor',
    phone: '080 200 0000',
    email: 'doc@test.com',
    department: 'Medical',
    departmentalUnit: 'Medical',
  },
  {
    id: '8',
    fname: 'John',
    lname: 'Doe',
    profession: 'Medical Doctor',
    phone: '080 200 0000',
    email: 'doc@test.com',
    department: 'Medical',
    departmentalUnit: 'Medical',
  },
];
