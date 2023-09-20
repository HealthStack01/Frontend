/* eslint-disable */
import React, {useState, useContext, useRef} from "react";
import Slide from "@mui/material/Slide";

import {UserContext, ObjectContext} from "../../context";
import ModalBox from "../../components/modal";
import InvoiceCreate from "./components/invoice/InvoiceCreate";
import InvoiceDetail from "./components/invoice/InvoiceDetail";
import InvoiceList from "./components/invoice/InvoiceList";
import {Box} from "@mui/material";
import PlansList from "./components/plans/PlansList";
import {ModalCreatePlan} from "./components/plans/CreatePlan";
import SendPlanDetail from "./components/plans/SendPlanDetail";

// eslint-disable-next-line
const searchfacility = {};

const Plans = ({
  plans = [],
  addNewPlan,
  removePlan,
  updatePlan,
  omitCreate,
}) => {
  const {state, setState} = useContext(ObjectContext);
  const [detailModal, setDetailModal] = useState(false);
  const [sendDetailModal, setSendDetailModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleRow = plan => {
    //setSelectedPlan(plan);
    setState(prev => ({
      ...prev,
      InvoiceModule: {...prev.InvoiceModule, selectedPlan: plan},
    }));
    setSendDetailModal(true);
  };

  return (
    <Box>
      <PlansList
        openCreateModal={() => setCreateModal(true)}
        openDetailModal={() => setDetailModal(true)}
        removePlan={removePlan}
        omitCreate={omitCreate}
        plans={plans}
        handleRow={handleRow}
      />

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Add New Plan"
      >
        <ModalCreatePlan
          closeModal={() => setCreateModal(false)}
          addNewPlan={addNewPlan}
        />
      </ModalBox>

      <ModalBox
        open={sendDetailModal}
        onClose={() => setSendDetailModal(false)}
        header="Send Plan Link"
        width="80%"
      >
        <SendPlanDetail
          closeModal={() => setSendDetailModal(false)}
          plan={selectedPlan}
          updatePlan={updatePlan}
        />
      </ModalBox>
    </Box>
  );
};

export default Plans;
