import {forwardRef, useState, useEffect} from "react";
import {Button, Grid, Box, Collapse, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import DeleteIcon from "@mui/icons-material/Delete";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ModalBox from "../../../../components/modal";
import LeadAddContact from "./AddContact";
import CustomTable from "../../../../components/customtable";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import moment from "moment";

import {
  getContactColumns,
  getStaffColumns,
  getTaskColumns,
} from "../colums/columns";
import LeadAssignTask from "./AssignTask";
import AdditionalInformationCard from "./AdditionalInfo";

import {contactsData, informationData, staffsData} from "./data";
import ScheduleAppointment from "./ScheduleAppointment";
import LeadUpload from "./LeadUpload";

const LeadDetail = () => {
  const [editing, setEditing] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [contacts, setContacts] = useState([...contactsData]); //contact list of lead from backend should be default(facility.contact_list)
  const [staffs, setStaffs] = useState([...staffsData]);
  const [informations, setInformations] = useState([...informationData]);
  const [info, setInfo] = useState("");
  const [scheduleAppointment, setScheduleAppointment] = useState(false);
  const [tasks, setTasks] = useState([]);

  const {register, reset, control} = useForm();

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

  useEffect(() => {
    reset(initFormState);
  }, []);

  const handleAddContact = contact => {
    setContacts(prev => [contact, ...prev]);
  };

  const handleRemoveContact = contact => {
    setContacts(prev =>
      prev.filter(item => item.contact_email !== contact.contact_email)
    );
  };

  const handleAddStaff = staff => {
    setStaffs(prev => [staff, ...prev]);
    console.log(staff);
  };

  const handleRemoveStaff = staff => {
    setStaffs(prev => prev.filter(item => item.email !== staff.email));
  };

  const removeAdditionalInfo = info => {
    console.log(info);
    setInformations(prev => prev.filter(item => item !== info));
  };

  const addAdditionalInfo = () => {
    if (info === "") return;
    setInformations(prev => [info, ...prev]);

    setInfo("");
  };

  const handleAddTask = task => {
    setTasks(prev => [task, ...prev]);
  };

  const handleRemoveTask = task => {
    setTasks(prev => prev.filter(item => item.title !== task.title));
  };

  const staffColumns = getStaffColumns(handleRemoveStaff, !editing);

  const contactColumns = getContactColumns(handleRemoveContact, !editing);

  const tasksColumns = getTaskColumns(handleRemoveTask, !editing);

  return (
    <Box
      container
      sx={{
        width: "calc(100vw - 200px)",
        maxHeight: "calc(100vh - 180px)",
        // overflowY: "auto",
      }}
    >
      <Box sx={{display: "flex", justifyContent: "flex-end"}} mb={2}>
        {editing ? (
          <>
            <Button
              variant="contained"
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              color="success"
              onClick={() => setEditing(false)}
            >
              Update Lead
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              color="warning"
              onClick={() => setEditing(false)}
            >
              Cancel Edit
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              color="secondary"
              onClick={() => setEditing(true)}
            >
              Edit Lead
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              onClick={() => setAssignModal(true)}
            >
              Assign Task
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              onClick={() => setUploadModal(true)}
            >
              Upload
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              color="info"
              onClick={() => setScheduleAppointment(true)}
            >
              Schedule Appointment
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{textTransform: "capitalize"}}
            >
              Generate Proposal
            </Button>
          </>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item lg={6} md={12} sm={12}>
          <Box item>
            <FormsHeaderText text="Customer Details" />
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6}>
                <Input
                  register={register("customer_name", {required: true})}
                  label="Customer Name"
                  disabled={!editing}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6}>
                <Input
                  register={register("customer_number", {required: true})}
                  label="Customer Number"
                  disabled={!editing}
                  //placeholder="Enter customer number"
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <FormsHeaderText text="Address" />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  register={register("address", {required: true})}
                  label="Residential Address"
                  disabled={!editing}
                  //placeholder="Enter customer name"
                />
              </Grid>

              <Grid item lg={4} md={4} sm={6}>
                <Input
                  register={register("local_govt", {required: true})}
                  label="LGA"
                  disabled={!editing}
                  //placeholder="Enter customer number"
                />
              </Grid>

              <Grid item lg={4} md={4} sm={6}>
                <Input
                  register={register("city", {required: true})}
                  label="City"
                  disabled={!editing}
                  // placeholder="Enter customer name"
                />
              </Grid>

              <Grid item lg={4} md={4} sm={6}>
                <Input
                  register={register("state", {required: true})}
                  label="State"
                  disabled={!editing}
                  //placeholder="Enter customer number"
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <FormsHeaderText text="Lead Details" />
            <Grid container spacing={2}>
              <Grid item lg={3} md={6} sm={6}>
                <Input
                  register={register("deal_probability", {required: true})}
                  label="Probability of deal"
                  disabled={!editing}
                  //placeholder="Enter customer name"
                />
              </Grid>
              <Grid item lg={3} md={6} sm={6}>
                <Input
                  register={register("deal_size", {required: true})}
                  label="Size of deal"
                  disabled={!editing}
                  //placeholder="Enter customer number"
                />
              </Grid>

              {/* ***************************************************************************************** */}

              <Grid item lg={3} md={6} sm={6} mt={1.5}>
                <CustomSelect
                  register={register("deal_status", {required: true})}
                  label="Deal Status"
                  options={["Open", "Closed", "Pending"]}
                  defaultValue="Open"
                  disabled={!editing}
                  // placeholder="Enter customer name"
                />
              </Grid>

              <Grid item lg={3} md={6} sm={6} mt={1.5}>
                <CustomSelect
                  register={register("deal_next_action", {required: true})}
                  label="Next Action"
                  options={["First", "Second", "Third", "Fourth"]}
                  defaultValue="First"
                  disabled={!editing}
                  //placeholder="Enter customer number"
                />
              </Grid>

              <Grid item lg={3} md={6} sm={6}>
                <Input
                  register={register("weight_forcast", {required: true})}
                  label="Weight Forcast"
                  disabled={!editing}
                  //placeholder="Enter customer number"
                />
              </Grid>

              <Grid item lg={4} md={6} sm={6}>
                <MuiCustomDatePicker
                  label="Submission Date"
                  name="submission_date"
                  control={control}
                  disabled={true}
                />
              </Grid>

              <Grid item lg={4} md={6} sm={6}>
                <MuiCustomDatePicker
                  label="Closing Date"
                  name="closing_date"
                  control={control}
                  disabled={!editing}
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              mb={1}
            >
              <FormsHeaderText text="Additional Information" />

              {editing && (
                <Button
                  sx={{textTransform: "capitalize"}}
                  variant="contained"
                  onClick={addAdditionalInfo}
                  size="small"
                >
                  <AddCircleOutlineOutlinedIcon fontSize="small" /> Add
                  Information
                </Button>
              )}
            </Box>

            <Collapse in={editing}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Textarea
                    label="Additional Information"
                    placeholder="Write here..."
                    //register={register("additional_info")}
                    onChange={e => setInfo(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Collapse>

            <Box>
              {informations.length > 0 ? (
                informations.map((info, index) => (
                  <Box sx={{mb: 2}}>
                    <AdditionalInformationCard
                      text={info}
                      action={() => removeAdditionalInfo(info)}
                      key={index}
                      editing={editing}
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
          </Box>
        </Grid>

        {/* ********************** RIGHT SIDED CONTENTS ********************** */}
        <Grid item lg={6} md={12} sm={12}>
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

              {editing && (
                <Button
                  sx={{textTransform: "capitalize"}}
                  variant="contained"
                  onClick={() => setContactModal(true)}
                  size="small"
                >
                  <AddCircleOutlineOutlinedIcon fontSize="small" /> Add Contact
                </Button>
              )}
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

          <Box container>
            <FormsHeaderText text="Staff Details" />

            <Collapse in={editing}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <EmployeeSearch getSearchfacility={handleAddStaff} />
                </Grid>
              </Grid>
            </Collapse>

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

          <Box container>
            <FormsHeaderText text="Tasks" />

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
          </Box>
        </Grid>
      </Grid>

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

      <ModalBox
        open={scheduleAppointment}
        onClose={() => setScheduleAppointment(false)}
        header="Schedule Appointment"
      >
        <ScheduleAppointment closeModal={() => setScheduleAppointment(false)} />
      </ModalBox>

      <ModalBox
        open={uploadModal}
        onClose={() => setUploadModal(false)}
        header="Upload"
      >
        <LeadUpload closeModal={() => setUploadModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default LeadDetail;
