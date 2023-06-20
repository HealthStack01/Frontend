import {Box, Typography} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {useContext, useState} from "react";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import CustomTable from "../../../../../components/customtable";
import {FormsHeaderText} from "../../../../../components/texts";
import {OrgFacilitySearch} from "../../../../helpers/FacilitySearch";
import {EnrolleSchema2, EnrolleSchema} from "../models";
import {ObjectContext} from "../../../../../context";
import PeopleIcon from "@mui/icons-material/People";

export const FamilyPoliciesList = ({providerColumns}) => {
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
        <FormsHeaderText text="List of Family Policies" />
      </Box>

      {state.Beneficiary.familyPolicies.map(policy => {
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

            {policy.dependantBeneficiaries.length > 0 && (
              <Box>
                <FormsHeaderText text={"Dependant(s)"} />
                <CustomTable
                  title={""}
                  columns={EnrolleSchema2}
                  data={policy.dependantBeneficiaries}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => handleRow()}
                  progressPending={false}
                />
              </Box>
            )}

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

export const FamilyPoliciesAdd = ({
  addPrincipal,
  addDependent,
  createPolicy,
  providerColumns,
  providers,
  setProviders,
}) => {
  const {state, setState} = useContext(ObjectContext);
  //const [providers, setProviders] = useState([]);
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
        gap={2}
        mb={2}
      >
        <GlobalCustomButton
          disabled={state.Beneficiary?.principal._id}
          onClick={addPrincipal}
        >
          <PersonAddAlt1Icon sx={{marginRight: "5px"}} fontSize="small" />
          Add Principal
        </GlobalCustomButton>

        <GlobalCustomButton onClick={addDependent}>
          <PeopleIcon sx={{marginRight: "5px"}} fontSize="small" />
          Add Dependant
        </GlobalCustomButton>
      </Box>

      <Box mb={1.5}>
        <FormsHeaderText text="Principal" />
        <Box
          sx={{
            minHeight: "5vh",
          }}
        >
          <CustomTable
            title={""}
            columns={EnrolleSchema}
            data={
              JSON.stringify(state.Beneficiary.principal) !== "{}"
                ? [state?.Beneficiary?.principal]
                : []
            }
            pointerOnHover
            highlightOnHover
            striped
            CustomEmptyData={
              <Typography sx={{fontSize: "0.8rem"}}>
                You've not added a principal yet...
              </Typography>
            }
            //onRowClicked={() => handleRow(state.Beneficiary?.principal)}
            progressPending={false}
          />
        </Box>
      </Box>

      <Box mb={1.5}>
        <FormsHeaderText text="Dependent(s)" />

        <Box
          sx={{
            minHeight: "10vh",
          }}
        >
          <CustomTable
            title={""}
            columns={EnrolleSchema2}
            data={state?.Beneficiary?.dependent}
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={() => handleRow()}
            CustomEmptyData={
              <Typography sx={{fontSize: "0.8rem"}}>
                You've not added Dependant(s) yet...
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

      <Box sx={{display: "flex"}} gap={1.5} mt={2}>
        <GlobalCustomButton onClick={() => createPolicy()}>
          Add Family To List
        </GlobalCustomButton>
        {/* <GlobalCustomButton>Reset Form</GlobalCustomButton> */}
      </Box>
    </Box>
  );
};
