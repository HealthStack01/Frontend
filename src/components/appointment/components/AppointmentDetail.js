import {useEffect, useContext, useState} from "react";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import Divider from "@mui/material/Divider";

import {ObjectContext} from "../../../context";
import Input from "../../inputs/basic/Input";
import dayjs from "dayjs";
import GlobalCustomButton from "../../buttons/CustomButton";
import Textarea from "../../inputs/basic/Textarea";
import EditAppointment from "./EditAppointment";
import ModalBox from "../../modal";
import OtpInput from "react-otp-input";
import client from "../../../feathers";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AppointmentDetail = ({closeModal, module}) => {
  const appointmentsServer = client.service("appointments");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {reset, handleSubmit, watch, setValue, register} = useForm();
  const [editModal, setEditModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState(null);
  const [isHMO, setIsHMO] = useState(false);
  const [appointment, setAppointment] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const appointment = state.AppointmentModule.selectedAppointment;

    const data = {
      firstname: appointment.firstname,
      middlename: appointment.middlename,
      lastname: appointment.lastname,
      email: appointment.email,
      phone: appointment.phone,
      age: formatDistanceToNowStrict(new Date(appointment.dob)),
      gender: appointment.gender,
      start_date: dayjs(appointment.start_time).format("DD/MM/YYYY HH:MM"),
      location: appointment.location_name,
      practioner: `${appointment.practitioner_name} (${appointment.practitioner_profession})`,
      status: appointment.appointment_status,
      class: appointment.appointmentClass,
      type: appointment.appointment_type,
      reason: appointment.appointment_reason,
    };
    reset(data);
    setAppointment(appointment);
  }, [state.AppointmentModule.selectedAppointment]);

  const checkHMO = obj => obj.paymentmode === "HMO";

  const defaultCheckinClient = () => {
    if (appointment?.client?.paymentinfo?.some(checkHMO)) {
      setOtpModal(true);
    } else {
      checkinPatient();
    }
  };

  const handleOtpChange = otp => {
    setOtpValue(otp);
  };

  const checkinPatient = (data, e) => {
    showActionLoader();
    appointmentsServer
      .patch(appointment._id, {appointment_status: "Checked In"})
      .then(res => {
        hideActionLoader();
        toast.success("Client succesfully Checked In");
        setState(prev => ({
          ...prev,
          AppointmentModule: {
            ...prev.AppointmentModule,
            selectedAppointment: res,
          },
        }));
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error updating Client, probable network issues or " + err);
      });
  };

  const handleIncorrectOTP = () => {
    toast.error(
      "The OTP code you supplied is incorrect, please provide the correct code."
    );
    setOtpValue(null);
  };

  const checkinPatientWithOTP = () => {
    if (otpValue.toString() !== appointment.otp) return handleIncorrectOTP();
    showActionLoader();
    appointmentsServer
      .patch(appointment._id, {
        appointment_status: "Checked In",
        verified: true,
      })
      .then(res => {
        hideActionLoader();
        toast.success("Client succesfully Checked In");
        setOtpModal(false);
        setState(prev => ({
          ...prev,
          AppointmentModule: {
            ...prev.AppointmentModule,
            selectedAppointment: res,
          },
        }));
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error updating Client, probable network issues or " + err);
      });
  };

  const checkOutPatient = () => {
    showActionLoader();
    appointmentsServer
      .patch(appointment._id, {appointment_status: "Checked Out"})
      .then(res => {
        hideActionLoader();
        toast.success("Client succesfully Checked In");
        setState(prev => ({
          ...prev,
          AppointmentModule: {
            ...prev.AppointmentModule,
            selectedAppointment: res,
          },
        }));
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error updating Client, probable network issues or " + err);
      });
  };

  const hanldeAttendToClient = async () => {
    if (appointment?.client?.paymentinfo?.some(checkHMO)) {
     console.log(appointment)
      if (!appointment.verified){
        toast.error("Appointment has not been verified")
        return
      }
     
    } 
    if (appointment.client) {
      await setState(prev => ({
        ...prev,
        ClientModule: {
          ...prev.ClientModule,
          selectedClient: appointment.client,
        },
      }));

      navigate("/app/clinic/documentation");
    } else {
      const patient = await client.service("client").get(appointment.clientId);
      await setState(prev => ({
        ...prev,
        ClientModule: {
          ...prev.ClientModule,
          selectedClient: patient,
        },
      }));

      navigate("/app/clinic/documentation");
    }
  };

  return (
    <Box
      sx={{
        width: "70vw",
      }}
    >
      <ModalBox
        open={otpModal}
        onClose={() => setOtpModal(false)}
        header={`Confirm Client Check-In with OTP Code`}
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

          <Box>
            <GlobalCustomButton onClick={checkinPatientWithOTP}>
              Confrim Check-In
            </GlobalCustomButton>
          </Box>
        </Box>
      </ModalBox>

      <ModalBox
        open={editModal}
        onClose={() => setEditModal(false)}
        header={`Edit Appointment`}
      >
        <EditAppointment closeModal={() => setEditModal(false)} />
      </ModalBox>
      <Box
        mb={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <GlobalCustomButton
          color="secondary"
          onClick={() => setEditModal(true)}
        >
          Edit Appointment
        </GlobalCustomButton>

        {appointment?.appointment_status?.toLowerCase() !== "checked in" && (
          <GlobalCustomButton color="success" onClick={defaultCheckinClient}>
            Check-In Client
          </GlobalCustomButton>
        )}

        {appointment?.appointment_status?.toLowerCase() === "checked in" && (
          <GlobalCustomButton color="success" onClick={checkOutPatient}>
            Check-Out Client
          </GlobalCustomButton>
        )}

        {module === "Clinic" && (
          <GlobalCustomButton color="info" onClick={hanldeAttendToClient}>
            Attend to Client
          </GlobalCustomButton>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input label="First Name" register={register("firstname")} disabled />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input
            label="Middle Name"
            register={register("middlename")}
            disabled
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input label="Last Name" register={register("lastname")} disabled />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input label="Email Address" register={register("email")} disabled />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input label="Phone Number" register={register("phone")} disabled />
        </Grid>
        <Grid item lg={2} md={4} sm={6} xs={12}>
          <Input label="Gender" register={register("gender")} disabled />
        </Grid>
        <Grid item lg={2} md={4} sm={6} xs={12}>
          <Input label="Age" register={register("age")} disabled />
        </Grid>
      </Grid>

      <Divider
        sx={{
          margin: "20px 0",
          background: "#2d2d2d",
        }}
      />

      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input
            label="Appointment Date"
            register={register("start_date")}
            disabled
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input
            label="Appointment Location"
            register={register("location")}
            disabled
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input
            label="Professional"
            register={register("practioner")}
            disabled
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input
            label="Appointment Status"
            register={register("status")}
            disabled
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input
            label="Appointment Class"
            register={register("class")}
            disabled
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Input
            label="Appointment Type"
            register={register("type")}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Appointment Reason"
            register={register("reason")}
            disabled
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentDetail;
