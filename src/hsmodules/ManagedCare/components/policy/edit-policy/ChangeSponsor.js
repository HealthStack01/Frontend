import {Box, Typography} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {useContext, useState} from "react";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import CustomTable from "../../../../../components/customtable";
import {FormsHeaderText} from "../../../../../components/texts";
import {
  OrgFacilitySearch,
  SponsorSearch,
} from "../../../../helpers/FacilitySearch";
import {EnrolleSchema2, EnrolleSchema} from "../models";
import {ObjectContext} from "../../../../../context";
import PeopleIcon from "@mui/icons-material/People";
import {toast} from "react-toastify";

const ChangePolicySponsor = ({closeModal}) => {
  const {state, setState} = useContext(ObjectContext);
  //const [providers, setProviders] = useState([]);
  const [success, setSuccess] = useState(false);

  const onSubSponsorSelect = item => {
    if (
      item && // check if obj is not null
      Object.keys(item).length > 0 && // check if obj is not empty
      item.constructor === Object
    ) {
      setState(prev => ({
        ...prev,
        PolicyModule: {
          ...prev.PolicyModule,
          selectedPolicy: {
            ...prev.PolicyModule.selectedPolicy,
            sponsor: item,
            sponsorshipType: "Company",
          },
        },
      }));
      closeModal();
    }

    //toast.success("Sponsor changed");
  };

  return (
    <Box
      sx={{
        width: "600px",
        Height: "400px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        mt={2}
        gap={2}
      >
        <FormsHeaderText text={"Search and Select Sponsor"} />
        <Box>
          <SponsorSearch
            getSearchfacility={onSubSponsorSelect}
            //clear={success}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePolicySponsor;
