import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'react-toastify';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';
import { Box, Grid, Button as MuiButton, TextField } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import Input from '../../components/inputs/basic/Input/index';
import { MdCancel } from 'react-icons/md';
import { FacilitySearch } from '../helpers/FacilitySearch';
import { McText } from './text';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import { FaHospital, FaAddressCard, FaUserAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { BsFillTelephoneFill, BsHouseDoorFill } from 'react-icons/bs';
import { MdEmail, MdLocalHospital } from 'react-icons/md';
import { FormsHeaderText } from '../../components/texts';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import { G } from '@react-pdf/renderer';
import { Modal } from 'semantic-ui-react';
import {
  generalData,
  frontdeskData,
  casualityData,
  pharmacyData,
  laboratoryData,
  wardData,
  labourData,
  theatreData,
  additionalData,
  adminData,
  QualityData,
  otherData,
  staffData,
  nonMedStaff,
  specialistData,
} from './accData';

const searchfacility = {};

export default function Accreditation({ standAlone }) {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);
  return (
    <>
      <section className="section remPadTop">
        <AccreditationList
          showModal={showModal}
          setShowModal={setShowModal}
          standAlone={standAlone}
        />
        {showModal === 1 && (
          <ModalBox open={showModal} onClose={() => setShowModal(false)}>
            <OrganizationCreate />
          </ModalBox>
        )}

        {showModal === 2 && (
          <ModalBox open={showModal} onClose={() => setShowModal(false)}>
            <NewOrganizationCreate />
          </ModalBox>
        )}
      </section>
    </>
  );
}

