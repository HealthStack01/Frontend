import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  Font,
  View,
} from '@react-pdf/renderer';
import React from 'react';

import ClientReportTable from './ClientPDFTable';
import InvoiceTable from './InvoiceTable';
import LabTable from './LabTable';
import ReportTable from './PdfTable';

interface LabProps {
  title?: string;
  printData?: any[];
}

export const LabResultPDF: React.FC<LabProps> = ({ title, printData }) => (
  <Document>
    <Page size='A4' style={styles.body}>
      <Text style={styles.header} fixed>
        <Text style={styles.subtitle}>{title}</Text>
      </Text>
      <View style={styles.flex}>
        <View style={styles.address}>
          <Image style={styles.image} src='/Healthstack.png' />
          <View style={styles.addressBox}>
            <Text style={styles.headerText}>Healthstack Technologies</Text>
            <Text style={styles.headerText}>101 E. Agege Avenue</Text>
            <Text style={styles.headerText}>Yaba, Lagos</Text>
            <Text style={styles.headerText}>(234) 892 973 2345</Text>
          </View>
        </View>
        <View style={styles.address}>
          <View style={styles.addressBox}>
            <Text style={styles.headerText}>John Doe</Text>
            <Text style={styles.headerText}>101 E. Agege Avenue</Text>
            <Text style={styles.headerText}>Yaba, Lagos</Text>
            <Text style={styles.headerText}>(234) 892 973 2345</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionTop}>
        <Text>Patient Danille Okeke</Text>
      </View>

      <View style={styles.sectionFlex}>
        <View style={styles.rightFlex}>
          <View style={styles.flex}>
            <Text style={styles.label}>Sex</Text>
            <Text style={styles.textLeft}>M</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>ID Number</Text>
            <Text style={styles.textLeft}>QCL 9303030</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.textLeft}>29/04/1995</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.textLeft}>25</Text>
          </View>
        </View>
        <View>
          <View style={styles.flex}>
            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.textLeft}>+234 789 186 7656 </Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Telephone</Text>
            <Text style={styles.textLeft}>+234 789 186 7656</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.textLeft}>demo@mail.com</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Address</Text>
            <Text>101 E. Agege Avenue</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionTop}>
        <Text>Report Details</Text>
      </View>
      <View style={styles.sectionFlex}>
        <View style={styles.rightFlex}>
          <View style={styles.flex}>
            <Text style={styles.label}>Requisition Number</Text>
            <Text style={styles.textLeft}>MI243546464</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Order Referrence</Text>
            <Text style={styles.textLeft}>N/A</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Collection Date</Text>
            <Text style={styles.textLeft}>29/04/2022 19:45</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Request Date</Text>
            <Text style={styles.textLeft}>29/04/2022 19:45</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Report Date</Text>
            <Text style={styles.textLeft}>29/04/2022 19:45</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Report Updated Date</Text>
            <Text style={styles.textLeft}>N/A</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Report Type</Text>
            <Text style={styles.textLeft}>FINAL REPORT</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Priority</Text>
            <Text style={styles.textLeft}>ROUTINE</Text>
          </View>
        </View>
        <View>
          <View style={styles.flex}>
            <Text style={styles.label}>Specimen Type</Text>
            <Text style={styles.textLeft}>N/A</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Comments</Text>
            <Text style={styles.textLeft}>---</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Diagnostics</Text>
            <Text style={styles.textLeft}>NO CLINICAL DETAILSS</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.label}>Test Required</Text>
            <Text>Brown</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <Text style={styles.title}>Results</Text>
        <LabTable data={printData} />
      </View>

      <View style={styles.table}>
        <Text style={styles.title}>End of Report</Text>
        <Text>
          All reports have been validated by a Pathologist. For consultation,
          please contact any of our Pathologist, Phone Number: +234 xxx xxxx
          xxx, Email: mail@mail.com, WhatsApp: +234 xxx xxxx xxx{' '}
        </Text>
      </View>

      <View style={styles.sign}>
        <View style={styles.addressBox}>
          <Text style={styles.footerText}>_______________________</Text>
          <Text style={styles.footerText}>Signed By</Text>
        </View>
      </View>
    </Page>
  </Document>
);

Font.register({
  family: 'Helvetica',
  src: '',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 8,
  },

  address: {
    fontSize: 8,
    fontWeight: 'light',
    lineHeight: 1.05,
  },

  addressBox: {
    marginTop: 4,
  },
  flex: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
  },

  subtitle: {
    fontSize: 10,
    margin: 12,
    fontFamily: 'Helvetica',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },

  header: {
    backgroundColor: 'black',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    color: 'white',
    marginBottom: 20,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  image: {
    width: 24,
    marginLeft: 2,
  },
  logo: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  table: {
    marginTop: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
    textAlign: 'right',
  },
  footerText: {
    marginTop: 4,
  },
  headerText: {
    marginTop: 2,
    fontWeight: 'thin',
  },
  sign: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
    textAlign: 'center',
  },

  sectionTop: {
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: 'blue',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    color: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  label: {
    fontWeight: 'semibold',
    marginRight: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  sectionFlex: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rightFlex: {
    marginRight: 96,
  },

  textLeft: {
    textAlign: 'left',
  },

  title: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Helvetica',
  },
});
