import * as yup from "yup";

export const BandSchema = [
  {
    name: "S/N",
    key: "_id",
    description: "Enter name of band",
    sortable: true,
    inputType: "HIDDEN",
    width: "80px",
  },
  {
    name: "Name of Band",
    key: "name",
    description: "Enter name of band",
    selector: row => row.name,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Band Type",
    key: "bandType",
    description: "Enter name of band",
    selector: row => row.bandType,
    sortable: true,
    required: true,
    inputType: "SELECT_LIST",
    options: ["Provider", "Company", "Patient", "Plan"],
  },
  {
    name: "Description of Band",
    key: "description",
    description: "Enter description of band",
    selector: row => row.description,
    sortable: true,
    required: false,
    inputType: "TEXT",
  },
];
// validation schema

const nigerianPhoneRegExp = /^([0]{1})[0-9]{10}$/;

export const createBandSchema = yup.object().shape({
  name: yup.string().required("Enter the  name of the band!"),
  bandType: yup.string().required("Enter the band type!"),
});
export const createLocationSchema = yup.object().shape({
  name: yup.string().required("Enter the  name of the location!"),
  locationType: yup.string().required("Enter the location type!"),
});

export const createEmployeeSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required!"),
  middlename: yup.string(),
  lastname: yup.string().required("Last Name is required!"),
  profession: yup.string().required("Profession is required!"),
  phone: yup
    .string()
    .matches(nigerianPhoneRegExp, "Enter a valid phone number (0900000000000).")
    .required("Enter the phone number of the client!"),
  email: yup.string().required("Email is required!"),
  department: yup.string().required("Department is required!"),
  depunit: yup.string(),
  password: yup.string().required("Password is required!"),
});
