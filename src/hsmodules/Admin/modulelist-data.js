export const actionRoles = [
  {
    value: "Adjust Price",
    label: "Adjust Price",
  },
  {
    value: "Attend to Client",
    label: "Attend to Client",
  },
  {
    value: "Delete Documents",
    label: "Delete Document",
  },
  {
    value: "Complaints",
    label: "Complaints",
  },
  {
    value: "Bill Client",
    label: "Bill Client",
  },
];

export const modulesList = [
  // {
  //   value: "Adjust Price",
  //   label: "Adjust Price",
  // },
  // {
  //   value: "Delete Notes",
  //   label: "Delete Notes",
  // },
  // {
  //   value: "Complaints",
  //   label: "Complaints",
  // },
  // {
  //   value: "Report",
  //   label: "Report",
  // },
  // {
  //   value: "Tasks",
  //   label: "Tasks",
  // },

  {
    value: "Client",
    label: "Client",
    children: [
      {
        value: "Client Appointment",
        label: "Appointment",
      },
      {
        value: "Client Client",
        label: "Client ",
      },

      {
        value: "Client Bill Client",
        label: "Bill Client ",
      },
    ],
  },

  {
    value: "Clinic",
    label: "Clinic",
    children: [
      {
        value: "Clinic Appointment",
        label: "Appointment",
      },
      {
        value: "Clinic Checkin",
        label: "Checkin",
      },
    ],
  },

  {
    value: "Appointments",
    label: "Appointments",
    //children: [],
  },

  {
    value: "Laboratory",
    label: "Laboratory",
    children: [
      {
        value: "Laboratory Bill Client",
        label: " Bill Client ",
      },
      {
        value: "Laboratory Bill Lab Orders",
        label: "Bill Lab Orders",
      },
      {
        value: "Laboratory Lab Result",
        label: " Lab Result ",
      },
    ],
  },

  {
    value: "Pharmacy",
    label: "Pharmacy",
    children: [
      {
        value: "Pharmacy Bill Client",
        label: "Bill Client ",
      },
      {
        value: "Pharmacy Bill Prescription Sent",
        label: " Bill Prescription Sent ",
      },
      {
        value: "Pharmcy Dispensary",
        label: "Dispensary",
      },
      {
        value: "Pharmacy Store Inventory",
        label: "Store Inventory",
      },
      {
        value: "Pharmacy Product Entry",
        label: "Product Entry ",
      },
      {
        value: "Pharmacy Issue Out",
        label: " Issue Out",
      },
    ],
  },

  {
    value: "Finance",
    label: "Finance",
    children: [
      {
        value: "Finance Bill Services",
        label: "Bill Services",
      },
      {
        value: "Finance Payment",
        label: "Payment",
      },
      {
        value: "Finance Revenue",
        label: "Revenue",
      },
      {
        value: "Finance Collections",
        label: "Collections",
      },
      {
        value: "Finance Transactions",
        label: "Transactions",
      },
      {
        value: "Finance Services",
        label: "Services",
      },
      {
        value: "Finance HMO Authorization",
        label: "HMO Authorization",
      },
    ],
  },

  {
    value: "Radiology",
    label: "Radiology",
    children: [
      {
        value: "Radiology Bill Client",
        label: " Bill Client ",
      },
      {
        value: "Radiology Checked-In",
        label: " Checked-In ",
      },
      {
        value: "Radiology Appointment",
        label: "Appointment",
      },
      {
        value: "Radiology Bill Lab Orders",
        label: "Bill Lab Orders",
      },
      {
        value: "Radiology Result",
        label: "Radiology Result",
      },
    ],
  },

  {
    value: "Admin",
    label: "Admin",
    children: [
      {
        value: "Admin Bands",
        label: "Bands",
      },
      {
        value: "Admin Employees",
        label: "Employees",
      },
      {
        value: "Admin Location",
        label: "Location",
      },
    ],
  },

  {
    value: "Inventory",
    label: "Inventory",
    children: [
      {
        value: "Inventory Bill Client",
        label: "Bill Client",
      },
      {
        value: "Inventory Bill Prescription Sent",
        label: "Bill Prescription Sent",
      },
      {
        value: "Inventory Dispensary",
        label: "Dispensary",
      },
      {
        value: "Inventory Store Inventory",
        label: "Store Inventory ",
      },
      {
        value: "Inventory Product Entry",
        label: "Product Entry ",
      },
      {
        value: "Inventory Issue Out",
        label: "Issue Out ",
      },
    ],
  },

  {
    value: "Epidemiology",
    label: "Epidemiology",
    children: [
      {
        value: "Epidemiology Case Definition",
        label: "Case Definition",
      },

      {
        value: "Epidemiology Signals",
        label: "Signals",
      },

      {
        value: "Epidemiology Map",
        label: "Map",
      },
    ],
  },

  {
    value: "Ward",
    label: "Ward",
    children: [
      {
        value: "Ward Admission",
        label: "Admission",
      },
      {
        value: "Ward Discharge",
        label: "Discharge",
      },
      {
        value: "Ward In-Patient",
        label: "In-Patient",
      },
    ],
  },

  {
    value: "Theatre",
    label: "Theatre",
    children: [
      {
        value: "Theatre Appointment",
        label: "Appointment",
      },
      {
        value: "Theatre Check In",
        label: "Check In",
      },
      {
        value: "Theatre Bill Client",
        label: "Bill Client",
      },
      {
        value: "Theatre Bill Order Sent",
        label: "Bill Order Sent",
      },
    ],
  },

  {
    value: "Managed Care",
    label: "Managed Care",
    children: [
      {
        label: "Policy",
        value: "Managed Care Policy",
      },
      {
        label: "Beneficiary",
        value: "Managed Care Beneficiary",
      },
      {
        label: "Provider",
        value: "Managed Care Provider",
      },
      {
        label: "Corporate",
        value: "Managed Care Corporate",
      },
      {
        label: "Complaints",
        value: "Managed Care Complaints",
      },
      {
        label: "HIA",
        value: "Managed Care HIA",
      },
      {
        label: "Premiums",
        value: "Managed Care Premiums",
      },
      {
        label: "Organization",
        value: "Managed Care Organization",
      },
      {
        label: "Referrals",
        value: "Managed Care Referrals",
      },
      {
        label: "Tarrif",
        value: "Managed Care Tarrif",
      },
      {
        label: "Claims",
        value: "Managed Care Claims",
      },
      {
        label: "Accreditation",
        value: "Managed Care Accreditation",
      },
      {
        label: "Preauthorization",
        value: "Managed Care Preauthorization",
      },
      {
        label: "Report",
        value: "Managed Care Report",
      },
      {
        label: "Check In",
        value: "Managed Care Check In",
      },
      {
        label: "Fund Management",
        value: "Managed Care Fund Management",
      },
      {
        label: "Health Plan",
        value: "Managed Care Health Plan",
      },
      {
        label: "Provider Payment",
        value: "Managed Care Provider Payment",
      },
      {
        label: "Assign Claim",
        value: "Managed Care Assign Claim",
      },
      {
        label: "Vet Claim",
        value: "Managed Care Vet Claim",
      },
      {
        label: "Audit Claim",
        value: "Managed Care Audit Claim",
      },
      {
        label: "Authorization",
        value: "Managed Care Authorization",
      },
      {
        label: "Assign Preauthorization Request",
        value: "Managed Care Assign Preauthorization Request",
      },
      {
        label: "Vet Preauthorization Request",
        value: "Managed Care Vet Preauthorization Request",
      },
      {
        label: "Audit Preauthorization Request",
        value: "Managed Care Audit Preauthorization Request",
      },
      {
        label: "Underwriting",
        value: "Managed Care Underwriting",
      },
      {
        label: "Review",
        value: "Managed Care Review",
      },
    ],
  },

  {
    value: "CRM",
    label: "CRM",
    children: [
      {
        label: "Lead",
        value: "CRM Lead",
        children: [
          {
            label: "Write",
          },
        ],
      },
      {
        label: "Proposal",
        value: "CRM Proposal",
      },
      {
        label: "Deal",
        value: "CRM Deal",
      },
      {
        label: "Invoice",
        value: "CRM Invoice",
      },
      {
        label: "SLA",
        value: "CRM SLA",
      },
      {
        label: "Appointment",
        value: "CRM Appointment",
      },
      {
        label: "Templates",
        value: "CRM Templates",
      },
      {
        label: "Assign Staff",
        value: "CRM Assign Staff",
      },
      {
        label: "Assign Task",
        value: "CRM Assign Task",
      },
      {
        label: "Authorization",
        value: "CRM Authorization",
      },
    ],
  },

  {
    label: "Blood Bank",
    value: "Blood Bank",

    children: [
      {
        label: "Appointment",
        value: "Blood Bank Appointment",
      },
      {
        label: "Lab",
        value: "Blood Bank Lab",
      },
      {
        label: "Inventory",
        value: "Blood Bank Inventory",
      },
    ],
  },

  {
    label: "Referral",
    value: "Referral",

    children: [
      {
        label: "Incoming",
        value: "Referral Incoming",
      },
      {
        label: "Referral Account",
        value: "Referral Referral Account",
      },
      {
        label: "Setting",
        value: "Referral Setting",
      },
    ],
  },

  {
    label: "Commnunication",
    value: "Commnunication",

    children: [
      {
        label: "Email",
        value: "Commnunication Email",
      },
      {
        label: "IVR",
        value: "Commnunication IVR",
      },
      {
        label: "Setting",
        value: "Commnunication SMS",
      },
      {
        label: "USSD",
        value: "Commnunication USSD",
      },
      {
        label: "WhatsApp",
        value: "Commnunication WhatsApp",
      },
      {
        label: "Chats",
        value: "Commnunication Chats",
      },
    ],
  },

  {
    label: "Engagement",
    value: "Engagement",

    children: [
      {
        label: "Channel",
        value: "Engagement Channel",
      },
      {
        label: "Questionnaires",
        value: "Engagement Questionnaires",
      },
      {
        label: "Configuration",
        value: "Engagement Configuration",
      },
      {
        label: "Submissions",
        value: "Engagement Submissions",
      },
    ],
  },

  {
    label: "Immunization",
    value: "Immunization",

    children: [
      {
        label: "Appointment",
        value: "Immunization Appointment",
      },
      {
        label: "Checkin/out",
        value: "Immunization Checkin/out",
      },
      {
        label: "Immunization schedule",
        value: "Immunization Immunization schedule",
      },
      {
        label: "Inventory",
        value: "Immunization Inventory",
      },
      {
        label: "Report",
        value: "Immunization Report",
      },
      {
        label: "Vaccine profile",
        value: "Immunization Vaccine profile",
      },
    ],
  },

  {
    label: "Accounting",
    value: "Accounting",

    children: [
      {
        label: "Account",
        value: "Accounting Account",
      },
      {
        label: "Chart of accounts",
        value: "Accounting Chart of accounts",
      },
      {
        label: "Expenses",
        value: "Accounting Expenses",
      },
      {
        label: "Journal",
        value: "Accounting Journal",
      },
      {
        label: "Payment",
        value: "Accounting Payment",
      },
      {
        label: "Report",
        value: "Accounting Report",
      },
    ],
  },
];
