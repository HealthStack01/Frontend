import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: string;
  channel: string;
  questionnaire: string;
  triggerToken: string;
  autoproceedTimeout: string;
  senderPhoneNumber: string;
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
    name: 'Channel',
    selector: (row) => row.channel,
    sortable: true,
  },
  {
    name: 'Questionnaire',
    selector: (row) => row.questionnaire,
    sortable: true,
  },
  {
    name: 'Trigger Token',
    selector: (row) => row.triggerToken,
    sortable: true,
  },
  {
    name: 'Autoproceed Timeout',
    selector: (row) => row.autoproceedTimeout,
    sortable: true,
  },
  {
    name: 'Sender Phone Number',
    selector: (row) => row.senderPhoneNumber,
    sortable: true,
  },
];

export const rowData = [
  {
    id: '1',
    name: 'MessageBird WhatsApp Channel',
    channel: 'MessageBird WhatsApp Channel',
    questionnaire: 'Biodata Queationnaire',
    triggerToken: 'Hello',
    autoproceedTimeout: '0',
    senderPhoneNumber: '+2349993838',
    otherConfig: '',
  },
  {
    id: '2',
    name: 'MessageBird WhatsApp Channel',
    channel: 'MessageBird WhatsApp Channel',
    questionnaire: 'Biodata Queationnaire',
    triggerToken: 'Hello',
    autoproceedTimeout: '0',
    senderPhoneNumber: '+2349993838',
    otherConfig: '',
  },
];
