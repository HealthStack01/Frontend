import { Models } from '../Constants';
import { toShortDate } from '../DateUtils';
import { InputType } from './util';

const AllergySchema = [
  {
    name: 'Allergine',
    key: 'allergine',
    selector: (row) => row.allergine,
  },
  {
    name: 'Reaction',
    key: 'reaction',
    selector: (row) => row.reaction,
  },
];

const BillOrderSchema = [
  {
    name: 'Category',
    selector: (row) => row.category,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
  },
  {
    name: 'Quantity',
    selector: (row) => row.quantity,
  },
  {
    name: 'Unit',
    selector: (row) => row.baseunit,
  },
  {
    name: 'Selling Price',
    selector: (row) => row.sellingprice,
  },
  {
    name: 'Amount',
    selector: (row) => row.amount,
  },
  {
    name: 'illing Mode',
    selector: (row) => row.billMode.type,
  },
];

const LaboratorySchema = [
  {
    name: 'Date',
    selector: (row) => toShortDate(row.createdAt),
  },
  {
    name: 'Test',
    selector: (row) => row.order,
  },
  {
    name: 'Fullfilled',
    selector: (row) => (row.fullfilled === 'True' ? 'Yes' : 'No'),
  },
  {
    name: 'Order Status',
    selector: (row) => row.order_status,
  },
  {
    name: 'Requesting Physician',
    selector: (row) => row.requestingdoctor_Name,
  },
];

const MedicationSchema = [
  {
    name: 'Drug Name',
    selector: (row) => row.drugname,
  },
  {
    name: 'Strength/Frequency',
    selector: (row) => row.strengthfreq,
  },
  {
    name: 'Notes',
    selector: (row) => row.notes,
  },
];

const PresentingComplaintSchema = [
  {
    name: 'Symptoms',
    selector: (row) => row.symptom,
  },
  {
    name: 'Duration',
    selector: (row) => row.duration,
  },
];

const LaboratoryOrderSchema = [
  {
    name: 'Test',
    key: 'test',
    description: 'Search for Laboratory Tests',
    selector: (row) => row.test,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.LABORATORY_HELPER,
      field: 'test',
      labelSelector: (obj) => `${obj.test}`,
      valueSelector: ({ test, instruction }) => ({
        test,
        instruction,
      }),
    },
  },
  {
    name: 'Laboratory',
    description: 'Search Laboratory',
    key: 'destination',
    selector: (row) => row.location_name,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_AUTO_SUGGEST,
    options: {
      model: Models.LOCATION,
      or: ['name', 'locationType'],
      labelSelector: (obj) => obj.name,
      valueSelector: ({ _id, name }) => ({
        destination: name,
        destinationId: _id,
      }),
    },
  },
];

const GenericTableSchema = [
  {
    name: 'Record',
    selector: (row) => row.key,
  },
  {
    name: 'Value',
    selector: (row) => row.value,
  },
];

const generateSchema = (keys) =>
  keys.map((key) => ({
    name: key,
    key,
    selector: (row) => JSON.stringify(row[key].length),
  }));

export {
  AllergySchema,
  BillOrderSchema,
  generateSchema,
  GenericTableSchema,
  LaboratoryOrderSchema,
  LaboratorySchema,
  MedicationSchema,
  PresentingComplaintSchema,
};
