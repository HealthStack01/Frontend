/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import { Box, Grid, Button as MuiButton } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
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
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import PatientProfile from '../Client/PatientProfile';

// eslint-disable-next-line
const searchfacility = {};

export default function Claims({ standAlone }) {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!standAlone && (
        <>
          <section className="section remPadTop">
            <ClaimsList showModal={showModal} setShowModal={setShowModal} />
            {showModal && (
              <ModalBox
                open={state.AppointmentModule.show === 'create'}
                onClose={() => setShowModal(false)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <PatientProfile />
                  </Grid>
                  <Grid item xs={8}>
                    <ClaimsCreate
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </Grid>
                </Grid>
              </ModalBox>
            )}
            {showModal && (
              <ModalBox
                open={state.AppointmentModule.show === 'detail'}
                onClose={() => setShowModal(false)}
              >
                <ClaimsDetails />
              </ModalBox>
            )}
          </section>
        </>
      )}
      {standAlone && (
        <>
          <section className="section remPadTop">
            <ClaimsList
              showModal={showModal}
              setShowModal={setShowModal}
              standAlone={standAlone}
            />
            {showModal && (
              <ModalBox
                open={state.AppointmentModule.show === 'create'}
                onClose={() => setShowModal(false)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <PatientProfile />
                  </Grid>
                  <Grid item xs={8}>
                    <ClaimsCreate
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </Grid>
                </Grid>
              </ModalBox>
            )}
            {showModal && (
              <ModalBox
                open={state.AppointmentModule.show === 'detail'}
                onClose={() => setShowModal(false)}
              >
                <ClaimsDetails />
              </ModalBox>
            )}
          </section>
        </>
      )}
    </>
  );
}

