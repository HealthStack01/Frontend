/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { GridBox } from '../app/styles';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList,BsCheckCircle,BsClipboardCheck,BsClipboardData} from 'react-icons/bs';
import {FaRegTimesCircle} from 'react-icons/fa'
import {BiPencil} from 'react-icons/bi'
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { Radio, Grid, FormControlLabel, RadioGroup } from '@mui/material';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import { McText } from './text';
import Input from '../../components/inputs/basic/Input/index';
import ToggleButton from '../../components/toggleButton';
import RadioButton from '../../components/inputs/basic/Radio';
import BasicDatePicker from '../../components/inputs/Date';
import BasicDateTimePicker from '../../components/inputs/DateTime';
import CustomSelect from '../../components/inputs/basic/Select';
import Textarea from '../../components/inputs/basic/Textarea';
import { MdCancel, MdAddCircle } from 'react-icons/md';
import PatientProfile from '../Client/PatientProfile';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import Claims, { ClaimsList } from './Claims';
import ReferralCheckIn from '../Appointment/referralWorkflow';

// eslint-disable-next-line
const searchfacility = {};

export default function GeneralAppointments() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);

  return (
    <section className="section remPadTop">
      <ReferralList showModal={showModal} setShowModal={setShowModal} />
      {showModal === 1 && (
        <ModalBox open={showModal} onClose={() => setShowModal(0)} width="80vw">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <PatientProfile />
            </Grid>
            <Grid item xs={8}>
              <ReferralCreate
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </Grid>
          </Grid>
        </ModalBox>
      )}
      {showModal === 2 && (
        <ModalBox open={showModal} onClose={() => setShowModal(0)}>
          <ReferralDetails />
        </ModalBox>
      )}
    </section>
  );
}

