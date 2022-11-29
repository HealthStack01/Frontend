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
import {Grid} from "@mui/material";

const InvoiceDetail = () => {
  const {register, reset} = useForm();
  const [currentTab, setCurrentTab] = useState("details");
  const [viewInvoice, setViewInvoice] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  const handleChangeTab = tab => {
    setCurrentTab(tab);
  };

  const RenderedTab = () => {
    switch (currentTab) {
      case "details":
        return <InvoiceDetailsTab />;

      case "plans":
        return <InvoicePlansTab />;

      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        width: "85vw",
        maxHeight: "80vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12}>
          <InvoiceDetailsTab />
        </Grid>

        <Grid item lg={6} md={6} sm={12}>
          <InvoicePlansTab />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
        }}
        mt={2}
      >
        <GlobalCustomButton
          color="error"
          sx={{
            marginRight: "10px",
          }}
          onClick={() => setDeclineModal(true)}
        >
          <BlockIcon fontSize="small" sx={{marginRight: "5px"}} />
          Decline
        </GlobalCustomButton>

        <GlobalCustomButton
          color="secondary"
          sx={{
            marginRight: "10px",
          }}
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
    </Box>
  );
};

export default InvoiceDetail;
