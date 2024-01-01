import {useCallback, useContext, useEffect, useState} from "react";
import {Box, Typography, IconButton} from "@mui/material";
import {DeleteOutline, EditOutlined} from "@mui/icons-material";

import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import {FormsHeaderText} from "../../../../components/texts";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import ModalBox from "../../../../components/modal";
import {useForm} from "react-hook-form";
import {OrgFacilityProviderSearch} from "../../../helpers/FacilitySearch";
import {toast} from "react-toastify";
import GroupedRadio from "../../../../components/inputs/basic/Radio/GroupedRadio";
import CheckboxGroup from "../../../../components/inputs/basic/Checkbox/CheckBoxGroup";

import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import Input from "../../../../components/inputs/basic/Input";

const TariffProviders = () => {
  const tarrifsServer = client.service("tariff");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [addProvderModal, setAddProviderModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [providers, setProviders] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    message: "",
    type: "",
    action: null,
  });

  useEffect(() => {
    setProviders(state.TarrifModule.selectedTarrif.providers || []);
  }, [state.TarrifModule.selectedTarrif]);

  const handleDeleteProvider = provider => {
    showActionLoader();
    const tariff = state.TarrifModule.selectedTarrif;

    const newProviders = providers.filter(
      item => item.dest_org !== provider.dest_org
    );

    return tarrifsServer
      .patch(tariff._id, {providers: newProviders})
      .then(res => {
        setState(prev => ({
          ...prev,
          TarrifModule: {
            ...prev.TarrifModule,
            selectedTarrif: res,
          },
        }));
        cancelConfirmDialog();
        hideActionLoader();
        toast.success(
          `You have succesfully deleted a Provider from Tarrif ${res.band}`
        );
      })
      .catch(err => {
        toast.error("Failed to delete Provider from Tariff " + err);
        hideActionLoader();
      });
  };

  const confirmDeleteProvider = provider => {
    setConfirmDialog({
      open: true,
      message: `You're about to delete a Provider ${provider.dest_org_name} from this Tariff`,
      type: "danger",
      action: () => handleDeleteProvider(provider),
    });
  };

  const cancelConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      message: "",
      type: "",
      action: null,
    });
  };

  const editProvider = provider => {
    setState(prev => ({
      ...prev,
      TarrifModule: {
        ...prev.TarrifModule,
        selectedProvider: provider,
      },
    }));
    setEditModal(true);
  };

  const handleRowClick = provider => {};

  const providersColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "S/N",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Provider's Name",
      key: "facility",
      description: "Facility Name",
      selector: row => row?.dest_org_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "250px",
    },
    {
      name: "Class Type",
      key: "class",
      description: "Class",
      selector: row => row?.class.map(item => item),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "250px",
    },
    {
      name: "Edit",

      center: true,
      key: "delete",
      description: "Delete row",
      selector: row => (
        <IconButton color="success" onClick={() => editProvider(row)}>
          <EditOutlined fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Delete",

      center: true,
      key: "delete",

      description: "Delete row",
      selector: (row, index) => (
        <IconButton
          sx={{color: "red"}}
          onClick={() => confirmDeleteProvider(row)}
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmationAction={confirmDialog.action}
        cancelAction={cancelConfirmDialog}
      />

      <ModalBox
        open={addProvderModal}
        onClose={() => setAddProviderModal(false)}
        header={`Add New Service To Tarrif - ${state.TarrifModule.selectedTarrif.band}`}
      >
        <AddNewProvider closeModal={() => setAddProviderModal(false)} />
      </ModalBox>

      <ModalBox
        open={editModal}
        onClose={() => setEditModal(false)}
        header={`Edit Provider - ${state.TarrifModule.selectedProvider.dest_org_name}`}
      >
        <EditProvider closeModal={() => setEditModal(false)} />
      </ModalBox>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1.5}
      >
        <FormsHeaderText text="List of Providers" />

        <GlobalCustomButton onClick={() => setAddProviderModal(true)}>
          Add New Provider
        </GlobalCustomButton>
      </Box>

      <Box
        sx={{
          height: "calc(100vh - 170px)",
          overflow:"auto"
        }}
      >
        <CustomTable
          title={""}
          columns={providersColumns}
          data={providers}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRowClick}
          progressPending={false}
          //conditionalRowStyles={conditionalRowStyles}
          CustomEmptyData={
            <Typography sx={{fontSize: "0.8rem"}}>
              There are no Providers for this Tarrif yet
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};

export default TariffProviders;

export const AddNewProvider = ({closeModal}) => {
  const tarrifsServer = client.service("tariff");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {control, handleSubmit, getValues} = useForm();
  const [tariffs, setTariffs] = useState([]);
  const [provider, setProvider] = useState(null);
  const [existingProvider, setExistingProvider] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    message: "",
    type: "",
    action: null,
  });

  const cancelConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      message: "",
      type: "",
      action: null,
    });
  };

  const handleExistingProvider = () => {
    const existingProviderTariff = tariffs.find(tariff =>
      tariff.providers.some(item => item.dest_org === provider._id)
    );

    setConfirmDialog({
      open: true,
      message: `This Provider already exist's on another Tarrif, by clicking on Continue it will be deleted from the Tariff it currently exist in and added to the current Tariff`,
      type: "warning",
      action: () => handleChangeProviderTariff(existingProviderTariff),
    });

    //console.log(existingProviderTariff);
  };

  const handleGetTarrifs = useCallback(async () => {
    showActionLoader();

    const resp = await tarrifsServer.find({
      query: {
        organizationId: user.currentEmployee.facilityDetail._id,
        $sort: {
          createdAt: -1,
        },
      },
    });

    setTariffs(resp.data);
    hideActionLoader();
  }, [user.currentEmployee.facilityDetail._id]);

  useEffect(() => {
    handleGetTarrifs();
  }, [handleGetTarrifs]);

  const handleAddProvider = async data => {
    if (!provider) return toast.warning("Please select a Provider");
    if (!data.class) return toast.warning("Please choose Provider's Class");
    const tariffsProviders = tariffs.map(item => item.providers);

    const flatenTariffProviders = tariffsProviders.flat();

    const filterOutUndefined = flatenTariffProviders.filter(
      item => item !== undefined
    );

    const returnOnlyIdentities = filterOutUndefined.map(item => item.dest_org);

 /*    if (returnOnlyIdentities.includes(provider._id))
      return handleExistingProvider() */;

    //toast.error("You already have this Provider in one of your Tariffs");

    showActionLoader();

    const tariff = state.TarrifModule.selectedTarrif;
    const previousProviders = tariff.providers || [];

    const providerData = {
      dest_org: provider._id,
      dest_org_name: provider?.facilityName,
      class: data.class,
    };

    const newProviders = [providerData, ...previousProviders];

    return tarrifsServer
      .patch(tariff._id, {providers: newProviders})
      .then(res => {
        setState(prev => ({
          ...prev,
          TarrifModule: {
            ...prev.TarrifModule,
            selectedTarrif: res,
          },
        }));
        closeModal();
        hideActionLoader();
        toast.success(
          `You have succesfully added a new Provider to Tarrif ${res.band}`
        );
      })
      .catch(err => {
        toast.error("Failed to add new Provider to Tariff " + err);
        hideActionLoader();
      });
  };

  const handleChangeProviderTariff = tariff => {
    showActionLoader();
    const currentTariff = state.TarrifModule.selectedTarrif;
    const currentTariffProviders = currentTariff.providers;

    const existingTariffProviders = tariff.providers;

    const newExistingProviders = existingTariffProviders.filter(
      item => item.dest_org !== provider._id
    );

    const providerData = {
      dest_org: provider._id,
      dest_org_name: provider?.facilityName,
      class: getValues("class"),
    };

    const newCurrentProviders = [providerData, ...currentTariffProviders];

    return tarrifsServer
      .patch(tariff._id, {providers: newExistingProviders})
      .then(res => {
        // toast.success(
        //   `You have succesfully deleted a Provider from Tarrif ${res.band}`
        // );
        return tarrifsServer
          .patch(currentTariff._id, {providers: newCurrentProviders})
          .then(res => {
            setState(prev => ({
              ...prev,
              TarrifModule: {
                ...prev.TarrifModule,
                selectedTarrif: res,
              },
            }));
            cancelConfirmDialog();
            hideActionLoader();
            toast.success(
              `You have succesfully added a new Provider to Tarrif ${res.band}`
            );
            closeModal();
          });
        // .catch(err => {
        //   toast.error("Failed to add new Provider to Tariff " + err);
        //   hideActionLoader();
        // });
      })
      .catch(err => {
        toast.error("Failed to delete Provider from Tariff " + err);
        hideActionLoader();
      });
  };

  const getSearchfacility = facility => {
    setProvider(facility.organizationDetail);
  };

  return (
    <Box
      sx={{
        width: "450px",
      }}
    >
      <CustomConfirmationDialog
        open={confirmDialog.open}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmationAction={confirmDialog.action}
        cancelAction={cancelConfirmDialog}
      />
      <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
        <OrgFacilityProviderSearch getSearchfacility={getSearchfacility} />

        <CheckboxGroup
          name="class"
          options={["Primary", "Secondary", "Tertiary"]}
          control={control}
          label="Provider's Class"
          required
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <GlobalCustomButton onClick={handleSubmit(handleAddProvider)}>
          Add Provider
        </GlobalCustomButton>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const EditProvider = ({closeModal}) => {
  const tarrifsServer = client.service("tariff");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {control, handleSubmit, reset, register} = useForm();

  const [provider, setProvider] = useState(
    state.TarrifModule.selectedProvider || null
  );

  useEffect(() => {
    const providerClass = provider.class;
    reset({
      provider: provider.dest_org_name,
      class: Array.isArray(providerClass) ? providerClass[0] : providerClass,
    });
  }, [state.TarrifModule.selectedTarrif.selectedProvider]);

  const handleAddProvider = async data => {
    if (!provider) return toast.warning("Please select a Provider");
    if (!data.class) return toast.warning("Please choose Provider's Class");

    showActionLoader();

    const tariff = state.TarrifModule.selectedTarrif;
    const previousProviders = tariff.providers || [];

    const providerData = {
      ...provider,
      class: data.class,
    };

    const newProviders = previousProviders.map(item => {
      if (item.dest_org === providerData.dest_org) {
        return providerData;
      } else {
        return item;
      }
    });

    return tarrifsServer
      .patch(tariff._id, {providers: newProviders})
      .then(res => {
        setState(prev => ({
          ...prev,
          TarrifModule: {
            ...prev.TarrifModule,
            selectedTarrif: res,
          },
        }));
        closeModal();
        hideActionLoader();
        toast.success(
          `You have succesfully updated Class for Provider ${res.band}`
        );
      })
      .catch(err => {
        toast.error("Failed to update Provider's Class" + err);
        hideActionLoader();
      });
  };

  return (
    <Box
      sx={{
        width: "500px",
      }}
    >
      <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
        <Input
          register={register("provider")}
          label="Provider's Name"
          disabled
        />

        <GroupedRadio
          name="class"
          options={["Primary", "Secondary", "Tertiary"]}
          control={control}
          label="Provider's Class"
          required
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <GlobalCustomButton onClick={handleSubmit(handleAddProvider)}>
          Update Provider
        </GlobalCustomButton>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
