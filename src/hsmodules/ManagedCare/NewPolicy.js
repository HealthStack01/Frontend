import {Box} from "@mui/material";
import {useState} from "react";

import PoliciesList from "./components/policy/Lists";
import CreateNewPolicy from "./components/policy/create-policy/CreatePolicy";
import PolicyDetail from "./components/policy/Details";

const NewPolicyModule = ({beneficiary}) => {
  const [view, setView] = useState("lists");

  const createNewPolicy = () => {
    setView("create");
  };

  const showDetails = () => {
    setView("details");
  };

  const handleReturn = () => {
    setView("lists");
  };
  return (
    <Box>
      {view === "lists" && (
        <PoliciesList
          createNewPolicy={createNewPolicy}
          showDetails={showDetails}
          beneficiary={beneficiary}
        />
      )}

      {view === "create" && <CreateNewPolicy goBack={handleReturn} />}

      {view === "details" && (
        <PolicyDetail goBack={handleReturn} beneficiary={beneficiary} />
      )}
    </Box>
  );
};

export default NewPolicyModule;
