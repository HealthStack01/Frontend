import { Models } from '../Constants';
import { toAPIDate, toShortDate } from '../DateUtils';
import { InputType } from './util';

const LaboratoryOrderSchema = [
  {
    name: 'Test',
    key: 'test',
    description: 'Search for Laboratory Tests',
    selector: (row) => `${row.test}`,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.LABORATORY_HELPER,
      field: 'test',
      labelSelector: (obj) => `${obj.test}`,
      valueSelector: (obj) => obj.test,
    },
    extraFields: {
      instruction: 'instruction',
    },
  },
  {
    name: 'Laboratory',
    description: 'Search Laboratory',
    key: 'destination',
    selector: (row) => row.destination,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.LOCATION,
      or: ['name', 'locationType'],
      labelSelector: (obj) => obj.name,
      valueSelector: (obj) => obj.name,
    },
    extraFields: {
      location_name: (obj) => obj.name,
      location_type: (obj) => obj.locationType,
    },
  },
];

const PrescriptionSchema = [
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
      valueSelector: (obj) => obj.medication,
      extraFields: {
        instruction: 'instruction',
      },
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

const PrescriptionOrderSchema = [
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
    name: 'Fullfiled',
    description: 'Fullfilled',
    selector: (row) => (row.fulfilled === 'True' ? 'Yes' : 'No'),
    sortable: true,
    required: true,
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

export { LaboratoryOrderSchema, PrescriptionOrderSchema, PrescriptionSchema };
