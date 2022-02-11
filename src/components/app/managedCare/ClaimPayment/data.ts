import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  date: string;
  category: string;
  description: string;
  status: string;
  amount: string;
  serviceDetails: [];
  authorizationCode: string;
  coPayAmount: string;
}

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: row => row.id,
    sortable: true,
  },

  {
    name: 'DATE',
    selector: row => row.date,
    sortable: true,
  },
  {
    name: 'DESCRIPTION',
    selector: row => row.description,
    sortable: true,
  },
  {
    name: 'STATUS',
    selector: row => row.status,
    sortable: true,
  },
  {
    name: 'AMOUNT',
    selector: row => row.amount,
    sortable: true,
  },
];

export const rowData = [
  {
    id: 1,
    name: 'Simpa',
    date: '2022-01-20 19:45',
    category: 'Microbiology',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
    serviceDetails: [
      {
        HMO: 'Anchor',
        PlAN: 'Ultimate',
        Class: 'Fee for Service',
        RequireCode: false,
      },
      {
        HMO: 'Anchor',
        PlAN: 'Ultimate',
        Class: 'Fee for Service',
        RequireCode: false,
      },
    ],
    authorizationCode: '',
    coPayAmount: 0,
  },
  {
    id: 2,
    name: 'Simpa',
    date: '2022-01-20 19:45',
    category: 'Microbiology',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
    serviceDetails: [
      {
        HMO: 'Anchor',
        PlAN: 'Ultimate',
        Class: 'Fee for Service',
        RequireCode: false,
      },
      {
        HMO: 'Anchor',
        PlAN: 'Ultimate',
        Class: 'Fee for Service',
        RequireCode: false,
      },
    ],
    authorizationCode: '',
    coPayAmount: 0,
  },
  {
    id: 3,
    name: 'Simpa',
    date: '2022-01-20 19:45',
    category: 'Microbiology',
    description: 'lorem',
    status: 'unpaid',
    amount: '5000',
    serviceDetails: [
      {
        HMO: 'Anchor',
        PlAN: 'Ultimate',
        Class: 'Fee for Service',
        RequireCode: false,
      },
      {
        HMO: 'Anchor',
        PlAN: 'Ultimate',
        Class: 'Fee for Service',
        RequireCode: false,
      },
    ],
    authorizationCode: '',
    coPayAmount: 0,
  },
];

export const dataTree = [
  {
    title: 'Ada Chris',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of 1 unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultationof one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Eve Adam',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',

        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',

        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
  {
    title: 'Simpa Dania',
    description: 'Prescription of one unpaid bill(s)',
    children: [
      {
        title: 'Registration with 1 Unpaid bills.',
        description: 'Prescription of one unpaid bill(s)',
        data: rowData,
      },
      {
        title: 'Consultation of 1 Unpaid bill',
        description: 'Consultation of one unpaid bill(s)',
        data: rowData,
      },
    ],
  },
];
