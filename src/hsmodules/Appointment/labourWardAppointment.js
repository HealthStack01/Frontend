/* eslint-disable */
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
import { AppointmentSchema } from './schema';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';
import ModalHeader from './ui-components/Heading/modalHeader';
import { Box, Grid } from '@mui/material';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import { MdCancel } from 'react-icons/md';
import Input from '../../components/inputs/basic/Input';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import BasicDatePicker from '../../components/inputs/Date';
import MuiCustomTimePicker from '../../components/inputs/Date/MuiTimePicker';
import BasicDateTimePicker from '../../components/inputs/DateTime';
// eslint-disable-next-line
const searchfacility = {};

export default function LabourAppointments() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="section remPadTop">
      <ClientList showModal={showModal} setShowModal={setShowModal} />

      {showModal && (
        <ModalBox
          open={state.AppointmentModule.show === 'create'}
          onClose={() => setShowModal(false)}
          header="Create Appointment"
        >
          <AppointmentCreate
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </ModalBox>
      )}
      {showModal && (
        <ModalBox
          open={state.AppointmentModule.show === 'detail'}
          onClose={() => setShowModal(false)}
          header="Appointment Details"
        >
          <ClientDetail showModal={showModal} setShowModal={setShowModal} />
        </ModalBox>
      )}
      {showModal && (
        <ModalBox
          open={state.AppointmentModule.show === 'modify'}
          header="Edit Appointment"
          onClose={() => setShowModal(false)}
        >
          <ClientModify showModal={showModal} setShowModal={setShowModal} />
        </ModalBox>
      )}
    </section>
  );
}

