/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';
import { Box, Grid, Button as MuiButton } from '@mui/material';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import { MdCancel } from 'react-icons/md';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import { McText } from './text';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import { FormsHeaderText } from '../../components/texts';
// eslint-disable-next-line
const searchfacility = {};

export default function HealthPlan() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);

  return (
    <section className="section remPadTop">
      {showModal === 0 && (
        <HealthPlanList showModal={showModal} setShowModal={setShowModal} />
      )}
      {showModal === 1 && (
        <HealthPlanCreate
          showModal={showModal}
          setShowModal={() => setShowModal(0)}
        />
      )}
      {showModal === 2 && <HealthPlanDetails setShowModal={setShowModal} />}
    </section>
  );
}

export function HealthPlanCreate({ showModal, setShowModal }) {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue, reset } = useForm(); //, watch, errors, reset
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
  const [showBenefit, setShowBenefit] = useState(false);
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

  const submitbenefit = () => {};

  useEffect(() => {
    getSearchfacility(state.ClientModule.selectedClient);

    /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
    return () => {};
  }, [state.ClientModule.selectedClient]);

  const tableData = [
    {
      service: 'Test Service',
      description: 'lorem ipsum dolor sit amet',
      fee: 'N20,000',
      status: 'Covered',
    },
    {
      service: 'Test Service',
      description: 'lorem ipsum dolor sit amet',
      fee: 'N20,000',
      status: 'Covered',
    },
  ];
  const HealthPlanSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
      width: '50px',
    },
    {
      name: 'Service Name',
      key: 'service',
      description: 'service',
      selector: (row) => row.service,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Description',
      key: 'description',
      description: 'Description',
      selector: (row) => row.description,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Price',
      key: 'fee',
      description: 'Fee',
      selector: (row) => row.fee,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Status',
      key: 'status',
      description: 'Status',
      selector: (row) => row.status,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  return (
    <>
      <div
        className="card "
        style={{
          width: '98%',
          margin: '0 1rem',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormsHeaderText text={'Create Health Plan'} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <GlobalCustomButton
              type="button"
              variant="contained"
              color="warning"
              onClick={() => setShowModal(0)}
              text="Back"
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => setShowBenefit(true)}
              text="Add Benefit"
              customStyles={{ marginRight: '.8rem' }}
            />
            <GlobalCustomButton
              type="submit"
              variant="contained"
              color="success"
              text="Save"
            />
          </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <Input
                name="plan"
                label="Name of Plan"
                register={register('plan')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="planCategory"
                label="Category"
                register={register('planCategory')}
                options={[
                  { value: 'Individual', label: 'Individual' },
                  { value: 'Family', label: 'Family' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="planType"
                label="Type"
                register={register('planType')}
                options={[
                  { value: 'Individual', label: 'Individual' },
                  { value: 'Family', label: 'Family' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name="planAmount"
                label="Premium Amount"
                register={register('planAmount')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormsHeaderText text={'Benefits'} />
              <CustomTable
                tableData={''}
                columns={HealthPlanSchema}
                data={tableData}
                pointerOnHover
                highlightOnHover
                striped
              />
            </Grid>
          </Grid>
          {showBenefit && (
            <>
              <ModalBox
                open={showBenefit}
                onClose={() => setShowBenefit(false)}
              >
                <Box sx={{ width: '70vw' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <FormsHeaderText text={'Add Benefit'} />
                    <GlobalCustomButton
                      type="submit"
                      color="success"
                      text={'Add'}
                    />
                  </Box>
                  <Grid container spacing={2} my={2}>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="serviceName"
                        label="Service Name"
                        register={register('serviceName')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="serviceDscrp"
                        label="Description"
                        register={register('serviceDscrp')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="serviceprice"
                        label="Price"
                        register={register('serviceprice')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomSelect
                        name="serviceStatus"
                        label="Status"
                        register={register('serviceStatus')}
                        options={[
                          { value: 'Covered', label: 'Covered' },
                          { value: 'Not Covered', label: 'Not Covered' },
                        ]}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </ModalBox>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export function HealthPlanList({ showModal, setShowModal }) {
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
      name_of_plan: 'Family plan',
      category: 'Titanium series',
      plan_type: 'Agriculture',
      premium: '27/10/21',
      status: 'Active',
    },
    {
      name_of_plan: 'Family plan',
      category: 'Titanium series',
      plan_type: 'Agriculture',
      premium: '27/10/21',
      status: 'Active',
    },
    {
      name_of_plan: 'Family plan',
      category: 'Titanium series',
      plan_type: 'Agriculture',
      premium: '27/10/21',
      status: 'Active',
    },

    {
      name_of_plan: 'Family plan',
      category: 'Titanium series',
      plan_type: 'Agriculture',
      premium: '27/10/21',
      status: 'Active',
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

  const HealthPlanSchema = [
    {
      name: 'Name of Plan',
      key: 'name_of_plan',

      description: 'Enter name of plan',

      selector: (row) => row.name_of_plan,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Category',
      key: 'category',

      description: 'Enter category series',
      selector: (row) => row.category,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Plan Type',
      key: 'plan_type',
      description: 'Enter plan type',
      selector: (row) => row.plan_type,

      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Premium',
      key: 'premium',
      description: 'Enter premium',
      selector: (row, i) => row.premium,
      sortable: true,
      required: true,
      inputType: 'DATE',
    },
    {
      name: 'Status',
      key: 'status',
      description: 'Enter bills',
      selector: 'status',
      cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,

      inputType: 'TEXT',
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
                    Health Plan
                  </h2>
                </div>

                {handleCreateNew && (
                  <GlobalCustomButton
                    text="Add new "
                    onClick={handleCreateNew}
                  />
                )}
              </TableMenu>
              {value === 'list' ? (
                <CustomTable
                  title={''}
                  columns={HealthPlanSchema}
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

export function HealthPlanDetails({ showModal, setShowModal }) {
  const [deny, setDeny] = useState(false);
  const [approve, setApprove] = useState(false);
  const [viewBenefit, setViewBenefit] = useState(false);

  const tableData = [
    {
      service: 'Test Service',
      description: 'lorem ipsum dolor sit amet',
      fee: 'N20,000',
      status: 'Covered',
    },
    {
      service: 'Test Service',
      description: 'lorem ipsum dolor sit amet',
      fee: 'N20,000',
      status: 'Covered',
    },
    {
      service: 'Test Service',
      description: 'lorem ipsum dolor sit amet',
      fee: 'N20,000',
      status: 'Covered',
    },
  ];
  const HealthPlanSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
      width: '50px',
    },
    {
      name: 'Service Name',
      key: 'service',
      description: 'service',
      selector: (row) => row.service,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Description',
      key: 'description',
      description: 'Description',
      selector: (row) => row.description,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Price',
      key: 'fee',
      description: 'Fee',
      selector: (row) => row.fee,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Status',
      key: 'status',
      description: 'Status',
      selector: (row) => row.status,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  const benefitDate = [
    {
      benefitId: '1637',
      benefitDescription: 'Dental Care',
      benefitPrice: 'N20,000',
    },
    {
      benefitId: '1637',
      benefitDescription: 'Dental Care',
      benefitPrice: 'N20,000',
    },
    {
      benefitId: '1637',
      benefitDescription: 'Dental Care',
      benefitPrice: 'N20,000',
    },
  ];

  const benefitSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Benefit ID',
      key: 'benefitId',
      description: 'Benefit ID',
      selector: (row) => row.benefitId,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Benefit Description',
      key: 'benefitDescription',
      description: 'Benefit Description',
      selector: (row) => row.benefitDescription,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Benefit Price',
      key: 'benefitPrice',
      description: 'Benefit Price',
      selector: (row) => row.benefitPrice,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];
  return (
    <>
      <div
        className="card"
        style={{
          height: 'auto',
          overflowY: 'scroll',
          width: '98%',
          margin: '0 auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} my={1}>
          <FormsHeaderText text={'Anti Fungal'} />
          <GlobalCustomButton
            text="Back"
            color="warning"
            onClick={() => setShowModal(0)}
          />
        </Box>
        <div style={{ backgroundColor: '#EBEBEB', padding: '.5rem 1rem' }}>
          <p>Details</p>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <p>Premium Due: 08/06/2015</p>
            </Grid>
            <Grid item xs={6}>
              <p style={{ textAlign: 'right' }}>
                Status: <span style={{ color: '#17935C' }}>Active</span>
              </p>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            marginTop: '10px',
            padding: '1rem',
            boxShadow:
              '0px 3px 3px -2px rgb(0 0 0 / 20%),0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
          }}
        >
          <Grid container spacing={2} style={{ alignItems: 'top' }}>
            {/* <Grid item xs={3}>
              <div style={{ marginLeft: 'auto' }}>
                <GlobalCustomButton
                  text="View Benefit"
                  customStyles={{ float: 'right' }}
                  onClick={() => setViewBenefit(true)}
                />
              </div>
            </Grid> */}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  borderBottom: '1px solid #E4EAF0',
                  margin: '1rem 0',
                }}
              ></div>
            </Grid>
          </Grid>

          <p>Details</p>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <p>Name of Plan: Test Plan</p>
            </Grid>
            <Grid item xs={4}>
              <p>Plan Type: Test Plan</p>
            </Grid>
            <Grid item xs={4}>
              <p>Plan Category: Test Plan</p>
            </Grid>
            <Grid item xs={4}>
              <p>Premium Amount: 20,000</p>
            </Grid>
            <Grid item xs={4}>
              <p>
                Premium per Person per Annum : <span>20,000</span>
              </p>
            </Grid>
            <Grid item xs={4}>
              <p>
                Premium per Family per Annum : <span>20,000</span>
              </p>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            width: '100%',
            height: 'auto',
            overflow: 'auto',
            marginTop: '1rem',
          }}
        >
          <FormsHeaderText text={'Benefit'} />
          <CustomTable
            tableData={''}
            columns={HealthPlanSchema}
            data={tableData}
            pointerOnHover
            highlightOnHover
            striped
          />
        </div>
        {viewBenefit && (
          <ModalBox open={viewBenefit} onClose={() => setViewBenefit(false)}>
            <div
              style={{
                width: '100%',
                height: 'auto',
                overflow: 'auto',
                marginTop: '1rem',
              }}
            >
              <ModalHeader text={'Benefit'} />
              <CustomTable
                tableData={'Benefits'}
                columns={benefitSchema}
                data={benefitDate}
                pointerOnHover
                highlightOnHover
                striped
              />
            </div>
          </ModalBox>
        )}
      </div>
    </>
  );
}
