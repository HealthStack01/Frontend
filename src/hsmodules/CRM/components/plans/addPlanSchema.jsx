import * as yup from "yup";

export const addPlanSchema = yup.object().shape({
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
});
