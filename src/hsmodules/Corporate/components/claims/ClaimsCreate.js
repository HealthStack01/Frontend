import { useState, useEffect, useCallback, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

import client from "../../../../feathers";
import { ObjectContext, UserContext } from "../../../../context";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import PatientProfile from "../../../Client/PatientProfile";
import { ClientSearch } from "../../../helpers/ClientSearch";
import CustomSelect from "../../../../components/inputs/basic/Select";
import { useForm } from "react-hook-form";
import { FormsHeaderText } from "../../../../components/texts";
import ModalBox from "../../../../components/modal";
import ClaimCreateComplaint from "./Complaints";
import ClaimCreateDiagnosis from "./Diagnosis";
import ClaimCreateService from "./Services";

import {
  getComplaintColumns,
  getDiagnosisColumns,
  getServicesColumns,
} from "./columns";
import CustomTable from "../../../../components/customtable";
import Textarea from "../../../../components/inputs/basic/Textarea";
import Input from "../../../../components/inputs/basic/Input";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import TextAreaVoiceAndText from "../../../../components/inputs/basic/Textarea/VoiceAndText";
import { generateRandomString } from "../../../helpers/generateString";

const ClaimCreateComponent = ({ handleGoBack, client_id }) => {
  const claimsServer = client.service("claims");
  const preAuthServer = client.service("preauth");
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const { user, setUser } = useContext(UserContext);
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
  const [preAuthServices, setPreAuthServices] = useState([]);
  const [clinicFindInputType, setClinicFindInputType] = useState("type");
  const [investigationInputType, setInvestigationInputType] = useState("type");
  const [drugsInputType, setDrugsInputType] = useState("type");
  const [treatmentInputType, setTreatmentInputType] = useState("type");
  const [commentsInputType, setCommentsInputType] = useState("type");

  const { control, handleSubmit, register, reset, watch, setValue } = useForm({
    defaultValues: {
      claimtype: "Fee for Service",
    },
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: {},
      },
    }));
  }, []);

  const getTotalClaimsAmount = useCallback(() => {
    if (services.length === 0) return;

    const sum = services.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);

    console.log(sum);

    setValue("totalamount", sum);
  }, [services]);

  useEffect(() => {
    getTotalClaimsAmount();
  }, [getTotalClaimsAmount]);

  const handleSelectClient = (client) => {
    const hmos = client.paymentinfo.filter(
      (item) => item.paymentmode.toLowerCase() === "hmo"
    );

    const firstHMO = hmos[0];

    setPolicy(firstHMO.policy);

    setState((prev) => ({
      ...prev,
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: client,
      },
    }));

    //
  };

  const complaintColumns = getComplaintColumns();
  const diagnosisColumns = getDiagnosisColumns();
  const servicesColumns = getServicesColumns();

  const handleCreateClaim = async (data) => {
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
    const statushx = {
      status: "Submitted",
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
      employeeId: employee.userId,
      comment: "Submission of claim",
    };

    const document = {
      policy: policy,
      hmopayer: policy?.organization,
      statushx: statushx,
      sponsor: policy?.sponsor,
      claimtype: data.claimtype,
      totalamount: data.totalamount,
      comments: data.comments,
      patientstate: data.patientstate,
      provider: facility,
      services: services,
      beneficiary: state.ClientModule.selectedClient,
      submissiondate: dayjs(),
      submissionby: employee,
      status: "Submitted",
      claimid: generateRandomString(14),
      appointmentid: selectedAppointment,
      admissionid: selectedAdmission,
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

    // console.log(document);

    await claimsServer
      .create(document)
      .then((res) => {
        hideActionLoader();
        toast.success("You have succesfully created a Claim");
      })
      .catch((err) => {
        hideActionLoader();
        toast.error(`Failed to create Claim ${err}`);
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

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedAdmission(null);
    setAppointmentModal(false);
  };

  const handleSelectAdmission = (admission) => {
    setSelectedAdmission(admission);
    setSelectedAppointment(null);
    setAdmissionModal(false);
  };

  const checkForPreauthorization = useCallback(() => {
    if (!state.ClientModule.selectedClient._id) return;
    setPreAuthServices([]);
    preAuthServer
      .find({
        query: {
          "provider._id": user.currentEmployee.facilityDetail._id,
          "beneficiary._id": state.ClientModule.selectedClient?._id,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((res) => {
        const data = res.data[0].services;
        const approvedServices = data.filter(
          (item) => item.status.toLowerCase() === "approved"
        );
        //setPreAuthServices(approvedServices);
        setServices([...approvedServices, ...services]);
        // setServices(prev => [...res.data[0].services, ...prev]);
        //console.log(res);
      });
  }, [state.ClientModule.selectedClient]);

  useEffect(() => {
    checkForPreauthorization();
  }, [checkForPreauthorization]);

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
        header="Add Complaints to Claim"
      >
        <ClaimCreateComplaint
          closeModal={() => setComplaintModal(false)}
          setComplaints={setComplaints}
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
        open={diagnosisModal}
        onClose={() => setDiagnosisModal(false)}
        header="Add Diagnosis to Claim"
      >
        <ClaimCreateDiagnosis
          closeModal={() => setDiagnosisModal(false)}
          setDiagnosis={setDiagnosis}
        />
      </ModalBox>

      <ModalBox
        open={serviceModal}
        onClose={() => setServiceModal(false)}
        header="Add Services to Claim"
      >
        <ClaimCreateService
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
            <ArrowBackIcon sx={{ marginRight: "3px" }} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Create a New Claim
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton onClick={handleSubmit(handleCreateClaim)}>
            <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
            Create Claim
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
            <Grid item lg={8} md={7}>
              <ClientSearch
                clear={clearClientSearch}
                getSearchfacility={handleSelectClient}
                id={client_id}
              />
            </Grid>

            <Grid item lg={4} md={5}>
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
                columns={complaintColumns}
                data={complaints}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                //conditionalRowStyles={conditionalRowStyles}
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
            {/* <FormsHeaderText text="Clinical Findings" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("clinical_findings")}
              />
            </Box> */}
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
                columns={diagnosisColumns}
                data={diagnosis}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                //conditionalRowStyles={conditionalRowStyles}
                progressPending={false}
                CustomEmptyData={
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    You've not added a Diagnosis yet...
                  </Typography>
                }
              />
            </Box>
          </Box>

          <Box mb={2}>
            <TextAreaVoiceAndText
              label="Investigation"
              type={investigationInputType}
              changeType={setInvestigationInputType}
              register={register("investigation")}
              voiceOnChange={(value) => setValue("investigation", value)}
            />
            {/* <FormsHeaderText text="Investigation" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("investigation")}
              />
            </Box> */}
          </Box>

          <Box mb={2}>
            <TextAreaVoiceAndText
              label="Drugs"
              type={drugsInputType}
              changeType={setDrugsInputType}
              register={register("drugs")}
              voiceOnChange={(value) => setValue("drugs", value)}
            />
            {/* <FormsHeaderText text="Drugs" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("drugs")}
              />
            </Box> */}
          </Box>

          <Box mb={2}>
            <TextAreaVoiceAndText
              label="Treatments"
              type={treatmentInputType}
              changeType={setTreatmentInputType}
              register={register("treatment")}
              voiceOnChange={(value) => setValue("treatment", value)}
            />
            {/* <FormsHeaderText text="Treatment" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("treatment")}
              />
            </Box> */}
          </Box>

          <Box
            mb={2}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            gap={1.5}
          >
            <FormsHeaderText text="Claim's Info" />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomSelect
                  label="Claim Type"
                  control={control}
                  name="claimtype"
                  options={["Capitation", "Fee for Service"]}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  label="Total Claim's Amount"
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
                <AddBoxIcon sx={{ marginRight: "3px" }} fontSize="small" />
                New Service
              </GlobalCustomButton>
            </Box>

            <Box>
              <CustomTable
                title={""}
                columns={servicesColumns}
                data={[...services]}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={handleRow}
                //conditionalRowStyles={conditionalRowStyles}
                progressPending={false}
                CustomEmptyData={
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    You've not added a Service yet...
                  </Typography>
                }
              />
            </Box>
          </Box>

          <Box mb={2}>
            <TextAreaVoiceAndText
              label="Comments"
              type={commentsInputType}
              changeType={setCommentsInputType}
              register={register("comments")}
              voiceOnChange={(value) => setValue("comments", value)}
            />
            {/* <FormsHeaderText text="Comments" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("comments")}
              />
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimCreateComponent;

export const SelectAppointment = ({ selectAppointment }) => {
  const appointmentServer = client.service("appointments");
  const { state } = useContext(ObjectContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedClient = state.ClientModule.selectedClient;

  const getClientAppointments = useCallback(async () => {
    setLoading(true);
    let query = {
      $sort: {
        createdAt: -1,
      },
      firstname: selectedClient.firstname,
      lastname: selectedClient.lastname,
    };

    const resp = await appointmentServer.find({ query: query });

    await setAppointments(resp.data);
    setLoading(false);
    //console.log(resp.data);
  }, [state.ClientModule.selectedClient]);

  useEffect(() => {
    getClientAppointments();
  }, [getClientAppointments]);

  const handleRow = (item) => {
    selectAppointment(item);
  };

  const appointmentColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Date/Time",
      key: "date",
      description: "Date/Time",
      selector: (row) => dayjs(row.start_time).format("DD/MM/YYYY HH:mm"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: (row) => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Last Name",
      key: "lastname",
      description: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Classification",
      key: "classification",
      description: "Classification",
      selector: (row) => row.appointmentClass,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Location",
      key: "location",
      description: "Location",
      selector: (row) => row.location_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Type",
      key: "type",
      description: "Type",
      selector: (row) => row.appointment_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "status",
      description: "Status",
      selector: (row) => row.appointment_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Reason",
      key: "reason",
      description: "Reason",
      selector: (row) => row.appointment_reason,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Practitioner",
      key: "practitioner",
      description: "Practitioner",
      selector: (row) => row.practitioner_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box
      sx={{
        width: "85vw",
      }}
    >
      <Box
        sx={{
          width: "85vw",
        }}
      >
        <CustomTable
          title={""}
          columns={appointmentColumns}
          data={appointments}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
        />
      </Box>
    </Box>
  );
};

export const SelectAdmission = ({ selectAdmission }) => {
  const admissionServer = client.service("order");
  const { state } = useContext(ObjectContext);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedClient = state.ClientModule.selectedClient;

  const getClientAppointments = useCallback(async () => {
    setLoading(true);
    let query = {
      $sort: {
        createdAt: -1,
      },
      firstname: selectedClient.firstname,
      lastname: selectedClient.lastname,
    };

    const resp = await admissionServer.find({ query: query });

    await setAdmissions(resp.data);
    setLoading(false);
    //console.log(resp.data);
  }, [state.ClientModule.selectedClient]);

  useEffect(() => {
    getClientAppointments();
  }, [getClientAppointments]);

  const handleRow = (item) => {
    selectAdmission(item);
  };

  const admissionColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Date/Time",
      key: "createdAt",
      description: "Date/Time",
      selector: (row) => dayjs(row?.createdAt).format("DD/MM/YYYY HH:mm"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: (row) => row.client.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Last Name",
      key: "lastname",
      description: "Last Name",
      selector: (row) => row.client.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Admission Order",
      key: "order",
      description: "Admission Order",
      selector: (row) => row.order,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Fulfilled",
      key: "fulfilled",
      description: "Fulfilled",
      selector: (row) => (row.fulfilled ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Status",
      key: "order_status",
      description: "Status",
      selector: (row) => row.order_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Requesting Practitioner",
      key: "requestingdoctor_Name",
      description: "Practitioner",
      selector: (row) => row.requestingdoctor_Name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box
      sx={{
        width: "85vw",
      }}
    >
      <Box>
        <CustomTable
          title={""}
          columns={admissionColumns}
          data={admissions}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
        />
      </Box>
    </Box>
  );
};
