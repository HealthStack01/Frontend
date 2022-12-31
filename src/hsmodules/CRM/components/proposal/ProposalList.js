import {useState, useEffect, useContext} from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {Box} from "@mui/material";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";
import {ObjectContext} from "../../../../context";
import dayjs from "dayjs";

const ProposalList = ({showCreate, showDetail}) => {
  const {state, setState} = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const currentDeal = state.DealModule.selectedDeal;
    setProposals(currentDeal.proposal || []);
  }, [state.DealModule]);

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

  const deal = state.DealModule.selectedDeal.dealinfo;

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
      selector: row => deal.probability,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Deal Status",
      key: "phone_No",
      description: "Enter name of Disease",
      selector: (row, i) => deal.currStatus,
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

  const handleSearch = () => {};

  const handleCreateNew = () => {
    showCreate();
  };

  const handleRow = data => {
    setState(prev => ({
      ...prev,
      ProposalModule: {...prev.ProposalModule, selectedProposal: data},
    }));

    if (data.status === "Draft") {
      showCreate();
    } else {
      showDetail();
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

        {handleCreateNew && (
          <GlobalCustomButton onClick={handleCreateNew}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Add new Proposal
          </GlobalCustomButton>
        )}
      </Box>

      <Box>
        <CustomTable
          title={""}
          columns={ProposalSchema}
          data={proposals}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
          //conditionalRowStyles={conditionalRowStyles}
        />
      </Box>
    </Box>
  );
};

export default ProposalList;
