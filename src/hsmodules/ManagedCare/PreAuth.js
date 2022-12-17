/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import client from '../../feathers';
//import {useNavigate} from 'react-router-dom'
import { Badge, Box, Grid } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { toast } from 'bulma-toast';
import { addDays, format, subDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarGrid from '../../components/calender';
import CustomTable from '../../components/customtable';
import ModalBox from '../../components/modal';
import FilterMenu from '../../components/utilities/FilterMenu';
import { ObjectContext, UserContext } from '../../context';
import { TableMenu } from '../../ui/styled/global';
import { PageWrapper } from '../../ui/styled/styles';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';

import GlobalCustomButton from '../../components/buttons/CustomButton';
import ChatInterface from '../../components/chat/ChatInterface';
import AutoCompleteBox from '../../components/inputs/AutoComplete';
import Input from '../../components/inputs/basic/Input/index';
import RadioButton from '../../components/inputs/basic/Radio';
import Textarea from '../../components/inputs/basic/Textarea';
import BasicDatePicker from '../../components/inputs/Date';
import { FormsHeaderText } from '../../components/texts';
import PatientProfile from '../Client/PatientProfile';
import CRMTasks from '../CRM/Tasks';
import Beneficiary from './Beneficiary';
import Claims from './Claims';
import Policy from './Policy';
import PremiumPayment from './PremiumPayment';
import { McText } from './text';

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
      {showModal === 0 && (
        <PreAuthorizationList
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {showModal === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <PatientProfile />
          </Grid>
          <Grid item xs={9}>
            <PreAuthorizationCreate
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </Grid>
        </Grid>
      )}
      {showModal === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <PatientProfile />
          </Grid>
          <Grid item xs={9}>
            <PreAuthDetails setShowModal={setShowModal} />
          </Grid>
        </Grid>
      )}
    </section>
  );
}

