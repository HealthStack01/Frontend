import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import FacilityAccount from './Preauthorization';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import FilterMenu from '../../components/utilities/FilterMenu';
import ModalBox from './modal/index';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { Box, Grid, Typography } from '@mui/material';
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
// eslint-disable-next-line
const searchfacility = {};

export default function ReferralsCollections() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedInventory, setSelectedInventory] = useState();
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="section remPadTop">
      <CollectionList showModal={showModal} setShowModal={setShowModal} />
      {showModal && (
        <ModalBox open={showModal} setOpen={setShowModal}>
          <CollectionCreate showModal={showModal} setShowModal={setShowModal} />
        </ModalBox>
      )}
    </section>
  );
}

export function CollectionCreate({ showModal, setShowModal }) {
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
      <div className="card ">
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

          <McText
            txt={'Patient Information'}
            color={'#0064CC'}
            type={'p'}
            bold={'700'}
            size={'18px'}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Input name="patientname" label="Patient Name" type="text" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RadioButton
                name="gender"
                title="Gender"
                options={[
                  {
                    label: 'Male',
                    value: 'male',
                  },
                  {
                    label: 'Female',
                    value: 'female',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="address" label="Address" type="text" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Input
                name="healthCareProvider"
                label="Health Care Provider"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="preAuthId" label="Pre-auth ID" type="text" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="claimId" label="Claim ID" type="text" />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <BasicDateTimePicker
                name="dateOfRequest"
                label="Date of Request"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RadioButton
                name="emergency"
                title="Emergency"
                options={[
                  {
                    label: 'Yes',
                    value: 'yes',
                  },
                  {
                    label: 'No',
                    value: 'no',
                  },
                ]}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={6}>
              <McText
                txt={'Clinical Information'}
                color={'#0064CC'}
                type={'p'}
                bold={'700'}
                size={'18px'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="complaints"
                label="Complaints"
                options={CustomSelectData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="duration"
                label="Duration"
                options={CustomSelectData}
              />
            </Grid>
          </Grid>

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

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="provisionalDiagnosis"
                label="Provisional Diagnosis"
                options={CustomSelectData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="plannedDiagnosis"
                label="Planned Procedure"
                options={CustomSelectData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>

          <Grid container spacing={2} my={1}>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="plannedService"
                label="Planned Service"
                options={CustomSelectData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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

export function ClientAccount() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState([]);
  const InventoryServ = client.service('subwallettransactions');
  const SubwalletServ = client.service('subwallet');

  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [balance, setBalance] = useState(0);

  const clientSel = state.SelectedClient.client;
  const getSearchfacility = (obj) => {
    /*   
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  /*  useEffect(()=>{
        //setFacility(user.activeInventory.FacilityId)//
      if (!user.stacker){
          console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    }) */

  useEffect(() => {
    getaccountdetails();
    getBalance();
    return () => {};
  }, [clientSel]);

  const getaccountdetails = () => {
    InventoryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        client: clientSel.client,
        // storeId:state.StoreModule.selectedStore._id,
        // category:"credit",

        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacility(res.data);
        //e.target.reset();
        /*  setMessage("Created Inventory successfully") */
        // setSuccess(true)
        toast({
          message: 'Account details succesful',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
        // setSuccess(false)
      })
      .catch((err) => {
        toast({
          message: 'Error getting account details ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const getBalance = async () => {
    const findProductEntry = await SubwalletServ.find({
      query: {
        client: clientSel.client,
        organization: user.currentEmployee.facilityDetail._id,
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });
    console.log(findProductEntry);

    // console.log("balance", findProductEntry.data[0].amount)
    if (findProductEntry.data.length > 0) {
      await setBalance(findProductEntry.data[0].amount);
    } else {
      await setBalance(0);
    }

    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
  };

  return (
    <>
      <div className="card cardheight">
        <div className="card-header">
          <p className="card-header-title">
            Account Details: {facility[0]?.fromName}
          </p>
          <button className="button is-success is-small btnheight mt-2">
            Current Balance: N {balance}
          </button>
        </div>
        <div className="card-content ">
          {/*  <div className="level"> vscrollable
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Inventory  Module</span></div>
            </div> */}
          <div className="columns ">
            <div className="column is-6 ">
              <div className="card cardht80">
                <div className="card-header">
                  <p className="card-header-title">Credit</p>
                </div>
                <div className="card-content vscrollable mx-0.5">
                  <div className="table-container pullup ">
                    <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable mx-0.5">
                      <thead>
                        <tr>
                          <th>
                            <abbr title="Serial No">S/No</abbr>
                          </th>
                          <th>
                            <abbr title="Cost Price">Date</abbr>
                          </th>
                          <th>
                            <abbr title="Quantity">Amount</abbr>
                          </th>
                          <th>
                            <abbr title="Base Unit">Mode</abbr>
                          </th>
                          {/*  <th><abbr title="Stock Value">Stock Value</abbr></th>
                                         
                                        <th><abbr title="Selling Price">Selling Price</abbr></th>
                                        <th><abbr title="Re-Order Level">Re-Order Level</abbr></th>
                                        <th><abbr title="Expiry">Expiry</abbr></th> 
                                        <th><abbr title="Actions">Actions</abbr></th> */}
                        </tr>
                      </thead>
                      <tfoot></tfoot>
                      <tbody>
                        {facility.map((Inventory, i) => (
                          <>
                            {Inventory.category === 'credit' && (
                              <tr key={Inventory._id}>
                                <th>{i + 1}</th>
                                <td>
                                  {new Date(Inventory.createdAt).toLocaleString(
                                    'en-GB'
                                  )}
                                </td>{' '}
                                {/*add time  */}
                                <td>{Inventory.amount}</td>
                                <td>{Inventory.paymentmode}</td>
                                {/* <td>{Inventory.stockvalue}</td>
                                            <td>{Inventory.costprice}</td>
                                            <td>{Inventory.sellingprice}</td>
                                            <td>{Inventory.reorder_level}</td> 
                                            <td>{Inventory.expiry}</td>
                                            <td><span   className="showAction"  >...</span></td> */}
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-6 ">
              <div className="card cardht80">
                <div className="card-header">
                  <p className="card-header-title">Debit</p>
                </div>
                <div className="card-content vscrollable mx-0.5">
                  <div className="table-container pullup ">
                    <table className="table is-striped is-narrow is-hoverable  is-scrollable mx-0.5">
                      <thead>
                        <tr>
                          <th>
                            <abbr title="Serial No">S/No</abbr>
                          </th>
                          <th>
                            <abbr title="Cost Price">Date</abbr>
                          </th>
                          <th>
                            <abbr title="Description">Description</abbr>
                          </th>

                          <th>
                            <abbr title="Quantity">Amount</abbr>
                          </th>
                          <th>
                            <abbr title="Base Unit">Mode</abbr>
                          </th>
                          {/*  <th><abbr title="Stock Value">Stock Value</abbr></th>
                                         
                                        <th><abbr title="Selling Price">Selling Price</abbr></th>
                                        <th><abbr title="Re-Order Level">Re-Order Level</abbr></th>
                                        <th><abbr title="Expiry">Expiry</abbr></th> 
                                        <th><abbr title="Actions">Actions</abbr></th> */}
                        </tr>
                      </thead>
                      <tfoot></tfoot>
                      <tbody>
                        {facility.map((Inventory, i) => (
                          <>
                            {Inventory.category === 'debit' && (
                              <tr key={Inventory._id}>
                                <th>{i + 1}</th>
                                <td>
                                  {new Date(Inventory.createdAt).toLocaleString(
                                    'en-GB'
                                  )}
                                </td>{' '}
                                {/*add time  */}
                                <th>{Inventory.description}</th>
                                <td>{Inventory.amount}</td>
                                <td>{Inventory.paymentmode}</td>
                                {/* <td>{Inventory.stockvalue}</td>
                                            <td>{Inventory.costprice}</td>
                                            <td>{Inventory.sellingprice}</td>
                                            <td>{Inventory.reorder_level}</td> 
                                            <td>{Inventory.expiry}</td>
                                            <td><span   className="showAction"  >...</span></td> */}
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function CollectionList({ showModal, setShowModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const InventoryServ = client.service('subwallettransactions');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoadig] = useState(false);

  // eslint-disable-next-line
  const [selectedInventory, setSelectedInventory] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);

  const handleCreateNew = async () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
    setShowModal(true);
  };

  const handleRow = async (Inventory) => {
    //console.log("b4",state)

    //console.log("handlerow",Inventory)

    await setSelectedInventory(Inventory);

    const newInventoryModule = {
      client: Inventory,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      SelectedClient: newInventoryModule,
    }));
    //console.log(state)
  };

  const handleSearch = (val) => {
    const field = 'fromName';
    console.log(val);
    InventoryServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: 'i',
        },
        facility: user.currentEmployee.facilityDetail._id || '',
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        //console.log(res)
        setFacilities(res.data);
        /* setMessage(" Inventory  fetched successfully")
                setSuccess(true)  */
      })
      .catch((err) => {
        console.log(err);
        toast({
          message: 'Error during search ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const DAY_MS = 30 * 24 * 60 * 60 * 1000;
      const findInventory = await InventoryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          // storeId:state.StoreModule.selectedStore._id,
          category: 'credit',
          createdAt: {
            $gt: new Date().getTime() - DAY_MS, //last 30days
          },
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findInventory.data);
    } else {
      if (user.stacker) {
        const findInventory = await InventoryServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findInventory.data);
      }
    }
    /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Inventory  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Inventory, probable network issues "+ err )
                    setError(true)
                }) */
  };

  useEffect(() => {
    console.log(facilities);
    //getFacilities(user)

    return () => {};
  }, [facilities]);

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    InventoryServ.on('created', (obj) => getFacilities());
    InventoryServ.on('updated', (obj) => getFacilities());
    InventoryServ.on('patched', (obj) => getFacilities());
    InventoryServ.on('removed', (obj) => getFacilities());
    return () => {};
  }, []);

  useEffect(() => {
    getFacilities();
    return () => {};
  }, [state.StoreModule.selectedStore]);

  //todo: pagination and vertical scroll bar

  const ReferralSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Date',
      key: 'createdAt',
      description: 'date',
      selector: (row) => row.createdAt,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Clients',
      key: 'fromName',
      description: 'date',
      selector: (row) => row.fromName,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Amount',
      key: 'amount',
      description: 'amount',
      selector: (row) => row.amount,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Payment Mode',
      key: 'paymentmode',
      description: 'Payment Mode',
      selector: (row) => row.paymentmode,
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
                  <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                    Collection in the last 30 days
                  </h2>
                </div>
                {handleCreateNew && (
                  <Button
                    style={{ fontSize: '14px', fontWeight: '600px' }}
                    label="Add New"
                    onClick={handleCreateNew}
                    showicon={true}
                  />
                )}
              </TableMenu>

              <div
                style={{
                  width: '100%',
                  height: 'calc(100vh-90px)',
                  overflow: 'auto',
                }}
              >
                <CustomTable
                  title={''}
                  columns={ReferralSchema}
                  data={facilities}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleCreateNew}
                  progressPending={loading}
                />
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

export function InventoryDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const InventoryServ=client.service('/Inventory')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext); //,setUser

  const Inventory = state.InventoryModule.selectedInventory;
  console.log('selected', Inventory);

  const getFacilities = async () => {
    const findProductEntry = await client.service('productentry').find({
      query: {
        'productitems.productId': Inventory.productId,
        facility: user.currentEmployee.facilityDetail._id,
        storeId: state.StoreModule.selectedStore._id,
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    });

    console.log(findProductEntry);
  };

  useEffect(() => {
    getFacilities();
    return () => {};
  }, [Inventory]);
  /* await setFacilities(findProductEntry.data)
        }
        else {
            if (user.stacker){ */
  /* toast({
                    message: 'You do not qualify to view this',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  }) 
                  return */
  /*  const findProductEntry= await ProductEntryServ.find(
                    {query: {
                        
                        $limit:20,
                        $sort: {
                            createdAt: -1
                        }
                        }})
    
            await setFacilities(findProductEntry.data)
            }
        }  */
  /*   .then((res)=>{
        console.log(res)
            setFacilities(res.data)
            setMessage(" ProductEntry  fetched successfully")
            setSuccess(true)
        })
        .catch((err)=>{
            setMessage("Error creating ProductEntry, probable network issues "+ err )
            setError(true)
        }) */

  const handleEdit = async () => {
    const newInventoryModule = {
      selectedInventory: Inventory,
      show: 'modify',
    };
    await setState((prevstate) => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Inventory Details</p>
        </div>
        <div className="card-content vscrollable">
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="label is-small">
                    {' '}
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                    Product Name:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    <strong> {Inventory.name} </strong>
                  </span>
                </td>
              </tr>
              {/*  <tr>
                    <td>
                <label className="label is-small"><span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>Inventory Type:
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft"   name="InventoryType">{Inventory.InventoryType} </span> 
                    </td>
                </tr> */}
            </tbody>
          </table>

          <div className="field mt-2 is-grouped">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Set Price
              </button>
            </p>
            <p className="control">
              <button
                className="button is-danger is-small" /*  onClick={handleSetPrice} */
              >
                Audit
              </button>
            </p>
            <p className="control">
              <button
                className="button is-info is-small" /* onClick={handleEdit} */
              >
                Transaction History
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small" /* onClick={handleEdit} */
              >
                Reorder Level
              </button>
            </p>
          </div>
          {error && <div className="message"> {message}</div>}
        </div>
      </div>
    </>
  );
}

export function InventoryModify() {
  const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const [billservice, setBillService] = useState();
  // eslint-disable-next-line
  const InventoryServ = client.service('inventory');
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const billServ = client.service('billing');

  const Inventory = state.InventoryModule.selectedInventory; // set inventory
  const handleSetPrice = async () => {
    const service = await billServ.get(Inventory.billingId); // get the service
    const contractSel = service.contracts.filter(
      (element) =>
        element.source_org === Inventory.facility &&
        element.dest_org === Inventory.facility
    );

    setValue('price', contractSel[0].price, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('oldprice', contractSel[0].price, {
      shouldValidate: true,
      shouldDirty: true,
    });
    await setBillService(service);
    console.log(contractSel, service);
  };

  useEffect(() => {
    handleSetPrice();

    return () => {};
  }, []);

  const handleCancel = async () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: 'detail',
    };
    setState((prevstate) => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
  };

  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');

    const dleteId = Inventory._id;
    if (conf) {
      InventoryServ.remove(dleteId)
        .then((res) => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Inventory successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: 'Inventory deleted succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch((err) => {
          // setMessage("Error deleting Inventory, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              'Error deleting Inventory, probable network issues or ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    console.log(data);
    // data.facility=Inventory.facility
    //console.log(data);
    const contractSel = billservice.contracts.filter(
      (element) =>
        element.source_org === Inventory.facility &&
        element.dest_org === Inventory.facility
    );
    contractSel[0].price = data.price;
    billServ
      .patch(billservice._id, billservice)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Inventory successfully")
        toast({
          message: 'Price updated succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch((err) => {
        //setMessage("Error creating Inventory, probable network issues "+ err )
        // setError(true)
        toast({
          message: 'Error updating Price, probable network issues or ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">
            Set Price for {Inventory.name} per {Inventory.baseunit}
          </p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                {' '}
                New Selling Price
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    {...register('x', { required: true })}
                    name="price"
                    type="text"
                    placeholder="Name"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Old Price
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    {...register('x', { required: true })}
                    disabled
                    name="oldprice"
                    type="text"
                    placeholder="Inventory Type"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </label>
            </div>
          </form>

          <div className="field  is-grouped mt-2">
            <p className="control">
              <button
                type="submit"
                className="button is-success is-small"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </p>
            {/*  <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductSearch({ getSearchfacility, clear }) {
  const facilityServ = client.service('products');
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

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

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
    const field = 'name'; //field variable

    if (val.length >= 3) {
      facilityServ
        .find({
          query: {
            //service
            [field]: {
              $regex: val,
              $options: 'i',
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log('facility  fetched successfully');
          setFacilities(res.data);
          setSearchMessage(' facility  fetched successfully');
          setShowPanel(true);
        })
        .catch((err) => {
          console.log(err);
          setSearchMessage(
            'Error searching facility, probable network issues ' + err
          );
          setSearchError(true);
        });
    } else {
      console.log('less than 3 ');
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa('');
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Product"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
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
