/* eslint-disable */
import React, {useState, useContext, useRef} from "react";
import Slide from "@mui/material/Slide";

import {UserContext, ObjectContext} from "../../context";
import ModalBox from "../../components/modal";
import InvoiceCreate from "./components/invoice/InvoiceCreate";
import InvoiceDetail from "./components/invoice/InvoiceDetail";
import InvoiceList from "./components/invoice/InvoiceList";
import {Box} from "@mui/material";

// eslint-disable-next-line
const searchfacility = {};

const Invoice = () => {
  const {state} = useContext(ObjectContext); //,setState

  const [createModal, setCreateModal] = useState(false);
  const [currentView, setCurrentView] = useState("lists");

  const handleGoBack = () => {
    setCurrentView("lists");
  };

  const handleChangeView = view => {
    setCurrentView(view);
  };

  return (
    <Box>
      {currentView === "lists" && (
        <InvoiceList
          openCreateModal={() => setCreateModal(true)}
          showDetailView={() => setCurrentView("details")}
          showCreateView={() => setCurrentView("create")}
        />
      )}

      {currentView === "details" && (
        <InvoiceDetail handleGoBack={handleGoBack} />
      )}

      {currentView === "create" && (
        <InvoiceCreate handleGoBack={handleGoBack} />
      )}

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Create New Invoice"
      >
        <InvoiceCreate closeModal={() => setCreateModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default Invoice;
