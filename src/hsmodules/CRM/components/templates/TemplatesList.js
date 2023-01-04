import {useState, useEffect, useContext} from "react";
import {Button, Box} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import {FormsHeaderText} from "../../../../components/texts";
import ModalBox from "../../../../components/modal";
import CustomTable from "../../../../components/customtable";

import {getUploadColumns} from "../colums/columns";
import {ObjectContext, UserContext} from "../../../../context";

const CRMTemplatesList = ({openCreateModal}) => {
  const [uploads, setUploads] = useState([]);
  const {state} = useContext(ObjectContext);
  const [viewModal, setViewModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({});

  useEffect(() => {
    const currentDeal = state.DealModule.selectedDeal;
    setUploads(currentDeal.uploads || []);
  }, [state.DealModule]);

  const uploadColumns = getUploadColumns();

  const handleRow = doc => {
    setSelectedDoc(doc);
    setViewModal(true);
  };
  return (
    <Box p={2}>
      <ModalBox
        open={viewModal}
        onClose={() => setViewModal(false)}
        header={`View Document ${selectedDoc?.name}`}
      >
        <Box sx={{width: "85vw", height: "85vh"}}>
          {selectedDoc?.type === "image" ? (
            <iframe
              style={{width: "100%", height: "100%"}}
              src={selectedDoc?.uploadUrl}
            />
          ) : (
            <>
              {selectedDoc?.fileType === "pdf" ? (
                <iframe
                  style={{width: "100%", height: "100%"}}
                  src={selectedDoc?.uploadUrl}
                />
              ) : (
                <iframe
                  style={{width: "100%", height: "100%"}}
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedDoc?.uploadUrl}`}
                />
              )}
            </>
          )}
        </Box>
      </ModalBox>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
      >
        <FormsHeaderText text="List of CRM Templates" />

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize"}}
          onClick={openCreateModal}
        >
          <AddCircleOutlineOutlinedIcon sx={{mr: "5px"}} fontSize="small" />
          Upload New Template
        </Button>
      </Box>

      <Box mt={1} mb={1}>
        <CustomTable
          columns={uploadColumns}
          data={uploads}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          CustomEmptyData="You haven't Uploaded any file(s) yet..."
          progressPending={false}
        />
      </Box>
    </Box>
  );
};

export default CRMTemplatesList;
