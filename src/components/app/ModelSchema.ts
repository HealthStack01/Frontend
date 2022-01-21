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

export { BandSchema, InputType };
