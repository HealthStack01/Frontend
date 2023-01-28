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
import LockIcon from "@mui/icons-material/Lock";
import client from "../../../../feathers";
import dayjs from "dayjs";
import {Typography} from "@mui/material";
import {Box} from "@mui/system";
// eslint-disable-next-line
const searchfacility = {};

const OpenDealsList = ({
  showClosedDeals,
  setDealDetail,
  showSuspendedDeals,
}) => {
  // eslint-disable-next-line
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [openDeals, setOpenDeals] = useState([]);
  const dealServer = client.service("deal");

  const getFacilities = useCallback(async () => {
    const testId = "60203e1c1ec8a00015baa357";
    const facId = user.currentEmployee.facilityDetail._id;
    setLoading(true);

    const res = await dealServer.find({
      query: {
        facilityId: facId,
        $or: [
          {
            "dealinfo.currStatus": "open",
          },
          {
            "dealinfo.currStatus": "Open",
          },
        ],
      },
    });
    await setOpenDeals(res.data);
    //console.log(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getFacilities();
  }, [getFacilities]);

  const handleShowClosedDeals = async () => {
    showClosedDeals();
  };

  const handleShowSuspendedDeals = () => {
    showSuspendedDeals();
  };

  const handleRow = async data => {
    setState(prev => ({
      ...prev,
      DealModule: {...prev.DealModule, selectedDeal: data},
    }));
    setDealDetail("detail");
  };

  const handleSearch = val => {};

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "open":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "pending":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      default:
        break;
    }
  };

  const dealsColumns = [
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
    // {
    //   name: "Telestaff Name",
    //   key: "telestaff_name",
    //   description: "Enter Telestaff name",
    //   selector: row => row.telestaff_name,
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
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
                List of Open Deals
              </h2>
            </div>

            <Box sx={{display: "flex"}} gap={2}>
              <GlobalCustomButton onClick={handleShowClosedDeals} color="error">
                <LockIcon fontSize="small" sx={{marginRight: "5px"}} />
                View Closed Deals
              </GlobalCustomButton>

              <GlobalCustomButton
                onClick={handleShowSuspendedDeals}
                color="warning"
              >
                <PendingIcon fontSize="small" sx={{marginRight: "5px"}} />
                View Suspended Deals
              </GlobalCustomButton>
            </Box>
          </TableMenu>
          <div style={{width: "100%", overflow: "auto"}}>
            <CustomTable
              title={""}
              columns={dealsColumns}
              data={openDeals}
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

export default OpenDealsList;
