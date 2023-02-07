/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";
import client from "../../feathers";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";

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
          <CheckDetails />
        </ModalBox>
      )}
    </section>
  );
}

export function CheckInList({openCreateModal, setShowModal}) {
  const ClientServ = client.service("appointments");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("list");
  const [checkedin, setCheckedin] = useState(true); //TOGGLE IF TO SHOW CHECKED IN OR CHECKED OUT

  const handleRow = obj => {};
  //console.log(state.employeeLocation)

  const handleSearch = val => {};

  const getFacilities = async () => {};

  const dummyData = [
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "Out patient",
      encounter_status: "Confirmed",
      expiration_status: "Active",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Filed",
    },
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "In patient",
      encounter_status: "Confirmed",
      expiration_status: "Expired",
      preauth_requested: "",
      capitation: "Unfiled",
      fee_for_service: "Not Required",
    },
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "In patient",
      encounter_status: "Unconfirmed",
      expiration_status: "Active",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Required",
    },

    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "Out patient",
      encounter_status: "Confirmed",
      expiration_status: "Active",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Filed",
    },
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "Out patient",
      encounter_status: "Confirmed",
      expiration_status: "Cancelled",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Filed",
    },
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "In patient",
      encounter_status: "Uncorfirmed",
      expiration_status: "Active",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Required",
    },
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "Out patient",
      encounter_status: "Unconfirmed",
      expiration_status: "Expired",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Filed",
    },
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "In patient",
      encounter_status: "Confirmed",
      expiration_status: "Cancelled",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Required",
    },
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "Out patient",
      encounter_status: "Unconfirmed",
      expiration_status: "Active",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Required",
    },
    {
      date_of_encounter: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      premium_status: "",
      health_encounter_type: "In patient",
      encounter_status: "Confirmed",
      expiration_status: "Active",
      preauth_requested: "",
      capitation: "Filed",
      fee_for_service: "Not Filed",
    },
  ];

  //UPDATE COLUMNS CHANGE NAME OF EACH TO TABLE HEADER FOR CHECKIN
  const checkInColumns = [
    {
      name: "Date of Encounter",
      key: "date_of_encounter",
      description: "Enter date of encounter",
      selector: row => row.date_of_encounter,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Patients Name",
      key: "patients_name",
      description: "Enter patients name",
      selector: row => row.patients_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Policy ID",
      key: "policy_id",
      description: "Enter policy ID",
      selector: row => row.policy_id,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Premium Status",
      key: "premium_status",
      description: "Enter premium status",
      selector: row => row.premium_status,
      // cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Health encounter type",
      key: "health_encounter_type",
      description: "Enter health encounter type",
      selector: (row, i) => row.health_encounter_type,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Encounter Status",
      key: "encounter_status",
      description: "Enter your encounter status",
      selector: (row, i) => row.encounter_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Expiration Status",
      key: "expiration_status",
      description: "Enter your expiration status",
      selector: (row, i) => row.expiration_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "PreAuth Requested",
      key: "preAuth_requested",
      description: "Enter your preauth request",
      selector: (row, i) => row.preauth_requested,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Capitation",
      key: "capitation",
      description: "Enter capitation",
      selector: (row, i) => row.capitation,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Fee for Service",
      key: "fee_for_service",
      description: "Enter fee for the service",
      selector: (row, i) => row.fee_for_service,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  //CREATE A SEPERATE COLUMN DATA FOR CHECKED OUT DATA, ONLY DIFFERENCE PROBABLY STATUS
  const checkedOutColumns = [];

  return (
    <div className="level">
      <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
        <TableMenu>
          <div style={{display: "flex", alignItems: "center"}}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
              {checkedin
                ? "List of Checked-In Patients"
                : "List of Checked-Out Patients"}
            </h2>
          </div>

          <Box>
            {/* FIRE YOUR TOGGLE FUNCTION HERE SWITCHING FROM CHECK IN TO CHECK OUT VICE VERSA */}
            <GlobalCustomButton>HELLO</GlobalCustomButton>
          </Box>
        </TableMenu>

        <div
          style={{
            width: "100%",
            height: "cal(100vh - 180px)",
            overflow: "auto",
          }}
        >
          {checkedin ? (
            <>
              <CustomTable
                title={""}
                columns={checkInColumns}
                data={dummyData}
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
                data={dummyData}
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

export function CheckDetails({showModal, setShowModal}) {
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
  const handleOtp = otp => {
    setOtp(otp);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ModalHeader text={"Client Details"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={3} md={6} sx={{marginLeft: "auto"}}>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "capitalize",
                width: "100%",
              }}
              onClick={() => setEnterOTP(true)}
            >
              Enter OTP
            </Button>
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
              fontSize: "16px",
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
              fontSize: "16px",
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
              fontSize: "16px",
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
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Age:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {/* {formatDistanceToNowStrict(new Date(Client?.dob))} */}
          </span>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Gender:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {Client.gender}
          </span>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Phone No:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {Client.phone}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2} mb={2}>
        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Email:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {Client.email}
          </span>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Start Time:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {/* {format(new Date(Client.start_time), 'dd/MM/yyyy HH:mm')} */}
          </span>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Location:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {/* {`${Client.location_name} (${Client.location_type})`} */}
          </span>
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
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
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Appointment Status:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {Client.appointment_status}
          </span>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Appointment Class:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {Client.appointmentClass}
          </span>
        </Grid>

        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Appointment Type:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {Client.appointment_type}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={3} md={12}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "16px",
              marginRight: ".8rem",
            }}
          >
            Reason for Appointment:
          </span>
          <span style={{color: " #000000", fontSize: "16px"}}>
            {Client.appointment_reason}
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
