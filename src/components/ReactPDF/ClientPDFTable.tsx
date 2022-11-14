import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "27%",
  },
  row2: {
    width: "15%",
  },
  row3: {
    width: "15%",
  },
  row4: {
    width: "20%",
  },
  row5: {
    width: "27%",
  },
});

interface ClientReportTableProps {
  data: any[];
}
const ClientReportTable: React.FC<ClientReportTableProps> = ({ data }) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Name</Text>
        <Text style={styles.row2}>Date of Birth</Text>
        <Text style={styles.row3}>Gender</Text>
        <Text style={styles.row4}>Days</Text>
        <Text style={styles.row5}>Info</Text>
      </View>
      {data.map((row, i) => (
        <View key={i} style={styles.row} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.bold}>{row.lastname}</Text>, {row.firstname}
          </Text>
          <Text style={styles.row2}>{row.dob}</Text>
          <Text style={styles.row3}>{row.gender}</Text>
          <Text style={styles.row5}>{row.email}</Text>
          <Text style={styles.row5}>{row.phone}</Text>
          <Text style={styles.row5}>{row.country}</Text>
        </View>
      ))}
    </View>
  );
};

export default ClientReportTable;
