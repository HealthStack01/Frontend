import {
  bandTypeOptions,

  countriesOptions,
  departmentOptions,
  statesOptions,
  unitsOptions,

  organizationOptions,
  organizationTypeOptions,

  status,
  religion,
  medicalRecords,
  profession,
  localGovt,
  townCity,
  nextOfKin,
  nonHospIndentifiers,
  payInfo,
  assignToCareTeam,
  relationship,


} from '../../utils/data';

enum InputType {
  HIDDEN,
  TEXT,
  SELECT,
  CHECKBOX,
}

const BandSchema = [
  {
    name: 'S/N',
    key: '_id',
    description: 'Enter name of band',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  {
    name: 'Name of Band',
    key: 'name',
    description: 'Enter name of band',
    selector: (row) => row.name,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  {
    name: 'Band Type',
    key: 'bandType',
    description: 'Enter name of band',
    selector: (row) => row.bandType,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: bandTypeOptions,
  },
  {
    name: 'Description of Band',
    key: 'description',
    description: 'Enter description of band',
    selector: (row) => row.description,
    sortable: true,
    required: false,
    inputType: InputType.TEXT,
  },
];


const clientFormData = [
  {
    name: 'ID',
    key: '_id',
    // description: 'Enter client name',
    selector: (row) => row._id && row._id.substring(0, 7),
    sortable: true,
    required: true,
    inputType: InputType.HIDDEN,
  },
  
  {
    name: 'First Name',
    key: 'firstname',
    description: 'First Name',
    selector: (row) => row.firstname,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Midlle Name',
    key: 'middlename',
    description: 'Midlle Name',
    selector: (row) => row.middlename,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Last Name',
    key: 'lastname',
    description: 'Last Name',
    selector: (row) => row.lastname,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Date of Birth',
    key: 'dob',
    description: 'Date of Birth',
    selector: (row) => row.dob,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Gender',
    key: 'gender',
    description: 'Male',
    selector: (row) => row.gender,  
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Marital Status',
    key: 'maritalstatus',
    description: 'Single',
    selector: (row) => row.maritalstatus,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Email',
    key: 'email',
    description: 'johndoe@mail.com',
    selector: (row) => row.email,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Phone Number',
    key: 'phone',
    description: '0806478263',
    selector: (row) => row.phone,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Residential Address',
    key: 'residentialaddress',
    description: 'Ozumba Mbadiwe',
    selector: (row) => row.residentialaddress,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Town',
    key: 'town',
    description: 'Ikate Elegushi',
    selector: (row) => row.town,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'State',
    key: 'state',
    description: 'Lagos',
    selector: (row) => row.state,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Country',
    key: 'country',
    description: 'Nigeria',
    selector: (row) => row.country,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Next of Kin',
    key: 'nextofkin',
    description: 'Cheif OBA Elegushi',
    selector: (row) => row.nextofkin,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Next of kin Phone',
    key: 'nextofkinphone',
    description: '0806478263',
    selector: (row) => row.nextofkinphone,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
];


const clientFullFormData = {
  _id: [
    {
      name: 'ID',
      key: '_id',
      selector: (row) => row._id && row._id.substring(0, 7),
      sortable: true,
      required: true,
      inputType: InputType.HIDDEN,
    },  
  ],

  names: [
    {
      name: 'First Name',
      key: 'firstname',
      description: 'First Name',
      selector: (row) => row.firstname,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
    
    {
      name: 'Midlle Name',
      key: 'middlename',
      description: 'Midlle Name',
      selector: (row) => row.middlename,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Last Name',
      key: 'lastname',
      description: 'Last Name',
      selector: (row) => row.lastname,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
  ],

  biodata: [
    {
      name: 'Date of Birth',
      key: 'dob',
      description: 'Date of Birth',
      selector: (row) => row.dob,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Gender',
      key: 'gender',
      description: 'Male',
      selector: (row) => row.gender,  
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
    
    {
      name: 'Marital Status',
      key: 'maritalstatus',
      description: 'Single',
      selector: (row) => row.maritalstatus,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: status,
    },
        
    {
      name: 'Religion',
      key: 'religion',
      description: 'Single',
      selector: (row) => row.religion,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: religion,
    },

    {
      name: 'Medical Records',
      key: 'medicalRecords',
      description: 'Single',
      selector: (row) => row.medicalRecords,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: medicalRecords,
    },

    {
      name: 'Profession',
      key: 'profession',
      description: 'Single',
      selector: (row) => row.profession,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: profession,
    },

    {
      name: 'Phone Number',
      key: 'phone',
      description: '0806478263',
      selector: (row) => row.phone,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
    
    // {
    //   name: 'Phone Number (Optional)',
    //   key: 'phoneOptional',
    //   description: '0806478263',
    //   selector: (row) => row.phone,
    //   sortable: true,
    //   required: true,
    //   inputType: InputType.TEXT,
    // },
    
    {
      name: 'Email',
      key: 'email',
      description: 'johndoe@mail.com',
      selector: (row) => row.email,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
  ],

  address: [
    {
      name: 'Country',
      key: 'country',
      description: 'Nigeria',
      selector: (row) => row.country,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: countriesOptions
    },

    {
      name: 'State',
      key: 'state',
      description: 'Lagos',
      selector: (row) => row.state,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: statesOptions
    },
    
    {
      name: 'Local Government',
      key: 'localgovernment',
      description: 'Kosofe',
      selector: (row) => row.localgovernment,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: localGovt,
    },

    {
      name: 'Town/City',
      key: 'town',
      description: 'Ikate Elegushi',
      selector: (row) => row.town,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: townCity
    },

    {
      name: 'Neighbourhood',
      key: 'neighbourhood',
      description: 'Apete Arola',
      selector: (row) => row.neighbourhood,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Residential Address',
      key: 'residentialaddress',
      description: 'Ozumba Mbadiwe',
      selector: (row) => row.residentialaddress,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
    
  ],

  otherDetails: [
    {
      name: 'Medical Data',
      key: 'medicaldata',
      description: 'Enter your Medical Data line 1 here',
      selector: (row) => row.medicaldata,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

  {
    name: 'Tags',
    key: 'tags',
    description: 'Enter your Tag',
    selector: (row) => row.tags,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Other Bio-data',
    key: 'otherbiodata',
    description: 'Enter your Medical Data line 1 here',
    selector: (row) => row.otherbiodata,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },

  {
    name: 'Next of Kin',
    key: 'nextofkin',
    description: 'Cheif OBA Elegushi',
    selector: (row) => row.nextofkin,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
    options: nextOfKin,
  },
  
  {
    name: 'Non Hospital Indetifiers',
    key: 'nonhospitalindetifiers',
    description: 'Cheif OBA Elegushi',
    selector: (row) => row.nonhospitalindetifiers,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: nonHospIndentifiers,
  },

  {
    name: 'Payment Information',
    key: 'paymentinformation',
    description: 'Cheif OBA Elegushi',
    selector: (row) => row.paymentinformation,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: payInfo,    
  },

  {
    name: 'Assignt to Care Team',
    key: 'assignttocareteam',
    description: 'Cheif OBA Elegushi',
    selector: (row) => row.assignttocareteam,
    sortable: true,
    required: true,
    inputType: InputType.SELECT,
    options: assignToCareTeam,
  },

  ],

  nextOfKin: [      
    {
      name: 'Next of Kin',
      key: 'nextofkin',
      description: 'Enter next of kin full name here',
      selector: (row) => row.nextofkin,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Next of kin Phone',
      key: 'nextofkinphone',
      description: '234 000 000 0000',
      selector: (row) => row.nextofkinphone,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Next of kin Email',
      key: 'nextofkinemail',
      description: 'Enter next of kin email here',
      selector: (row) => row.nextofkinemail,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Relationship',
      key: 'relationship',
      description: '0806478263',
      selector: (row) => row.relationship,
      sortable: true,
      required: true,
      inputType: InputType.SELECT,
      options: relationship,
    },
  ],

  nonHospitalIndetifiers: [
    {
      name: 'National ID Number',
      key: 'nin',
      description: 'Enter your National ID Number here',
      selector: (row) => row.nin,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'International Passport Number',
      key: 'passportnumber',
      description:  'Enter your International Passport Number here',
      selector: (row) => row.passportnumber,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Voters Card Number',
      key: 'voterscardnumber',
      description: '0806478263',
      selector: (row) => row.voterscardnumber,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Drivers License Number',
      key: 'driverslicensenumber',
      description: 'Enter your Drivers License Number here',
      selector: (row) => row.driverslicensenumber,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
  ],

  paymentInformation: [
    {
      name: 'Account Holder Name',
      key: 'accountname',
      description: 'Enter account holder name here',
      selector: (row) => row.accountname,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Bank',
      key: 'bank',
      description: 'Enter Bank name here',
      selector: (row) => row.bank,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Account Number',
      key: 'accountnumber',
      description: '000 0000 000',
      selector: (row) => row.accountnumber,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Payment Method',
      key: 'paymentmethod',
      description: 'Payment Method',
      selector: (row) => row.paymentmethod,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
  ],

  medicalData: [
    {
      name: 'Blood Group',
      key: 'bloodgroup',
      description: 'Enter blood group here',
      selector: (row) => row.bloodgroup,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Genotype',
      key: 'genotype',
      description: 'Enter genotype here',
      selector: (row) => row.genotype,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Disabilities',
      key: 'disabilities',
      description: 'Disabilities',
      selector: (row) => row.disabilities,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Allergies',
      key: 'allergies',
      description: 'Allergies',
      selector: (row) => row.allergies,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Co-mobidities',
      key: 'comobidities',
      description: 'Co-mobidities',
      selector: (row) => row.comobidities,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Payment Information',
      key: 'payment',
      description: '0806478263',
      selector: (row) => row.payment,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },

    {
      name: 'Specific details about patients',
      key: 'details',
      description: 'Enter other details about patients',
      selector: (row) => row.details,
      sortable: true,
      required: true,
      inputType: InputType.TEXT,
    },
  ]
};


export { 
  BandSchema, 
  InputType, 
  
  clientFormData,
  clientFullFormData
};
