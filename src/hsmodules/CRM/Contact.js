import {useState, useContext, useEffect} from "react";
import {Box} from "@mui/material";

import ContactsList from "./components/contact/ContactList";
import ModalBox from "../../components/modal";
import ContactCreate from "./components/contact/ContactCreate";
//import {contactsData} from "./components/lead/data";
import ContactDetail from "./components/contact/ContactDetail";
import {ObjectContext} from "../../context";
import client from "../../feathers";
import {toast} from "react-toastify";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";

const Contact = () => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [reset, setReset] = useState(false);
  const [contacts, setContacts] = useState([
    ...state.DealModule.selectedDeal.contacts,
  ]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: "",
    message: "",
    type: "",
  });

  //SET UP CONTACT FROM DEAL INTO THE CONTACTS ARRAY.........
  // useEffect(() => {
  //   const contactsData = state.DealModule.selectedDeal.contacts;

  //   setContacts([...contactsData]);
  // }, [state.DealModule]);

  const handleCreateContact = async contact => {
    //setReset(false);
    showActionLoader();
    const prevContacts = state.DealModule.selectedDeal.contacts;

    const newContacts = [contact, ...prevContacts];

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

        toast.success(`You have successfully added a new Contact!`);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to add a new Contact!. ${err}`);
      });
  };

  const handleDeleteContact = async contact => {
    const newContacts = contacts.filter(item => item._id !== contact._id);

    const documentId = state.DealModule.selectedDeal._id;

    await dealServer
      .patch(documentId, {contacts: newContacts})
      .then(res => {
        hideActionLoader();
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));

        toast.success(`You have successfully Deleted the Contact!`);
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Sorry, You weren't able to delete the Contact!. ${err}`);
      });
  };

  const handleConfirmDeleteContact = contact => {
    setConfirmDialog(prev => ({
      open: true,
      type: "danger",
      action: () => handleDeleteContact(contact),
      message: `You're about to delete this contact ${contact.name}`,
    }));
  };

  const closeConfirmationDialog = () => {
    setConfirmDialog({open: false, action: "", message: "", type: ""});
  };

  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        cancelAction={closeConfirmationDialog}
        type={confirmDialog.type}
        message={confirmDialog.message}
        confirmationAction={confirmDialog.action}
      />
      <Box>
        <ContactsList
          openCreateModal={() => setCreateModal(true)}
          openDetailModal={() => setDetailModal(true)}
          deleteContact={handleConfirmDeleteContact}
          contacts={contacts}
        />
      </Box>

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Add New Contact"
      >
        <ContactCreate
          closeModal={() => setCreateModal(false)}
          createContact={handleCreateContact}
          server={true}
          resetForm={reset}
        />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Contact Detail"
      >
        <ContactDetail closeModal={() => setCreateModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default Contact;
