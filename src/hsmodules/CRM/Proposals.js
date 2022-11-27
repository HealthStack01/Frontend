import {useState} from "react";
import {Box} from "@mui/material";

import ModalBox from "../../components/modal";
import ProposalCreate from "./components/proposal/ProposalCreate";
import ProposalList from "./components/proposal/ProposalList";

const CrmProposals = ({standAlone}) => {
  const [createModal, setCreateModal] = useState(false);
  return (
    <Box p={standAlone ? 0 : 2}>
      <ProposalList openCreateModal={() => setCreateModal(true)} />

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="New Proposal"
      >
        <ProposalCreate closeModal={() => setCreateModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default CrmProposals;
