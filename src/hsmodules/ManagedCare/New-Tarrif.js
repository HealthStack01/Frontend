import {useState} from "react";
import {Box} from "@mui/material";

import TarrifsList from "./components/tarrif/TarrifList";
import TarrifDetails from "./components/tarrif/TarrifDetails";
import CreateBand from "./components/tarrif/CreateBand";
import CreateTariff from "./components/tarrif/CreateTarrif";
import ModalBox from "../../components/modal";

const Tarrif = ({provider}) => {
  const [createBandModal, setCreateBandModal] = useState(false);
  const [view, setView] = useState("lists");

  return (
    <Box>
      {view === "lists" && (
        <Box>
          <TarrifsList
            showDetail={() => setView("details")}
            createBand={() => setCreateBandModal(true)}
            createTarrif={() => setView("create")}
            provider={provider}
          />
        </Box>
      )}

      {view === "details" && (
        <Box>
          <TarrifDetails goBack={() => setView("lists")} provider={provider} />
        </Box>
      )}

      {view === "create" && (
        <Box>
          <CreateTariff goBack={() => setView("lists")} />
        </Box>
      )}

      <ModalBox
        open={createBandModal}
        onClose={() => setCreateBandModal(false)}
        header="Create a new Band"
      >
        <CreateBand closeModal={() => setCreateBandModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default Tarrif;
