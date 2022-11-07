import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '15%',
  },
  row2: {
    width: '15%',
  },
  row3: {
    width: '20%',
  },
  row4: {
    width: '20%',
  },
  row5: {
    width: '20%',
  },
  count: {
    width: '100%',
    marginTop: 2,
  },
});

interface IncoiceTableProps {
  data: any[];
}
const InvoiceTable: React.FC<IncoiceTableProps> = ({ data }) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Name</Text>
        <Text style={styles.row2}>Category</Text>
        <Text style={styles.row3}>Description</Text>
        <Text style={styles.row2}>Type</Text>
        <Text style={styles.row5}>Amount</Text>
      </View>
      {data.map((row, i) => (
        <View key={i} style={styles.row} wrap={false}>
          <Text style={styles.row1}>{row.name}</Text>
          <Text style={styles.row2}>{row.category}</Text>
          <Text style={styles.row3}>{row.description}</Text>
          <Text style={styles.row1}>{row.type}</Text>
          <View style={styles.row5}>
            <Text style={styles.count}>Balance Due: NGN {row.amountDue}</Text>
            <Text style={styles.count}>Paid up: NGN {row.paidUp}</Text>
            <Text style={styles.count}>Amount: NGN {row.amount}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default InvoiceTable;
