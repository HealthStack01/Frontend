import {Typography} from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";

import EmptyData from "../empty";
import {customStyles} from "./styles";

interface Props {
  title?: string;
  columns: any;
  data: any;
  pointerOnHover?: boolean;
  highlightOnHover?: boolean;
  striped?: boolean;
  selectable?: boolean;
  onRowClicked?: (row: any, event: any) => void;
  dense?: boolean;
  progressPending?: any;
  onSelectedRowsChange?: any;
  noHeader?: boolean;
  conditionalRowStyles?: [];
  selectableRowsComponent?: any;
  CustomEmptyData?: React.ReactNode | "";
  preferredCustomStyles?: any;
  clearSelectedRows?: any;
  contextActions?: any;
}

const CustomLoader = () => (
  <div
    style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="/loading.gif"
      alt="Loading"
      style={{width: "200px", height: "auto", display: "block"}}
    />
    <Typography sx={{marginTop: "-2rem", fontSize: "0.85rem"}}>
      Hold on, whilst we fetch your data...
    </Typography>
  </div>
);

const CustomTable: React.FC<Props> = ({
  title,
  columns,
  data,
  onRowClicked,
  pointerOnHover = true,
  highlightOnHover = true,
  striped = true,
  dense = false,
  progressPending,
  selectable = false,
  onSelectedRowsChange,
  noHeader = true,
  conditionalRowStyles = [],
  selectableRowsComponent,
  CustomEmptyData,
  preferredCustomStyles,
  clearSelectedRows,
  contextActions,
}) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={
        data && data?.map((obj, i) => ({...obj, sn: i + 1, id: `item-id-${i}`}))
      } //TODO: only add sn if it's in the schema, to improve performance here
      pointerOnHover={pointerOnHover}
      highlightOnHover={highlightOnHover}
      striped={striped}
      customStyles={
        preferredCustomStyles ? preferredCustomStyles : customStyles
      }
      onRowClicked={onRowClicked}
      fixedHeader={true}
      selectableRows={selectable}
      //selectableRowsComponent={selectableRowsComponent}
      onSelectedRowsChange={onSelectedRowsChange}
      fixedHeaderScrollHeight="100%"
      responsive
      dense={dense}
      style={{
        width: "100%",
      }}
      clearSelectedRows={clearSelectedRows}
      contextActions={contextActions}
      progressComponent={<CustomLoader />}
      progressPending={progressPending}
      noDataComponent={CustomEmptyData ? CustomEmptyData : <EmptyData />}
      conditionalRowStyles={conditionalRowStyles}
      noHeader={noHeader}
    />
  );
};

export default CustomTable;
