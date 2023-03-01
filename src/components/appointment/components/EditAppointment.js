import {useState, useContext, useEffect, useCallback} from "react";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import dayjs from "dayjs";

import client from "../../../feathers";
import {ObjectContext, UserContext} from "../../../context";
import {ClientSearch} from "../../../hsmodules/helpers/ClientSearch";
import EmployeeSearch from "../../../hsmodules/helpers/EmployeeSearch";
import LocationSearch from "../../../hsmodules/helpers/LocationSearch";
import ClientPaymentTypeSelect from "../../client-payment/ClientPaymentType";
import RadioButton from "../../inputs/basic/Radio";
import MuiDateTimePicker from "../../inputs/DateTime/MuiDateTimePicker";
import CustomSelect from "../../inputs/basic/Select";
import Textarea from "../../inputs/basic/Textarea";
import GlobalCustomButton from "../../buttons/CustomButton";
import GroupedRadio from "../../inputs/basic/Radio/GroupedRadio";
import OtpInput from "react-otp-input";
import ModalBox from "../../modal";

const EditAppointment = ({closeModal}) => {
  const appointmentsServer = client.service("appointments");
  const clientServer = client.service("client");
  const smsServer = client.service("sms");
  const emailServer = client.service("email");
  const notificationsServer = client.service("notification");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset, control, handleSubmit, watch} = useForm();
  const [patient, setPatient] = useState(null);
  const [practioner, setPractitioner] = useState(null);
  const [location, setLocation] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);
  const [otpModal, setOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState(null);

  const appointment = state.AppointmentModule.selectedAppointment;

  const getClient = useCallback(async () => {
    const patient = await clientServer.get(appointment.clientId);
    setPatient(patient);
  }, [appointment]);

  useEffect(() => {
    getClient();
    const data = {
      appointmentClass: appointment.appointmentClass,
      start_time: appointment.start_time,
      appointment_type: appointment.appointment_type,
      appointment_status: appointment.appointment_status,
      appointment_reason: appointment.appointment_reason,
    };

    reset(data);
  }, [state.AppointmentModule.selectedPatient, getClient]);

  const handleGetPatient = patient => {
    setPatient(patient);
  };

  const handleGetPractitioner = practioner => {
    setPractitioner(practioner);
  };

  const handleGetLocation = location => {
    setLocation(location);
  };

  const handleGetPaymentMode = paymentMode => {
    setPaymentMode(paymentMode);
  };

  const generateOTP = () => {
    var minm = 100000;
    var maxm = 999999;
    const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return otp.toString();
  };

  // Check if user has HMO
  const checkHMO = obj => obj.paymentmode === "HMO";

  const handleUpdateAppointment = async data => {
    const employee = user.currentEmployee;
    const generatedOTP = generateOTP();
    const isHMO = patient.paymentinfo.some(checkHMO);

    if (!patient) return toast.warning("Please select a Client/Patient");
    if (!practioner)
      return toast.warning("Please select a Practitioner/Employee");
    if (!location) return toast.warning("Please select a Location");
    if (!paymentMode)
      return toast.warning("Please select a Payment Mode for Client/Patient");
    if (isHMO && !otpValue) {
      return setOtpModal(true);
    }
    if (isHMO && otpValue.toString() !== appointment?.otp) {
      return toast.error("Incorrect OTP code supplied");
    }

    // showActionLoader();

    if (user.currentEmployee) {
      data.facility = employee.facilityDetail._id;
    }

    if (paymentMode.paymentmode.toLowerCase() === "hmo") {
      data.sponsor = paymentMode?.policy?.sponsor;
      data.hmo = paymentMode?.policy?.organization;
      data.policy = paymentMode?.policy;
    }

    data.locationId = location._id;
    data.practitionerId = practioner._id;
    data.clientId = patient._id;
    data.client = patient;
    data.firstname = patient.firstname;
    data.middlename = patient.middlename;
    data.lastname = patient.lastname;
    data.dob = patient.dob;
    data.gender = patient.gender;
    data.phone = patient.phone;
    data.email = patient.email;
    data.practitioner_name = `${practioner.firstname} ${practioner.lastname}`;
    data.practitioner_profession = practioner.profession;
    data.practitioner_department = practioner.department;
    data.location_name = location.name;
    data.location_type = location.locationType;
    data.otp = appointment.otp;
    data.organization_type = employee.facilityDetail.facilityType;
    data.actions = [
      {
        status: data.appointment_status,
        actor: user.currentEmployee._id,
      },
      ...appointment.actions,
    ];

    //return console.log(data);
    appointmentsServer
      .patch(appointment._id, data)
      .then(async res => {
        hideActionLoader();
        closeModal();
        toast.success("Appointment updated succesfully");
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error updating Appointment " + err);
      });
  };

  const handleOtpChange = otp => {
    setOtpValue(otp);
  };

  const watch_staus = watch("appointment_status");

  useEffect(() => {
    if (
      watch_staus?.toLowerCase() === "checked in" &&
      appointment?.client?.paymentinfo?.some(checkHMO) &&
      !appointment.verified
    ) {
      setOtpModal(true);
    } else {
      setOtpValue(null);
      setOtpModal(false);
    }
  }, [watch_staus]);

  return (
    <Box
      sx={{
        width: "70vw",
      }}
    >
      <ModalBox
        open={otpModal}
        onClose={() => {
          setOtpModal(false);
          () => setOtpValue(null);
        }}
        header={`Enter OTP Code to Continue to Check In Client`}
      >
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

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <GlobalCustomButton onClick={() => setOtpModal(false)}>
              Continue
            </GlobalCustomButton>

            <GlobalCustomButton
              color="error"
              onClick={() => {
                setOtpModal(false);
                () => setOtpValue(null);
              }}
            >
              Cancel
            </GlobalCustomButton>
          </Box>
        </Box>
      </ModalBox>

      <Grid container spacing={2} mb={1}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <ClientSearch
            getSearchfacility={handleGetPatient}
            id={patient?._id}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <ClientPaymentTypeSelect
            payments={patient?.paymentinfo}
            handleChange={handleGetPaymentMode}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <EmployeeSearch
            getSearchfacility={handleGetPractitioner}
            id={appointment?.practitionerId}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <LocationSearch
            getSearchfacility={handleGetLocation}
            id={appointment?.locationId}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <GroupedRadio
            control={control}
            required={true}
            name="appointmentClass"
            options={["On-site", "Teleconsultation", "Home Visit"]}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <MuiDateTimePicker
            control={control}
            name="start_time"
            label="Date and Time"
            required
            important
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
              "Checked Out",
              "Vitals Taken",
              "With Nurse",
              "With Doctor",
              "No Show",
              "Cancelled",
              "Billed",
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Textarea
            label="Reason for Appointment"
            important
            register={register("appointment_reason", {required: true})}
            type="text"
            placeholder="write here.."
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <GlobalCustomButton onClick={handleSubmit(handleUpdateAppointment)}>
          Update Appointment
        </GlobalCustomButton>

        <GlobalCustomButton onClick={closeModal} color="error">
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default EditAppointment;