export function AppointmentCreate({ showModal, setShowModal }) {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue, control } = useForm(); //, watch, errors, reset
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
  },[]);

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
        toast.success(
          'Appointment created succesfully, Kindly bill patient if required'
        );
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch((err) => {
        toast.error('Error creating Appointment ' + err);
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

  return (
    <>
      <div className="card ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <ClientSearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} mb={1.5}>
              <EmployeeSearch
                getSearchfacility={getSearchfacility2}
                clear={success2}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <LocationSearch
                getSearchfacility={getSearchfacility1}
                clear={success1}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <div className="field ml-3 ">
                {appClass.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c}
                      name="appointmentClass"
                      {...register('appointmentClass', { required: true })}
                      style={{
                        border: '1px solid #0364FF',
                        // transform: 'scale(1.5)',
                        color: '#0364FF',
                        margin: '0 .5rem',
                      }}
                    />
                    {c + ' '}
                  </label>
                ))}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <BasicDateTimePicker
                label="Date"
                register={register('start_time', { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <select
                name="type"
                value={type}
                onChange={handleChangeType}
                style={{
                  border: '1px solid #b6b6b6',
                  height: '38px',
                  borderRadius: '4px',
                  width: '100%',
                }}
              >
                <option defaultChecked>Choose Appointment Type </option>
                <option value="New">New</option>
                <option value="Followup">Followup</option>
                <option value="Readmission with 24hrs">
                  Readmission with 24hrs
                </option>
                <option value="Annual Checkup">Annual Checkup</option>
                <option value="Walk in">Walk-in</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <select
                name="appointment_status"
                value={appointment_status}
                onChange={handleChangeStatus}
                style={{
                  border: '1px solid #b6b6b6',
                  height: '38px',
                  borderRadius: '4px',
                  width: '100%',
                }}
              >
                <option defaultChecked>Appointment Status </option>
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked In">Checked In</option>
                <option value="Vitals Taken">Vitals Taken</option>
                <option value="With Nurse">With Nurse</option>
                <option value="With Doctor">With Doctor</option>
                <option value="No Show">No Show</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Billed">Billed</option>
              </select>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="label" htmlFor="appointment_reason">
                Reason for Appointment
              </label>
              <textarea
                className="input is-small"
                name="appointment_reason"
                {...register('appointment_reason', { required: true })}
                type="text"
                placeholder="Appointment Reason"
                rows="3"
                cols="50"
                style={{
                  border: '1px solid #b6b6b6',
                  borderRadius: '4px',
                  color: ' #979DAC',
                  width: '100%',
                }}
              >
                {' '}
              </textarea>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GlobalCustomButton
              variant="outlined"
              color="error"
              text="Cancel"
              customStyles={{
                marginRight: '15px',
              }}
              onClick={() => setShowModal(false)}
            />

            <GlobalCustomButton
              text="Submit"
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </form>
      </div>
    </>
  );
}

export function ClientList({ showModal, setShowModal }) {
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
      facility: user.currentEmployee?.facilityDetail._id,

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

  console.log(facilities);

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
                    Appointments
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
                    text="Add new "
                    onClick={handleCreateNew}
                  />
                )}
              </TableMenu>
              <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
                {value === 'list' ? (
                  <CustomTable
                    title={''}
                    columns={AppointmentSchema}
                    data={facilities}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={handleRow}
                    progressPending={loading}
                  />
                ) : (
                  <CalendarGrid appointments={mapFacilities()} />
                )}
              </div>
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function ClientDetail({ showModal, setShowModal }) {
  const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const navigate = useNavigate();

  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const ClientServ=client.service('/Client')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const { state, setState } = useContext(ObjectContext);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();

  const Client = state.AppointmentModule.selectedAppointment;
  //const client=Client
  const handleEdit = async () => {
    const newClientModule = {
      selectedAppointment: Client,
      show: 'modify',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
  };

  const handleAttend = async () => {
    const patient = await client.service('client').get(Client.clientId);
    await setSelectedClient(patient);
    const newClientModule = {
      selectedClient: patient,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //modify appointment
    navigate('/app/clinic/documentation');
    console.log('test');
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
        }}
        mb={2}
      >
        <GlobalCustomButton
          onClick={handleEdit}
          text="Edit Appointment Details"
          customStyles={{
            marginRight: '5px',
          }}
        />
        <GlobalCustomButton onClick={handleAttend} text="Attend" />
      </Box>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={4}>
          <Input label="First Name" value={Client?.firstname} disabled />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input label="Middle Name" value={Client?.middlename} disabled />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input label="Last Name" value={Client?.lastname} disabled />
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={4}>
          <Input
            label="Age"
            value={formatDistanceToNowStrict(new Date(Client.dob))}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input label="Gender" value={Client.gender} disabled />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input label="Phone Number" value={Client?.phone} disabled />
        </Grid>
      </Grid>
      <Grid container spacing={1} my={1}>
        <Grid item xs={12} md={4}>
          <Input label="Email" value={Client?.email} disabled />
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={4}>
          <Input
            label="Start Date"
            value={format(new Date(Client.start_time), 'dd/MM/yyyy HH:mm')}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input label="Location" value={Client?.location_name} disabled />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Professional"
            value={`  ${Client.practitioner_name} (${Client.practitioner_profession})`}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={4}>
          <Input
            label="Appointment Status"
            value={Client?.appointment_status}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Appointment Class"
            value={Client?.appointmentClass}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Appointment Type"
            value={Client?.appointment_type}
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={12}>
          <label className="label" htmlFor="appointment_reason">
            Reason for Appointment
          </label>
          <textarea
            className="input is-small"
            name="appointment_reason"
            value={Client?.appointment_reason}
            disabled
            type="text"
            placeholder="Appointment Reason"
            rows="3"
            cols="50"
            style={{
              border: '1px solid #b6b6b6',
              borderRadius: '4px',
              color: ' #979DAC',
              width: '100%',
            }}
          >
            {' '}
          </textarea>
        </Grid>
      </Grid>
    </>
  );
}

