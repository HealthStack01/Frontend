import {useContext, useEffect, useState, useCallback, useRef} from "react";
import {Box} from "@mui/system";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import InvoiceDetailsTab from "./tabs/Details";
import InvoicePlansTab from "./tabs/Plans";
import ModalBox from "../../../../components/modal";
import InvoicePrintOut from "./InvoicePrintOut";
import InvoiceDeclineReason from "./InvoiceDecline";
import BlockIcon from "@mui/icons-material/Block";
import ApprovalIcon from "@mui/icons-material/Approval";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {Grid, IconButton, Typography} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import Drawer from "@mui/material/Drawer";

import Badge from "@mui/material/Badge";

import ChatInterface from "../../../../components/chat/ChatInterface";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomTable from "../../../../components/customtable";
import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import Plans from "../../Plans";
import moment from "moment";
import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import Input from "../../../../components/inputs/basic/Input";
import {ObjectContext, UserContext} from "../../../../context";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {toast} from "react-toastify";
import client from "../../../../feathers";
import {ModalCreatePlan} from "../plans/CreatePlan";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Watermark from "@uiw/react-watermark";
import InvoiceApproveReason from "./InvoiceApprove";
import InvoiceReopenReason from "./invoiceReopen";
import dayjs from "dayjs";
import InvoiceChat from "./InvoiceChat";

const InvoiceDetail = ({handleGoBack}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset, control, setValue, handleSubmit} = useForm();
  const [viewInvoice, setViewInvoice] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [reopenModal, setReopenModal] = useState(false);
  const [chat, setChat] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planCreateModal, setPlanCreateModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [statusHistory, setStatusHistory] = useState([]);
  const [watermarkMsg, setWatermarkMsg] = useState("");
  const [unreadMsgs, setUnreadMsgs] = useState([]);

  const invoiceRef = useRef(null);

  const handleAddNewPlan = async plan => {
    showActionLoader();
    //return toast.error("Unable to add new plan, not operational yet");

    const invoiceDetail = state.InvoiceModule.selectedInvoice;
    const prevPlans = invoiceDetail.plans;
    const currentDeal = state.DealModule.selectedDeal;

    const newPlans = [plan, ...prevPlans];

    const totalPlansSum = newPlans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

    const documentId = currentDeal._id;

    const newInvoiceDetail = {
      ...invoiceDetail,
      total_amount: totalPlansSum,
      plans: newPlans,
    };

    const prevInvoices = currentDeal.invoices;

    const newInvoices = prevInvoices.map(item => {
      if (item._id === newInvoiceDetail._id) {
        return newInvoiceDetail;
      } else {
        return item;
      }
    });

    //return console.log(newInvoices);

    await dealServer
      .patch(documentId, {invoices: newInvoices})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));

        setPlanCreateModal(false);
        setPlans(newPlans);
        toast.success(`You have successfully Added a new Plan`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Add a new Plan. ${err}`);
      });
  };

  const handleUpdateInvoiceDetail = async data => {
    //showActionLoader();
    //return toast.error("Unable to add new plan, not operational yet");

    const invoiceDetail = state.InvoiceModule.selectedInvoice;
    const currentDeal = state.DealModule.selectedDeal;

    const newInvoiceDetail = {
      ...invoiceDetail,
      ...data,
    };

    const prevInvoices = currentDeal.invoices;

    const newInvoices = prevInvoices.map(item => {
      if (item._id === newInvoiceDetail._id) {
        return newInvoiceDetail;
      } else {
        return item;
      }
    });

    const documentId = currentDeal._id;

    await dealServer
      .patch(documentId, {invoices: newInvoices})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        setState(prev => ({
          ...prev,
          InvoiceModule: {
            ...prev.InvoiceModule,
            selectedInvoice: newInvoiceDetail,
          },
        }));

        toast.success(`You have successfully updated this Invoice`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to updated the Invoice. ${err}`);
      });
  };

  useEffect(() => {
    const invoice = state.InvoiceModule.selectedInvoice;
    //console.log(invoice);

    setPlans(invoice.plans || []);
    reset(invoice);
    setInvoiceStatus(invoice.status);
    setStatusHistory(invoice.statusHx || []);
    returnStatusMessage();
  }, [state.InvoiceModule]);

  useEffect(() => {
    //console.log(plans[0]);
    const totalPlansSum = plans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

    setValue("total_amount", totalPlansSum);

    //console.log(totalPlansSum);
  }, [plans]);

  const returnStatusMessage = () => {
    if (invoiceStatus.toLowerCase() === "pending") {
      //console.log(invoiceStatus);
      return setWatermarkMsg("");
    } else if (invoiceStatus.toLowerCase() === "declined") {
      return setWatermarkMsg("Declined");
    } else if (invoiceStatus.toLowerCase() === "approved") {
      return setWatermarkMsg("Approved");
    }
  };

  const handleRow = row => {};

  const historyColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Employee",
      key: "name",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.updatedByName}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "200px",
      style: {
        textTransform: "capitalize",
        color: "#1976d2",
      },
    },
    {
      name: "Date & Time",
      key: "name",
      description: "Enter name of Company",
      selector: row => dayjs(row.updatedAt).format("DD/MM/YYYY hh:mm A	"),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "150px",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Title",
      key: "name",
      description: "Enter name of Company",
      selector: row => row.title,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "150px",
      style: {
        textTransform: "capitalize",
        color: "#1976d2",
      },
    },
    {
      name: "Comment",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.comment}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
  ];

