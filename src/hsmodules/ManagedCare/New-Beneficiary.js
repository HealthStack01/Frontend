import {useState} from "react";
import {Box} from "@mui/material";

import TarrifsList from "./components/tarrif/TarrifList";
import TarrifDetails from "./components/tarrif/TarrifDetails";
import CreateBand from "./components/tarrif/CreateBand";
import CreateTariff from "./components/tarrif/CreateTarrif";
import ModalBox from "../../components/modal";
import BeneficiariesList from "./components/beneficiary/Beneficiary-List";
import DefaultClientDetail from "../../components/client-detail/Client-Detail";

const NewBeneficiary = () => {
  const [createBandModal, setCreateBandModal] = useState(false);
  const [client, setClient] = useState(null);
  const [view, setView] = useState("lists");

  const showBeneficairyDetails = client => {
    setClient(client);
    setView("details");
  };

  return (
    <Box>
      {view === "lists" && (
        <Box>
          <BeneficiariesList showDetail={showBeneficairyDetails} />
        </Box>
      )}

      {view === "details" && (
        <Box>
          <DefaultClientDetail
            goBack={() => setView("lists")}
            detail={client}
            showHeader
          />
        </Box>
      )}
    </Box>
  );
};

export default NewBeneficiary;
