import {useState, useEffect, useCallback, useContext} from "react";
import {Box, Grid, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import PatientProfile from "../../../Client/PatientProfile";
import {ClientSearch} from "../../../helpers/ClientSearch";
import CustomSelect from "../../../../components/inputs/basic/Select";
import {useForm} from "react-hook-form";
import {FormsHeaderText} from "../../../../components/texts";
import ModalBox from "../../../../components/modal";
<<<<<<< HEAD
import ClaimCreateComplaint from "./Complaints";
import ClaimCreateDiagnosis from "./Diagnosis";
import ClaimCreateService from "./Services";
=======
import PreauthorizationCreateComplaint from "./Complaints";
import PreauthorizationCreateDiagnosis from "./Diagnosis";
import PreauthorizationCreateService from "./Services";
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

const random = require("random-string-generator");

import {
  getComplaintColumns,
  getDiagnosisColumns,
  getServicesColumns,
} from "./columns";
import CustomTable from "../../../../components/customtable";
import Textarea from "../../../../components/inputs/basic/Textarea";
import Input from "../../../../components/inputs/basic/Input";
import dayjs from "dayjs";
import {toast} from "react-toastify";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {SelectAdmission, SelectAppointment} from "../claims/ClaimsCreate";
<<<<<<< HEAD

const PreAuthCreateComponent = ({handleGoBack}) => {
  const claimsServer = client.service("preauth");
=======
import TextAreaVoiceAndText from "../../../../components/inputs/basic/Textarea/VoiceAndText";

const PreAuthCreateComponent = ({handleGoBack}) => {
  const preAuthServer = client.service("preauth");
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [clearClientSearch, setClearClientSearch] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [complaintModal, setComplaintModal] = useState(false);
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosisModal, setDiagnosisModal] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceModal, setServiceModal] = useState(false);
  const policyServer = client.service("policy");
  const [policy, setPolicy] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [admissonModal, setAdmissionModal] = useState(false);
<<<<<<< HEAD

  const {control, handleSubmit, register, reset, watch, setValue} = useForm({
    defaultValues: {
      claimtype: "Fee for Service",
=======
  const [clinicFindInputType, setClinicFindInputType] = useState("type");
  const [investigationInputType, setInvestigationInputType] = useState("type");
  const [drugsInputType, setDrugsInputType] = useState("type");
  const [treatmentInputType, setTreatmentInputType] = useState("type");
  const [commentsInputType, setCommentsInputType] = useState("type");

  const {control, handleSubmit, register, reset, watch, setValue} = useForm({
    defaultValues: {
      preauthtype: "Fee for Service",
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
    },
  });

  useEffect(() => {
    setState(prev => ({
      ...prev,
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: {},
      },
    }));
  }, []);

  const getTotalPreAuthAmount = useCallback(() => {
    if (services.length === 0) return;

    const sum = services.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);

    console.log(sum);

    setValue("totalamount", sum);
  }, [services]);

  useEffect(() => {
    getTotalPreAuthAmount();
  }, [getTotalPreAuthAmount]);

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

  const getPolicy = useCallback(() => {
    policyServer
      .find({
        query: {
          // organizationId: user.currentEmployee.facilityDetail._id,
          $or: [
            {
              "principal._id": state.ClientModule.selectedClient?._id,
            },
            {
              "dependents._id": state.ClientModule.selectedClient?._id,
            },
          ],
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        console.log("Policy", res);
        setPolicy(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [state.ClientModule]);

  useEffect(() => {
    getPolicy();
  }, [getPolicy]);

  const complaintColumns = getComplaintColumns();
  const diagnosisColumns = getDiagnosisColumns();
  const servicesColumns = getServicesColumns();

<<<<<<< HEAD
=======
  // useEffect(() => {
  //   hideActionLoader();
  // }, []);

>>>>>>> 6629424bb56c5124204d6f95a047225340175196
  const handleCreatePreAuthorization = async data => {
    if (!state.ClientModule.selectedClient._id)
      return toast.warning("Please add Client..");

    showActionLoader();

    const employee = user.currentEmployee;
    const facility = employee.facilityDetail;

    const clinical_data = data;

    //REMOVE DATA THAT'S ALREADY IN CLAIM'S OBJECT
    // delete clinical_data.totalamount;
    // delete clinical_data.claimtype;
    // delete clinical_data.comments;
    // delete clinical_data.patientstate;
<<<<<<< HEAD

    const document = {
      policy: policy,
      hmopayer: policy.organization,
      sponsor: policy.sponsor,
      claimtype: data.claimtype,
=======
    const statushx = {
      status: "Submitted",
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
      employeeId: employee.userId,
      comment: "Submission of Preauthorization",
    };

    const document = {
      policy: policy,
      hmopayer: policy?.organization,
      statushx: statushx,
      sponsor: policy?.sponsor,
      preauthtype: data.preauthtype,
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
      totalamount: data.totalamount,
      comments: data.comments,
      patientstate: data.patientstate,
      provider: facility,
      services: services,
<<<<<<< HEAD
=======
      priority: data.prioriy,
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
      beneficiary: state.ClientModule.selectedClient,
      submissiondate: dayjs(),
      submissionby: employee,
      status: "Submitted",
      preauthid: random(12, "uppernumeric"),
<<<<<<< HEAD
      appointmentid: selectedAppointment?._id,
      admissionid: selectedAdmission?._id,
=======
      appointment: selectedAppointment,
      admission: selectedAdmission,
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
      geolocation: {
        type: "Point",
        coordinates: [state.coordinates.latitude, state.coordinates.longitude],
      },
      clinical_details: {
        ...clinical_data,
        diagnosis: diagnosis,
        complaints: complaints,
      },
    };

<<<<<<< HEAD
    console.log(document);

    await claimsServer
=======
    // console.log(document);

    await preAuthServer
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
      .create(document)
      .then(res => {
        hideActionLoader();
        toast.success("You have succesfully created a Preauthorization");
        setClearClientSearch(true);
        setClearClientSearch(false);
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Failed to create Preauthorization ${err}`);
      });
  };

  const patientState = watch("patientstate");

  useEffect(() => {
    if (patientState === "outpatient") {
      setAppointmentModal(true);
    } else if (patientState === "inpatient") {
      setAdmissionModal(true);
    }
  }, [patientState]);

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
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <ModalBox
        open={complaintModal}
        onClose={() => setComplaintModal(false)}
<<<<<<< HEAD
        header="Add Complaints to Claim"
      >
        <ClaimCreateComplaint
=======
        header="Add Complaints to Preauthorization"
      >
        <PreauthorizationCreateComplaint
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
          closeModal={() => setComplaintModal(false)}
          setComplaints={setComplaints}
        />
      </ModalBox>

      <ModalBox
        open={diagnosisModal}
        onClose={() => setDiagnosisModal(false)}
<<<<<<< HEAD
        header="Add Complaints to Claim"
      >
        <ClaimCreateDiagnosis
=======
        header="Add Diagnosis to Preauthorization"
      >
        <PreauthorizationCreateDiagnosis
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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

      <ModalBox
        open={serviceModal}
        onClose={() => setServiceModal(false)}
<<<<<<< HEAD
        header="Add Services to Claim"
      >
        <ClaimCreateService
=======
        header="Add Services to Preauthorization"
      >
        <PreauthorizationCreateService
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
          closeModal={() => setServiceModal(false)}
          setServices={setServices}
        />
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
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Create a New Preauthorization
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
            onClick={handleSubmit(handleCreatePreAuthorization)}
          >
            <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
            Create Preauthorization
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
              />
            </Grid>

            <Grid item lg={3} md={3.5}>
              <CustomSelect
<<<<<<< HEAD
                label="Urgency"
                required
                control={control}
                name="urgency"
                options={["Urgent"]}
=======
                label="Priority"
                required
                control={control}
                name="priority"
                options={["Low", "Medium", "High", "Emergency"]}
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                New Complaint
              </GlobalCustomButton>
            </Box>

            <Box>
              <CustomTable
                title={""}
                columns={complaintColumns}
                data={complaints}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                //conditionalRowStyles={conditionalRowStyles}
                progressPending={false}
                CustomEmptyData={
                  <Typography sx={{fontSize: "0.8rem"}}>
                    You've not added a Complaint yet...
                  </Typography>
                }
              />
            </Box>
          </Box>

          <Box mb={2}>
<<<<<<< HEAD
            <FormsHeaderText text="Clinical Findings" />
=======
            <TextAreaVoiceAndText
              label="Clinical Findings"
              type={clinicFindInputType}
              changeType={setClinicFindInputType}
              register={register("clinical_findings")}
              voiceOnChange={value => setValue("clinical_findings", value)}
            />
            {/* <FormsHeaderText text="Clinical Findings" />
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("clinical_findings")}
              />
<<<<<<< HEAD
            </Box>
=======
            </Box> */}
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                New Diagnosis
              </GlobalCustomButton>
            </Box>

            <Box>
              <CustomTable
                title={""}
                columns={diagnosisColumns}
                data={diagnosis}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                //conditionalRowStyles={conditionalRowStyles}
                progressPending={false}
                CustomEmptyData={
                  <Typography sx={{fontSize: "0.8rem"}}>
                    You've not added a Diagnosis yet...
                  </Typography>
                }
              />
            </Box>
          </Box>

          <Box mb={2}>
<<<<<<< HEAD
            <FormsHeaderText text="Investigation" />
=======
            <TextAreaVoiceAndText
              label="Investigation"
              type={investigationInputType}
              changeType={setInvestigationInputType}
              register={register("investigation")}
              voiceOnChange={value => setValue("investigation", value)}
            />

            {/* <FormsHeaderText text="Investigation" />
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("investigation")}
              />
<<<<<<< HEAD
            </Box>
          </Box>

          <Box mb={2}>
            <FormsHeaderText text="Drugs" />
=======
            </Box> */}
          </Box>

          <Box mb={2}>
            <TextAreaVoiceAndText
              label="Drugs"
              type={drugsInputType}
              changeType={setDrugsInputType}
              register={register("drugs")}
              voiceOnChange={value => setValue("drugs", value)}
            />

            {/* <FormsHeaderText text="Drugs" />
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("drugs")}
              />
<<<<<<< HEAD
            </Box>
          </Box>

          <Box mb={2}>
            <FormsHeaderText text="Treatment" />
=======
            </Box> */}
          </Box>

          <Box mb={2}>
            <TextAreaVoiceAndText
              label="Treatments"
              type={treatmentInputType}
              changeType={setTreatmentInputType}
              register={register("treatment")}
              voiceOnChange={value => setValue("treatment", value)}
            />

            {/* <FormsHeaderText text="Treatment" />
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("treatment")}
              />
<<<<<<< HEAD
            </Box>
=======
            </Box> */}
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
          </Box>

          <Box
            mb={2}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            gap={1.5}
          >
<<<<<<< HEAD
            <FormsHeaderText text="Claim's Info" />
=======
            <FormsHeaderText text="Preauthorization's Info" />
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomSelect
<<<<<<< HEAD
                  label="Claim Type"
                  control={control}
                  name="claimtype"
=======
                  label="Preauthorization Type"
                  control={control}
                  name="preauthtype"
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
                  options={["Capitation", "Fee for Service"]}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
<<<<<<< HEAD
                  label="Total Claim's Amount"
=======
                  label="Total Preauthorization's Amount"
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
                  disabled
                  type="number"
                  register={register("totalamount")}
                />
              </Grid>
            </Grid>
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
              <FormsHeaderText text="Services Data" />

              <GlobalCustomButton
                onClick={() => {
                  if (!state.ClientModule.selectedClient._id)
                    return toast.warning("You need to select a client");
                  setServiceModal(true);
                }}
              >
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                New Service
              </GlobalCustomButton>
            </Box>

            <Box>
              <CustomTable
                title={""}
                columns={servicesColumns}
                data={services}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                //conditionalRowStyles={conditionalRowStyles}
                progressPending={false}
                CustomEmptyData={
                  <Typography sx={{fontSize: "0.8rem"}}>
                    You've not added a Service yet...
                  </Typography>
                }
              />
            </Box>
          </Box>

          <Box mb={2}>
<<<<<<< HEAD
            <FormsHeaderText text="Comments" />
=======
            <TextAreaVoiceAndText
              label="Comments"
              type={commentsInputType}
              changeType={setCommentsInputType}
              register={register("comments")}
              voiceOnChange={value => setValue("comments", value)}
            />

            {/* <FormsHeaderText text="Comments" />
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("comments")}
              />
<<<<<<< HEAD
            </Box>
=======
            </Box> */}
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PreAuthCreateComponent;
