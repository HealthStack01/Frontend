/* eslint-disable */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";

import {Box, Grid} from "@mui/material";
//import {UserContext, ObjectContext} from "../../context";
import {ObjectContext, UserContext} from "../../../../context";
import "react-datepicker/dist/react-datepicker.css";
import {PageWrapper} from "../../../../ui/styled/styles";
import {TableMenu} from "../../../../ui/styled/global";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

import client from "../../../../feathers";

const ClaimsListComponent = ({showCreate, showDetail}) => {
  const claimsServer = client.service("claims");
  const [claims, setClaims] = useState([]);
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    showCreate();
  };

  const handleRow = claim => {
    //
  };

  const handleSearch = val => {
    //
  };

  const getClaims = useCallback(async () => {
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,

        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };

      const resp = await claimsServer.find({query: stuff});

      setClaims(resp.data);
      //console.log(resp.data);
    } else {
      if (user.stacker) {
        const resp = await claimsServer.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        setClaims(resp.data);
      }
    }
  }, []);

  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  const dummyData = [
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
    {
      healthcare_Plan: "Formal sector plan",
      hospital_name: "Creek Hospital",
      bill: "N100,000.00",
      date: "27-10-21",
      status: "Approved",
      reason: "Lorem ipsum dolor ...",
    },
  ];

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "approved":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "ongoing":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      case "declined":
        return <span style={{color: "#ED0423"}}>{status}</span>;

      case "pending":
        return <span style={{color: "#EF9645"}}>{status}</span>;

      default:
        break;
    }
  };

  const claimsColumns = [
    {
      name: "S/N",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Plan",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row.healthcare_Plan,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Hospital Name",
      key: "hospital name",
      description: "Enter Hospital Name",
      selector: row => row.hospital_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Bill For Month",
      key: "bills",
      description: "Enter bills",
      selector: row => row.bill,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Date",
      key: "date",
      description: "Enter Date",
      selector: (row, i) => row.date,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: " Status",
      key: " status",
      description: "Enter  Status",
      selector: row => row.status,
      cell: row => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    // {
    //   name: "Status",
    //   key: "bills",
    //   description: "Enter bills",
    //   selector: "status",
    //   cell: row => returnCell(row.status),
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
    {
      name: "Reason",
      key: "reason",
      description: "Enter for Request",
      selector: row => row.reason,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.status === "approved",
      style: {
        color: "red",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: row => row.status === "ongoing",
      style: {
        color: "rgba(0,0,0,.54)",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: row => row.status === "pending",
      style: {
        color: "pink",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: row => row.status === "declined",
      style: {
        color: "purple",
        backgroundColor: "green",
        "&:hover": {
          cursor: "pointer",
        },
      },
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
                List of Claims
              </h2>
            </div>
            <Box>
              {handleCreateNew && (
                <GlobalCustomButton
                  onClick={handleCreateNew}
                  color="primary"
                  text="Add Claims"
                />
              )}
            </Box>
          </TableMenu>

          <CustomTable
            title={""}
            columns={claimsColumns}
            data={dummyData}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={loading}
            //conditionalRowStyles={conditionalRowStyles}
          />
        </PageWrapper>
      </div>
    </>
  );
};

export default ClaimsListComponent;