export function ReferralCreate({ showModal, setShowModal }) {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [message, setMessage] = useState('');
  const [clientId, setClientId] = useState();
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [type, setType] = useState();
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service('appointments');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  // const [appointment_reason,setAppointment_reason]= useState()
  const [appointment_status, setAppointment_status] = useState('');
  const [appointment_type, setAppointment_type] = useState('');
  const [billingModal, setBillingModal] = useState(false);

  const [chosen, setChosen] = useState();
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();
  const appClass = ['On-site', 'Teleconsultation', 'Home Visit'];

  let appointee; //  =state.ClientModule.selectedClient
  /*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
  const handleChangeType = async (e) => {
    await setAppointment_type(e.target.value);
  };

  const handleChangeStatus = async (e) => {
    await setAppointment_status(e.target.value);
  };

  const getSearchfacility = (obj) => {
    setClientId(obj._id);
    setChosen(obj);
    //handleRow(obj)
    if (!obj) {
      //"clear stuff"
      setClientId();
      setChosen();
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility1 = (obj) => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };
  const getSearchfacility2 = (obj) => {
    setPractionerId(obj._id);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setPractionerId();
      setChosen2();
    }
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setSuccess(false);
    setShowModal(false),
      setState((prevstate) => ({
        ...prevstate,
        AppointmentModule: {
          selectedAppointment: {},
          show: 'list',
        },
      }));

    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    data.locationId = locationId; //state.ClinicModule.selectedClinic._id
    data.practitionerId = practionerId;
    data.appointment_type = appointment_type;
    // data.appointment_reason=appointment_reason
    data.appointment_status = appointment_status;
    data.clientId = clientId;
    data.firstname = chosen.firstname;
    data.middlename = chosen.middlename;
    data.lastname = chosen.lastname;
    data.dob = chosen.dob;
    data.gender = chosen.gender;
    data.phone = chosen.phone;
    data.email = chosen.email;
    data.practitioner_name = chosen2.firstname + ' ' + chosen2.lastname;
    data.practitioner_profession = chosen2.profession;
    data.practitioner_department = chosen2.department;
    data.location_name = chosen1.name;
    data.location_type = chosen1.locationType;
    data.actions = [
      {
        action: appointment_status,
        actor: user.currentEmployee._id,
      },
    ];
    console.log(data);

    ClientServ.create(data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        setAppointment_type('');
        setAppointment_status('');
        setClientId('');
        setLocationId('');
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast({
          message:
            'Appointment created succesfully, Kindly bill patient if required',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch((err) => {
        toast({
          message: 'Error creating Appointment ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    getSearchfacility(state.ClientModule.selectedClient);

    /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
    return () => {};
  }, [state.ClientModule.selectedClient]);

  /*   const showBilling = () =>{
        setBillingModal(true)
       //history.push('/app/finance/billservice')
        }
        const  handlecloseModal1 = () =>{
            setBillingModal(false)
            }


            const handleRow= async(Client)=>{
              //  await setSelectedClient(Client)
                const    newClientModule={
                    selectedClient:Client,
                    show :'detail'
                }
               await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
            } */
  const CustomSelectData = [
    {
      label: 'Today',
      value: 'today',
    },
  ];

  return (
    <>
      <div
        className="card "
        style={{ height: '100%', width: '100%', overflowX: 'hidden' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ModalHeader text={'Referral'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MdCancel
                onClick={() => {
                  setShowModal(false),
                    setState((prevstate) => ({
                      ...prevstate,
                      AppointmentModule: {
                        selectedAppointment: {},
                        show: 'list',
                      },
                    }));
                }}
                style={{
                  fontSize: '2rem',
                  color: 'crimson',
                  cursor: 'pointer',
                  float: 'right',
                }}
              />
            </Grid>
          </Grid>
         <GridBox>
         <Input
              name="healthCareProvider"
              label="Health Care Provider"
              type="text"
              
            />
            <Input name="preAuthId" label="Pre-auth ID" type="text" />
           
            <Input name="claimId" label="Claim ID" type="text" />

         </GridBox>
            
            <div style={{display:"flex", alignItems:"center", gap:"5rem", marginBottom:"0.6rem"}}>
            <BasicDateTimePicker name="dateOfRequest" label="Date of Request" />
            
            <div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="emergency"
                name="emergency"
                sx={{
                  display: 'flex !important',
                  justifyContent: 'space-between !',
                  flexDirection: 'row !important',
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </div>
            </div>


          <div>
            <McText
              txt={'Clinical Information'}
              color={'#0064CC'}
              type={'p'}
              bold={'700'}
              size={'18px'}
            />
          </div>
          <GridBox>
          <button
              style={{
                float: 'right',
                backgroundColor: '#ECF3FF',
                color: '#0064CC',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <MdAddCircle
                style={{
                  marginRight: '5px',
                }}
              />
              Add complaints
            </button>
              <CustomSelect
                name="complaints"
                label="Complaints"
                options={CustomSelectData}
              />
          
             
          </GridBox>

         
            <div>
              <McText
                txt={'Clinic Findings'}
                color={'#0064CC'}
                type={'p'}
                bold={'700'}
                size={'18px'}
              />
            </div>
         

          <GridBox>
        
          <CustomSelect
              name="provisionalDiagnosis"
              label="Provisional Diagnosis"
              options={CustomSelectData}
            />
            <button
              style={{
                float: 'left',
                backgroundColor: '#ECF3FF',
                color: '#0064CC',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <MdAddCircle
                style={{
                  marginRight: '5px',
                }}
              />
              Add Diagnosis
            </button>

            <CustomSelect
              name="plannedDiagnosis"
              label="Planned Procedure"
              options={CustomSelectData}
            />

            <button
              style={{
                float: 'left',
                backgroundColor: '#ECF3FF',
                color: '#0064CC',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <MdAddCircle
                style={{
                  marginRight: '5px',
                }}
              />
              Add Procedure
            </button>

            <CustomSelect
              name="plannedService"
              label="Planned Service"
              options={CustomSelectData}
            />

            <button
              style={{
                float: 'left',
                backgroundColor: '#ECF3FF',
                color: '#0064CC',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <MdAddCircle
                style={{
                  marginRight: '5px',
                }}
              />
              Add Service
            </button>
          </GridBox>
          <div style={{display:"flex", flexDirection:"column", gap:"0.6rem", marginBottom:"10px"}}>
          
              <Input
                name="physicianName"
                label="Physician Name"
                type="text"
               
              />
              <Textarea
                placeholder="Type your message here"
                name="reason"
                type="text"
                label="Reason for Request"
              />
          </div>
          <GlobalCustomButton
              
              type="submit"
            >
               Submit
               </GlobalCustomButton>  
        </form>
      </div>
    </>
  );
}

export function ReferralList({ showModal, setShowModal }) {
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
    setShowModal(1);
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
      facility: user.currentEmployee.facilityDetail._id,

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
      date: '27/10/21',
      patients_name: 'Tejiri Tabor',
      policy_id: '234.75.43.01',
      referral_code: '324234 - AC',
      referral_provider: 'Creek Hospital',
      destination_provider: 'Creek Hospital',
      status: 'Approved',
      reason_for_request: 'Lorem ipsum dolor',
    },
    {
      date: '27/10/21',
      patients_name: 'Tejiri Tabor',
      policy_id: '234.75.43.01',
      referral_code: '324234 - AC',
      referral_provider: 'Creek Hospital',
      destination_provider: 'Creek Hospital',
      status: 'Approved',
      reason_for_request: 'Lorem ipsum dolor',
    },
    {
      date: '27/10/21',
      patients_name: 'Tejiri Tabor',
      policy_id: '234.75.43.01',
      referral_code: '324234 - AC',
      referral_provider: 'Creek Hospital',
      destination_provider: 'Creek Hospital',
      status: 'Approved',
      reason_for_request: 'Lorem ipsum dolor',
    },

    {
      date: '27/10/21',
      patients_name: 'Tejiri Tabor',
      policy_id: '234.75.43.01',
      referral_code: '324234 - AC',
      referral_provider: 'Creek Hospital',
      destination_provider: 'Creek Hospital',
      status: 'Approved',
      reason_for_request: 'Lorem ipsum dolor',
    },
    {
      date: '27/10/21',
      patients_name: 'Tejiri Tabor',
      policy_id: '234.75.43.01',
      referral_code: '324234 - AC',
      referral_provider: 'Creek Hospital',
      destination_provider: 'Creek Hospital',
      status: 'Approved',
      reason_for_request: 'Lorem ipsum dolor',
    },
    {
      date: '27/10/21',
      patients_name: 'Tejiri Tabor',
      policy_id: '234.75.43.01',
      referral_code: '324234 - AC',
      referral_provider: 'Creek Hospital',
      destination_provider: 'Creek Hospital',
      status: 'Approved',
      reason_for_request: 'Lorem ipsum dolor',
    },
    {
      date: '27/10/21',
      patients_name: 'Tejiri Tabor',
      policy_id: '234.75.43.01',
      referral_code: '324234 - AC',
      referral_provider: 'Creek Hospital',
      destination_provider: 'Creek Hospital',
      status: 'Approved',
      reason_for_request: 'Lorem ipsum dolor',
    },
    {
      date: '27/10/21',
      patients_name: 'Tejiri Tabor',
      policy_id: '234.75.43.01',
      referral_code: '324234 - AC',
      referral_provider: 'Creek Hospital',
      destination_provider: 'Creek Hospital',
      status: 'Approved',
      reason_for_request: 'Lorem ipsum dolor',
    },
  ];

  const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case 'active':
        return <span style={{ color: '#17935C' }}>{status}</span>;

      case 'inactive':
        return <span style={{ color: '#0364FF' }}>{status}</span>;

      default:
        break;
    }
  };

  const ReferralSchema = [
    {
      name: 'Date',
      key: 'date',
      description: 'Enter date',
      selector: (row) => row.date,
      sortable: true,
      required: true,
      inputType: 'DATE',
    },
    {
      name: 'Patients Name',
      key: 'patients_name',
      description: 'Enter patients name',
      selector: (row) => row.patients_name,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Policy ID',
      key: 'policy_id',
      description: 'Enter policy ID',
      selector: (row) => row.policy_id,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Referral Code',
      key: 'referral_code',
      description: 'Enter referral code',
      selector: (row) => row.referral_code,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Referral Provider',
      key: 'referral_provider',
      description: 'Enter referral provider',
      selector: (row, i) => row.referral_provider,
      sortable: true,
      required: true,
      inputType: 'DATE',
    },
    {
      name: 'Destination Provider',
      key: 'destination_provider',
      description: 'Enter destination provider',
      selector: (row, i) => row.destination_provider,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Status',
      key: 'status',
      description: 'Enter your status',
      selector: (row, i) => row.status,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Reason for Request',
      key: 'reason_for_request',
      description: 'Enter the reason for the request',
      selector: (row, i) => row.reason_for_request,
      sortable: true,
      required: true,
      inputType: 'TEXT',
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
                  <h2 style={{ margin: '0 10px', fontSize: '0.95rem' }}>
                    Referral
                  </h2>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Filter By Date"
                    isClearable
                  />
                  {/* <SwitchButton /> */}
                  <Switch>
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
                  </Switch>
                </div>

                {handleCreateNew && (
                  <GlobalCustomButton
                  onClick={handleCreateNew}
                >
            <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
            Add New Referral
                      </GlobalCustomButton>
                )}
              </TableMenu>
              {value === 'list' ? (
                <CustomTable
                  title={''}
                  columns={ReferralSchema}
                  data={dummyData}
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
export function ReferralDetails() {
  const [deny, setDeny] = useState(false);
  const [approve, setApprove] = useState(false);
  const [edit, setEdit] = useState(false);
  const [claim, setClaim] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  return (
    <>
      <div
        // className="card"
        style={{
          height: '80%',
          overflow: 'hidden',
          width: '80vw',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent:"space-between", alignItems:"center" }}>
        <div>
        <ModalHeader text={'Referral Details - 13322BA'} />
        <McText txt={'Patient Details'} />
        </div>
        <div style={{ display: 'flex', gap:"1rem"}}>
        <GlobalCustomButton
                 onClick={() => setClaim(true)}

                >
                  <BsClipboardData style={{marginRight: "5px",fontSize:"16px"}}/>
            Claims
            
                      </GlobalCustomButton>
                      <GlobalCustomButton
                 onClick={() => setCheckIn(true)}
                >
                  <BsClipboardCheck style={{marginRight: "5px",fontSize:"16px"}}/>
            Appointment
            
                      </GlobalCustomButton>
        <GlobalCustomButton
                 onClick={() => setApprove(true)}
                >
                  <BsCheckCircle style={{marginRight: "5px",fontSize:"16px"}}/>
            Approve
            
                      </GlobalCustomButton>
                      <GlobalCustomButton
                      color="error"
                 onClick={() => setDeny(true)}
                >
                  <FaRegTimesCircle style={{marginRight: "5px",fontSize:"16px"}}/>
           Decline
            
                      </GlobalCustomButton>
                      <GlobalCustomButton
              variant="contained"
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              // color="warning"
              onClick={() => setEdit(true)}
            >
              <BiPencil style={{marginRight: "5px",fontSize:"16px"}} />
              Edit
            </GlobalCustomButton>
        </div>
        </div>
        <Grid container xs={12} spacing={2} sx={{marginTop:"12px"}}>
        <Grid item xs={4}>
        <div style={{ backgroundColor: '#EBEBEB',display:"flex",height:"100%",flexDirection:"column", marginRight:"0.6rem", alignItems:"flex-start",padding:"15px"}}>
              <div style={{display:"flex",flexDirection:"row"}}>
                <div
                  style={{
                    maxWidth: '100%',
                    height: '100%',
                  }}
                >
                  <img
                    src="/img_avatar.png"
                    alt="avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>Tejiri Tabor</p>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>
                    +2348123456789
                  </p>
                </div>
              </div>
            {/* </Grid>
          </Grid> */}
          {/* <Grid container spacing={2} mt={1} px={2}> */}
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>DOB: 23/06/2022</p>
            </Grid>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Age: 52</p>
            </Grid>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Gender: Male</p>
            </Grid>
          {/* </Grid> */}
          {/* <Grid container spacing={2} px={2}> */}
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>
                Hospital Name: Lagos State Clinic{' '}
              </p>
            </Grid>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>
                Health Plan: Former sector plan
              </p>
            </Grid>
          {/* </Grid> */}
          {/* <Grid container spacing={2} px={2}> */}
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>
                Date of Admission: 23/06/2022
              </p>
            </Grid>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>
                Date of Discharge: 23/06/2022
              </p>
            </Grid>
          {/* </Grid> */}
          {/* <Grid container spacing={2} px={2}> */}
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Capitation: Filed</p>
            </Grid>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Fee of Service: Filed</p>
            </Grid>
          {/* </Grid> */}
        </div>
        </Grid>
        <Grid xs={8}>
        <div
          style={{
            marginTop: '20px',
            border: '1px solid #8F8F8F',
            padding: '1rem',
          }}
        >
         
          <p>Request Sent 08/05/2022 9:45pm</p>
          <Grid container spacing={2} mb={1}>
          <Grid item xs={5}>
          <McText txt={'Clinical Information'} />
              <p style={{ fontWeight: 'bold' }}>Presenting Complaints:</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
              <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Reason for Request:</p>
              <span
                style={{
                  fontWeight: 'bold',
                  backgroundColor: '#ECF3FF',
                  color: '#0364FF',
                  padding: '.3rem',
                }}
              >
                Procedure
              </span>
              <span
                style={{
                  fontWeight: 'bold',
                  backgroundColor: '#ECF3FF',
                  color: '#0364FF',
                  padding: '.3rem',
                }}
              >
                Services
              </span>
            </Grid>
            <Grid item xs={8} sx={{paddingTop:"1rem"}}>
              <p style={{ fontWeight: 'bold' }}>Physician Name:</p>
              <p>Dr. John Doe</p>
              <p>Lagos State Hospital</p>
            </Grid>
            </Grid>
           <Grid item xs={7}>
           <McText txt={'Clinical Findings'} />
              <p style={{ fontWeight: 'bold' }}>Provisional Diagonosis:</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>

              <p style={{ fontWeight: 'bold' }}>
                Planned Procedures / Services Requiring Authorization:
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
              <p style={{ fontWeight: 'bold' }}>
                Planned Procedures / Services Requiring Authorization:
              </p>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            border: '1px solid #8F8F8F',
            paddingInline: '0.6rem',
            marginTop:"1.5rem"
          }}
        >
          <p>Request Sent 08/05/2022 9:45pm</p>
          <p>
            Request Status: <span style={{ color: '#ED0423' }}>Reject</span>
          </p>
          <Grid container>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Provisional Diagonosis:</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </Grid>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Physician Name:</p>
              <p>Dr. John Doe</p>
              <p>Lagos State Hospital</p>
            </Grid>
          </Grid>
        </div> 
       
        </Grid>
        
        </Grid>
      </div>

      {approve && (
        <>
          <ModalBox open={approve} onClose={() => setApprove(false)}>
            <div style={{width:"40vw"}}>
            <form style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
              <ModalHeader text={`Approve Referral  13229-BA`} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input label={'Name of Referral'} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input label={'Institution'} />
                </Grid>
              </Grid>
              <Grid container spacing={2}> 
                <Grid item xs={12}>
                <Textarea
                placeholder="Type your message here"
                name="reason"
                type="text"
                label="Reason"
              />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <GlobalCustomButton
                 
                >
           OK
                      </GlobalCustomButton>
                  
                </Grid>
              </Grid>
            </form>
            </div>
          </ModalBox>
        </>
      )}
      {deny && (
        <>
          <ModalBox open={deny} onClose={() => setDeny(false)}>
            <div style={{width:"40vw"}}>
            <form style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
              <ModalHeader text={`Deny Referral   13229-BA`} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input label={'Name of Referral'} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input label={'Institution'} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <Textarea
                placeholder="Type your message here"
                name="reason"
                type="text"
                label="Reason"
              />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <GlobalCustomButton
                 
                 >
            OK
                       </GlobalCustomButton>
                </Grid>
              </Grid>
            </form>
            </div>
          </ModalBox>
        </>
      )}
       {edit && (
    <ModalBox open={edit} onClose={() => setEdit(false)}>  
     <ReferralModify/>
    </ModalBox>
    )}

{claim && (
    <ModalBox open={claim} onClose={() => setClaim(false)}>  
     <Claims/>
    </ModalBox>
    )}
    {checkIn && (
       
    <ModalBox open={checkIn} onClose={() => setCheckIn(false)}> 
            <ReferralCheckIn/>  
    </ModalBox>
    )}
    </>
  );
}

export function ReferralModify({ showModal, setShowModal }) {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [message, setMessage] = useState('');
  const [clientId, setClientId] = useState();
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [type, setType] = useState();
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service('appointments');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  // const [appointment_reason,setAppointment_reason]= useState()
  const [appointment_status, setAppointment_status] = useState('');
  const [appointment_type, setAppointment_type] = useState('');
  const [billingModal, setBillingModal] = useState(false);

  const [chosen, setChosen] = useState();
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();
  const appClass = ['On-site', 'Teleconsultation', 'Home Visit'];

  let appointee; //  =state.ClientModule.selectedClient
  /*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
  const handleChangeType = async (e) => {
    await setAppointment_type(e.target.value);
  };

  const handleChangeStatus = async (e) => {
    await setAppointment_status(e.target.value);
  };

  const getSearchfacility = (obj) => {
    setClientId(obj._id);
    setChosen(obj);
    //handleRow(obj)
    if (!obj) {
      //"clear stuff"
      setClientId();
      setChosen();
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility1 = (obj) => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };
  const getSearchfacility2 = (obj) => {
    setPractionerId(obj._id);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setPractionerId();
      setChosen2();
    }
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setSuccess(false);
    setShowModal(false),
      setState((prevstate) => ({
        ...prevstate,
        AppointmentModule: {
          selectedAppointment: {},
          show: 'list',
        },
      }));

    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    data.locationId = locationId; //state.ClinicModule.selectedClinic._id
    data.practitionerId = practionerId;
    data.appointment_type = appointment_type;
    // data.appointment_reason=appointment_reason
    data.appointment_status = appointment_status;
    data.clientId = clientId;
    data.firstname = chosen.firstname;
    data.middlename = chosen.middlename;
    data.lastname = chosen.lastname;
    data.dob = chosen.dob;
    data.gender = chosen.gender;
    data.phone = chosen.phone;
    data.email = chosen.email;
    data.practitioner_name = chosen2.firstname + ' ' + chosen2.lastname;
    data.practitioner_profession = chosen2.profession;
    data.practitioner_department = chosen2.department;
    data.location_name = chosen1.name;
    data.location_type = chosen1.locationType;
    data.actions = [
      {
        action: appointment_status,
        actor: user.currentEmployee._id,
      },
    ];
    console.log(data);

    ClientServ.create(data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        setAppointment_type('');
        setAppointment_status('');
        setClientId('');
        setLocationId('');
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast({
          message:
            'Appointment created succesfully, Kindly bill patient if required',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch((err) => {
        toast({
          message: 'Error creating Appointment ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    getSearchfacility(state.ClientModule.selectedClient);

    /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
    return () => {};
  }, [state.ClientModule.selectedClient]);

  /*   const showBilling = () =>{
        setBillingModal(true)
       //history.push('/app/finance/billservice')
        }
        const  handlecloseModal1 = () =>{
            setBillingModal(false)
            }


            const handleRow= async(Client)=>{
              //  await setSelectedClient(Client)
                const    newClientModule={s
                    selectedClient:Client,
                    show :'detail'
                }
               await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
            } */
  const CustomSelectData = [
    {
      label: 'Today',
      value: 'today',
    },
  ];

  return (
   
    <>
    
      <div
        className="card "
        style={{ height: '100%', width: '80vw', overflowX: 'hidden' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ModalHeader text={'Referral Modify'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MdCancel
                onClick={() => {
                  setShowModal(false),
                    setState((prevstate) => ({
                      ...prevstate,
                      AppointmentModule: {
                        selectedAppointment: {},
                        show: 'list',
                      },
                    }));
                }}
                style={{
                  fontSize: '2rem',
                  color: 'crimson',
                  cursor: 'pointer',
                  float: 'right',
                }}
              />
            </Grid>
          </Grid>
         <GridBox>
         <Input
              name="healthCareProvider"
              label="Health Care Provider"
              type="text"
              
            />
            <Input name="preAuthId" label="Pre-auth ID" type="text" />
           
            <Input name="claimId" label="Claim ID" type="text" />

         </GridBox>
            
            <div style={{display:"flex", alignItems:"center", gap:"5rem", marginBottom:"0.6rem"}}>
            <BasicDateTimePicker name="dateOfRequest" label="Date of Request" />
            
            <div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="emergency"
                name="emergency"
                sx={{
                  display: 'flex !important',
                  justifyContent: 'space-between !',
                  flexDirection: 'row !important',
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </div>
            </div>


          <div>
            <McText
              txt={'Clinical Information'}
              color={'#0064CC'}
              type={'p'}
              bold={'700'}
              size={'18px'}
            />
          </div>
          <GridBox>
          <button
              style={{
                float: 'right',
                backgroundColor: '#ECF3FF',
                color: '#0064CC',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <MdAddCircle
                style={{
                  marginRight: '5px',
                }}
              />
              Add complaints
            </button>
              <CustomSelect
                name="complaints"
                label="Complaints"
                options={CustomSelectData}
              />
          
              <CustomSelect
                name="duration"
                label="Duration"
                options={CustomSelectData}
              />
          </GridBox>

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={12}>
              <McText
                txt={'Clinic Findings'}
                color={'#0064CC'}
                type={'p'}
                bold={'700'}
                size={'18px'}
              />
            </Grid>
          </Grid>

          <GridBox>
            <CustomSelect
              name="provisionalDiagnosis"
              label="Provisional Diagnosis"
              options={CustomSelectData}
            />

            <button
              style={{
                float: 'left',
                backgroundColor: '#ECF3FF',
                color: '#0064CC',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <MdAddCircle
                style={{
                  marginRight: '5px',
                }}
              />
              Add Diagnosis
            </button>

            <CustomSelect
              name="plannedDiagnosis"
              label="Planned Procedure"
              options={CustomSelectData}
            />

            <button
              style={{
                float: 'left',
                backgroundColor: '#ECF3FF',
                color: '#0064CC',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <MdAddCircle
                style={{
                  marginRight: '5px',
                }}
              />
              Add Procedure
            </button>

            <CustomSelect
              name="plannedService"
              label="Planned Service"
              options={CustomSelectData}
            />

            <button
              style={{
                float: 'left',
                backgroundColor: '#ECF3FF',
                color: '#0064CC',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              <MdAddCircle
                style={{
                  marginRight: '5px',
                }}
              />
              Add Service
            </button>
          </GridBox>
          <div style={{display:"flex", flexDirection:"column", gap:"0.6rem", marginBottom:"10px"}}>
          
              <Input
                name="physicianName"
                label="Physician' Name"
                type="text"
              />
              <Textarea
                placeholder="Type your message here"
                name="reason"
                type="text"
                label="Reason for Request"
              />
          </div>
          <GlobalCustomButton
              
              type="submit"
            >
               Submit
               </GlobalCustomButton>  
        </form>
      </div>
    
    </>
  );
}
