/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import CustomTable from "../../components/customtable";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import FacilityAccount from "./FacilityAccount";
import ModalBox from "../../components/modal";
import CloseIcon from "@mui/icons-material/Close";
import {Box, IconButton, Button as MuiButton, Typography} from "@mui/material";
import {TransactionsList} from "./Transactions";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// eslint-disable-next-line
const searchfacility = {};

export default function Collections() {
  const {state} = useContext(ObjectContext); //,setState
  const [currentScreen, setCurrentScreen] = useState("lists");

  return (
    <Box>
      {currentScreen === "lists" && (
        <CollectionList
          showTransactions={() => setCurrentScreen("transactions")}
        />
      )}

      {currentScreen === "transactions" && (
        <ClientAccount handleGoBack={() => setCurrentScreen("lists")} />
      )}
    </Box>
  );
}

export function ClientAccount({handleGoBack, isModal}) {
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

  console.log("Selected Client", clientSel);

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
    InventoryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        client: clientSel.client ? clientSel.client : clientSel._id,
        // storeId:state.StoreModule.selectedStore._id,
        // category:"credit",

        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        //console.log(res);
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
        client: clientSel.client,
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
        {!isModal && (
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon fontSize="small" sx={{marginRight: "5px"}} />
            Back
          </GlobalCustomButton>
        )}

        <Typography
          sx={{
            textTransform: "capitalize",
            fontWeight: "700",
            color: "#0364FF",
          }}
          onClick={() => console.log(user.currentEmployee.facilityDetail._id)}
        >
          Transaction History for {facility[0]?.fromName}
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
        <TransactionsList isModal={isModal} />
      </Box>
    </Box>
  );
}

