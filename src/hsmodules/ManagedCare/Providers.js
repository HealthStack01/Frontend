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
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';
import {
  Box,
  Grid,
  Button as MuiButton,
  TextField,
  IconButton,
  Badge,
  Drawer,
  Typography,
} from '@mui/material';
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
import { generalData } from './accData';
import Accreditation from './Accreditation';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import CRMTasks from '../CRM/Tasks';
import ChatInterface from '../../components/chat/ChatInterface';
import { UploadView } from './components/ProviderView';
import { additionalInformationData } from '../CRM/components/lead/data';
import AdditionalInformationCard, {
  CreateAdditionalInfo,
} from '../CRM/components/lead/AdditionalInfo';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Beneficiary from './Beneficiary';
import Claims from './Claims';
import GeneralAppointments, { PreAuthorizationList } from './PreAuth';

// eslint-disable-next-line
const searchfacility = {};

export default function Provider({ standAlone }) {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);
  return (
    <>
      <section className="section remPadTop">
        {showModal === 0 && (
          <ProviderList showModal={showModal} setShowModal={setShowModal} />
        )}
        {showModal === 1 && (
          <ModalBox
            open={showModal}
            onClose={() => setShowModal(0)}
            header="Register Provider"
          >
            <OrganizationCreate setShowModal={() => setShowModal(0)} />
          </ModalBox>
        )}
        {showModal === 2 && <OrganizationDetail setShowModal={setShowModal} />}
        {/* {showModal === 3 && (
          <ModalBox open={showModal} onClose={() => setShowModal(false)}>
            <NewOrganizationCreate />
          </ModalBox>
        )} */}
      </section>
    </>
  );
}