export function AccreditationList({ showModal, setShowModal, standAlone }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const ClientServ = client.service('appointments');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('list');

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    const newClient = {
      selectedClient: {},
      show: 'create',
    };
    await setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    setShowModal(2);
  };

  const handleRow = async (Client) => {
    setShowModal(2);
    await setSelectedAppointment(Client);
    const newClientModule = {
      selectedAppointment: Client,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
  };
  //console.log(state.employeeLocation)

  const handleSearch = (val) => {
    const field = 'firstname';
    //  console.log(val)

    let query = {
      $or: [
        {
          firstname: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          lastname: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          middlename: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          phone: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_type: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_status: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_reason: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          location_type: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          location_name: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_department: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_profession: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_name: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      facility: user.currentEmployee.facilityDetail._id, // || "",
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    };
    if (state.employeeLocation.locationType !== 'Front Desk') {
      query.locationId = state.employeeLocation.locationId;
    }

    ClientServ.find({ query: query })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(' Client  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Error fetching Client, probable network issues ' + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      // if (state.employeeLocation.locationType !== "Front Desk") {
      //   stuff.locationId = state.employeeLocation.locationId;
      // }

      const findClient = await ClientServ.find({ query: stuff });

      await setFacilities(findClient.data);
      console.log(findClient.data);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      handleCalendarClose();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    ClientServ.on('created', (obj) => handleCalendarClose());
    ClientServ.on('updated', (obj) => handleCalendarClose());
    ClientServ.on('patched', (obj) => handleCalendarClose());
    ClientServ.on('removed', (obj) => handleCalendarClose());
    const newClient = {
      selectedClient: {},
      show: 'create',
    };
    setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    return () => {};
  }, []);
  const handleCalendarClose = async () => {
    let query = {
      start_time: {
        $gt: subDays(startDate, 1),
        $lt: addDays(startDate, 1),
      },
      facility: user?.currentEmployee?.facilityDetail?._id,

      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };
    // if (state.employeeLocation.locationType !== "Front Desk") {
    //   query.locationId = state.employeeLocation.locationId;
    // }

    const findClient = await ClientServ.find({ query: query });

    await setFacilities(findClient.data);
  };

  const handleDate = async (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    if (!!startDate) {
      handleCalendarClose();
    } else {
      getFacilities();
    }

    return () => {};
  }, [startDate]);
  //todo: pagination and vertical scroll bar

  const onRowClicked = () => {};

  const mapFacilities = () => {
    let mapped = [];
    facilities.map((facility, i) => {
      mapped.push({
        title: facility?.firstname + ' ' + facility?.lastname,
        start: format(new Date(facility?.start_time), 'yyyy-MM-ddTHH:mm'),
        end: facility?.end_time,
        id: i,
      });
    });
    return mapped;
  };
  const activeStyle = {
    backgroundColor: '#0064CC29',
    border: 'none',
    padding: '0 .8rem',
  };

  const dummyData = [
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'primary',
      grade: 'A',
      status: 'Authorized',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'B',
      status: 'Requested',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Both',
      grade: 'A',
      status: 'Authorized',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Pending',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'primary',
      grade: 'A',
      status: 'Authorized',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Suspended',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Suspended',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Suspended',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Expired',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Suspended',
    },
  ];
  const dummyData2 = [
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Suspended',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Expired',
    },
    {
      sn: '1',
      name_provider: 'St. Nicholas Hospital',
      lga: 'Ajeromi-Ifelodun',
      contact_person: 'Rose mwangi',
      phone_number: '+23480123456789',
      classification: 'Secondary',
      grade: 'A',
      status: 'Suspended',
    },
  ];

  const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case 'authorized':
        return <span style={{ color: '#17935C' }}>{status}</span>;

      case 'requested':
        return <span style={{ color: '#0364FF' }}>{status}</span>;

      case 'expired':
        return <span style={{ color: '#ED0423' }}>{status}</span>;

      case 'pending':
        return <span style={{ color: '#EF9645' }}>{status}</span>;

      case 'suspended':
        return <span style={{ color: '#936A03' }}>{status}</span>;

      default:
        break;
    }
  };

  const preAuthSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'Enter Serial Number',
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Name Provider',
      key: 'name_provider',
      description: 'Name Provider',
      selector: (row) => row.name_provider,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'LGA',
      key: 'lga',
      description: 'LGA',
      selector: (row) => row.lga,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Contact person',
      key: 'contact_person',
      description: 'Contact person',
      selector: (row, i) => row.contact_person,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: 'Phone Number',
      key: 'phone_number',
      description: 'Phone Number',
      selector: (row, i) => row.phone_number,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: 'Classification',
      key: 'classification',
      description: 'Classification',
      selector: (row, i) => row.classification,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: 'Grade',
      key: 'grade',
      description: 'Grade',
      selector: (row, i) => row.grade,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: 'Status',
      key: 'status',
      description: 'Status',
      selector: 'status',
      cell: (row, i) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.status === 'approved',
      style: {
        color: 'red',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status === 'ongoing',
      style: {
        color: 'rgba(0,0,0,.54)',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status === 'pending',
      style: {
        color: 'pink',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.status === 'declined',
      style: {
        color: 'purple',
        backgroundColor: 'green',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
              style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
            >
              <TableMenu>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                  {/* <h2 style={{ margin: "0 10px", fontSize: "0.95rem" }}>
                    Pre-Authorization
                  </h2> */}
                  {/* <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Filter By Date"
                    isClearable
                  /> */}
                  {/* <SwitchButton /> */}
                  {/* <Switch>
                    <button
                      value={value}
                      onClick={() => {
                        setValue('list');
                      }}
                      style={value === 'list' ? activeStyle : {}}
                    >
                      <BsList style={{ fontSize: '1rem' }} />
                    </button>
                    <button
                      value={value}
                      onClick={() => {
                        setValue('grid');
                      }}
                      style={value === 'grid' ? activeStyle : {}}
                    >
                      <BsFillGridFill style={{ fontSize: '1rem' }} />
                    </button>
                  </Switch> */}
                </div>

                {handleCreateNew && (
                  <div>
                    {/* <MuiButton
                      variant="outlined"
                      sx={{
                        widh: 'fit',
                        textTransform: 'capitalize',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginRight: '20px',
                      }}
                      onClick={handleCreateNew}
                    >
                      <FileUploadIcon
                        sx={{ marginRight: '5px' }}
                        fontSize="small"
                      />
                      Upload Provider
                    </MuiButton> */}
                    <MuiButton
                      variant="contained"
                      sx={{
                        widh: 'fit',
                        textTransform: 'capitalize',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                      onClick={handleCreateNew}
                    >
                      <AddCircleOutlineIcon
                        sx={{ marginRight: '5px' }}
                        fontSize="small"
                      />
                      Register Provider
                    </MuiButton>
                  </div>
                )}
              </TableMenu>

              {value === 'list' ? (
                <CustomTable
                  title={''}
                  columns={preAuthSchema}
                  data={standAlone ? dummyData2 : dummyData}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRow}
                  progressPending={loading}
                  //conditionalRowStyles={conditionalRowStyles}
                />
              ) : (
                <CalendarGrid appointments={mapFacilities()} />
              )}
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function NewOrganizationCreate() {
  const { register, handleSubmit } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  const [chosen, setChosen] = useState('');
  const [band, setBand] = useState('');
  const BandsServ = client.service('bands');
  const [providerBand, setProviderBand] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScore, setShowScore] = useState(0);
  const [showArray, setShowArray] = useState([]);
  const [nonMedDiv, setNonMedDiv] = useState([{ selectValue: '' }]);
  const [nonMedDiv2, setNonMedDiv2] = useState([{ selectValue: '' }]);
  const [nonMedDiv3, setNonMedDiv3] = useState([{ selectValue: '' }]);
  const [nonMedDiv4, setNonMedDiv4] = useState([{ selectValue: '' }]);
  const [nonMedDiv5, setNonMedDiv5] = useState([{ selectValue: '' }]);
  const [nonMedDiv6, setNonMedDiv6] = useState([{ selectValue: '' }]);
  const [nonMedDiv7, setNonMedDiv7] = useState([{ selectValue: '' }]);
  const [nonMedDiv8, setNonMedDiv8] = useState([{ selectValue: '' }]);

  //const history = useHistory()
  const { user } = useContext(UserContext); //,setUser

  const handleChangeMode = async (e) => {
    await setBand(e.target.value);
  };
  /* const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
          data.createdby=user._id
          //console.log(data);
          
        facilityServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
                setMessage("Created Organization successfully")
                setSuccess(true)
            })
            .catch((err)=>{
                setMessage("Error creating facility, probable network issues "+ err )
                setError(true)
            })

      }  */
  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType:
            user.currentEmployee.facilityDetail.facilityType === 'HMO'
              ? 'Provider'
              : 'Company',

          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      // console.log(findServices)
      await setProviderBand(findServices.data);
      // console.log(findServices)
    }
  };

  const handleClick = () => {
    //check band selected
    if (band === '') {
      toast({
        message: 'Band not selected, Please select band',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    console.log(chosen);
    let stuff = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: chosen._id,
      relationshiptype: 'managedcare',
      band,
    };
    orgServ
      .create(stuff)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setSuccess(true);
        toast({
          message: 'Organization added succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setBand('');
      })
      .catch((err) => {
        toast({
          message: 'Error adding organization ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    // console.log("starting...")
    getProviderBand();
    return () => {};
  }, []);
  const getSearchfacility = (obj) => {
    setChosen(obj);

    /*  setCategoryName(obj.categoryname)
        setChosen2(obj) */

    if (!obj) {
      //"clear stuff"
      /*  setCategoryName("")
             setChosen2() */
    }
  };

  const selectdata = [
    { value: 'test', label: 'test' },
    { value: 'test2', label: 'test2' },
  ];

  const generalOutlook = [
    { value: 1, label: '1. GENERAL OUTLOOK & INFRASTRUCTURE' },
    { value: 2, label: '2. OPD / FRONT DESK' },
    { value: 3, label: '3. CASUALTY AND EMERGENCY' },
    { value: 4, label: '4. PHARMACY' },
    { value: 5, label: '5. LABORATORY/ RADIOLOGICAL EQUIPMENTS' },
    { value: 6, label: '6. WARD' },
    { value: 7, label: '7. LABOUR ROOM' },
    { value: 8, label: '8. THEATRE' },
    { value: 9, label: '9. ADDITIONAL FACILITIES' },
    { value: 10, label: '10. ADMINISTRATION' },
    { value: 11, label: '11. QUALITY MANAGEMENT PROCESSES' },
    { value: 12, label: '12. OTHER PARAMETERS' },
    { value: 13, label: '13. MEDICAL PERSONNEL /STAFF' },
    { value: 14, label: '14. NON-MEDICAL STAFF' },
    { value: 15, label: '15. SPECIALISTS /FELLOWS' },
  ];

  const handleFormToDisplay = (number) => {
    switch (number) {
      case 1:
        setShowArray(generalData);
        break;
      case 2:
        setShowArray(frontdeskData);
        break;
      case 3:
        setShowArray(casualityData);
        break;
      case 4:
        setShowArray(pharmacyData);
        break;
      case 5:
        setShowArray(laboratoryData);
        break;
      case 6:
        setShowArray(wardData);
        break;
      case 7:
        setShowArray(labourData);
        break;
      case 8:
        setShowArray(theatreData);
        break;
      case 9:
        setShowArray(additionalData);
        break;
      case 10:
        setShowArray(adminData);
        break;
      case 11:
        setShowArray(QualityData);
        break;
      case 12:
        setShowArray(otherData);
        break;
      case 13:
        setShowArray(staffData);
        break;
      case 14:
        setShowArray(nonMedStaff);
        break;
      case 15:
        setShowArray(specialistData);
        break;
      default:
        setShowArray([]);
    }
  };
  return (
    <>
      {currentPage === 1 && (
        <>
          <p style={{ fontWeight: '700' }}>
            HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
          </p>
          <p style={{ fontWeight: '700', marginBottom: '.5rem' }}>
            (PRIVATE SCHEME)
          </p>
          <McText txt={'PERSONAL DATA'} type={'p'} bold={700} />
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12}>
              <Input
                label={'NAME OF MEDICAL DIRECTOR (MD)'}
                register={register('nameofmd')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'MCDN NO'} register={register('mcdnNo')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'MD PHONE NO'} register={register('nmPhoneNo')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={'SPECIALIZATION'}
                register={register('specialization')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'MD EMAIL'} register={register('mdEmail')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={'NAME OF CHIEF MATRON'}
                register={register('nameofChiefMatron')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'TEL'} register={register('chiefMatronTel')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={'NAME OF HMO OFFICER'}
                register={register('nameofHmoOfficer')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={'TEL'} register={register('hmoOfficerTel')} />
            </Grid>
          </Grid>
          <Box display="flex" mt={1}>
            <GlobalCustomButton
              text={'Cancel'}
              onClick={() => setCurrentPage(0)}
              color="secondary"
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              text={'Next'}
              onClick={() => setCurrentPage(2)}
              color="primary"
            />
          </Box>
        </>
      )}
      {currentPage === 2 && (
        <>
          <div
            style={{
              height: '80vh',
              overflowY: 'scroll',
              width: '40vw',
              margin: '0 auto',
            }}
          >
            <p style={{ fontWeight: '700' }}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{ fontWeight: '700', marginBottom: '2rem' }}>
              (PRIVATE SCHEME)
            </p>
            {generalOutlook
              .filter((item) => item.value <= 13)
              .map((item, index) => (
                <>
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '.5rem 0',
                    }}
                  >
                    <FormsHeaderText text={item.label} />
                    <GlobalCustomButton
                      text={'Add'}
                      onClick={() => {
                        setShowScore(index + 1),
                          handleFormToDisplay(item.value);
                      }}
                    />
                  </Box>
                  {showScore === item.value && (
                    <ModalBox open onClose={() => setShowScore(0)} header>
                      <Box
                        sx={{
                          width: '90vw',
                        }}
                      >
                        <Grid container spacing={2} mt={1}>
                          <Grid item xs={12} sm={4}>
                            <FormsHeaderText text="FINDINGS" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <FormsHeaderText text="INSPECTION PARAMETERS " />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            sx={{ textAlign: 'center' }}
                          >
                            <FormsHeaderText text="IF PRESENT, THICK" />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <FormsHeaderText text="1 = Low, 5 = High" />
                          </Grid>
                        </Grid>
                        {showArray.map((item, index) => (
                          <>
                            <Grid container spacing={2} my={1} key={index}>
                              <Grid item xs={12} sm={4}>
                                <Input value={item.finding} disabled />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Input value={item.parameter} disabled />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={2}
                                sx={{ textAlign: 'center' }}
                              >
                                <input type="checkbox" />
                              </Grid>
                              <Grid item xs={12} sm={2}>
                                <Input label={'Score'} />
                              </Grid>
                            </Grid>
                          </>
                        ))}
                        <GlobalCustomButton
                          text={'Save'}
                          onClick={() => {
                            setShowScore(0), toast.success('Saved');
                          }}
                        />
                      </Box>
                    </ModalBox>
                  )}
                </>
              ))}
            <GlobalCustomButton
              text={'Back'}
              onClick={() => setCurrentPage(1)}
              color="secondary"
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              text={'Next'}
              onClick={() => setCurrentPage(3)}
            />
          </div>
        </>
      )}
      {currentPage === 3 && (
        <>
          <div
            style={{
              height: 'auto',
              overflowY: 'scroll',
              width: '40vw',
              margin: '0 auto',
            }}
          >
            <p style={{ fontWeight: '700' }}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{ fontWeight: '700', marginBottom: '2rem' }}>
              (PRIVATE SCHEME)
            </p>

            {generalOutlook
              .filter((item) => item.value > 13)
              .map((item) => (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '.5rem 0',
                    }}
                  >
                    <FormsHeaderText text={item.label} />
                    <GlobalCustomButton
                      text={'Add'}
                      onClick={() => {
                        setShowScore(item.value),
                          handleFormToDisplay(item.value);
                      }}
                    />
                  </Box>

                  {showScore === item.value && (
                    <ModalBox open onClose={() => setShowScore(0)} header>
                      <Box
                        sx={{
                          width: '90vw',
                        }}
                      >
                        <Grid container spacing={2} mt={1}>
                          <Grid item xs={12} sm={4}>
                            <FormsHeaderText text="FINDINGS" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <FormsHeaderText text="INSPECTION PARAMETERS " />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            sx={{ textAlign: 'center' }}
                          >
                            <FormsHeaderText text="IF PRESENT, THICK" />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <FormsHeaderText text="1 = Low, 5 = High" />
                          </Grid>
                        </Grid>
                        {showArray.map((item, index) => (
                          <>
                            <Grid container spacing={2} my={1} key={index}>
                              <Grid item xs={12} sm={4}>
                                <Input value={item.finding} disabled />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Input value={item.parameter} disabled />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={2}
                                sx={{
                                  textAlign: 'center',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <Box sx={{ marginRight: '.8rem' }}>
                                  <input type="radio" />
                                  <label>Yes</label>
                                </Box>
                                <Box>
                                  <input type="radio" />
                                  <label>No</label>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={2}>
                                <Input label={'Number'} />
                              </Grid>
                            </Grid>
                          </>
                        ))}

                        {/* -------------------------------------- */}
                        {showScore === 15 && (
                          <>
                            <Grid container spacing={3} mt={2}>
                              <Grid item xs={12} sm={6} md={12}>
                                <McText
                                  txt={'FOR OFFICIAL USE'}
                                  type={'p'}
                                  bold={700}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3} my={1}>
                              <Grid item xs={12} sm={6} md={6}>
                                <Input
                                  label={'REVIEW OF CREDEINTIALS'}
                                  register={register('name')}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} mt={1.5}>
                                <BasicDatePicker
                                  label={'DATE OF REVIEW'}
                                  register={register('date')}
                                />
                              </Grid>
                            </Grid>

                            <Grid container spacing={3} mb={1}>
                              <Grid item xs={12} sm={6} md={12}>
                                <McText
                                  txt={'RECOMMENDATION SUMMARY'}
                                  type={'p'}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={6}>
                                <Input
                                  label={'A APRROVE'}
                                  register={register('name')}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <Input
                                  label={'B. DENY OUTRIGHTLY'}
                                  register={register('name')}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={6}>
                                <McText
                                  txt={'C. GIVE PROBATION FOR'}
                                  type={'p'}
                                />
                                <CustomSelect
                                  options={selectdata}
                                  register={register('inspectionParameters')}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} mt={1.5}>
                                <BasicDatePicker
                                  label={'DATE'}
                                  register={register('date')}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={3} mb={1}>
                              <Grid item xs={12} sm={6} md={6}>
                                <McText txt={'SIGNATURE'} type={'p'} />
                                <div
                                  style={{
                                    width: '100%',
                                    height: '40px',
                                    border: '1px solid #D2D2D2',
                                    borderRadius: '5px',
                                    padding: '.8rem',
                                  }}
                                ></div>
                              </Grid>
                            </Grid>
                          </>
                        )}
                        <GlobalCustomButton text={'Save'} onClick={() => {}} />
                      </Box>
                    </ModalBox>
                  )}
                </>
              ))}
            <GlobalCustomButton
              text={'Back'}
              onClick={() => setCurrentPage(2)}
              color={'secondary'}
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              text={'Next'}
              onClick={() => setCurrentPage(4)}
            />
          </div>
        </>
      )}
      {currentPage === 4 && (
        <>
          <div
            style={{
              height: '80vh',
              overflowY: 'scroll',
              width: '80vw',
              margin: '0 auto',
            }}
          >
            <p style={{ fontWeight: '700' }}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{ fontWeight: '700', marginBottom: '2rem' }}>
              (PRIVATE SCHEME)
            </p>
            <McText
              txt={
                'GENERAL OBSERVATIONS BY HMO REPRESENTATIVE / ASSESSMENT OFFICER'
              }
              type={'p'}
              bold={700}
            />
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={6} md={12}>
                <Input
                  label={'Observations'}
                  register={register('observations')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input label={'Name'} register={register('name')} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input
                  label={'Designation'}
                  register={register('designation')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input label={'Date'} register={register('date')} />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label={'Provider Representative Name'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label={'Designation'}
                  register={register('designation')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input label={'Phone'} register={register('phone')} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <BasicDatePicker label={'Date'} register={register('date')} />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input register={register('signature')} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <McText txt={'FOR OFFICIAL USE'} type={'p'} bold={700} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <Input
                  label={`Med. Officer's Review of Credentials`}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={'Name of Reviewing Officer'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <BasicDatePicker
                  label={'Date of Review'}
                  register={register('date')}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <McText txt={'RECOMMENDATION SUMMARY'} type={'p'} bold={700} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={6}>
                <Input label={'A Approve'} register={register('name')} />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={'B Deny Outrightly'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={'C Give Probation For'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <BasicDatePicker label={'Date'} register={register('date')} />
              </Grid>
            </Grid>
            <Grid container spacing={3} my={1}>
              <Grid item xs={12} sm={4} md={6}>
                <McText txt={'Signature'} type={'p'} />
                <Input register={register('signature')} />
              </Grid>
            </Grid>
            <GlobalCustomButton
              text={'Cancel'}
              onClick={() => setCurrentPage(0)}
              color={'error'}
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              type={'submit'}
              text={'Submit'}
              onClick={() => handleClick()}
              color={'primary'}
            />
          </div>
        </>
      )}

      {/* <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Button label="Add" type="submit" onClick={handleClick} />
        </Grid>
      </Grid> */}
    </>
  );
}
