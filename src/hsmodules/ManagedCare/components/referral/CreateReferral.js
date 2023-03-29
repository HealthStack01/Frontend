import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useState, useContext, useEffect } from "react";
import client from "../../../../feathers";
import { useForm } from "react-hook-form";
import { UserContext, ObjectContext } from "../../../../context";
import { toast } from "bulma-toast";
import "react-datepicker/dist/react-datepicker.css";
import CustomTable from "../../../../components/customtable";
import ModalBox from "../../../../components/modal";
import { Grid, Box, Typography } from "@mui/material";
import { ClientSearch } from "../../../helpers/ClientSearch";
import Input from "../../../../components/inputs/basic/Input/index";
import Textarea from "../../../../components/inputs/basic/Textarea";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import { FormsHeaderText } from "../../../../components/texts";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import { FacilitySearch } from "../../../helpers/FacilitySearch";
import PatientProfile from "../../../Client/PatientProfile";
import CustomSelect from "../../../../components/inputs/basic/Select";
import TextAreaVoiceAndText from "../../../../components/inputs/basic/Textarea/VoiceAndText";
import CreateComplaint from "./Complaints";
import CreateDiagnosis from "./Diagnosis";
import { SelectAdmission, SelectAppointment } from "../claims/ClaimsCreate";

