import {useState, useEffect} from "react";
import {Button, Grid, Box, Collapse, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import ModalBox from "../../../../components/modal";
import LeadAddContact from "./AddContact";
import CustomTable from "../../../../components/customtable";
import EmployeeSearch from "../../../helpers/EmployeeSearch";

import {
  getContactColumns,
  getStaffColumns,
  getTaskColumns,
  getUploadColumns,
} from "../colums/columns";
import LeadAssignTask from "./AssignTask";
import AdditionalInformationCard, {
  CreateAdditionalInfo,
} from "./AdditionalInfo";

import {contactsData, additionalInformationData, staffsData} from "./data";
import ScheduleAppointment from "./ScheduleAppointment";
import LeadUpload from "./LeadUpload";
import {toast} from "react-toastify";
import CrmAppointment from "../../Appointment";
/* import CrmProposals from "../../Proposals"; */
import Contact from "../../Contact";
import RadioButton from "../../../../components/inputs/basic/Radio";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CRMTasks from "../../Tasks";
import CustomerDetail from "../global/CustomerDetail";
import LeadDetailView from "../global/LeadDetail";
import DealDetailView from "../global/DealDetail";
import VideoConference from "../../../utils/VideoConference";

export const LeadView = () => {
  const {register, reset, control, handleSubmit} = useForm();
  const [editLead, setEditLead] = useState(false);

  const udpateLead = data => {
    toast.success("Lead Detail Updated");
    setEditLead(false);
  };

  const initFormState = {
    deal_probability: "90%",
    deal_size: "Extra Large",
    deal_status: "Closed",
    deal_next_action: "Unknown",
    weight_forcast: "Unknown",
    submission_date: moment().subtract(100, "days").calendar(),
    closing_date: moment().add(3, "years").calendar(),
  };

  useEffect(() => {
    reset(initFormState);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Lead Details" />

        {editLead ? (
          <Button
            variant="contained"
            size="small"
            sx={{textTransform: "capitalize"}}
            color="success"
            onClick={handleSubmit(udpateLead)}
          >
            <UpgradeOutlinedIcon fontSize="small" />
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{textTransform: "capitalize"}}
            onClick={() => setEditLead(true)}
          >
            <ModeEditOutlineOutlinedIcon fontSize="small" /> Edit
          </Button>
        )}
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Input
            register={register("deal_probability", {required: true})}
            label="Probability"
            disabled={!editLead}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register("deal_size", {required: true})}
            label="Size"
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={3}>
          <CustomSelect
            register={register("deal_status", {required: true})}
            label="Status"
            options={["Open", "Closed", "Pending"]}
            disabled={!editLead}
            defaultValue="Open"
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register("weight_forcast", {required: true})}
            label="Weight Forcast"
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={4}>
          <MuiCustomDatePicker
            label="Submission Date"
            name="submission_date"
            control={control}
            disabled={true}
          />
        </Grid>

        <Grid item xs={4}>
          <MuiCustomDatePicker
            label="Closing Date"
            name="closing_date"
            control={control}
            disabled={!editLead}
          />
        </Grid>

        <Grid item xs={4}>
          <CustomSelect
            register={register("deal_next_action", {required: true})}
            label="Next Action"
            options={["First", "Second", "Third", "Fourth"]}
            disabled={!editLead}
            defaultValue="Second"
            //placeholder="Enter customer number"
          />
        </Grid>
      </Grid>
    </>
  );
};

export const DetailView = () => {
  return (
    <>
      <Grid container spacing={2} pr={2} pl={2}>
        <Grid item lg={6} md={12} sm={12}>
          <Box mb={1}>
            <DealDetailView />
          </Box>

          <Box>
            <CustomerDetail />
          </Box>
        </Grid>

        <Grid item lg={6} md={12} sm={12}>
          <AdditionalInformationView />
        </Grid>
      </Grid>
    </>
  );
};

