import * as yup from "yup";
import moment from "moment";
import {formatDistanceToNowStrict} from "date-fns";
import dayjs from "dayjs";
import {Box} from "@mui/system";
import {Avatar, Typography} from "@mui/material";

export const ClientMiniSchema = [
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
    name: "Image",
    key: "middlename",
    description: "Midlle Name",
    selector: row => <Avatar src={row.imageUrl} />,
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "100px",
  },

  {
    name: "First Name",
    key: "firstname",
    description: "First Name",
    selector: row => row.firstname,
    sortable: true,
    required: true,
    inputType: "TEXT",
    style: {
      textTransform: "capitalize",
    },
  },

  {
    name: "Middlle Name",
    key: "middlename",
    description: "Midlle Name",
    selector: row => (row.middlename ? row.middlename : "----------"),
    sortable: true,
    required: true,
    inputType: "TEXT",
    style: {
      textTransform: "capitalize",
    },
  },

  {
    name: "Last Name",
    key: "lastname",
    description: "Last Name",
    selector: row => row.lastname,
    sortable: true,
    required: true,
    inputType: "TEXT",
    style: {
      textTransform: "capitalize",
    },
  },

  // {
  //   name: "Registered At",
  //   key: "middlename",
  //   description: "Midlle Name",
  //   selector: row => dayjs(row?.createdAt).format("DD/MM/YYYY"),
  //   sortable: true,
  //   required: true,
  //   inputType: "TEXT",
  // },

  {
    name: "Payment Mode",
    key: "middlename",
    description: "Midlle Name",
    selector: row => (
      <Box>
        {row.paymentinfo.map((pay, i) => (
          <Typography sx={{fontSize: "0.75rem"}} data-tag="allowRowEvents">
            {pay?.paymentmode} {pay?.paymentmode === "Cash" ? "" : ":"}{" "}
            {pay?.organizationName}
          </Typography>
        ))}
      </Box>
    ),

    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Age",
    key: "dob",
    description: "Date of Birth",
    selector: row => formatDistanceToNowStrict(new Date(row.dob)),
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "100px",
    center: true,
  },

  {
    name: "Gender",
    key: "gender",
    description: "Male",
    selector: row => (row.gender ? row.gender : "Not Specified"),
    sortable: true,
    required: true,
    inputType: "SELECT_LIST",
    options: ["Male", "Female"],
    width: "100px",
  },
  {
    name: "Phone Number",
    key: "phone",
    description: "0806478263",
    selector: row => row.phone,
    sortable: true,
    required: true,
    inputType: "PHONE",
    width: "140px",
  },

  {
    name: "Email",
    key: "email",
    description: "johndoe@mail.com",
    selector: row => (row.email ? row.email : "----------"),
    sortable: true,
    required: true,
    inputType: "EMAIL",
  },

  {
    name: "Residential Address",
    key: "residentialaddress",
    description: "Ozumba Mbadiwe",
    selector: row => row.residentialaddress,
    sortable: true,
    required: true,
    inputType: "TEXT",
    omit: true,
  },

  {
    name: "Town",
    key: "town",
    description: "Ikate Elegushi",
    selector: row => row.town,
    sortable: true,
    required: true,
    inputType: "TEXT",
    omit: true,
  },

  // {
  //   name: 'State',
  //   key: 'state',
  //   description: 'Lagos',
  //   selector: row => row.state,
  //   sortable: true,
  //   required: true,
  //   inputType: 'TEXT',
  //   omit: true,
  // },

  // {
  //   name: 'Country',
  //   key: 'country',
  //   description: 'Nigeria',
  //   selector: row => row.country,
  //   sortable: true,
  //   required: true,
  //   inputType: 'TEXT',
  // },

  {
    name: "Status",
    key: "active",
    description: "Next of Kin",
    selector: row => (row.alive ? "Alive" : "Dead"),
    sortable: true,
    required: true,
    inputType: "TEXT",
    omit: false,
    width: "100px",
  },

  {
    name: "Next of kin Phone",
    key: "nextofkinphone",
    description: "Next of Kin",
    selector: row => row.nextofkinphone,
    sortable: true,
    required: true,
    inputType: "TEXT",
    omit: true,
  },
];

const nigerianPhoneRegExp = /^([0]{1})[0-9]{10}$/;

export const createClientSchema = yup.object().shape({
  firstname: yup.string().required("Enter the first name of the client!"),
  lastname: yup.string().required("Enter the last name of the client!"),
  dob: yup.string().required("Enter the date of birth of the client!"),
  phone: yup
    .string()
    .matches(nigerianPhoneRegExp, "Enter a valid phone number (0900000000000).")
    .required("Enter the phone number of the client!"),
  email: yup
    .string()
    .email("Must be a valid email!")
    .required("Email is required!"),

  nok_email: yup.string().email("Must be a valid email!"),

  nok_phoneno: yup
    .string()
    .matches(
      nigerianPhoneRegExp,
      "Enter a valid phone number (0900000000000)."
    ),
});
export const createClientSchema2 = yup.object().shape({
  firstname: yup.string().required("Enter the first name of the client!"),
  lastname: yup.string().required("Enter the last name of the client!"),
  phone: yup
    .string()
    .matches(nigerianPhoneRegExp, "Enter a valid phone number (0900000000000).")
    .required("Enter the phone number of the client!"),
  email: yup
    .string()
    .email("Must be a valid email!")
    .required("Email is required!"),

  nok_email: yup.string().email("Must be a valid email!"),

  nok_phoneno: yup
    .string()
    .matches(
      nigerianPhoneRegExp,
      "Enter a valid phone number (0900000000000)."
    ),
});

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email!")
    .required("Email is required!"),
});
