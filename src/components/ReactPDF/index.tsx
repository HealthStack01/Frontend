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
import ReportTable from './PdfTable';

interface DocumentProps {
  title?: string;
  printData?: any[];
}

export const DocumentPDF: React.FC<DocumentProps> = ({ title, printData }) => (
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

      <View style={styles.table}>
        {/* <ReportTable data={reportList} /> */}
        {/* <ClientReportTable data={clientsList} /> */}
        <InvoiceTable data={printData} />
      </View>

      <View style={styles.footer}>
        <View style={styles.addressBox}>
          <Text style={styles.footerText}>Total: NGN 3000</Text>
          <Text style={styles.footerText}>Amount Paid: NGN 2000</Text>
          <Text style={styles.footerText}>Balane Due NGN 1000</Text>
        </View>
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
    padding: 12,
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
});
