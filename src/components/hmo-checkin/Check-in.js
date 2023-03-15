import {useState} from "react";
import {Box} from "@mui/material";

import CheckInsList from "./components/CheckInsList";
// import AppointmentCreate from "./components/AppointmentCreate";
import CheckInAppointmentDetail from "./components/CheckInDetail";
import ModalBox from "../modal";

const ManagedCareCheckIn = ({module}) => {
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  return (
    <Box>
      <CheckInsList
        showCreate={() => setCreateModal(true)}
        showDetail={() => setDetailModal(true)}
        module={module}
      />

      {/* <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header={`Create an Appointment`}
      >
        <AppointmentCreate closeModal={() => setCreateModal(false)} />
      </ModalBox> */}

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header={`Appointment Detail`}
      >
        <CheckInAppointmentDetail closeModal={() => setDetailModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default ManagedCareCheckIn;
