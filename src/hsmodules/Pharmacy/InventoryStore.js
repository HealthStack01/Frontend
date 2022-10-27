/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";

import DataTable from "react-data-table-component";

import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import DatePicker from "react-datepicker";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import {ProductEntryCreate} from "./ProductEntry";

import "react-datepicker/dist/react-datepicker.css";

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import EmptyData from "./ui-components/empty";
import {InventoryStoreSchema} from "./ui-components/schema";
import styled from "styled-components";

// eslint-disable-next-line
const searchfacility = {};

export default function Inventory() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedInventory, setSelectedInventory] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Inventory  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-8 ">
          <InventoryList />
        </div>
        <div className="column is-4 ">
          {state.InventoryModule.show === "create" && <InventoryCreate />}
          {state.InventoryModule.show === "detail" && <InventoryDetail />}
          {state.InventoryModule.show === "modify" && (
            <InventoryModify Inventory={selectedInventory} />
          )}
          {state.InventoryModule.show === "reorder" && (
            <InventoryReorder Inventory={selectedInventory} />
          )}
          {state.InventoryModule.show === "batch" && (
            <InventoryBatches Inventory={selectedInventory} />
          )}
          {state.InventoryModule.show === "audit" && (
            <ProductEntryCreate Inventory={selectedInventory} />
          )}
        </div>
      </div>
    </section>
  );
}

