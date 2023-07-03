import {useContext, useState} from "react";
import {Box} from "@mui/material";

import TarrifsList from "./components/tarrif/TarrifList";
import TarrifDetails from "./components/tarrif/TarrifDetails";
import CreateBand from "./components/tarrif/CreateBand";
import CreateTariff from "./components/tarrif/CreateTarrif";
import ModalBox from "../../components/modal";
import BeneficiariesList from "./components/beneficiary/Beneficiary-List";
import DefaultClientDetail from "../../components/client-detail/Client-Detail";
import client from "../../feathers";
import {ObjectContext} from "../../context";
import {toast} from "react-toastify";

const NewBeneficiaryModule = ({corporate}) => {
  const [createBandModal, setCreateBandModal] = useState(false);
  const policyServer = client.service("policy");
  const [patient, setPatient] = useState(null);
  const [view, setView] = useState("lists");
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);

  const showBeneficairyDetails = data => {
    setPatient(data);
    setView("details");
  };

  const handleUpdateClient = update => {
    delete update.plan;
    delete update.policy;
    delete update.clientType;
    delete update.sponsor;
    delete update.sponsortype;
    delete update.approved;

    showActionLoader();

    const prevPolicy = patient?.policy;

    const isPrincipal = patient.clientType.toLowerCase() === "principal";
    const dependents = prevPolicy.dependantBeneficiaries;

    const updatedPolicy = isPrincipal
      ? {...prevPolicy, principal: update}
      : {
          ...prevPolicy,
          dependantBeneficiaries: dependents.map(item => {
            if (item._id === update._id) {
              return update;
            } else {
              return item;
            }
          }),
        };

    // return console.log(updatedPolicy);

    policyServer
      .patch(prevPolicy._id, updatedPolicy)
      .then(res => {
        console.log(res);
        hideActionLoader();
        toast.success("Beneficiary Updated Successfully.");
      })
      .catch(error => {
        hideActionLoader();
        toast.error(`Failed to update Beneficiary ${err}`);
      });
  };

  return (
    <Box>
      {view === "lists" && (
        <Box>
          <BeneficiariesList
            showDetail={showBeneficairyDetails}
            corporate={corporate}
          />
        </Box>
      )}

      {view === "details" && (
        <Box>
          <DefaultClientDetail
            goBack={() => setView("lists")}
            detail={patient}
            updateClient={handleUpdateClient}
            showHeader
          />
        </Box>
      )}
    </Box>
  );
};

export default NewBeneficiaryModule;
