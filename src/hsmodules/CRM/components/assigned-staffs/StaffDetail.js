import {useContext, useEffect, useState} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {ObjectContext} from "../../../../context";
import client from "../../../../feathers";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";

const StaffDetail = ({closeModal}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {register, handleSubmit, reset} = useForm();
  const [edit, setEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    message: "",
    type: "",
  });

  useEffect(() => {
    reset({
      ...state.StaffModule.selectedStaff,
      status: state.StaffModule.selectedStaff.active ? "Active" : "Inactive",
    });
  }, []);

  const deactivateStaff = async () => {
    showActionLoader();
    const staffId = state.StaffModule.selectedStaff._id;

    const staffs = state.DealModule.selectedDeal.assignStaff;

    const newStaffs = staffs.map(item => {
      if (item._id === staffId) {
        return {...item, active: false};
      } else {
        return item;
      }
    });

    const documentId = state.DealModule.selectedDeal._id;

    await dealServer
      .patch(documentId, {assignStaff: newStaffs})
      .then(res => {
        hideActionLoader();
        //setstaffs(res.staffs);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        closeModal();
        //setReset(true);
        closeConfirmDialog();
        toast.success(`You have successfully Deactivate this Staff!`);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to Deactivate the Staff!. ${err}`);
      });
  };

  const reactivateStaff = async () => {
    showActionLoader();
    const staffId = state.StaffModule.selectedStaff._id;

    const staffs = state.DealModule.selectedDeal.assignStaff;

    const newStaffs = staffs.map(item => {
      if (item._id === staffId) {
        return {...item, active: true};
      } else {
        return item;
      }
    });

    const documentId = state.DealModule.selectedDeal._id;

    await dealServer
      .patch(documentId, {assignStaff: newStaffs})
      .then(res => {
        hideActionLoader();
        //setstaffs(res.staffs);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        closeModal();
        closeConfirmDialog();
        //setReset(true);
        toast.success(`You have successfully Reactivated this Staff!`);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to Reactivated the Staff!. ${err}`
        );
      });
  };

  const confirmDeactivation = () => {
    const Staff = state.StaffModule.selectedStaff;

    setConfirmDialog({
      open: true,
      message: `You are about to Deactive Staff; ${Staff.name}`,
      type: "warning",
      action: deactivateStaff,
    });
  };

  const confirmReactivation = () => {
    const Staff = state.StaffModule.selectedStaff;

    setConfirmDialog({
      open: true,
      message: `You are about to Reactive Staff; ${Staff.name}`,
      type: "update",
      action: reactivateStaff,
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      action: null,
      message: "",
      type: "",
    });
  };

  return (
    <Box
      sx={{
        width: "500px",
        maxHeight: "80vh",
      }}
    >
      <CustomConfirmationDialog
        open={confirmDialog.open}
        message={confirmDialog.message}
        confirmationAction={confirmDialog.action}
        cancelAction={closeConfirmDialog}
        type={confirmDialog.type}
      />
      {state.StaffModule.selectedStaff.active ? (
        <Box
          mb={2}
          gap={1}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <GlobalCustomButton color="error" onClick={confirmDeactivation}>
            Deactivate Staff
          </GlobalCustomButton>
        </Box>
      ) : (
        <Box
          mb={2}
          gap={1}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <GlobalCustomButton color="success" onClick={confirmReactivation}>
            Reactivate Staff
          </GlobalCustomButton>
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            register={register("name", {required: true})}
            label="Staff Name"
            type="text"
            disabled={!edit}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("email", {required: true})}
            label="Staff Email"
            type="email"
            disabled={!edit}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("phoneno", {required: true})}
            label="Staff Phone No"
            type="tel"
            disabled={!edit}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("position", {required: true})}
            label="Staff Position"
            type="text"
            disabled={true}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("status")}
            label="Staff Status"
            type="text"
            disabled={!edit}
            //placeholder="Enter customer number"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffDetail;
