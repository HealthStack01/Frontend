/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DataTable from "react-data-table-component";

import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import DatePicker from "react-datepicker";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import {ProductEntryCreate} from "./ProductEntry";

import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "../../components/modal";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import EmptyData from "../../components/empty";
import {InventoryStoreSchema} from "./schema";
import styled from "styled-components";
import Input from "../../components/inputs/basic/Input";
import {Box, Grid, Typography} from "@mui/material";
import MuiButton from "@mui/material/Button";
import BasicDatePicker from "../../components/inputs/Date";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {customStyles} from "../../components/customtable/styles";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";

// eslint-disable-next-line
const searchfacility = {};

export default function Inventory() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedInventory, setSelectedInventory] = useState();
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const [reorderModal, setRedorderModal] = useState(false);
  const [batchModal, setBatchModal] = useState(false);
  const [auditModal, setAuditModal] = useState(false);
  //const [showState,setShowState]=useState() //create|modify|detail

  const handleCreateModal = () => {
    setCreateModal(true);
  };
  const handleHideCreateModal = () => {
    setCreateModal(false);
  };

  const handleOpenDetailModal = () => {
    setDetailModal(true);
  };

  const handleOpenModals = type => {
    switch (type) {
      case "modify":
        setModifyModal(true);
        break;

      case "reorder":
        setRedorderModal(true);
        break;

      case "batch":
        setBatchModal(true);
        break;

      case "audit":
        setAuditModal(true);
        break;

      default:
        null;
    }
  };

  const handleCloseModals = type => {
    switch (type) {
      case "modify":
        setModifyModal(false);
        setDetailModal(false);
        break;

      case "reorder":
        setRedorderModal(false);
        setDetailModal(false);
        break;

      case "batch":
        setBatchModal(false);
        setDetailModal(false);
        break;

      case "audit":
        setAuditModal(false);
        setDetailModal(false);
        break;

      default:
        null;
      // code block
    }
  };

  // const handleCloseModal = () => {
  //   setModifyModal(false)
  //   setRedorderModal(false)
  //   setBatchModal(false)
  //   setAuditModal(false)
  //   setDetailModal(false)
  // }

  return (
    <section>
      <InventoryList
        showcreateModal={handleCreateModal}
        openDetailModal={handleOpenDetailModal}
      />

      <ModalBox
        open={createModal}
        onClose={handleHideCreateModal}
        header="Create Inventory: Product Entry- Initialization, Purchase Invoice, Audit"
      >
        <InventoryCreate closeModal={handleHideCreateModal} />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Inventory Detail"
      >
        <InventoryDetail openModals={handleOpenModals} />
      </ModalBox>

      <ModalBox open={modifyModal}>
        <InventoryModify
          Inventory={selectedInventory}
          closeModal={() => handleCloseModals("modify")}
        />
      </ModalBox>

      <ModalBox open={reorderModal}>
        <InventoryReorder
          Inventory={selectedInventory}
          closeModal={() => handleCloseModals("reorder")}
        />
      </ModalBox>

      <ModalBox open={batchModal}>
        <InventoryBatches
          Inventory={selectedInventory}
          closeModal={() => handleCloseModals("batch")}
        />
      </ModalBox>

      <ModalBox
        open={auditModal}
        onClose={() => handleCloseModals("audit")}
        header="Create ProductEntry: Initialization, Purchase Invoice, Audit"
      >
        <ProductEntryCreate Inventory={selectedInventory} />
      </ModalBox>
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
      <Box
        container
        sx={{
          width: "700px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        <Box></Box>
      </Box>
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
                  {...register("x", {required: true})}
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
                  {...register("x", {required: true})}
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
                  {...register("x", {required: true})}
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
                  {...register("x", {required: true})}
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
                  {...register("x", {required: true})}
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
                  {...register("x", {required: true})}
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
                  {...register("x", {required: true})}
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
                            <input className="input is-small" {...register("x",{required: true})} name="department" type="text" placeholder="Department"/>
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
                    <input className="input is-small" {...register("x",{required: true})} name="deptunit" type="text" placeholder="Department Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="password" type="text" placeholder="password"/>
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

export function InventoryList({showcreateModal, openDetailModal}) {
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
    console.log(Inventory);

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
    openDetailModal();
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

              {/* {handleCreateNew && (
                <Button
                  style={{fontSize: "14px", fontWeight: "600"}}
                  label="Add new "
                  onClick={showcreateModal}
                />
              )} */}
            </TableMenu>

            <div style={{width: "100%", height: "calc(100vh - 170px)"}}>
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
                onRowClicked={handleRow}
                fixedHeader={true}
                selectableRows={false}
                //onSelectedRowsChange={handleRow}
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

export function InventoryDetail({openModals}) {
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
    openModals("modify");
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
    openModals("reorder");
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
    openModals("batch");
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
    openModals("audit");
  };

  return (
    <>
      <Box
        container
        sx={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box item mb={2} pt={1}>
          <Input label="Inventory Name" value={Inventory.name} disabled />
        </Box>

        <Box
          item
          mb={3}
          sx={{display: "flex", alignItems: "center", flexWrap: "wrap"}}
        >
          <GlobalCustomButton onClick={handleEdit} sx={{marginRight: "10px"}}>
            Set Price
          </GlobalCustomButton>

          <GlobalCustomButton
            sx={{
              textTransform: "capitalize",
              background: "#17935C",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#17935C",
              },
            }}
            onClick={handleBatch}
          >
            Batches
          </GlobalCustomButton>

          <GlobalCustomButton
            onClick={handleReorder}
            sx={{marginRight: "10px"}}
          >
            Reorder Level
          </GlobalCustomButton>

          <GlobalCustomButton variant="outlined" onClick={handleAudit}>
            Audit
          </GlobalCustomButton>
        </Box>

        {error && <Typography sx={{color: "red"}}>{message}</Typography>}
      </Box>
    </>
  );
}

export function InventoryModify({closeModal}) {
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
    closeModal();
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
        toast.success("Price updated succesfully");

        changeState();
        closeModal();
      })
      .catch(err => {
        //setMessage("Error creating Inventory, probable network issues "+ err )
        // setError(true)
        toast.error(`Error updating Price, probable network issues or ${err}`);
      });
  };

  return (
    <>
      <Box
        container
        sx={{
          width: "500px",
        }}
      >
        <Box
          item
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          mb={3}
        >
          <Typography>
            Set Price for {Inventory.name} per {Inventory.baseunit}
          </Typography>
        </Box>

        <Box item mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                label="New Selling Price"
                register={register("price", {required: true})}
              />
            </Grid>

            <Grid item xs={6}>
              <Input
                label="Old Selling Price"
                register={register("oldprice", {required: true})}
                disabled
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <GlobalCustomButton
            sx={{
              marginRight: "15px",
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </GlobalCustomButton>

          <GlobalCustomButton
            variant="outlined"
            color="warning"
            onClick={handleCancel}
          >
            Cancel
          </GlobalCustomButton>
        </Box>
      </Box>
    </>
  );
}

export function InventoryReorder({closeModal}) {
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
    closeModal();
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
        toast.success("Reorder level updated succesfully");

        changeState();
        closeModal();
      })
      .catch(err => {
        toast.error(
          `Error updating Reorder level, probable network issues or  ${err}`
        );
      });
  };

  return (
    <>
      <Box
        container
        sx={{
          width: "550px",
        }}
      >
        <Box
          item
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          mb={3}
        >
          <Typography>Set ReOrder Level for {Inventory.name}</Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box item mb={3}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Input
                  register={register("reorder_level", {required: true})}
                  name="reorder_level"
                  type="text"
                  label="New Reorder Level"
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  register={register("oldlevel")}
                  disabled
                  name="oldlevel"
                  type="text"
                  label="Old Reorder Level"
                />
              </Grid>
            </Grid>
          </Box>
        </form>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <GlobalCustomButton
            sx={{
              marginRight: "15px",
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </GlobalCustomButton>

          <GlobalCustomButton
            variant="outlined"
            onClick={handleCancel}
            color="warning"
          >
            Cancel
          </GlobalCustomButton>
        </Box>
      </Box>
    </>
  );
}

export function InventoryBatches({closeModal}) {
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
  const [confirmDialog, setConfirmDialog] = useState(false);

  const Inventory = state.InventoryModule.selectedInventory; // set inventory
  // setProductItem(Inventory.batches)
  // console.log(Inventory)

  //console.log(expirydate);
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
    closeModal();
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
        toast.success("Batch updated succesfully");

        changeState();
        closeModal();
      })
      .catch(err => {
        toast.error(`Error updating Batch, probable network issues or ${err}`);
      });
  };

  const handleBatchdel = (obj, i) => {
    //let confirm = window.confirm("Are you sure you want to delete this batch?");
    //if (confirm) {
    // setProductItem(prev=>prev.filter((obj,index)=>index!==i ))
    setProductItem(obj => obj.filter((el, index) => index !== i));
    setConfirmDialog(false);
    //}
  };

  // const DatePickerCustomInput = React.forwardRef(({value, onClick}, ref) => (
  //   <div
  //     onClick={onClick}
  //     ref={ref}
  //     style={{
  //       width: "100%",
  //       height: "40px",
  //       border: "1.5px solid #BBBBBB",
  //       borderRadius: "4px",
  //       display: "flex",
  //       alignItems: "center",
  //       fontSize: "0.85rem",
  //       padding: "0 15px",
  //       color: "#000000",
  //       backgroundColor: "#fff",
  //       cursor: "pointer",
  //     }}
  //   >
  //     {value === "" ? "Pick Date" : value}
  //   </div>
  // ));

  const batchesSchema = [
    {
      name: "S/NO",
      width: "70px",
      key: "sn",
      description: "Enter name of Disease",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Batch",
      key: "batchNo",
      description: "Enter Batch",
      selector: row => row.batchNo,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Quantity",
      key: "quantity",
      description: "Enter Quantity",
      selector: row => row.quantity,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Expiry Date",
      style: row => ({color: row.expiry && "#ffffff"}),
      key: "expirydate",
      description: "Enter Date",
      selector: row =>
        row.expirydate
          ? format(new Date(row.expirydate), "dd-MM-yy")
          : "--------",
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Actions",
      key: "category",
      description: "Enter Category",
      selector: (row, i) => (
        <span
          style={{color: "red", fontSize: "inherit"}}
          onClick={() => handleBatchdel(row, i)}
        >
          delete
        </span>
      ),
      sortable: true,
      required: true,
      inputType: "BUTTON",
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.expiry,
      style: {
        backgroundColor: "pink",
        color: "#ffffff !important",
      },
    },
  ];

  return (
    <Box
      container
      sx={{
        width: "600px",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleBatchdel}
        type="danger"
        message="Are you sure you want to delete this batch?"
      />
      <Box
        container
        sx={{
          width: "100%",
        }}
      >
        <Box
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <Typography
            sx={{
              fontSize: ".9rem",
            }}
          >
            Batches for {Inventory.name}
          </Typography>
          <GlobalCustomButton onClick={handleClickProd}>
            <AddCircleOutlineIcon sx={{marginRight: "5px"}} fontSize="small" />
            Add
          </GlobalCustomButton>
        </Box>

        <Box item mb={2}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Input
                name="batchNo"
                value={batchNo}
                type="text"
                onChange={e => setBatchNo(e.target.value)}
                label="Batch Number"
              />
            </Grid>
            <Grid item xs={4}>
              <MuiCustomDatePicker
                label="Expiry Date"
                value={expirydate}
                handleChange={value => setExpiryDate(value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                name="quantity"
                value={quantity}
                type="text"
                onChange={e => setQuantity(e.target.value)}
                label="Quantity"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {productItem.length > 0 && (
        <Box
          sx={{
            width: "100%",
            overflowY: "auto",
          }}
          mb={2}
        >
          <CustomTable
            title={""}
            columns={batchesSchema}
            data={productItem}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={(row, i) => onRowClicked(row, i)}
            progressPending={false}
            conditionalRowStyles={conditionalRowStyles}
          />
        </Box>
      )}

      <Box container>
        <GlobalCustomButton
          sx={{
            marginRight: "15px",
          }}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </GlobalCustomButton>

        <GlobalCustomButton
          variant="outlined"
          color="warning"
          onClick={handleCancel}
        >
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
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
