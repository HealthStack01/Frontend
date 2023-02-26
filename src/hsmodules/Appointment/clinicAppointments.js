/* eslint-disable */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
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
import {AppointmentSchema} from "./schema";
import Switch from "../../components/switch";
import {BsFillGridFill, BsList} from "react-icons/bs";
import CalendarGrid from "../../components/calender";
import ModalBox from "../../components/modal";
import ModalHeader from "./ui-components/Heading/modalHeader";
import {Box, Grid, Autocomplete, Typography} from "@mui/material";
import DebouncedInput from "../Appointment/ui-components/inputs/DebouncedInput";
import {MdCancel} from "react-icons/md";
import Input from "../../components/inputs/basic/Input";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import BasicDatePicker from "../../components/inputs/Date";
import MuiCustomTimePicker from "../../components/inputs/Date/MuiTimePicker";
import BasicDateTimePicker from "../../components/inputs/DateTime";
import RadioButton from "../../components/inputs/basic/Radio";
import TextField from "@mui/material/TextField";
import {FormsHeaderText} from "../../components/texts";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import MuiClearDatePicker from "../../components/inputs/Date/MuiClearDatePicker";
import GroupedRadio from "../../components/inputs/basic/Radio/GroupedRadio";
import CustomSelect from "../../components/inputs/basic/Select";
import Textarea from "../../components/inputs/basic/Textarea";
import MuiDateTimePicker from "../../components/inputs/DateTime/MuiDateTimePicker";
import OtpInput from "react-otp-input";
import dayjs from "dayjs";
import axios from "axios";
import ClientPaymentTypeSelect from "../../components/client-payment/ClientPaymentType";
import {ClientSearch} from "../helpers/ClientSearch";

export default function ClinicAppointments() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  const appointmentClient = state.AppointmentModule.selectedAppointment;

  return (
    <section className="section remPadTop">
      <ClientList showModal={showModal} setShowModal={setShowModal} />

      {showModal && (
        <ModalBox
          open={state.AppointmentModule.show === "create"}
          onClose={() => setShowModal(false)}
          header="Create  a Clinic Appointment"
        >
          <AppointmentCreate
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </ModalBox>
      )}
      {showModal && (
        <ModalBox
          open={state.AppointmentModule.show === "detail"}
          onClose={() => setShowModal(false)}
          header="Appointment Details"
        >
          <ClientDetail showModal={showModal} setShowModal={setShowModal} />
        </ModalBox>
      )}
      {showModal && (
        <ModalBox
          open={state.AppointmentModule.show === "modify"}
          header={`Edit Appointment for ${appointmentClient.firstname} ${appointmentClient.lastname}`}
          onClose={() => setShowModal(false)}
        >
          <ClientModify showModal={showModal} setShowModal={setShowModal} />
        </ModalBox>
      )}
    </section>
  );
}

