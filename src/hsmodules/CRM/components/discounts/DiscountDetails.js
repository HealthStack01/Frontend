import React, { useContext, useEffect } from "react";
import Input from "../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../components/inputs/basic/Select";
import { UserContext, ObjectContext } from "../../../../context";
import { Button, Box, Grid } from "@mui/material";
import client from "../../../../feathers";

import { toast } from "react-toastify";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useForm } from "react-hook-form";

export default function DiscountDetails({ closeModal }) {
  const { user } = useContext(UserContext);
  const dealServer = client.service("deal");
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const { register, handleSubmit, control, getValues, reset } = useForm();

  const handleApprovedDiscount = async (data) => {
    showActionLoader();

    const employee = user.currentEmployee;
    const { selectedInvoice, selectedDiscount } = state.InvoiceModule;
    const { selectedDeal } = state.DealModule;

    const discountPercent = parseFloat(data.percent);

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
      (discountPercent / 100) * selectedInvoice.total_amount;
    const newTotalAmount = Math.max(
      selectedInvoice.total_amount - discountAmount,
      0
    );

    const updatedDiscounts = selectedInvoice.discount.map((item) =>
      item._id === selectedDiscount._id
        ? {
            ...item,
            ...data,
            updatedAt: new Date(),
            updatedBy: employee.userId,
            updatedByName: `${employee.firstname} ${employee.lastname}`,
          }
        : item
    );

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
      discount: updatedDiscounts,
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

      toast.success(`You have successfully added a new discount`);
      closeModal();
    } catch (err) {
      hideActionLoader();
      toast.error(`Sorry, failed to add a new discount. ${err}`);
    }
  };

  useEffect(() => {
    const discount = state.InvoiceModule.selectedDiscount;
    reset(discount);
  }, [reset, state.InvoiceModule.selectedDiscount]);

  return (
    <Box
      sx={{
        width: "400px",
        maxHeight: "80vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            label="Discount %"
            type="number"
           placeholder="Enter percentage discount"
            register={register("percent", { required: true })}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Input
            label="Amount"
            type="number"
            placeholder="Enter Amount"
            register={register("amount", { required: true })}
          /> */}
        {/* </Grid> */}
        <Grid item xs={12}>
          <CustomSelect
            options={["Approved", "Not Approved"]}
            label="Status"
            control={control}
            name="status"
          />
        </Grid>
      </Grid>
      {/* {user?.currentEmployee?.roles?.includes("Admin") &&
        user?.currentEmployee?.roles?.includes("CRM Authorization") && ( */}
          <Button
            sx={{ textTransform: "capitalize", my: "10px" }}
            variant="contained"
            onClick={handleSubmit(handleApprovedDiscount)}
            size="small"
          >
            Authorize
          </Button>
        {/* )} */}
    </Box>
  );
}
