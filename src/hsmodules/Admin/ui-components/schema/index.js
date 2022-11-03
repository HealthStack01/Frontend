import * as yup from "yup";

export const BandSchema = [
  {
    name: "S/N",
    key: "_id",
    description: "Enter name of band",
    sortable: true,
    inputType: "HIDDEN",
  },
  {
    name: "Name of Band",
    key: "name",
    description: "Enter name of band",
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "Band Type",
    key: "bandType",
    description: "Enter name of band",
    selector: (row) => row.bandType,
    sortable: true,
    required: true,
    inputType: "SELECT_LIST",
    options: ["Provider", "Company", "Patient", "Plan"],
  },
  {
    name: "Description of Band",
    key: "description",
    description: "Enter description of band",
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: "TEXT",
  },
];
// validation schema

export const createBandSchema = yup.object().shape({
  name: yup.string().required("Enter the  name of the band!"),
  bandType: yup.string().required("Enter the band type!"),
});
