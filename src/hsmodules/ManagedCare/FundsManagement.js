/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
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
import { Box, Grid } from '@mui/material';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import { MdCancel } from 'react-icons/md';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import { FormsHeaderText } from '../../components/texts';
import Input from '../../components/inputs/basic/Input';
import RadioButton from '../../components/inputs/basic/Radio';
import BasicDatePicker from '../../components/inputs/Date';

// eslint-disable-next-line
const searchfacility = {};

export default function FundsManagement() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);

  return (
    <section className="section remPadTop">
      <FundsManagementList showModal={showModal} setShowModal={setShowModal} />
      {showModal === 1 && (
        <ModalBox open onClose={() => setShowModal(0)}>
          <FundsManagementCreate setShowModal={setShowModal} />
        </ModalBox>
      )}
      {showModal === 2 && (
        <ModalBox open onClose={() => setShowModal(0)}>
          <FundsManagementDetails setShowModal={setShowModal} />
        </ModalBox>
      )}
    </section>
  );
}

export function FundsManagementCreate({ showModal, setShowModal }) {
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

  return (
    <>
      <div className="card ">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormsHeaderText text={'Create Account'} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <GlobalCustomButton
              text={'Cancel'}
              onClick={() => setShowModal(false)}
              color="warning"
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              text={'Save'}
              onClick={handleSubmit(onSubmit)}
              color="success"
            />
          </Box>
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={12}>
            <Input label="Account Name" value={'Test Organization'} />
          </Grid>
          <Grid item xs={12} md={12}>
            <RadioButton
              title="Account Type"
              options={[
                { label: 'Investment account', value: 'Investment account' },
                { label: 'Expense account', value: 'Expense account' },
                { label: 'Revenue', value: 'Revenue' },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicDatePicker label="Maturity Date" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Account Description" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Account Number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Sort Code" />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export function FundsManagementList({ showModal, setShowModal }) {
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
    setShowModal(2);
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
      s_n: 'S/N',
      date: '27/11/22 17:33',
      description: 'Transfer and cash',
      amount: '2000',
      mode: 'Bank Transfer',
    },
    {
      s_n: 'S/N',
      date: '27/11/22 17:33',
      description: 'Transfer and cash',
      amount: '200',
      mode: 'Cash',
    },
    {
      s_n: 'S/N',
      date: '27/11/22 17:33',
      description: '------------------',
      amount: '1000',
      mode: 'Cash',
    },

    {
      s_n: 'S/N',
      date: '27/11/22 17:33',
      description: '------------------',
      amount: '100',
      mode: 'Cash',
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

  const FundsManagementSchema = [
    {
      name: 'S/N',
      key: 's_n',
      description: 'Enter s/n',
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
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
      name: 'Description ',
      key: 'description',
      description: 'Enter description',
      selector: (row) => row.description,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Amount',
      key: 'amount',
      description: 'Enter amount',
      selector: (row) => row.amount,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Mode',
      key: 'mode',
      description: 'Enter mode',
      selector: (row, i) => row.mode,
      sortable: true,
      required: true,
      inputType: 'DATE',
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
                    Fund Management
                  </h2>
                </div>

                {handleCreateNew && (
                  <GlobalCustomButton
                    text="Add new"
                    onClick={handleCreateNew}
                  />
                )}
              </TableMenu>
              <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
                {value === 'list' ? (
                  <CustomTable
                    title={''}
                    columns={FundsManagementSchema}
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

export function FundsManagementDetails({ showModal, setShowModal }) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '60vw',
        }}
      >
        <FormsHeaderText text={'Fund Management details'} />
        {!edit ? (
          <GlobalCustomButton text="Edit" onClick={() => setEdit(true)} />
        ) : (
          <GlobalCustomButton
            text="Save"
            onClick={() => setEdit(false)}
            color="success"
          />
        )}
      </Box>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={12}>
          <Input
            label="Account Name"
            value="Test Organization"
            disabled={!edit}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Account type"
            value="Investment Account"
            disabled={!edit}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BasicDatePicker defaultValue={new Date()} disabled={!edit} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Input
            label="Account Description"
            value="Account for collection"
            disabled={!edit}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Account Number" value="1234567890" disabled={!edit} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Sort Code" value="GH389KN" disabled={!edit} />
        </Grid>
      </Grid>
    </>
  );
}
