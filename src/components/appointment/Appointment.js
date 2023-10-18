import { useState } from "react";
import { Box } from "@mui/material";

import AppointmentList from "./components/AppointmentList";
import AppointmentCreate from "./components/AppointmentCreate";
import AppointmentCreateForTheatre from "./components/AppointmentCreateForTheatre";

import AppointmentDetail from "./components/AppointmentDetail";
import ModalBox from "../modal";

const AppointmentComponent = ({ module }) => {
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  return (
    <Box>
      <AppointmentList
        showCreate={() => setCreateModal(true)}
        showDetail={() => setDetailModal(true)}
        module={module}
      />

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header={`Create an Appointment`}
      >
        {module === "Theatre" ? (
          <AppointmentCreateForTheatre
            closeModal={() => setCreateModal(false)}
          />
        ) : (
          <AppointmentCreate closeModal={() => setCreateModal(false)} />
        )}
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header={`Appointment Detail`}
      >
        <AppointmentDetail
          closeModal={() => setDetailModal(false)}
          module={module}
        />
      </ModalBox>
    </Box>
  );
};

export default AppointmentComponent;