export function ClaimsCreate({ showModal, setShowModal }) {
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
      <div className="card ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ModalHeader text={'Claims'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MdCancel
                onClick={() => {
                  setShowModal(false);
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

          {/* <McText
            txt={`Employer's Details`}
            color={'#0064CC'}
            type={'p'}
            bold={'700'}
            size={'18px'}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input name="patientname" label="Patient Name" type="text" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input name="lashmaId" label="LASHMA ID" type="text" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input name="hospitalName" label="Hospital Name" type="text" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input name="doctorName" label="Name of Doctor" type="text" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                name="healthPlan"
                label="Type of Health Plan"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input name="authCode" label="Authorozation Code" type="text" />
            </Grid>
          </Grid> */}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <RadioButton
                name="patient"
                title="Patient"
                options={[
                  {
                    label: 'Out Patient',
                    value: 'Out Patient',
                  },
                  {
                    label: 'In Patient',
                    value: 'In Patient',
                  },
                ]}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={6}>
              <BasicDatePicker
                name="addmissionDate"
                label="Date of Admission"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BasicDatePicker name="dischargeDate" label="Date of Discharge" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <BasicDatePicker name="entryDate" label="Date of Entry" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="claimType"
                label="Claim Type"
                options={CustomSelectData}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input name="amount" label="Claim Amount" type="tel" />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={12}>
              <McText
                txt={'Clinic Information'}
                color={'#0064CC'}
                type={'p'}
                bold={'700'}
                size={'18px'}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="diagnosis"
                label="Diagnosis"
                register={register('diagnosis')}
                rows={3}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
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
            </Grid> */}
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="investigation"
                label="Investigation"
                register={register('investigation')}
                rows={3}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
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
                Add Investigation
              </button>
            </Grid> */}
          </Grid>

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={12}>
              <McText
                txt={'Treatment'}
                color={'#0064CC'}
                type={'p'}
                bold={'700'}
                size={'18px'}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="drugs"
                label="Drugs"
                register={register('drugs')}
                rows={3}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
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
                Add Drugs
              </button>
            </Grid> */}
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="therapy"
                label="Therapy"
                register={register('therapy')}
                rows={3}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
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
                Add Therapy
              </button>
            </Grid> */}
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export function ClaimsList({ showModal, setShowModal, standAlone }) {
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
    setShowModal(true);
  };

  const handleRow = async (Client) => {
    setShowModal(true);
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
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
    {
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
    {
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
    {
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
    {
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
    {
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
    {
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
    {
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
    {
      healthcare_Plan: 'Formal sector plan',
      hospital_name: 'Creek Hospital',
      bill: 'N100,000.00',
      date: '27-10-21',
      status: 'Approved',
      reason: 'Lorem ipsum dolor ...',
    },
  ];

  const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case 'approved':
        return <span style={{ color: '#17935C' }}>{status}</span>;

      case 'ongoing':
        return <span style={{ color: '#0364FF' }}>{status}</span>;

      case 'declined':
        return <span style={{ color: '#ED0423' }}>{status}</span>;

      case 'pending':
        return <span style={{ color: '#EF9645' }}>{status}</span>;

      default:
        break;
    }
  };

  const preAuthSchema = [
    {
      name: 'Plan',
      key: 'healthcare plan',
      description: 'Enter name of Healthcare Plan',
      selector: (row) => row.healthcare_Plan,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Hospital Name',
      key: 'hospital name',
      description: 'Enter Hospital Name',
      selector: (row) => row.hospital_name,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Bill For Month',
      key: 'bills',
      description: 'Enter bills',
      selector: (row) => row.bill,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Date',
      key: 'date',
      description: 'Enter Date',
      selector: (row, i) => row.date,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: ' Status',
      key: ' status',
      description: 'Enter  Status',
      selector: (row) => row.status,
      cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    // {
    //   name: "Status",
    //   key: "bills",
    //   description: "Enter bills",
    //   selector: "status",
    //   cell: row => returnCell(row.status),
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
    {
      name: 'Reason',
      key: 'reason',
      description: 'Enter for Request',
      selector: (row) => row.reason,
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
          {!standAlone ? (
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
                        Claim
                      </h2>
                    </div>

                    {handleCreateNew && (
                      <MuiButton
                        variant="contained"
                        sx={{
                          width: 'fit',
                          textTransform: 'capitalize',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}
                        onClick={handleCreateNew}
                      >
                        <AddCircleOutline
                          sx={{ marginRight: '5px' }}
                          fontSize="small"
                        />
                        Add Claim
                      </MuiButton>
                    )}
                  </TableMenu>

                  {value === 'list' ? (
                    <CustomTable
                      title={''}
                      columns={preAuthSchema}
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
            <>
              <CustomTable
                title={''}
                columns={preAuthSchema}
                data={dummyData}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={loading}
                //conditionalRowStyles={conditionalRowStyles}
              />
            </>
          )}
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
export function ClaimsDetails() {
  const [deny, setDeny] = useState(false);
  const [approve, setApprove] = useState(false);
  return (
    <>
      <div
        className="card"
        style={{
          height: '50vh',
          overflowY: 'scroll',
          width: '40vw',
          margin: '0 auto',
        }}
      >
        <ModalHeader text={'Claim Details - 13322BA'} />
        <McText txt={'Patient Details'} />
        <div style={{ backgroundColor: '#EBEBEB' }}>
          <Grid container spacing={2} mt={1} px={2}>
            <Grid item xs={12} style={{ width: 'fit-content' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    maxWidth: '100px',
                    height: '100px',
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
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1} px={2}>
            <Grid item xs={4}>
              <p style={{ fontWeight: 'bold' }}>DOB: 23/06/2022</p>
            </Grid>
            <Grid item xs={4}>
              <p style={{ fontWeight: 'bold' }}>Age: 52</p>
            </Grid>
            <Grid item xs={4}>
              <p style={{ fontWeight: 'bold' }}>Gender: Male</p>
            </Grid>
          </Grid>
          <Grid container spacing={2} px={2}>
            <Grid item xs={6}>
              <p style={{ fontWeight: 'bold' }}>
                Hospital Name: Lagos State Clinic{' '}
              </p>
            </Grid>
            <Grid item xs={6}>
              <p style={{ fontWeight: 'bold' }}>
                Health Plan: Former sector plan
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={2} px={2}>
            <Grid item xs={6}>
              <p style={{ fontWeight: 'bold' }}>
                Date of Admission: 23/06/2022
              </p>
            </Grid>
            <Grid item xs={6}>
              <p style={{ fontWeight: 'bold' }}>
                Date of Discharge: 23/06/2022
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={2} px={2}>
            <Grid item xs={6}>
              <p style={{ fontWeight: 'bold' }}>Capitation: Filed</p>
            </Grid>
            <Grid item xs={6}>
              <p style={{ fontWeight: 'bold' }}>Fee of Service: Filed</p>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            marginTop: '10px',
            border: '1px solid #8F8F8F',
            padding: '1rem',
          }}
        >
          <p>Request Sent 08/05/2022 9:45pm</p>
          <McText txt={'Clinical Information'} />
          <Grid container spacing={2} mb={1}>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Presenting Complaints:</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </Grid>
          </Grid>

          <McText txt={'Clinical Findings'} />
          <Grid container spacing={2} mb={1}>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Examination Findings:</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>

              <p style={{ fontWeight: 'bold' }}>Diagonsis:</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
              <p style={{ fontWeight: 'bold' }}>Investigations:</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </Grid>
          </Grid>

          <McText txt={'Amount'} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Input label={'Amount'} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Reason for Request:</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p style={{ fontWeight: 'bold' }}>Physician Name:</p>
              <p>Dr. John Doe</p>
              <p>Lagos State Hospital</p>
            </Grid>
          </Grid>
        </div>
        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <Button onClick={() => setApprove(true)}>Approve</Button>
          <Button>On Hold</Button>
          <Button onClick={() => setDeny(true)}>Reject</Button>
        </div>
      </div>
      {approve && (
        <>
          <ModalBox open={approve} onClose={() => setApprove(false)}>
            <form>
              <ModalHeader text={`Approve Claim  13229-BA`} />

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
                  <Input label={'Reason'} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button>OK</Button>
                </Grid>
              </Grid>
            </form>
          </ModalBox>
        </>
      )}
      {deny && (
        <>
          <ModalBox open={deny} onClose={() => setDeny(false)}>
            <form>
              <ModalHeader text={`Deny Claim  13229-BA`} />

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
                  <Input label={'Reason'} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button>OK</Button>
                </Grid>
              </Grid>
            </form>
          </ModalBox>
        </>
      )}
    </>
  );
}
