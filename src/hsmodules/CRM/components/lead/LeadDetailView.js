import {useState, useEffect, useContext} from "react";
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
import CrmProposals from "../../Proposals";
import Contact from "../../Contact";
import RadioButton from "../../../../components/inputs/basic/Radio";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CRMTasks from "../../Tasks";
import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import LeadDetailView, {PageLeadDetailView} from "../global/LeadDetail";
import VideoConference from "../../../utils/VideoConference";
import {ObjectContext} from "../../../../context";
import client from "../../../../feathers";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import StaffDetail from "../assigned-staffs/StaffDetail";
import Invoice from "../../Invoice";

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
        <Grid item lg={12} md={12} sm={12}>
          <Box mb={1}>
            <PageCustomerDetail />
          </Box>
          <Box>
            <PageLeadDetailView />
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
  const {state} = useContext(ObjectContext);
  const [createModal, setCreateModal] = useState(false);
  const [informations, setInformations] = useState([
    ...state.DealModule.selectedDeal.additionalInfo,
  ]);
  //const [informations, setInformations] = useState([]);

  const removeAdditionalInfo = info => {
    setInformations(prev => prev.filter(item => item._id !== info._id));
  };

  // const addNewInfo = data => {
  //   setInformations(prev => [data, ...prev]);
  // };

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
          //addInfo={addNewInfo}
        />
      </ModalBox>
    </Box>
  );
};

