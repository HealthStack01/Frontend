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
import {toast} from "react-toastify";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";

const ClaimCreateComponent = ({handleGoBack}) => {
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

  const {control, handleSubmit, register, reset, watch, setValue} = useForm({
    defaultValues: {
      claimtype: "Fee for Service",
    },
  });

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

  const complaintColumns = getComplaintColumns();
  const diagnosisColumns = getDiagnosisColumns();
  const servicesColumns = getServicesColumns();

  const handleCreateClaim = async data => {
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
        toast.error(`Failed to create Claim ${error}`);
      });
  };

  const patientState = watch("patientstate");

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
            <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
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
            <FormsHeaderText text="Clinical Findings" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("clinical_findings")}
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
            <FormsHeaderText text="Investigation" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("investigation")}
              />
            </Box>
          </Box>

          <Box mb={2}>
            <FormsHeaderText text="Drugs" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("drugs")}
              />
            </Box>
          </Box>

          <Box mb={2}>
            <FormsHeaderText text="Treatment" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("treatment")}
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
            <FormsHeaderText text="Comments" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("comments")}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimCreateComponent;
