import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {UserContext, ObjectContext} from "../../context";
import "react-datepicker/dist/react-datepicker.css";
import {v4 as uuidv4} from "uuid";

import dayjs from "dayjs";

import FilterMenu from "../../components/utilities/FilterMenu";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import {Box, Typography} from "@mui/material";
import CustomTable from "../../components/customtable";
import {ClientMiniSchema} from "../Client/schema";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {TransactionsList} from "./Transactions";

const ClientTransactions = () => {
  const [currentScreen, setCurrentScreen] = useState("lists");
  return (
    <Box>
      {currentScreen === "lists" && (
        <TransactionClientList
          showTransactions={() => setCurrentScreen("transactions")}
        />
      )}

      {currentScreen === "transactions" && (
        <TransactionClientAccount
          handleGoBack={() => setCurrentScreen("lists")}
        />
      )}
    </Box>
  );
};

export default ClientTransactions;

/* eslint-disable */

export function TransactionClientList({showTransactions}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("client");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  // const { user, setUser } = useContext(UserContext);

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  // end
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [selectedUser, setSelectedUser] = useState();
  const [open, setOpen] = useState(false);

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    openCreateModal(true);
    //console.log(state)
  };

  const handleRow = async Client => {
    //return console.log(Client);
    await setSelectedClient(Client);

    const newInventoryModule = {
      client: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      SelectedClient: newInventoryModule,
    }));

    //await setOpen(true);
    showTransactions();
  };

  const handleSearch = val => {
    // eslint-disable-next-line
    const field = "firstname";
    //console.log(val);
    ClientServ.find({
      query: {
        $or: [
          {
            firstname: {
              $regex: val,
              $options: "i",
            },
          },
          {
            lastname: {
              $regex: val,
              $options: "i",
            },
          },
          {
            middlename: {
              $regex: val,
              $options: "i",
            },
          },
          {
            phone: {
              $regex: val,
              $options: "i",
            },
          },
          {
            clientTags: {
              $regex: val,
              $options: "i",
            },
          },
          {
            mrn: {
              $regex: val,
              $options: "i",
            },
          },
          {
            email: {
              $regex: val,
              $options: "i",
            },
          },
          {
            specificDetails: {
              $regex: val,
              $options: "i",
            },
          },
          {gender: val},
        ],

        "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findClient = await ClientServ.find({
        query: {
          "relatedfacilities.facility": user.currentEmployee.facilityDetail._id,
          $limit: limit,
          $skip: page * limit,
          $sort: {
            createdAt: -1,
          },
        },
      });
      if (page === 0) {
        await setFacilities(findClient.data);
      } else {
        await setFacilities(prevstate => prevstate.concat(findClient.data));
      }

      await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
      setPage(page => page + 1);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      //getFacilities()
      rest();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }

    ClientServ.on("created", obj => rest());
    ClientServ.on("updated", obj => rest());
    ClientServ.on("patched", obj => rest());
    ClientServ.on("removed", obj => rest());

    return () => {};
    // eslint-disable-next-line
  }, []);
  const rest = async () => {
    // console.log("starting rest")
    // await setRestful(true)
    await setPage(0);
    //await  setLimit(2)
    await setTotal(0);
    await setFacilities([]);
    await getFacilities();
    //await  setPage(0)
    //  await setRestful(false)
  };
  useEffect(() => {
    //console.log(facilities)
    return () => {};
  }, [facilities]);
  //todo: pagination and vertical scroll bar

  // create user form

  return (
    <>
      {user ? (
        <>
          <PageWrapper
            style={{
              flexDirection: "column",
              padding: "0.6rem 0.5rem",
              height: "100%",
            }}
          >
            <TableMenu>
              <div style={{display: "flex", alignItems: "center"}}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}

                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  List of Clients
                </h2>
              </div>
            </TableMenu>

            <div
              style={{
                width: "100%",
                height: "calc(100vh - 200px)",
                overflow: "auto",
              }}
            >
              <CustomTable
                title={""}
                columns={ClientMiniSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={loading}
              />
            </div>
          </PageWrapper>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function TransactionClientAccount({handleGoBack}) {
  // eslint-disable-next-line
  const [facility, setFacility] = useState([]);
  const InventoryServ = client.service("subwallettransactions");
  const SubwalletServ = client.service("subwallet");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [balance, setBalance] = useState(0);

  const clientSel = state.SelectedClient.client;

  //console.log("Selected Client", clientSel);

  useEffect(() => {
    setCurrentUser(user);
    ////console.log(currentUser)
    return () => {};
  }, [user]);

  useEffect(() => {
    getaccountdetails();
    getBalance();
    return () => {};
  }, [clientSel]);

  const getaccountdetails = () => {
    //console.log("getting account");
    InventoryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        client: clientSel._id,
        // storeId:state.StoreModule.selectedStore._id,
        // category:"credit",

        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log("respone", res);
        setFacility(res.data);
        //e.target.reset();
        /*  setMessage("Created Inventory successfully") */
        // setSuccess(true)
        toast({
          message: "Account details succesful",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        // setSuccess(false)
      })
      .catch(err => {
        toast({
          message: "Error getting account details " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const getBalance = async () => {
    const findProductEntry = await SubwalletServ.find({
      query: {
        client: clientSel._id,
        organization: user.currentEmployee.facilityDetail._id,
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });
    //console.log(findProductEntry);

    // //console.log("balance", findProductEntry.data[0].amount)
    if (findProductEntry.data.length > 0) {
      await setBalance(findProductEntry.data[0].amount);
    } else {
      await setBalance(0);
    }

    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };

  return (
    <Box
      container
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
        }}
        p={2}
      >
        <GlobalCustomButton onClick={handleGoBack}>
          <ArrowBackIcon fontSize="small" sx={{marginRight: "5px"}} />
          Back
        </GlobalCustomButton>

        <Typography
          sx={{
            textTransform: "capitalize",
            fontWeight: "700",
            color: "#0364FF",
          }}
          onClick={() => console.log(facility)}
        >
          {`Transaction History for ${
            facility.length > 0
              ? facility[0]?.fromName
              : `${clientSel?.firstname} ${clientSel?.lastname}`
          }`}
        </Typography>

        <Box
          style={{
            minWidth: "200px",
            height: "40px",
            border: "1px solid #E5E5E5",
            display: "flex",
            //flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 7px",
          }}
          gap={1.5}
        >
          <Typography
            sx={{
              color: "#000000",
              fontSize: "14px",
              lineHeight: "21.86px",
            }}
          >
            Account Balance
          </Typography>

          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "20px",
              color: "#0364FF",
            }}
          >
            <span>&#8358;</span>
            {balance}
          </Typography>
        </Box>
      </Box>

      <Box mb={2} p={2}>
        <TransactionsList />
      </Box>
    </Box>
  );
}
