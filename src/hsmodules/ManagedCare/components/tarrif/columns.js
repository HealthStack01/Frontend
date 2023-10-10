import {DeleteOutline, EditOutlined} from "@mui/icons-material";
import {IconButton, Typography} from "@mui/material";

export const getServicesColumns = (
  deleteService,
  editService,
  omitEdit = false,
  omitDelete = false
) => {
  const servicesColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "S/N",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "50px",
    },

    {
      name: "Service Name",
      key: "serviceName",
      description: "Service Name",
      selector: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.serviceName}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Price",
      key: "price",
      description: "Price",
      selector: row => `₦${row?.price}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Comment",
      key: "comment",
      description: "Comment",
      selector: row => row?.comments,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Edit",
      width: "60px",
      center: true,
      key: "delete",
      description: "Delete row",
      selector: row => (
        <IconButton color="success" onClick={() => editService(row)}>
          <EditOutlined fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
      omit: omitEdit,
    },
    {
      name: "Del",
      width: "60px",
      center: true,
      key: "delete",
      description: "Delete row",
      selector: row => (
        <IconButton sx={{color: "red"}} onClick={() => deleteService(row)}>
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
      omit: omitDelete,
    },
  ];

  return servicesColumns;
};

export const getPlansColumns = (deletePlan, omitDelete) => {
  const plansColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "S/N",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Plan Name",
      key: "plan",
      description: "Plan",
      selector: row => row.planName,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
        color: "#1976d2",
      },
    },
    {
      name: "Bill Mode",
      key: "capitation",
      description: "capitation",
      selector: row => (row.capitation ? "Capitation" : "Fee For Service"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    // {
    //   name: "Capitation",
    //   key: "capitation",
    //   description: "capitation",
    //   selector: row => (row?.capitation === true ? "Yes" : "No"),
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
    // {
    //   name: "Free for Service",
    //   key: "free service",
    //   description: "Free for Service",
    //   selector: row => (row?.feeForService === true ? "Yes" : "No"),
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
    {
      name: "PreAuth",
      key: "PreAuth",
      description: "PreAuth",
      selector: row => (row.reqPA ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Co Pay",
      key: "co pay",
      description: "Co pay",
      selector: row => (row.coPay ? `₦${row?.copayDetail}` : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Benefit Category",
      key: "Benefit Category",
      description: "Benefit Category",
      selector: row => row.benefitcategory,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Benefit",
      key: "Benefit",
      description: "Benefit",
      selector: row => row.benefit,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Del",
      width: "60px",
      center: true,
      key: "delete",
      description: "Delete row",
      selector: (row, index) => (
        <IconButton sx={{color: "red"}} onClick={() => deletePlan(row)}>
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
      omit: omitDelete,
    },
  ];

  return plansColumns;
};
