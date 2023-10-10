import {useState, useEffect, useCallback, useContext} from "react";
import {Box, Typography, IconButton} from "@mui/material";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import CustomTable from "../../../../components/customtable";
import {DeleteOutline} from "@mui/icons-material";
import {toast} from "react-toastify";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";

const TarrifListComponent = ({
  showDetail,
  createBand,
  createTarrif,
  provider,
}) => {
  const tarrifsServer = client.service("tariff");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  const [tarrifs, setTarrifs] = useState([]);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    message: "",
    type: "",
    action: null,
  });

  const handleGetTarrifs = useCallback(async () => {
    setLoading(true);

    let query;

    if (provider) {
      console.log(provider);
      query = {
        "providers.dest_org": provider._id,
        $sort: {
          createdAt: -1,
        },
      };
    } else {
      query = {
        organizationId: user.currentEmployee.facilityDetail._id,
        $sort: {
          createdAt: -1,
        },
      };
    }

    const resp = await tarrifsServer.find({
      query: query,
    });

    setTarrifs(resp.data);
    console.log(resp.data);
    setLoading(false);
  }, [user.currentEmployee.facilityDetail._id]);

  useEffect(() => {
    handleGetTarrifs();

    tarrifsServer.on("created", obj => handleGetTarrifs());
    tarrifsServer.on("updated", obj => handleGetTarrifs());
    tarrifsServer.on("patched", obj => handleGetTarrifs());
    tarrifsServer.on("removed", obj => handleGetTarrifs());
  }, [handleGetTarrifs]);

  const handleSearch = val => {};

  const handleRow = tarrif => {
    //console.log(tarrif);
    setState(prev => ({
      ...prev,
      TarrifModule: {
        ...prev.TarrifModule,
        selectedTarrif: tarrif,
      },
    }));

    showDetail();
  };

  const handleDeleteTariff = tariff => {
    showActionLoader();

    tarrifsServer
      .remove(tariff._id)
      .then(res => {
        hideActionLoader();
        cancelConfirmDialog();
        toast.success("You've succesfully deleted a Tariff");
      })
      .catch(error => {
        hideActionLoader();
        toast.error(`Failed to delete Tariff - ${error}`);
      });
  };

  const confirmDeleteTariff = tariff => {
    setConfirmDialog({
      open: true,
      message: `You're about to delete a  Tariff`,
      type: "danger",
      action: () => handleDeleteTariff(tariff),
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

  const tarrifsColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "S/N",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Band Name",
      key: "bandname",
      description: "Band Name",
      selector: row => row?.band,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "HMO",
      key: "hmoname",
      description: "HMO name",
      selector: row => row?.organizationName,
      sortable: true,
      required: true,
      inputType: "TEXT",
      omit: provider ? false : true,
    },
    {
      name: "No of Facilities",
      key: "nofacilities",
      description: "No of Facilities",
      selector: row => row?.providers?.length,
      sortable: true,
      required: true,
      inputType: "TEXT",
      omit: provider ? true : false,
    },
    {
      name: "No of Services",
      key: "noservices",
      description: "No of Services",
      selector: row => row?.contracts?.length,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Delete",
      center: true,
      key: "delete",
      omit: provider,
      description: "Delete row",
      selector: (row, index) => (
        <IconButton
          sx={{color: "red"}}
          onClick={() => confirmDeleteTariff(row)}
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
    <Box
      sx={{display: "flex", flexDirection: "column", overflow: "auto"}}
      gap={2}
      p={2}
    >
      <CustomConfirmationDialog
        open={confirmDialog.open}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmationAction={confirmDialog.action}
        cancelAction={cancelConfirmDialog}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            minWidth: "200px",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <FilterMenu onSearch={handleSearch} />
          <Typography>List of Tarrifs</Typography>
        </Box>

        {!provider && (
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <GlobalCustomButton onClick={createBand}>
              Add New Band
            </GlobalCustomButton>

            <GlobalCustomButton color="success" onClick={createTarrif}>
              Create New Tarrif
            </GlobalCustomButton>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={tarrifsColumns}
          data={tarrifs}
          pointerOnHover
          highlightOnHover
          striped
          progressPending={loading}
          onRowClicked={handleRow}
        />
      </Box>
    </Box>
  );
};

export default TarrifListComponent;
