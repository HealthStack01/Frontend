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
import SendIcon from "@mui/icons-material/Send";
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
import SendLinkViaEmail from "./SendLink";

const InvoicePlanList = ({handleGoBack}) => {
  const InvoiceServ = client.service("corpinvoices");
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
  const [planId, setPlanId] = useState([]);
  const [detailModal, setDetailModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [statusHistory, setStatusHistory] = useState([]);
  const [watermarkMsg, setWatermarkMsg] = useState("");
  const [unreadMsgs, setUnreadMsgs] = useState([]);
  const [sendLinkModal, setSendLinkModal] = useState(false);

  const invoiceRef = useRef(null);

  /*  const handleAddNewPlan = async plan => {
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
  }, [state.InvoiceModule]); */

  const plansColumns = [
    {
      name: "S/N",
      width: "50px",
      style: {color: "#0364FF"},
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Plan Type",
      key: "file_name",
      description: "Enter Date",
      selector: row => row.type,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Date",
      style: {color: "#0364FF"},
      key: "created_at",
      description: "Enter Date",
      selector: row => moment(row.created_at).format("L"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Duration",
      style: {color: "#0364FF"},
      key: "no_of_months",
      description: "Enter Date",
      selector: row => `${row.length} ${row.calendrical}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Premium",
      style: {color: "#0364FF"},
      key: "premium",
      description: "Enter Date",
      selector: row => `${row.premium}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Number of Heads",
      style: {color: "#0364FF"},
      key: "no_of_heads",
      description: "Enter Date",
      selector: row => `${row.heads}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Utilized",
      style: {color: "#0364FF"},
      key: "no_of_heads",
      description: "Enter Date",
      selector: row => `${row.heads}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Amount(₦)",
      style: {color: "#0364FF"},
      key: "amount",
      description: "Enter Date",
      selector: row => row.amount,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Email Link",
      width: "80px",
      center: true,
      key: "action",
      description: "Enter Date",
      selector: row => (
        <IconButton
          onClick={() => sendLink(row)}
          disabled={row.utilizationStatus === "Complete"}
          color="error"
        >
          <SendIcon fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
      /* omit: omitDelete, */
    },
  ];

  const handleRow = plan => {
    //setSelectedPlan(plan);
    setState(prev => ({
      ...prev,
      InvoiceModule: {...prev.InvoiceModule, selectedPlan: plan},
    }));
    setDetailModal(true);
  };

  const sendLink = row => {
    setSendLinkModal(true);
    setPlanId(row._id);
    //open modal for sendin link
    //configure modal
    //
  };

  useEffect(() => {
    setPlans([]);
    InvoiceServ.find({
      query: {
        customerId: user.currentEmployee.facilityDetail._id,
        //approved:true,
        utilization: {
          $ne: "complete",
        },
      },
    })
      .then(res => {
        res.data.forEach(el => {
          setPlans(prev => [...prev, ...el.plans]); //need tocheck consumption for each plan
        });
      })
      .catch(err => {
        console.log(err);
      });
    //console.log(totalPlansSum);
  }, []);

  /* const returnStatusMessage = () => {
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

  

  useEffect(() => {
    getUnreadMessagesCount();

    dealServer.on("created", obj => getUnreadMessagesCount());
    dealServer.on("updated", obj => getUnreadMessagesCount());
    dealServer.on("patched", obj => getUnreadMessagesCount());
    dealServer.on("removed", obj => getUnreadMessagesCount());
  }, [getUnreadMessagesCount]);
 */
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <ModalBox
        open={sendLinkModal}
        onClose={() => setSendLinkModal(false)}
        header="Send Onboarding Link to Benficiaries"
      >
        <SendLinkViaEmail
          closeModal={() => setSendLinkModal(false)}
          defaultToEmail={""}
          disableToEmailChange={true}
          orgType="individual"
          id={planId}
        />
      </ModalBox>

      <Grid container spacing={2} p={2}>
        <Grid item xs={12}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <FormsHeaderText text="Invoice Plans List" />

            {/*  <GlobalCustomButton onClick={() => setPlanCreateModal(true)}>
                <AddCircleOutline fontSize="small" sx={{marginRight: "3px"}} />
                Add New Plan
              </GlobalCustomButton> */}
          </Box>

          <div
            className="level"
            style={{
              height: "80vh",
              overflowY: "scroll",
            }}
          >
            <CustomTable
              title={"Plans List"}
              columns={plansColumns}
              data={plans}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              CustomEmptyData={
                <Typography sx={{fontSize: "0.8rem"}}>
                  You do not have any unused plan yet!
                </Typography>
              }
              progressPending={false}
            />
          </div>
        </Grid>
      </Grid>

      {/*  <ModalBox
          open={planCreateModal}
          onClose={() => setPlanCreateModal(false)}
          header="Add New Plan"
        >
          <ModalCreatePlan addNewPlan={handleAddNewPlan} />
        </ModalBox> */}
    </Box>
  );
};

export default InvoicePlanList;
