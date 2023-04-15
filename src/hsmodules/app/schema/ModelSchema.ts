import * as yup from "yup";

import {Dictionary} from "../../../types.d";
import {Nigeria} from "../Nigeria";
import {InputType, Schema} from "./util";

export const getOrganisationSchema = (): Schema[] => [
  {
    name: "S/N",
    key: "_id",
    description: "ID",
    sortable: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: "Name",
    key: "facilityName",
    description: "Name of Organization",
    selector: row => row.facilityName,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().min(5, "Name must exceed 5 characters"),
  },
  {
    name: "CAC Number",
    key: "facilityCACNumber",
    description: "CAC Number",
    selector: row => row.facilityName,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().length(14, "Enter a valid CAC number"),
  },
  {
    name: "CEO",
    key: "facilityOwner",
    description: "Organization CEO",
    selector: row => row.facilityOwner,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: "Org Type",
    key: "facilityType",
    description: "Organization Type",
    selector: row => row.facilityType,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: [
      "Diagnostic Lab",
      "Diagnostics Imaging",
      "HMO",
      "Hospital",
      "Pharmacy",
      "Others",
    ],
  },
  {
    name: "Org Category",
    key: "facilityCategory",
    description: "Organization Category",
    selector: row => row.facilityCategory,
    sortable: true,
    required: true,
    inputType: InputType.SELECT_LIST,
    options: ["Healthcare", "Finance"],
  },
];

export const getOrganisationContactSchema = (
  formData: Dictionary
): Schema[] => [
  {
    name: "Country",
    key: "facilityCountry",
    description: "Facility Country",
    selector: row => row.facilityCountry,
    sortable: true,
    required: true,
    options: ["Nigeria"],
    inputType: InputType.SELECT_LIST,
  },
  {
    name: "State",
    key: "facilityState",
    description: "Organization State",
    selector: row => row.facilityState,
    sortable: true,
    required: true,
    options: Nigeria.map(obj => obj.state),
    defaultValue: formData["facilityState"],
    inputType: InputType.SELECT_LIST,
  },
  {
    name: "LGA",
    key: "facilityLGA",
    description: "LGA",
    selector: row => row.facilityLGA,
    sortable: true,
    required: true,
    options:
      (Nigeria || []).find(obj => obj.state === formData["facilityState"])
        ?.lgas || [],
    inputType: InputType.SELECT_LIST,
  },
  {
    name: "City",
    key: "facilityCity",
    description: "Organization City",
    selector: row => row.facilityCity,
    sortable: true,
    required: true,
    /* options:
      (Nigeria || []).find(obj => obj.state === formData["facilityState"])
        ?.lgas || [], */
    inputType:InputType.TEXT //InputType.SELECT_LIST,
  },
  {
    name: "Address",
    key: "facilityAddress",
    description: "Organization Registered Address",
    selector: row => row.facilityAddress,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    validator: yup.string().min(10, "Enter a valid Address"),
  },
  {
    name: "Phone  Number",
    key: "facilityContactPhone",
    description: "Organization Contact Phone Number",
    selector: row => row.facilityContactPhone,
    sortable: true,
    required: true,
    inputType: InputType.PHONE,
    validator: yup
      .string()
      .min(10, "Enter a  Phone number")
      .max(13, "Enter a Phone number"),
  },
  {
    name: "Email",
    key: "facilityEmail",
    description: "Organization Email",
    selector: row => row.facilityContactPhone,
    sortable: true,
    required: true,
    inputType: InputType.EMAIL,
    validator: yup.string().email(),
  },
];

export const OnboardingEmployeeSchema = [
  {
    name: "Firstname",
    key: "firstname",
    description: "Firstname",
    inputType: InputType.TEXT,
    required: true,
  },
  {
    name: "Lastname",
    key: "lastname",
    description: "Lastname",
    inputType: InputType.TEXT,
    required: true,
  },
  {
    name: "Email",
    key: "email",
    description: "Email",
    inputType: InputType.TEXT,
    required: true,
  },
  {
    name: "Department Unit",
    key: "profession",
    description: "Enter Profession",
    //options: ["Unit 1", "Unnit 1", "Unit 1", "unit 2"],
    inputType: InputType.TEXT,
    required: true,
  },

  {
    name: "Department",
    key: "department",
    description: "Enter department",
    //options: ["Front Desk", "Accounting", "Clinic", "Pharmacy"],
    inputType: InputType.TEXT,
    required: true,
  },
  {
    name: "Department Unit",
    key: "deptunit",
    description: "Enter department unit",
    //options: ["Unit 1", "Unnit 1", "Unit 1", "unit 2"],
    inputType: InputType.TEXT,
    required: true,
  },
  {
    name: "Department Unit",
    key: "password",
    description: "Passowrd",
    //options: ["Unit 1", "Unnit 1", "Unit 1", "unit 2"],
    inputType: InputType.PASSWORD,
    required: true,
  },
];

export const ModulesSchema = [
  {
    name: "",
    key: "modules1",
    description: "Modules",
    sortable: true,
    options: [
      {label: "Accounting", value: "Accounting"},
      {label: "Admin", value: "Admin"},
      {label: "Blood Bank", value: "Blood Bank"},
      {label: "Client", value: "Client"},
      {label: "Clinic", value: "Clinic"},
      {label: "Communication", value: "Communication"},
      {label: "Complaints", value: "Complaints"},
      {label: "Appointments", value: "Appointments"},
      {
        label: "Continous Mediscal Education",
        value: "Continous Mediscal Education",
      },
      {label: "Documentation", value: "Documentation"},
      {label: "Epidemiology", value: "Epidemiology"},
      {label: "Finance", value: "Finance"},
      {label: "Immunization", value: "Immunization"},
    ],
    inputType: InputType.SELECT_CHECKBOX,
  },
  {
    name: "",
    key: "modules2",
    description: "Modules",
    sortable: true,
    options: [
      {label: "Inventory", value: "Inventory"},
      {label: "Laboratory", value: "Laboratory"},
      {label: "Managed Care", value: "Managed Care"},
      {label: "CRM", value: "CRM"},
      {label: "Patient Portal", value: "Patient Portal"},
      {label: "Pharmacy", value: "Pharmacy"},
      {label: "Radiology", value: "Radiology"},
      {label: "Report", value: "Report"},
      {label: "Referral", value: "Referral"},
      {
        label: "Research and Data Exhange",
        value: "Research and Data Exhange",
      },
      {label: "Telemedicine", value: "Telemedicine"},
      {label: "Theatre", value: "Theatre"},
      {label: "User Profile", value: "User Profile"},
    ],
    inputType: InputType.SELECT_CHECKBOX,
  },
];
