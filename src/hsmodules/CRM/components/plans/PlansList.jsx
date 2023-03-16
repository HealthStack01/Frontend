import {useState, useContext} from "react";
import {Box, Typography} from "@mui/material";
import {getPlansColumns} from "../colums/columns";
import {contactsData} from "../lead/data";
import CustomTable from "../../../../components/customtable";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../../../components/texts";
import client from "../../../../feathers";
import {ObjectContext} from "../../../../context";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import {toast} from "react-toastify";

const PlansList = ({
  openCreateModal,
  openDetailModal,
  plans,
  removePlan,
  omitCreate,
  handleRow,
}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    message: "",
    type: "",
  });
  //first param is passed to the delete element on the table and the second param (false) decides whether or not the delete button is disabled
  const handleDeletePlan = async plan => {
    showActionLoader();
    const invoiceDetail = state.InvoiceModule.selectedInvoice;
    const prevPlans = invoiceDetail.plans;
    const currentDeal = state.DealModule.selectedDeal;

    const newPlans = prevPlans.filter(item => item._id !== plan._id);

    const totalPlansSum = newPlans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

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
        cancelConfirm();

        toast.success(`You have successfully Added a new Plan`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Add a new Plan. ${err}`);
      });
  };

  const handleConfirmDelete = plan => {
    setConfirmDialog({
      open: true,
      action: () => handleDeletePlan(plan),
      message: "You're about to delete a Plan from this Invoice?",
      type: "danger",
    });
  };

  const plansColumns = getPlansColumns(handleConfirmDelete, false);

  const cancelConfirm = () => {
    setConfirmDialog({
      open: false,
      action: null,
      message: "",
      type: "",
    });
  };
  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        cancelAction={cancelConfirm}
        confirmationAction={confirmDialog.action}
        message={confirmDialog.message}
        type={confirmDialog.type}
      />
      {!omitCreate && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={2}
        >
          <FormsHeaderText text="Plans List" />

          <GlobalCustomButton onClick={openCreateModal}>
            <AddCircleOutlineOutlined
              sx={{marginRight: "5px"}}
              fontSize="small"
            />
            Add New Plan
          </GlobalCustomButton>
        </Box>
      )}

      <Box mt={1} mb={1}>
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
              You haven't added any plan yet!
            </Typography>
          }
          progressPending={false}
        />
      </Box>
    </Box>
  );
};

export default PlansList;