export function ClientModify({ showModal, setShowModal }) {
  const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const ClientServ = client.service('appointments');
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [appointment_status, setAppointment_status] = useState('');
  const [appointment_type, setAppointment_type] = useState('');
  const appClass = ['On-site', 'Teleconsultation'];
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();

  const Client = state.AppointmentModule.selectedAppointment;
  //console.log(Client)

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
    setValue('firstname', Client.firstname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('middlename', Client.middlename, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('lastname', Client.lastname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('phone', Client.phone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('email', Client.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('dob', Client.dob, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('gender', Client.gender, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('ClientId', Client.clientId, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('appointment_reason', Client.appointment_reason, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('appointment_status', Client.appointment_status, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('appointment_type', Client.appointment_type, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue(
      'start_time',
      format(new Date(Client.start_time), "yyyy-MM-dd'T'HH:mm:ss"),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
    setValue('appointmentClass', Client.appointmentClass, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  },[]);
  const handleChangeType = async (e) => {
    // await setAppointment_type(e.target.value)
    setValue('appointment_type', e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleChangeStatus = async (e) => {
    // await setAppointment_status(e.target.value)
    setValue('appointment_status', e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCancel = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newClientModule = {
      selectedAppointment: {},
      show: 'list',
    };
    setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');

    const dleteId = Client._id;
    if (conf) {
      ClientServ.remove(dleteId)
        .then((res) => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Client successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast.success('Client deleted succesfully');
          changeState();
        })
        .catch((err) => {
          // setMessage("Error deleting Client, probable network issues "+ err )
          // setError(true)
          toast.error(
            'Error deleting Client, probable network issues or ' + err
          );
        });
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setSuccess(false);
    setShowModal(false),
      // setState(() => ({
      //   AppointmentModule: {
      //     selectedAppointment: {},
      //     show: 'list',
      //   },
      // }));

      // console.log(data)
      //  data.facility=Client.facility
      //console.log(data);
      (data.practitioner_name = chosen2.firstname + ' ' + chosen2.lastname);
    data.practitioner_profession = chosen2.profession;
    data.practitioner_department = chosen2.department;
    data.practitionerId = chosen2._id;
    data.locationId = chosen1._id;
    data.location_name = chosen1.name;
    data.location_type = chosen1.locationType;

    //data.actions
    if (Client.appointment_status !== data.appointment_status) {
      Client.actions.push({
        status: data.appointment_status,
        actor: user.currentEmployee._id,
      });
    }
    data.actions = Client.actions;
    ClientServ.patch(Client._id, data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Client successfully")
        toast.success('Client updated succesfully');

        changeState();
      })
      .catch((err) => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast.error('Error updating Client, probable network issues or ' + err);
      });
  };

  return (
    <>
      <div className="card ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <p>
                {Client.firstname} {Client.lastname}
              </p>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <LocationSearch
                id={Client.locationId}
                getSearchfacility={getSearchfacility1}
                clear={success1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <EmployeeSearch
                id={Client.practitionerId}
                getSearchfacility={getSearchfacility2}
                clear={success2}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="field ml-3 ">
                {/* <label className= "mr-2 "> <b>Modules:</b></label> */}
                {appClass.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c}
                      name="appointmentClass"
                      {...register('appointmentClass', { required: true })}
                      style={{
                        border: '1px solid #0364FF',
                        color: '#0364FF',
                        margin: '.5rem',
                      }}
                    />
                    {c + ' '}
                  </label>
                ))}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} sm={12} md={4}>
              <BasicDateTimePicker
                label="Date"
                register={register('start_time', { required: true })}
                value={format(
                  new Date(Client.start_time),
                  "yyyy-MM-dd'T'HH:mm:ss"
                )}
              />
              {/* <div className="field">
                <input
                  name="start_time"
                  {...register('start_time', { required: true })}
                  type="datetime-local"
                  defaultValue={format(
                    new Date(Client.start_time),
                    "yyyy-MM-dd'T'HH:mm:ss"
                  )}
                  style={{
                    border: '1px solid #0364FF',
                    padding: '1rem',
                    color: ' #979DAC',
                  }}
                />
              </div> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <select
                name="type"
                onChange={handleChangeType}
                defaultValue={Client?.appointment_type}
                style={{
                  border: '1px solid #b6b6b6',
                  height: '38px',
                  borderRadius: '4px',
                  width: '100%',
                }}
              >
                <option defaultChecked>Choose Appointment Type </option>
                <option value="New">New</option>
                <option value="Followup">Followup</option>
                <option value="Readmission with 24hrs">
                  Readmission with 24hrs
                </option>
                <option value="Annual Checkup">Annual Checkup</option>
                <option value="Walk in">Walk-in</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <select
                name="appointment_status"
                onChange={handleChangeStatus}
                defaultValue={Client?.appointment_status}
                style={{
                  border: '1px solid #b6b6b6',
                  height: '38px',
                  borderRadius: '4px',
                  width: '100%',
                }}
              >
                <option defaultChecked>Appointment Status </option>
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked In">Checked In</option>
                <option value="Vitals Taken">Vitals Taken</option>
                <option value="With Nurse">With Nurse</option>
                <option value="With Doctor">With Doctor</option>
                <option value="No Show">No Show</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Billed">Billed</option>
              </select>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label className="label" htmlFor="appointment_reason">
                Reason for Appointment
              </label>
              <textarea
                className="input is-small"
                name="appointment_reason"
                {...register('appointment_reason', { required: true })}
                type="text"
                placeholder="Appointment Reason"
                rows="3"
                cols="50"
                style={{
                  border: '1px solid #b6b6b6',
                  borderRadius: '4px',
                  color: ' #979DAC',
                  width: '100%',
                }}
              >
                {' '}
              </textarea>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GlobalCustomButton
              variant="contained"
              color="success"
              text="Save"
              customStyles={{
                marginRight: '15px',
              }}
              onClick={handleSubmit(onSubmit)}
            />

            <GlobalCustomButton
              text="Delete"
              onClick={() => handleDelete()}
              color="error"
              variant="outlined"
            />
          </Box>
        </form>
      </div>
    </>
  );
}

export function ClientSearch({ getSearchfacility, clear }) {
  const ClientServ = client.service('client');
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState('');
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState('');
  const { user } = useContext(UserContext);
  const { state } = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);
  const [closeDropdown, setCloseDropdown] = useState(false);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(
      obj.firstname +
        ' ' +
        obj.middlename +
        ' ' +
        obj.lastname +
        ' ' +
        obj.gender +
        ' ' +
        obj.phone
    );

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };
  const handleBlur = async (e) => {
    if (count === 2) {
      console.log('stuff was chosen');
    }

    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };
  const handleSearch = async (val) => {
    setVal(val);
    if (val === '') {
      setShowPanel(false);
      getSearchfacility(false);
      return;
    }
    const field = 'name'; //field variable

    if (val.length >= 3) {
      ClientServ.find({
        query: {
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
              clientTags: {
                $regex: val,
                $options: 'i',
              },
            },
            {
              mrn: {
                $regex: val,
                $options: 'i',
              },
            },
            {
              specificDetails: {
                $regex: val,
                $options: 'i',
              },
            },
          ],

          facility: user.currentEmployee.facilityDetail._id,
          //storeId: state.StoreModule.selectedStore._id,
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then((res) => {
          console.log('product  fetched successfully');
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(' product  fetched successfully');
          setShowPanel(true);
        })
        .catch((err) => {
          toast({
            message: 'Error creating ProductEntry ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      console.log('less than 3 ');
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  console.log(simpa);
  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      console.log('success has changed', clear);
      setSimpa('');
    }
    return () => {};
  }, [clear]);
  // map faclilities and return the firstname and lastname
  const mapFacilities = () => {
    const allFacilities = facilities.map((facility) => {
      return {
        value: facility._id,
        label: facility.firstname + ' ' + facility.lastname,
      };
    });
  };

  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? 'is-active' : ''}`}
            style={{ width: '100%' }}
          >
            <div className="dropdown-trigger" style={{ width: '100%' }}>
              <DebouncedInput
                label={'Search for Client'}
                value={simpa}
                minLength={3}
                onBlur={handleBlur}
                onChangeValue={handleSearch}
                inputRef={inputEl}
                style={{ height: '38px' }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <div className="dropdown-menu expanded" style={{ width: '100%' }}>
              <div className="dropdown-content">
                {/* {facilities.length > 0 ? (
                  ''
                ) : (
                  <div
                    className="dropdown-item" 
                  >
                    {' '}
                    <span> {val} is not yet your client</span>{' '}
                  </div>
                )} */}

                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => {
                      handleRow(facility), setCloseDropdown(true);
                    }}
                  >
                    <div style={{ cursor: 'pointer' }}>
                      {closeDropdown ? (
                        <></>
                      ) : (
                        <>
                          <span>{facility.firstname}</span>
                          <span className="padleft">{facility.middlename}</span>
                          <span className="padleft">{facility.lastname}</span>
                          <span className="padleft">
                            {' '}
                            {formatDistanceToNowStrict(new Date(facility.dob))}
                          </span>
                          <span className="padleft">{facility.gender}</span>
                          <span className="padleft">{facility.profession}</span>
                          <span className="padleft">{facility.phone}</span>
                          <span className="padleft">{facility.email}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
