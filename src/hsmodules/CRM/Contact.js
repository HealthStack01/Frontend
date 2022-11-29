import {useState} from "react";
import {Box} from "@mui/material";

import ContactsList from "./components/contact/ContactList";
import ModalBox from "../../components/modal";
import ContactCreate from "./components/contact/ContactCreate";
import {contactsData} from "./components/lead/data";

const Contact = () => {
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [contacts, setContacts] = useState([...contactsData]);

  const handleCreateContact = contact => {
    setContacts(prev => [contact, ...prev]);
  };

  const handleDeleteContact = contact => {
    setContacts(prev =>
      prev.filter(item => item.contact_email !== contact.contact_email)
    );
  };

  return (
    <Box>
      <Box>
        <ContactsList
          openCreateModal={() => setCreateModal(true)}
          openDetailModal={() => setDetailModal(true)}
          deleteContact={handleDeleteContact}
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
        />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Contact Detail"
      >
        <ContactCreate closeModal={() => setCreateModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default Contact;
