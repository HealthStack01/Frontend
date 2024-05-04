/* eslint-disable */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";

import {List, ListItem, Typography, IconButton} from "@mui/material";
import {Box, Grid} from "@mui/material";
//import {UserContext, ObjectContext} from "../../context";
import {ObjectContext, UserContext} from "../../../../context";
import "react-datepicker/dist/react-datepicker.css";
import {PageWrapper} from "../../../../ui/styled/styles";
import {TableMenu} from "../../../../ui/styled/global";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {DeleteOutline} from "@mui/icons-material";

import client from "../../../../feathers";
import dayjs from "dayjs";

const PreAuthsListComponent = ({showCreate, showDetail, client_id}) => {
  const preAuthServer = client.service("preauth");
  const [preAuths, setPreAuths] = useState([]);
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("submitted");
  const [total, setTotal] = useState(0);
  const limitRef =useRef(10)
  const pageRef=useRef(1) 
  const stateRef=useRef(0)
  let list=[]

  const handleCreateNew = async () => {
    showCreate();
  };

  const handleRow =async pa => {
    //return console.log(item);
//    console.log("started single item",new Date())
   const item = await preAuthServer.get(pa._id)
//console.log (item)
//console.log("finished single item",new Date())
    setState(prev => ({
      ...prev,
      PreAuthModule: {
        ...prev.PreAuthModule,
        selectedPreAuth: item,
      },
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: item.beneficiary,
      },
    }));

    showDetail();
  };

  const handleSearch = val => {
    //
  };

  const handleLoadMore = async ()=>{
    let query={}
    if (user.currentEmployee) {
      if (status==="submitted"){

   //  console.log("started",new Date())
      query = {
        "hmopayer._id": user.currentEmployee.facilityDetail._id,
        status:"Submitted",
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
        $select:['_id','createdAt','patientstate','status','totalamount','comments','services','beneficiary.lastname','beneficiary.firstname','task','sponsor.facilityName', 'provider.facilityName' ], //,,'', ,'totalamount', 'services']
       /*  $populate:[
          {
            path: 'beneficiary',
           select: ['firstname', 'lastname']
          }
        ]
 */
      };}else{

        query = {
          "hmopayer._id": user.currentEmployee.facilityDetail._id,
          status: { $ne:"Submitted"},
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
          $select:['_id','createdAt','patientstate','status','totalamount','comments','services','beneficiary.lastname','beneficiary.firstname','task','sponsor.facilityName', 'provider.facilityName' ], //,,'', ,'totalamount', 'services']
        }
       

      }

      if (client_id) {
        query = {
          "beneficiary._id": client_id,
          //"provider._id": user.currentEmployee.facilityDetail._id,

          $limit: 10,
          $sort: {
            createdAt: -1,
          },
          $select:['_id','createdAt','patientstate','status','totalamount','comments','services','beneficiary.lastname','beneficiary.firstname','task','sponsor.facilityName', 'provider.facilityName' ], //,,'', ,'totalamount', 'services']
        };
      }
      query.$skip=pageRef.current*limitRef.current

    await preAuthServer.find({query: query})
    .then((resp)=>{
      console.log(resp.data,"resp")
      list=[...preAuths,...resp.data]
      console.log(list,"list")
      stateRef.current=list.length
      setPreAuths([...preAuths,...resp.data]);

      setLoading(false);
      pageRef.current++
     
    
    })
    .catch(err=>console.log(err))
  }
  }

  const getPreAuth = async () => {
    setLoading(true);
    let query={}
    if (user.currentEmployee) {
      if (status==="submitted"){

   //  console.log("started",new Date())
      query = {
        "hmopayer._id": user.currentEmployee.facilityDetail._id,
        status:"Submitted",
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
        $select:['_id','createdAt','patientstate','status','totalamount','comments','services','beneficiary.lastname','beneficiary.firstname','task','sponsor.facilityName', 'provider.facilityName' ], //,,'', ,'totalamount', 'services']
       /*  $populate:[
          {
            path: 'beneficiary',
           select: ['firstname', 'lastname']
          }
        ]
 */
      };}else{

        query = {
          "hmopayer._id": user.currentEmployee.facilityDetail._id,
          status: { $ne:"Submitted"},
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
          $select:['_id','createdAt','patientstate','status','totalamount','comments','services','beneficiary.lastname','beneficiary.firstname','task','sponsor.facilityName', 'provider.facilityName' ], //,,'', ,'totalamount', 'services']
        }
       

      }

      if (client_id) {
        query = {
          "beneficiary._id": client_id,
          //"provider._id": user.currentEmployee.facilityDetail._id,

          $limit: 10,
          $sort: {
            createdAt: -1,
          },
          $select:['_id','createdAt','patientstate','status','totalamount','comments','services','beneficiary.lastname','beneficiary.firstname','task','sponsor.facilityName', 'provider.facilityName' ], //,,'', ,'totalamount', 'services']
        };
      }
    await  preAuthServer.find({query: query})
      .then(resp=>{
        setPreAuths(resp.data);
        setLoading(false);
        console.log(resp);
        stateRef.current=resp.data.length
        setTotal(resp.total)
      })
      .catch(err=>console.log(err))


     // const resp = await preAuthServer.find({query: query});
    //  console.log("finished",new Date())
     
      //console.log(resp.data);
    } else {
      if (user.stacker) {
        const resp = await preAuthServer.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        setPreAuths(resp.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getPreAuth();
    preAuthServer.on("created", obj =>  getPreAuth());
    preAuthServer.on("updated", obj =>  getPreAuth());
    preAuthServer.on("patched", obj =>  getPreAuth());
    preAuthServer.on("removed", obj =>  getPreAuth());
    return () => {
      preAuthServer.removeListener('created',  obj =>  getPreAuth());
      preAuthServer.removeListener('updated', obj =>  getPreAuth());
      preAuthServer.removeListener('patched',  obj =>  getPreAuth());
      preAuthServer.removeListener('removed',  obj =>  getPreAuth());
    };
  }, []);

  useEffect(() => {
    getPreAuth();
  }, [status]);



const handleDelete=(row)=>{
  let conf = window.confirm("Are you sure you want to delete this data?");

  const dleteId = row._id;
  if (conf) {
    preAuthServer.remove(dleteId)
      .then(res => {
        toast.success("Data deleted succesfully");
      
      
      })
      .catch(err => {
        // setMessage("Error deleting Client, probable network issues "+ err )
        // setError(true)
        toast.error("Error deleting Client, probable network issues or " + err);
    
      });
  }

}
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


  const handleSubmitted=()=>{
    setStatus("submitted")
  }
  const handleProcessed=()=>{
    setStatus("processed")
  }
  const preAuthColumns = [
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
      selector: row => dayjs(row?.createdAt).format("DD/MM/YYYY"),
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
          {row?.beneficiary?.firstname} {row?.beneficiary?.lastname}
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
      selector: row => row?.patientstate,
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
      selector: row => row?.comments,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Del",
      width: "50px",
      center: true,
      key: "contact_email",
      description: "Enter Date",
      selector: row => (
        <IconButton
          onClick={() => {
           handleDelete(row)
          }}
          color="error"
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
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
                List of Preauthorizations { stateRef.current}/{total}
              </h2>
            </div>
            <Box>
              {handleCreateNew && (
                <GlobalCustomButton
                  onClick={handleCreateNew}
                  color="primary"
                  text="Add New Preauthorization"
                />
              )}
            </Box>
            <GlobalCustomButton
                  onClick={handleSubmitted}
                  color="secondary"
                  text="Submitted"
                />
                <GlobalCustomButton
                  onClick={handleProcessed}
                  color="secondary"
                  text="Processed"
                />
                <div style={{display: "flex",  "justify-content": "flex-end"}}>
                <GlobalCustomButton
                  onClick={handleLoadMore}
                  color="primary"
                  text="Load More"
                />
        </div>
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
              columns={preAuthColumns}
              data={preAuths}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
              conditionalRowStyles={conditionalRowStyles}
            />
          </Box>
        </PageWrapper>
      </div>
    </>
  );
};

export default PreAuthsListComponent;
