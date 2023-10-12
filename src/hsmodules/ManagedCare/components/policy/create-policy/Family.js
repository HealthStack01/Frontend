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
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import client from "../../../../../feathers";
import {toast} from "react-toastify";
import ModalBox from "../../../../../components/modal";
import UploadClients from "../../../../Client/UploadClient";

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
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const clientServer = client.service("client");
  //const [providers, setProviders] = useState([]);
  const [success, setSuccess] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);

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

  const handleUploadPrincipal = () => {
    setState(prev => ({...prev, currBeneficiary: "principal"}));
    setUploadModal(true);
  };

  const handleUploadDependent = () => {
    setState(prev => ({...prev, currBeneficiary: "dependent"}));
    setUploadModal(true);
  };

  const createClient = async data => {
    //return console.log(data);

    const defaultEmail = `${data.firstname}-${data.lastname}-${dayjs(
      data.dob
    ).format("DD/MM/YYY")}@healthstack.africa`;

    const clientData = {
      ...data,
      facility: user.currentEmployee.facility,
      email: data.email || defaultEmail,
    };

    await clientServer
      .create(clientData)
      .then(res => {
        if (state.currBeneficiary === "principal") {
          res.type = "principal";
          setState(prev => ({
            ...prev,
            Beneficiary: {
              ...prev.Beneficiary,
              principal: res,
            },
          }));
        }
        if (state.currBeneficiary === "dependent") {
          res.type = "dependent";
          setState(prev => ({
            ...prev,
            Beneficiary: {
              ...prev.Beneficiary,
              dependent: [res, ...state.Beneficiary.dependent],
            },
          }));
        }
      })
      .catch(err => {
        toast.error(
          `Sorry, You weren't able to create client ${data.firstname} ${data.lastname} . ${err}`
        );
      });
  };

  const handleCreateMultipleClients = async data => {
    showActionLoader();

    const promises = data.map(async item => {
      await createClient(item);
    });

    await Promise.all(promises);

    hideActionLoader();
    setUploadModal(false);
    toast.success(`Sucessfully created ${data.length} Client(s)`);
  };

  return (
    <Box
      sx={{
        width: "90vw",
        maxHeight: "80vh",
      }}
    >
      <ModalBox
        open={uploadModal}
        onClose={() => setUploadModal(false)}
        header="Upload and Create Multiple Clients"
      >
        <UploadClients
          closeModal={() => setUploadModal(false)}
          createClients={handleCreateMultipleClients}
        />
      </ModalBox>
      <Box mb={1.5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormsHeaderText text="Principal" />

          <Box sx={{display: "flex", gap: 2}}>
            <GlobalCustomButton onClick={handleUploadPrincipal}>
              <DriveFolderUploadIcon
                sx={{marginRight: "5px"}}
                fontSize="small"
              />
              Upload Principal
            </GlobalCustomButton>

            <GlobalCustomButton
              disabled={state.Beneficiary?.principal._id}
              onClick={addPrincipal}
            >
              <PersonAddAlt1Icon sx={{marginRight: "5px"}} fontSize="small" />
              Add Principal
            </GlobalCustomButton>
          </Box>
        </Box>

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormsHeaderText text="Dependent(s)" />
          <Box sx={{display: "flex", gap: 2}}>
            <GlobalCustomButton onClick={handleUploadDependent}>
              <DriveFolderUploadIcon
                sx={{marginRight: "5px"}}
                fontSize="small"
              />
              Upload Dependant
            </GlobalCustomButton>

            <GlobalCustomButton onClick={addDependent}>
              <PeopleIcon sx={{marginRight: "5px"}} fontSize="small" />
              Add Dependant
            </GlobalCustomButton>
          </Box>
        </Box>

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
