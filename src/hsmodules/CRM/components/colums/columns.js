import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import moment from "moment";

export const getStaffColumns = (action, disableAction = false) => {
  const staffColumns = [
    {
      name: "SN",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "50px",
    },
    {
      name: "Name",
      key: "row",
      description: "Enter Date",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "DATE",
      style: {
        textTransform: "capitalize",
      },
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
      style: {
        textTransform: "capitalize",
      },
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
      selector: row => row.phoneno,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Status",
      key: "contact_email",
      description: "Enter Date",
      selector: row => (row.active ? "Active" : "Inactive"),
      sortable: true,
      required: true,
      inputType: "STRING",
      width: "80px",
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

export const getContactColumns = (action, disableAction, omit) => {
  const contactColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "50px",
    },
    {
      name: "Name",
      key: "contact_name",
      description: "Enter Date",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Position",
      style: {color: "#0364FF"},
      key: "contact_position",
      description: "Enter Date",
      selector: row => row.position,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Phone No",
      style: {color: "#0364FF"},
      key: "contact_phone",
      description: "Enter Date",
      selector: row => row.phoneno,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Email",
      key: "contact_email",
      description: "Enter Date",
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Status",
      key: "contact_email",
      description: "Enter Date",
      selector: row => (row.active ? "Active" : "Inactive"),
      sortable: true,
      required: true,
      inputType: "STRING",
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
      omit: omit,
    },
  ];

  return contactColumns;
};

export const getTaskColumns = (action, disableAction) => {
  const contactColumns = [
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
      name: "Employee",
      key: "employee",
      description: "Enter Staff",
      selector: row => row.employee,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
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

export const getAppointmentColumns = (action, disableAction) => {
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

export const getUploadColumns = (action, disableAction) => {
  const contactColumns = [
    {
      name: "File Name",
      key: "file_name",
      description: "Enter Date",
      selector: row => row.file_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Date",
      style: {color: "#0364FF"},
      key: "date",
      description: "Enter Date",
      selector: row => moment(row.date).format("L"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Doc Type",
      style: {color: "#0364FF"},
      key: "doc_type",
      description: "Enter Date",
      selector: row => row.doc_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "File Type",
      style: {color: "#0364FF"},
      key: "file_type",
      description: "Enter Date",
      selector: row => row.file_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Del",
      width: "80px",
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

export const getPlansColumns = (action, disableAction) => {
  const plansColumns = [
    {
      name: "S/N",
      width: "50px",
      style: {color: "#0364FF"},
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Plan Type",
      key: "file_name",
      description: "Enter Date",
      selector: row => row.plan_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Date",
      style: {color: "#0364FF"},
      key: "created_at",
      description: "Enter Date",
      selector: row => moment(row.created_at).format("L"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Duration",
      style: {color: "#0364FF"},
      key: "no_of_months",
      description: "Enter Date",
      selector: row => `${row.duration_length} ${row.duration_calendrical}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Premium",
      style: {color: "#0364FF"},
      key: "premium",
      description: "Enter Date",
      selector: row => `${row.premium}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Num of Heads",
      style: {color: "#0364FF"},
      key: "no_of_heads",
      description: "Enter Date",
      selector: row => `${row.no_of_heads}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Amount(₦)",
      style: {color: "#0364FF"},
      key: "amount",
      description: "Enter Date",
      selector: row => row.amount,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Del",
      width: "80px",
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

  return plansColumns;
};