export function CollectionList({showTransactions}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const InventoryServ = client.service("subwallettransactions");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedInventory, setSelectedInventory] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    ////console.log(state)
  };

  const handleRow = async Inventory => {
    ////console.log("b4",state)

    ////console.log("handlerow",Inventory)

    //console.log(Inventory);

    await setSelectedInventory(Inventory);

    const newInventoryModule = {
      client: Inventory,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      SelectedClient: newInventoryModule,
    }));
    ////console.log(state)
    showTransactions();
  };

  const handleSearch = val => {
    const field = "fromName";
    //console.log(val);
    InventoryServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        ////console.log(res)
        setFacilities(res.data);
      })
      .catch(err => {
        //console.log(err);
        toast({
          message: "Error during search " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const DAY_MS = 30 * 24 * 60 * 60 * 1000;
      const findInventory = await InventoryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          // storeId:state.StoreModule.selectedStore._id,
          category: "credit",
          createdAt: {
            $gt: new Date().getTime() - DAY_MS, //last 30days
          },
          $sort: {
            createdAt: -1,
          },
        },
      });
      ////console.log(user);

      await setFacilities(findInventory.data);
    } else {
      if (user.stacker) {
        const findInventory = await InventoryServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findInventory.data);
      }
    }
  };

  useEffect(() => {
    //console.log(facilities);
    //getFacilities(user)

    return () => {};
  }, [facilities]);

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
    }
    InventoryServ.on("created", obj => getFacilities());
    InventoryServ.on("updated", obj => getFacilities());
    InventoryServ.on("patched", obj => getFacilities());
    InventoryServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  useEffect(() => {
    getFacilities();
    return () => {};
  }, [state.StoreModule.selectedStore]);

  //todo: pagination and vertical scroll bar

  const CollectionSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Date",
      key: "createdAt",
      description: "Enter Date",
      selector: row => format(new Date(row.createdAt), "dd-MM-yy HH:mm"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },

    {
      name: "Client Name",
      key: "fromName",
      description: "Client Name",
      selector: row => row.fromName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Amount",
      key: "amount",
      description: "Amount",
      selector: row => row.amount,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Mode",
      key: "paymentMode",
      description: "Enter Payment Mode",
      selector: row => row.paymentmode,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  return (
    <>
      {user ? (
        <>
          <PageWrapper
            style={{
              flexDirection: "column",
              padding: "0.6rem 1rem",
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
                  Collection in last 30days
                </h2>
              </div>
            </TableMenu>

            <div
              style={{
                width: "100%",
                height: "calc(100% - 180px)",
                overflow: "auto",
              }}
            >
              <CustomTable
                title={""}
                columns={CollectionSchema}
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

export function InventoryDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const InventoryServ=client.service('/Inventory')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext); //,setUser

  const Inventory = state.InventoryModule.selectedInventory;
  //console.log("selected", Inventory);

  const getFacilities = async () => {
    const findProductEntry = await client.service("productentry").find({
      query: {
        "productitems.productId": Inventory.productId,
        facility: user.currentEmployee.facilityDetail._id,
        storeId: state.StoreModule.selectedStore._id,
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    });

    //console.log(findProductEntry);
  };

  useEffect(() => {
    getFacilities();
    return () => {};
  }, [Inventory]);
  /* await setFacilities(findProductEntry.data)
        }
        else {
            if (user.stacker){ */
  /* toast({
                    message: 'You do not qualify to view this',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  }) 
                  return */
  /*  const findProductEntry= await ProductEntryServ.find(
                    {query: {
                        
                        $limit:20,
                        $sort: {
                            createdAt: -1
                        }
                        }})
    
            await setFacilities(findProductEntry.data)

            }
        }  */
  /*   .then((res)=>{
        //console.log(res)
            setFacilities(res.data)
            setMessage(" ProductEntry  fetched successfully")
            setSuccess(true)
        })
        .catch((err)=>{
            setMessage("Error creating ProductEntry, probable network issues "+ err )
            setError(true)
        }) */

  const handleEdit = async () => {
    const newInventoryModule = {
      selectedInventory: Inventory,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    ////console.log(state)
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Inventory Details</p>
        </div>
        <div className="card-content vscrollable">
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="label is-small">
                    {" "}
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                    Product Name:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    <strong> {Inventory.name} </strong>
                  </span>
                </td>
              </tr>
              {/*  <tr>
                    <td>
                <label className="label is-small"><span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>Inventory Type:
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft"   name="InventoryType">{Inventory.InventoryType} </span> 
                    </td>
                </tr> */}
            </tbody>
          </table>

          <div className="field mt-2 is-grouped">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Set Price
              </button>
            </p>
            <p className="control">
              <button
                className="button is-danger is-small" /*  onClick={handleSetPrice} */
              >
                Audit
              </button>
            </p>
            <p className="control">
              <button
                className="button is-info is-small" /* onClick={handleEdit} */
              >
                Transaction History
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small" /* onClick={handleEdit} */
              >
                Reorder Level
              </button>
            </p>
          </div>
          {error && <div className="message"> {message}</div>}
        </div>
      </div>
    </>
  );
}

export function InventoryModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const [billservice, setBillService] = useState();
  // eslint-disable-next-line
  const InventoryServ = client.service("inventory");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const billServ = client.service("billing");

  const Inventory = state.InventoryModule.selectedInventory; // set inventory
  const handleSetPrice = async () => {
    const service = await billServ.get(Inventory.billingId); // get the service
    const contractSel = service.contracts.filter(
      element =>
        element.source_org === Inventory.facility &&
        element.dest_org === Inventory.facility
    );

    setValue("price", contractSel[0].price, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("oldprice", contractSel[0].price, {
      shouldValidate: true,
      shouldDirty: true,
    });
    await setBillService(service);
    //console.log(contractSel, service);
  };

  useEffect(() => {
    handleSetPrice();

    return () => {};
  }, []);

  const handleCancel = async () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    ////console.log(state)
  };

  const changeState = () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: "detail",
    };
    setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
  };

  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Inventory._id;
    if (conf) {
      InventoryServ.remove(dleteId)
        .then(res => {
          ////console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Inventory successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Inventory deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Inventory, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              "Error deleting Inventory, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    //console.log(data);
    // data.facility=Inventory.facility
    ////console.log(data);
    const contractSel = billservice.contracts.filter(
      element =>
        element.source_org === Inventory.facility &&
        element.dest_org === Inventory.facility
    );
    contractSel[0].price = data.price;
    billServ
      .patch(billservice._id, billservice)
      .then(res => {
        ////console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Inventory successfully")
        toast({
          message: "Price updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Inventory, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Price, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">
            Set Price for {Inventory.name} per {Inventory.baseunit}
          </p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                {" "}
                New Selling Price
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    {...register("x", {required: true})}
                    name="price"
                    type="text"
                    placeholder="Name"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Old Price
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    {...register("x", {required: true})}
                    disabled
                    name="oldprice"
                    type="text"
                    placeholder="Inventory Type"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </label>
            </div>
          </form>

          <div className="field  is-grouped mt-2">
            <p className="control">
              <button
                type="submit"
                className="button is-success is-small"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </p>
            {/*  <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductSearch({getSearchfacility, clear}) {
  const facilityServ = client.service("products");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    ////console.log(state)
  };
  const handleBlur = async e => {
    if (count === 2) {
      //console.log("stuff was chosen");
    }

    /*  //console.log("blur")
         setShowPanel(false)
        //console.log(JSON.stringify(simpa))
        if (simpa===""){
            //console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        //console.log(facilities.length)
        //console.log(inputEl.current) */
  };
  const handleSearch = async val => {
    const field = "name"; //field variable

    if (val.length >= 3) {
      facilityServ
        .find({
          query: {
            //service
            [field]: {
              $regex: val,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          //console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          //console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      //console.log("less than 3 ");
      //console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Product"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
