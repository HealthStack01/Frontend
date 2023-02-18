/* eslint-disable */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";

import {List, ListItem, Typography} from "@mui/material";
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
import dayjs from "dayjs";

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
    console.log(claim);
    setState(prev => ({
      ...prev,
      ClaimsModule: {
        ...prev.ClaimsModule,
        selectedClaim: claim,
      },
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: claim.beneficiary,
      },
    }));

    showDetail();
  };

  const handleSearch = val => {
    //
  };

  const getClaims = useCallback(async () => {
    setLoading(true);
    if (user.currentEmployee) {
      let query = {
        //facility: user.currentEmployee.facilityDetail._id,

        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };

      const resp = await claimsServer.find({query: query});

      setClaims(resp.data);
      setLoading(false);
      console.log(resp);
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
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    getClaims();
  }, [getClaims]);

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
      name: "Date",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => dayjs(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "100px",
    },
    {
      name: "Patient Name",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.beneficiary.firstname} {row.beneficiary.lastname}
        </Typography>
      ),
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "State",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row.patientstate,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "100px",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Type",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row?.claimtype,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Sponsor",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row.sponsor.facilityDetail.facilityName,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    // {
    //   name: "Plan",
    //   key: "healthcare plan",
    //   description: "Enter name of Healthcare Plan",
    //   selector: row => row?.healthcare_Plan,
    //   sortable: true,
    //   required: true,
    //   inputType: "HIDDEN",
    // },
    {
      name: "Provider",
      key: "hospital name",
      description: "Enter Hospital Name",
      selector: row => row?.provider.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Num of Services",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      // selector: row => (
      //   <List
      //     data-tag="allowRowEvents"
      //     sx={{
      //       listStyleType: "disc",
      //       pl: 2,
      //       "& .MuiListItem-root": {
      //         display: "list-item",
      //       },
      //     }}
      //   >
      //     {row.services.map(item => (
      //       <ListItem sx={{fontSize: "0.8rem", whiteSpace: "normal"}}>
      //         {item.service.serviceName} - ₦{item.amount}
      //       </ListItem>
      //     ))}
      //   </List>
      // ),
      selector: row => row.services.length,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Status",
      key: "status",
      description: "Enter  Status",
      selector: row => row?.status,
      //cell: row => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Comments",
      key: "reason",
      description: "Enter for Request",
      selector: row => row.comments,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Total Amount",
      key: "bills",
      description: "Enter bills",
      selector: row => `₦${row?.totalamount}`,
      //cell: row => returnCell(row?.totalamount),
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
            data={claims}
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
