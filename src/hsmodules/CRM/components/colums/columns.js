import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

export const getStaffColumns = (action, disableAction = false) => {
  const staffColumns = [
    {
      name: "Name",
      key: "row",
      description: "Enter Date",
      selector: row => `${row.firstname} ${row.lastname}`,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Profession",
      style: {color: "#0364FF"},
      key: "contact_position",
      description: "Enter Date",
      selector: row => row.profession,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Email",
      style: {color: "#0364FF"},
      key: "contact_phone",
      description: "Enter Date",
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Phone NO",
      key: "contact_email",
      description: "Enter Date",
      selector: row => row.phone,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Del",
      width: "50px",
      center: true,
      key: "contact_email",
      description: "Enter Date",
      selector: row => (
        <IconButton
          onClick={() => action(row)}
          disabled={disableAction}
          color="error"
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  return staffColumns;
};

export const getContactColumns = (action, disableAction) => {
  const contactColumns = [
    {
      name: "Name",
      key: "contact_name",
      description: "Enter Date",
      selector: row => row.contact_name,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Position",
      style: {color: "#0364FF"},
      key: "contact_position",
      description: "Enter Date",
      selector: row => row.contact_position,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Phone No",
      style: {color: "#0364FF"},
      key: "contact_phone",
      description: "Enter Date",
      selector: row => row.contact_phone,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Email",
      key: "contact_email",
      description: "Enter Date",
      selector: row => row.contact_email,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Del",
      width: "50px",
      center: true,
      key: "action",
      description: "Enter Date",
      selector: row => (
        <IconButton
          onClick={() => action(row)}
          disabled={disableAction}
          color="error"
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  return contactColumns;
};

export const getTaskColumns = (action, disableAction) => {
  const contactColumns = [
    {
      name: "Title",
      key: "title",
      description: "Enter Date",
      selector: row => row.title,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Type",
      style: {color: "#0364FF"},
      key: "type",
      description: "Enter Date",
      selector: row => row.type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Priority",
      style: {color: "#0364FF"},
      key: "priority",
      description: "Enter Date",
      selector: row => row.priority,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Information",
      key: "information",
      description: "Enter Date",
      selector: row => row.information,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Del",
      width: "50px",
      center: true,
      key: "action",
      description: "Enter Date",
      selector: row => (
        <IconButton
          onClick={() => action(row)}
          disabled={disableAction}
          color="error"
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  return contactColumns;
};
