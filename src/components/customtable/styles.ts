export const customStyles = {
  rows: {
    style: {
      minHeight: "64px", // override the row height
      "&:not(:last-of-type)": {
        borderBottomWidth: "0px",
      },
      padding: "0.75rem",
      backgroundColor: "##F8F8F8",
    },
  },
  headRow: {
    style: {
      borderBottomWidth: "0px",
      padding: "24px",
      backgroundColor: "#F8F8F8",
      fontSize: "0.75rem",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "0.75rem",
      fontWeight: "bold",
      color: "#33415C",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontSize: "o.75rem",
      color: "#2d2d2d",
      fontWeight: "400",
    },
  },
};
