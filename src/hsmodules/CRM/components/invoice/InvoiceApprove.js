import {useState, useContext} from "react";
import {Box, Typography} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlockIcon from "@mui/icons-material/Block";
import ApprovalIcon from "@mui/icons-material/Approval";
import {v4 as uuidv4} from "uuid";

import "./styles.scss";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import {toast} from "react-toastify";
import Textarea from "../../../../components/inputs/basic/Textarea";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";

const InvoiceApproveReason = ({closeModal}) => {
  const [text, setText] = useState("");
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleApproveInvoice = async () => {
    showActionLoader();

    const employee = user.currentEmployee;

    const invoiceDetail = state.InvoiceModule.selectedInvoice;
    const currentDeal = state.DealModule.selectedDeal;

    const newStatusHistory = {
      updatedAt: new Date(),
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
      comment: text,
      title: "Approved Invoice",
      _id: uuidv4(),
    };

    const oldStatusHistory = invoiceDetail.statusHx || [];

    const newInvoiceDetail = {
      ...invoiceDetail,
      status: "Approved",
      statusHx: [newStatusHistory, ...oldStatusHistory],
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
        setConfirmDialog(false);
        closeModal();

        toast.success(`You have successfully Approved this Invoice`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        setConfirmDialog(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Approve the Invoice. ${err}`);
      });
  };

  const handleDone = () => {
    //setReason(text);
    console.log(text);
  };
  return (
    <Box
      sx={{
        width: "60vw",
        maxHeight: "80vh",
      }}
    >
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleApproveInvoice}
        type="create"
        message={`You're about to Approve this Invoice?`}
      />
      <Box
        sx={{
          height: "45px",
          backgroundColor: "#0075D9",
          display: "flex",
          alignItems: "center",
          paddingLeft: "25px",
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            fontWeight: "500",
          }}
        >
          Approval Comments
        </Typography>
      </Box>

      <Box
        sx={{
          "& .ck-editor__editable_inline": {minHeight: "20vh"},
        }}
      >
        <Textarea onChange={e => setText(e.target.value)} />
        {/* <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        /> */}
      </Box>

      <Box mt={2}>
        <GlobalCustomButton
          onClick={closeModal}
          sx={{marginRight: "15px"}}
          //variant="outlined"
          color="warning"
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          onClick={() => setConfirmDialog(true)}
          color="success"
        >
          <ApprovalIcon fontSize="small" sx={{marginRight: "5px"}} />
          Approve Invoice
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default InvoiceApproveReason;
