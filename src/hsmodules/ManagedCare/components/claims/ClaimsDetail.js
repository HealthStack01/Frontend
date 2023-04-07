import {useState, useEffect, useCallback, useContext} from "react";
import {Box, Grid, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Drawer from "@mui/material/Drawer";

import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import PatientProfile from "../../../Client/PatientProfile";
import {ClientSearch} from "../../../helpers/ClientSearch";
import CustomSelect from "../../../../components/inputs/basic/Select";
import {useForm} from "react-hook-form";
import {FormsHeaderText} from "../../../../components/texts";
import ModalBox from "../../../../components/modal";
import ClaimCreateComplaint from "./Complaints";
import ClaimCreateDiagnosis from "./Diagnosis";
import ClaimCreateService from "./Services";
import ClaimsChat from "./ClaimsChat";
import AssignClaim from "./AssignClaim";
import ClaimsStatus from "./ClaimsStatus";
import ClaimsTask from "../../Tasks";

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
import UpadteService from "./UpdateService";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";

const ClaimDetailComponent = ({handleGoBack, client_id}) => {
  const claimsServer = client.service("claims");
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
  const [chat, setChat] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [hold, setHold] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [view, setView] = useState("details");
  const [updateServiceModal, setUpdateServiceModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [confirmationDiaglog, setConfirmationDialog] = useState({
    open: false,
    message: "",
    type: "",
    action: null,
  });

  const selectedClaim = state.ClaimsModule.selectedClaim;
  const clinical_details = selectedClaim?.clinical_details || {};

  const {control, handleSubmit, register, reset, watch, setValue} = useForm({});

  useEffect(() => {
    const resetForm = {
      patientstate: selectedClaim.patientstate,
      claimtype: selectedClaim.claimtype,
      comments: selectedClaim.comments,
      totalamount: selectedClaim.totalamount,
      investigation: clinical_details.investigation || "",
      drugs: clinical_details.drugs || "",
      treatment: clinical_details.treatment || "",
      clinical_findings: clinical_details.clinical_findings || "",
      admission_date: clinical_details.admission_date || null,
      discharged_date: clinical_details.discharged_date || null,
      status: selectedClaim.status,
      date: selectedClaim.createdAt,
      provider_name: selectedClaim.provider.facilityName,
      submitted_by: `${selectedClaim.submissionby?.firstname} ${selectedClaim.submissionby?.lastname}`,
    };
    reset(resetForm);
    setServices(selectedClaim.services || []);
    setDiagnosis(clinical_details.diagnosis || []);
    setComplaints(clinical_details.complaints || []);
  }, [state.ClaimsModule.selectedClaim]);

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

  const handleUpdateClaim = async data => {
    return console.log(data);
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

    const document = {
      policy: policy,
      hmopayer: policy.organization,
      sponsor: policy.sponsor,
      claimtype: data.claimtype,
      totalamount: data.totalamount,
      comments: data.comments,
      patientstate: data.patientstate,
      provider: facility,
      services: services,
      beneficiary: state.ClientModule.selectedClient,
      submissiondate: dayjs(),
      submissionby: employee,

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

    console.log(document);

    await claimsServer
      .create(document)
      .then(res => {
        hideActionLoader();
        toast.success("You have succesfully created a Claim");
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Failed to create Claim ${err}`);
      });
  };

  const patientState = watch("patientstate");

  const statushxColumns = [
    {
      name: "SN",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "50px",
    },
    {
      name: "Updated By",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => row?.employeename,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Updated At",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => dayjs(row.date).format("DD/MM/YYYY hh:mm A"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Status",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => row.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Comment",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => row.comment,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
  ];

  const onServiceRowClick = item => {
    setState(prev => ({
      ...prev,
      ClaimsModule: {
        ...prev.ClaimsModule,
        selectedService: item,
      },
    }));
    setUpdateServiceModal(true);
  };

  const servicesConditionalRowStyles = [
    {
      when: row => row?.status?.toLowerCase() === "rejected",
      style: {
        backgroundColor: "pink",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const deleteDiagnosis = async diagnosis => {
    showActionLoader();
    const prevDiagnosis = selectedClaim.diagnosis || [];

    const newDiagnosis = prevDiagnosis.filter(
      item => item._id !== diagnosis._id
    );

    await claimsServer
      .patch(selectedPreAuth._id, {diagnosis: newDiagnosis})
      .then(res => {
        hideActionLoader();
        toast.success("You've successfully removed a Diagnosis");
        setState(prev => ({
          ...prev,
          ClaimsModule: {
            ...prev.ClaimsModule,
            selectedClaim: res,
          },
        }));
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Deleting Diagnosis failed due to ${err}`);
      });
  };

  const deleteComplaint = async complaint => {
    showActionLoader();
    const prevComplaints = selectedClaim.complaints || [];

    const newComplaints = prevComplaints.filter(
      item => item._id !== complaint._id
    );

    await preAuthServer
      .patch(selectedClaim._id, {complaints: newComplaints})
      .then(res => {
        hideActionLoader();
        toast.success("You've successfully removed a Complaint");
        setState(prev => ({
          ...prev,
          ClaimsModule: {
            ...prev.ClaimsModule,
            selectedClaim: res,
          },
        }));
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Deleting Complaint failed due to ${err}`);
      });
  };

  const deleteService = async service => {
    showActionLoader();
    const prevServices = selectedClaim.services || [];

    const newServices = prevServices.filter(item => item._id !== service._id);

    await claimsServer
      .patch(selectedClaim._id, {services: newServices})
      .then(res => {
        hideActionLoader();
        toast.success("You've successfully removed a Service");
        setState(prev => ({
          ...prev,
          ClaimsModule: {
            ...prev.ClaimsModule,
            selectedClaim: res,
          },
        }));
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Deleting Service failed due to ${err}`);
      });
  };

  const confirmDeleteDiagnosis = diagnosis => {
    setConfirmationDialog({
      open: true,
      message: `You're about to delete a Diagnosis ${diagnosis.diagnosis}`,
      type: "warning",
      action: () => deleteDiagnosis(diagnosis),
    });
  };

  const confirmDeleteComplaint = complaint => {
    setConfirmationDialog({
      open: true,
      message: `You're about to delete a Complaint ${complaint.complaint}`,
      type: "warning",
      action: () => deleteComplaint(complaint),
    });
  };

  const confirmDeleteService = service => {
    setConfirmationDialog({
      open: true,
      message: `You're about to delete a Service ${service.service.serviceName}`,
      type: "warning",
      action: () => deleteService(service),
    });
  };

  const cancelConfirmDialog = () => {
    setConfirmationDialog({
      open: false,
      message: "",
      type: "",
      action: null,
    });
  };

  const complaintColumns = getComplaintColumns(confirmDeleteComplaint, !edit);
  const diagnosisColumns = getDiagnosisColumns(confirmDeleteDiagnosis, !edit);
  const servicesColumns = getServicesColumns(confirmDeleteService, !edit);

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <CustomConfirmationDialog
        open={confirmationDiaglog.open}
        message={confirmationDiaglog.message}
        confirmationAction={confirmationDiaglog.action}
        type={confirmationDiaglog.type}
        cancelAction={cancelConfirmDialog}
      />
      <ModalBox
        open={updateServiceModal}
        onClose={() => setUpdateServiceModal(false)}
        header="Update Service"
      >
        <UpadteService closeModal={() => setUpdateServiceModal(false)} />
      </ModalBox>
      <ModalBox
        open={statusModal}
        onClose={() => setStatusModal(false)}
        header="Update Claim Status"
      >
        <ClaimsStatus closeModal={() => setStatusModal(false)} />
      </ModalBox>
      <ModalBox
        open={assignModal}
        onClose={() => setAssignModal(false)}
        header="Assign Claim to a User"
      >
        <AssignClaim closeModal={() => setAssignModal(false)} />
      </ModalBox>
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
        open={diagnosisModal}
        onClose={() => setDiagnosisModal(false)}
        header="Add Complaints to Claim"
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
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              Claim's Detail
            </Typography>
            <FormsHeaderText text={`- ${selectedClaim?.claimid}`} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          {user.currentEmployee.roles.includes("Managed Care Audit Claim") &&
            (edit ? (
              <>
                <GlobalCustomButton color="info" onClick={() => setEdit(false)}>
                  <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                  Cancel Edit
                </GlobalCustomButton>

                <GlobalCustomButton
                  color="info"
                  onClick={handleSubmit(handleUpdateClaim)}
                >
                  <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                  Update Claim
                </GlobalCustomButton>
              </>
            ) : (
              <GlobalCustomButton color="info" onClick={() => setEdit(true)}>
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Edit Claim
              </GlobalCustomButton>
            ))}

          <GlobalCustomButton color="info" onClick={() => setView("details")}>
            <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
            Details
          </GlobalCustomButton>

          {!client_id && (
            <GlobalCustomButton
              color="warning"
              onClick={() => setView("tasks")}
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Tasks
            </GlobalCustomButton>
          )}

          <GlobalCustomButton
            onClick={() => setChat(true)}
            sx={{
              backgroundColor: "#606c38",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#606c38",
              },
            }}
          >
            <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
            Chat
          </GlobalCustomButton>

          {!client_id && (
            <GlobalCustomButton
              color="success"
              onClick={() => setStatusModal(true)}
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Change Status
            </GlobalCustomButton>
          )}

          {(user?.currentEmployee?.roles?.includes("Admin") ||
            user?.currentEmployee?.roles?.includes(
              "Managed Care Assign Claim"
            )) &&
            !client_id && (
              <GlobalCustomButton
                color="info"
                onClick={() => setAssignModal(true)}
              >
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Assign Claim
              </GlobalCustomButton>
            )}
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
          {view === "tasks" && (
            <ClaimsTask
              taskServer={claimsServer}
              taskState={state.ClaimsModule.selectedClaim}
            />
          )}

          {view === "details" && (
            <>
              <Grid container spacing={2} mb={2}>
                <Grid item lg={6}>
                  <MuiCustomDatePicker
                    control={control}
                    name="date"
                    label="Submission Date"
                    disabled
                  />
                </Grid>

                <Grid item lg={6}>
                  <Input
                    label="Claim's Status"
                    register={register("status")}
                    disabled
                  />
                </Grid>

                <Grid item lg={6}>
                  <Input
                    label="Proivder's Name"
                    register={register("provider_name")}
                    disabled
                  />
                </Grid>

                <Grid item lg={6}>
                  <Input
                    label="Submitted By"
                    register={register("submitted_by")}
                    disabled
                  />
                </Grid>

                <Grid item lg={8} md={7}>
                  <ClientSearch
                    clear={clearClientSearch}
                    getSearchfacility={handleSelectClient}
                    id={selectedClaim.beneficiary._id}
                    disabled={true}
                  />
                </Grid>

                <Grid item lg={4} md={5}>
                  <CustomSelect
                    label="Patient Type"
                    required
                    control={control}
                    name="patientstate"
                    disabled={!edit}
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
                      disabled={!edit}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <MuiCustomDatePicker
                      control={control}
                      name="discharged_date"
                      label="Discharged Date"
                      disabled={!edit}
                    />
                  </Grid>
                </Grid>
              )}

              <Box>
                <FormsHeaderText text="Claim's Status History" />
                <Box mt={1} mb={1}>
                  <CustomTable
                    title={""}
                    columns={statushxColumns}
                    data={selectedClaim.statushx || []}
                    pointerOnHover
                    highlightOnHover
                    striped
                    //onRowClicked={handleRow}
                    CustomEmptyData="No Status History for this Claim yet..."
                    progressPending={false}
                    //conditionalRowStyles={conditionalRowStyles}
                  />
                </Box>
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
                  <FormsHeaderText text="Complaints Data" />

                  {edit && (
                    <GlobalCustomButton onClick={() => setComplaintModal(true)}>
                      <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                      New Complaint
                    </GlobalCustomButton>
                  )}
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
                <FormsHeaderText text="Clinical Findings" />

                <Box>
                  <Textarea
                    placeholder="Write here..."
                    register={register("clinical_findings")}
                    disabled={!edit}
                  />
                </Box>
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

                  {edit && (
                    <GlobalCustomButton onClick={() => setDiagnosisModal(true)}>
                      <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                      New Diagnosis
                    </GlobalCustomButton>
                  )}
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
                <FormsHeaderText text="Investigation" />

                <Box>
                  <Textarea
                    placeholder="Write here..."
                    register={register("investigation")}
                    disabled={!edit}
                  />
                </Box>
              </Box>

              <Box mb={2}>
                <FormsHeaderText text="Drugs" />

                <Box>
                  <Textarea
                    placeholder="Write here..."
                    register={register("drugs")}
                    disabled={!edit}
                  />
                </Box>
              </Box>

              <Box mb={2}>
                <FormsHeaderText text="Treatment" />

                <Box>
                  <Textarea
                    placeholder="Write here..."
                    register={register("treatment")}
                    disabled={!edit}
                  />
                </Box>
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
                      disabled={!edit}
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

                  {edit && (
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
                  )}
                </Box>

                <Box>
                  <CustomTable
                    title={""}
                    columns={servicesColumns}
                    data={services}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={onServiceRowClick}
                    conditionalRowStyles={servicesConditionalRowStyles}
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
                <FormsHeaderText text="Comments" />

                <Box>
                  <Textarea
                    placeholder="Write here..."
                    register={register("comments")}
                    disabled={!edit}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={chat}
        onClose={() => setChat(false)}
        onOpen={() => setChat(true)}
      >
        <Box
          sx={{
            width: "500px",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          {chat && <ClaimsChat closeChat={() => setChat(false)} />}
        </Box>
      </Drawer>
    </Box>
  );
};

export default ClaimDetailComponent;
