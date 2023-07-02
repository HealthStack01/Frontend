import React, {useState, useContext, useEffect, useCallback} from "react";

import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";

import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {toast} from "react-toastify";
import {FormsHeaderText} from "../../../../components/texts";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import {Box} from "@mui/material";

const CorporateListComponent = ({showCreate, showDetails}) => {
  const orgClientServer = client.service("organizationclient");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [organizationClients, setOrganizationClients] = useState([]);

  const handleCreateNew = async () => {
    showCreate();
  };

  const handleRow = data => {
    //console.log(data);
    setState(prev => ({
      ...prev,
      ManagedCareCorporate: {
        ...prev.ManagedCareCorporate,
        selectedCorporate: data,
      },
    }));
    showDetails();
  };

  const handleSearch = val => {
    if (val.trim() === "" && val.length < 3) return;
    orgServ
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          relationshiptype: "sponsor",
          $search: val,
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        console.log(res);
        setOrganizationClients(res.data);
      })
      .catch(err => {
        console.log(err);
        toast.error(`Something went wrong! ${err}`);
      });
  };

  const getOrganizationClients = useCallback(() => {
    // const preservedList = state.ManagedCareCorporate.preservedList;
    // if (preservedList.length > 0) return setOrganizationClients(preservedList);

    setLoading(true);
    orgClientServer
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          relationshiptype: "sponsor",
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        console.log(res.data);
        setOrganizationClients(res.data);
        setLoading(false);
        setState(prev => ({
          ...prev,
          ManagedCareCorporate: {
            ...prev.ManagedCareCorporate,
            preservedList: res.data,
          },
        }));
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        toast.error(`Something went wrong! ${err}`);
      });
  }, [user]);

  // const updateLists = useCallback(() => {
  //       const preservedList = state.ManagedCareCorporate.preservedList;
  // }, [])

  useEffect(() => {
    getOrganizationClients();

    orgClientServer.on("created", obj =>
      setOrganizationClients(prev => [obj, ...prev])
    );
    orgClientServer.on("updated", obj => getOrganizationClients());
    orgClientServer.on("patched", obj => getOrganizationClients());
    orgClientServer.on("removed", obj => getOrganizationClients());
    return () => {};
  }, []);

  const OrganizationClientSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Organization",
      key: "facilityName",
      description: "Organization",
      selector: row => row?.organizationDetail?.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Address",
      key: "facilityAddress",
      description: "Address",
      selector: row => row?.organizationDetail?.facilityAddress,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "City",
      key: "facilityCity",
      description: "City",
      selector: row => row?.organizationDetail?.facilityCity,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "120px",
    },
    {
      name: "Band",
      key: "band",
      description: "Band",
      selector: row => row.Band,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
    },

    {
      name: "Phone",
      key: "phone",
      description: "Phone",
      selector: row => row?.organizationDetail?.facilityContactPhone,
      sortable: true,
      required: true,
      inputType: "PHONE",
      width: "100px",
    },

    {
      name: "Email",
      key: "facilityEmail",
      description: "simpa@gmail.com",
      selector: row => row?.organizationDetail?.facilityEmail,
      sortable: true,
      required: true,
      inputType: "EMAIL",
      width: "120px",
    },

    {
      name: "Type",
      key: "facilityType",
      description: "Facility Type",
      selector: row => row?.organizationDetail?.facilityType,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "120px",
    },

    {
      name: "Category",
      key: "facilityCategory",
      description: "Category",
      selector: row => row?.organizationDetail?.facilityCategory,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
    },
  ];

  return (
    <Box p={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <FilterMenu onSearch={handleSearch} />
          <FormsHeaderText text="Lists of Corporate Organizations" />
        </Box>

        <Box>
          <GlobalCustomButton onClick={handleCreateNew}>
            Add New Corporate
          </GlobalCustomButton>
        </Box>
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
          columns={OrganizationClientSchema}
          data={organizationClients}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
        />
      </Box>
    </Box>
  );
};

export default CorporateListComponent;
