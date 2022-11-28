import {useState} from "react";
import {Box} from "@mui/system";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import InvoiceDetailsTab from "./tabs/Details";
import InvoicePlansTab from "./tabs/Plans";
import ModalBox from "../../../../components/modal";
import InvoicePrintOut from "./InvoicePrintOut";

const InvoiceDetail = () => {
  const {register, reset} = useForm();
  const [currentTab, setCurrentTab] = useState("details");
  const [viewInvoice, setViewInvoice] = useState(false);

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
        width: "800px",
        maxHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        mb={2}
      >
        <GlobalCustomButton
          sx={{
            marginRight: "10px",
          }}
          onClick={() => handleChangeTab("details")}
          color="info"
        >
          Details
        </GlobalCustomButton>

        <GlobalCustomButton
          onClick={() => handleChangeTab("plans")}
          color="warning"
        >
          Plans
        </GlobalCustomButton>
      </Box>

      <Box>
        <RenderedTab />
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
        mt={2}
      >
        <GlobalCustomButton
          variant="outlined"
          color="error"
          sx={{
            marginRight: "10px",
          }}
        >
          Decline
        </GlobalCustomButton>

        <GlobalCustomButton
          color="secondary"
          sx={{
            marginRight: "10px",
          }}
          onClick={() => setViewInvoice(true)}
        >
          View Invoice
        </GlobalCustomButton>

        <GlobalCustomButton>Approve</GlobalCustomButton>
      </Box>

      <ModalBox open={viewInvoice} onClose={() => setViewInvoice(false)}>
        <InvoicePrintOut />
      </ModalBox>
    </Box>
  );
};

export default InvoiceDetail;
