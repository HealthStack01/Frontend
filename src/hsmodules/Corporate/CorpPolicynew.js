import {Box} from "@mui/material";
import {useState, useContext} from "react";

import PoliciesList from "./components/policy/Lists";
import CreateNewPolicy from "./components/policy/create-policy/CreatePolicy";
import PolicyDetail from "./components/policy/Details";
import {ObjectContext, UserContext} from "../../context";

const NewPolicyModule = () => {
  const [view, setView] = useState("lists");
  const {user} = useContext(UserContext);

  const createNewPolicy = () => {
    setView("create");
  };

  const showDetails = () => {
    setView("details")
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
          //beneficiary={beneficiary}
         corporate={user.currentEmployee.facilityDetail._id}
        />
      )}

      {view === "create" && <CreateNewPolicy goBack={handleReturn} />}

      {view === "details" && (
        <PolicyDetail
          goBack={handleReturn}
          //beneficiary={beneficiary}
          corporate={user.currentEmployee.facilityDetail._id} 
        />
      )}
    </Box>
  );
};

export default NewPolicyModule;
