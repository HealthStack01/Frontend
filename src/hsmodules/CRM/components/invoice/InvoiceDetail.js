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

const random = require("random-string-generator");

const plansData = [
  {
    plan_type: "HMO",
    premium: "10",
    no_of_heads: "10",
    duration_calendrical: "Month(s)",
    duration_length: "6",
    amount: "1000000",
    _id: "00",
  },
  {
    plan_type: "Family",
    premium: "5",
    no_of_heads: "3",
    duration_calendrical: "Year(s)",
    duration_length: "2",
    amount: "5000000",
    _id: "0",
  },
  {
    plan_type: "HMO",
    premium: "5",
    no_of_heads: "20",
    duration_calendrical: "Year(s)",
    duration_length: "1",
    amount: "10000000",
    _id: "000",
  },
  {
    plan_type: "Personal",
    premium: "10",
    no_of_heads: "1",
    duration_calendrical: "Year(s)",
    duration_length: "10",
    amount: "5000000",
    _id: "00000",
  },
  {
    plan_type: "HMO",
    premium: "1",
    no_of_heads: "15",
    duration_calendrical: "Week(s)",
    duration_length: "12",
    amount: "100000",
    _id: "0000",
  },
  {
    plan_type: "Family",
    premium: "20",
    no_of_heads: "5",
    duration_calendrical: "Month(s)",
    duration_length: "8",
    amount: "20000000",
    _id: "0000000",
  },
];

const InvoiceDetail = ({handleGoBack}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset, control, setValue} = useForm();
  const [viewInvoice, setViewInvoice] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [chat, setChat] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planCreateModal, setPlanCreateModal] = useState(false);

  const handleAddNewPlan = async plan => {
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

  const handleRemovePlan = plan => {
    return toast.error("Unable to delete plan, not operational yet");
    setPlans(prev => prev.filter(item => item._id !== plan._id));
  };

  const handleUpdatePlan = update => {
    return toast.error("Unable to update plan, not operational yet");
    setPlans(prev =>
      prev.map(item => {
        if (item._id === update._id) {
          return update;
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    const invoice = state.InvoiceModule.selectedInvoice;

    setPlans(invoice.plans || []);
    reset(invoice);
  }, [state.InvoiceModule]);

  useEffect(() => {
    //console.log(plans[0]);
    const totalPlansSum = plans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

    setValue("total_amount", totalPlansSum);

    //console.log(totalPlansSum);
  }, [plans]);

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
          <Badge badgeContent={4} color="secondary" sx={{marginRight: "10px"}}>
            <GlobalCustomButton onClick={() => setChat(true)}>
              <ChatIcon fontSize="small" sx={{marginRight: "5px"}} />
              Chat
            </GlobalCustomButton>
          </Badge>

          <GlobalCustomButton
            color="error"
            onClick={() => setDeclineModal(true)}
          >
            <BlockIcon fontSize="small" sx={{marginRight: "5px"}} />
            Decline
          </GlobalCustomButton>

          <GlobalCustomButton
            color="secondary"
            onClick={() => setViewInvoice(true)}
          >
            <ReceiptIcon fontSize="small" sx={{marginRight: "5px"}} />
            View Invoice
          </GlobalCustomButton>

          <GlobalCustomButton>
            <ApprovalIcon fontSize="small" sx={{marginRight: "5px"}} />
            Approve
          </GlobalCustomButton>
        </Box>
      </Box>

      <Grid container spacing={2} p={2}>
        <Grid item lg={12} md={12} sm={12}>
          <PageCustomerDetail />
        </Grid>

        <Grid item lg={12} md={12} sm={12}>
          <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
            <FormsHeaderText text="Invoice Information" />
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
                disabled
              />
            </Grid>

            <Grid item lg={2} md={3} sm={4}>
              <CustomSelect
                label="Payment Option"
                options={["Annually", "Bi-Annually", "Quarterly"]}
                control={control}
                name="payment_option"
                disabled
              />
            </Grid>

            <Grid item lg={2} md={3} sm={4}>
              <CustomSelect
                label="Subscribtion Category"
                options={["New", "Renewal", "Additional"]}
                control={control}
                name="subscription_category"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <FormsHeaderText text="Invoice Plans List" />

            <GlobalCustomButton onClick={() => setPlanCreateModal(true)}>
              Add New Plan
            </GlobalCustomButton>
          </Box>
          <Plans
            plans={plans}
            addNewPlan={handleAddNewPlan}
            removePlan={handleRemovePlan}
            updatePlan={handleUpdatePlan}
            omitCreate
          />
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
        <InvoiceDeclineReason
          reason={declineReason}
          setReason={setDeclineReason}
          closeModal={() => setDeclineModal(false)}
        />
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
  );
};

export default InvoiceDetail;