export function InventoryCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const InventoryServ = client.service("inventory");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeInventory.FacilityId)//
    if (!user.stacker) {
      //console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    //console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    InventoryServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Inventory successfully") */
        setSuccess(true);
        toast({
          message: "Inventory created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: "Error creating Inventory " + err,
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
            Create Inventory: Product Entry- Initialization, Purchase Invoice,
            Audit
          </p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <div class="control">
                <div class="select is-small">
                  <select>
                    <option>Purchase Invoice </option>
                    <option>Initialization</option>
                    <option>Audit</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                {" "}
                {/* Audit/initialization/Purchase Invoice */}
                <input
                  className="input is-small"
                  ref={register({required: true})}
                  name="type"
                  type="text"
                  placeholder="Type of Product Entry"
                />
                <span className="icon is-small is-left">
                  <i className=" fas fa-user-md "></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  ref={register({required: true})}
                  name="supplier"
                  type="text"
                  placeholder="Supplier"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  ref={register({required: true})}
                  name="date"
                  type="text"
                  placeholder="Date"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-map-signs"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  ref={register({required: true})}
                  name="totalamount"
                  type="text"
                  placeholder=" Total Amount"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-phone-alt"></i>
                </span>
              </p>
            </div>

            {/* array of inventory items */}
            <p className="control">
              <button className="button is-info is-small  is-pulled-right">
                <span className="is-small"> +</span>
              </button>
            </p>
            <div
              className="field" /* style={ !user.stacker?{display:"none"}:{}} */
            >
              <ProductSearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
              <p className="control has-icons-left " style={{display: "none"}}>
                <input
                  className="input is-small"
                  ref={register({required: true})}
                  /* add array no */ name="productId"
                  type="text"
                  placeholder="Product Id"
                />
                <span className="icon is-small is-left">
                  <i className="fas  fa-map-marker-alt"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  ref={register({required: true})}
                  name="quantity"
                  type="text"
                  placeholder="Quantity"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
              <label className="label is-small">Base Unit</label>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  ref={register({required: true})}
                  name="costprice"
                  type="text"
                  placeholder="Cost Price"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            {/*  <div className="field">
                <div className="control has-icons-left">
                    <div className="dropdown ">
                        <div className="dropdown-trigger">
                            <input className="input is-small" ref={register({ required: true })} name="department" type="text" placeholder="Department"/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-hospital-symbol"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">
                                    simpa
                                </div>
                                <div className="dropdown-item is-active">
                                    simpa 2
                                </div>
                                <div className="dropdown-item">
                                    simpa 3
                                </div>
                                <div className="dropdown-item">
                                    simpa 4
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="deptunit" type="text" placeholder="Department Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="password" type="text" placeholder="password"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div> */}
            <div className="field">
              <p className="control">
                <button className="button is-success is-small">Create</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const CustomLoader = () => (
  <div style={{padding: "24px"}}>
    <img src="/loading.gif" width={400} />
  </div>
);

export function InventoryList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const InventoryServ = client.service("inventory");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoadidng] = useState(false);
  // eslint-disable-next-line
  const [selectedInventory, setSelectedInventory] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);

  // const store = state.StoreModule.selectedStore
  let pages = 0;
  const handleCreateNew = async () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
  };

  const handleRow = async Inventory => {
    //console.log("b4",state)

    //console.log("handlerow",Inventory)

    await setSelectedInventory(Inventory);

    const newInventoryModule = {
      selectedInventory: Inventory,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
  };

  const handleSearch = val => {
    const field = "name";
    //console.log(val)
    InventoryServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id || "",
        storeId: state.StoreModule.selectedStore._id,
        $limit: 100,
        $sort: {
          name: 1,
        },
      },
    })
      .then(res => {
        //console.log(res)
        setFacilities(res.data);
        setTotal(res.total);
        setMessage(" Inventory  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Inventory, probable network issues " + err);
        setError(true);
      });
  };

  const getInventories = async () => {
    if (user.currentEmployee) {
      if (page === 1) {
        setPage(2);
      }
      const allInventory = await InventoryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          storeId: state.StoreModule.selectedStore._id,
          $limit: limit,
          $skip: page * limit,
          $sort: {
            name: 1,
          },
        },
      });
      //console.log("this is data", allInventory)
      // await setFacilities(findInventory.data)
      // await setFacilities(prevstate=>prevstate.concat(allInventory.data))
      await setTotal(allInventory.total);

      if (allInventory.total > facilities.length) {
        await setPage(page => page++);
      }

      updatelist(allInventory.data);
      // pages++
      console.log(allInventory);
      //
      // console.log(0>0)
      // console.log(total,facilities.length)
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

  const getNewInventories = async () => {
    if (user.currentEmployee) {
      const allInventory = await InventoryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          storeId: state.StoreModule.selectedStore._id,
          $limit: 2000, //limit,
          /*  $skip:page * limit, */
          $sort: {
            name: 1,
          },
        },
      });

      // await setFacilities(findInventory.data)
      await setTotal(allInventory.total);
      await setFacilities(allInventory.data);

      if (allInventory.total > allInventory.data.length) {
        // setNext(true)
        setPage(page => page + 1);
      } else {
        //setNext(fals
      }

      // pages++
      // console.log(findProduct)
      //
      // console.log(0>0)
      // console.log(total,facilities.length)
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
    InventoryServ.on("created", obj => rest());
    InventoryServ.on("updated", obj => rest());
    InventoryServ.on("patched", obj => rest());
    InventoryServ.on("removed", obj => rest());
    return () => {};
  }, []);

  const rest = async () => {
    //console.log("starting rest")
    setPage(0);
    setTotal(0);
    getNewInventories();
    //await  setPage(0)
  };

  const updatelist = async data => {
    await setFacilities(prevdata => prevdata.concat(data));
  };

  useEffect(() => {
    rest();
    return () => {};
  }, [state.StoreModule.selectedStore]);

  useEffect(() => {
    console.log(page);
    return () => {};
  }, [page]);

  //todo: pagination and vertical scroll bar
  const handleCreate = () => {};
  const onRowClicked = () => {};

  //*******************CONDITION THAT SHOWS DIFFERENT ROW BACKGROUND COLOR BASED ON  A CERTAIN CONDITION MET************
  const conditionalRowStyles = [
    {
      when: row => row.buy,
      style: {
        backgroundColor: "pink",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const customStyles = {
    header: {
      style: {
        minHeight: "40px",
      },
    },
    headRow: {
      style: {
        background: "#2d2d2d",
        color: "#000",
        fontWeight: "bold",
        fontSize: "0.75rem",
        border: "none",
        boxShadow: "0 3px 3px 0 rgba(3,4,94,0.2)",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          border: "none",
        },
        background: "#F8F8F8",
        fontWeight: "bold",
        fontSize: "0.75rem",
        border: "none",
      },
    },
    cells: {
      style: {
        border: "none",
      },
    },
    rows: {
      style: {
        border: "none",
        background: "#F8F8F8",
        //padding: "16px",
        fontSize: "0.75rem",
        fontWeight: "500",
        fontFamily: "Manrope, sans-serif",
        display: "flex",
        alignItems: "center",
      },
      stripedStyle: {
        background: "#fff",
        border: "none",
      },
    },
  };

  return (
    <>
      {user ? (
        <>
          <PageWrapper
            style={{flexDirection: "column", padding: "0.6rem 1rem"}}
          >
            <TableMenu>
              <div style={{display: "flex", alignItems: "center"}}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  Inventory Store
                </h2>
              </div>

              {handleCreate && (
                <Button
                  style={{fontSize: "14px", fontWeight: "600"}}
                  label="Add new "
                  onClick={handleCreate}
                />
              )}
            </TableMenu>

            <div style={{width: "100%", height: "600px", overflow: "auto"}}>
              <DataTable
                title={""}
                columns={InventoryStoreSchema.filter(
                  obj => obj.selector && obj.inputType
                )}
                data={facilities.map((obj, i) => ({...obj, sn: i + 1}))} //TODO: only add sn if it's in the schema, to improve performance here
                pointerOnHover={true}
                highlightOnHover={true}
                striped={true}
                customStyles={customStyles}
                onRowClicked={onRowClicked}
                fixedHeader={true}
                selectableRows={false}
                onSelectedRowsChange={handleRow}
                fixedHeaderScrollHeight="100%"
                responsive
                dense={false}
                style={{
                  width: "100%",
                }}
                progressComponent={<CustomLoader />}
                progressPending={loading}
                noDataComponent={<EmptyData />}
                conditionalRowStyles={conditionalRowStyles}
              />
            </div>
          </PageWrapper>
          ;
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
  //console.log("selected",Inventory)

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

    //console.log(findProductEntry)
  };

  useEffect(() => {
    getFacilities();
    return () => {};
  }, [Inventory]);

  const handleEdit = async () => {
    const newInventoryModule = {
      selectedInventory: Inventory,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
  };
  const handleReorder = async () => {
    const newInventoryModule = {
      selectedInventory: Inventory,
      show: "reorder",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
  };
  const handleBatch = async () => {
    const newInventoryModule = {
      selectedInventory: Inventory,
      show: "batch",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
  };
  const handleAudit = async () => {
    const newInventoryModule = {
      selectedInventory: Inventory,
      show: "audit",
    };
    await setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
    //console.log(state)
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
            {/*  <p className="control">
                    <button className="button is-danger is-small"   onClick={handleSetPrice}>
                        Audit
                    </button>
                </p>*/}
            <p className="control">
              <button className="button is-info is-small" onClick={handleBatch}>
                Batches
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleReorder}
              >
                Reorder Level
              </button>
            </p>
            <p className="control">
              <button
                className="button is-danger is-small"
                onClick={handleAudit}
              >
                Audit
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
    //console.log(contractSel,service)
  };

  useEffect(() => {
    handleSetPrice();

    return () => {};
  }, []);

  const handleCancel = async () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: "details",
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
    //console.log(data)
    // data.facility=Inventory.facility
    //console.log(data);
    const contractSel = billservice.contracts.filter(
      element =>
        element.source_org === Inventory.facility &&
        element.dest_org === Inventory.facility
    );
    contractSel[0].price = data.price;
    billServ
      .patch(billservice._id, billservice)
      .then(res => {
        //console.log(JSON.stringify(res))
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
                    ref={register({required: true})}
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
                    ref={register({required: true})}
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

export function InventoryReorder() {
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
  // console.log(Inventory)

  useEffect(() => {
    setValue("reorder_level", Inventory.reorder_level, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("oldlevel", Inventory.reorder_level, {
      shouldValidate: true,
      shouldDirty: true,
    });

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

  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    InventoryServ.patch(Inventory._id, {
      reorder_level: data.reorder_level,
    })
      .then(res => {
        toast({
          message: "Reorder level updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        toast({
          message:
            "Error updating Reorder level, probable network issues or " + err,
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
            Set ReOrder Level for {Inventory.name}{" "}
            {/* per {Inventory.baseunit} */}
          </p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                {" "}
                New Reorder Level
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    ref={register({required: true})}
                    name="reorder_level"
                    type="text"
                    placeholder="New Reorder Level"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Old Reorder Level
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    ref={register()}
                    disabled
                    name="oldlevel"
                    type="text"
                    placeholder="Old Reorder Level"
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

export function InventoryBatches() {
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
  const [batchNo, setBatchNo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirydate, setExpiryDate] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [productItem, setProductItem] = useState([]);

  const Inventory = state.InventoryModule.selectedInventory; // set inventory
  // setProductItem(Inventory.batches)
  // console.log(Inventory)
  //

  useEffect(() => {
    setProductItem(Inventory.batches);

    return () => {};
  }, []);

  const handleClickProd = async () => {
    if (!batchNo || !quantity || !expirydate) {
      toast({
        message: "Kindly enter Batch Number,expiry date and quantity",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    let productItemI = {
      batchNo,
      expirydate,
      quantity,
    };
    //  await setSuccess(false)
    setProductItem(prevProd => prevProd.concat(productItemI));
    setBatchNo("");
    setQuantity("");
    setExpiryDate("");
    // await setSuccess(true)
    // setBaseunit("")
    // console.log(success)
    //  console.log(productItem)
  };

  const handleCancel = async () => {
    const newInventoryModule = {
      selectedInventory: {},
      show: "details",
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
      show: "details",
    };
    setState(prevstate => ({
      ...prevstate,
      InventoryModule: newInventoryModule,
    }));
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    InventoryServ.patch(Inventory._id, {
      batches: productItem,
    })
      .then(res => {
        toast({
          message: "Batch updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        toast({
          message: "Error updating Batch, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const handleBatchdel = (obj, i) => {
    let confirm = window.confirm("Are you sure you want to delete this batch?");
    if (confirm) {
      // setProductItem(prev=>prev.filter((obj,index)=>index!==i ))
      setProductItem(obj => obj.filter((el, index) => index !== i));
    }
  };

  return (
    <>
      <div className="card  card-overflow">
        <div className="card-header">
          <p className="card-header-title">
            Batches for {Inventory.name} {/* per {Inventory.baseunit} */}
          </p>
        </div>
        <div className="card-content vscrollable">
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <p className="control ">
                  <input
                    className="input is-small"
                    /* ref={register({ required: true })} */ name="batchNo"
                    value={batchNo}
                    type="text"
                    onChange={e => setBatchNo(e.target.value)}
                    placeholder="Batch Number"
                  />
                  {/* <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span> has-icons-left */}
                </p>
              </div>
              <div className="field">
                <DatePicker
                  selected={expirydate}
                  onChange={date => setExpiryDate(date)}
                  dateFormat="MM/yyyy"
                  placeholderText="Expiry Date"
                  /*  isClearable */
                />
              </div>
              <div className="field">
                <p className="control ">
                  <input
                    className="input is-small"
                    /* ref={register({ required: true })} */ name="quantity"
                    value={quantity}
                    type="text"
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Quantity"
                  />
                  {/* <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span> has-icons-left */}
                </p>
                <label>{Inventory.baseunit}</label>
              </div>

              <div className="field">
                <p className="control">
                  <button className="button is-info is-small  is-pulled-right minHt">
                    <span className="is-small" onClick={handleClickProd}>
                      {" "}
                      +
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div>
            <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>
                  <th>
                    <abbr title="Batch">Batch</abbr>
                  </th>
                  <th>
                    <abbr title="Quantity">Quantity</abbr>
                  </th>
                  <th>Expiry Date</th>
                  {/*<th><abbr title="Document No">Document No</abbr></th>
                                        <th><abbr title="Total Amount">Total Amount</abbr></th>
                                         <th><abbr title="Enteredby">Entered By</abbr></th> */}
                  <th>
                    <abbr title="Actions">Actions</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {productItem.map((ProductEntry, i) => (
                  <tr
                    key={i}
                    style={{backgroundColor: ProductEntry.expiry ? "red" : ""}}
                  >
                    <th>{i + 1}</th>
                    <td>{ProductEntry.batchNo}</td>
                    <td>{ProductEntry.quantity}</td>
                    <th>
                      {ProductEntry.expirydate ? (
                        <>
                          {format(new Date(ProductEntry.expirydate), "MM-yyyy")}
                        </>
                      ) : (
                        ""
                      )}
                    </th>
                    {/*<td>{ProductEntry.documentNo}</td>
                                            <td>{ProductEntry.totalamount}</td>
                                             <td>{ProductEntry.enteredby}</td> */}
                    <td onClick={() => handleBatchdel(ProductEntry, i)}>
                      <span className="showAction">x</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
    //console.log(state)
  };
  const handleBlur = async e => {
    /*  if (count===2){
            // console.log("stuff was chosen")
         } */
    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
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
          //console.log("facility  fetched successfully")
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      //console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
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
