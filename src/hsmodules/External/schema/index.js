export const ClientMiniSchema = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: row => row.sn,
    sortable: true,
    inputType: "HIDDEN",
  },
  {
    name: "First Name",
    key: "firstname",
    description: "First Name",
    selector: row => row.firstname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Midlle Name",
    key: "middlename",
    description: "Midlle Name",
    selector: row => row.middlename,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Last Name",
    key: "lastname",
    description: "Last Name",
    selector: row => row.lastname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Date of Birth",
    key: "dob",
    description: "Date of Birth",
    selector: row => row.dob,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Gender",
    key: "gender",
    description: "Male",
    selector: row => row.gender,
    sortable: true,
    required: true,
    inputType: "SELECT_LIST",
    options: ["Male", "Female"],
  },

  // {
  //   name: "Marital Status",
  //   key: "maritalstatus",
  //   description: "Single",
  //   selector: row => row.maritalstatus,
  //   sortable: true,
  //   required: true,
  //   inputType: "SELECT_LIST",
  //   options: ["Single", "Married"],
  // },

  {
    name: "Email",
    key: "email",
    description: "johndoe@mail.com",
    selector: row => row.email,
    sortable: true,
    required: true,
    inputType: "EMAIL",
  },

  {
    name: "Phone Number",
    key: "phone",
    description: "0806478263",
    selector: row => row.phone,
    sortable: true,
    required: true,
    inputType: "PHONE",
  },

  // {
  //   name: "Residential Address",
  //   key: "residentialaddress",
  //   description: "Ozumba Mbadiwe",
  //   selector: row => row.residentialaddress,
  //   sortable: true,
  //   required: true,
  //   inputType: "TEXT",
  // },

  // {
  //   name: "Town",
  //   key: "town",
  //   description: "Ikate Elegushi",
  //   selector: row => row.town,
  //   sortable: true,
  //   required: true,
  //   inputType: "TEXT",
  // },

  // {
  //   name: "State",
  //   key: "state",
  //   description: "Lagos",
  //   selector: row => row.state,
  //   sortable: true,
  //   required: true,
  //   inputType: "TEXT",
  // },

  // {
  //   name: "Country",
  //   key: "country",
  //   description: "Nigeria",
  //   selector: row => row.country,
  //   sortable: true,
  //   required: true,
  //   inputType: "TEXT",
  // },

  // {
  //   name: "Next of Kin",
  //   key: "nextofkin",
  //   description: "Next of Kin",
  //   selector: row => row.nextofkin,
  //   sortable: true,
  //   required: true,
  //   inputType: "TEXT",
  // },

  // {
  //   name: "Next of kin Phone",
  //   key: "nextofkinphone",
  //   description: "Next of Kin",
  //   selector: row => row.nextofkinphone,
  //   sortable: true,
  //   required: true,
  //   inputType: "TEXT",
  // },
];
