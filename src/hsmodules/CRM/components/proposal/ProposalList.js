import {useState} from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {Box} from "@mui/material";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";

const dummyData = [
  {
    company_name: "Health Stack",
    contact_person: "Teejay Tabor",
    contact_position: "CEO",
    phone_No: "09123802410",
    status: "Active",
  },
  {
    company_name: "Albert Health Stack",
    contact_person: "KTeejay Tabor",
    contact_position: "CEO",
    phone_No: "09123802410",
    status: "Active",
  },
  {
    company_name: "DonaHealth Stack",
    contact_person: "9Teejay Tabor",
    contact_position: "CEO",
    phone_No: "09123802410",
    status: "Inactive",
  },

  {
    company_name: "DaviHealth Stack",
    contact_person: "Teejay Tabor",
    contact_position: "CEO",
    phone_No: "09123802410",
    status: "Active",
  },
];

const ProposalList = ({openCreateModal}) => {
  const [loading, setLoading] = useState(false);

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
      name: "Company Name",
      key: "company_name",
      description: "Enter name of Company",
      selector: row => row.company_name,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Contact Person",
      key: "contact_person",
      description: "Enter Telestaff name",
      selector: row => row.contact_person,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Contact Position",
      key: "contact_position",
      description: "Enter bills",
      selector: row => row.contact_position,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Phone Number",
      key: "phone_No",
      description: "Enter name of Disease",
      selector: (row, i) => row.phone_No,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Status",
      key: "status",
      description: "Enter bills",
      selector: "status",
      cell: row => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const handleSearch = () => {};

  const handleCreateNew = () => {};

  const handleRow = () => {};

  return (
    <Box>
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
          <GlobalCustomButton onClick={openCreateModal}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Add new Proposal
          </GlobalCustomButton>
        )}
      </Box>

      <Box>
        <CustomTable
          title={""}
          columns={ProposalSchema}
          data={dummyData}
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
