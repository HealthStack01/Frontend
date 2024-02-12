import {useState, useEffect, useContext, useCallback} from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {Box} from "@mui/material";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";
import {ObjectContext, UserContext} from "../../../../context";
import dayjs from "dayjs";
import client from "../../../../feathers";
import {toast} from "react-toastify";

const ProposalList = ({showCreate, showDetail, isTab}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [deal, setDeal] = useState({});

  const getProposalsForPage = useCallback(async () => {
    const testId = "60203e1c1ec8a00015baa357";
    const facId = user.currentEmployee.facilityDetail._id;
    setLoading(true);

    const res = await dealServer.find({
      query: {
        facilityId: facId,
      },
    });

    const deals = res.data || [];

    const promises = deals.map(async deal => deal.proposal || []);

    const proposals = await Promise.all(promises);

    const finalProposals = proposals.flat(1);

    const currentDeal = deals.find(
      item => item._id === finalProposals[0].dealId
    );

    setDeal(currentDeal.dealinfo);

    await setProposals(finalProposals || []);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (isTab) {
      const currentDeal = state.DealModule.selectedDeal;
      setDeal(currentDeal.dealinfo);
      setProposals(currentDeal.proposal || []);
    } else {
      getProposalsForPage();
    }
  }, [state.DealModule, getProposalsForPage, isTab]);

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "active":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "inactive":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      default:
        break;
    }
  };

  // const deal = state.DealModule.selectedDeal.dealinfo;

  //console.log(deal);

  const ProposalSchema = [
    {
      name: "SN",
      key: "sn",
      description: "Enter name of Company",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "50px",
    },

    {
      name: "Customer Name",
      key: "company_name",
      description: "Enter name of Company",
      selector: row => row.customerName,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Customer Email",
      key: "contact_person",
      description: "Enter Telestaff name",
      selector: row => row.customerEmail,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Customer Phone",
      key: "contact_position",
      description: "Enter bills",
      selector: row => row.customerPhone,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Deal Probability",
      key: "contact_position",
      description: "Enter bills",
      selector: row => deal?.probability,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Deal Status",
      key: "phone_No",
      description: "Enter name of Disease",
      selector: (row, i) => deal?.currStatus,
      sortable: true,
      required: true,
      inputType: "DATE",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Date",
      key: "contact_position",
      description: "Enter bills",
      selector: row => dayjs(row.createdAt).format("DD/MM/YYYY hh:mm A"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Creator",
      key: "contact_position",
      description: "Enter bills",
      selector: row => row.createdByName,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Status",
      key: "status",
      description: "Enter bills",
      selector: "status",
      cell: row => row.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.status === "Sent",
      style: {
        backgroundColor: "#80ed99",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const handleSearch = () => {};

  const handleCreateNew = () => {
    showCreate();
  };

  const handleRow = async data => {
    if (isTab) {
      setState(prev => ({
        ...prev,
        ProposalModule: {...prev.ProposalModule, selectedProposal: data},
      }));

      if (data.status === "Draft") {
        showCreate();
      } else {
        showDetail();
      }
    } else {
      const id = data.dealId;
      await dealServer
        .get(id)
        .then(resp => {
          setState(prev => ({
            ...prev,
            DealModule: {...prev.DealModule, selectedDeal: resp},
            ProposalModule: {...prev.ProposalModule, selectedProposal: data},
          }));
          if (data.status === "Draft") {
            showCreate();
          } else {
            showDetail();
          }
        })
        .catch(err => {
          toast.error("An error occured trying to view details of Proposal");
          console.log(err);
        });
    }
  };

  return (
    <Box pl={2} pr={2} pt={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <div style={{display: "flex", alignItems: "center"}}>
          <div className="inner-table">
            <FilterMenu onSearch={handleSearch} />
          </div>

          <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>Proposals</h2>
        </div>

        {isTab && (
          <GlobalCustomButton onClick={handleCreateNew}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Add new Proposal
          </GlobalCustomButton>
        )}
      </Box>

      <Box>
      <div style={{width: '100%',  height:"calc(100vh - 180px)", overflow: 'auto'}}>
        <CustomTable
          title={""}
          columns={ProposalSchema}
          data={proposals}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
          conditionalRowStyles={conditionalRowStyles}
        />
        </div>
      </Box>
    </Box>
  );
};

export default ProposalList;
