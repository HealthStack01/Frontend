import {Box, Typography} from "@mui/material";
import {useContext, useState} from "react";
import {ObjectContext} from "../../../../../context";
import {FormsHeaderText} from "../../../../../components/texts";
import CustomTable from "../../../../../components/customtable";
import {OrgFacilitySearch} from "../../../../helpers/FacilitySearch";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";

import {EnrolleSchema2, EnrolleSchema} from "../models";

export const IndividualPoliciesList = ({providerColumns}) => {
  const {state, setState} = useContext(ObjectContext);

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormsHeaderText text="List of Individual Policies" />
      </Box>

      {state.Beneficiary.individualPolicies.map(policy => {
        return (
          <Box>
            <Box>
              <FormsHeaderText text={"Principal"} />
              <CustomTable
                title={""}
                columns={EnrolleSchema}
                data={[policy.principal]}
                pointerOnHover
                highlightOnHover
                striped
                // onRowClicked={() =>
                //   handleRow(state.Beneficiary?.principal)
                // }
                progressPending={false}
              />
            </Box>

            {policy.providers.length > 0 && (
              <Box>
                <FormsHeaderText text={"Provider(s)"} />
                <CustomTable
                  title={""}
                  columns={providerColumns}
                  data={policy.providers?.filter(item => item !== null)}
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
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export const AddIndividualPolicy = ({
  addIndividual,
  createPolicy,
  providerColumns,
  providers,
  setProviders,
}) => {
  const {state, setState} = useContext(ObjectContext);

  const [success, setSuccess] = useState(false);

  const handleAddProviders = async obj => {
    // //console.log(obj);
    if (
      // check if obj is an object
      obj && // check if obj is not null
      Object.keys(obj).length > 0 && // check if obj is not empty
      obj.constructor === Object &&
      // check if the obj is already present in the array
      !providers.some(el => el._id === obj._id)
    ) {
      await setProviders([...providers, obj]);
      setSuccess(true);
      setSuccess(false);
      //await //console.log("OBJ", chosen);
    }
  };

  return (
    <Box
      sx={{
        width: "90vw",
        maxHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <GlobalCustomButton onClick={addIndividual}>
          New Individual
        </GlobalCustomButton>
      </Box>

      <Box>
        <FormsHeaderText text="List of Individuals" />

        <Box
          sx={{
            minHeight: "10vh",
          }}
        >
          <CustomTable
            title={""}
            columns={EnrolleSchema2}
            data={
              JSON.stringify(state.Beneficiary.principal) !== "{}"
                ? [state?.Beneficiary?.principal]
                : []
            }
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={() => handleRow()}
            CustomEmptyData={
              <Typography sx={{fontSize: "0.8rem"}}>
                You've not added an Individual yet...
              </Typography>
            }
            progressPending={false}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        mt={2}
        gap={2}
      >
        <FormsHeaderText text={"Search and Select Provider(s)"} />
        <Box>
          <OrgFacilitySearch
            getSearchfacility={handleAddProviders}
            clear={success}
          />
        </Box>

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
        </Box>
      </Box>

      <Box mt={2}>
        <GlobalCustomButton
          onClick={createPolicy}
          //disabled={state.Beneficiary.principal._id}
        >
          Add to Individual List
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
