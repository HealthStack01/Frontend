/* eslint-disable */
import React, {useState, useContext, useEffect, useCallback} from "react";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../../../context";
import "react-datepicker/dist/react-datepicker.css";
import PendingIcon from "@mui/icons-material/Pending";

import {PageWrapper} from "../../../../ui/styled/styles";
import {TableMenu} from "../../../../ui/styled/global";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";

//import OldLeadDetail from "./components/lead/LeadDetail";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import client from "../../../../feathers";
import {Box} from "@mui/system";
import dayjs from "dayjs";
import {Typography} from "@mui/material";
// eslint-disable-next-line
const searchfacility = {};

const ClosedDealsList = ({showOpenDeals, setDealDetail, showPendingDeals}) => {
  // eslint-disable-next-line
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [closedDeals, setClosedDeals] = useState([]);
  const dealServer = client.service("deal");

  const handleShowOpenDeals = async () => {
    showOpenDeals();
  };

  const handleShowPendingDeals = () => {
    showPendingDeals();
  };

  const handleRow = async data => {
    //openDetailModal();
    setDealDetail("closed-detail");
  };

  const handleSearch = val => {};

  const getFacilities = useCallback(async () => {
    const testId = "60203e1c1ec8a00015baa357";
    const facId = user.currentEmployee.facilityDetail_id;

    showActionLoader();

    //const status = "close" || "pending";

    const res =
      testId === facId
        ? await dealServer.find({})
        : await dealServer.find({
            query: {
              facilityId: facId,
              "dealinfo.currStatus": "closed",
            },
          });
    await setClosedDeals(res.data);
    hideActionLoader();
  }, []);

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

  useEffect(() => {
    getFacilities();
  }, [getFacilities]);

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "open":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "pending":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      case "closed":
        return <span style={{color: "red"}}>{status}</span>;

      default:
        break;
    }
  };

  const dealsColumns2 = [
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

  const closedDealColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Customer Name",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.name}
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
      name: "Customer Type",
      key: "type",
      description: "Enter Telestaff name",
      selector: row => row?.type,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Phone",
      key: "phone",
      description: "Enter name of Company",
      selector: row => row?.phone,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Email",
      key: "email",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.email}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Probability",
      key: "probability",
      description: "Enter bills",
      selector: row => row?.dealinfo?.probability,
      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
    },
    {
      name: "Date Submitted",
      key: "date",
      description: "Enter name of Disease",
      selector: (row, i) => dayjs(row?.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Status",
      key: "dealinfo",
      description: "Enter bills",
      selector: "status",
      cell: row => returnCell(row?.dealinfo?.currStatus),
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Next Action",
      key: "dealinfo",
      description: "Enter bills",
      selector: "status",
      cell: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.dealinfo?.nextAction}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Size",
      key: "dealinfo",
      description: "Enter bills",
      selector: "status",
      cell: row => row?.dealinfo?.size,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Weight Forecast",
      key: "dealinfo",
      description: "Enter bills",
      selector: "status",
      cell: row => row?.dealinfo?.weightForecast,
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

            <Box sx={{display: "flex"}} gap={2}>
              <GlobalCustomButton onClick={handleShowOpenDeals} color="success">
                <LockOpenOutlinedIcon
                  fontSize="small"
                  sx={{marginRight: "5px"}}
                />
                View Open Deals
              </GlobalCustomButton>

              <GlobalCustomButton onClick={handleShowPendingDeals} color="info">
                <PendingIcon fontSize="small" sx={{marginRight: "5px"}} />
                View Pending Deals
              </GlobalCustomButton>
            </Box>

            {/* <GlobalCustomButton onClick={handleShowClosedDeals}>
              <LockOpenOutlinedIcon
                Closed
                fontSize="small"
                sx={{marginRight: "5px"}}
              />
              View Open Deals
            </GlobalCustomButton> */}
          </TableMenu>
          <div style={{width: "100%", overflow: "auto"}}>
            <CustomTable
              title={""}
              columns={closedDealColumns}
              data={closedDeals}
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
