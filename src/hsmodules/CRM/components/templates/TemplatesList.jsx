import {useState, useEffect, useContext, useCallback} from "react";
import {Button, Box, IconButton} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import {FormsHeaderText} from "../../../../components/texts";
import ModalBox from "../../../../components/modal";
import CustomTable from "../../../../components/customtable";

import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import dayjs from "dayjs";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import {toast} from "react-toastify";

const CRMTemplatesList = ({openCreateModal}) => {
  const templateServer = client.service("templatedoc");
  const [uploads, setUploads] = useState([]);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [viewModal, setViewModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    message: "",
    action: null,
  });

  const handleGetTemplates = useCallback(async () => {
    setLoading(true);
    const facId = user.currentEmployee.facilityDetail._id;

    console.log(facId);

    const res = await templateServer.find({
      query: {
        facilityId: facId,
        $sort: {
          updatedAt: -1,
        },
      },
    });

    setUploads(res.data);

    setLoading(false);
  }, []);

  const handleUpdateTemplates = useCallback(async () => {
    showActionLoader();
    const facId = user.currentEmployee.facilityDetail._id;

    console.log(facId);

    const res = await templateServer.find({
      query: {
        facilityId: facId,
        $sort: {
          updatedAt: -1,
        },
      },
    });

    setUploads(res.data);

    hideActionLoader();
  }, []);

  useEffect(() => {
    handleGetTemplates();

    templateServer.on("created", obj => handleUpdateTemplates());
    templateServer.on("updated", obj => handleUpdateTemplates());
    templateServer.on("patched", obj => handleUpdateTemplates());
    templateServer.on("removed", obj => handleUpdateTemplates());
  }, [handleGetTemplates]);

  const handleRow = doc => {
    setSelectedDoc(doc.upload);
    setViewModal(true);
  };

  const handleDeleteTemplate = item => {
    const itemId = item._id;
    templateServer
      .remove(itemId)
      .then(res => {
        cancelConfrim();
        toast.success("You've successfully deleted Template");
      })
      .catch(err => {
        toast.error(`Failed to delete Template ${err}`);
      });
  };

  const confirmDelete = item => {
    setConfirmDialog({
      open: true,
      type: "danger",
      message: `You're about to delete the template ${item.upload.name}`,
      action: () => handleDeleteTemplate(item),
    });
  };

  const cancelConfrim = () => {
    setConfirmDialog({
      open: false,
      type: "",
      message: "",
      action: null,
    });
  };

  const columns = [
    {
      name: "SN",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "50px",
    },
    {
      name: "Uploaded By",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => row.upload.uploadedByName,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "File Name",
      key: "file_name",
      description: "Enter Date",
      selector: row => row.upload.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
        color: "#0364FF",
      },
    },

    {
      name: "Upload Time",
      key: "date",
      description: "Enter Date",
      selector: row => dayjs(row.updatedAt).format("DD/MM/YYYY hh:mm A"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Doc Type",
      key: "doc_type",
      description: "Enter Date",
      selector: row => row?.upload?.template,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
        color: "#0364FF",
      },
    },

    {
      name: "Upload Type",
      style: {color: "#0364FF"},
      key: "file_type",
      description: "Enter Date",
      selector: row => row?.upload?.uploadType,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Del",
      width: "80px",
      center: true,
      key: "action",
      description: "Enter Date",
      selector: row => (
        <IconButton onClick={() => confirmDelete(row)} color="error">
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  return (
    <Box p={2}>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        type={confirmDialog.type}
        message={confirmDialog.message}
        confirmationAction={confirmDialog.action}
        cancelAction={cancelConfrim}
      />
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
          columns={columns}
          data={uploads}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          //CustomEmptyData="You haven't Uploaded any file(s) yet..."
          progressPending={loading}
        />
      </Box>
    </Box>
  );
};

export default CRMTemplatesList;