export function AppointmentCreate({showModal, setShowModal}) {
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {register, handleSubmit, setValue, control, reset} = useForm(); //, watch, errors, reset
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
  const smsServer = client.service("sms");
  const emailServer = client.service("email");
  const notificationsServer = client.service("notification");
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
  const [paymentMode, setPaymentMode] = useState(null);

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
  }, []);

  const generateOTP = () => {
    var minm = 100000;
    var maxm = 999999;
    const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return otp.toString();
  };

  // Check if user has HMO
  const checkHMO = obj => obj.paymentmode === "HMO";

  const onSubmit = data => {
    //return console.log(state.CommunicationModule.defaultEmail);
    const employee = user.currentEmployee;
    if (!state.CommunicationModule.defaultEmail.emailConfig?.username)
      return setState(prev => ({
        ...prev,
        CommunicationModule: {
          ...prev.CommunicationModule,
          configEmailModal: true,
        },
      }));
    showActionLoader();
    setMessage("");
    setError(false);
    setSuccess(false);

    const generatedOTP = generateOTP();

    const isHMO = chosen.paymentinfo.some(checkHMO);

    if (user.currentEmployee) {
      data.facility = employee.facilityDetail._id; // or from facility dropdown
    }

    if (paymentMode.paymentmode.toLowerCase() === "hmo") {
      data.sponsor = paymentMode.policy.sponsor;
      data.hmo = paymentMode.policy.organization;
      data.policy = paymentMode.policy;
    }
    data.locationId = locationId;
    data.practitionerId = practionerId;
    data.clientId = clientId;
    data.client = chosen;
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
    data.otp = generatedOTP;
    data.organization_type = employee.facilityDetail.facilityType;
    data.actions = [
      {
        status: data.appointment_status,
        actor: user.currentEmployee._id,
      },
    ];

    const notificationObj = {
      type: "Clinic",
      title: `Scheduled ${data.appointmentClass} ${data.appointment_type} Appointment`,
      description: `You have a schedule appointment with ${chosen.firstname} ${
        chosen.lastname
      } set to take place exactly at ${dayjs(data.start_time).format(
        "DD/MM/YYYY hh:mm"
      )} in ${chosen1.name} Clinic for ${data.appointment_reason}`,
      facilityId: employee.facilityDetail._id,
      sender: `${employee.firstname} ${employee.lastname}`,
      senderId: employee._id,
      pageUrl: "/app/clinic/appointments",
      priority: "normal",
      dest_userId: [chosen2._id],
    };

    const emailObj = {
      organizationId: employee.facilityDetail._id,
      organizationName: employee.facilityDetail.facilityName,
      html: `<p>You have been scheduled for an appointment with ${
        chosen2.profession
      } ${chosen2.firstname} ${chosen2.lastname} at ${dayjs(
        data.start_time
      ).format("DD/MM/YYYY hh:mm")} ${
        isHMO ? `and your OTP code is ${generatedOTP}` : ""
      } </p>`,

      text: `You have been scheduled for an appointment with ${
        chosen2.profession
      } ${chosen2.firstname} ${chosen2.lastname} at ${dayjs(
        data.start_time
      ).format("DD/MM/YYYY hh:mm")} ${
        isHMO ? `and your OTP code is ${generatedOTP}` : ""
      } `,
      status: "pending",
      subject: `SCHEDULED APPOINTMENT WITH ${
        employee.facilityDetail.facilityName
      } AT ${dayjs(data.date).format("DD/MM/YYYY hh:mm")}`,
      to: chosen.email,
      name: employee.facilityDetail.facilityName,
      from: state.CommunicationModule.defaultEmail.emailConfig.username,
    };

    const smsObj = {
      message: `You have been scheduled for an appointment with ${
        chosen2.profession
      } ${chosen2.firstname} ${chosen2.lastname} at ${dayjs(
        data.start_time
      ).format("DD/MM/YYYY hh:mm")} ${
        isHMO ? `and your OTP code is ${generatedOTP}` : ""
      } `,
      recipients: [chosen.phone],
    };

    // console.log(emailObj, "email object");
    // console.log(notificationObj, "notification object");

    // return console.log(data);

    ClientServ.create(data)
      .then(async res => {
        await notificationsServer.create(notificationObj);
        //await smsServer.create(smsObj);
        await emailServer.create(emailObj);
        hideActionLoader();
        //console.log(JSON.stringify(res))
        setAppointment_type("");
        setAppointment_status("");
        setClientId("");
        setLocationId("");
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast.success(
          "Appointment created succesfully, Kindly bill patient if required"
        );
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        await axios.post(
          `https://portal.nigeriabulksms.com/api/?username=apmis&apmis=pass&message=${smsObj.message}&sender=${user.currentEmployee.facilityDetail.facilityName}&mobiles=${chosen.phone}`
        );
        // showBilling()
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error creating Appointment " + err);
      });
  };

  // useEffect(() => {
  //   getSearchfacility(state.ClientModule.selectedClient);

  //   /* appointee=state.ClientModule.selectedClient
  //       console.log(appointee.firstname) */
  //   return () => {};
  // }, [state.ClientModule.selectedClient]);

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
      <div
        className="card "
        style={{
          width: "65vw",
        }}
      >
        <form>
          <Grid container spacing={2} mb={1}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <ClientSearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <ClientPaymentTypeSelect
                payments={chosen?.paymentinfo}
                handleChange={item => setPaymentMode(item)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <EmployeeSearch
                getSearchfacility={getSearchfacility2}
                clear={success2}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <LocationSearch
                getSearchfacility={getSearchfacility1}
                clear={success1}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={1}>
            <Grid item xs={12} sm={12} md={12}>
              <RadioButton
                name="appointmentClass"
                register={register("appointmentClass", {required: true})}
                options={appClass}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{alignItems: "center"}} mb={1}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <MuiDateTimePicker
                control={control}
                name="start_time"
                label="Date and Time"
                required
                important
                // register={register("start_time", {required: true})}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CustomSelect
                control={control}
                name="appointment_type"
                label="Appointment Type"
                required
                important
                options={[
                  "New",
                  "Followup",
                  "Readmission with 24hrs",
                  "Annual Checkup",
                  "Walk-in",
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CustomSelect
                required
                important
                control={control}
                name="appointment_status"
                label="Appointment Status "
                options={[
                  "Scheduled",
                  "Confirmed",
                  "Checked In",
                  "Vitals Taken",
                  "With Nurse",
                  "With Doctor",
                  "No Show",
                  "Cancelled",
                  "Billed",
                ]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={1.5}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Textarea
                label="Reason for Appointment"
                //name="appointment_reason"
                important
                register={register("appointment_reason", {required: true})}
                type="text"
                placeholder="write here.."
              />
            </Grid>
          </Grid>

          <Box sx={{display: "flex", alignItems: "center"}}>
            <GlobalCustomButton
              text="Create Appointment"
              onClick={handleSubmit(onSubmit)}
              customStyles={{
                marginRight: "15px",
              }}
            />
            <GlobalCustomButton
              variant="contained"
              color="error"
              text="Cancel"
              onClick={() => setShowModal(false)}
            />
          </Box>
        </form>
      </div>
    </>
  );
}

export function ClientList({showModal, setShowModal}) {
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
    setShowModal(true);
  };

  const handleRow = async Client => {
    setShowModal(true);
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
      facility: user.currentEmployee.facilityDetail._id,
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

  const getFacilities = useCallback(async () => {
    //console.log(user);
    if (user.currentEmployee) {
      let query = {
        facility: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
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
      //console.log(findClient.data);
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
  }, [state.ClinicModule.selectedClinic]);

  useEffect(() => {
    if (user) {
      handleCalendarClose();
    } else {
      return;
    }
    ClientServ.on("created", obj => handleCalendarClose());
    ClientServ.on("updated", obj => handleCalendarClose());
    ClientServ.on("patched", obj => handleCalendarClose());
    ClientServ.on("removed", obj => handleCalendarClose());

    return () => {};
  }, [getFacilities]);

  const handleCalendarClose = useCallback(async () => {
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
    if (state.employeeLocation.locationType !== "Front Desk") {
      query.locationId = state.employeeLocation.locationId;
    }

    const findClient = await ClientServ.find({query: query});

    await setFacilities(findClient.data);
  }, [state.ClinicModule.selectedClinic]);

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
        title: `Name: ${facility?.firstname} ${
          facility?.lastname
        }. Age: ${formatDistanceToNowStrict(
          new Date(facility?.dob)
        )}. Gender: ${facility?.gender}. Phone: ${facility?.phone}. Email: ${
          facility?.email
        }`,
        startDate: format(
          new Date(facility?.start_time.slice(0, 19)),
          "yyyy-MM-dd HH:mm"
        ),
        id: i,
        location: facility?.location_name,
        content: "Test",
      });
    });
    return mapped;
  };

  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  console.log(facilities);

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
                  <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
                    Appointments
                  </h2>
                  <MuiClearDatePicker
                    value={startDate}
                    setValue={setStartDate}
                    label="Filter By Date"
                    format="dd/MM/yyyy"
                  />
                  {/* <SwitchButton /> */}
                  <Switch>
                    <button
                      value={value}
                      onClick={() => {
                        setValue("list");
                      }}
                      style={value === "list" ? activeStyle : {}}
                    >
                      <BsList style={{fontSize: "1rem"}} />
                    </button>
                    <button
                      value={value}
                      onClick={() => {
                        setValue("grid");
                      }}
                      style={value === "grid" ? activeStyle : {}}
                    >
                      <BsFillGridFill style={{fontSize: "1rem"}} />
                    </button>
                  </Switch>
                </div>

                {handleCreateNew && (
                  <GlobalCustomButton onClick={handleCreateNew}>
                    <AddIcon
                      fontSize="small"
                      sx={{
                        marginRight: "5px",
                      }}
                    />
                    Add New
                  </GlobalCustomButton>
                )}
              </TableMenu>
              <div
                style={{
                  width: "100%",
                  height: "calc(100vh - 180px)",
                  overflow: "auto",
                }}
              >
                {value === "list" ? (
                  <CustomTable
                    title={""}
                    columns={AppointmentSchema}
                    data={facilities.filter(facility => {
                      return facility?.location_type === "Clinic";
                    })}
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

export function ClientDetail({showModal, setShowModal}) {
  const {register, handleSubmit, watch, setValue} = useForm(); //errors,
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
  const [otpModal, setOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState(null);
  const [currentPatient, setCurrentPatient] = useState({});
  const [isHMO, setIsHMO] = useState(false);
  const ClientServ = client.service("appointments");

  useEffect(() => {
    setOtpValue(null);
  }, []);

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

  const checkHMO = obj => obj.paymentmode === "HMO";

  const getClient = useCallback(async () => {
    const patient = await client.service("client").get(Client.clientId);
    setIsHMO(patient.paymentinfo.some(checkHMO));
    setCurrentPatient(patient);
  }, [Client]);

  useEffect(() => {
    getClient();
  }, [getClient]);

  const handleAttend = async () => {
    //const patient = await client.service("client").get(Client.clientId);
    setSelectedClient(currentPatient);
    const newClientModule = {
      selectedClient: patient,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //modify appointment
    navigate("/app/clinic/documentation");
    console.log("test");
  };

  const handleOtpChange = otp => {
    setOtpValue(otp);
  };

  const checkinPatient = (data, e) => {
    ClientServ.patch(Client._id, {appointment_status: "Checked In"})
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Client successfully")
        toast.success("Client succesfully Checked In");

        // changeState();
      })
      .catch(err => {
        toast.error("Error updating Client, probable network issues or " + err);
      });
  };

  const checkinPatientWithOTP = () => {
    if (otpValue.toString() !== Client.otp)
      return toast.error("Incorrect OTP supplied");
    ClientServ.patch(Client._id, {appointment_status: "Checked In"})
      .then(res => {
        toast.success("Client succesfully Checked In");

        //changeState();
      })
      .catch(err => {
        toast.error("Error updating Client, probable network issues or " + err);
      });
  };

  const checkOutPatient = () => {
    ClientServ.patch(Client._id, {appointment_status: "Checked Out"})
      .then(res => {
        toast.success("Client succesfully Checked In");

        //changeState();
      })
      .catch(err => {
        toast.error("Error updating Client, probable network issues or " + err);
      });
  };

  //const isHMO = chosen.paymentinfo.some(checkHMO);

  const defaultCheckinClient = () => {
    if (isHMO) {
      setOtpModal(true);
    } else {
      checkinPatient();
    }
  };

  return (
    <>
      <Box sx={{width: "70vw"}}>
        <ModalBox open={otpModal} onClose={() => setOtpModal(false)}>
          <Box>
            <OtpInput
              value={otpValue}
              onChange={handleOtpChange}
              numInputs={6}
              isInputSecure={false}
              separator={<span style={{padding: "0 6px"}}></span>}
              inputStyle={{
                width: "100%",
                display: "block",
                padding: "12px 0",
                margin: "1rem 0",
                border: "1px solid #a6a6a6",
                borderRadius: "3px",
                background: "#f0fbee",
                textAlign: "center",
              }}
            />

            <Box>
              <GlobalCustomButton onClick={checkinPatientWithOTP}>
                Confrim Check-In
              </GlobalCustomButton>
            </Box>
          </Box>
        </ModalBox>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
          mb={2}
          gap={1.5}
        >
          <GlobalCustomButton
            onClick={handleEdit}
            text="Edit Appointment Details"
          />

          <Box>
            {Client.appointment_status.toLowerCase() !== "checked in" && (
              <GlobalCustomButton
                color="success"
                onClick={defaultCheckinClient}
              >
                Check-In Client
              </GlobalCustomButton>
            )}

            {Client.appointment_status.toLowerCase() === "checked in" && (
              <GlobalCustomButton color="success" onClick={checkOutPatient}>
                Check-Out Client
              </GlobalCustomButton>
            )}
          </Box>

          <GlobalCustomButton
            color="secondary"
            onClick={handleAttend}
            text="Attend to Client"
          />
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
              value={format(new Date(Client.start_time), "dd/MM/yyyy HH:mm")}
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
                border: "1px solid #b6b6b6",
                borderRadius: "4px",

                width: "100%",
              }}
            >
              {" "}
            </textarea>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export function ClientModify({showModal, setShowModal}) {
  const {register, handleSubmit, setValue, reset, errors, control, watch} =
    useForm(); //watch, errors,
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
  const appClass = ["On-site", "Teleconsultation", "Home Visit"];
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();
  const [confirmDialog, setConfirmDialog] = useState(false);

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
  }, []);
  const handleChangeType = async e => {
    // await setAppointment_type(e.target.value)
    setValue("appointment_type", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const handleChangeClass = async e => {
    // await setAppointment_type(e.target.value)
    setValue("appointmentClass", e.target.value, {
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
      show: "list",
    };
    setState(prevstate => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
  };
  const handleDelete = async () => {
    //let conf = window.confirm('Are you sure you want to delete this data?');

    const dleteId = Client._id;
    //if (conf) {
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
        toast.success("Client deleted succesfully");
        changeState();
      })
      .catch(err => {
        // setMessage("Error deleting Client, probable network issues "+ err )
        // setError(true)
        toast.error("Error deleting Client, probable network issues or " + err);
      });
    //}
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
      (data.practitioner_name = chosen2.firstname + " " + chosen2.lastname);
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
        toast.success("Client updated succesfully");

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast.error("Error updating Client, probable network issues or " + err);
      });
  };

  const watchedStatus = watch("appointment_status");

  return (
    <>
      <Box
        sx={{
          width: "60vw",
        }}
      >
        <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog(false)}
          confirmationAction={handleDelete}
          type="danger"
          message="Are you sure you want to delete this data?"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={1}>
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <GroupedRadio
                name="appointmentClass"
                options={appClass}
                control={control}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{alignItems: "center"}} mb={1.5}>
            <Grid item xs={12} sm={12} md={4}>
              <MuiDateTimePicker
                important
                required
                label="Date and Time"
                control={control}
                name="start_time"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CustomSelect
                control={control}
                name="appointment_type"
                label="Appointment Type"
                required
                important
                options={[
                  "New",
                  "Followup",
                  "Readmission with 24hrs",
                  "Annual Checkup",
                  "Walk-in",
                ]}
              />
              {/* <select
                name="type"
                onChange={handleChangeType}
                defaultValue={Client?.appointment_type}
                style={{
                  border: "1px solid #b6b6b6",
                  height: "38px",
                  borderRadius: "4px",
                  width: "100%",
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
              </select> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CustomSelect
                required
                important
                control={control}
                name="appointment_status"
                label="Appointment Status "
                options={[
                  "Scheduled",
                  "Confirmed",
                  "Checked In",
                  "Vitals Taken",
                  "With Nurse",
                  "With Doctor",
                  "No Show",
                  "Cancelled",
                  "Billed",
                ]}
              />
              {/* <select
                name="appointment_status"
                onChange={handleChangeStatus}
                defaultValue={Client?.appointment_status}
                style={{
                  border: "1px solid #b6b6b6",
                  height: "38px",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                <option defaultChecked>Appointment Status </option>
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Vitals Taken">Vitals Taken</option>
                <option value="With Nurse">With Nurse</option>
                <option value="With Doctor">With Doctor</option>
                <option value="No Show">No Show</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Billed">Billed</option>
              </select> */}
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={1.5}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Textarea
                label="Reason for Appointment"
                //name="appointment_reason"
                important
                register={register("appointment_reason", {required: true})}
                type="text"
                placeholder="write here.."
              />
            </Grid>
          </Grid>

          <Box sx={{display: "flex", alignItems: "center"}}>
            <GlobalCustomButton
              variant="contained"
              color="success"
              text="Update Appointment"
              customStyles={{
                marginRight: "15px",
              }}
              onClick={handleSubmit(onSubmit)}
            />

            <GlobalCustomButton
              text="Delete Appointment"
              onClick={() => setConfirmDialog(true)}
              color="error"
              variant="contained"
              //variant="contain"
            />
          </Box>
        </form>
      </Box>
    </>
  );
}

