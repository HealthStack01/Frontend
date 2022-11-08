import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import { DocumentPDF } from '.';

const ViewDocument = () => {
  return (
    <PDFViewer>
      <DocumentPDF title='Test Document' />
    </PDFViewer>
  );
};

export default ViewDocument;
