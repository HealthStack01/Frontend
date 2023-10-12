import {Box, Typography} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {useContext, useState} from "react";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import CustomTable from "../../../../../components/customtable";
import {FormsHeaderText} from "../../../../../components/texts";
import {OrgHMOFacilitySearch} from "../../../../helpers/FacilitySearch";
import {EnrolleSchema2, EnrolleSchema} from "../models";
import {ObjectContext} from "../../../../../context";
import PeopleIcon from "@mui/icons-material/People";
import {toast} from "react-toastify";

const PolicyAddProvider = ({closeModal}) => {
  const {state, setState} = useContext(ObjectContext);
  //const [providers, setProviders] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleAddProvider = async obj => {
    const providers = state.PolicyModule.selectedPolicy.providers;
    // //console.log(obj);
    if (
      // check if obj is an object
      obj && // check if obj is not null
      Object.keys(obj).length > 0 && // check if obj is not empty
      obj.constructor === Object &&
      // check if the obj is already present in the array
      !providers.some(el => el._id === obj._id)
    ) {
      setState(prev => ({
        ...prev,
        PolicyModule: {
          ...prev.PolicyModule,
          selectedPolicy: {
            ...prev.PolicyModule.selectedPolicy,
            providers: [obj, ...prev.PolicyModule.selectedPolicy.providers],
          },
        },
      }));
      closeModal();
      setSuccess(true);
      setSuccess(false);
      //await //console.log("OBJ", chosen);
    } else {
      toast.error("Provider already exists on list of Providers");
    }
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
        <FormsHeaderText text={"Search and Select Provider"} />
        <Box>
          <OrgHMOFacilitySearch
            getSearchfacility={handleAddProvider}
            clear={success}
          />
        </Box>
        {/* 
        <Box>
          <CustomTable
            title={""}
            columns={providerColumns}
            data={providers?.filter(item => item !== null)}
            pointerOnHover
            highlightOnHover
            striped
            CustomEmptyData={
              <Typography sx={{fontSize: "0.85rem"}}>
                No provider added yet...
              </Typography>
            }
            progressPending={false}
          />
        </Box> */}
      </Box>
      {/* 
      <Box sx={{display: "flex"}} gap={1.5} mt={2}>
        <GlobalCustomButton>Add Provider(s)</GlobalCustomButton>
      </Box> */}
    </Box>
  );
};

export default PolicyAddProvider;
