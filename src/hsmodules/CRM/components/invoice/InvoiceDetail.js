import {useState} from "react";
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

const data = [
  {
    details: "Gold Ultra Plus",
    months: "6",
    num_of_plans: "40",
    price: "58,333.00",
    amount: "1,283,326.00",
  },

  {
    details: "Gold Ultra Plus",
    months: "5",
    num_of_plans: "30",
    price: "58,333.00",
    amount: "1,283,326.00",
  },

  {
    details: "Gold Ultra Plus",
    months: "4",
    num_of_plans: "24",
    price: "58,333.00",
    amount: "1,283,326.00",
  },

  {
    details: "Gold Ultra Plus",
    months: "12",
    num_of_plans: "11",
    price: "58,333.00",
    amount: "1,283,326.00",
  },
];

const columns = [
  {
    name: "S/N",
    key: "sn",
    description: "Enter Date",
    selector: (row, i) => i + 1,
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "50px",
  },
  {
    name: "Details",
    key: "details",
    description: "Enter Date",
    selector: row => row.details,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "No of Plan",
    key: "num_of_plans",
    description: "Enter Date",
    selector: row => row.num_of_plans,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Unit Price(N)",
    key: "price",
    description: "Enter Date",
    selector: row => row.price,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "No of Month",
    key: "months",
    description: "Enter Date",
    selector: row => row.months,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Amount(N)",
    key: "amount",
    description: "Enter Date",
    selector: row => row.amount,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

const InvoiceDetail = ({handleGoBack}) => {
  const {register, reset} = useForm();
  const [viewInvoice, setViewInvoice] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [chat, setChat] = useState(false);

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
          <ArrowBackIcon />
          Back To Lists
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
        <Grid item lg={6} md={6} sm={12}>
          <InvoiceDetailsTab />
        </Grid>

        <Grid item lg={6} md={6} sm={12}>
          <InvoicePlansTab />
        </Grid>

        <Grid item xs={12}>
          <Box>
            <CustomTable
              columns={columns}
              data={data}
              pointerOnHover
              highlightOnHover
              striped
              //onRowClicked={handleRowClick}
              CustomEmptyData="There are no bills"
              progressPending={false}
            />
          </Box>
        </Grid>
      </Grid>

      <ModalBox open={viewInvoice} onClose={() => setViewInvoice(false)}>
        <InvoicePrintOut />
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
            width: "25vw",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <ChatInterface closeChat={() => setChat(false)} />
        </Box>
      </SwipeableDrawer>

      {/* <ModalBox open={chat} onClose={() => setChat(false)}>
        <ChatInterface />
      </ModalBox> */}
    </Box>
  );
};

export default InvoiceDetail;
