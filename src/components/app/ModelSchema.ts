enum InputType {
  HIDDEN,
  TEXT,
  SELECT,
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


export { 
  BandSchema, 
  InputType, 
  
  clientFormData
};
