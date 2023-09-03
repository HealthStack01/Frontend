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
import ModalBox from "../../../../components/modal";
import client from "../../../../feathers";
import dayjs from "dayjs";
import AssignClaimGroup from "./AssignClaimGroup";
import AddBoxIcon from "@mui/icons-material/AddBox";

const ClaimsListComponent = ({
  showCreate,
  showDetail,
  client_id,
  beneficiary,
  corporate,
}) => {
  const claimsServer = client.service("claims");
  const [claims, setClaims] = useState([]);
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [hold, setHold] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState();
  const [claimType, setClaimType] = useState("New Claims");
  const [providerGroup, setProviderGroup] = useState([]);
  const provider=useRef(false)
  const [assignModal, setAssignModal] = useState(false);

  const handleCreateNew = async () => {
    showCreate();
  };

  const assigncomplete=()=>{
    setChosen([])
    provider.current=false
  }
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

  const handleChoseClient=(e,row)=>{
    console.log(e)
    if (e.target.checked){
      let newarray= chosen.concat(row)
    setChosen(newarray)
    console.log(newarray)
    
    }else{
      let newarray=chosen.filter(el=>el._id!==row._id)
      setChosen(newarray)
      console.log(newarray)
    }

    setState(prev=>(
      {
        ...prev,
        selectedClaims:chosen
      }
    ))
   
  }

  const handlegroup=(facility)=>{
    setSelectedFacility(facility)
    //console.log(facility._id)

  }

  const handleProvider=()=>{
    //console.log(claims)
    let providers=[]
    provider.current=!provider.current
    setHold(claims)

    if(provider.current){
      const uniqueArr = [...new Set(claims.map(data => data.provider._id))];
     // toast.success("provider is currnet")
      uniqueArr.forEach(el=>{
           let prov= claims.find(item=>item.provider._id===el) 
           //console.log("prov",prov)
          let simpa= claims.filter(item=>item.provider._id===el)
          prov.provider.claims=simpa
           providers=[...providers, prov.provider]
        setProviderGroup(providers)
     }) 
     //console.log("facilities",uniqueArr)
     //console.log("providers",providers)
     setClaimType("Grouped")
    }else{
      setClaimType("New Claims")
      setFacilities(hold)

    }
    


  }

  const getClaims = useCallback(async () => {
    setLoading(true);
    if (user.currentEmployee) {
      let query = {
        $or: [
          {"provider._id": user.currentEmployee.facilityDetail._id},
          {"hmopayer._id": user.currentEmployee.facilityDetail._id},
        ],
        // $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };

      if (client_id) {
        query = {
          "beneficiary._id": client_id,
          $or: [
            {"provider._id": user.currentEmployee.facilityDetail._id},
            {"hmopayer._id": user.currentEmployee.facilityDetail._id},
          ],
          //$limit: 100,
          $sort: {
            createdAt: -1,
          },
        };
      }

      if (corporate) {
        query = {
          "provider._id": user.currentEmployee.facilityDetail._id,
          $or: [
            {"sponsor.facilityName": corporate.facilityName},
            {"sponsor._id": corporate._id},
            {"hmopayer._id": corporate._id},
          ],
          //$limit: 100,
          $sort: {
            createdAt: -1,
          },
        };
      }

      const resp = await claimsServer.find({query: query});

      setClaims(resp.data);
      setLoading(false);
      //console.log(resp);
      
      ////console.log(resp.data);
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
      key: "sn",
      description: "Enter name of employee",
      selector: (row, i) =>(
        <div style={{display: "flex", alignItems: "center"}}>
   { provider.current &&    <input
          type="checkbox"
          //name={order._id}
          style={{marginRight: "3px"}}
         onChange={e => handleChoseClient(e,row)}
         checked={row.chosen}
        />}
        {i+1}
        </div>
      ),
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },,
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
    // {
    //   name: "Type",
    //   key: "healthcare plan",
    //   description: "Enter name of Healthcare Plan",
    //   selector: row => row?.claimtype,
    //   sortable: true,
    //   required: true,
    //   inputType: "HIDDEN",
    // },
    {
      name: "Sponsor",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row?.sponsor?.facilityDetail?.facilityName,
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

  const providerColumns = [
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
      name: "Provider Name",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.facilityName} 
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
      name: "Type",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row.facilityType,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
 
    {
      name: "City",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row.facilityCity,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "State",
      key: "healthcare plan",
      description: "Enter name of Healthcare Plan",
      selector: row => row.facilityState,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "100px",
      style: {
        textTransform: "capitalize",
      },
    },
   

    {
      name: "No of Claims",
      key: "status",
      description: "Enter  Status",
      selector: row => row?.claims.length,
      //cell: row => returnCell(row.status),
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
  const conditionalRowStyles2 = [
    {
      when: row => row._id ===selectedFacility?._id,
      style: {
        backgroundColor:"pink",
        color: "red",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  /*   {
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
    }, */
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
                <GlobalCustomButton onClick={handleProvider}>
                  {provider.current?"Ungroup":"Group by Provider"}
                </GlobalCustomButton>
              </Box>
             {  (chosen.length>0) &&<>
              <GlobalCustomButton
                color="info"
                onClick={() => setAssignModal(true)}
              >
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Assign Claim
              </GlobalCustomButton>
              </>}
              {/* <GlobalCustomButton onClick={handleCreateNew}>
                 New Claims
                </GlobalCustomButton>
                <GlobalCustomButton onClick={handleCreateNew}>
                  Claims in Progress
                </GlobalCustomButton>

                <GlobalCustomButton onClick={handleCreateNew}>
                 Vetted Claims
                </GlobalCustomButton> */}

            {!corporate && (
              <Box>
                <GlobalCustomButton onClick={handleCreateNew}>
                  Add New Claim
                </GlobalCustomButton>
              </Box>

            )}
           
             
          </TableMenu>
          {(claimType==="New Claims")  && 
          <Box
            sx={{
              width: "100%",
              height: beneficiary
                ? "calc(100vh - 220px)"
                : "calc(100vh - 140px)",
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
              onRowClicked={handleRow}
              progressPending={loading}
              //conditionalRowStyles={conditionalRowStyles}
            />
            </Box>
            }
            {(claimType==="Grouped")  &&  
               <div
               className="columns"
               style={{
                 display: "flex",
                 width: "100%",
                 //flex: "1",
                 justifyContent: "space-between",
               }}
             >
             <div
               style={{
                 width: selectedFacility?.claims.length>0 ? "40%" : "100%",
                 height: "calc(100vh - 170px)",
                 overflow: "auto",
               }}
             >
               <CustomTable
              title={"List of Providers"}
              columns={providerColumns}
              data={providerGroup}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handlegroup}
              progressPending={loading}
              conditionalRowStyles={conditionalRowStyles2 }
            />
             </div>
          { selectedFacility?.claims.length>0 &&  <div
               style={{
                 width: "59.5%",
                 height: "calc(100vh - 10px)",
                 overflow: "auto",
               }}
             >
               <CustomTable
                 title={"Claims of Selected Provider"}
                 columns={claimsColumns}
                 data={selectedFacility.claims}
                 pointerOnHover
                 highlightOnHover
                 striped
                onRowClicked={handleRow}
                 progressPending={loading}
               />
             </div>}
            </div>   
             
             }
          
        </PageWrapper>
      </div>
      <ModalBox
        open={assignModal}
        onClose={() => setAssignModal(false)}
        header="Assign Claim to a User"
      >
        <AssignClaimGroup claims={chosen} closeModal={() => setAssignModal(false)}  assigncomplete={assigncomplete}/>
      </ModalBox>
    </>
  );
};

export default ClaimsListComponent;
