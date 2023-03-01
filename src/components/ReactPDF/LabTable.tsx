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
  bold: {
    fontWeight: 'bold',
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '15%',
    paddingLeft: 4,
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

interface LabTableProps {
  data: any[];
}
const LabTable: React.FC<LabTableProps> = ({ data }) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Name</Text>
        <Text style={styles.row2}>Result</Text>
        <Text style={styles.row3}>Range</Text>
        <Text style={styles.row2}>Units</Text>
        <Text style={styles.row5}>Flag</Text>
      </View>
      {data.map((row, i) => (
        <View key={i} style={styles.row} wrap={false}>
          <Text style={styles.row1}>{row.name}</Text>
          <Text style={styles.row2}>{row.result}</Text>
          <Text style={styles.row3}>{row.range}</Text>
          <Text style={styles.row1}>{row.units}</Text>
          <View style={styles.row5}>
            <Text>Balance Due: NGN {row.flag}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default LabTable;