/*   const getUnreadMessagesCount = useCallback(async () => {
    setUnreadMsgs([]);
    const id = state.DealModule.selectedDeal._id;
    const userId = user.currentEmployee.userId;
    const invoiceId = state.InvoiceModule.selectedInvoice._id;
    // console.log(userId);
    await dealServer
      .get(id)
      .then(resp => {
        const invoices = resp.invoices || [];
        const selectedInvoice = invoices.find(item => item._id === invoiceId);

        const msgs = selectedInvoice.chat || [];
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
  }, []); */

 /*  useEffect(() => {
    getUnreadMessagesCount();

    dealServer.on("created", obj => getUnreadMessagesCount());
    dealServer.on("updated", obj => getUnreadMessagesCount());
    dealServer.on("patched", obj => getUnreadMessagesCount());
    dealServer.on("removed", obj => getUnreadMessagesCount());
  }, [getUnreadMessagesCount]); */

  return (
    <Watermark
      content={invoiceStatus.toLowerCase() === "pending" ? "" : invoiceStatus}
      style={{background: "#ffffff"}}
      fontColor={
        invoiceStatus.toLowerCase() === "declined"
          ? "rgba(255, 0, 0, 0.3)"
          : "rgba(0, 255, 0, 0.3)"
      }
    >
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
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon fontSize="small" sx={{marginRight: "5px"}} />
            Back
          </GlobalCustomButton>

          <Box
            sx={{
              display: "flex",
            }}
            gap={1}
          >
            {/*  <Badge
              badgeContent={unreadMsgs.length}
              color="secondary"
              sx={{marginRight: "10px"}}
            >
              <GlobalCustomButton onClick={() => setChat(true)}>
                <ChatIcon fontSize="small" sx={{marginRight: "5px"}} />
                Chat
              </GlobalCustomButton>
            </Badge> */}

            {/*    {(user?.currentEmployee?.roles?.includes("Admin") ||
              user?.currentEmployee?.roles?.includes("CRM Authorization")) && (
              <>
                {invoiceStatus.toLowerCase() === "declined" ||
                invoiceStatus.toLowerCase() === "approved" ? (
                  <GlobalCustomButton onClick={() => setReopenModal(true)}>
                    <OpenWithIcon fontSize="small" sx={{marginRight: "5px"}} />
                    Reopen Invoice
                  </GlobalCustomButton>
                ) : null}
                {invoiceStatus.toLowerCase() !== "declined" &&
                  invoiceStatus.toLowerCase() !== "approved" && (
                    <GlobalCustomButton
                      color="error"
                      onClick={() => setDeclineModal(true)}
                    >
                      <BlockIcon fontSize="small" sx={{marginRight: "5px"}} />
                      Decline
                    </GlobalCustomButton>
                  )}
                {invoiceStatus.toLowerCase() !== "approved" &&
                  invoiceStatus.toLowerCase() !== "declined" && (
                    <GlobalCustomButton onClick={() => setApproveModal(true)}>
                      <ApprovalIcon
                        fontSize="small"
                        sx={{marginRight: "5px"}}
                      />
                      Approve
                    </GlobalCustomButton>
                  )} 
              </>
            )}*/}

            {/*   <GlobalCustomButton
              color="secondary"
              onClick={() => setViewInvoice(true)}
            >
              <ReceiptIcon fontSize="small" sx={{marginRight: "5px"}} />
              View Invoice
            </GlobalCustomButton> */}

            {/* <ReactToPrint
              trigger={() => (
                <GlobalCustomButton color="info">
                  <ReceiptIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Print Invoice
                </GlobalCustomButton>
              )}
              content={() => invoiceRef.current}
            /> */}
          </Box>
        </Box>

        <Grid container spacing={2} p={2}>
          {/*  <Grid item lg={12} md={12} sm={12}>
            <PageCustomerDetail />
          </Grid> */}

          <Grid item lg={12} md={12} sm={12}>
            <Box mb={2} sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Invoice Information" />

              {/*   <Box sx={{display: "flex"}} gap={2}>
                {edit ? (
                  <>
                    <GlobalCustomButton
                      onClick={() => setEdit(false)}
                      color="warning"
                    >
                       <EditIcon fontSize="small" sx={{marginRight: "3px"}} /> 
                      Cancel
                    </GlobalCustomButton>

                    <GlobalCustomButton
                      onClick={handleSubmit(handleUpdateInvoiceDetail)}
                      color="success"
                    >
                      <SystemUpdateAltIcon
                        fontSize="small"
                        sx={{marginRight: "3px"}}
                      />
                      Update
                    </GlobalCustomButton>
                  </>
                ) : (
                  <GlobalCustomButton onClick={() => setEdit(true)}>
                    <EditIcon fontSize="small" sx={{marginRight: "3px"}} /> Edit
                  </GlobalCustomButton>
                )}
              </Box> */}
            </Box>

            <Grid container spacing={1} mb={1.5}>
              <Grid item lg={2} md={3} sm={4}>
                <MuiCustomDatePicker
                  label="Date"
                  value={moment(moment.now()).format("L")}
                  disabled={true}
                  name="date"
                  control={control}
                />
              </Grid>
              <Grid item lg={2} md={3} sm={4}>
                <Input
                  label="Invoice Number"
                  register={register("invoice_number", {required: true})}
                  disabled={true}
                />
              </Grid>
              <Grid item lg={2} md={3} sm={4}>
                <Input
                  label="Total Amount"
                  register={register("total_amount", {required: true})}
                  disabled={true}
                />
              </Grid>

              <Grid item lg={2} md={3} sm={4}>
                <CustomSelect
                  label="Payment Mode"
                  options={["Cash", "Cheque", "Transfer"]}
                  control={control}
                  name="payment_mode"
                  disabled={!edit}
                />
              </Grid>

              <Grid item lg={2} md={3} sm={4}>
                <CustomSelect
                  label="Payment Option"
                  options={["Annually", "Bi-Annually", "Quarterly"]}
                  control={control}
                  name="payment_option"
                  disabled={!edit}
                />
              </Grid>

              <Grid item lg={2} md={3} sm={4}>
                <CustomSelect
                  label="Subscribtion Category"
                  options={["New", "Renewal", "Additional"]}
                  control={control}
                  name="subscription_category"
                  disabled={!edit}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Invoice Plans List" />

              {/*  <GlobalCustomButton onClick={() => setPlanCreateModal(true)}>
                <AddCircleOutline fontSize="small" sx={{marginRight: "3px"}} />
                Add New Plan
              </GlobalCustomButton> */}
            </Box>
            <Plans plans={plans} addNewPlan={handleAddNewPlan} omitCreate />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Invoice History" />
            </Box>

            <Box sx={{zIndex: "999999"}}>
              <CustomTable
                title={""}
                columns={historyColumns}
                data={statusHistory}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={false}
                CustomEmptyData={"No Status History for this invoice yet..."}
              />
            </Box>
          </Grid>
        </Grid>

        <ModalBox open={viewInvoice} onClose={() => setViewInvoice(false)}>
          <InvoicePrintOut ref={invoiceRef} />
        </ModalBox>

        <ModalBox
          open={planCreateModal}
          onClose={() => setPlanCreateModal(false)}
          header="Add New Plan"
        >
          <ModalCreatePlan addNewPlan={handleAddNewPlan} />
        </ModalBox>

        <ModalBox
          open={declineModal}
          onClose={() => setDeclineModal(false)}
          header="Decline Invoice"
        >
          <InvoiceDeclineReason closeModal={() => setDeclineModal(false)} />
        </ModalBox>

        <ModalBox
          open={approveModal}
          onClose={() => setApproveModal(false)}
          header="Approve Invoice"
        >
          <InvoiceApproveReason closeModal={() => setApproveModal(false)} />
        </ModalBox>

        <ModalBox
          open={reopenModal}
          onClose={() => setReopenModal(false)}
          header="Reopen Invoice"
        >
          <InvoiceReopenReason closeModal={() => setReopenModal(false)} />
        </ModalBox>

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
            <InvoiceChat closeChat={() => setChat(false)} />
          </Box>
        </Drawer>
      </Box>
    </Watermark>
  );
};

export default InvoiceDetail;
