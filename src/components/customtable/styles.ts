export const customStyles = {
  rows: {
    style: {
      minHeight: "40px", // override the row height
      "&:not(:last-of-type)": {
        borderBottomWidth: "0px",
      },
      padding: "0.25rem",
      backgroundColor: "##F8F8F8",
    },
  },
  headRow: {
    style: {
      borderBottomWidth: "0px",
      padding: "0.25rem",
      backgroundColor: "#F8F8F8",
      fontSize: "0.75rem",
    },
  },
  headCells: {
    style: {
      padding: "0.25rem",
      paddingLeft: "0.5rem", // override the cell padding for head cells
      paddingRight: "0.5rem",
      paddingTop: "0.2rem",
      paddingBottom: "0.2rem",
      fontSize: "0.8rem",
      fontWeight: "bold",
      color: "#000000",
    },
  },
  cells: {
    style: {
      paddingLeft: "0.5rem", // override the cell padding for data cells
      paddingRight: "0.5rem",
      paddingTop: "0.2rem",
      paddingBottom: "0.2rem",
      fontSize: "0.79rem",
      color: "#000000",
      fontWeight: "400",
    },
  },
};
