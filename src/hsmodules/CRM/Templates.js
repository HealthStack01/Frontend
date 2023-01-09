/* eslint-disable */
import React, {useState, useContext, useRef} from "react";
import Slide from "@mui/material/Slide";

import ModalBox from "../../components/modal";
import {Box} from "@mui/material";
import TasksList from "./components/tasks/TasksList";
import CRMAssignTask from "./components/tasks/AssignTask";
import CRMTaskDetail from "./components/tasks/TaskDetail";
import {ObjectContext} from "../../context";
import CRMTemplatesList from "./components/templates/TemplatesList";
import TemplateCreate from "./components/templates/TemplateCreate";

// eslint-disable-next-line

const CRMTemplates = () => {
  const [assignModal, setAssignModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const {state} = useContext(ObjectContext);

  const [createModal, setCreateModal] = useState(false);

  return (
    <Box>
      <CRMTemplatesList openCreateModal={() => setCreateModal(true)} />

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Upload New Template"
      >
        <TemplateCreate closeModal={() => setCreateModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default CRMTemplates;
