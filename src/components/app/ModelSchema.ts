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
    name: 'First Name',
    key: 'firstName',
    description: 'First Name',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Midlle Name',
    key: 'middleName',
    description: 'Midlle Name',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Last Name',
    key: 'lastName',
    description: 'Last Name',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Date of Birth',
    key: 'dateOfBirth',
    description: 'Date of Birth',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Gender',
    key: 'gender',
    description: 'Male',
    selector: (row) => row.description,  
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Marital Status',
    key: 'maritalStatus',
    description: 'Single',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Email',
    key: 'email',
    description: 'johndoe@mail.com',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Phone Number',
    key: 'phoneNumber',
    description: '0806478263',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Residential Address',
    key: 'residentialAddress',
    description: 'Ozumba Mbadiwe',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Town',
    key: 'town',
    description: 'Ikate Elegushi',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'State',
    key: 'state',
    description: 'Lagos',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Country',
    key: 'country',
    description: 'Nigeria',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Next of Kin',
    key: 'nextOfKin',
    description: 'Cheif OBA Elegushi',
    selector: (row) => row.description,
    sortable: true,
    required: true,
    inputType: InputType.TEXT,
  },
  
  {
    name: 'Next of kin Phone',
    key: 'nextOfKinPhone',
    description: '0806478263',
    selector: (row) => row.description,
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
