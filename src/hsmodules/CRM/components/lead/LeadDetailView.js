import {useState, useEffect} from "react";
import {Button, Grid, Box, Collapse, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment from "moment";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
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
import AdditionalInformationCard from "./AdditionalInfo";

import {contactsData, informationData, staffsData} from "./data";
import ScheduleAppointment from "./ScheduleAppointment";
import LeadUpload from "./LeadUpload";
import {toast} from "react-toastify";

const CustomerView = () => {
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
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
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

        <Grid container spacing={2}>
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
      </Grid>
    </Box>
  );
};

const LeadView = () => {
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

        <Grid item xs={3} mt={1.5}>
          <CustomSelect
            register={register("deal_status", {required: true})}
            label="Status"
            options={["Open", "Closed", "Pending"]}
            disabled={!editLead}
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

        <Grid item xs={4} mt={1.5}>
          <CustomSelect
            register={register("deal_next_action", {required: true})}
            label="Next Action"
            options={["First", "Second", "Third", "Fourth"]}
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>
      </Grid>
    </>
  );
};

const AdditionalInformationView = () => {};

const CustomerContactDetailsView = () => {
  const [contactModal, setContactModal] = useState(false);
  const [contacts, setContacts] = useState([...contactsData]); //contact list of lead from backend should be default(facility.contact_list)

  const handleAddContact = contact => {
    setContacts(prev => [contact, ...prev]);
  };

  const handleRemoveContact = contact => {
    setContacts(prev =>
      prev.filter(item => item.contact_email !== contact.contact_email)
    );
  };

  //first param is passed to the delete element on the table and the second param (false) decides whether or not the delete button is disabled
  const contactColumns = getContactColumns(handleRemoveContact, false);
  return (
    <Box mb={2}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Contact Details" />

        <Button
          sx={{textTransform: "capitalize"}}
          variant="contained"
          onClick={() => setContactModal(true)}
          size="small"
        >
          <AddCircleOutlineOutlinedIcon fontSize="small" /> Add Contact
        </Button>
      </Box>

      <Box mt={1} mb={1}>
        <CustomTable
          title={"Contact List"}
          columns={contactColumns}
          data={contacts}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          CustomEmptyData="You haven't added any contact yet, Click edit to add.."
          progressPending={false}
        />
      </Box>

      <ModalBox
        open={contactModal}
        onClose={() => setContactModal(false)}
        header="Add Contact"
      >
        <LeadAddContact
          closeModal={() => setContactModal(false)}
          addContact={handleAddContact}
        />
      </ModalBox>
    </Box>
  );
};

const StaffsListView = () => {
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
      >
        <FormsHeaderText text="Assigned Staffs" />

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize"}}
          onClick={handleAddStaff}
        >
          <AddCircleOutlineOutlinedIcon fontSize="small" /> Add Staff
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

const TasksDetailView = () => {
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
        header="Assign Staff"
      >
        <LeadAssignTask
          closeModal={() => setAssignModal(false)}
          addTask={handleAddTask}
        />
      </ModalBox>
    </Box>
  );
};

const UploadView = () => {
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
  const [appointments, setAppointments] = useState([]);
  const [scheduleAppointment, setScheduleAppointment] = useState(false);

  const appointmentColumns = [];
};

const LeadDetail = () => {
  const [currentView, setCurrentView] = useState("customer");
  const [scheduleAppointment, setScheduleAppointment] = useState(false);

  const handleSetCurrentView = view => {
    setCurrentView(view);
  };

  const RenderedComponent = () => {
    switch (currentView) {
      case "customer":
        return <CustomerView />;

      case "lead":
        return <LeadView />;

      case "information":
        return <AdditionalInformationView />;

      case "contacts":
        return <CustomerContactDetailsView />;

      case "staffs":
        return <StaffsListView />;

      case "tasks":
        return <TasksDetailView />;

      case "uploads":
        return <UploadView />;

      case "appointments":
        return <AppointmentsView />;

      default:
        break;
    }
  };

  return (
    <Box sx={{width: "750px", minHeight: "300px", maxHeight: "80vh"}}>
      <Box sx={{display: "flex", justifyContent: "flex-end"}} mb={2}>
        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          color="secondary"
          onClick={() => handleSetCurrentView("customer")}
        >
          Customer
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          color="secondary"
          onClick={() => handleSetCurrentView("lead")}
        >
          Lead
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
          onClick={() => setScheduleAppointment(true)}
        >
          Appointment
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{textTransform: "capitalize", marginRight: "10px"}}
          onClick={() => handleSetCurrentView("proprosal")}
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
