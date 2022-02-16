import { Models } from '../Constants';
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
    selector: (row) => row.instruction,
    sortable: true,
    required: true,
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Destination',
    description: 'Enter destination',
    key: 'destination',
    selector: (row) => row.destination,
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

export { LaboratoryOrderSchema, PrescriptionOrderSchema };
