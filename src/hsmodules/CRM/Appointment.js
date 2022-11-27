import {useState} from "react";
import {Box} from "@mui/material";

import AppointmentList from "./components/appointment/AppointmentList";
import ScheduleAppointment from "./components/appointment/CreateAppointment";
import ModalBox from "../../components/modal";

const CrmAppointment = ({standAlone}) => {
  const [createModal, setCreateModal] = useState(false);
  return (
    <Box p={standAlone ? 0 : 2}>
      <AppointmentList openCreateModal={() => setCreateModal(true)} />

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Schedule an Appointment"
      >
        <ScheduleAppointment closeModal={() => setCreateModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default CrmAppointment;
