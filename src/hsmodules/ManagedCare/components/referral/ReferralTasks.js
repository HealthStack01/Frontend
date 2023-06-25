/* eslint-disable */
import React, { useState, useContext, useRef } from "react";
import Slide from "@mui/material/Slide";

import ModalBox from "../../../../components/modal";
import { Box } from "@mui/material";
import TasksList from "../tasks/ReferralTasksList";
import CRMAssignTask from "../tasks/AssignTask";
import ReferralTaskDetail from "../tasks/ReferralTaskDetail";
import { ObjectContext } from "../../../../context";

// eslint-disable-next-line

const ReferralTasks = ({ taskServer, taskState }) => {
  const [assignModal, setAssignModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const { state } = useContext(ObjectContext);
  const [tasks, setTasks] = useState([]);

  return (
    <Box>
      <TasksList
        openCreateModal={() => setAssignModal(true)}
        openDetailModal={() => setDetailModal(true)}
        taskState={taskState}
        taskServer={taskServer}
      />

      <ModalBox
        open={assignModal}
        onClose={() => setAssignModal(false)}
        header="Assign New Task"
      >
        <CRMAssignTask
          closeModal={() => setAssignModal(false)}
          taskServer={taskServer}
          taskState={taskState}
        />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Task Detail"
      >
        <ReferralTaskDetail
          closeModal={() => setDetailModal(false)}
          taskServer={taskServer}
        />
      </ModalBox>
    </Box>
  );
};

export default ReferralTasks;
