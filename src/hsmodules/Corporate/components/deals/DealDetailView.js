import {useState, useEffect, useContext, useCallback} from "react";
import {Button, Grid, Box, Collapse, Typography} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import DocViewer, {DocViewerRenderers} from "@cyntler/react-doc-viewer";

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
import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import LeadDetailView, {PageLeadDetailView} from "../global/LeadDetail";
import VideoConference from "../../../utils/VideoConference";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import StaffDetail from "../assigned-staffs/StaffDetail";
import Invoice from "../../Invoice";
/* import SLA from "../../SLA"; */
import ChatInterface from "../../../../components/chat/ChatInterface";
import GlobalDealChat from "../global/DealChat";
import dayjs from "dayjs";

export const DealDetailView = () => {
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

        <Grid item lg={6} md={12} sm={12}>
          <StatusHistoryView />
        </Grid>
      </Grid>
    </>
  );
};

export const AdditionalInformationView = () => {
  const dealServer = client.service("deal");
  const {state, setState, hideActionLoader, showActionLoader} =
    useContext(ObjectContext);
  const [createModal, setCreateModal] = useState(false);
  const [informations, setInformations] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    message: "",
    type: "",
  });
  //const [informations, setInformations] = useState([]);

  const removeAdditionalInfo = info => {
    setInformations(prev => prev.filter(item => item._id !== info._id));
  };

  const deleteAdditionalInfo = async info => {
    showActionLoader();

    const oldDealInfo = state.DealModule.selectedDeal.additionalInfo || [];

    const updatedDealInfo = oldDealInfo.filter(item => item._id !== info._id);

    const documentId = state.DealModule.selectedDeal._id;

    await dealServer
      .patch(documentId, {additionalInfo: updatedDealInfo})
      .then(res => {
        hideActionLoader();
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        cancelConfirm();
        toast.success(`You have successfully Deleted Addtional Information!`);
      })
      .catch(err => {
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to Delete the Addtional Information!. ${err}`
        );
      });
  };

  const confirmDelete = info => {
    setConfirmDialog({
      open: true,
      message:
        "You're about to delete an additional information for this deal?",
      type: "danger",
      action: () => deleteAdditionalInfo(info),
    });
  };

  const cancelConfirm = () => {
    setConfirmDialog({
      open: false,
      action: null,
      type: "",
      message: "",
    });
  };

  useEffect(() => {
    const infos = state.DealModule.selectedDeal.additionalInfo;

    setInformations(infos);
  }, [state.DealModule.selectedDeal]);

  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        type={confirmDialog.type}
        message={confirmDialog.message}
        cancelAction={cancelConfirm}
        confirmationAction={confirmDialog.action}
      />
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
                action={() => confirmDelete(info)}
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

export const StatusHistoryView = () => {
  const dealServer = client.service("deal");
  const {state, setState, hideActionLoader, showActionLoader} =
    useContext(ObjectContext);
  const [histories, setHistories] = useState([]);

  const historyColumns = [
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
  ];

  const handleRow = () => {};

  useEffect(() => {
    const history = state.DealModule.selectedDeal.statushx;
    setHistories(history);
  }, [state.DealModule]);

  return (
    <Box>
      <FormsHeaderText text="Deal's Status History" />
      <Box mt={1} mb={1}>
        <CustomTable
          title={"Contact List"}
          columns={historyColumns}
          data={histories}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          CustomEmptyData="No Status History for this Deal yet..."
          progressPending={false}
          //conditionalRowStyles={conditionalRowStyles}
        />
      </Box>
    </Box>
  );
};

export const UploadView = () => {
  const [uploads, setUploads] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const {state} = useContext(ObjectContext);
  const [viewModal, setViewModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const currentDeal = state.DealModule.selectedDeal;
    setUploads(currentDeal.uploads || []);
  }, [state.DealModule]);

  const uploadColumns = getUploadColumns();

  const handleRow = doc => {
    console.log(doc);
    setSelectedDoc(doc);
    setViewModal(true);
    //setDocs([data.uploadUrl]);
  };
  return (
    <Box pl={2} pr={2}>
      <ModalBox
        open={viewModal}
        onClose={() => setViewModal(false)}
        header={`View Document ${selectedDoc?.name}`}
      >
        <Box sx={{width: "85vw", height: "85vh"}}>
          {selectedDoc?.type === "image" ? (
            <iframe
              style={{width: "100%", height: "100%"}}
              src={selectedDoc?.uploadUrl}
            />
          ) : (
            <>
              {selectedDoc?.fileType === "pdf" ? (
                <iframe
                  style={{width: "100%", height: "100%"}}
                  src={selectedDoc?.uploadUrl}
                />
              ) : (
                <iframe
                  style={{width: "100%", height: "100%"}}
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedDoc?.uploadUrl}`}
                />
              )}
            </>
          )}
        </Box>
      </ModalBox>
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
          onRowClicked={handleRow}
          CustomEmptyData="You haven't Uploaded any file(s) yet..."
          progressPending={false}
        />
      </Box>

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

