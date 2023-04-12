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
  //import {useNavigate} from 'react-router-dom'
  import {UserContext, ObjectContext} from "../../context";
  import {format, formatDistanceToNowStrict} from "date-fns";
  
  import "react-datepicker/dist/react-datepicker.css";
  import {PageWrapper} from "../../ui/styled/styles";
  import {TableMenu} from "../../ui/styled/global";
  import FilterMenu from "../../components/utilities/FilterMenu";
  import {Button} from "@mui/material";
  import CustomTable from "../../components/customtable";
  import ModalBox from "../../components/modal";
  import ModalHeader from "../Appointment/ui-components/Heading/modalHeader";
  import {Box, Grid} from "@mui/material";
  import OtpInput from "react-otp-input";
  import GlobalCustomButton from "../../components/buttons/CustomButton";
  
  export default function CheckIn() {
    const {state} = useContext(ObjectContext); //,setState
    const [showModal, setShowModal] = useState(0);
  
    return (
      <section className="section remPadTop">
        <CheckInList setShowModal={() => setShowModal(1)} />
        {showModal === 1 && (
          <ModalBox open onClose={() => setShowModal(0)}>
            <CheckOutList />
          </ModalBox>
        )}
      </section>
    );
  }
  
  export function CheckInList({openCreateModal, setShowModal}) {
    const ClientServ = client.service("appointments");
    const {user} = useContext(UserContext);
    const {state, setState} = useContext(ObjectContext);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("list");
    const [checkedin, setCheckedin] = useState(true); //TOGGLE IF TO SHOW CHECKED IN OR CHECKED OUT
    const [facilities, setFacilities] = useState([]);
    const [selectedCheckedIn, setSelectedCheckedIn] = useState();
    const [error, setError] = useState(false);
    const [checkoutAppointment, setCheckoutAppointment] = useState([]);
  
    // const handleRow = obj => {};
    //console.log(state.employeeLocation)
  
    const handleRow = async Client => {
      setShowModal(true);
      await setSelectedCheckedIn(Client);
      const newClientModule = {
        selectedCheckedIn: Client,
        show: "detail",
      };
      await setState(prevstate => ({
        ...prevstate,
        AppointmentModule: newClientModule,
      }));
    };
  
    const checkedinFn = () => {
      let query = {
        facility: user.currentEmployee.facilityDetail._id, // || "",
        $limit: 20,
        appointment_status: "Checked In",
        $sort: {
          createdAt: -1,
        },
      };
  
      ClientServ.find({query: query})
        .then(res => {
          console.log(res);
          setFacilities(res.data);
          setMessage(" Client  fetched successfully");
          setSuccess(true);
        })
        .catch(err => {
          console.log(err);
          // setMessage('Error fetching Client, probable network issues ' + err);
          setError(true);
        });
    };
  
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
        appointment_status: "Checked In",
        $sort: {
          createdAt: -1,
        },
      };
      if (state.employeeLocation.locationType !== "Front Desk") {
        query.locationId = state.employeeLocation.locationId;
      }
  
      ClientServ.find({query: query})
        .then(res => {
          console.log(res.data, "data fetched from appointment");
          setFacilities(res.data);
          setMessage(" Client  fetched successfully");
          setSuccess(true);
        })
        .catch(err => {
          console.log(err);
          // setMessage('Error fetching Client, probable network issues ' + err);
          setError(true);
        });
    };
  
    // const checkedoutFn = async() => {
    //   const findClient = await ClientServ.find({
    //     query: {
    //       $limit: 100,
    //       appointment_status: "Checked Out",
    //       $sort: {
    //         createdAt: -1,
    //       },
    //       $select: ["appointment_status"]
    //     },
    //   });
    //   console.log(select, "select here");
    // }
  
    // checked out
  
    const getCheckOut = useCallback(async () => {
      if (user.currentEmployee) {
        let stuff = {
          // hmo: user.currentEmployee.facilityDetail.facilityType === ,
          // facility: user.currentEmployee.facilityDetail._id,
          appointment_status: "Checked Out",
          // locationId:state.employeeLocation.locationId,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        };
        // if (state.employeeLocation.locationType !== 'Front Desk') {
        //   stuff.locationId = state.employeeLocation.locationId;
        // }
  
        const findAppointment = await ClientServ.find({query: stuff});
  
        await setCheckoutAppointment(findAppointment.data);
        console.log(findAppointment, "Check out");
      } else {
        if (user.stacker) {
          const findAppointment = await ClientServ.find({
            query: {
              $limit: 100,
              appointment_status: "Checked Out",
              $sort: {
                createdAt: -1,
              },
            },
          });
  
          await setCheckoutAppointment(findAppointment.data);
        }
      }
    }, []);
  
    const getCheckIn = useCallback(async () => {
      if (user.currentEmployee) {
        let stuff = {
          hmo: user.currentEmployee.facilityDetail.facilityType === "HMO",
          appointment_status: "Checked In",
          // locationId:state.employeeLocation.locationId,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        };
        // if (state.employeeLocation.locationType !== 'Front Desk') {
        //   stuff.locationId = state.employeeLocation.locationId;
        // }
  
        const findClient = await ClientServ.find({query: stuff});
  
        await setFacilities(findClient.data);
        console.log(findClient, "Check In....");
      } else {
        if (user.stacker) {
          const findClient = await ClientServ.find({
            query: {
              $limit: 100,
              appointment_status: "Checked In",
              $sort: {
                createdAt: -1,
              },
            },
          });
  
          await setFacilities(findClient.data);
        }
      }
    }, [checkedin]);
  
    useEffect(() => {
      getCheckIn();
      getCheckOut();
  
      ClientServ.on("created", obj => handleCalendarClose());
      ClientServ.on("updated", obj => handleCalendarClose());
      ClientServ.on("patched", obj => handleCalendarClose());
      ClientServ.on("removed", obj => handleCalendarClose());
    }, [getCheckIn]);
  
    //UPDATE COLUMNS CHANGE NAME OF EACH TO TABLE HEADER FOR CHECKIN
    const checkInColumns = [
      {
        name: "S/N",
        key: "sn",
        description: "SN",
        selector: row => row.sn,
        sortable: true,
        inputType: "HIDDEN",
      },
      {
        name: "Date/Time",
        key: "date",
        description: "Date/Time",
        selector: row => format(new Date(row.start_time), "dd/MM/yyyy HH:mm"),
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "First Name",
        key: "firstname",
        description: "First Name",
        selector: row => row.firstname,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
  
      {
        name: "Last Name",
        key: "lastname",
        description: "Last Name",
        selector: row => row.lastname,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Classification",
        key: "classification",
        description: "Classification",
        selector: row => row.appointmentClass,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Location",
        key: "location",
        description: "Location",
        selector: row => row.location_type,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Type",
        key: "type",
        description: "Type",
        selector: row => row.appointment_type,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Status",
        key: "status",
        description: "Status",
        selector: row => row.appointment_status,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Reason",
        key: "reason",
        description: "Reason",
        selector: row => row.appointment_reason,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Practitioner",
        key: "practitioner",
        description: "Practitioner",
        selector: row => row.practitioner_name,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
    ];
  
    //CREATE A SEPERATE COLUMN DATA FOR CHECKED OUT DATA, ONLY DIFFERENCE PROBABLY STATUS
    const checkedOutColumns = [
      {
        name: "S/N",
        key: "sn",
        description: "SN",
        selector: row => row.sn,
        sortable: true,
        inputType: "HIDDEN",
        width: "110px",
      },
      {
        name: "Date/Time",
        key: "date",
        description: "Date/Time",
        selector: row => format(new Date(row.start_time), "dd/MM/yyyy HH:mm"),
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
      {
        name: "First Name",
        key: "firstname",
        description: "First Name",
        selector: row => row.firstname,
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
      {
        name: "Last Name",
        key: "lastname",
        description: "Last Name",
        selector: row => row.lastname,
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
      {
        name: "Classification",
        key: "classification",
        description: "Classification",
        selector: row => row.appointmentClass,
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
      {
        name: "Location",
        key: "location",
        description: "Location",
        selector: row => row.location_type,
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
      {
        name: "Type",
        key: "type",
        description: "Type",
        selector: row => row.appointment_type,
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
      {
        name: "Status",
        key: "status",
        description: "Status",
        selector: row => row.appointment_status,
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
      {
        name: "Reason",
        key: "reason",
        description: "Reason",
        selector: row => row.appointment_reason,
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
      {
        name: "Practitioner",
        key: "practitioner",
        description: "Practitioner",
        selector: row => row.practitioner_name,
        sortable: true,
        required: true,
        inputType: "TEXT",
        width: "110px",
      },
    ];
  
    return (
      <div>
        <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
          <TableMenu>
            <div style={{display: "flex", alignItems: "center"}}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
                {!checkedin
                  ? "List of Checked-In Patients"
                  : "List of Checked-Out Patients"}
              </h2>
            </div>
  
            <Box>
              {/* {checkedin === false ? <GlobalCustomButton onClick={() => {setCheckedin(true)}}>Check In</GlobalCustomButton> : <GlobalCustomButton onClick={() => {setCheckedin(false)}}>Check Out</GlobalCustomButton>}
              FIRE YOUR TOGGLE FUNCTION HERE SWITCHING FROM CHECK IN TO CHECK OUT VICE VERSA */}
  
              {!checkedin ? (
                <GlobalCustomButton
                  onClick={() => {
                    setCheckedin(true);
                    // checkedinFn();
                  }}
                >
                  Check Out
                </GlobalCustomButton>
              ) : (
                <GlobalCustomButton
                  onClick={() => {
                    setCheckedin(false);
                  }}
                >
                  Check In
                </GlobalCustomButton>
              )}
              {/* FIRE YOUR TOGGLE FUNCTION HERE SWITCHING FROM CHECK IN TO CHECK OUT VICE VERSA */}
            </Box>
          </TableMenu>
  
          <div
            style={{
              width: "100%",
              height: "cal(100vh - 180px)",
              overflow: "auto",
            }}
          >
            {!checkedin ? (
              <>
                <CustomTable
                  title={""}
                  columns={checkInColumns}
                  data={facilities}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRow}
                  progressPending={loading}
                  //conditionalRowStyles={conditionalRowStyles}
                />
              </>
            ) : (
              <>
                <CustomTable
                  title={""}
                  columns={checkedOutColumns}
                  data={checkoutAppointment}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRow}
                  progressPending={loading}
                  //conditionalRowStyles={conditionalRowStyles}
                />
              </>
            )}
          </div>
        </PageWrapper>
      </div>
    );
  }
  
  export function CheckOutList({showModal, setShowModal}) {
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
    const [enterOTP, setEnterOTP] = useState(false);
    const [otp, setOtp] = useState("");
  
    const Client = state.AppointmentModule.selectedCheckedIn;
    console.log(state.AppointmentModule, "niccee");
    console.log(Client, "hjh");
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
    const handleOtp = otp => {
      setOtp(otp);
    };
  
    return (
      <>
        <Grid container spacing={2} sx={{width: "60vh"}}>
          <Grid item xs={12} sm={6}>
            <ModalHeader text={"Client Details"} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={3} md={6} sx={{marginLeft: "auto"}}>
              {/* <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                }}
                onClick={() => setEnterOTP(true)}
              >
                Enter OTP
              </Button> */}
            </Grid>
            {/* <MdCancel
              onClick={() => {
                setShowModal(false);
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
            /> */}
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              First Name:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.firstname}
            </span>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Middle Name:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.middlename}
            </span>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Last Name:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.lastname}
            </span>
          </Grid>
        </Grid>
  
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Age:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {formatDistanceToNowStrict(new Date(Client?.dob))}
            </span>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Gender:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.gender}
            </span>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Phone No:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.phone}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Email:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.email}
            </span>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Start Time:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.start_time}
              {format(new Date(Client.start_time), "dd/MM/yyyy HH:mm")}
            </span>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Location:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {/* {`${Client?.location_name} (${Client.location_type})`} */}
            </span>
          </Grid>
  
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Professional:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {/* {`  ${Client.practitioner_name} (${Client.practitioner_profession})`} */}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Appointment Status:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.appointment_status}
            </span>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Appointment Class:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.appointmentClass}
            </span>
          </Grid>
  
          <Grid item xs={12} sm={3} md={4}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Appointment Type:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.appointment_type}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={3} md={12}>
            <span
              style={{
                color: " #0364FF",
                fontSize: "0.8rem",
                marginRight: ".8rem",
              }}
            >
              Reason for Appointment:
            </span>
            <span style={{color: " #000000", fontSize: "16px"}}>
              {Client?.appointment_reason}
            </span>
          </Grid>
        </Grid>
        {enterOTP && (
          <ModalBox open onClose={() => setEnterOTP(false)}>
            <div style={{width: "25vw", height: "auto"}}>
              <ModalHeader text={"Enter OTP"} />
              <OtpInput
                value={otp}
                onChange={handleOtp}
                numInputs={6}
                isInputSecure={true}
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
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {" "}
                Verify OTP
              </Button>
            </div>
          </ModalBox>
        )}
      </>
    );
  }
  