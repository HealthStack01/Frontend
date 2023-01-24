import {Box, Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import {useState, useEffect, useContext, useCallback} from "react";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CustomTable from "../../components/customtable";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import {FormsHeaderText} from "../../components/texts";
import FilterMenu from "../../components/utilities/FilterMenu";
import {ObjectContext, UserContext} from "../../context";
import client from "../../feathers";
import {TableMenu} from "../../ui/styled/global";
import AdminOrganization from "../Admin/Organization";
//import {OrganizationList} from "../ManagedCare/HIA";

const OrganizationsPage = () => {
  const [tab, setTab] = useState("list");
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const handleShowOrgDetail = org => {
    setSelectedOrganization(org);
    setTab("detail");
  };

  return (
    <Box>
      {tab === "list" && (
        <OrganizationsList selectOrganization={handleShowOrgDetail} />
      )}

      {tab === "detail" && (
        <OrganizationDetails
          organization={selectedOrganization}
          goBack={() => setTab("list")}
        />
      )}
    </Box>
  );
};

export default OrganizationsPage;

export const OrganizationsList = ({selectOrganization}) => {
  const facilityServ = client.service("facility");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const {state, setState} = useContext(ObjectContext);

  const getFacilities = () => {
    setLoading(true);
    facilityServ
      .find({
        query: {
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSearch = () => {};

  useEffect(() => {
    getFacilities();

    facilityServ.on("created", obj => getFacilities());
    facilityServ.on("updated", obj => getFacilities());
    facilityServ.on("patched", obj => getFacilities());
    facilityServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  const facilitiesColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Organization Name",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.facilityName}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
    },
    {
      name: "Organization Owner",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.facilityOwner}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Date Created",
      key: "phone",
      description: "Enter name of Company",
      selector: row => dayjs(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Organization Type",
      key: "phone",
      description: "Enter name of Company",
      selector: row => row?.facilityType,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Category",
      key: "phone",
      description: "Enter name of Company",
      selector: row => row?.facilityCategory,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Phone Number",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.facilityContactPhone}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Email Address",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.facilityEmail}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Status",
      key: "phone",
      description: "Enter name of Company",
      selector: row => (row?.active ? "Active" : "Inactive"),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },
  ];

  const handleRow = facility => {
    setState(prev => ({
      ...prev,
      OrganizationModule: {
        ...prev.OrganizationModule,
        selectedOrganization: facility,
      },
    }));
    selectOrganization(facility);
  };

  const conditionalRowStyles = [
    {
      when: row => !row.active,
      style: {
        backgroundColor: "#ffe3e0",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  return (
    <Box pl={2} pr={2}>
      <TableMenu>
        <div style={{display: "flex", alignItems: "center"}}>
          {handleSearch && (
            <div className="inner-table">
              <FilterMenu onSearch={handleSearch} />
            </div>
          )}
          <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
            List of Organizations on Healthstack
          </h2>
        </div>
      </TableMenu>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 170px)",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={facilitiesColumns}
          data={facilities}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
          conditionalRowStyles={conditionalRowStyles}
        />
      </Box>
    </Box>
  );
};

export const OrganizationDetails = ({organization, goBack}) => {
  const facilityServer = client.service("facility");
  const {register, reset, handleSubmit, control} = useForm();
  const {user, setUser} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [facility, setFacility] = useState({});
  const [edit, setEdit] = useState(false);
  const [logoAnchorEl, setLogoAnchorEl] = useState(null);
  const [modulesModal, setModulesModal] = useState(false);
  const [logoUploadModal, setLogoUploadModal] = useState(false);

  const currentOrganization = state.OrganizationModule.selectedOrganization;

  const getCurrentFacility = useCallback(async () => {
    showActionLoader();
    //console.log(user);
    const id = currentOrganization._id;
    await facilityServer
      .get(id)
      .then(resp => {
        console.log(resp);
        hideActionLoader();
        setFacility(resp);
        reset(resp);
        //console.log(resp);
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCurrentFacility();

    facilityServer.on("created", obj => getCurrentFacility());
    facilityServer.on("updated", obj => getCurrentFacility());
    facilityServer.on("patched", obj => getCurrentFacility());
    facilityServer.on("removed", obj => getCurrentFacility());

    return () => {};
  }, [getCurrentFacility]);

  console.log(currentOrganization);
  return (
    <Box pt={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        pl={2}
        pr={2}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <FormsHeaderText text="Organization Detail" />
          <GlobalCustomButton onClick={goBack}>Go Back</GlobalCustomButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <GlobalCustomButton>Employees</GlobalCustomButton>
          <GlobalCustomButton>Modules</GlobalCustomButton>
        </Box>
      </Box>

      <Box p={2}>
        <Grid container spacing={2} mb={2}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Input
              register={register("facilityOwner")}
              label="Organization Owner"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Input
              register={register("facilityName")}
              label="Organization Name"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Input
              register={register("facilityContactPhone")}
              label="Phone Number"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Input
              register={register("facilityEmail")}
              label="Email Address"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <CustomSelect
              control={control}
              name="facilityType"
              options={[
                "Diagnostic Lab",
                "Diagnostics Imaging",
                "HMO",
                "Hospital",
                "Pharmacy",
                "Others",
              ]}
              label="Organization Type"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <CustomSelect
              control={control}
              name="facilityCategory"
              options={["Health", "Finance"]}
              label="Organization Category"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Input
              register={register("facilityAddress")}
              label="Organization Address"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Input
              register={register("facilityCity")}
              label="Organization City"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Input
              register={register("facilityLGA")}
              label="Organization LGA"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Input
              register={register("facilityState")}
              label="Organization State"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Input
              register={register("facilityCountry")}
              label="Organization Country"
              disabled={!edit}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
