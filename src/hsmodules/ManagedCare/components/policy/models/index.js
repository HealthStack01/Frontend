import {Avatar, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {formatDistanceToNowStrict} from "date-fns";

export const EnrolleSchema = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "Image",
    key: "sn",
    description: "Enter name of employee",
    selector: row => <Avatar src={row?.imageurl} />,
    sortable: true,
    inputType: "HIDDEN",
    width: "80px",
  },
  {
    name: "First Name",
    key: "firstname",
    description: "First Name",
    selector: row => row?.firstname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Last Name",
    key: "lastname",
    description: "Last Name",
    selector: row => row?.lastname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Payment",
    key: "payment",
    description: "Payment",
    selector: row =>
      row?.paymentinfo
        .map(item => `${item.paymentmode} - `)
        .join("")
        .slice(0, -2),
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Age",
    key: "age",
    description: "Age",
    selector: row =>
      row?.dob ? formatDistanceToNowStrict(new Date(row?.dob)) : "",
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Gender",
    key: "gender",
    description: "Gender",
    selector: row => row?.gender,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Phone",
    key: "phone",
    description: "Phone",
    selector: row => row?.phone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Email",
    key: "email",
    description: "Email",
    selector: row => row?.email,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

export const EnrolleSchema2 = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "Image",
    key: "sn",
    description: "Enter name of employee",
    selector: row => <Avatar src={row?.imageurl} />,
    sortable: true,
    inputType: "HIDDEN",
    width: "80px",
  },
  {
    name: "First Name",
    key: "firstname",
    description: "First Name",
    selector: row => row?.firstname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Last Name",
    key: "lastname",
    description: "Last Name",
    selector: row => row?.lastname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "payment",
    key: "payment",
    description: "Payment",
    selector: row =>
      row?.paymentinfo
        .map(item => `${item.paymentmode} - `)
        .join("")
        .slice(0, -2),
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "age",
    key: "age",
    description: "Age",
    selector: row =>
      row?.dob ? formatDistanceToNowStrict(new Date(row?.dob)) : "",
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "gender",
    key: "gender",
    description: "Gender",
    selector: row => row?.gender,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "phone",
    key: "phone",
    description: "Phone",
    selector: row => row?.phone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "email",
    key: "email",
    description: "Email",
    selector: row => row?.email,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

export const EnrolleSchema3 = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "First Name",
    key: "firstname",
    description: "First Name",
    selector: row => row?.firstname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Last Name",
    key: "lastname",
    description: "Last Name",
    selector: row => row?.lastname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "payment",
    key: "payment",
    description: "Payment",
    selector: row => row?.paymentinfo?.map(item => item?.paymentmode),
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "age",
    key: "age",
    description: "Age",
    selector: row =>
      row?.dob ? formatDistanceToNowStrict(new Date(row.dob)) : "",
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "gender",
    key: "gender",
    description: "Gender",
    selector: row => row?.gender,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "phone",
    key: "phone",
    description: "Phone",
    selector: row => row?.phone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "email",
    key: "email",
    description: "Email",
    selector: row => row?.email,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "tags",
    key: "tags",
    description: "Tags",
    selector: row => row?.clientTags,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

export const EnrolleSchema4 = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "Provider Name",
    key: "providerName",
    description: "Provider Name",
    selector: row => row?.organizationDetail?.facilityName,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "City",
    key: "city",
    description: "City",
    selector: row => row?.organizationDetail?.facilityCity,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Contact Person",
    key: "contactPerson",
    description: "Contact Person",
    selector: row => row?.organizationDetail?.facilityOwner,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Phone",
    key: "phone",
    description: "Phone",
    selector: row => row?.organizationDetail?.facilityContactPhone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Category",
    key: "category",
    description: "Category",
    selector: row => row?.organizationDetail?.facilityCategory,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Status",
    key: "status",
    description: "Status",
    selector: row => (row?.active ? "Active" : "Inactive"),
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];
export const ProviderSchema = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "Provider Name",
    key: "providerName",
    description: "Provider Name",
    selector: row => row?.facilityName,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "City",
    key: "city",
    description: "City",
    selector: row => row?.facilityCity,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  /*  {
    name: "Contact Person",
    key: "contactPerson",
    description: "Contact Person",
    selector: row => row?.facilityOwner,
    sortable: true,
    required: true,
    inputType: "TEXT",
  }, */
  {
    name: "Phone",
    key: "phone",
    description: "Phone",
    selector: row => row?.facilityContactPhone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Category",
    key: "category",
    description: "Category",
    selector: row => row?.facilityCategory,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  /*  {
    name: "Status",
    key: "status",
    description: "Status",
    selector: row => (row?.active ? "Active" : "Inactive"),
    sortable: true,
    required: true,
    inputType: "TEXT",
  }, */
];
export const EnrolleSchemaProvider = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "Provider Name",
    key: "providerName",
    description: "Provider Name",
    selector: row => row?.organizationDetail?.facilityName,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "City",
    key: "city",
    description: "City",
    selector: row => row?.organizationDetail?.facilityCity,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Contact Person",
    key: "contactPerson",
    description: "Contact Person",
    selector: row => row?.organizationDetail?.facilityOwner,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Phone",
    key: "phone",
    description: "Phone",
    selector: row => row?.organizationDetail?.facilityContactPhone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Category",
    key: "category",
    description: "Category",
    selector: row => row?.organizationDetail?.facilityCategory,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Status",
    key: "status",
    description: "Status",
    selector: row => (row?.active ? "Active" : "Inactive"),
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

