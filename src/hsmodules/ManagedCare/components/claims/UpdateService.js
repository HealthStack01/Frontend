import {useContext, useEffect, useState, useCallback} from "react";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import Input from "../../../../components/inputs/basic/Input";
import Textarea from "../../../../components/inputs/basic/Textarea";
import ModalBox from "../../../../components/modal";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";
import {toast} from "react-toastify";
import {FormsHeaderText} from "../../../../components/texts";
import CustomTable from "../../../../components/customtable";

const UpdateService = () => {
  const claimsServer = client.service("claims");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset} = useForm();
  const [reviewModal, setReviewModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [statushx, setStatushx] = useState([]);

  useEffect(() => {
    const service = state.ClaimsModule.selectedService;
    // console.log(service);
    const data = {
      service_name: service.service.serviceName,
      quantity: service.quantity,
      pay_quantity: service.pay_quantity,
      amount: service.amount,
      pay_amount: service.pay_amount,
      comments: service.comments,
      unitprice: service.unitprice,
    };

    reset(data);
    setStatushx(service.statushx || []);
  }, [state.ClaimsModule.selectedService]);

  const statushxColumns = [
    {
      name: "SN",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "50px",
    },
    {
      name: "Updated By",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => row?.employeename,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Updated At",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => dayjs(row.date).format("DD/MM/YYYY hh:mm A"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Status",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => row.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Comments",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => row.comments,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "60vw",
      }}
    >
      <ModalBox
        open={reviewModal}
        onClose={() => setReviewModal(false)}
        header="Review Service"
      >
        <ReviewService closeModal={() => setReviewModal(false)} />
      </ModalBox>
      <ModalBox
        open={rejectModal}
        onClose={() => setRejectModal(false)}
        header="Reject Service"
      >
        <RejectService closeModal={() => setRejectModal(false)} />
      </ModalBox>

      <ModalBox
        open={approveModal}
        onClose={() => setApproveModal(false)}
        header="Approve Service"
      >
        <ApproveService closeModal={() => setApproveModal(false)} />
      </ModalBox>

      {user.currentEmployee.roles.includes("Managed Care Audit Claim") && (
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
          <GlobalCustomButton
            color="error"
            onClick={() => setRejectModal(true)}
          >
            Reject
          </GlobalCustomButton>
          <GlobalCustomButton
            color="success"
            onClick={() => setApproveModal(true)}
          >
            Accept
          </GlobalCustomButton>
        </Box>
      )}

      <Box>
        <Grid container spacing={1}>
          <Grid item lg={8} md={4}>
            <Input
              label="Service Name"
              register={register("service_name")}
              disabled
            />
          </Grid>
          <Grid item lg={2} md={4}>
            <Input label="Price" register={register("unitprice")} disabled />
          </Grid>
          <Grid item lg={2} md={4}>
            <Input label="Quantity" register={register("quantity")} disabled />
          </Grid>
          <Grid item lg={4} md={4}>
            <Input
              label="Submitted Amount"
              register={register("amount")}
              disabled
            />
          </Grid>
          <Grid item lg={4} md={6}>
            <Input
              label="Payable Qty"
              register={register("pay_quantity")}
              disabled
            />
          </Grid>
          <Grid item lg={4} md={6}>
            <Input
              label="Payable Amount"
              register={register("pay_amount")}
              disabled
            />
          </Grid>

          <Grid item lg={12} md={12}>
            <Textarea
              label="Comments"
              register={register("comments")}
              disabled
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <FormsHeaderText text="Service's Status History" />
        <Box mt={1}>
          <CustomTable
            title={""}
            columns={statushxColumns}
            data={statushx}
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={handleRow}
            CustomEmptyData="No Status History for this Service yet..."
            progressPending={false}
            //conditionalRowStyles={conditionalRowStyles}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateService;

export const ReviewService = ({closeModal}) => {
  const claimsServer = client.service("claims");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset, handleSubmit, watch, setValue} = useForm();

  const updateService = async data => {
    showActionLoader();
    const claim = state.ClaimsModule.selectedClaim;
    const service = state.ClaimsModule.selectedService;
    const employee = user.currentEmployee;

    const prevServices = claim.services || [];

    const prevServicehx = service.statushx || [];

    const newService = {
      ...service,
      pay_amount: data.pay_amount,
      pay_quantity: data.pay_quantity,
      status: "Reviewed",
      statushx: [
        {
          employeename: `${employee.firstname} ${employee.lastname}`,
          employeeId: employee.userId,
          updated_at: new Date(),
          status: "Reviewed",
          comments: data.comments,
          _id: uuidv4(),
        },
        ...prevServicehx,
      ],
    };

    const updatedServices = prevServices.map(item => {
      if (item._id === newService._id) {
        return newService;
      } else {
        return item;
      }
    });

    const updatedClaim = {
      ...claim,
      services: updatedServices,
    };

    await claimsServer
      .patch(claim._id, updatedClaim)
      .then(res => {
        setState(prev => ({
          ...prev,
          ClaimsModule: {
            selectedClaim: res,
            selectedService: newService,
          },
        }));
        hideActionLoader();
        closeModal();
        toast.success("Service as been sucessfully reviewed");
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Failed to review service ${err}`);
      });
  };

  useEffect(() => {
    //hideActionLoader();
    const service = state.ClaimsModule.selectedService;
    const data = {
      service_name: service.service.serviceName,
      quantity: service.quantity,
      unitprice: service.unitprice,
      pay_amount: service.pay_amount,
      pay_quantity: service.pay_quantity,
    };

    reset(data);
  }, []);

  const unitprice = watch("unitprice");
  const quantity = watch("pay_quantity");

  const getTotalAmount = useCallback(() => {
    const totalAmount = Number(unitprice) * Number(quantity);
    setValue("pay_amount", totalAmount);
  }, [unitprice, quantity]);

  useEffect(() => {
    getTotalAmount();
  }, [getTotalAmount]);

  return (
    <Box
      sx={{
        width: "50vw",
      }}
    >
      <Grid container spacing={1} mb={2}>
        <Grid item lg={3} md={4}>
          <Input label="Unit Price" register={register("unitprice")} disabled />
        </Grid>
        <Grid item lg={3} md={4}>
          <Input
            label="Payable Qty"
            register={register("pay_quantity")}
            type="number"
          />
        </Grid>
        <Grid item lg={6} md={6}>
          <Input
            label="Payable Amount"
            register={register("pay_amount")}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea label="Reason for Review" register={register("comments")} />
        </Grid>
      </Grid>

      <Box sx={{display: "flex"}} gap={2}>
        <GlobalCustomButton
          color="success"
          onClick={handleSubmit(updateService)}
        >
          Review Service
        </GlobalCustomButton>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const RejectService = ({closeModal}) => {
  const claimsServer = client.service("claims");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset, handleSubmit, watch} = useForm();

  const updateService = async data => {
    showActionLoader();
    const claim = state.ClaimsModule.selectedClaim;
    const service = state.ClaimsModule.selectedService;
    const employee = user.currentEmployee;

    const prevServices = claim.services || [];

    const prevServicehx = service.statushx || [];

    const newService = {
      ...service,
      status: "Rejected",
      statushx: [
        {
          employeename: `${employee.firstname} ${employee.lastname}`,
          employeeId: employee.userId,
          updated_at: new Date(),
          status: "Rejected",
          comments: data.comments,
          _id: uuidv4(),
        },
        ...prevServicehx,
      ],
    };

    const updatedServices = prevServices.map(item => {
      if (item._id === newService._id) {
        return newService;
      } else {
        return item;
      }
    });

    const updatedClaim = {
      ...claim,
      services: updatedServices,
    };

    await claimsServer
      .patch(claim._id, updatedClaim)
      .then(res => {
        setState(prev => ({
          ...prev,
          ClaimsModule: {
            selectedClaim: res,
            selectedService: newService,
          },
        }));
        hideActionLoader();
        closeModal();
        toast.success("Service as been sucessfully rejected");
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Failed to reject service ${err}`);
      });
  };

  return (
    <Box
      sx={{
        width: "400px",
      }}
    >
      <Box>
        <Textarea
          label="Reason for Decline/Reject"
          register={register("comments")}
        />
      </Box>

      <Box sx={{display: "flex"}} gap={2}>
        <GlobalCustomButton
          color="success"
          onClick={handleSubmit(updateService)}
        >
          Reject Service
        </GlobalCustomButton>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const ApproveService = ({closeModal}) => {
  const claimsServer = client.service("claims");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset, handleSubmit} = useForm();

  const updateService = async data => {
    showActionLoader();
    const claim = state.ClaimsModule.selectedClaim;
    const service = state.ClaimsModule.selectedService;
    const employee = user.currentEmployee;

    const prevServices = claim.services || [];

    const prevServicehx = service.statushx || [];

    const newService = {
      ...service,
      status: "Approved",
      statushx: [
        {
          employeename: `${employee.firstname} ${employee.lastname}`,
          employeeId: employee.userId,
          updated_at: new Date(),
          status: "Approved",
          comments: data.comments,
          _id: uuidv4(),
        },
        ...prevServicehx,
      ],
    };

    const updatedServices = prevServices.map(item => {
      if (item._id === newService._id) {
        return newService;
      } else {
        return item;
      }
    });

    const updatedClaim = {
      ...claim,
      services: updatedServices,
    };

    await claimsServer
      .patch(claim._id, updatedClaim)
      .then(res => {
        setState(prev => ({
          ...prev,
          ClaimsModule: {
            selectedClaim: res,
            selectedService: newService,
          },
        }));
        hideActionLoader();
        closeModal();
        toast.success("Service as been sucessfully approved");
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Failed to approve service ${err}`);
      });
  };
  return (
    <Box
      sx={{
        width: "400px",
      }}
    >
      <Box>
        <Textarea label="Reason for Approval" register={register("comments")} />
      </Box>

      <Box sx={{display: "flex"}} gap={2}>
        <GlobalCustomButton
          color="success"
          onClick={handleSubmit(updateService)}
        >
          Approve Service
        </GlobalCustomButton>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
