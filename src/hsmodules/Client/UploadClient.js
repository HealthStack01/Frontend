import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import ExcelClientUpload from "../../components/excel-upload/Client-Upload";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../components/texts";
import {clientsUploadColumns} from "./schema";
import CustomTable from "../../components/customtable";
import {toast} from "react-toastify";

const UploadClients = ({createClients}) => {
  const [uploads, setUploads] = useState([]);

  const handleCreateClients = () => {
    if (uploads.length === 0)
      return toast.error("Can't create empty list of Clients");
    createClients(uploads);
  };
  return (
    <Box
      sx={{
        width: "90vw",
        height: "85vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <FormsHeaderText text="List of Uploaded Client" />
        <ExcelClientUpload updateState={setUploads} />
      </Box>

      <Box
        sx={{
          height: "calc(85vh - 80px)",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={clientsUploadColumns}
          data={uploads && uploads}
          pointerOnHover
          highlightOnHover
          striped
          // onRowClicked={handleRow}
          //conditionalRowStyles={conditionalRowStyles}
          progressPending={false}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <GlobalCustomButton color="warning" onClick={() => setUploads([])}>
          Clear Table
        </GlobalCustomButton>
        <GlobalCustomButton onClick={handleCreateClients}>
          Create Client(s)
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default UploadClients;
