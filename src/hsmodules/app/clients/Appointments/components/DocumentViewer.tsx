import DataTable from 'react-data-table-component';

import CustomTable from '../../../../../components/customtable';
import {
  AllergySchema,
  BillOrderSchema,
  GenericTableSchema,
  LaboratorySchema,
  MedicationSchema,
  PrescriptionSchema,
} from '../../../clinic/schema';

const DocumentViewer = ({ document }) => {
  const parents = ['Medication list'];
  const schemaDictionary = {
    Allergies: { columns: AllergySchema, data: (list) => list },
    Generic: {
      columns: GenericTableSchema,
      data: (obj) => {
        return (
          Object.entries(obj) &&
          Object.entries(obj).map(([key, value]) => ({
            key,
            value,
          }))
        );
      },
    },
    'Medication List.Allergies': {
      schema: MedicationSchema,
      data: (list) => list,
    },
    'Medication List.Medications': {
      schema: MedicationSchema,
      data: (list) => list,
    },
    'Pediatric Pulmonology Form.Allergy_Skin_Test': {
      columns: AllergySchema,
      data: (list) => list,
    },
    'Pediatric Pulmonology Form.Presenting_Complaints': {
      columns: AllergySchema,
      data: (list) => list,
    },
    'Pediatric Pulmonology Form.Adult Asthma Questionnaire': {
      columns: AllergySchema,
      data: (list) => list,
    },
    Prescription: {
      columns: PrescriptionSchema,
      data: (list) => list,
    },
    'Lab Orders': {
      columns: LaboratorySchema,
      data: (list) => list,
    },
    'Billed Orders': {
      columns: BillOrderSchema,
      data: (list) => list,
    },
  };

  const { documentname, documentdetail } = document;
  const isParent = parents.includes(documentname);

  if (isParent) {
    return schemaDictionary[documentname].keys((key) => {
      const schema =
        schemaDictionary[documentname + '.' + key] ||
        schemaDictionary['Generic'];
      return (
        <DataTable
          key={documentname + key}
          title={documentname + ' ' + key}
          columns={schema.columns}
          data={schema.data(documentdetail[key])}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
        />
      );
    });
  }

  const schema = schemaDictionary[documentname] || schemaDictionary['Generic'];
  return (
    <CustomTable
      key={documentname}
      title={documentname}
      columns={schema.columns}
      data={schema.data(documentdetail)}
      selectable
      pointerOnHover
      highlightOnHover
      striped
    />
  );
};

export default DocumentViewer;
