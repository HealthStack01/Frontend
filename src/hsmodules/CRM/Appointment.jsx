import {useState, useContext} from "react";
import {Box} from "@mui/material";

import AppointmentList from "./components/appointment/AppointmentList";
import ScheduleAppointment from "./components/appointment/CreateAppointment";
import ModalBox from "../../components/modal";
import AppointmentDetail from "./components/appointment/AppointmentDetail";
import {ObjectContext} from "../../context";

const CrmAppointment = ({standAlone, isTab}) => {
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const {state} = useContext(ObjectContext);

  const deal = state.DealModule.selectedDeal;
  return (
    <Box pt={2}>
      <AppointmentList
        openCreateModal={() => setCreateModal(true)}
        openDetailModal={() => setDetailModal(true)}
        isTab={isTab}
      />

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header={`Schedule Appointment for ${deal?.name}`}
      >
        <ScheduleAppointment closeModal={() => setCreateModal(false)} />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Appointment Details"
      >
        <AppointmentDetail closeModal={() => setDetailModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default CrmAppointment;
