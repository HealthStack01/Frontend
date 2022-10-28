/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {Route, Switch, Link, NavLink} from "react-router-dom";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import DatePicker from "react-datepicker";
import LocationSearch from "../helpers/LocationSearch";
import EmployeeSearch from "../helpers/EmployeeSearch";
import BillServiceCreate from "../Finance/BillServiceCreate";
import "react-datepicker/dist/react-datepicker.css";
// eslint-disable-next-line
const searchfacility = {};

export default function Appointments() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      <div className="columns ">
        <div className="column is-8 ">
          <ClientList />
        </div>
        <div className="column is-4 ">
          {state.AppointmentModule.show === "create" && <AppointmentCreate />}
          {state.AppointmentModule.show === "detail" && <ClientDetail />}
          {state.AppointmentModule.show === "modify" && (
            <ClientModify Client={selectedClient} />
          )}
        </div>
      </div>
    </section>
  );
}

export function AppointmentCreate() {
  const {state, setState} = useContext(ObjectContext);
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState();
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [type, setType] = useState();
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("appointments");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  // const [appointment_reason,setAppointment_reason]= useState()
  const [appointment_status, setAppointment_status] = useState("");
  const [appointment_type, setAppointment_type] = useState("");
  const [billingModal, setBillingModal] = useState(false);

  const [chosen, setChosen] = useState();
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();
  const appClass = ["On-site", "Teleconsultation", "Home Visit"];

  let appointee; //  =state.ClientModule.selectedClient
  /*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
  const handleChangeType = async e => {
    await setAppointment_type(e.target.value);
  };

  const handleChangeStatus = async e => {
    await setAppointment_status(e.target.value);
  };

  const getSearchfacility = obj => {
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
  const getSearchfacility1 = obj => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };
  const getSearchfacility2 = obj => {
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
    setMessage("");
    setError(false);
    setSuccess(false);
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
    data.practitioner_name = chosen2.firstname + " " + chosen2.lastname;
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
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        setAppointment_type("");
        setAppointment_status("");
        setClientId("");
        setLocationId("");
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast({
          message:
            "Appointment created succesfully, Kindly bill patient if required",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch(err => {
        toast({
          message: "Error creating Appointment " + err,
          type: "is-danger",
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
       //navigate('/app/finance/billservice')
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
        <div className="card-header">
          <p className="card-header-title">Create Appointment</p>
        </div>
        <div className="card-content vscrollable remPad1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
              <div className="field-body">
                {/*  <label className="label is-small mr-2">Client:</label> */}

                {state.ClientModule.selectedClient.firstname !== undefined ? (
                  <>
                    <label className="label is-size-7">
                      {" "}
                      {state.ClientModule.selectedClient.firstname}{" "}
                      {state.ClientModule.selectedClient.lastname}
                    </label>
                  </>
                ) : (
                  <div
                    className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
                  >
                    <ClientSearch
                      getSearchfacility={getSearchfacility}
                      clear={success}
                    />
                    <p
                      className="control has-icons-left "
                      style={{display: "none"}}
                    >
                      <input
                        className="input is-small"
                        /* ref={register ({ required: true }) } */ /* add array no */ value={
                          clientId
                        }
                        name="ClientId"
                        type="text"
                        onChange={e => setClientId(e.target.value)}
                        placeholder="Product Id"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                      </span>
                    </p>
                    {/* {sellingprice &&   "N"}{sellingprice} {sellingprice &&   "per"}  {baseunit} {invquantity} {sellingprice &&   "remaining"}  */}
                  </div>
                )}
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div
                  className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
                >
                  <LocationSearch
                    getSearchfacility={getSearchfacility1}
                    clear={success1}
                  />
                  <p
                    className="control has-icons-left "
                    style={{display: "none"}}
                  >
                    <input
                      className="input is-small"
                      /* ref={register ({ required: true }) } */ /* add array no */ value={
                        locationId
                      }
                      name="locationId"
                      type="text"
                      onChange={e => setLocationId(e.target.value)}
                      placeholder="Product Id"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas  fa-map-marker-alt"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div
                  className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
                >
                  <EmployeeSearch
                    getSearchfacility={getSearchfacility2}
                    clear={success2}
                  />
                  <p
                    className="control has-icons-left "
                    style={{display: "none"}}
                  >
                    <input
                      className="input is-small"
                      /* ref={register ({ required: true }) } */ /* add array no */ value={
                        practionerId
                      }
                      name="practionerId"
                      type="text"
                      onChange={e => setPractionerId(e.target.value)}
                      placeholder="Product Id"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas  fa-map-marker-alt"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field ml-3 ">
                {/* <label className= "mr-2 "> <b>Modules:</b></label> */}
                {appClass.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c}
                      name="appointmentClass"
                      ref={register}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <input
                name="start_time"
                {...register("x", {required: true})}
                type="datetime-local"
              />
            </div>

            <div className="field">
              <div className="control">
                <div className="select is-small">
                  <select name="type" value={type} onChange={handleChangeType}>
                    <option value="">Choose Appointment Type </option>
                    <option value="New">New</option>
                    <option value="Followup">Followup</option>
                    <option value="Readmission with 24hrs">
                      Readmission with 24hrs
                    </option>
                    <option value="Annual Checkup">Annual Checkup</option>
                    <option value="Walk in">Walk-in</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="select is-small">
                  <select
                    name="appointment_status"
                    value={appointment_status}
                    onChange={handleChangeStatus}
                  >
                    <option value="">Appointment Status </option>
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
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="appointment_reason"
                  type="text"
                  placeholder="Reason For Appointment"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital"></i>
                </span>
              </p>
            </div>
            <div className="field " style={{display: "none"}}>
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="billingservice"
                  type="text"
                  placeholder="Billing service"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital"></i>
                </span>
              </p>
            </div>

            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button
                  className="button is-warning is-small"
                  onClick={e => e.target.reset()}
                >
                  Cancel
                </button>
              </p>
              {/* <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
            </div>
          </form>
        </div>
      </div>
      {/* <div className={`modal ${billingModal?"is-active":""}` }>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Bill Client</p>
                    <button className="delete" aria-label="close"  onClick={handlecloseModal1}></button>
                    </header>
                    <section className="modal-card-body">
                   
                    < BillServiceCreate closeModal={handlecloseModal1}/>
                    </section>
                  
                </div>
            </div>  */}
    </>
  );
}

