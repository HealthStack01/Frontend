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

export { LaboratoryOrderSchema, PrescriptionOrderSchema };
