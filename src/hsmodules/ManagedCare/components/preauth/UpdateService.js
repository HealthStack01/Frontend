import {Box, Grid} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import Input from "../../../../components/inputs/basic/Input";
import Textarea from "../../../../components/inputs/basic/Textarea";
import ModalBox from "../../../../components/modal";
import {ObjectContext} from "../../../../context";

const UpdateService = () => {
  const {state, setState} = useContext(ObjectContext);
  const {register, reset} = useForm();
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    const service = state.PreAuthModule.selectedService;
    const data = {
      service_name: service.service.serviceName,
      quantity: service.quantity,
      pay_quantity: service.quantity,
      amount: service.amount,
      pay_amount: service.amount,
      comment: service.comment,
    };

    reset(data);
  }, []);

  return (
    <Box
      sx={{
        width: "60vw",
      }}
    >
      <ModalBox
        open={reviewModal}
        onClose={() => setReviewModal(false)}
        header="Review Serive"
      >
        <ReviewService closeModal={() => setReviewModal(false)} />
      </ModalBox>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 1.5,
        }}
        mb={2}
      >
        <GlobalCustomButton onClick={() => setReviewModal(true)}>
          Review
        </GlobalCustomButton>
        <GlobalCustomButton color="error">Reject</GlobalCustomButton>
        <GlobalCustomButton color="success">Accept</GlobalCustomButton>
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={8} md={4}>
            <Input label="Service Name" register={register("service_name")} />
          </Grid>
          <Grid item lg={4} md={4}>
            <Input label="Quantity" register={register("quantity")} />
          </Grid>
          <Grid item lg={4} md={4}>
            <Input label="Submitted Amount" register={register("amount")} />
          </Grid>
          <Grid item lg={4} md={6}>
            <Input label="Payable Qty" register={register("pay_quantity")} />
          </Grid>
          <Grid item lg={4} md={6}>
            <Input label="Payable Amount" register={register("pay_amount")} />
          </Grid>

          <Grid item lg={12} md={12}>
            <Textarea label="Comment" register={register("comment")} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UpdateService;

export const ReviewService = ({closeModal}) => {
  const {state, setState} = useContext(ObjectContext);
  const {register, reset} = useForm();

  useEffect(() => {
    const service = state.PreAuthModule.selectedService;
    const data = {
      service_name: service.service.serviceName,
      quantity: service.quantity,
      unitprice: service.unitprice,
      amount: service.amount,
      pay_amount: service.amount,
      comment: service.comment,
    };

    reset(data);
  }, []);

  return (
    <Box
      sx={{
        width: "50vw",
      }}
    >
      <Grid container spacing={1} mb={2}>
        <Grid item lg={3} md={4}>
          <Input label="Unit Price" register={register("unitprice")} />
        </Grid>
        <Grid item lg={3} md={4}>
          <Input label="Quantity" register={register("quantity")} />
        </Grid>
        <Grid item lg={6} md={4}>
          <Input label="Total Amount" register={register("amount")} />
        </Grid>
      </Grid>

      <Box sx={{display: "flex"}} gap={2}>
        <GlobalCustomButton color="success">Save</GlobalCustomButton>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const RejectService = () => {
  return (
    <Box>
      <Box></Box>
    </Box>
  );
};
