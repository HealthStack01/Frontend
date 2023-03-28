import {useState, useContext, useEffect} from "react";
import {Box, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {ObjectContext} from "../../../../context";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../../../components/texts";
import Services from "./Services";
import TariffProviders from "./Providers";
import ModalBox from "../../../../components/modal";
import InheritTariff from "./InheritTariff";

const TarrifDetailsComponent = ({goBack}) => {
  const {state, setState} = useContext(ObjectContext);
  const [view, setView] = useState("services");
  const [selectedTarrif, setSelectedTarrif] = useState({});
  const [inheritModal, setInheritModal] = useState(false);

  useEffect(() => {
    setSelectedTarrif(state.TarrifModule.selectedTarrif);
  }, [state.TarrifModule.selectedTarrif]);

  const handleGoBack = () => {
    setState(prev => ({
      ...prev,
      TarrifModule: {
        ...prev.TarrifModule,
        selectedTarrif: {},
        selectedBand: {},
        selectedService: {},
        selectedProvider: {},
        selectedServicePlan: {},
      },
    }));
    goBack();
  };

  const changeView = view => {
    setView(view);
  };

  return (
    <Box>
      <ModalBox
        open={inheritModal}
        onClose={() => setInheritModal(false)}
        header={`Inherit Tariff`}
      >
        <InheritTariff closeModal={() => setInheritModal(false)} />
      </ModalBox>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
          position: "sticky",
          zIndex: 99,
          top: 0,
          left: 0,
        }}
        mb={2}
        p={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              Tarrif's Detail
            </Typography>
            <FormsHeaderText text={`- ${selectedTarrif?.band}`} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton
            color="success"
            onClick={() => setInheritModal(true)}
          >
            Inherit Tarrif
          </GlobalCustomButton>

          <GlobalCustomButton
            onClick={() => changeView("services")}
            sx={
              view === "services"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Tarrif's Services
          </GlobalCustomButton>

          <GlobalCustomButton
            onClick={() => changeView("providers")}
            sx={
              view === "providers"
                ? {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                    },
                  }
                : {}
            }
          >
            Tarrif's Providers
          </GlobalCustomButton>
        </Box>
      </Box>

      <Box p={2}>
        {view === "services" && (
          <Box>
            <Services />
          </Box>
        )}

        {view === "providers" && (
          <Box>
            <TariffProviders />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TarrifDetailsComponent;
