import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  locationType: string;
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
    name: 'Location Type',
    selector: (row) => row.locationType,
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

export interface LabDataProps {
  id: any;
  date: string;
  test: string;
  fulfilled: string;
  status: string;
  requesting: string;
}

export const columnLab: TableColumn<LabDataProps>[] = [
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
    name: 'Test',
    selector: (row) => row.test,
    sortable: true,
  },
  {
    name: 'Fulfilled',
    selector: (row) => row.fulfilled,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: 'Requesting',
    selector: (row) => row.requesting,
    sortable: true,
  },
];

export const labData = [
  {
    id: '1',
    date: '2021-03-19 19:45pm',
    test: 'Test 1',
    fulfilled: 'No',
    status: 'Pending',
    requesting: 'Pending',
  },

  {
    id: '2',
    date: '2021-03-19 19:45pm',
    test: 'Test 1',
    fulfilled: 'No',
    status: 'Pending',
    requesting: 'Pending',
  },

  {
    id: '3',
    date: '2021-03-19 19:45pm',
    test: 'Test 1',
    fulfilled: 'No',
    status: 'Pending',
    requesting: 'Pending',
  },
];

export const recentData = [
  {
    id: '1',
    date: '3 months ago',
    description:
      'Appointment Orders by test test at Cashier 1 Finance,Test Facility completed',
    data: labData,
  },
  {
    id: '2',
    date: '3 months ago',
    description:
      'Billed Orders by test test at Cashier 1 Finance,Test Facility completed',
    data: labData,
  },
  {
    id: '3',
    date: '3 months ago',
    description:
      'Billed Orders by test test at Cashier 1 Finance,Test Facility completed',
    data: labData,
  },
  {
    id: '4',
    date: '3 months ago',
    description:
      'Billed Orders by test test at Cashier 1 Finance,Test Facility completed',
    data: labData,
  },
  {
    id: '5',
    date: '3 months ago',
    description:
      'Appointment Orders by test test at Cashier 1 Finance,Test Facility completed',
    data: labData,
  },
  {
    id: '6',
    date: '3 months ago',
    description:
      'Billed Orders by test test at Cashier 1 Finance,Test Facility completed',
    data: labData,
  },
  {
    id: '7',
    date: '3 months ago',
    description:
      'Billed Orders by test test at Cashier 1 Finance,Test Facility completed',
    data: labData,
  },
  {
    id: '8',
    date: '3 months ago',
    description:
      'Billed Orders by test test at Cashier 1 Finance,Test Facility completed',
    data: labData,
  },
];