const LeadDetail = ({handleGoBack}) => {
  const dealServer = client.service("deal");
  const {state} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [currentView, setCurrentView] = useState("detail");
  const [scheduleAppointment, setScheduleAppointment] = useState(false);
  const [activateCall, setActivateCall] = useState(false);
  const [chat, setChat] = useState(false);
  const [unreadMsgs, setUnreadMsgs] = useState([]);

  const handleSetCurrentView = view => {
    setCurrentView(view);
  };

  const getUnreadMessagesCount = useCallback(async () => {
    setUnreadMsgs([]);
    const id = state.DealModule.selectedDeal._id;
    const userId = user.currentEmployee.userId;
    // console.log(userId);
    await dealServer
      .get(id)
      .then(resp => {
        const msgs = resp.chat;
        msgs.map(msg => {
          if (
            msg.senderId === userId ||
            msg.seen.includes(userId) ||
            unreadMsgs.includes(msg._id)
          ) {
            return;
          } else {
            return setUnreadMsgs(prev => [msg._id, ...prev]);
          }
        });
      })
      .catch(err => {
        // toast.error("There was an error getting messages for this chat");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUnreadMessagesCount();

    dealServer.on("created", obj => getUnreadMessagesCount());
    dealServer.on("updated", obj => getUnreadMessagesCount());
    dealServer.on("patched", obj => getUnreadMessagesCount());
    dealServer.on("removed", obj => getUnreadMessagesCount());
  }, [getUnreadMessagesCount]);

  //console.log(unreadMsgs);

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
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
            Deal Details
          </Typography>
        </Box>

        <Box sx={{display: "flex", justifyContent: "flex-end"}} mb={2} gap={1}>
          <Badge
            badgeContent={unreadMsgs.length}
            color="secondary"
            sx={{marginRight: "10px"}}
          >
            <GlobalCustomButton onClick={() => setChat(true)}>
              <ChatIcon fontSize="small" sx={{marginRight: "5px"}} />
              Chats
            </GlobalCustomButton>
          </Badge>

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
            onClick={() => handleSetCurrentView("sla")}
            sx={
              currentView === "sla"
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
            SLA
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

      <Box>
        {currentView === "detail" && <DetailView />}
        {currentView === "contacts" && <Contact />}
        {currentView === "staffs" && <StaffsListView />}
        {currentView === "tasks" && <CRMTasks />}
        {currentView === "uploads" && <UploadView />}
        {/* {currentView === "proposal" && <CrmProposals isTab={true} />} */}
        {currentView === "appointments" && <CrmAppointment isTab={true} />}
        {currentView === "invoice" && <Invoice isTab={true} />}
      {/*   {currentView === "sla" && <SLA isTab={true} />} */}
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
          {chat && <GlobalDealChat closeChat={() => setChat(false)} />}
        </Box>
      </Drawer>
    </Box>
  );
};

export default DealDetailView;
