import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  recipient: string;
  autosent: string;
  activeInteraction: string;
  completed: string;
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
    name: 'Recipient',
    selector: (row) => row.recipient,
    sortable: true,
  },
  {
    name: 'Active Interaction',
    selector: (row) => row.activeInteraction,
    sortable: true,
  },
  {
    name: 'Completed',
    selector: (row) => row.completed,
    sortable: true,
  },
];

export const rowData = [
  {
    id: '1',
    name: 'BioData Questionnaire',
    recipient: '+2349567899i',
    autosent: 'Yes',
    activeInteraction: 'N/A',
    completed: 'Yes',
  },
  {
    id: '2',
    name: 'BioData Questionnaire',
    recipient: '+2349567899i',
    autosent: 'Yes',
    activeInteraction: 'N/A',
    completed: 'Yes',
  },
  {
    id: '3',
    name: 'BioData Questionnaire',
    recipient: '+2349567899i',
    autosent: 'Yes',
    activeInteraction: 'N/A',
    completed: 'Yes',
  },
];
