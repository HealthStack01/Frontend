import { Models } from '../Constants';
import { toAPIDate, toShortDate } from '../DateUtils';
import { InputType } from './util';

const PrescriptionOrderSchema = [
  {
    name: 'Medication',
    key: 'medication',
    description: 'Search for Medicine',
    selector: (row) => row.medication,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.MEDICATION_HELPER,
      field: 'medication',
      labelSelector: (obj) => `${obj.medication}`,
      valueSelector: ({ medication }) => ({ medication }),
    },
  },
  {
    name: 'Instruction',
    description: 'Enter instruction',
    selector: (row) => row.instruction,
    key: 'instruction',
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Destination',
    description: 'Enter destination',
    selector: (row) => row.destination,
    key: 'destination',
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.LOCATION,
      field: 'name',
      labelSelector: (obj) => `${obj.name}`,
      valueSelector: (obj) => ({
        destination: obj.name,
        destinationId: obj._id,
      }),
    },
  },
];

const PrescriptionSchema = [
  {
    name: 'SN',
    description: 'S/N',
    key: 'sn',
    selector: (row) => row.sn,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Date',
    description: 'Date',
    key: 'date',
    selector: (row) => toShortDate(row.createdAt),
    sortable: true,
    required: true,
    defaultValue: toAPIDate(new Date()),
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Medication',
    key: 'medication',
    description: 'Search for Medicine',
    selector: (row) => row.order,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.MEDICATION_HELPER,
      field: 'medication',
      labelSelector: (obj) => `${obj.medication}`,
      valueSelector: (obj) => obj.medication,
      extraFields: {
        instruction: 'instruction',
      },
    },
  },
  {
    name: 'Fullfiled',
    description: 'Fullfilled',
    selector: (row) => (row.fulfilled === 'True' ? 'Yes' : 'No'),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Instruction',
    description: 'Enter instruction',
    key: 'instruction',
    sortable: true,
    required: true,
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Status',
    description: 'Enter Status',
    selector: (row) => row.order_status,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Physician',
    description: 'Requesting Physician',
    key: 'physician',
    selector: (row) => row.requestingdoctor_Name,
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Destination',
    description: 'Enter destination',
    key: 'destination',
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.LOCATION,
      field: 'name',
      labelSelector: (obj) => `${obj.name}`,
      valueSelector: (obj) => obj.name,
    },
  },
];

export { PrescriptionOrderSchema, PrescriptionSchema };
