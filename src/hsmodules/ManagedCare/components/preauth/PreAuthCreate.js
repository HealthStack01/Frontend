import {useState, useEffect, useCallback, useContext} from "react";
import {Box, Grid, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import PatientProfile from "../../../Client/PatientProfile";
import {ClientSearch} from "../../../helpers/ClientSearch";
import { BeneficiarySearch } from "../../../helpers/BenSearch";
import {FacilitySearch} from "../../../helpers/hospitalSearch";
import CustomSelect from "../../../../components/inputs/basic/Select";
import {useForm} from "react-hook-form";
import {FormsHeaderText} from "../../../../components/texts";
import ModalBox from "../../../../components/modal";
import PreauthorizationCreateComplaint from "./Complaints";
import PreauthorizationCreateDiagnosis from "./Diagnosis";
import PreauthorizationCreateService from "./Services";
import {generateRandomString} from "../../../helpers/generateString";
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
import TextAreaVoiceAndText from "../../../../components/inputs/basic/Textarea/VoiceAndText";
import ReactCustomSearchSelectComponent from "../../../../components/react-custom-select/ReactSearchSelect";

const PreAuthCreateComponent = ({handleGoBack, client_id}) => {
  const preAuthServer = client.service("preauth");
  const clientServer = client.service("client");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [clearClientSearch, setClearClientSearch] = useState(false);
  const [clearClientSearch2, setClearClientSearch2] = useState(false);
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
  const [clinicFindInputType, setClinicFindInputType] = useState("type");
  const [investigationInputType, setInvestigationInputType] = useState("type");
  const [drugsInputType, setDrugsInputType] = useState("type");
  const [treatmentInputType, setTreatmentInputType] = useState("type");
  const [commentsInputType, setCommentsInputType] = useState("type");
  const [fetchingClients, setFetchingClients] = useState(false);
  const [clients, setClients] = useState([]);

  const {control, handleSubmit, register, reset, watch, setValue} = useForm({
    defaultValues: {
      preauthtype: "Fee for Service",
    },
  });
  const isHMO = user.currentEmployee.facilityDetail.facilityType === "HMO";  
  const facility = user.currentEmployee.facilityDetail;


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

  const deepCopy =(obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(deepCopy);
    }
    const copy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}

const checkpolicy=async ()=>{
  console.log("checking policy")
  let patient=state.ClientModule.selectedClient
  let result=patient.policy
  if(!!result){
    //check if hmo is in payment info
      //check if hmo.paymentinfo  has the policy
          //update
      if (patient.paymentinfo.length===1){
        const newI= deepCopy(patient)
        let result=newI.policy
        delete newI.policy
        let clientpolicy= {
          paymentmode:"HMO",
          organizationId:result.organizationId,
          organizationName:result.organizationName,
          principalId:result.policyNo,
          clientId:result.policyNo,
          principalName:`${result.principal.firstname} ${result.principal.lastname}`, //confirm
          plan:result.plan.planName, //confirm
          active:true,
          principal:result.principal._id,
          organizationType: result.organizationType,
          agent:result.agent,
          agentName:result.agentName,
          policy:result
        }

        newI.paymentinfo.push(clientpolicy)
      console.log("updated item", newI)
    /*   await ClientServ.patch(patient._id, {paymentinfo:newI.paymentinfo})
      .then((resp)=>{
        console.log("update successful "+ resp)
      })
      .catch((err)=>{
        toast.error("Update not successful "+ err)
      }) */

      setState(prev => ({
        ...prev,
      
          ClientModule:{
            selectedClient:newI
        },
       
      }));

      }else{
        if (patient.paymentinfo.length===2){
          let hmoinfo = patient.paymentinfo.filter(el => el.paymentmode === "HMO");
          if (hmoinfo[0].organizationId!==result.organizationId){
            const newI= deepCopy(patient)
        let result=newI.policy
        delete newI.policy
        let clientpolicy= {
          paymentmode:"HMO",
          organizationId:result.organizationId,
          organizationName:result.organizationName,
          principalId:result.policyNo,
          clientId:result.policyNo,
          principalName:`${result.principal.firstname} ${result.principal.lastname}`, //confirm
          plan:result.plan.planName, //confirm
          active:true,
          principal:result.principal._id,
          organizationType: result.organizationType,
          agent:result.agent,
          agentName:result.agentName,
          policy:result
        }

        newI.paymentinfo=[clientpolicy, ...newI.paymentinfo]
        setState(prev => ({
          ...prev,
        
            ClientModule:{
              selectedClient:newI
          },
         
        }));

          }

        }

      }

  }

}

  const handleSelectClient = client => {
    console.log("client here ", client)
    
    if (client === undefined || client === null){

   
    console.log("no client")
      return setState(prev => ({
        ...prev,
        ClientModule: {
          ...prev.ClientModule,
          selectedClient: {},
        },
      }));
    }else {
      
      console.log("setting state")
      setState(prev => ({
        ...prev,
        ClientModule: {
          ...prev.ClientModule,
          selectedClient: client,
        },
      }));
    }
    checkpolicy()
    const hmos = client.paymentinfo.filter(
      item => item.paymentmode.toLowerCase() === "hmo"
    );

    const firstHMO = hmos[0];

   // setPolicy(firstHMO.policy);
   setPolicy(client.policy)

   


    //
  };

  const complaintColumns = getComplaintColumns();
  const diagnosisColumns = getDiagnosisColumns();
  const servicesColumns = getServicesColumns();

  // useEffect(() => {
  //   hideActionLoader();
  // }, []);

  const handleCreatePreAuthorization = async data => {
    if (!state.ClientModule.selectedClient._id)
      return toast.warning("Please add Client..");

    showActionLoader();

    const employee = user.currentEmployee;
    const facility = employee.facilityDetail;

    const clinical_data = data;

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
      totalamount: data.totalamount,
      comments: data.comments,
      patientstate: data.patientstate,
      provider: facility,
      services: services,
      priority: data.priority,
      beneficiary: state.ClientModule.selectedClient,
      submissiondate: dayjs(),
      submissionby: employee,
      status: "Submitted",
      preauthid: generateRandomString(12),
      appointment: selectedAppointment,
      admission: selectedAdmission,
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

    //console.log(document);

    return preAuthServer
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
  const handleSelectOrg = organ => {
    console.log("organization chosen", organ);
    setState(prev => ({
      ...prev,
      OrganizationModule: {
        selectedOrganization: organ,
      },
    }));
  };

  const handleClientSearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingClients(true);

    clientServer
      .find({
        query: {
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
              clientTags: {
                $regex: val,
                $options: "i",
              },
            },
            {
              mrn: {
                $regex: val,
                $options: "i",
              },
            },
            {
              email: {
                $regex: val,
                $options: "i",
              },
            },
            {
              specificDetails: {
                $regex: val,
                $options: "i",
              },
            },
            {gender: val},
          ],

          "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setFetchingClients(false);
        setClients(res.data);
      })
      .catch(err => {
        setFetchingClients(false);
        toast.error("An error occured, check your network");
      });
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
        header="Add Complaints to Preauthorization"
      >
        <PreauthorizationCreateComplaint
          closeModal={() => setComplaintModal(false)}
          setComplaints={setComplaints}
        />
      </ModalBox>

      <ModalBox
        open={diagnosisModal}
        onClose={() => setDiagnosisModal(false)}
        header="Add Diagnosis to Preauthorization"
      >
        <PreauthorizationCreateDiagnosis
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
        header="Add Services to Preauthorization"
      >
        <PreauthorizationCreateService
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
            width: "16rem",
          }}
        >
          <PatientProfile />
        </Box>

        <Box
          sx={{
            width: "calc(100% - 17rem)",
          }}
        >
          <Grid container spacing={2} mb={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}> 
            {user.currentEmployee.facilityDetail.facilityType === "HMO"?   
              <BeneficiarySearch
                clear={clearClientSearch}
                getSearchfacility={handleSelectClient}
                id={client_id}
              /> : ///why do client search for preauth??
              <ClientSearch  
              clear={clearClientSearch}
              getSearchfacility={handleSelectClient}
              id={client_id}
            /> }

            {/*   <ReactCustomSearchSelectComponent
                control={control}
                onInputChange={handleClientSearch}
                isLoading={fetchingClients}
                name="selected_client"
                placeholder="Select Client"
                options={clients.map(item => {
                  return {
                    label: `${item.firstname} ${item.lastname}`,
                    value: item._id,
                    ...item,
                  };
                })}
              /> */}
            </Grid>
            {user.currentEmployee.facilityDetail.facilityType === "HMO" && (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FacilitySearch
                  clear={clearClientSearch2}
                  getSearchfacility={handleSelectOrg}
                  /* id={client_id}
                patient={beneficiary} */
                />
              </Grid>
            )}

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
            <TextAreaVoiceAndText
              label="Clinical Findings"
              type={clinicFindInputType}
              changeType={setClinicFindInputType}
              register={register("clinical_findings")}
              voiceOnChange={value => setValue("clinical_findings", value)}
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
            {/* <TextAreaVoiceAndText
              label="Investigation"
              type={investigationInputType}
              changeType={setInvestigationInputType}
              register={register("investigation")}
              voiceOnChange={value => setValue("investigation", value)}
            /> */}

            {/* <FormsHeaderText text="Investigation" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("investigation")}
              />
            </Box> */}
          </Box>

          <Box mb={2}>
           {/*  <TextAreaVoiceAndText
              label="Drugs"
              type={drugsInputType}
              changeType={setDrugsInputType}
              register={register("drugs")}
              voiceOnChange={value => setValue("drugs", value)}
            /> */}

            {/* <FormsHeaderText text="Drugs" />

            <Box>
              <Textarea
                placeholder="Write here..."
                register={register("drugs")}
              />
            </Box> */}
          </Box>

          <Box mb={2}>
           {/*  <TextAreaVoiceAndText
              label="Treatments"
              type={treatmentInputType}
              changeType={setTreatmentInputType}
              register={register("treatment")}
              voiceOnChange={value => setValue("treatment", value)}
            /> */}

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
            <FormsHeaderText text="Preauthorization's Info" />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomSelect
                  label="Preauthorization Type"
                  control={control}
                  name="preauthtype"
                  options={["Capitation", "Fee for Service"]}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  label="Total Preauthorization's Amount"
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
            <TextAreaVoiceAndText
              label="Comments"
              type={commentsInputType}
              changeType={setCommentsInputType}
              register={register("comments")}
              voiceOnChange={value => setValue("comments", value)}
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

export default PreAuthCreateComponent;
