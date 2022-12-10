import {useState} from "react";
import {Box} from "@mui/material";

import AppointmentList from "./components/appointment/AppointmentList";
import ScheduleAppointment from "./components/appointment/CreateAppointment";
import ModalBox from "../../components/modal";
import AppointmentDetail from "./components/appointment/AppointmentDetail";

const CrmAppointment = ({standAlone}) => {
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  return (
    <Box pt={2}>
      <AppointmentList
        openCreateModal={() => setCreateModal(true)}
        openDetailModal={() => setDetailModal(true)}
      />

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Schedule an Appointment"
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