export function PreAuthorizationCreate({ showModal, setShowModal }) {
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
  const [openComplaint, setOpenComplaint] = useState(false);
  const [openFindings, setOpenFindings] = useState(false);
  const appClass = ['On-site', 'Teleconsultation', 'Home Visit'];
  const [patient, setPatient] = useState('');

  const [showServiceModal, setShowServiceModal] = useState(false);

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

  const dummyData = [
    {
      complaint: 'Fever',
      duration: '2 days',
    },
  ];
  const complaintSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Complaint',
      key: 'complaint',
      description: 'Complaint',
      selector: (row) => row.complaint,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Duration',
      key: 'duration',
      description: 'Duration',
      selector: (row) => row.duration,
      sortable: true,
      inputType: 'TEXT',
    },
  ];
  const dummyData2 = [
    {
      provisional: 'Fever',
      procedure: 'Test',
      service: 'Test',
    },
  ];
  const findingsSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Provisional Diagnosis',
      key: 'provisional',
      description: 'Provisional Diagnosis',
      selector: (row) => row.provisional,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Procedure',
      key: 'procedure',
      description: 'Planned Procedure',
      selector: (row) => row.procedure,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Service',
      key: 'service',
      description: 'Planned Service',
      selector: (row) => row.service,
      sortable: true,
      inputType: 'TEXT',
    },
  ];
  const serviceSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'item',
      key: 'item',
      description: 'Item',
      selector: (row) => row.item,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'QTY',
      key: 'submittedQuantity',
      description: 'Submitted QTY',
      selector: (row) => row.submittedQuantity,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Unit Price',
      key: 'submittedBill',
      description: 'Unit Price',
      selector: (row) => row.submittedBill,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Total Amount',
      key: 'payableBill',
      description: 'Payable Bill',
      selector: (row) => row.payableBill,
      sortable: true,
      inputType: 'TEXT',
    },
  ];

  const dummyData3 = [
    {
      item: 'Today',
      submittedQuantity: 1,
      submittedBill: 1000,
      payableQuantity: 1,
      payableBill: 1000,
      // comments: 'Inline with agreement',
    },
  ];

  return (
    <>
      <div className="card " style={{ margin: '0 1rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ModalHeader text={'Pre-authorization'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <GlobalCustomButton
                  onClick={() => {
                    setShowModal(0),
                      setState((prevstate) => ({
                        ...prevstate,
                        AppointmentModule: {
                          selectedAppointment: {},
                          show: 'list',
                        },
                      }));
                  }}
                  text={'Back'}
                  color="warning"
                  customStyles={{ marginRight: '.8rem' }}
                />
                <GlobalCustomButton
                  type="submit"
                  text={'Save'}
                  color="success"
                />
              </Box>
            </Grid>
          </Grid>

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
                onChange={(e) => setPatient(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <Input name="patientName" label="Search Beneficiary" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input name="patientName" label="Search Hospital" />
            </Grid>
            {patient === 'In Patient' && (
              <Grid item xs={12} sm={6}>
                <BasicDatePicker
                  name="addmissionDate"
                  label="Date of Admission"
                />
              </Grid>
            )}
            {patient === 'In Patient' && (
              <Grid item xs={12} sm={6}>
                <BasicDatePicker
                  name="dischargeDate"
                  label="Date of Discharge"
                />
              </Grid>
            )}
          </Grid>

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={6}>
              <FormsHeaderText text={'Clinical Information'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GlobalCustomButton
                customStyles={{
                  float: 'right',
                }}
                text={'Add Complaint'}
                color="primary"
                variant="outlined"
                onClick={() => setOpenComplaint(true)}
              />
            </Grid>
          </Grid>
          <CustomTable
            title={''}
            columns={complaintSchema}
            data={dummyData}
            pointerOnHover
            highlightOnHover
            striped
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                my={1}
              >
                <FormsHeaderText text={'Clinical Findings'} />
                <GlobalCustomButton
                  customStyles={{
                    float: 'right',
                  }}
                  text={'Add Findings'}
                  color="primary"
                  variant="outlined"
                  onClick={() => setOpenFindings(true)}
                />
              </Box>
            </Grid>
          </Grid>
          <CustomTable
            title={''}
            columns={findingsSchema}
            data={dummyData2}
            pointerOnHover
            highlightOnHover
            striped
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                my={1}
              >
                <FormsHeaderText text={'Services / Products'} />
                <GlobalCustomButton
                  onClick={() => setShowServiceModal(true)}
                  color="primary"
                  variant="outlined"
                  text="Add Service"
                />
              </Box>
              <CustomTable
                title={''}
                columns={serviceSchema}
                data={dummyData3}
                pointerOnHover
                highlightOnHover
                striped
                //conditionalRowStyles={conditionalRowStyles}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Textarea
                placeholder="Type your message here"
                name="reason"
                type="text"
                label="Reason for Request"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <Input
                name="physicianName"
                label="Physician's Name"
                type="text"
              />
            </Grid>
          </Grid>
        </form>
      </div>
      {openComplaint && (
        <ModalBox
          open={openComplaint}
          onClose={() => setOpenComplaint(false)}
          header="Add Complaint"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Input name="complaints" label="Complaints" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input name="duration" label="Duration" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <GlobalCustomButton text={'Add'} color="success" />
            </Grid>
          </Grid>
        </ModalBox>
      )}
      {openFindings && (
        <ModalBox
          open={openFindings}
          onClose={() => setOpenFindings(false)}
          header="Add Findings"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <AutoCompleteBox
                label="Provisional Diagnosis"
                name="provisionalDiagnosis"
                options={[
                  { value: 'Fever', label: 'Fever' },
                  { value: 'Cough', label: 'Cough' },
                  { value: 'Headache', label: 'Headache' },
                  { value: 'Body Pain', label: 'Body Pain' },
                  { value: 'Diarrhea', label: 'Diarrhea' },
                  { value: 'Vomiting', label: 'Vomiting' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input label="Planned Procedure" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input label="Planned Service" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <GlobalCustomButton text={'Add'} color="success" />
            </Grid>
          </Grid>
        </ModalBox>
      )}
      {showServiceModal && (
        <ModalBox
          open={showServiceModal}
          onClose={() => setShowServiceModal(false)}
          header="Add Service / Product"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Input name="service" label="Service Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input name="quantity" label="Quantity" type="number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input name="unitPrice" label="Amount" type="text" />
            </Grid>
            <Grid item xs={12} md={12}>
              <Textarea label="Comments" name="comments" />
            </Grid>
            <Grid item xs={12} md={12}>
              <GlobalCustomButton text="Add Service" color="success" />
            </Grid>
          </Grid>
        </ModalBox>
      )}
    </>
  );
}

export function PreAuthorizationList({ showModal, setShowModal }) {
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
  const navigate = useNavigate();

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
      date: '10/11/2021',
      patient_name: 'John Doe',
      policy_id: '09JDLDJ',
      provider: 'Health Stack Africa',
      hia: 'Name of HIA',
      status: 'approved',
      reason: 'Reason for the request',
      emergency: '',
    },
    {
      date: '10/12/2022',
      patient_name: 'Albert Einstein',
      policy_id: 'KGJG9049',
      provider: 'Marigold Surulere',
      hia: 'Name of HIA',
      status: 'pending',
      reason: 'Reason for the request',
      emergency: '',
    },
    {
      date: '10/05/2021',
      patient_name: 'Donald Trump',
      policy_id: '9950DKKD',
      provider: 'Test Pharmacy',
      hia: 'Name of HIA',
      status: 'declined',
      reason: 'Reason for the request',
      emergency: '',
    },

    {
      date: '10/7/2022',
      patient_name: 'David Guitar',
      policy_id: '958500D',
      provider: 'This-That Clinic',
      hia: 'Name of HIA',
      status: 'ongoing',
      reason: 'Reason for the request',
      emergency: '',
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
      name: 'Date/Time',
      key: 'sn',
      description: 'Enter name of Disease',
      selector: (row, i) => row.date,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: "Patient's Name",
      key: 'clientname',
      description: 'Enter client name',
      selector: (row) => row.patient_name,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Policy ID',
      key: 'bills',
      description: 'Enter bills',
      selector: (row) => row.policy_id,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Provider',
      key: 'sn',
      description: 'Enter name of Disease',
      selector: (row, i) => row.provider,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'HIA',
      key: 'clientname',
      description: 'Enter client name',
      selector: (row) => row.hia,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Status',
      key: 'bills',
      description: 'Enter bills',
      selector: 'status',
      cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Emergency',
      key: 'bills',
      description: 'Enter bills',
      selector: (row) => row.emergency,
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
                    Pre-Authorization
                  </h2>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Filter By Date"
                    isClearable
                  />
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
export function PreAuthDetails({ showModal, setShowModal, standAlone }) {
  const [deny, setDeny] = useState(false);
  const [approve, setApprove] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState();
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const dummyData = [
    {
      item: 'Today',
      submittedQuantity: 1,
      submittedBill: 1000,
      payableQuantity: 1,
      payableBill: 1000,
      comments: 'Inline with agreement',
    },
  ];

  const serviceSchema = [
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
      name: 'item',
      key: 'item',
      description: 'Item',
      selector: (row) => row.item,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'QTY',
      key: 'submittedQuantity',
      description: 'Submitted QTY',
      selector: (row) => row.submittedQuantity,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Submitted Amount',
      key: 'submittedBill',
      description: 'Submitted Bill',
      selector: (row) => row.submittedBill,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Payable QTY',
      key: 'payableQuantity',
      description: 'Payable QTY',
      selector: (row) => row.payableQuantity,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Payable Amount',
      key: 'payableBill',
      description: 'Payable Bill',
      selector: (row) => row.payableBill,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Comments',
      key: 'comments',
      description: 'Comments',
      selector: (row) => row.comments,
      sortable: true,
      inputType: 'TEXT',
    },
  ];
  const handleRow = (row) => {
    setSelectedService(row);
    setShowServiceDetails(true);
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <div>
            <Box
              sx={{
                display: 'flex',
                marginTop: '1rem',
                justifyContent: 'space-between',
                alignItem: 'center',
              }}
            >
              <FormsHeaderText text={'Pre-Authorization Details - 13322BA'} />
              {!standAlone && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <GlobalCustomButton
                    text="Back"
                    onClick={() => setShowModal(0)}
                    color="warning"
                    customStyles={{ marginRight: '.8rem' }}
                  />
                  <GlobalCustomButton
                    onClick={() => setApprove(true)}
                    text="Approve"
                    color="success"
                    customStyles={{ marginRight: '.8rem' }}
                  />
                  <GlobalCustomButton
                    onClick={() => {}}
                    text="On Hold"
                    color="secondary"
                    customStyles={{ marginRight: '.8rem' }}
                  />
                  <GlobalCustomButton
                    onClick={() => setDeny(true)}
                    text="Reject"
                    color="error"
                    customStyles={{ marginRight: '.8rem' }}
                  />
                  <GlobalCustomButton
                    onClick={
                      currentPage === 1
                        ? () => setCurrentPage(2)
                        : () => setCurrentPage(1)
                    }
                    text={currentPage === 1 ? 'Task' : 'Details'}
                    variant="outlined"
                    customStyles={{ marginRight: '.8rem' }}
                  />
                  <Badge
                    badgeContent={4}
                    color="success"
                    sx={{ marginRight: '10px' }}
                  >
                    <GlobalCustomButton
                      onClick={() => setOpenDrawer(true)}
                      text="Chat"
                      color="primary"
                    />
                  </Badge>
                </Box>
              )}
            </Box>
            {currentPage === 1 && (
              <div
                style={{
                  marginTop: '10px',
                  border: '1px solid #8F8F8F',
                  width: '98%',
                  height: 'calc(100vh - 130px)',
                  overflow: 'auto',
                  padding: '1rem',
                }}
              >
                <p>Request Sent 08/05/2022 9:45pm</p>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <p>Hospital Name: Lagos State Clinic </p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Health Plan: Former sector plan</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Date of Admission: 23/06/2022</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Date of Discharge: 23/06/2022</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Capitation: Filed</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>Fee for Service: Applicable</p>
                  </Grid>
                </Grid>
                <FormsHeaderText text={'Pre-authorization Code - 13322BA'} />
                <McText txt={'Clinical Information'} />
                <Grid container spacing={2} mb={1}>
                  <Grid item xs={12}>
                    <p style={{ fontWeight: 'bold' }}>Presenting Complaints:</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </p>
                  </Grid>
                </Grid>

                <FormsHeaderText text={'Clinical Findings'} />
                <Grid container spacing={2} mb={1}>
                  <Grid item xs={12}>
                    <p style={{ fontWeight: 'bold' }}>
                      Provisional Diagonosis:
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </p>

                    <p style={{ fontWeight: 'bold' }}>
                      Planned Procedures / Services Requiring Authorization:
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </p>
                    <p style={{ fontWeight: 'bold' }}>
                      Planned Procedures / Services Requiring Authorization:
                    </p>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <p style={{ fontWeight: 'bold' }}>Reason for Request:</p>
                    <span
                      style={{
                        fontWeight: 'bold',
                        backgroundColor: '#ECF3FF',
                        color: '#0364FF',
                        padding: '.3rem',
                        marginRight: '1rem',
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
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <p style={{ fontWeight: 'bold' }}>Physician Name:</p>
                    <p>Dr. John Doe</p>
                    <p>Lagos State Hospital</p>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <FormsHeaderText text={'Services / Products'} />
                    <CustomTable
                      title={''}
                      columns={serviceSchema}
                      data={dummyData}
                      pointerOnHover
                      highlightOnHover
                      striped
                      onRowClicked={handleRow}
                      //conditionalRowStyles={conditionalRowStyles}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
            {currentPage === 2 && (
              <div style={{ marginTop: '1rem' }}>
                <CRMTasks />
              </div>
            )}
            {currentPage === 3 && <Policy standAlone />}
            {currentPage === 4 && <Beneficiary />}
            {currentPage === 5 && <Claims standAlone />}
            {currentPage === 6 && <PremiumPayment />}
          </div>
        </Grid>
      </Grid>
      {showServiceDetails && (
        <ModalBox
          open={showServiceDetails}
          onClose={() => setShowServiceDetails(false)}
        >
          <Box sx={{ width: '60vw' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              mb={2}
            >
              <GlobalCustomButton
                sx={{ marginRight: '15px' }}
                onClick={() => setOpenReview(true)}
              >
                Review
              </GlobalCustomButton>
              <GlobalCustomButton
                color="error"
                onClick={() => setDeny(true)}
                sx={{ marginRight: '15px' }}
              >
                Reject
              </GlobalCustomButton>
              <GlobalCustomButton color="success" text={'Save'} />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Input label={'Item'} value={selectedService?.item} disabled />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label={'QTY'}
                  value={selectedService?.submittedQuantity}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label={'Submitted Amount'}
                  value={selectedService?.submittedBill}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label={'Payable QTY'}
                  value={selectedService?.payableQuantity}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label={'Payable Amount'}
                  value={selectedService?.payableBill}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <Input label={'Comment'} />
              </Grid>
            </Grid>
          </Box>
        </ModalBox>
      )}
      {approve && (
        <>
          <ModalBox open={approve} onClose={() => setApprove(false)}>
            <form>
              <ModalHeader text={`Approve Claim  13229-BA`} />
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Textarea label={'Comment'} />
                </Grid>
                <Grid item xs={12}>
                  <GlobalCustomButton text={'Approve'} color="success" />
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

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Textarea label={'Comment'} />
                </Grid>
                <Grid item xs={12}>
                  <GlobalCustomButton text={'Reject'} color="error" />
                </Grid>
              </Grid>
            </form>
          </ModalBox>
        </>
      )}
      {openReview && (
        <ModalBox open={openReview} onClose={() => setOpenReview(false)}>
          <FormsHeaderText text={'Review Service / Product'} />
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Input
                label="Unit Price"
                type="number"
                onChange={(e) => {
                  setUnitPrice(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Quantity"
                type="number"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Total Amount"
                type="number"
                value={unitPrice * quantity}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <GlobalCustomButton
                text={'Save'}
                color="success"
                customStyles={{ marginRight: '.8rem' }}
              />
              <GlobalCustomButton text={'Cancel'} color="error" />
            </Grid>
          </Grid>
        </ModalBox>
      )}
      <Drawer
        open={openDrawer}
        sx={{
          width: 'fit-content',
          // height: 'fit-content',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 'fit-content',
            // height: 'fit-content',
          },
        }}
        variant="persistent"
        anchor="right"
      >
        <Box
          sx={{
            width: '25vw',
            height: '100vh',
            overflowY: 'hidden',
          }}
        >
          <ChatInterface closeChat={() => setOpenDrawer(false)} />
        </Box>
      </Drawer>
    </>
  );
}
