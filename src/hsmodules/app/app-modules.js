// const appModules = [
//   {
//     name: "Accounting",
//     types: [""],
//   },
//   {
//     name: "Admin",
//     types: [""],
//   },
//   {
//     name: "Blood Bank",
//     types: [""],
//   },
//   {
//     name: "Client",
//     types: [""],
//   },
//   {
//     name: "Clinic",
//     types: [""],
//   },
//   {
//     name: "Communication",
//     types: [""],
//   },
//   {
//     name: "Complaints",
//     types: [""],
//   },
//   {
//     name: "CRM",
//     types: [""],
//   },
//   {
//     name: "Engagement",
//     types: [""],
//   },
//   {
//     name: "Epidemiology",
//     types: [""],
//   },
//   {
//     name: "Finance",
//     types: [""],
//   },
//   {
//     name: "Immunization",
//     types: [""],
//   },
//   {
//     name: "Inventory",
//     types: [""],
//   },
//   {
//     name: "Laboratory",
//     types: [""],
//   },
//   {
//     name: "Managed Care",
//     types: [""],
//   },
//   {
//     name: "Market Place",
//     types: [""],
//   },
//   {
//     name: "Patient Portal",
//     types: [""],
//   },
//   {
//     name: "Pharmacy",
//     types: [""],
//   },
//   {
//     name: "Radiology",
//     types: [""],
//   },
//   {
//     name: "Referral",
//     types: [""],
//   },
//   {
//     name: "Theatre",
//     types: [""],
//   },
//   {
//     name: "Ward",
//     types: [""],
//   },
//   // {
//   //   name: "",
//   //   types: [""],
//   // },
//   // {
//   //   name: "",
//   //   types: [""],
//   // },
//   // {
//   //   name: "",
//   //   types: [""],
//   // },
//   // {
//   //   name: "",
//   //   types: [""],
//   // },
// ];

export const orgTypeModules = [
  {
    name: "Hospital",
    alias: ["Provider", "Facility"],
    modules: [
      "Admin",
      "Client",
      "Clinic",
      "Appointment",
      "Check-In",
      "Ward",
      "Laboratory",
      "Radiology",
      "Pharmacy",
      "Theatre",
      "Blood Bank",
      "Inventory",
      "Communication",
      "Immunization",
      "Finance",
      "Accounting",
      "Complaints",
      "Referral",
      "Epidemiology",
      "Engagement",
    ],
  },

  {
    name: "Pharmacy",
    alias: [],
    modules: [
      "Admin",
      "Communication",
      "Pharmacy",
      "Client",
      "Clinic",
      "Finance",
      "Account",
      "Complaint",
      "Referral",
      "Epidemiology",
      "Inventory",
    ],
  },

  {
    name: "Diagnostics",
    alias: ["Laboratory", "Radiology"],
    modules: [
      "Admin",
      "Communication",
      "Laboratory",
      "Client",
      "Clinic",
      "Finance",
      "Account",
      "Complaint",
      "Epidemiology",
      "Inventory",
      "Referral",
    ],
  },
  {
    name: "HMO",
    alias: [],
    modules: [
      "Admin",
      "Communication",
      "Finance",
      "CRM",
      "Managed care",
      "Account",
    ],
  },

  {
    name: "Corporate",
    alias: [],
    modules: ["Admin", "Complaint", "Coporate", "Communication"],
  },

  {
    name: "Nutritionist",
    alias: [],
    modules: [
      "Admin",
      "Communication",
      "Finance",
      "Client",
      "Clinic",
      "Account",
      "Referral",
      "Complaint",
      "Appointment",
    ],
  },

  {
    name: "Dental",
    alias: [],
    modules: [
      "Admin",
      "Communication",
      "Finance",
      "Client",
      "Clinic",
      "Account",
      "Referral",
      "Complaint",
      "Appointment",
    ],
  },

  {
    name: "Optometrist",
    alias: [],
    modules: [
      "Admin",
      "Communication",
      "Finance",
      "Client",
      "Clinic",
      "Account",
      "Referral",
      "Complaint",
      "Appointment",
    ],
  },
  {
    name: "Ophthalmologist Center",
    alias: [],
    modules: [
      "Admin",
      "Communication",
      "Finance",
      "Client",
      "Clinic",
      "Account",
      "Referral",
      "Complaint",
      "Appointment",
    ],
  },

  {
    name: "Physiotherapist Center",
    alias: [],
    modules: [
      "Admin",
      "Communication",
      "Finance",
      "Client",
      "Clinic",
      "Account",
      "Referral",
      "Complaint",
      "Appointment",
    ],
  },
];
