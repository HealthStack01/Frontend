import * as yup from "yup";

const nigerianPhoneRegExp = /^([0]{1})[0-9]{10}$/;

export const organizationValidationSchema = yup.object().shape({
  facilityCAC: yup.string().required("Enter a valid CAC number"),
  //.length(14, "Invalid valid CAC number"),

  facilityName: yup
    .string()
    .required("Enter the name of your Organization")
    .min(5, "Name must exceed 5 characters"),

  facilityOwner: yup.string().required("Name of CEO is required!"),

  facilityType: yup.string().required("Please select your Organization Type"),

  facilityCategory: yup
    .string()
    .required("Please Select your Organization Category!"),
});

export const contactValidationSchema = yup.object().shape({
  facilityCountry: yup.string().required("Select Organization Country"),

  facilityState: yup.string().required("Select Organizaiton State"),

  facilityLGA: yup.string().required("Select Local Government of Organization"),

  facilityCity: yup.string().required("Select City of Organization"),

  facilityAddress: yup.string().required("Select City of Organization"),

  facilityContactPhone: yup
    .string()
    .matches(nigerianPhoneRegExp, "Enter a valid phone number (0900000000000).")
    .required("Enter the phone number of the client!"),

  facilityEmail: yup
    .string()
    .required("Enter a valid Email Address")
    .email("Invalid Email Address"),
});

export const adminValidationSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required!"),
  middlename: yup.string(),
  lastname: yup.string().required("Last Name is required!"),
  profession: yup.string().required("Employee Profession is required!"),
  position: yup.string().required("Employee Position is required!"),
  phone: yup
    .string()
    .required("Enter the phone number!")
    .matches(
      nigerianPhoneRegExp,
      "Enter a valid phone number (0900000000000)."
    ),
  email: yup
    .string()
    .required("Enter a vlid Email Address!")
    .email("Invalid Email Address"),
  department: yup.string().required("Employee Department is required!"),
  deptunit: yup.string().required("Enter Department Unit"),
  password: yup
    .string()
    .required("Password is required!")
    .min(4, "Minimum of 4 Characters"),
});
