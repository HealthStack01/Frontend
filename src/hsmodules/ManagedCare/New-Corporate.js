import {useState} from "react";
import {Box} from "@mui/material";

import TarrifsList from "./components/tarrif/TarrifList";
import TarrifDetails from "./components/tarrif/TarrifDetails";
import CreateBand from "./components/tarrif/CreateBand";
import CreateTariff from "./components/tarrif/CreateTarrif";
import ModalBox from "../../components/modal";
import CorporateListComponent from "./components/Corporate/CorporateList";
import CreateCorporateComponent from "./components/Corporate/CorporateCreate";
import CorporateDetailsComponent from "./components/Corporate/CorporateDetail";

const NewCoporateModule = () => {
  const [addModal, setAddModal] = useState(false);
  const [view, setView] = useState("lists");

  return (
    <Box>
      <ModalBox
        open={addModal}
        onClose={() => setAddModal(false)}
        header="Add New Corporate Organization"
      >
        <CreateCorporateComponent closeModal={() => setAddModal(false)} />
      </ModalBox>

      {view === "lists" && (
        <CorporateListComponent
          showDetails={() => setView("details")}
          showCreate={() => setAddModal(true)}
        />
      )}

      {view === "details" && (
        <Box>
          <CorporateDetailsComponent goBack={() => setView("lists")} />
        </Box>
      )}
    </Box>
  );
};

export default NewCoporateModule;
