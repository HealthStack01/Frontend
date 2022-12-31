import {useContext, useState, useEffect} from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {Box} from "@mui/material";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {TableMenu} from "../../../../ui/styled/global";
import {PageWrapper} from "../../../../ui/styled/styles";
import {ObjectContext} from "../../../../context";
import dayjs from "dayjs";

export function SLAList({showDetail, showCreate}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const {state, setState} = useContext(ObjectContext);
  const [slaList, setSLAList] = useState([]);

  useEffect(() => {
    const currentDeal = state.DealModule.selectedDeal;
    setSLAList(currentDeal.sla || []);
  }, [state.DealModule]);

  const handleCreateNew = () => {
    showCreate();
  };

  const handleRow = data => {
    setState(prev => ({
      ...prev,
      SLAModule: {...prev.SLAModule, selectedSLA: data},
    }));

    if (data.status === "Draft") {
      showCreate();
    } else {
      showDetail();
    }
  };

  const handleSearch = () => {};

  const dummyData = [
    {
      company_name: "Health Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Active",
    },
    {
      company_name: "Albert Health Stack",
      telestaff_name: "KTeejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Active",
    },
    {
      company_name: "DonaHealth Stack",
      telestaff_name: "9Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Inactive",
    },

    {
      company_name: "DaviHealth Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Active",
    },
  ];

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

  const SLASchema = [
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
      key: "sn",
      description: "Enter name of Company",
      selector: row => row.company_name,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Telestaff Name",
      key: "telestaff_name",
      description: "Enter Telestaff name",
      selector: row => row.telestaff_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Probability Of Deal",
      key: "probability",
      description: "Enter bills",
      selector: row => row.probability,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Date of Submission",
      key: "date",
      description: "Enter name of Disease",
      selector: (row, i) => row.date,
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

  const deal = state.DealModule.selectedDeal.dealinfo;

  const SLAColumns = [
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

  return (
    <>
      <div className="level">
        <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
          <TableMenu>
            <div style={{display: "flex", alignItems: "center"}}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>SLA</h2>
            </div>

            <GlobalCustomButton onClick={handleCreateNew}>
              <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
              Create New SLA
            </GlobalCustomButton>
          </TableMenu>

          <Box style={{width: "100%", overflow: "auto"}}>
            <CustomTable
              title={""}
              columns={SLAColumns}
              data={slaList}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
            />
          </Box>
        </PageWrapper>
      </div>
    </>
  );
}
