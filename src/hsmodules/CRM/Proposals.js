import {useState} from "react";
import {Box} from "@mui/material";

import ModalBox from "../../components/modal";
import ProposalCreate from "./components/proposal/ProposalCreate";
import ProposalList from "./components/proposal/ProposalList";
import ProposalDetail from "./components/proposal/ProposalDetail";

const CrmProposals = ({isTab}) => {
  const [createModal, setCreateModal] = useState(false);
  const [currentView, setCurrentView] = useState("lists");

  const handleGoBack = () => {
    setCurrentView("lists");
  };

  return (
    <Box>
      {currentView === "lists" && (
        <ProposalList
          showCreate={() => setCurrentView("create")}
          showDetail={() => setCurrentView("detail")}
          isTab={isTab}
        />
      )}

      {currentView === "detail" && (
        <ProposalDetail handleGoBack={handleGoBack} />
      )}

      {currentView === "create" && (
        <ProposalCreate handleGoBack={handleGoBack} />
      )}
    </Box>
  );
};

export default CrmProposals;