export function ClientList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("appointments");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    await setState(prevstate => ({...prevstate, ClientModule: newClient}));
  };

  const handleRow = async Client => {
    await setSelectedAppointment(Client);
    const newClientModule = {
      selectedAppointment: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
  };
  //console.log(state.employeeLocation)

  const handleSearch = val => {
    const field = "firstname";
    //  console.log(val)

    let query = {
      $or: [
        {
          firstname: {
            $regex: val,
            $options: "i",
          },
        },
        {
          lastname: {
            $regex: val,
            $options: "i",
          },
        },
        {
          middlename: {
            $regex: val,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_type: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_status: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_reason: {
            $regex: val,
            $options: "i",
          },
        },
        {
          location_type: {
            $regex: val,
            $options: "i",
          },
        },
        {
          location_name: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_department: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_profession: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_name: {
            $regex: val,
            $options: "i",
          },
        },
      ],
      facility: user.currentEmployee.facilityDetail._id, // || "",
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    };
    if (state.employeeLocation.locationType !== "Front Desk") {
      query.locationId = state.employeeLocation.locationId;
    }

    ClientServ.find({query: query})
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      if (state.employeeLocation.locationType !== "Front Desk") {
        stuff.locationId = state.employeeLocation.locationId;
      }

      const findClient = await ClientServ.find({query: stuff});

      await setFacilities(findClient.data);
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
    ClientServ.on("created", obj => handleCalendarClose());
    ClientServ.on("updated", obj => handleCalendarClose());
    ClientServ.on("patched", obj => handleCalendarClose());
    ClientServ.on("removed", obj => handleCalendarClose());
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, ClientModule: newClient}));
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
    if (state.employeeLocation.locationType !== "Front Desk") {
      query.locationId = state.employeeLocation.locationId;
    }

    const findClient = await ClientServ.find({query: query});

    await setFacilities(findClient.data);
  };

  const handleDate = async date => {
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

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <p className="control has-icons-left  ">
                    <DebounceInput
                      className="input is-small "
                      type="text"
                      placeholder="Search Appointments"
                      minLength={3}
                      debounceTimeout={400}
                      onChange={e => handleSearch(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>

              <div className="level-item">
                <DatePicker
                  selected={startDate}
                  onChange={date => handleDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Filter By Date"
                  isClearable
                />
                {/* <input name="filter_time"  ref={register ({ required: true })}  type="datetime-local" /> */}
              </div>
            </div>
            <div className="level-item">
              {" "}
              <span className="is-size-6 has-text-weight-medium">
                Appointments{" "}
              </span>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="level-item">
                  <div
                    className="button is-success is-small"
                    onClick={handleCreateNew}
                  >
                    New
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-container pullup ">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>
                  <th>
                    <abbr title="Time">Date/Time</abbr>
                  </th>
                  <th>First Name</th>
                  <th>
                    <abbr title="Last Name">Last Name</abbr>
                  </th>
                  <th>
                    <abbr title="Class">Classification</abbr>
                  </th>
                  <th>
                    <abbr title="Location">Location</abbr>
                  </th>
                  {/* <th><abbr title="Phone">Phone</abbr></th>
                   */}
                  <th>
                    <abbr title="Type">Type</abbr>
                  </th>
                  <th>
                    <abbr title="Status">Status</abbr>
                  </th>
                  <th>
                    <abbr title="Reason">Reason</abbr>
                  </th>
                  <th>
                    <abbr title="Practitioner">Practitioner</abbr>
                  </th>
                  {/* <th><abbr title="Actions">Actions</abbr></th> */}
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {facilities.map((Client, i) => (
                  <tr
                    key={Client._id}
                    onClick={() => handleRow(Client)}
                    className={
                      Client._id === (selectedAppointment?._id || null)
                        ? "is-selected"
                        : ""
                    }
                  >
                    <th>{i + 1}</th>
                    <td>
                      <strong>
                        {format(
                          new Date(Client.start_time),
                          "dd-MM-yy HH:mm:ss"
                        )}
                      </strong>
                    </td>
                    <th>{Client.firstname}</th>
                    {/* <td>{Client.middlename}</td> */}
                    <td>{Client.lastname}</td>
                    {/*  < td>{formatDistanceToNowStrict(new Date(Client.dob))}</td> */}
                    {/*  <td>{Client.gender}</td> */}
                    {/*  <td>{Client.phone}</td> */}
                    <td>{Client.appointmentClass}</td>
                    <td>
                      {Client.location_name} {Client.location_type}
                    </td>
                    <td>{Client.appointment_type}</td>
                    <td>{Client.appointment_status}</td>
                    <td>{Client.appointment_reason}</td>
                    <td>{Client.practitioner_name}</td>
                    {/* <td><span   className="showAction"  >...</span></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function ClientDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const navigate = useNavigate();

  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ClientServ=client.service('/Client')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();

  const Client = state.AppointmentModule.selectedAppointment;
  //const client=Client
  const handleEdit = async () => {
    const newClientModule = {
      selectedAppointment: Client,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
  };
  const handleAttend = async () => {
    const patient = await client.service("client").get(Client.clientId);
    await setSelectedClient(patient);
    const newClientModule = {
      selectedClient: patient,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //modify appointment
    navigate("/app/clinic/encounter");
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Client Details</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.firstname && (
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label
                      className="label is-size-7 my-0 "
                      name="firstname"
                      type="text"
                    >
                      First Name{" "}
                    </label>
                    <label className="is-size-7 my-0 ">
                      {Client.firstname}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-hospital"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.middlename && (
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label
                      className="label is-size-7 my-0"
                      name="middlename"
                      type="text"
                    >
                      {" "}
                      Middle Name{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.middlename}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-map-signs"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.lastname && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="lastname"
                      type="text"
                    >
                      Last Name
                    </label>
                    <label className="is-size-7 my-0">{Client.lastname}</label>
                    <span className="icon is-small is-left">
                      <i className=" nop-user-md "></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.dob && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="dob"
                      type="text"
                    >
                      Date of Birth{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {new Date(Client.dob).toLocaleDateString("en-GB")}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.gender && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="gender"
                      type="text"
                    >
                      Gender{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.gender}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.maritalstatus && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="maritalstatus"
                      type="text"
                    >
                      Marital Status{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.maritalstatus}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.mrn && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="mrn"
                      type="text"
                    >
                      Medical Records Number{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.mrn}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.religion && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="religion"
                      type="text"
                    >
                      Religion{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.religion}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.profession && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="profession"
                      type="text"
                    >
                      Profession{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.profession}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.phone && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="phone"
                      type="text"
                    >
                      {" "}
                      Phone No
                    </label>
                    <label className="is-size-7 my-0">{Client.phone}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-phone-alt"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.email && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="email"
                      type="email"
                    >
                      Email{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.email}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {Client.address && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="address"
                  type="text"
                >
                  Residential Address{" "}
                </label>
                <label className="is-size-7 my-0">{Client.address}</label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.city && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="city"
                      type="text"
                    >
                      Town/City{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.city}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.lga && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="lga"
                      type="text"
                    >
                      Local Govt Area{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.lga}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.state && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="state"
                      type="text"
                    >
                      State{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.state}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.country && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="country"
                      type="text"
                    >
                      Country{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.country}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.bloodgroup && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="bloodgroup"
                      type="text"
                    >
                      Blood Group{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.bloodgroup}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.genotype && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="genotype"
                      type="text"
                    >
                      Genotype{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.genotype}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.disabilities && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="disabilities"
                      type="text"
                    >
                      Disabilities{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.disabilities}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-body">
              {Client.allergies && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="allergies"
                      type="text"
                    >
                      Allergies{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.allergies}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.comorbidities && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="comorbidities"
                      type="text"
                    >
                      Co-mobidities{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.comorbidities}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          {Client.clientTags && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="clientTags"
                  type="text"
                >
                  Tags{" "}
                </label>
                <label className="is-size-7 my-0">{Client.clientTags}</label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          {Client.specificDetails && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="specificDetails"
                  type="text"
                >
                  Specific Details about Client{" "}
                </label>
                <label className="is-size-7 my-0">
                  {Client.specificDetails}
                </label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.nok_name && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_name"
                      type="text"
                    >
                      Next of Kin Full Name
                    </label>
                    <label className="is-size-7 my-0">{Client.nok_name}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_phoneno && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_phoneno"
                      type="text"
                    >
                      Next of Kin Phone Number
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.nok_phoneno}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_email && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_email"
                      type="email"
                    >
                      Next of Kin Email{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.nok_email}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_relationship && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_relationship"
                      type="text"
                    >
                      Next of Kin Relationship"{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.nok_relationship}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-grouped  mt-2">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Edit Appointment Details
              </button>
            </p>

            <p className="control">
              <button
                className="button is-link is-small"
                onClick={() => handleAttend()}
              >
                Attend to Client
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ClientModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("appointments");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [appointment_status, setAppointment_status] = useState("");
  const [appointment_type, setAppointment_type] = useState("");
  const appClass = ["On-site", "Teleconsultation"];
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();

  const Client = state.AppointmentModule.selectedAppointment;
  //console.log(Client)

  const getSearchfacility1 = obj => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };

  const getSearchfacility2 = obj => {
    setPractionerId(obj._id);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setPractionerId();
      setChosen2();
    }
  };

  useEffect(() => {
    setValue("firstname", Client.firstname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("middlename", Client.middlename, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("lastname", Client.lastname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("phone", Client.phone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("email", Client.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("dob", Client.dob, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("gender", Client.gender, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("ClientId", Client.clientId, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("appointment_reason", Client.appointment_reason, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("appointment_status", Client.appointment_status, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("appointment_type", Client.appointment_type, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue(
      "start_time",
      format(new Date(Client.start_time), "yyyy-MM-dd'T'HH:mm:ss"),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
    setValue("appointmentClass", Client.appointmentClass, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });
  const handleChangeType = async e => {
    // await setAppointment_type(e.target.value)
    setValue("appointment_type", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleChangeStatus = async e => {
    // await setAppointment_status(e.target.value)
    setValue("appointment_status", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCancel = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newClientModule = {
      selectedAppointment: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, AppointmentModule: newClientModule}));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Client._id;
    if (conf) {
      ClientServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Client successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Client deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Client, probable network issues "+ err )
          // setError(true)
          toast({
            message: "Error deleting Client, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    // console.log(data)
    //  data.facility=Client.facility
    //console.log(data);
    data.practitioner_name = chosen2.firstname + " " + chosen2.lastname;
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
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Client successfully")
        toast({
          message: "Client updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Client, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Client Details-Modify</p>
        </div>
        <div className="card-content vscrollable remPad1">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ===================================================== */}
            {/*  <label className="label is-small">Client:</label> */}

            <div className="field">
              <label className="label is-size-7">
                {" "}
                {Client.firstname} {Client.lastname}
              </label>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div
                  className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
                >
                  <LocationSearch
                    id={Client.locationId}
                    getSearchfacility={getSearchfacility1}
                    clear={success1}
                  />
                  <p
                    className="control has-icons-left "
                    style={{display: "none"}}
                  >
                    <input
                      className="input is-small"
                      /* ref={register ({ required: true }) } */ /* add array no */ value={
                        locationId
                      }
                      name="locationId"
                      type="text"
                      onChange={e => setLocationId(e.target.value)}
                      placeholder="Product Id"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas  fa-map-marker-alt"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div
                  className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
                >
                  <EmployeeSearch
                    id={Client.practitionerId}
                    getSearchfacility={getSearchfacility2}
                    clear={success2}
                  />
                  <p
                    className="control has-icons-left "
                    style={{display: "none"}}
                  >
                    <input
                      className="input is-small"
                      /* ref={register ({ required: true }) } */ /* add array no */ value={
                        practionerId
                      }
                      name="practionerId"
                      type="text"
                      onChange={e => setPractionerId(e.target.value)}
                      placeholder="Product Id"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas  fa-map-marker-alt"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field ml-3 ">
                {/* <label className= "mr-2 "> <b>Modules:</b></label> */}
                {appClass.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="radio"
                      value={c}
                      name="appointmentClass"
                      ref={register}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <input
                name="start_time"
                {...register("x", {required: true})}
                type="datetime-local"
                defaultValue={format(
                  new Date(Client.start_time),
                  "yyyy-MM-dd'T'HH:mm:ss"
                )}
              />
            </div>

            <div className="field">
              <div className="control">
                <div className="select is-small">
                  <select
                    name="type"
                    /* value={appointment_type} */ name="appointment_type"
                    {...register("x", {required: true})}
                    onChange={handleChangeType}
                  >
                    <option value="">Choose Appointment Type </option>
                    <option value="New">New</option>
                    <option value="Followup">Followup</option>
                    <option value="Readmission with 24hrs">
                      Readmission with 24hrs
                    </option>
                    <option value="Annual Checkup">Annual Checkup</option>
                    <option value="Walk in">Walk-in</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="select is-small">
                  <select
                    name="appointment_status"
                    {...register("x", {required: true})}
                    /* value={appointment_status} */ onChange={
                      handleChangeStatus
                    }
                  >
                    <option value="">Appointment Status </option>
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
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="appointment_reason"
                  type="text"
                  placeholder="Reason For Appointment"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital"></i>
                </span>
              </p>
            </div>
            <div className="field " style={{display: "none"}}>
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="billingservice"
                  type="text"
                  placeholder="Billing service"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital"></i>
                </span>
              </p>
            </div>
            {/* ======================================= */}
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
            <p className="control">
              <button
                className="button is-danger is-small"
                onClick={() => handleDelete()}
                type="delete"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ClientSearch({getSearchfacility, clear}) {
  const ClientServ = client.service("client");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(
      obj.firstname +
        " " +
        obj.middlename +
        " " +
        obj.lastname +
        " " +
        obj.gender +
        " " +
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
  const handleBlur = async e => {
    if (count === 2) {
      console.log("stuff was chosen");
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
  const handleSearch = async val => {
    setVal(val);
    if (val === "") {
      setShowPanel(false);
      getSearchfacility(false);
      return;
    }
    const field = "name"; //field variable

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          $or: [
            {
              firstname: {
                $regex: val,
                $options: "i",
              },
            },
            {
              lastname: {
                $regex: val,
                $options: "i",
              },
            },
            {
              middlename: {
                $regex: val,
                $options: "i",
              },
            },
            {
              phone: {
                $regex: val,
                $options: "i",
              },
            },
            {
              clientTags: {
                $regex: val,
                $options: "i",
              },
            },
            {
              mrn: {
                $regex: val,
                $options: "i",
              },
            },
            {
              specificDetails: {
                $regex: val,
                $options: "i",
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
        .then(res => {
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          toast({
            message: "Error creating ProductEntry " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      console.log("success has changed", clear);
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? "is-active" : ""}`}
            style={{width: "100%"}}
          >
            <div className="dropdown-trigger" style={{width: "100%"}}>
              <DebounceInput
                className="input is-small  is-expanded mb-0"
                type="text"
                placeholder="Search for Client"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <div className="dropdown-menu expanded" style={{width: "100%"}}>
              <div className="dropdown-content">
                {facilities.length > 0 ? (
                  ""
                ) : (
                  <div
                    className="dropdown-item" /* onClick={handleAddproduct} */
                  >
                    {" "}
                    <span> {val} is not yet your client</span>{" "}
                  </div>
                )}

                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <div>
                      <span>{facility.firstname}</span>
                      <span className="padleft">{facility.middlename}</span>
                      <span className="padleft">{facility.lastname}</span>
                      <span className="padleft">
                        {" "}
                        {formatDistanceToNowStrict(new Date(facility.dob))}
                      </span>
                      <span className="padleft">{facility.gender}</span>
                      <span className="padleft">{facility.profession}</span>
                      <span className="padleft">{facility.phone}</span>
                      <span className="padleft">{facility.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal ${productModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Choose Store</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            {/* <ProductCreate /> */}
          </section>
          {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
        </div>
      </div>
    </div>
  );
}
