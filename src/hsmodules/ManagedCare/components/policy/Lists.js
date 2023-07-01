import {Box} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ApprovalIcon from "@mui/icons-material/Approval";
import PendingIcon from "@mui/icons-material/Pending";
import {useCallback, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import {TableMenu} from "../../../../ui/styled/global";
import {PageWrapper} from "../../../../ui/styled/styles";

import dayjs from "dayjs";

const PoliciesList = ({
  createNewPolicy,
  showDetails,
  beneficiary,
  corporate,
}) => {
  const policyServer = client.service("policy");
  const [policies, setPolicies] = useState([]);
  const {state, setState} = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [status, setStatus] = useState("approved");

  const handleCreateNew = async () => {
    createNewPolicy();
  };

  const handleRow = policy => {
    // return console.log(policy);
    setState(prev => ({
      ...prev,
      PolicyModule: {
        ...prev.PolicyModule,
        selectedPolicy: policy,
      },
    }));
    showDetails();
  };

  const handleSearch = val => {
    if (val.length < 3 || val.trim() === "") return;
    policyServer
      .find({
        query: {
          $or: [
            {
              policyNo: {
                $regex: val,
                $options: "i",
              },
            },
            {
              "principal.lastname": {
                $regex: val,
                $options: "i",
              },
            },
            {
              status: {
                $regex: val,
                $options: "i",
              },
            },

            {
              "principal.firstname": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "dependantBeneficiaries.type": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "principal.type": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "dependantBeneficiaries.firstname": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "dependantBeneficiaries.lastname": {
                $regex: val,
                $options: "i",
              },
            },

            {
              "sponsor.facilityName": {
                $regex: val,
                $options: "i",
              },
            },
            {
              sponsorshipType: {
                $regex: val,
                $options: "i",
              },
            },
            {
              planType: {
                $regex: val,
                $options: "i",
              },
            },
            {
              "plan.planName": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "providers.facilityName": {
                $regex: val,
                $options: "i",
              },
            },
            {"principal.gender": val},
            {"dependantBeneficiaries.gender": val},
          ],

          organizationId: user.currentEmployee.facilityDetail._id, // || "",

          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setPolicies(res.data);
      })
      .catch(err => {
        toast.error("Something went wrong!");
      });
  };

  const getPolicies = useCallback(async () => {
    setLoading(true);
    let query = {
      organizationId: user.currentEmployee.facilityDetail._id,
      approved: status === "approved",
      $sort: {
        createdAt: -1,
      },
    };

    if (beneficiary) {
      query["principal._id"] = beneficiary._id;
    }

    if (corporate) {
      query = {
        organizationId: user.currentEmployee.facilityDetail._id,
        $or: [
          {"sponsor.facilityName": corporate.facilityName},
          {"sponsor._id": corporate._id},
        ],
        $sort: {
          createdAt: -1,
        },
      };
    }
    const resp = await policyServer.find({
      query: query,
    });
    setPolicies(resp.data);
    setLoading(false);
  }, [status]);

  useEffect(() => {
    getPolicies();

    policyServer.on("created", obj => getPolicies());
    policyServer.on("updated", obj => getPolicies());
    policyServer.on("patched", obj => getPolicies());
    policyServer.on("removed", obj => getPolicies());
    return () => {};
  }, [getPolicies]);

  const PolicySchema = [
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
      name: "Date Joined",
      key: "createdAt",
      description: "Date Created",
      selector: row => dayjs(row?.createdAt).format("DD-MM-YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },

    {
      name: "Principal's Name",
      key: "principal",
      description: "Principal Last Name",
      selector: row =>
        `${row?.principal?.firstname} - ${row?.principal?.lastname}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Principal Phone",
      key: "phone",
      description: "Phone Number",
      selector: row => row?.principal?.phone,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Principal Email",
      key: "email",
      description: "simpa@email.com",
      selector: row => row?.principal?.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },
    {
      name: "Dependents",
      key: "principal",
      description: "No of dependents",
      selector: row => row?.dependantBeneficiaries?.length,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Policy Number",
      key: "policyNo",
      description: "Phone Number",
      selector: row => row?.policyNo,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Sponsor Type",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: row => row?.sponsorshipType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Sponsor Name",
      key: "sponsor",
      description: "Sponsor name",
      selector: row =>
        row?.sponsor?.facilityDetail?.facilityName
          ? row?.sponsor?.facilityDetail?.facilityName
          : row?.sponsor?.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Plan",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: row => row?.plan?.planName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Plan Type",
      key: "plan",
      description: "Plan",
      selector: row => row?.planType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    // {
    //   name: "Provider",
    //   key: "provider",
    //   description: "Provider",
    //   selector: row => row?.providers[0]?.facilityName,
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
    {
      name: "Providers",
      key: "provider",
      description: "Provider",
      selector: row => row?.providers?.length,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Paid",
      key: "isPaid",
      description: "Paid",
      selector: row => (row?.isPaid ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Active",
      key: "active",
      description: "Active",
      selector: row => (row?.active ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
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
        <div style={{display: "flex", alignItems: "center"}}>
          {handleSearch && (
            <div className="inner-table">
              <FilterMenu onSearch={handleSearch} />
            </div>
          )}
          <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
            {status === "approved" ? "Approved" : "Pending"} Policies
          </h2>

          {status === "approved" && (
            <GlobalCustomButton
              onClick={() => setStatus("pending")}
              color="warning"
            >
              <PendingIcon fontSize="small" sx={{marginRight: "5px"}} />
              Show Pending
            </GlobalCustomButton>
          )}

          {status === "pending" && (
            <GlobalCustomButton
              onClick={() => setStatus("approved")}
              color="secondary"
            >
              <ApprovalIcon fontSize="small" sx={{marginRight: "5px"}} />
              Show Approved
            </GlobalCustomButton>
          )}
        </div>

        {!beneficiary && !corporate && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {createNewPolicy && (
              <GlobalCustomButton onClick={handleCreateNew} color="success">
                <AddCircleOutlineIcon
                  fontSize="small"
                  sx={{marginRight: "5px"}}
                />
                Create New Policy
              </GlobalCustomButton>
            )}
          </Box>
        )}
      </Box>

      <Box
        style={{
          height:
            beneficiary || corporate
              ? "calc(100vh - 240px)"
              : "calc(100vh - 140px)",
          overflowY: "scroll",
        }}
      >
        <CustomTable
          title={""}
          columns={PolicySchema}
          data={policies}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
          CustomEmptyData={
            status === "approved"
              ? "No Approved Policies"
              : "No Pending Policies"
          }
        />
      </Box>
    </Box>
  );
};

export default PoliciesList;