export const EnrolleSchema5 = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "HMO Name",
    key: "providerName",
    description: "Provider Name",
    selector: row => row?.facilityName,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Address",
    key: "address",
    description: "Address",
    selector: row => row?.facilityAddress,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "City",
    key: "city",
    description: "City",
    selector: row => row?.facilityCity,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Contact Person",
    key: "contactPerson",
    description: "Contact Person",
    selector: row => row?.facilityOwner,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Phone",
    key: "phone",
    description: "Phone",
    selector: row => row?.facilityContactPhone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Category",
    key: "category",
    description: "Category",
    selector: row => row?.facilityCategory,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

export const sponsorColumns = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "Sponsor Name",
    key: "providerName",
    description: "Provider Name",
    selector: row => row?.facilityName,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Address",
    key: "address",
    description: "Address",
    selector: row => row?.facilityAddress,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "City",
    key: "city",
    description: "City",
    selector: row => row?.facilityCity,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Contact Person",
    key: "contactPerson",
    description: "Contact Person",
    selector: row => row?.facilityOwner,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Phone",
    key: "phone",
    description: "Phone",
    selector: row => row?.facilityContactPhone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  /*  {
    name: "Category",
    key: "category",
    description: "Category",
    selector: row => row?.facilityCategory,
    sortable: true,
    required: true,
    inputType: "TEXT",
  }, */
];

export const FinInfoSchema = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
    width: "50px",
  },
  {
    name: "type",
    key: "type",
    description: "Type",
    selector: row => row?.paymentmode,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "principal",
    key: "principal",
    description: "Principal",
    selector: row => row?.principalName,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "organization",
    key: "organization",
    description: "Organization",
    selector: row => row?.organizationName,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "hmoagent",
    key: "hmoagent",
    description: "HMO Agent",
    selector: row => row?.agentName,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "plan",
    key: "plan",
    description: "Plan",
    selector: row => row?.plan,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "active",
    key: "active",
    description: "Active",
    selector: row => (row?.active ? "Yes" : "No"),
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

export const returnDependentModel = (delAction, disabled) => {
  const model = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: row => row?.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Last Name",
      key: "lastname",
      description: "Last Name",
      selector: row => row?.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "payment",
      key: "payment",
      description: "Payment",
      selector: row => row?.paymentinfo?.map(item => item?.paymentmode),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "age",
      key: "age",
      description: "Age",
      selector: row =>
        row?.dob ? formatDistanceToNowStrict(new Date(row.dob)) : "",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "gender",
      key: "gender",
      description: "Gender",
      selector: row => row?.gender,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "phone",
      key: "phone",
      description: "Phone",
      selector: row => row?.phone,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "email",
      key: "email",
      description: "Email",
      selector: row => row?.email,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Delete",
      key: "tags",
      description: "Tags",
      selector: row => (
        <IconButton
          size="small"
          onClick={() => delAction(row)}
          sx={{color: "red"}}
          disabled={disabled}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return model;
};

export const returnProviderModel = (delAction, disabled, omit) => {
  const model = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Provider Name",
      key: "providerName",
      description: "Provider Name",
      selector: row =>
        row.facilityName || row?.organizationDetail?.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "City",
      key: "city",
      description: "City",
      selector: row =>
        row.facilityCity || row?.organizationDetail?.facilityCity,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    // {
    //   name: "Contact Person",
    //   key: "contactPerson",
    //   description: "Contact Person",
    //   selector: row =>
    //     row.facilityOwner || row?.organizationDetail?.facilityOwner,
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
    {
      name: "Phone",
      key: "phone",
      description: "Phone",
      selector: row =>
        row.facilityContactPhone ||
        row?.organizationDetail?.facilityContactPhone,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Category",
      key: "category",
      description: "Category",
      selector: row =>
        row.facilityCategory || row?.organizationDetail?.facilityCategory,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    // {
    //   name: "Status",
    //   key: "status",
    //   description: "Status",
    //   selector: row => (row?.active ? "Active" : "Inactive"),
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },

    {
      name: "Delete",
      key: "tags",
      description: "Tags",
      selector: row => (
        <IconButton
          size="small"
          onClick={() => delAction(row)}
          sx={{color: "red"}}
          disabled={disabled}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      omit: omit,
    },
  ];

  return model;
};