export const AdditionalInformationView = () => {
  const [createModal, setCreateModal] = useState(false);
  const [informations, setInformations] = useState([
    ...additionalInformationData,
  ]);

  const removeAdditionalInfo = info => {
    setInformations(prev => prev.filter(item => item._id !== info._id));
  };

  const addNewInfo = data => {
    setInformations(prev => [data, ...prev]);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <FormsHeaderText text="Additional Information" />

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize"}}
          onClick={() => setCreateModal(true)}
        >
          <AddCircleOutlineOutlinedIcon sx={{mr: "5px"}} fontSize="small" /> Add
          Information
        </Button>
      </Box>

      <Box>
        {informations.length > 0 ? (
          informations.map((info, index) => (
            <Box sx={{mb: 2}}>
              <AdditionalInformationCard
                data={info}
                action={() => removeAdditionalInfo(info)}
                key={index}
              />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
              You've not added any information
            </Typography>
          </Box>
        )}
      </Box>

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Add New Information"
      >
        <CreateAdditionalInfo
          closeModal={() => setCreateModal(false)}
          addInfo={addNewInfo}
        />
      </ModalBox>
    </Box>
  );
};

export const StaffsListView = () => {
  const [staffs, setStaffs] = useState([...staffsData]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleSelectedStaff = staff => {
    setSelectedStaff(staff);
  };

  const handleAddStaff = () => {
    setStaffs(prev => [selectedStaff, ...prev]);
    setSelectedStaff(null);
  };

  const handleRemoveStaff = staff => {
    setStaffs(prev => prev.filter(item => item._id !== staff._id));
  };

  const staffColumns = getStaffColumns(handleRemoveStaff, false);

  return (
    <Box container pl={2} pr={2}>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <FormsHeaderText text="Assigned Staffs" />

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize"}}
          onClick={handleAddStaff}
        >
          <AddCircleOutlineOutlinedIcon
            sx={{marginRight: "5px"}}
            fontSize="small"
          />
          Add Staff
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EmployeeSearch getSearchfacility={handleSelectedStaff} />
        </Grid>
      </Grid>

      <Box mt={1} mb={1}>
        <CustomTable
          title={"Contact List"}
          columns={staffColumns}
          data={staffs}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          CustomEmptyData="You haven't added any Staffs yet..."
          progressPending={false}
        />
      </Box>
    </Box>
  );
};

export const UploadView = () => {
  const [uploads, setUploads] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);

  const handleAddUpload = data => {
    setUploads(prev => [data, ...prev]);
  };

  const uploadColumns = getUploadColumns();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        pl={2}
        pr={2}
      >
        <FormsHeaderText text="Uploaded Docs" />

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize"}}
          onClick={() => setUploadModal(true)}
        >
          <AddCircleOutlineOutlinedIcon sx={{mr: "5px"}} fontSize="small" /> New
          Upload
        </Button>
      </Box>

      <Box mt={1} mb={1}>
        <CustomTable
          columns={uploadColumns}
          data={uploads}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          CustomEmptyData="You haven't Uploaded any file(s) yet..."
          progressPending={false}
        />
      </Box>

      <ModalBox
        open={uploadModal}
        onClose={() => setUploadModal(false)}
        header="Upload"
      >
        <LeadUpload
          closeModal={() => setUploadModal(false)}
          addUpload={handleAddUpload}
        />
      </ModalBox>
    </>
  );
};

const AppointmentsView = () => {
  return (
    <>
      <CrmAppointment standAlone={true} />
    </>
  );
};

const ProposalsView = () => {
  return (
    <>
     {/*  <CrmProposals standAlone={true} /> */}
    </>
  );
};

const OpenDealDetail = ({handleGoBack}) => {
  const [currentView, setCurrentView] = useState("detail");
  const [scheduleAppointment, setScheduleAppointment] = useState(false);
  const [activateCall, setActivateCall] = useState(false);
  const handleSetCurrentView = view => {
    setCurrentView(view);
  };

  const RenderedComponent = () => {
    switch (currentView) {
      case "detail":
        return <DetailView />;

      case "information":
        return <AdditionalInformationView />;

      case "contacts":
        return <Contact />;

      case "staffs":
        return <StaffsListView />;

      case "tasks":
        return <CRMTasks />;

      case "uploads":
        return <UploadView />;

      case "appointments":
        return <AppointmentsView />;

      case "proposal":
        return <ProposalsView />;

      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
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
            <ArrowBackIcon />
            Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Open Deal Details
          </Typography>
        </Box>

        <Box sx={{display: "flex", justifyContent: "flex-end"}} mb={2} gap={1}>
          <Box>
            <VideoConference
              activateCall={activateCall}
              setActivateCall={setActivateCall}
              label="Call"
            />
          </Box>

          {activateCall && (
            <GlobalCustomButton
              onClick={() => setActivateCall(false)}
              color="error"
            >
              End Call
            </GlobalCustomButton>
          )}

          <GlobalCustomButton
            color="secondary"
            onClick={() => handleSetCurrentView("detail")}
          >
            Detail
          </GlobalCustomButton>

          <GlobalCustomButton onClick={() => handleSetCurrentView("tasks")}>
            Tasks
          </GlobalCustomButton>

          <GlobalCustomButton
            color="success"
            onClick={() => handleSetCurrentView("uploads")}
          >
            Uploads
          </GlobalCustomButton>

          <GlobalCustomButton
            color="info"
            onClick={() => handleSetCurrentView("appointments")}
          >
            Appointments
          </GlobalCustomButton>

          <GlobalCustomButton onClick={() => handleSetCurrentView("proposal")}>
            Proposal
          </GlobalCustomButton>

          <GlobalCustomButton
            color="info"
            onClick={() => handleSetCurrentView("staffs")}
          >
            Staffs
          </GlobalCustomButton>

          <GlobalCustomButton
            color="info"
            onClick={() => handleSetCurrentView("contacts")}
          >
            contacts
          </GlobalCustomButton>
        </Box>
      </Box>

      <Box>
        <RenderedComponent />
      </Box>

      <ModalBox
        open={scheduleAppointment}
        onClose={() => setScheduleAppointment(false)}
        header="Schedule Appointment"
      >
        <ScheduleAppointment closeModal={() => setScheduleAppointment(false)} />
      </ModalBox>
    </Box>
  );
};

export default OpenDealDetail;
