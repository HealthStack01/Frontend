import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import ExcelClientUpload from "../../components/excel-upload/Client-Upload";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../components/texts";
import {ClientMiniSchema} from "./schema";
import CustomTable from "../../components/customtable";

const UploadClients = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    console.log(uploads);
  }, []);
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
      >
        <FormsHeaderText text="List of Uploaded Client" />
        <ExcelClientUpload updateState={setUploads} />
      </Box>

      <Box
        sx={{
          height: "calc(85vh - 150px)",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={ClientMiniSchema}
          data={uploads}
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
          Clear
        </GlobalCustomButton>
        <GlobalCustomButton>Create Client(s)</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default UploadClients;
