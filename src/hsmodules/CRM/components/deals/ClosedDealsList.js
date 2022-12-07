/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../../../context";
import "react-datepicker/dist/react-datepicker.css";

import {PageWrapper} from "../../../../ui/styled/styles";
import {TableMenu} from "../../../../ui/styled/global";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";

//import OldLeadDetail from "./components/lead/LeadDetail";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// eslint-disable-next-line
const searchfacility = {};

const ClosedDealsList = ({showOpenDeals, setDealDetail, showDetail}) => {
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);

  const handleShowClosedDeals = async () => {
    showOpenDeals();
  };

  const handleRow = async data => {
    //openDetailModal();
    setDealDetail("closed-detail");
  };

  const handleSearch = val => {};

  const dummyData = [
    {
      company_name: "Health Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
    {
      company_name: "Albert Health Stack",
      telestaff_name: "KTeejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
    {
      company_name: "DonaHealth Stack",
      telestaff_name: "9Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },

    {
      company_name: "DaviHealth Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
    {
      company_name: "Health Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
    {
      company_name: "Albert Health Stack",
      telestaff_name: "KTeejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
    {
      company_name: "DonaHealth Stack",
      telestaff_name: "9Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },

    {
      company_name: "DaviHealth Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
    {
      company_name: "Health Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
    {
      company_name: "Albert Health Stack",
      telestaff_name: "KTeejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
    {
      company_name: "DonaHealth Stack",
      telestaff_name: "9Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },

    {
      company_name: "DaviHealth Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Closed",
    },
  ];

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "active":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "inactive":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      case "closed":
        return <span style={{color: "red"}}>{status}</span>;

      default:
        break;
    }
  };

  const dealsColumns = [
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
      selector: row => "100%",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Date of Completion",
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
              <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
                List of Closed Deals
              </h2>
            </div>

            <GlobalCustomButton onClick={handleShowClosedDeals}>
              <LockOpenOutlinedIcon
                Closed
                fontSize="small"
                sx={{marginRight: "5px"}}
              />
              View Open Deals
            </GlobalCustomButton>
          </TableMenu>
          <div style={{width: "100%", overflow: "auto"}}>
            <CustomTable
              title={""}
              columns={dealsColumns}
              data={dummyData}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
              //conditionalRowStyles={conditionalRowStyles}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
};

export default ClosedDealsList;
