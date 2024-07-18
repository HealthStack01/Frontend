import { useState, useContext } from "react";
import { Box } from "@mui/material";
import { getDiscountColumns } from "../colums/columns";
// import {contactsData} from "../lead/data";
import CustomTable from "../../../../components/customtable";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import { FormsHeaderText } from "../../../../components/texts";
import { Typography } from "@mui/material";
import client from "../../../../feathers";
import { ObjectContext } from "../../../../context";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import { toast } from "react-toastify";

export default function DiscountList({
  openCreateModal,
  openDetailModal,
  standalone,
  discount,
  handleRow,
}) {
  const dealServer = client.service("deal");
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    message: "",
    type: "",
  });

  // console.log("inside discount", discount);
  const conditionalRowStyles = [
    {
      when: (row) => row.active === false,
      style: {
        backgroundColor: "pink",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const handleDeleteDiscount = async (discounts) => {
    showActionLoader();
    const { selectedInvoice } = state.InvoiceModule;
    const { selectedDeal } = state.DealModule;

    const prevDiscounts = selectedInvoice?.discount || [];
    const discountToDelete = prevDiscounts.find(
      (item) => item._id === discounts._id
    );

    if (!discountToDelete) {
      hideActionLoader();
      toast.error(`Discount not found`);
      return;
    }

    const newDiscounts = prevDiscounts.filter(
      (item) => item._id !== discounts._id
    );
    let newTotalAmount = selectedInvoice.total_amount;

    if (discountToDelete.status === "Approved") {
      const discountPercent = parseFloat(discountToDelete.percent);

      if (
        isNaN(discountPercent) ||
        discountPercent < 0 ||
        discountPercent > 100
      ) {
        hideActionLoader();
        toast.error(`Invalid discount percent`);
        return;
      }

      const discountAmount =
        (discountPercent / 100) *
        (newTotalAmount / (1 - discountPercent / 100));
      newTotalAmount = selectedInvoice.total_amount + discountAmount;
    }

    const updatedPlans = selectedInvoice.plans.map((plan) => ({
      ...plan,
      amount: (plan.amount / selectedInvoice.total_amount) * newTotalAmount,
    }));

    const totalPlansSum = updatedPlans.reduce(
      (accumulator, plan) => accumulator + Number(plan.amount),
      0
    );

    const updatedInvoiceDetail = {
      ...selectedInvoice,
      total_amount: totalPlansSum,
      discount: newDiscounts,
      plans: updatedPlans,
    };

    const updatedInvoices = selectedDeal.invoices.map((item) =>
      item._id === updatedInvoiceDetail._id ? updatedInvoiceDetail : item
    );

    try {
      const res = await dealServer.patch(selectedDeal._id, {
        invoices: updatedInvoices,
      });
      hideActionLoader();

      setState((prev) => ({
        ...prev,
        DealModule: { ...prev.DealModule, selectedDeal: res },
        InvoiceModule: {
          ...prev.InvoiceModule,
          selectedInvoice: updatedInvoiceDetail,
        },
      }));
      cancelConfirm();
      toast.success(
        `You have successfully deleted the discount and updated the invoice`
      );
    } catch (err) {
      hideActionLoader();
      toast.error(`Sorry, failed to delete the discount. ${err}`);
    }
  };

  const handleConfirmDelete = (discounts) => {
    setConfirmDialog({
      open: true,
      action: () => handleDeleteDiscount(discounts),
      message: "You're about to delete a Discount from this Invoice?",
      type: "danger",
    });
  };

  const discountColumns = getDiscountColumns(
    handleConfirmDelete,
    false,
    standalone
  );

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
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={2}
        >
          <FormsHeaderText text="Discount Infomation" />

          <GlobalCustomButton onClick={openCreateModal}>
            <AddCircleOutlineOutlined
              sx={{ marginRight: "5px" }}
              fontSize="small"
            />
            Add Discount
          </GlobalCustomButton>
        </Box>

        <Box mt={1} mb={1}>
          <CustomTable
            title={"Discount List"}
            columns={discountColumns}
            data={discount}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            CustomEmptyData="You haven't added any discount yet, Click edit to add.."
            progressPending={false}
            conditionalRowStyles={conditionalRowStyles}
          />
        </Box>
      </Box>
    </Box>
  );
}
