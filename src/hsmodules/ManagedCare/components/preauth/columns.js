<<<<<<< HEAD
export const getComplaintColumns = deleteAction => {
=======
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {IconButton} from "@mui/material";

export const getComplaintColumns = (deleteAction, omitDelete = true) => {
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Complaint",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.complaint,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Duration",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.duration,
      sortable: true,
      inputType: "HIDDEN",
      width: "100px",
    },
<<<<<<< HEAD
=======

    {
      name: "Delete",
      key: "sn",
      description: "SN",
      selector: (row, i) => (
        <IconButton
          size="small"
          onClick={() => deleteAction(row)}
          sx={{color: "red"}}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      inputType: "HIDDEN",
      omit: omitDelete,
      width: "100px",
    },
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  ];

  return columns;
};

<<<<<<< HEAD
export const getDiagnosisColumns = deleteAction => {
=======
export const getDiagnosisColumns = (deleteAction, omitDelete = true) => {
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Type",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.type,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Diagnosis",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.diagnosis,
      sortable: true,
      inputType: "HIDDEN",
    },
<<<<<<< HEAD
=======
    {
      name: "Delete",
      key: "sn",
      description: "SN",
      selector: (row, i) => (
        <IconButton
          size="small"
          onClick={() => deleteAction(row)}
          sx={{color: "red"}}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      inputType: "HIDDEN",
      omit: omitDelete,
      width: "100px",
    },
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  ];

  return columns;
};

<<<<<<< HEAD
export const getServicesColumns = deleteAction => {
=======
export const getServicesColumns = (deleteAction, omitDelete = true) => {
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const columns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Service Name",
      key: "item",
      description: "Item",
      selector: row => row.service.serviceName,
      sortable: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "QTY",
      key: "submittedQuantity",
      description: "Submitted QTY",
      selector: row => row.quantity,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Unit Price",
      key: "submittedBill",
      description: "Unit Price",
      selector: row => row.unitprice,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      key: "payableBill",
      description: "Payable Bill",
      selector: row => row.amount,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Comments",
      key: "submittedBill",
      description: "Unit Price",
      selector: row => row.comments,
      sortable: true,
      inputType: "TEXT",
    },
<<<<<<< HEAD
=======
    {
      name: "Status",
      key: "submittedBill",
      description: "Unit Price",
      selector: row => row?.status,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Delete",
      key: "sn",
      description: "SN",
      selector: (row, i) => (
        <IconButton
          size="small"
          onClick={() => deleteAction(row)}
          sx={{color: "red"}}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      inputType: "HIDDEN",
      omit: omitDelete,
      width: "100px",
    },
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  ];

  return columns;
};
