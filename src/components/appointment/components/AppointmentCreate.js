import {useState, useContext, useEffect} from "react";
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

const AppointmentCreate = ({closeModal}) => {
  const appointmentsServer = client.service("appointments");
  const smsServer = client.service("sms");
  const emailServer = client.service("email");
  const notificationsServer = client.service("notification");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset, control, handleSubmit} = useForm();
  const [patient, setPatient] = useState(null);
  const [practioner, setPractitioner] = useState(null);
  const [location, setLocation] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);

  useEffect(() => {
    setPatient(state.AppointmentModule.selectedPatient);
  }, [state.AppointmentModule.selectedPatient]);

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
    console.log(paymentMode);
    setPaymentMode(paymentMode);
  };

  const generateOTP = () => {
    var minm = 100000;
    var maxm = 999999;
    const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return otp.toString();
  };

  // useEffect(() => {
  //   if(patient.paymentinfo.some(checkHMO)){

  //   }
  //   else{
  //     setPaymentMode()
  //   }

  // }, [patient])

  // Check if user has HMO
  const checkHMO = obj => obj.paymentmode === "HMO";

  const handleCreateAppointment = async data => {
    const employee = user.currentEmployee;
    const generatedOTP = generateOTP();
    const isHMO = patient.paymentinfo.some(checkHMO);

    if (!patient) return toast.warning("Please select a Client/Patient");
    if (!practioner)
      return toast.warning("Please select a Practitioner/Employee");
    if (!location) return toast.warning("Please select a Location");
    if (!paymentMode)
      return toast.warning("Please select a Payment Mode for Client/Patient");
    if (!state.CommunicationModule.defaultEmail.emailConfig?.username)
      return setState(prev => ({
        ...prev,
        CommunicationModule: {
          ...prev.CommunicationModule,
          configEmailModal: true,
        },
      }));

    showActionLoader();

    if (user.currentEmployee) {
      data.facility = employee.facilityDetail._id; // or from facility dropdown
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
      description: `You have a schedule appointment with ${patient.firstname} ${
        patient.lastname
      } set to take place exactly at ${dayjs(data.start_time).format(
        "DD/MM/YYYY hh:mm"
      )} in ${location.name} Clinic for ${data.appointment_reason}`,
      facilityId: employee.facilityDetail._id,
      sender: `${employee.firstname} ${employee.lastname}`,
      senderId: employee._id,
      pageUrl: "/app/clinic/appointments",
      priority: "normal",
      dest_userId: [practioner._id],
    };

    const emailObj = {
      organizationId: employee.facilityDetail._id,
      organizationName: employee.facilityDetail.facilityName,
      html: `<p>You have been scheduled for an appointment with ${
        practioner.profession
      } ${practioner.firstname} ${practioner.lastname} at ${dayjs(
        data.start_time
      ).format("DD/MM/YYYY hh:mm")} ${
        isHMO ? `and your OTP code is ${generatedOTP}` : ""
      } </p>`,

      text: ``,
      status: "pending",
      subject: `SCHEDULED APPOINTMENT WITH ${
        employee.facilityDetail.facilityName
      } AT ${dayjs(data.date).format("DD/MM/YYYY hh:mm")}`,
      to: patient.email,
      name: employee.facilityDetail.facilityName,
      from: state.CommunicationModule.defaultEmail.emailConfig.username,
    };

    const smsObj = {
      message: `You have been scheduled for an appointment with ${
        practioner.profession
      } ${practioner.firstname} ${practioner.lastname} at ${dayjs(
        data.start_time
      ).format("DD/MM/YYYY hh:mm")} ${
        isHMO ? `and your OTP code is ${generatedOTP}` : ""
      } `,
      recipients: [patient.phone],
    };

    //console.log(data);

    appointmentsServer
      .create(data)
      .then(async res => {
        hideActionLoader();
        closeModal();
        toast.success(
          "Appointment created succesfully, Kindly bill patient if required"
        );
        await notificationsServer.create(notificationObj);
        //await smsServer.create(smsObj);
        await emailServer.create(emailObj);
        hideActionLoader();

        // await axios.post(
        //   `https://portal.nigeriabulksms.com/api/?username=apmis&apmis=pass&message=${smsObj.message}&sender=${user.currentEmployee.facilityDetail.facilityName}&mobiles=${chosen.phone}`
        // );
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error creating Appointment " + err);
      });
  };

  return (
    <Box
      sx={{
        width: "70vw",
      }}
    >
      <Grid container spacing={2} mb={1}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <ClientSearch getSearchfacility={handleGetPatient} />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <ClientPaymentTypeSelect
            payments={patient?.paymentinfo}
            handleChange={handleGetPaymentMode}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <EmployeeSearch getSearchfacility={handleGetPractitioner} />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <LocationSearch getSearchfacility={handleGetLocation} />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <RadioButton
            name="appointmentClass"
            register={register("appointmentClass", {required: true})}
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
        <GlobalCustomButton onClick={handleSubmit(handleCreateAppointment)}>
          Create Appointment
        </GlobalCustomButton>

        <GlobalCustomButton onClick={closeModal} color="error">
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default AppointmentCreate;
