import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  channelType: string;
  provider: string;
  baseURL: string;
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
    name: ' Type',
    selector: (row) => row.channelType,
    sortable: true,
  },
  {
    name: 'Provider',
    selector: (row) => row.provider,
    sortable: true,
  },
  {
    name: 'Base URL',
    selector: (row) => row.baseURL,
    sortable: true,
  },
];

export const rowData = [
  {
    id: 1,
    name: 'Channel 1',
    channelType: 'WhatsApp',
    provider: 'Message Bird',
    baseURL: 'http://messagebird.com',
    providerConfig: '',
  },
  {
    id: 2,
    name: 'Channel 3',
    channelType: 'SMS',
    provider: 'Message Bird',
    baseURL: 'http://messagebird.com',
    providerConfig: '',
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
