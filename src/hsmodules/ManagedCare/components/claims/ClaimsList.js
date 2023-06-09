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

const ClaimsListComponent = ({showCreate, showDetail, client_id}) => {
  const claimsServer = client.service("claims");
  const [claims, setClaims] = useState([]);
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    showCreate();
  };

  const handleRow = claim => {
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

  // const getClaims = useCallback(async () => {
  //   setLoading(true);
  //   if (user.currentEmployee) {
  //     let query = {
  //       "services._id": user.currentEmployee.facilityDetail._id,

  //       $limit: 100,
  //       $sort: {
  //         createdAt: -1,
  //       },
  //     };

  //     if (client_id) {
  //       query = {
  //         "beneficiary._id": client_id,
  //         "provider._id": user.currentEmployee.facilityDetail._id,

  //         $limit: 100,
  //         $sort: {
  //           createdAt: -1,
  //         },
  //       };
  //     }

  //     const response = await claimsServer.find({query: query});
  //     setClaims(response.data);
  //     setLoading(false);
  //   } else {
  //     if (user.stacker) {
  //       const response = await claimsServer.find({
  //         query: {
  //           $limit: 100,
  //           $sort: {
  //             createdAt: -1,
  //           },
  //         },
  //       });

  //       setClaims(resp.data);
  //       setLoading(false);
  //     }
  //   }
  // }, []);

  // const getClaims = useCallback(async () => {
  //   setLoading(true);
  
  //   let query = {
  //     "beneficiary._id": client_id,
  //     $sort: {
  //       createdAt: -1,
  //     },
  //     $limit: 100,
  //   };
  
  //   if (user.currentEmployee) {
  //     query["provider._id"] = user.currentEmployee.facilityDetail._id;
  //   }
  
  //   try {
  //     const response = await claimsServer.find({ query });
  
  //     if (response && response.data) {
  //       setClaims(response.data);
  //     }
  
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [client_id, user.currentEmployee]);
  
  const getClaims = useCallback(async () => {
    setLoading(true);
    if (user.currentEmployee) {
      let query = {
        "hmopayer._id": user.currentEmployee.facilityDetail._id,
        "beneficiary._id": client_id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
  
      const response = await claimsServer.find({query: query});
      setClaims(response.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const response = await claimsServer.find({
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
  }, [user.currentEmployee, user.stacker, client_id]);
  
  

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
      name: "Sponsor",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row?.sponsor?.facilityDetail?.facilityName,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    
    {
      name: "Provider",
      key: "hospital name",
      description: "Enter Hospital Name",
      selector: row => row?.provider?.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
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
      name: "Task",
      key: "status",
      description: "Enter  Status",
      selector: row => (row?.task?.length > 0 ? row.task[0].title : ""),
      //cell: row => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Assigned To",
      key: "status",
      description: "Enter  Status",
      selector: row =>
        row?.task?.length > 0
          ? `${row.task[0].employee.firstname} ${row.task[0].employee.lastname}`
          : "",
      //cell: row => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Num of Services",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",

      selector: row => row.services.length,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
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
    {
      name: "Comments",
      key: "reason",
      description: "Enter for Request",
      selector: row => row.comments,
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
            {/* <Box>
              {handleCreateNew && (
                <GlobalCustomButton
                  onClick={handleCreateNew}
                  color="primary"
                  text="Add Claims"
                />
              )}
            </Box> */}
          </TableMenu>

          <Box
            sx={{
              width: "100%",
              height: "calc(100vh - 180px)",
              overflowY: "auto",
            }}
          >
            <CustomTable
              title={""}
              columns={claimsColumns}
              data={claims}
              pointerOnHover
              highlightOnHover
              striped
              // onRowClicked={handleRow}
              progressPending={loading}
              //conditionalRowStyles={conditionalRowStyles}
            />
          </Box>
        </PageWrapper>
      </div>
    </>
  );
};

export default ClaimsListComponent;
