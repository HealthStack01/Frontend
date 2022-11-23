/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import DatePicker from "react-datepicker";
import LocationSearch from "../helpers/LocationSearch";
import EmployeeSearch from "../helpers/EmployeeSearch";
import BillServiceCreate from "../Finance/BillServiceCreate";
import "react-datepicker/dist/react-datepicker.css";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import Switch from "../../components/switch";
import {BsFillGridFill, BsList} from "react-icons/bs";
import CalendarGrid from "../../components/calender";
import ModalBox from "../../components/modal";
import {Box, Grid, Button as MuiButton, TextField} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DebouncedInput from "../Appointment/ui-components/inputs/DebouncedInput";
import Input from "../../components/inputs/basic/Input/index";
import {MdCancel} from "react-icons/md";
import {FacilitySearch} from "../helpers/FacilitySearch";
import {McText} from "./text";
import CustomSelect from "../../components/inputs/basic/Select";
import BasicDatePicker from "../../components/inputs/Date";
import {FaHospital, FaAddressCard, FaUserAlt} from "react-icons/fa";
import {IoLocationSharp} from "react-icons/io5";
import {BsFillTelephoneFill, BsHouseDoorFill} from "react-icons/bs";
import {MdEmail, MdLocalHospital} from "react-icons/md";

// eslint-disable-next-line
const searchfacility = {};

export default function Provider() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);
  return (
    <section className="section remPadTop">
      <ProviderList showModal={showModal} setShowModal={setShowModal} />
      {showModal === 1 && (
        <ModalBox open={showModal} onClose={() => setShowModal(false)}>
          <OrganizationCreate />
        </ModalBox>
      )}
      {showModal === 2 && (
        <ModalBox open={showModal} onClose={() => setShowModal(false)}>
          {/* <NewOrganizationCreate /> */}
          <OrganizationDetail setShowModal={setShowModal} />
        </ModalBox>
      )}

      {showModal === 3 && (
        <ModalBox open={showModal} onClose={() => setShowModal(false)}>
          <NewOrganizationCreate />
        </ModalBox>
      )}
    </section>
  );
}

