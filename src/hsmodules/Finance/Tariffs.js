import {Box} from "@mui/material";
import TarrifListComponent from "../ManagedCare/components/tarrif/TarrifList";
import TariffComponent from "../ManagedCare/New-Tarrif";
import {useContext} from "react";
import {ObjectContext, UserContext} from "../../context";

const EMRTariffsComponent = () => {
  const {state} = useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const employee = user.currentEmployee;
  const facility = employee.facilityDetail;

  return (
    <Box>
      <TariffComponent provider={facility} />
    </Box>
  );
};

export default EMRTariffsComponent;
