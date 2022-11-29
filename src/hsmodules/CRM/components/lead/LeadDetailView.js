import {useState, useEffect} from "react";
import {Button, Grid, Box, Collapse, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment from "moment";

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
import CrmProposals from "../../Proposals";
import Contact from "../../Contact";

export const CustomerView = () => {
  const {register, reset, control, handleSubmit} = useForm();
  const [editCustomer, setEditCustomer] = useState(false);

  const initFormState = {
    customer_name: "Dr. Simpa Dania",
    customer_number: "08074567832",
    address: "No 15, gateway road, off Awo complex",
    local_govt: "Bamidele",
    city: "Ikeja",
    state: "Ogun",
    deal_probability: "90%",
    deal_size: "Extra Large",
    deal_status: "Closed",
    deal_next_action: "Unknown",
    weight_forcast: "Unknown",
    submission_date: moment().subtract(100, "days").calendar(),
    closing_date: moment().add(3, "years").calendar(),
  };

  const updateDetail = data => {
    toast.success("Customer Detail Updated");
    setEditCustomer(false);
  };

  useEffect(() => {
    reset(initFormState);
  }, []);

  return (
    <Box mb={2}>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Customer Details" />

        {editCustomer ? (
          <Button
            variant="contained"
            size="small"
            sx={{textTransform: "capitalize"}}
            color="success"
            onClick={handleSubmit(updateDetail)}
          >
            <UpgradeOutlinedIcon fontSize="small" />
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{textTransform: "capitalize"}}
            onClick={() => setEditCustomer(true)}
          >
            <ModeEditOutlineOutlinedIcon fontSize="small" /> Edit
          </Button>
        )}
      </Box>

      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={6}>
          <Input
            register={register("customer_name", {required: true})}
            label="Customer Name"
            disabled={!editCustomer}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            register={register("customer_number", {required: true})}
            label="Customer Number"
            disabled={!editCustomer}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("address", {required: true})}
            label="Residential Address"
            disabled={!editCustomer}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6}>
          <Input
            register={register("local_govt", {required: true})}
            label="LGA"
            disabled={!editCustomer}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6}>
          <Input
            register={register("city", {required: true})}
            label="City"
            disabled={!editCustomer}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6}>
          <Input
            register={register("state", {required: true})}
            label="State"
            disabled={!editCustomer}
            //placeholder="Enter customer number"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

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
      <CustomerView />
      <LeadView />
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
    <Box container>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        mb={1}
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

export const TasksDetailView = () => {
  const [assignModal, setAssignModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = task => {
    if (!task.title) return;
    setTasks(prev => [task, ...prev]);
  };

  const handleRemoveTask = task => {
    setTasks(prev => prev.filter(item => item.title !== task.title));
  };

  const tasksColumns = getTaskColumns(handleRemoveTask, false);

  return (
    <Box container>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
      >
        <FormsHeaderText text="Assigned Tasks" />

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize"}}
          onClick={() => setAssignModal(true)}
        >
          <AddCircleOutlineOutlinedIcon sx={{mr: "5px"}} fontSize="small" /> New
          Task
        </Button>
      </Box>

      <Box mt={1} mb={1}>
        <CustomTable
          title={"Contact List"}
          columns={tasksColumns}
          data={tasks}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          CustomEmptyData="You haven't Assigned any Tasks yet..."
          progressPending={false}
        />
      </Box>

      <ModalBox
        open={assignModal}
        onClose={() => setAssignModal(false)}
        header="Assign Tasks"
      >
        <LeadAssignTask
          closeModal={() => setAssignModal(false)}
          addTask={handleAddTask}
        />
      </ModalBox>
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
      <CrmProposals standAlone={true} />
    </>
  );
};

const LeadDetail = () => {
  const [currentView, setCurrentView] = useState("detail");
  const [scheduleAppointment, setScheduleAppointment] = useState(false);

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
        return <TasksDetailView />;

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
        width: "800px",
        minHeight: "300px",
        maxHeight: "80vh",
      }}
    >
      <Box sx={{display: "flex", justifyContent: "flex-end"}} mb={2}>
        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          color="secondary"
          onClick={() => handleSetCurrentView("detail")}
        >
          Detail
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          color="warning"
          onClick={() => handleSetCurrentView("information")}
        >
          Added Info
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          onClick={() => handleSetCurrentView("tasks")}
        >
          Tasks
        </Button>

        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          onClick={() => handleSetCurrentView("uploads")}
        >
          Uploads
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          color="info"
          //onClick={() => handleSetCurrentView("appointments")}
          onClick={() => handleSetCurrentView("appointments")}
        >
          Appointments
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          onClick={() => handleSetCurrentView("proposal")}
        >
          Proposal
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          color="info"
          onClick={() => handleSetCurrentView("staffs")}
        >
          Staffs
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize"}}
          color="info"
          onClick={() => handleSetCurrentView("contacts")}
        >
          contacts
        </Button>
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

export default LeadDetail;