export function ClientSearch2({id, getSearchfacility, clear, label}) {
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
  const [closeDropdown, setCloseDropdown] = useState(false);

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
      console.log("success has changed", clear);
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  // map faclilities and return the firstname and lastname
  const mapFacilities = () => {
    const allFacilities = facilities.map(facility => {
      return {
        value: facility._id,
        label: facility.firstname + " " + facility.lastname,
      };
    });
  };

  return (
    <div>
      {/* <div className="field">
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
      </div> */}
      <Autocomplete
        size="small"
        value={simpa}
        onChange={(event, newValue, reason) => {
          if (reason === "clear") {
            setSimpa("");
          } else {
            handleRow(newValue);
          }
        }}
        id="free-solo-dialog-demo"
        options={facilities}
        getOptionLabel={option => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.firstname;
        }}
        //isOptionEqualToValue={(option, value) => option.id === value.id}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option._id === value._id
        }
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        noOptionsText={
          val === "" ? "Type something..." : `${val} was not found`
        }
        renderOption={(props, option) => (
          <Box
            {...props}
            style={{display: "flex", flexWrap: "wrap"}}
            gap={1}
            //onClick={() => handleRow(option)}
          >
            <Typography sx={{fontSize: "0.75rem"}}>
              {option.firstname}
            </Typography>
            <Typography sx={{fontSize: "0.75rem"}}>
              {option.middlename}
            </Typography>
            <Typography sx={{fontSize: "0.75rem"}}>
              {option.lastname}
            </Typography>

            {option.dob && (
              <Typography sx={{fontSize: "0.75rem"}}>
                {option.dob && formatDistanceToNowStrict(new Date(option.dob))}
              </Typography>
            )}

            <Typography sx={{fontSize: "0.75rem"}}>{option.gender}</Typography>

            <Typography sx={{fontSize: "0.75rem"}}>
              {option.profession}
            </Typography>

            <Typography sx={{fontSize: "0.75rem"}}>{option.phone}</Typography>
          </Box>
        )}
        sx={{
          width: "100%",
        }}
        freeSolo={false}
        renderInput={params => (
          <TextField
            {...params}
            label={label || "Search for Client"}
            onChange={e => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem",
              backgroundColor: "#ffffff",
              "& .MuiInputBase-input": {
                height: "0.9rem",
                fontSize: "0.75rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: {color: "#2d2d2d"},
            }}
          />
        )}
      />
    </div>
  );
}
