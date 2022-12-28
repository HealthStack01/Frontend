import {useContext, useEffect, useState} from "react";
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
import {Grid, IconButton} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import OpenWithIcon from "@mui/icons-material/OpenWith";

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

const random = require("random-string-generator");

const InvoiceDetail = ({handleGoBack}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset, control, setValue, handleSubmit} = useForm();
  const [viewInvoice, setViewInvoice] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [chat, setChat] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planCreateModal, setPlanCreateModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState("");

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

  const handleReopenInvoice = async () => {
    //showActionLoader();
    //return toast.error("Unable to add new plan, not operational yet");

    const invoiceDetail = state.InvoiceModule.selectedInvoice;
    const currentDeal = state.DealModule.selectedDeal;

    const newInvoiceDetail = {
      ...invoiceDetail,
      status: "Pending",
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

    //return console.log(newInvoiceDetail);

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
        setInvoiceStatus("Pending");
        setConfirmDialog(false);
        closeModal();

        toast.success(`You have successfully Opened this Invoice`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        setConfirmDialog(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Open the Invoice. ${err}`);
      });
  };

  useEffect(() => {
    const invoice = state.InvoiceModule.selectedInvoice;
    //console.log(invoice);

    setPlans(invoice.plans || []);
    reset(invoice);
    setInvoiceStatus(invoice.status);
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
      return "";
    } else if (invoiceStatus.toLowerCase() === "declined") {
      return "Declined";
    } else if (invoiceStatus.toLowerCase() === "approved") {
      console.log("why showing me approved");
      return "Approved";
    }
  };

  return (
    <Watermark
      content={returnStatusMessage()}
      style={{background: "#ffffff"}}
      fontColor={invoiceStatus.toLowerCase() === "declined" ? "red" : "green"}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Watermark></Watermark>
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
            <Badge
              badgeContent={4}
              color="secondary"
              sx={{marginRight: "10px"}}
            >
              <GlobalCustomButton onClick={() => setChat(true)}>
                <ChatIcon fontSize="small" sx={{marginRight: "5px"}} />
                Chat
              </GlobalCustomButton>
            </Badge>
            {/* 
            {invoiceStatus.toLowerCase() === "declined" ||
            invoiceStatus.toLowerCase() === "approved" ? (
              <GlobalCustomButton onClick={handleReopenInvoice}>
                <OpenWithIcon fontSize="small" sx={{marginRight: "5px"}} />
                Reopen Invoice
              </GlobalCustomButton>
            ) : null} */}

            {invoiceStatus.toLowerCase() !== "declined" && (
              <GlobalCustomButton
                color="error"
                onClick={() => setDeclineModal(true)}
              >
                <BlockIcon fontSize="small" sx={{marginRight: "5px"}} />
                Decline
              </GlobalCustomButton>
            )}

            {invoiceStatus.toLowerCase() !== "approved" && (
              <GlobalCustomButton onClick={() => setApproveModal(true)}>
                <ApprovalIcon fontSize="small" sx={{marginRight: "5px"}} />
                Approve
              </GlobalCustomButton>
            )}

            <GlobalCustomButton
              color="secondary"
              onClick={() => setViewInvoice(true)}
            >
              <ReceiptIcon fontSize="small" sx={{marginRight: "5px"}} />
              View Invoice
            </GlobalCustomButton>
          </Box>
        </Box>

        <Grid container spacing={2} p={2}>
          <Grid item lg={12} md={12} sm={12}>
            <PageCustomerDetail />
          </Grid>

          <Grid item lg={12} md={12} sm={12}>
            <Box mb={2} sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Invoice Information" />

              <Box sx={{display: "flex"}} gap={2}>
                {edit ? (
                  <>
                    <GlobalCustomButton
                      onClick={() => setEdit(false)}
                      color="warning"
                    >
                      {/* <EditIcon fontSize="small" sx={{marginRight: "3px"}} /> */}
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
              </Box>
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

              <GlobalCustomButton onClick={() => setPlanCreateModal(true)}>
                <AddCircleOutline fontSize="small" sx={{marginRight: "3px"}} />
                Add New Plan
              </GlobalCustomButton>
            </Box>
            <Plans plans={plans} addNewPlan={handleAddNewPlan} omitCreate />
          </Grid>
        </Grid>

        <ModalBox open={viewInvoice} onClose={() => setViewInvoice(false)}>
          <InvoicePrintOut />
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

        <SwipeableDrawer
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
            <ChatInterface closeChat={() => setChat(false)} />
          </Box>
        </SwipeableDrawer>
      </Box>
    </Watermark>
  );
};

export default InvoiceDetail;
