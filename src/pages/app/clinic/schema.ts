import { Models } from '../Constants';
import { toAPIDate, toShortDate } from '../DateUtils';
import { InputType } from '../schema/util';

export const PrescriptionOrderSchema = [
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

export const RadiologyOrderSchema = [
  {
    name: 'Medication',
    key: 'medication',
    description: 'Search for Test',
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

export const PrescriptionSchema = [
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

export const RadiologySchema = [
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

export const AllergySchema = [
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

export const BillOrderSchema = [
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

export const LaboratorySchema = [
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

export const MedicationSchema = [
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

export const PresentingComplaintSchema = [
  {
    name: 'Symptoms',
    selector: (row) => row.symptom,
  },
  {
    name: 'Duration',
    selector: (row) => row.duration,
  },
];

export const LaboratoryOrderSchema = [
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

export const GenericTableSchema = [
  {
    name: 'Record',
    selector: (row) => row.key,
  },
  {
    name: 'Value',
    selector: (row) => row.value,
  },
];

export const ClinicalNoteSchema = [
  { name: 'Symptoms', key: 'Symptoms', inputType: InputType.TEXT_AREA },
  {
    name: 'Clinical Findings',
    description: 'Clinical Findings',
    key: 'Clinical Findings',
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Diagnosis',
    description: 'Diagnosis',
    key: 'Diagnosis',
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Plan',
    description: 'Plan',
    key: 'Plan',
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Status',
    description: 'Status',
    key: 'status',
    inputType: InputType.SELECT_RADIO,
    options: ['Draft', 'Final'],
  },
];

export const LabResult = [
  {
    name: 'Investigation',
    description: 'Investigation',
    key: 'Investigation',
    inputType: InputType.TEXT,
  },
  {
    name: 'Findings',
    description: 'Findings',
    key: 'Findings',
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Recommendation',
    description: 'Recommendation',
    key: 'Recommendation',
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Status',
    description: 'status',
    key: 'status',
    inputType: InputType.SELECT_RADIO,
    options: ['Draft', 'Final'],
  },
];

const ProgressNote = [
  { name: 'Date', description: 'Date', key: 'Date', inputType: InputType.DATE },
  {
    name: 'Progress Note Type',
    description: 'Progress Note Type',
    key: 'Progress Note Type',
    inputType: InputType.SELECT_CHECKBOX,
    options: ['New', 'Return', 'Periodic'],
  },
  ...['Subjective', 'Objective', 'Assessment', 'Plan'].map((field) => ({
    name: field,
    description: field,
    key: field,
    inputType: InputType.TEXT_AREA,
  })),
  {
    name: 'ROS',
    description: 'ROS',
    key: 'ROS',
    inputType: InputType.SELECT_CHECKBOX,
    options: [
      'Decrease Symptoms',
      'Improve Functioning',
      'Consolidate Gains',
      'Improve compliance',
    ],
  },
  ...['Prepare for Discharge', 'Other', 'Next Review Plan Date'].map(
    (field) => ({
      name: field,
      description: field,
      key: field,
      inputType: InputType.TEXT,
    }),
  ),
  ...['Attending_Physician_Name', 'Date_Seen'].map((field) => ({
    name: field,
    description: field,
    key: field,
    inputType: InputType.TEXT,
  })),
  {
    name: 'Status',
    description: 'Status',
    key: 'status',
    inputType: InputType.SELECT_RADIO,
    options: ['Draft', 'Final'],
  },
];

const DoctorNote = [
  {
    name: 'Title',
    description: 'Title',
    key: 'Title',
    inputType: InputType.TEXT,
  },
  {
    name: 'Documentation',
    description: 'Documentation',
    key: 'Documentation',
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Recommendation',
    description: 'Recommendation',
    key: 'Recommendation',
    inputType: InputType.TEXT_AREA,
  },
  {
    name: 'Status',
    description: 'Status',
    key: 'status',
    inputType: InputType.SELECT_RADIO,
    options: ['Draft', 'Final'],
  },
];

export const DocumentationSchemas = [
  { name: 'Clinical Note', schema: ClinicalNoteSchema },
  { name: 'Lab Result', schema: LabResult },
  { name: 'Progress Note', schema: ProgressNote },
  { name: 'Doctor Note', schema: DoctorNote },
];

export const generateSchema = (keys) =>
  keys.map((key) => ({
    name: key,
    key,
    selector: (row) => JSON.stringify(row[key].length),
  }));
