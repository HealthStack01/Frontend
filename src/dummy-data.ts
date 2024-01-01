export const modules = {
  first: [
    "Accounting",
    "Admin",
    "Blood Bank",
    "Client",
    "Clinic",
    "Communication",
    "Continous Mediscal Education",
    "Documentation",
    "Epidemiology",
    "Finance",
    "Immunization",
  ],
  second: [
    "Inventory",
    "Laboratory",
    "Managed Care",
    "Patient Portal",
    "Pharmacy",
    "Radiology",
    "Report",
    "Research and Data Exhange",
    "Telemedicine",
    "Theatre",
    "User Profile",
  ],
};

export const organizationTypeOptions: string[] = [
  "Hospital",
  "Research Institute",
];
export const organizationOptions: string[] = [
  "Private",
  "Public",
  "Government",
];

export const countriesOptions: string[] = [
  "Nigeria",
  "France",
  "England",
  "Cameron",
];
export const statesOptions: string[] = ["Lagos", "Oyo", "Ogun", "Paris"];
export const departmentOptions: string[] = [
  "Frontdesk",
  "Accpunting",
  "Clinic",
  "Pharmacy",
];
export const unitsOptions: string[] = ["Unit 1", "Unit 1", "Unit 1", "Unit 1"];
export const bandTypeOptions: string[] = [
  "Provider",
  "Company",
  "Patient",
  "Plan",
  "Corporate Sponsor",
];

export const locationTypeOptions:string[] =["Front Desk","Clinic","Ward", "Store", "Laboratory", "Finance","Theatre","Pharmacy", "Radiology","Managed Care", "Branch" ]


export const status: string[] = ["Single", "Married", "Divorced"];
export const religion: string[] = ["Christianity", "Islam", "Rather not say"];
export const medicalRecords = ["Record 1", "Record 2", "Record 3"];
export const profession = ["Profession 1", "Profession  2", "Profession 3"];
export const localGovt = [
  "Ibadan S/W",
  "Lagos Central",
  "Abuja Central",
  "Kaduna Central",
];
export const townCity = ["Ikeja", "Epe", "Ofa", "Ibadan"];
export const nextOfKin = [
  "Wale Romi",
  "Blond Games",
  "Williams Tosin",
  "Wale Romi",
];
export const nonHospIndentifiers = ["CD120", "CD122", "CD120", "CD130"];
export const payInfo = ["Paid", "Out of cash"];
export const assignToCareTeam = ["Yes", "No"];
export const relationship = ["Parent(s)", "Sibling(s)", "Spouse", "Friend(s)"];

interface CreateOrganizationProps {
  type?: string;
  label?: string;
  name?: string;
  children?: {
    type?: string;
    label: string;
    name: string;
    children: boolean;
    option: boolean;
    options?: string[];
  }[];
  options?: string[];
}

export const createOrganizationData: CreateOrganizationProps[] = [
  {
    type: "text",
    label: "Name of Organization",
    name: "nameOfOrganzation",
  },
  {
    type: "text",
    label: "CAC Number",
    name: "cacNumber",
  },
  {
    label: "Organization Country",
    name: "organizationCountry",
    options: countriesOptions,
  },
  {
    type: "text",
    label: "State",
    name: "state",
  },

  {
    type: "text",
    label: "LGA",
    name: "lga",
  },
  {
    type: "text",
    label: "City/Town",
    name: "citytown",
  },
  {
    type: "text",
    label: "Registered Address",
    name: "registeredAddress",
  },
  {
    type: "tel",
    label: "Contact Phone Number",
    name: "contactPhoneNumber",
  },
  {
    type: "email",
    label: "Organization Email",
    name: "organizationEmail",
  },
  {
    type: "text",
    label: "Organization CEO",
    name: "organizationCEO",
  },
  {
    label: "Organization Type",
    name: "organizationType",
    options: organizationTypeOptions,
  },
  {
    label: "Organization Category",
    name: "organizationCategory",
    options: organizationOptions,
  },
];