export const StaffsListView = () => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);

  // const [staffs, setStaffs] = useState([
  //   // ...state.DealModule.selectedDeal.assignStaff,
  // ]);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [staffToDel, setStaffToDel] = useState({});
  const [success, setSuccess] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    setStaffs(state.DealModule.selectedDeal.assignStaff);
  }, [state.DealModule]);

  const handleSelectedStaff = staff => {
    setSelectedStaff(staff);
  };

  const handleAddStaff = async () => {
    if (selectedStaff === null)
      return toast.error("Please search for an Employee to add as staff");

    showActionLoader();
    //return console.log("hello world");
    const staffDetail = {
      name: `${selectedStaff.firstname} ${selectedStaff.lastname}`,
      position: selectedStaff.position,
      profession: selectedStaff.profession,
      phoneno: selectedStaff.phone,
      email: selectedStaff.email,
      active: selectedStaff.active || true,
      employeeId: selectedStaff._id,
    };
    //const prevStaffs = state.DealModule.selectedDeal.assignStaff;
    const newStaffs = [staffDetail, ...staffs];
    const documentId = state.DealModule.selectedDeal._id;
    await dealServer
      .patch(documentId, {assignStaff: newStaffs})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        setStaffs(newStaffs);
        toast.success(`You have successfully added a new Staff!`);
        setSuccess(true);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to add a new Staff!. ${err}`);
      });
  };

  const confirmRemoveStaff = staff => {
    //console.log(staff);
    setStaffToDel(staff);
    setConfirmDialog(true);
  };

  const handleRemoveStaff = async () => {
    showActionLoader();
    const newStaffs = staffs.filter(item => item._id !== staffToDel._id);
    const documentId = state.DealModule.selectedDeal._id;
    await dealServer
      .patch(documentId, {assignStaff: newStaffs})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setConfirmDialog(false);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        setStaffs(newStaffs);
        toast.success(`You have successfully Deleted Staff!`);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        setConfirmDialog(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to Delete Staff!. ${err}`);
      });
  };

  const staffColumns = getStaffColumns(confirmRemoveStaff, false);

  const handleRow = row => {
    setState(prev => ({
      ...prev,
      StaffModule: {...prev.StaffModule, selectedStaff: row},
    }));

    setDetailModal(true);
  };

  const conditionalRowStyles = [
    {
      when: row => row.active === false,
      style: {
        backgroundColor: "pink",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  return (
    <Box container pl={2} pr={2}>
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => {
          setConfirmDialog(false);
          setStaffToDel({});
        }}
        confirmationAction={() => handleRemoveStaff(staffToDel)}
        type="danger"
        message={`You're about to remove Staff ${staffToDel?.name}`}
      />
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
          <EmployeeSearch
            getSearchfacility={handleSelectedStaff}
            clear={success}
          />
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
          onRowClicked={handleRow}
          CustomEmptyData="You haven't added any Staffs yet..."
          progressPending={false}
          conditionalRowStyles={conditionalRowStyles}
        />
      </Box>

      <ModalBox open={detailModal} onClose={() => setDetailModal(false)}>
        <StaffDetail closeModal={() => setDetailModal(false)} />
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
      <CrmProposals standAlone={true} />
    </>
  );
};

const LeadDetail = ({handleGoBack}) => {
  const [currentView, setCurrentView] = useState("detail");
  const [scheduleAppointment, setScheduleAppointment] = useState(false);
  const [activateCall, setActivateCall] = useState(false);

  const handleSetCurrentView = view => {
    setCurrentView(view);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
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
            Lead Details
          </Typography>
        </Box>

        <Box sx={{display: "flex", justifyContent: "flex-end"}} mb={2} gap={1}>
          <Box>
            <VideoConference
              activateCall={activateCall}
              setActivateCall={setActivateCall}
              label="Video conference"
            />
          </Box>

          {activateCall && (
            <GlobalCustomButton
              onClick={() => setActivateCall(false)}
              color="error"
            >
              End conference
            </GlobalCustomButton>
          )}

          <GlobalCustomButton
            color="secondary"
            onClick={() => handleSetCurrentView("detail")}
            sx={
              currentView === "detail"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Detail
          </GlobalCustomButton>

          <GlobalCustomButton
            onClick={() => handleSetCurrentView("tasks")}
            sx={
              currentView === "tasks"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Tasks
          </GlobalCustomButton>

          <GlobalCustomButton
            color="success"
            onClick={() => handleSetCurrentView("uploads")}
            sx={
              currentView === "uploads"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Uploads
          </GlobalCustomButton>

          <GlobalCustomButton
            color="info"
            onClick={() => handleSetCurrentView("appointments")}
            sx={
              currentView === "appointments"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Appointments
          </GlobalCustomButton>

          <GlobalCustomButton
            onClick={() => handleSetCurrentView("proposal")}
            sx={
              currentView === "proposal"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Proposal
          </GlobalCustomButton>

          <GlobalCustomButton
            onClick={() => handleSetCurrentView("invoice")}
            color="warning"
            sx={
              currentView === "invoice"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Invoice
          </GlobalCustomButton>

          <GlobalCustomButton
            color="info"
            onClick={() => handleSetCurrentView("staffs")}
            sx={
              currentView === "staffs"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Staffs
          </GlobalCustomButton>

          <GlobalCustomButton
            color="info"
            onClick={() => handleSetCurrentView("contacts")}
            sx={
              currentView === "contacts"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            contacts
          </GlobalCustomButton>
        </Box>
      </Box>

      {/* <Box pl={2}>
        <FormsHeaderText text={currentView} />
      </Box> */}

      <Box>
        {currentView === "detail" && <DetailView />}
        {currentView === "contacts" && <Contact />}
        {currentView === "staffs" && <StaffsListView />}
        {currentView === "tasks" && <CRMTasks />}
        {currentView === "uploads" && <UploadView />}
        {currentView === "proposal" && <ProposalsView />}
        {currentView === "appointments" && <AppointmentsView />}
        {currentView === "invoice" && <Invoice />}
      </Box>

      {/* <ModalBox
        open={scheduleAppointment}
        onClose={() => setScheduleAppointment(false)}
        header="Schedule Appointment"
      >
        <ScheduleAppointment closeModal={() => setScheduleAppointment(false)} />
      </ModalBox> */}
    </Box>
  );
};

export default LeadDetail;
