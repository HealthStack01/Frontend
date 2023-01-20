import {Box, Typography} from "@mui/material";
import dayjs from "dayjs";
import {useState, useEffect} from "react";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CustomTable from "../../components/customtable";
import {FormsHeaderText} from "../../components/texts";
import FilterMenu from "../../components/utilities/FilterMenu";
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

  const getFacilities = () => {
    setLoading(true);
    facilityServ
      .find({
        query: {
          $limit: 100,
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
  return (
    <Box p={2}>
      <Box sx={{display: "flex"}} gap={2}>
        <FormsHeaderText text="Organization Detail" />
        <GlobalCustomButton onClick={goBack}>Go Back</GlobalCustomButton>
      </Box>

      <Box>
        <AdminOrganization propId={organization._id} />
      </Box>
    </Box>
  );
};
