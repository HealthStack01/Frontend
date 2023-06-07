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

const ContactDetail = ({closeModal}) => {
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
      ...state.ContactModule.selectedContact,
      status: state.ContactModule.selectedContact.active
        ? "Active"
        : "Inactive",
    });
  }, []);

  const updateContact = async data => {
    showActionLoader();
    const contactId = state.ContactModule.selectedContact._id;

    const contacts = state.DealModule.selectedDeal.contacts;

    const newContacts = contacts.map(item => {
      if (item._id === contactId) {
        return {...item, ...data};
      } else {
        return item;
      }
    });

    const documentId = state.DealModule.selectedDeal._id;

    await dealServer
      .patch(documentId, {contacts: newContacts})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        closeModal();
        //setReset(true);
        toast.success(`You have successfully updated this Contact!`);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to update the Contact!. ${err}`);
      });
  };

  const deactivateContact = async () => {
    showActionLoader();
    const contactId = state.ContactModule.selectedContact._id;

    const contacts = state.DealModule.selectedDeal.contacts;

    const newContacts = contacts.map(item => {
      if (item._id === contactId) {
        return {...item, active: false};
      } else {
        return item;
      }
    });

    const documentId = state.DealModule.selectedDeal._id;

    await dealServer
      .patch(documentId, {contacts: newContacts})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        closeModal();
        //setReset(true);
        closeConfirmDialog();
        toast.success(`You have successfully Deactivate this Contact!`);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to Deactivate the Contact!. ${err}`
        );
      });
  };

  const reactivateContact = async () => {
    showActionLoader();
    const contactId = state.ContactModule.selectedContact._id;

    const contacts = state.DealModule.selectedDeal.contacts;

    const newContacts = contacts.map(item => {
      if (item._id === contactId) {
        return {...item, active: true};
      } else {
        return item;
      }
    });

    const documentId = state.DealModule.selectedDeal._id;

    await dealServer
      .patch(documentId, {contacts: newContacts})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        closeModal();
        closeConfirmDialog();
        //setReset(true);
        toast.success(`You have successfully Reactivated this Contact!`);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to Reactivated the Contact!. ${err}`
        );
      });
  };

  const confirmDeactivation = () => {
    const contact = state.ContactModule.selectedContact;

    setConfirmDialog({
      open: true,
      message: `You are about to Deactive Contact; ${contact.name}`,
      type: "warning",
      action: deactivateContact,
    });
  };

  const confirmReactivation = () => {
    const contact = state.ContactModule.selectedContact;

    setConfirmDialog({
      open: true,
      message: `You are about to Reactive Contact; ${contact.name}`,
      type: "update",
      action: reactivateContact,
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
      {state.ContactModule.selectedContact.active ? (
        <Box
          mb={2}
          gap={1}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {!edit ? (
            <GlobalCustomButton onClick={() => setEdit(true)}>
              Edit Contact
            </GlobalCustomButton>
          ) : (
            <>
              <GlobalCustomButton
                color="success"
                onClick={handleSubmit(updateContact)}
              >
                Update Contact
              </GlobalCustomButton>

              <GlobalCustomButton color="error" onClick={confirmDeactivation}>
                Deactivate Contact
              </GlobalCustomButton>

              <GlobalCustomButton
                color="warning"
                onClick={() => setEdit(false)}
              >
                Cancel
              </GlobalCustomButton>
            </>
          )}
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
            Reactivate Contact
          </GlobalCustomButton>
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            register={register("name", {required: true})}
            label="Contact Name"
            type="text"
            disabled={!edit}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("email", {required: true})}
            label="Contact Email"
            type="email"
            disabled={!edit}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("phoneno", {required: true})}
            label="Contact Phone No"
            type="tel"
            disabled={!edit}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("position", {required: true})}
            label="Contact Position"
            type="text"
            disabled={!edit}
            //placeholder="Enter customer number"
          />
        </Grid>

        {!edit && (
          <Grid item xs={12}>
            <Input
              register={register("status")}
              label="Contact Status"
              type="text"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ContactDetail;
