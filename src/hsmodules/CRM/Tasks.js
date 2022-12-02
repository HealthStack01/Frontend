/* eslint-disable */
import React, {useState, useContext, useRef} from "react";
import Slide from "@mui/material/Slide";

import ModalBox from "../../components/modal";
import {Box} from "@mui/material";
import TasksList from "./components/tasks/TasksList";
import CRMAssignTask from "./components/tasks/AssignTask";
import CRMTaskDetail from "./components/tasks/TaskDetail";

// eslint-disable-next-line

const CRMTasks = () => {
  const [assignModal, setAssignModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  return (
    <Box>
      <TasksList
        openCreateModal={() => setAssignModal(true)}
        openDetailModal={() => setDetailModal(true)}
      />

      <ModalBox
        open={assignModal}
        onClose={() => setAssignModal(false)}
        header="Assign New Task"
      >
        <CRMAssignTask closeModal={() => setAssignModal(false)} />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Task Detail"
      >
        <CRMTaskDetail closeModal={() => setDetailModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default CRMTasks;