export function AppointmentCreate({ showModal, setShowModal }) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ModalHeader text={'Create Appointment'} />
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

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ClientSearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <LocationSearch
                getSearchfacility={getSearchfacility1}
                clear={success1}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <EmployeeSearch
                getSearchfacility={getSearchfacility2}
                clear={success2}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="field ml-3 ">
                {/* <label className= "mr-2 "> <b>Modules:</b></label> */}
                {appClass.map((c, i) => (
                  <label
                    className=" is-small"
                    key={c}
                    style={{ fontSize: '16px', fontWeight: 'bold' }}
                  >
                    <input
                      type="radio"
                      value={c}
                      name="appointmentClass"
                      {...register('appointmentClass', { required: true })}
                      style={{
                        border: '1px solid #0364FF',
                        transform: 'scale(1.5)',
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
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <div className="field">
                <input
                  name="start_time"
                  {...register('start_time', { required: true })}
                  type="datetime-local"
                  style={{
                    border: '1px solid #0364FF',
                    padding: '1rem',
                    color: ' #979DAC',
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <select
                name="type"
                value={type}
                onChange={handleChangeType}
                style={{
                  border: '1px solid #0364FF',
                  padding: '1rem',
                  color: ' #979DAC',
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
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <select
                name="appointment_status"
                value={appointment_status}
                onChange={handleChangeStatus}
                style={{
                  border: '1px solid #0364FF',
                  padding: '1rem',
                  color: ' #979DAC',
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
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <textarea
                className="input is-small"
                name="appointment_reason"
                {...register('appointment_reason', { required: true })}
                type="text"
                placeholder="Appointment Reason"
                rows="10"
                cols="50"
                style={{
                  border: '1px solid #0364FF',
                  padding: '1rem',
                  color: ' #979DAC',
                  width: '100%',
                }}
              >
                {' '}
              </textarea>
            </Grid>
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
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="button"
                onClick={(e) => e.target.reset()}
                style={{
                  backgroundColor: '#ffffff',
                  width: '100%',
                  color: '#0364FF',
                  border: '1px solid #0364FF',
                  cursor: 'pointer',
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
export function OrganizationCreate({ showModal, setShowModal }) {
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
    if (band === '') {
      toast.error('Band not selected, Please select band');
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
        setSuccess(true);
        toast.success('Organization added succesfully');
        setSuccess(false);
        setBand('');
      })
      .catch((err) => {
        toast.error('Error adding organization ' + err);
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

  return (
    <>
      <FacilitySearch
        getSearchfacility={getSearchfacility}
        clear={success}
        closeModal={setShowModal}
      />
      <select
        name="bandType"
        value={band}
        onChange={(e) => handleChangeMode(e)}
        className="selectadd"
        style={{
          width: '100%',
          padding: '1rem',
          margin: '1rem 0',
          borderRadius: '4px',
          cursor: 'pointer',
          border: '1px solid rgba(0, 0, 0, 0.6)',
        }}
      >
        <option value="">
          {user.currentEmployee.facilityDetail.facilityType === 'HMO'
            ? 'Choose Provider Band'
            : 'Choose Company Band'}{' '}
        </option>
        {providerBand.map((option, i) => (
          <option key={i} value={option.name}>
            {' '}
            {option.name}
          </option>
        ))}
      </select>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Button label="Add" type="submit" onClick={handleClick} />
        </Grid>
      </Grid>
    </>
  );
}

export function ProviderList({ showModal, setShowModal, standAlone }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const facilityServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  //const history = useHistory()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);

  const handleCreateNew = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    setShowModal(1);
  };
  const handleRow = async (facility) => {
    await setSelectedFacility(facility.organizationDetail);
    const newfacilityModule = {
      selectedFacility: facility,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    setShowModal(2);
  };

  const handleSearch = (val) => {
    const field = 'facilityName';
    console.log(val);
    if (val.length > 0) {
      orgServ
        .find({
          query: {
            /* [field]: {
                    $regex:val,
                    $options:'i'
                   
                }, */
            facility: user.currentEmployee.facilityDetail._id,
            $search: val,
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log(res);
          setFacilities(res.data);
          setMessage(' Organization  fetched successfully');
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setMessage('Error creating facility, probable network issues ' + err);
          setError(true);
        });
    } else {
      getFacilities();
    }
  };

  /*  if (val.length>2){
                console.log("in")
               
            }

        }
     */
  const getFacilities = () => {
    orgServ
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(' Organization  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        setMessage('Error creating facility, probable network issues ' + err);
        setError(true);
      });
  };

  useEffect(() => {
    getFacilities();

    orgServ.on('created', (obj) => getFacilities());
    orgServ.on('updated', (obj) => getFacilities());
    orgServ.on('patched', (obj) => getFacilities());
    orgServ.on('removed', (obj) => getFacilities());
    return () => {};
  }, []);

  const providerSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Organization Name',
      key: 'organizationName',
      description: 'Organization Name',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail?.facilityName,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Band',
      key: 'band',
      description: 'Band',
      selector: (row) => row?.hasOwnProperty('organizationDetail') && row?.band,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Address',
      key: 'address',
      description: 'Address',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail?.facilityAddress,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'City',
      key: 'city',
      description: 'City',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityCity,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Phone',
      key: 'phone',
      description: 'Phone',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityContactPhone,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Email',
      key: 'email',
      description: 'Email',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityEmail,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Type',
      key: 'type',
      description: 'Type',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityType,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Category',
      key: 'category',
      description: 'Category',
      selector: (row) =>
        row?.hasOwnProperty('organizationDetail') &&
        row?.organizationDetail.facilityCategory,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];
  console.log('Facilities', facilities);
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
                </div>

                <div>
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
              </TableMenu>
              <CustomTable
                title={''}
                columns={providerSchema}
                data={facilities.filter((item) => item.organizationDetail)}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                //conditionalRowStyles={conditionalRowStyles}
              />
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function OrganizationDetail({ showModal, setShowModal }) {
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const facilityServ=client.service('/facility')
  //const history = useHistory()
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);
  const [confirmActivate, setConfirmActivate] = useState(false);
  const [display, setDisplay] = useState(1);
  const [addBank, setAddBank] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const facility = state.facilityModule.selectedFacility;

  const handleAcc = async () => {
    // const newfacilityModule = {
    //   selectedFacility: facility,
    //   show: 'modify',
    // };
    // await setState((prevstate) => ({
    //   ...prevstate,
    //   facilityModule: newfacilityModule,
    // }));
    // //console.log(state)
    setShowModal(3);
  };
  const closeForm = async () => {
    // const newfacilityModule = {
    //   selectedFacility: facility,
    //   show: 'create',
    // };
    // await setState((prevstate) => ({
    //   ...prevstate,
    //   facilityModule: newfacilityModule,
    // }));
    // console.log('close form');
    setShowModal(0);
  };
  const onSubmit = (data, e) => {
    e.preventDefault();

    //  console.log(data);

    //  setSuccess(false);

    //  ClientServ.patch(Client._id, data)
    //    .then((res) => {
    //      toast("Client updated succesfully");
    //      changeState();
    //      closeDetailModal();
    //    })
    //    .catch((err) => {
    //      toast(`Error updating Client, probable network issues or ${err}`);
    //    });
  };
  const handleApprove = () => {
    toast.success('St.Nicholas Hospital has been approved');
    setApprove(false);
  };
  const handleReject = () => {
    toast.error('St.Nicholas Hospital has been rejected');
    setReject(false);
  };
  const handleDeactivate = () => {
    toast.info('St.Nicholas Hospital has been deactivated');
    setIsDeactivated(true);
    setConfirmDeactivate(false);
  };
  const handleActivate = () => {
    toast.info('St.Nicholas Hospital has been activated');
    setIsDeactivated(false);
    setConfirmActivate(false);
  };
  const bankData = [
    {
      bank_name: 'Access Bank',
      account_name: 'St.Nicholas Hospital',
      account_number: '1234567890',
      branch: 'Lagos Island',
      sort_code: '123456',
    },
    {
      bank_name: 'First Bank',
      account_name: 'St.Nicholas Hospital',
      account_number: '1234567890',
      branch: 'Banana Island',
      sort_code: '123456',
    },
  ];
  const bankColumns = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Bank Name',
      key: 'bank_name',
      description: 'Bank Name',
      selector: (row) => row.bank_name,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Account Name',
      key: 'account_name',
      description: 'Account Name',
      selector: (row) => row.account_name,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Account Number',
      key: 'account_number',
      description: 'Account Number',
      selector: (row) => row.account_number,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Branch',
      key: 'branch',
      description: 'Branch',
      selector: (row) => row.branch,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Sort Code',
      key: 'sort_code',
      description: 'Sort Code',
      selector: (row) => row.sort_code,
      sortable: true,
      inputType: 'TEXT',
    },
    isEdit && {
      name: 'Del',
      width: '50px',
      center: true,
      key: 'contact_email',
      description: 'Enter Date',
      selector: (row) => (
        <IconButton onClick={() => action(row)} color="error">
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
  ];
  return (
    <>
      <Box
        sx={{
          width: '98%',
          margin: '0 1rem',
        }}
      >
        <FormsHeaderText text={'Provider Details'} />
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
            text="Back"
            onClick={() => setShowModal(0)}
            color="warning"
            customStyles={{ marginRight: '10px' }}
          />
          {!isEdit && (
            <GlobalCustomButton
              text="Edit"
              onClick={() => {
                setIsEdit(true), setDisplay(1);
              }}
              color="secondary"
              customStyles={{ marginRight: '10px' }}
            />
          )}
          <GlobalCustomButton
            text="Accreditation"
            onClick={() => setDisplay(2)}
            color="primary"
            customStyles={{ marginRight: '10px' }}
          />
          {isEdit && (
            <>
              <GlobalCustomButton
                text="Approve"
                onClick={() => setApprove(true)}
                color="success"
                customStyles={{ marginRight: '10px' }}
              />
              <GlobalCustomButton
                text="Reject"
                onClick={() => setReject(true)}
                color="error"
                customStyles={{ marginRight: '10px' }}
                variant="outlined"
              />
              <GlobalCustomButton
                text={isDeactivated ? 'Activate' : 'Deactivate'}
                onClick={
                  isDeactivated
                    ? () => setConfirmActivate(true)
                    : () => setConfirmDeactivate(true)
                }
                color={isDeactivated ? 'success' : 'error'}
                customStyles={{ marginRight: '10px' }}
              />
            </>
          )}
          <GlobalCustomButton
            onClick={display === 1 ? () => setDisplay(3) : () => setDisplay(1)}
            text={display === 1 ? 'Task' : 'Details'}
            variant="outlined"
            customStyles={{ marginRight: '.8rem' }}
          />
          <GlobalCustomButton
            text="Upload"
            onClick={() => setDisplay(4)}
            color="success"
            customStyles={{ marginRight: '10px' }}
          />
          <GlobalCustomButton
            onClick={() => setDisplay(5)}
            text="Beneficiary"
            customStyles={{ marginRight: '.8rem' }}
          />
          <GlobalCustomButton
            color="warning"
            onClick={() => setDisplay(6)}
            text="Claims"
            customStyles={{ marginRight: '.8rem' }}
          />
          <GlobalCustomButton
            color="secondary"
            onClick={() => setDisplay(7)}
            text="Pre-Auth"
            customStyles={{ marginRight: '.8rem' }}
          />
          <Badge badgeContent={4} color="success" sx={{ marginRight: '10px' }}>
            <GlobalCustomButton
              onClick={() => setOpenDrawer(true)}
              text="Chat"
              color="primary"
            />
          </Badge>
        </Box>
        {display === 1 && (
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Input
                          register={register('facilityName')}
                          label="Hospital Name"
                          value={facility?.organizationDetail?.facilityName}
                          disabled={!isEdit}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          register={register('facilityAddress')}
                          label="Address"
                          value={facility?.organizationDetail?.facilityAddress}
                          disabled={!isEdit}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          register={register('facilityCity')}
                          label="City"
                          value={facility?.organizationDetail?.facilityCity}
                          disabled={!isEdit}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          register={register('facilityContactPhone')}
                          label="Phone"
                          value={
                            facility?.organizationDetail?.facilityContactPhone
                          }
                          disabled={!isEdit}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          register={register('facilityEmail')}
                          label="Email"
                          value={facility?.organizationDetail?.facilityEmail}
                          disabled={!isEdit}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          register={register('facilityOwner')}
                          label="CEO"
                          value={facility?.organizationDetail?.facilityOwner}
                          disabled={!isEdit}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          register={register('facilityType')}
                          label="Type"
                          value={facility?.organizationDetail?.facilityType}
                          disabled={!isEdit}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          register={register('facilityCategory')}
                          label="Category"
                          value={facility?.organizationDetail?.facilityCategory}
                          disabled={!isEdit}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          register={register('bandType')}
                          label="Band"
                          value={facility?.band}
                          disabled={!isEdit}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <FormsHeaderText text="Bank Details" />
                        {isEdit && (
                          <GlobalCustomButton
                            text="Add Bank"
                            onClick={() => setAddBank(true)}
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} mt={1}>
                      <CustomTable
                        title={''}
                        columns={bankColumns}
                        data={bankData}
                        pointerOnHover
                        highlightOnHover
                        striped
                      />
                    </Grid>
                    {isEdit && (
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'left',
                        }}
                        mt={2}
                      >
                        <GlobalCustomButton
                          text="Save"
                          onClick={() => handleSubmit(onSubmit)}
                          color="success"
                          customStyles={{ marginRight: '10px' }}
                        />
                        <GlobalCustomButton
                          text="Cancel"
                          onClick={() => setIsEdit(false)}
                          color="warning"
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <AdditionalInformationView />
                </Grid>
              </Grid>
              {/* <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <FormsHeaderText text="Bank Details" />
                    {isEdit && (
                      <GlobalCustomButton
                        text="Add Bank"
                        onClick={() => setAddBank(true)}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <CustomTable
                    title={''}
                    columns={bankColumns}
                    data={bankData}
                    pointerOnHover
                    highlightOnHover
                    striped
                  />
                </Grid>
              </Grid> */}
            </form>
            {approve && (
              <ModalBox open onClose={() => setApprove(false)}>
                <p style={{ textAlign: 'center' }}>
                  <FormsHeaderText
                    text={`Are you sure you want to approve "St.Nicholas Hospital"?"`}
                  />
                </p>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  mt={2}
                >
                  <GlobalCustomButton
                    text="Yes"
                    onClick={() => handleApprove()}
                    color="success"
                    customStyles={{ marginRight: '10px' }}
                  />
                  <GlobalCustomButton
                    text="No"
                    onClick={() => setApprove(false)}
                    color="error"
                  />
                </Box>
              </ModalBox>
            )}
            {reject && (
              <ModalBox open onClose={() => setReject(false)}>
                <p style={{ textAlign: 'center' }}>
                  <FormsHeaderText
                    text={`Are you sure you want to reject "St.Nicholas Hospital"?"`}
                  />
                </p>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  mt={2}
                >
                  <GlobalCustomButton
                    text="Yes"
                    onClick={() => handleReject()}
                    color="error"
                    customStyles={{ marginRight: '10px' }}
                  />
                  <GlobalCustomButton
                    text="No"
                    onClick={() => setReject(false)}
                    color="warning"
                  />
                </Box>
              </ModalBox>
            )}
            {confirmDeactivate && (
              <ModalBox open onClose={() => setConfirmDeactivate(false)}>
                <p style={{ textAlign: 'center' }}>
                  <FormsHeaderText
                    text={`Are you sure you want to deactivate "St.Nicholas Hospital"?"`}
                  />
                </p>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  mt={2}
                >
                  <GlobalCustomButton
                    text="Yes"
                    onClick={() => handleDeactivate()}
                    color="error"
                    customStyles={{ marginRight: '10px' }}
                  />
                  <GlobalCustomButton
                    text="No"
                    onClick={() => setConfirmDeactivate(false)}
                    color="warning"
                  />
                </Box>
              </ModalBox>
            )}
            {confirmActivate && (
              <ModalBox open onClose={() => setConfirmDeactivate(false)}>
                <p style={{ textAlign: 'center' }}>
                  <FormsHeaderText
                    text={`Are you sure you want to Activate "St.Nicholas Hospital"?"`}
                  />
                </p>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  mt={2}
                >
                  <GlobalCustomButton
                    text="Yes"
                    onClick={() => handleActivate()}
                    color="success"
                    customStyles={{ marginRight: '10px' }}
                  />
                  <GlobalCustomButton
                    text="No"
                    onClick={() => setConfirmActivate(false)}
                    color="warning"
                  />
                </Box>
              </ModalBox>
            )}
            {addBank && (
              <ModalBox
                open
                onClose={() => setAddBank(false)}
                header="Add Bank"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input register={register('bankName')} label="Bank Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      register={register('accountName')}
                      label="Account Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      register={register('accountNumber')}
                      label="Account Number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input register={register('bankBranch')} label="Branch" />
                  </Grid>
                  <Grid item xs={12}>
                    <Input register={register('bankCode')} label="Sort Code" />
                  </Grid>
                  <Grid item xs={12}>
                    <GlobalCustomButton
                      text="Save"
                      onClick={() => toast.success('Bank Added Successfully')}
                      color="success"
                    />
                  </Grid>
                </Grid>
              </ModalBox>
            )}
          </Box>
        )}
        {display === 2 && <Accreditation />}
        {display === 3 && <CRMTasks />}
        {display === 4 && <UploadView />}
        {display === 5 && <Beneficiary />}
        {display === 6 && <Claims />}
        {display === 7 && <PreAuthorizationList />}
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
      </Box>
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

  const handleRemoveClick = (index, type) => {
    switch (type) {
      case 1:
        const list = [...selectDiv];
        list.splice(index, 1);
        setSelectDiv(list);
        break;
      case 2:
        const list2 = [...selectDiv2];
        list2.splice(index, 1);
        setSelectDiv2(list2);
        break;
      case 3:
        const list3 = [...selectDiv3];
        list3.splice(index, 1);
        setSelectDiv3(list3);
        break;
      case 4:
        const list4 = [...selectDiv4];
        list4.splice(index, 1);
        setSelectDiv4(list4);
        break;
      case 5:
        const list5 = [...selectDiv5];
        list5.splice(index, 1);
        setSelectDiv5(list5);
        break;
      case 6:
        const list6 = [...selectDiv6];
        list6.splice(index, 1);
        setSelectDiv6(list6);
        break;
      case 7:
        const list7 = [...selectDiv7];
        list7.splice(index, 1);
        setSelectDiv7(list7);
        break;
      case 8:
        const list8 = [...selectDiv8];
        list8.splice(index, 1);
        setSelectDiv8(list8);
        break;
      case 9:
        const list9 = [...selectDiv9];
        list9.splice(index, 1);
        setSelectDiv9(list9);
        break;
      case 10:
        const list10 = [...selectDiv10];
        list10.splice(index, 1);
        setSelectDiv10(list10);
        break;
      case 11:
        const list11 = [...selectDiv11];
        list11.splice(index, 1);
        setSelectDiv11(list11);
        break;
      case 12:
        const list12 = [...selectDiv12];
        list12.splice(index, 1);
        setSelectDiv12(list12);
        break;
      case 13:
        const list13 = [...selectDiv13];
        list13.splice(index, 1);
        setSelectDiv13(list13);
        break;
      case 21:
        const list21 = [...nonMedDiv];
        list21.splice(index, 1);
        setNonMedDiv(list21);
        break;
      case 22:
        const list22 = [...nonMedDiv2];
        list22.splice(index, 1);
        setNonMedDiv2(list22);
        break;
      case 23:
        const list23 = [...nonMedDiv3];
        list23.splice(index, 1);
        setNonMedDiv3(list23);
        break;
      case 24:
        const list24 = [...nonMedDiv4];
        list24.splice(index, 1);
        setNonMedDiv4(list24);
        break;
      case 25:
        const list25 = [...nonMedDiv5];
        list25.splice(index, 1);
        setNonMedDiv5(list25);
        break;
      case 26:
        const list26 = [...nonMedDiv6];
        list26.splice(index, 1);
        setNonMedDiv6(list26);
        break;
      case 27:
        const list27 = [...nonMedDiv7];
        list27.splice(index, 1);
        setNonMedDiv7(list27);
        break;
      case 28:
        const list28 = [...nonMedDiv8];
        list28.splice(index, 1);
        setNonMedDiv8(list28);
        break;
      default:
        break;
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
  ];

  const handleFormToDisplay = (number) => {
    switch (number) {
      case 1:
        setShowArray(generalData);
        console.log('showarray', showArray);
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
            {generalOutlook.map((item, index) => (
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
                      setShowScore(index + 1), handleFormToDisplay(item.value);
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
                        <Grid item xs={12} sm={5}>
                          <FormsHeaderText text="FINDINGS" />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <FormsHeaderText text="INSPECTION PARAMETERS " />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <FormsHeaderText text="1 = Low, 5 = High" />
                        </Grid>
                      </Grid>
                      {showArray.map((item, index) => (
                        <>
                          <Grid container spacing={2} my={1} key={index}>
                            <Grid item xs={12} sm={5}>
                              <Input value={item.finding} disabled />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <Input value={item.parameter} disabled />
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
            <McText txt={'NON-MEDICAL STAFF'} type={'p'} bold={700} />
          </div>
        </>
      )}
      {currentPage === 4 && (
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
            <McText
              txt={
                'GENERAL OBSERVATIONS BY HMO REPRESENTATIVE / ASSESSMENT OFFICER'
              }
              type={'p'}
              bold={700}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <Input
                  label={'Observations'}
                  register={register('observations')}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
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
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <McText txt={'Signature'} type={'p'} />
                <Input register={register('signature')} />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <Input
                  label={'Provider Representative Name'}
                  register={register('name')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Input
                  label={'Designation'}
                  register={register('designation')}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <Input label={'Phone'} register={register('phone')} />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <BasicDatePicker label={'Date'} register={register('date')} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <McText txt={'Signature'} type={'p'} />
                <Input label={'Signature'} register={register('signature')} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <McText txt={'FOR OFFICIAL USE'} type={'p'} bold={700} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={12}>
                <Input
                  label={`Med. Officer's Review of Credentials`}
                  register={register('name')}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <Input label={'A Approve'} register={register('name')} />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={'B Deny Outrightly'}
                  register={register('name')}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <McText txt={'Signature'} type={'p'} />
                <Input register={register('signature')} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Button
                  label={'Cancel'}
                  onClick={() => setCurrentPage(0)}
                  fullwidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type={'submit'}
                  label={'Submit'}
                  onClick={() => handleClick()}
                  fullwidth
                />
              </Grid>
            </Grid>
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

export const AdditionalInformationView = () => {
  const [createModal, setCreateModal] = useState(false);
  const [informations, setInformations] = useState([
    ...additionalInformationData,
  ]);

  const removeAdditionalInfo = (info) => {
    setInformations((prev) => prev.filter((item) => item._id !== info._id));
  };

  const addNewInfo = (data) => {
    setInformations((prev) => [data, ...prev]);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
        }}
        mb={2}
      >
        <FormsHeaderText text="Additional Information" />

        <GlobalCustomButton onClick={() => setCreateModal(true)}>
          <AddCircleOutlineOutlinedIcon sx={{ mr: '5px' }} fontSize="small" />{' '}
          Add Information
        </GlobalCustomButton>
      </Box>

      <Box>
        {informations.length > 0 ? (
          informations.map((info, index) => (
            <Box sx={{ mb: 2 }}>
              <AdditionalInformationCard
                data={info}
                action={() => removeAdditionalInfo(info)}
                key={index}
              />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
              You've not added any information
            </Typography>
          </Box>
        )}
      </Box>

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Add New Information"
      >
        <CreateAdditionalInfo
          closeModal={() => setCreateModal(false)}
          addInfo={addNewInfo}
        />
      </ModalBox>
    </Box>
  );
};