export function ReferralCreate({ handleGoBack }) {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue, control, watch } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState();
  const [clearClientSearch, setClearClientSearch] = useState(false);
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [complaints, setComplaints] = useState([]);
  const [complaintModal, setComplaintModal] = useState(false);
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosisModal, setDiagnosisModal] = useState(false);
  const ClientServ = client.service("appointments");
  const [drugsInputType, setDrugsInputType] = useState("type");
  const [clinicFindInputType, setClinicFindInputType] = useState("type");
  const { user } = useContext(UserContext); //,setUser
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [admissonModal, setAdmissionModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const [currentUser, setCurrentUser] = useState();

  const [appointment_status, setAppointment_status] = useState("");
  const [appointment_type, setAppointment_type] = useState("");

  const [chosen, setChosen] = useState();
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();

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
    setMessage("");
    setError(false);
    setSuccess(false);
    //   setShowModal(false),
    setState((prevstate) => ({
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
      .then((res) => {
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
      .catch((err) => {
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

  const patientState = watch("patientstate");

  useEffect(() => {
    if (patientState === "outpatient") {
      setAppointmentModal(true);
    } else if (patientState === "inpatient") {
      setAdmissionModal(true);
    }
  }, [patientState]);

  
  const complaintSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Complaint",
      key: "complaint",
      description: "Complaint",
      selector: (row) => row.complaint,
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Duration",
      key: "duration",
      description: "Duration",
      selector: (row) => row.duration,
      sortable: true,
      inputType: "TEXT",
    },
  ];

  const diagnosisSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Type",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.type,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Diagnosis",
      key: "sn",
      description: "SN",
      selector: (row, i) => row.code,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];

  const handleSelectClient = client => {
    setState(prev => ({
      ...prev,
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: client,
      },
    }));

    //
  };

  const handleSelectAppointment = appointment => {
    setSelectedAppointment(appointment);
    setSelectedAdmission(null);
    setAppointmentModal(false);
  };

 const handleSelectAdmission = admission => {
    setSelectedAdmission(admission);
    setSelectedAppointment(null);
    setAdmissionModal(false);
  };

  return (
    <Box
      style={{
        margin: "0 auto",
        width: "98%",
        height: "calc(100vh - 90px)",
        overflow: "scroll",
      }}
    >
      <ModalBox
        open={complaintModal}
        onClose={() => setComplaintModal(false)}
        header="Add Complaints"
      >
        <CreateComplaint
          closeModal={() => setComplaintModal(false)}
          setComplaints={setComplaints}
        />
      </ModalBox>

      <ModalBox
        open={diagnosisModal}
        onClose={() => setDiagnosisModal(false)}
        header="Add Diagnosis"
      >
        <CreateDiagnosis
          closeModal={() => setDiagnosisModal(false)}
          setDiagnosis={setDiagnosis}
        />
      </ModalBox>

      <ModalBox
        open={appointmentModal}
        onClose={() => setAppointmentModal(false)}
        header={`Appointments for ${state.ClientModule.selectedClient.firstname} ${state.ClientModule.selectedClient.lastname}`}
      >
        <SelectAppointment selectAppointment={handleSelectAppointment} />
      </ModalBox>

      <ModalBox
        open={admissonModal}
        onClose={() => setAdmissionModal(false)}
        header={`Admission Orders for ${state.ClientModule.selectedClient.firstname} ${state.ClientModule.selectedClient.lastname}`}
      >
        <SelectAdmission selectAdmission={handleSelectAdmission} />
      </ModalBox>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
          position: "sticky",
          zIndex: 99,
          top: 0,
          left: 0,
        }}
        mb={2}
        p={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon sx={{ marginRight: "3px" }} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Create a New Referral
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton
          // onClick={handleSubmit(handleCreatePreAuthorization)}
          >
            <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
            Create Referral
          </GlobalCustomButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        pr={2}
        pl={2}
      >
        <Box
          sx={{
            width: "25rem",
          }}
        >
          <PatientProfile />
        </Box>

        <Box
          sx={{
            width: "calc(100% - 26rem)",
          }}
        >

          <Grid container spacing={2} mb={2}>
            <Grid item lg={6} md={5}>
              <ClientSearch
                clear={clearClientSearch}
                getSearchfacility={handleSelectClient}
                label="Search Beneficiary"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                name="patientName"
                label="Referring Facility"
                value={"Test Organization"}
              />
            </Grid>
            <Grid item lg={6} md={5}>
              <FacilitySearch
                getSearchfacility={getSearchfacility}
                clear={success}
                label="Destination Facility"
              />
            </Grid>

            <Grid item lg={3} md={3.5}>
              <CustomSelect
                label="Priority"
                required
                control={control}
                name="priority"
                options={["Low", "Medium", "High", "Emergency"]}
              />
            </Grid>

            <Grid item lg={3} md={3.5}>
              <CustomSelect
                label="Patient Type"
                required
                control={control}
                name="patientstate"
                options={[
                  {
                    label: "In Patient",
                    value: "inpatient",
                  },

                  {
                    label: "Out Patient",
                    value: "outpatient",
                  },
                ]}
              />
            </Grid>
          </Grid>

          {patientState === "inpatient" && (
            <Grid container spacing={2} mb={2}>
              <Grid item sm={6} xs={12}>
                <MuiCustomDatePicker
                  control={control}
                  name="admission_date"
                  label="Admission Date"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <MuiCustomDatePicker
                  control={control}
                  name="discharged_date"
                  label="Discharged Date"
                />
              </Grid>
            </Grid>
          )}

          <Box mb={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              mb={1.5}
            >
              <FormsHeaderText text="Complaints Data" />

              <GlobalCustomButton onClick={() => setComplaintModal(true)}>
                <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
                New Complaint
              </GlobalCustomButton>
            </Box>

            <Box>
              <CustomTable
                title={""}
                columns={complaintSchema}
                data={complaints}
                pointerOnHover
                highlightOnHover
                striped
                progressPending={false}
                CustomEmptyData={
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    You've not added a Complaint yet...
                  </Typography>
                }
              />
            </Box>
          </Box>

          <Box mb={2}>
            <TextAreaVoiceAndText
              label="Clinical Findings"
              type={clinicFindInputType}
              changeType={setClinicFindInputType}
              register={register("clinical_findings")}
              voiceOnChange={(value) => setValue("clinical_findings", value)}
            />
          </Box>

          <Box mb={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              mb={1.5}
            >
              <FormsHeaderText text="Diagnosis Data" />

              <GlobalCustomButton onClick={() => setDiagnosisModal(true)}>
                <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
                New Diagnosis
              </GlobalCustomButton>
            </Box>

            <Box>
              <CustomTable
                title={""}
                columns={diagnosisSchema}
                data={diagnosis}
                pointerOnHover
                highlightOnHover
                striped
                progressPending={false}
                CustomEmptyData={
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    You've not added Diagnosis yet...
                  </Typography>
                }
              />
            </Box>
          </Box>
          <Box mb={2}>
            <TextAreaVoiceAndText
              label="Drugs/Treatments"
              type={drugsInputType}
              changeType={setDrugsInputType}
              register={register("drugs")}
              voiceOnChange={(value) => setValue("drugs", value)}
            />
          </Box>
          <Grid item xs={6}>
            <Textarea
              placeholder="Type your message here"
              name="reason"
              type="text"
              label="Reason for Request"
            />
          </Grid>
          <Grid item xs={6} mt={2}>
            <Input name="physicianName" label="Physician's Name" type="text" />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