export function AppointmentCreate({showModal, setShowModal}) {
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
    setShowModal(false),
      setState(prevstate => ({
        ...prevstate,
        AppointmentModule: {
          selectedAppointment: {},
          show: "list",
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
              <ModalHeader text={"Create Appointment"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MdCancel
                onClick={() => {
                  setShowModal(false),
                    setState(prevstate => ({
                      ...prevstate,
                      AppointmentModule: {
                        selectedAppointment: {},
                        show: "list",
                      },
                    }));
                }}
                style={{
                  fontSize: "2rem",
                  color: "crimson",
                  cursor: "pointer",
                  float: "right",
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
                    style={{fontSize: "16px", fontWeight: "bold"}}
                  >
                    <input
                      type="radio"
                      value={c}
                      name="appointmentClass"
                      {...register("appointmentClass", {required: true})}
                      style={{
                        border: "1px solid #0364FF",
                        transform: "scale(1.5)",
                        color: "#0364FF",
                        margin: ".5rem",
                      }}
                    />
                    {c + " "}
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
                  {...register("start_time", {required: true})}
                  type="datetime-local"
                  style={{
                    border: "1px solid #0364FF",
                    padding: "1rem",
                    color: " #979DAC",
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
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
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
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
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
                {...register("appointment_reason", {required: true})}
                type="text"
                placeholder="Appointment Reason"
                rows="10"
                cols="50"
                style={{
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
                  width: "100%",
                }}
              >
                {" "}
              </textarea>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#0364FF",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="button"
                onClick={e => e.target.reset()}
                style={{
                  backgroundColor: "#ffffff",
                  width: "100%",
                  color: "#0364FF",
                  border: "1px solid #0364FF",
                  cursor: "pointer",
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
export function OrganizationCreate() {
  const {register, handleSubmit} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const facilityServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const [chosen, setChosen] = useState("");
  const [band, setBand] = useState("");
  const BandsServ = client.service("bands");
  const [providerBand, setProviderBand] = useState([]);
  //const history = useHistory()
  const {user} = useContext(UserContext); //,setUser

  const handleChangeMode = async e => {
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
            user.currentEmployee.facilityDetail.facilityType === "HMO"
              ? "Provider"
              : "Company",

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
    if (band === "") {
      toast.error("Band not selected, Please select band");
      return;
    }

    console.log(chosen);
    let stuff = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: chosen._id,
      relationshiptype: "managedcare",
      band,
    };
    orgServ
      .create(stuff)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setSuccess(true);
        toast.success("Organization added succesfully");
        setSuccess(false);
        setBand("");
      })
      .catch(err => {
        toast.error("Error adding organization " + err);
      });
  };

  useEffect(() => {
    // console.log("starting...")
    getProviderBand();
    return () => {};
  }, []);
  const getSearchfacility = obj => {
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
      <FacilitySearch getSearchfacility={getSearchfacility} clear={success} />
      <select
        name="bandType"
        value={band}
        onChange={e => handleChangeMode(e)}
        className="selectadd"
        style={{
          width: "100%",
          padding: "1rem",
          margin: "1rem 0",
          borderRadius: "4px",
          cursor: "pointer",
          border: "1px solid rgba(0, 0, 0, 0.6)",
        }}
      >
        <option value="">
          {user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? "Choose Provider Band"
            : "Choose Company Band"}{" "}
        </option>
        {providerBand.map((option, i) => (
          <option key={i} value={option.name}>
            {" "}
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

export function ProviderList({showModal, setShowModal}) {
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
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("list");

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
    setShowModal(1);
  };

  const handleRow = async Client => {
    setShowModal(2);
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

      const findClient = await ClientServ.find({query: stuff});

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
      facility: user?.currentEmployee?.facilityDetail?._id,

      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };
    // if (state.employeeLocation.locationType !== "Front Desk") {
    //   query.locationId = state.employeeLocation.locationId;
    // }

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

  const onRowClicked = () => {};

  const mapFacilities = () => {
    let mapped = [];
    facilities.map((facility, i) => {
      mapped.push({
        title: facility?.firstname + " " + facility?.lastname,
        start: format(new Date(facility?.start_time), "yyyy-MM-ddTHH:mm"),
        end: facility?.end_time,
        id: i,
      });
    });
    return mapped;
  };
  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  const dummyData = [
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "primary",
      grade: "A",
      status: "Authorized",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "Secondary",
      grade: "B",
      status: "Requested",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "Both",
      grade: "A",
      status: "Authorized",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "Secondary",
      grade: "A",
      status: "Pending",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "primary",
      grade: "A",
      status: "Authorized",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "Secondary",
      grade: "A",
      status: "Suspended",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "Secondary",
      grade: "A",
      status: "Suspended",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "Secondary",
      grade: "A",
      status: "Suspended",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "Secondary",
      grade: "A",
      status: "Expired",
    },
    {
      sn: "1",
      name_provider: "St. Nicholas Hospital",
      lga: "Ajeromi-Ifelodun",
      contact_person: "Rose mwangi",
      phone_number: "+23480123456789",
      classification: "Secondary",
      grade: "A",
      status: "Suspended",
    },
  ];

  const returnCell = status => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case "authorized":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "requested":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      case "expired":
        return <span style={{color: "#ED0423"}}>{status}</span>;

      case "pending":
        return <span style={{color: "#EF9645"}}>{status}</span>;

      case "suspended":
        return <span style={{color: "#936A03"}}>{status}</span>;

      default:
        break;
    }
  };

  const preAuthSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "Enter Serial Number",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Name Provider",
      key: "name_provider",
      description: "Name Provider",
      selector: row => row.name_provider,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "LGA",
      key: "lga",
      description: "LGA",
      selector: row => row.lga,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Contact person",
      key: "contact_person",
      description: "Contact person",
      selector: (row, i) => row.contact_person,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Phone Number",
      key: "phone_number",
      description: "Phone Number",
      selector: (row, i) => row.phone_number,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Classification",
      key: "classification",
      description: "Classification",
      selector: (row, i) => row.classification,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Grade",
      key: "grade",
      description: "Grade",
      selector: (row, i) => row.grade,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Status",
      key: "status",
      description: "Status",
      selector: "status",
      cell: (row, i) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.status === "approved",
      style: {
        color: "red",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: row => row.status === "ongoing",
      style: {
        color: "rgba(0,0,0,.54)",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: row => row.status === "pending",
      style: {
        color: "pink",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: row => row.status === "declined",
      style: {
        color: "purple",
        backgroundColor: "green",
        "&:hover": {
          cursor: "pointer",
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
              style={{flexDirection: "column", padding: "0.6rem 1rem"}}
            >
              <TableMenu>
                <div style={{display: "flex", alignItems: "center"}}>
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
                    <MuiButton
                      variant="outlined"
                      sx={{
                        widh: "fit",
                        textTransform: "capitalize",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginRight: "20px",
                      }}
                      onClick={handleCreateNew}
                    >
                      <FileUploadIcon
                        sx={{marginRight: "5px"}}
                        fontSize="small"
                      />
                      Upload Provider
                    </MuiButton>
                    <MuiButton
                      variant="contained"
                      sx={{
                        widh: "fit",
                        textTransform: "capitalize",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      onClick={handleCreateNew}
                    >
                      <AddCircleOutlineIcon
                        sx={{marginRight: "5px"}}
                        fontSize="small"
                      />
                      Register Provider
                    </MuiButton>
                  </div>
                )}
              </TableMenu>
              <div style={{width: "100%", height: "700px", overflow: "auto"}}>
                {value === "list" ? (
                  <CustomTable
                    title={""}
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

export function NewOrganizationCreate() {
  const {register, handleSubmit} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const facilityServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const [chosen, setChosen] = useState("");
  const [band, setBand] = useState("");
  const BandsServ = client.service("bands");
  const [providerBand, setProviderBand] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectDiv, setSelectDiv] = useState([{selectValue: ""}]);
  const [selectDiv2, setSelectDiv2] = useState([{selectValue: ""}]);
  const [selectDiv3, setSelectDiv3] = useState([{selectValue: ""}]);
  const [selectDiv4, setSelectDiv4] = useState([{selectValue: ""}]);
  const [selectDiv5, setSelectDiv5] = useState([{selectValue: ""}]);
  const [selectDiv6, setSelectDiv6] = useState([{selectValue: ""}]);
  const [selectDiv7, setSelectDiv7] = useState([{selectValue: ""}]);
  const [selectDiv8, setSelectDiv8] = useState([{selectValue: ""}]);
  const [selectDiv9, setSelectDiv9] = useState([{selectValue: ""}]);
  const [selectDiv10, setSelectDiv10] = useState([{selectValue: ""}]);
  const [selectDiv11, setSelectDiv11] = useState([{selectValue: ""}]);
  const [selectDiv12, setSelectDiv12] = useState([{selectValue: ""}]);
  const [selectDiv13, setSelectDiv13] = useState([{selectValue: ""}]);
  const [nonMedDiv, setNonMedDiv] = useState([{selectValue: ""}]);
  const [nonMedDiv2, setNonMedDiv2] = useState([{selectValue: ""}]);
  const [nonMedDiv3, setNonMedDiv3] = useState([{selectValue: ""}]);
  const [nonMedDiv4, setNonMedDiv4] = useState([{selectValue: ""}]);
  const [nonMedDiv5, setNonMedDiv5] = useState([{selectValue: ""}]);
  const [nonMedDiv6, setNonMedDiv6] = useState([{selectValue: ""}]);
  const [nonMedDiv7, setNonMedDiv7] = useState([{selectValue: ""}]);
  const [nonMedDiv8, setNonMedDiv8] = useState([{selectValue: ""}]);

  //const history = useHistory()
  const {user} = useContext(UserContext); //,setUser

  const handleChangeMode = async e => {
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
            user.currentEmployee.facilityDetail.facilityType === "HMO"
              ? "Provider"
              : "Company",

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
    if (band === "") {
      toast({
        message: "Band not selected, Please select band",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    console.log(chosen);
    let stuff = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: chosen._id,
      relationshiptype: "managedcare",
      band,
    };
    orgServ
      .create(stuff)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setSuccess(true);
        toast({
          message: "Organization added succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setBand("");
      })
      .catch(err => {
        toast({
          message: "Error adding organization " + err,
          type: "is-danger",
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
  const getSearchfacility = obj => {
    setChosen(obj);

    /*  setCategoryName(obj.categoryname)
        setChosen2(obj) */

    if (!obj) {
      //"clear stuff"
      /*  setCategoryName("")
             setChosen2() */
    }
  };
  const handleAddClick = Type => {
    switch (Type) {
      case 1:
        setSelectDiv([...selectDiv, {selectValue: ""}]);
        break;
      case 2:
        setSelectDiv2([...selectDiv2, {selectValue: ""}]);
        break;
      case 3:
        setSelectDiv3([...selectDiv3, {selectValue: ""}]);
        break;
      case 4:
        setSelectDiv4([...selectDiv4, {selectValue: ""}]);
        break;
      case 5:
        setSelectDiv5([...selectDiv5, {selectValue: ""}]);
        break;
      case 6:
        setSelectDiv6([...selectDiv6, {selectValue: ""}]);
        break;
      case 7:
        setSelectDiv7([...selectDiv7, {selectValue: ""}]);
        break;
      case 8:
        setSelectDiv8([...selectDiv8, {selectValue: ""}]);
        break;
      case 9:
        setSelectDiv9([...selectDiv9, {selectValue: ""}]);
        break;
      case 10:
        setSelectDiv10([...selectDiv10, {selectValue: ""}]);
        break;
      case 11:
        setSelectDiv11([...selectDiv11, {selectValue: ""}]);
        break;
      case 12:
        setSelectDiv12([...selectDiv12, {selectValue: ""}]);
        break;
      case 13:
        setSelectDiv13([...selectDiv13, {selectValue: ""}]);
        break;
      case 21:
        setNonMedDiv([...nonMedDiv, {selectValue: ""}]);
        break;
      case 22:
        setNonMedDiv2([...nonMedDiv2, {selectValue: ""}]);
        break;
      case 23:
        setNonMedDiv3([...nonMedDiv3, {selectValue: ""}]);
        break;
      case 24:
        setNonMedDiv4([...nonMedDiv4, {selectValue: ""}]);
        break;
      case 25:
        setNonMedDiv5([...nonMedDiv5, {selectValue: ""}]);
        break;
      case 26:
        setNonMedDiv6([...nonMedDiv6, {selectValue: ""}]);
        break;
      case 27:
        setNonMedDiv7([...nonMedDiv7, {selectValue: ""}]);
        break;
      case 28:
        setNonMedDiv8([...nonMedDiv8, {selectValue: ""}]);
        break;
      default:
        break;
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
    {value: "test", label: "test"},
    {value: "test2", label: "test2"},
  ];
  return (
    <>
      {currentPage === 1 && (
        <>
          <p style={{fontWeight: "700"}}>
            HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
          </p>
          <p style={{fontWeight: "700", marginBottom: "2rem"}}>
            (PRIVATE SCHEME)
          </p>
          <McText txt={"PERSONAL DATA"} type={"p"} bold={700} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Input
                label={"NAME OF MEDICAL DIRECTOR (MD)"}
                register={register("nameofmd")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input label={"MCDN NO"} register={register("mcdnNo")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={"MD PHONE NO"} register={register("nmPhoneNo")} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input
                label={"SPECIALIZATION"}
                register={register("specialization")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={"MD EMAIL"} register={register("mdEmail")} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input
                label={"NAME OF CHIEF MATRON"}
                register={register("nameofChiefMatron")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={"TEL"} register={register("chiefMatronTel")} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input
                label={"NAME OF HMO OFFICER"}
                register={register("nameofHmoOfficer")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label={"TEL"} register={register("hmoOfficerTel")} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Button
                label={"Cancel"}
                onClick={() => setCurrentPage(0)}
                fullwidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                label={"Next"}
                onClick={() => setCurrentPage(2)}
                fullwidth
              />
            </Grid>
          </Grid>
        </>
      )}
      {currentPage === 2 && (
        <>
          <div
            style={{
              height: "80vh",
              overflowY: "scroll",
              width: "40vw",
              margin: "0 auto",
            }}
          >
            <p style={{fontWeight: "700"}}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{fontWeight: "700", marginBottom: "2rem"}}>
              (PRIVATE SCHEME)
            </p>
            <McText txt={"HOSPITAL ASSESSMENT"} type={"p"} bold={700} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  1. GENERAL OUTLOOK & INFRASTRUCTURE
                </p>
                {selectDiv.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 1)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(1)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  2. OPD / FRONT DESK
                </p>
                {selectDiv2.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv2.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 2)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv2.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(2)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  3. CASUALTY AND EMERGENCY
                </p>
                {selectDiv3.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv3.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 3)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv3.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(3)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  4. PHARMACY
                </p>
                {selectDiv4.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv4.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 4)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv4.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(4)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  5. LABORATORY/ RADIOLOGICAL EQUIPMENTS
                </p>
                {selectDiv5.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv5.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 5)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv5.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(5)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  6. WARDS
                </p>
                {selectDiv6.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv6.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 6)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv6.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(6)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  7. LABOUR ROOM
                </p>
                {selectDiv7.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv7.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 7)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv7.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(7)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  8. THEATRE
                </p>
                {selectDiv8.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv8.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 8)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv8.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(8)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  9. ADDITIONAL FACILITIES
                </p>
                {selectDiv9.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv9.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 9)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv9.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(9)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  10. ADMINISTRATION
                </p>
                {selectDiv10.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv10.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 10)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv10.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(10)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  11. QUALITY MANAGEMENT PROCESSES
                </p>
                {selectDiv11.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv11.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 11)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv11.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(11)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  12. OTHER PARAMETERS
                </p>
                {selectDiv12.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv12.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 12)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv12.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(12)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  13. MEDICAL PERSONNEL /STAFF
                </p>
                {selectDiv13.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {selectDiv13.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 13)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {selectDiv13.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(13)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} sm={6} md={12}>
                <McText txt={"FOR OFFICIAL USE"} type={"p"} bold={700} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Input
                  label={"REVIEW OF CREDEINTIALS"}
                  register={register("name")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <BasicDatePicker
                  label={"DATE OF REVIEW"}
                  register={register("date")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} mb={1}>
              <Grid item xs={12} sm={6} md={12}>
                <McText txt={"RECOMMENDATION SUMMARY"} type={"p"} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <Input label={"A APRROVE"} register={register("name")} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Input
                  label={"B. DENY OUTRIGHTLY"}
                  register={register("name")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <McText txt={"C. GIVE PROBATION FOR"} type={"p"} />
                <CustomSelect
                  options={selectdata}
                  register={register("inspectionParameters")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <BasicDatePicker label={"DATE"} register={register("date")} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <McText txt={"SIGNATURE"} type={"p"} />
                <div
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "1px solid #D2D2D2",
                    borderRadius: "5px",
                    padding: ".8rem",
                  }}
                ></div>
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4}>
                <Button
                  label={"Cancel"}
                  onClick={() => setCurrentPage(1)}
                  fullwidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  label={"Next"}
                  onClick={() => setCurrentPage(3)}
                  fullwidth
                />
              </Grid>
            </Grid>
          </div>
        </>
      )}
      {currentPage === 3 && (
        <>
          <div
            style={{
              height: "80vh",
              overflowY: "scroll",
              width: "40vw",
              margin: "0 auto",
            }}
          >
            <p style={{fontWeight: "700"}}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{fontWeight: "700", marginBottom: "2rem"}}>
              (PRIVATE SCHEME)
            </p>
            <McText txt={"NON-MEDICAL STAFF"} type={"p"} bold={700} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  1. ADMINNISRATIVE STAFF
                </p>
                {nonMedDiv.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {nonMedDiv.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 21)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {nonMedDiv.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(21)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  2. ACCOUNTS AND FINANACE
                </p>
                {nonMedDiv2.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {nonMedDiv2.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 22)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {nonMedDiv2.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(22)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  3. OTHER STAFF
                </p>
                {nonMedDiv3.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {nonMedDiv3.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 23)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {nonMedDiv3.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(23)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  4. SPECIALISTS /FELLOWS
                </p>
                {nonMedDiv4.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {nonMedDiv4.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 24)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {nonMedDiv4.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(24)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  5. INTERPRETATION OF SCORES (0,1,2,3,4,5)
                </p>
                {selectDiv5.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {nonMedDiv5.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 25)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {nonMedDiv5.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(25)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  6. TOTAL COMPUTED SCORES
                </p>
                {nonMedDiv6.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {nonMedDiv6.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 26)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {nonMedDiv6.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(26)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  7. TOTAL SCORE (%)
                </p>
                {nonMedDiv7.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {nonMedDiv7.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 27)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {nonMedDiv7.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(27)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>

            {/* ------------------------- */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <p
                  style={{
                    fontSize: ".8rem",
                  }}
                >
                  8. HOSPITAL RATING BASED ON SCORE
                </p>
                {nonMedDiv8.map((x, i) => {
                  return (
                    <div className="box">
                      <Grid container spacing={3} mb={1}>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Findings"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("findings")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <McText txt={"Inspection Parameters"} type={"p"} />
                          <CustomSelect
                            options={selectdata}
                            register={register("inspectionParameters")}
                          />
                          {nonMedDiv8.length !== 1 && (
                            <p
                              onClick={() => handleRemoveClick(i, 28)}
                              style={{
                                padding: "0",
                                margin: "0",
                                float: "right",
                                cursor: "pointer",
                                border: "1px solid crimson",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                marginTop: ".2rem",
                              }}
                            >
                              {" "}
                              -{" "}
                            </p>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          {nonMedDiv8.length - 1 === i && (
                            <Button
                              label={"Add"}
                              onClick={() => handleAddClick(28)}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4}>
                <Button
                  label={"Cancel"}
                  onClick={() => setCurrentPage(2)}
                  fullwidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  label={"Next"}
                  onClick={() => setCurrentPage(4)}
                  fullwidth
                />
              </Grid>
            </Grid>
          </div>
        </>
      )}
      {currentPage === 4 && (
        <>
          <div
            style={{
              height: "80vh",
              overflowY: "scroll",
              width: "40vw",
              margin: "0 auto",
            }}
          >
            <p style={{fontWeight: "700"}}>
              HCI HEALTHCARE LIMITED ASSESSMENT / CREDENTIALLING FORM (NO..)
            </p>
            <p style={{fontWeight: "700", marginBottom: "2rem"}}>
              (PRIVATE SCHEME)
            </p>
            <McText
              txt={
                "GENERAL OBSERVATIONS BY HMO REPRESENTATIVE / ASSESSMENT OFFICER"
              }
              type={"p"}
              bold={700}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={12}>
                <Input
                  label={"Observations"}
                  register={register("observations")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={4}>
                <Input label={"Name"} register={register("name")} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input
                  label={"Designation"}
                  register={register("designation")}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Input label={"Date"} register={register("date")} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <McText txt={"Signature"} type={"p"} />
                <Input register={register("signature")} />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <Input
                  label={"Provider Representative Name"}
                  register={register("name")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Input
                  label={"Designation"}
                  register={register("designation")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <Input label={"Phone"} register={register("phone")} />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <BasicDatePicker label={"Date"} register={register("date")} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <McText txt={"Signature"} type={"p"} />
                <Input label={"Signature"} register={register("signature")} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <McText txt={"FOR OFFICIAL USE"} type={"p"} bold={700} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={12}>
                <Input
                  label={`Med. Officer's Review of Credentials`}
                  register={register("name")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={"Name of Reviewing Officer"}
                  register={register("name")}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <BasicDatePicker
                  label={"Date of Review"}
                  register={register("date")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4} md={12}>
                <McText txt={"RECOMMENDATION SUMMARY"} type={"p"} bold={700} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <Input label={"A Approve"} register={register("name")} />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={"B Deny Outrightly"}
                  register={register("name")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <Input
                  label={"C Give Probation For"}
                  register={register("name")}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <BasicDatePicker label={"Date"} register={register("date")} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6}>
                <McText txt={"Signature"} type={"p"} />
                <Input register={register("signature")} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Button
                  label={"Cancel"}
                  onClick={() => setCurrentPage(0)}
                  fullwidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type={"submit"}
                  label={"Submit"}
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

export function OrganizationDetail({showModal, setShowModal}) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const facilityServ=client.service('/facility')
  //const history = useHistory()
  const {user, setUser} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const {register, handleSubmit, setValue, reset} = useForm();

  const facility = state.facilityModule.selectedFacility;

  const handleEdit = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
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

  return (
    <>
      <Box
        sx={{
          maxheight: "80vh",
          width: "800px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
          mb={2}
        >
          <Button label="Edit" onClick={handleEdit} />
          <Button label="Associate" />
          <Button label="Close" onClick={closeForm} />
          <Button label="Delete" />
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Input
                  register={register("name_provider")}
                  label="Hospital Name"
                  value="St.Nicholas Hospital"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  register={register("lga")}
                  label="Address"
                  value="1234,5th Avenue,New York"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  register={register("lga")}
                  label="City"
                  value="Lagos"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  register={register("lga")}
                  label="Phone"
                  value="09123802410"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  register={register("lga")}
                  label="Email"
                  value="motun6@gmail.com"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  register={register("lga")}
                  label="CEO"
                  value="Dr. Simpa"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  register={register("lga")}
                  label="Type"
                  value="HMO"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  register={register("lga")}
                  label="Category"
                  value="HMO"
                  disabled
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
}
