/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
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
  // eslint-disable-next-line
  const [selectedInventory, setSelectedInventory] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

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
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        //console.log(res)
        setFacilities(res.data);
        setMessage(" Inventory  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Inventory, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findInventory = await InventoryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          storeId: state.StoreModule.selectedStore._id,
          $limit: 20,
          $sort: {
            createdAt: -1,
          },
        },
      });
      //console.log("this is data", findInventory)
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
    /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Inventory  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Inventory, probable network issues "+ err )
                    setError(true)
                }) */
  };

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
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

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <p className="control has-icons-left  ">
                    <DebounceInput
                      className="input is-small "
                      type="text"
                      placeholder="Search Inventory"
                      minLength={3}
                      debounceTimeout={400}
                      onChange={e => handleSearch(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="level-item">
              {" "}
              <span className="is-size-6 has-text-weight-medium">
                Inventory{" "}
              </span>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="level-item">
                  <div
                    className="button is-success is-small"
                    onClick={handleCreateNew}
                  >
                    New
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-container pullup ">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>
                  {/* <th><abbr title="Category">Category</abbr></th> */}
                  <th>Product</th>
                  <th>
                    <abbr title="Quantity">Quantity</abbr>
                  </th>
                  <th>
                    <abbr title="Base Unit">Base Unit</abbr>
                  </th>
                  <th>
                    <abbr title="Stock Value">Stock Value</abbr>
                  </th>
                  <th>
                    <abbr title="Cost Price">Cost Price</abbr>
                  </th>
                  <th>
                    <abbr title="Selling Price">Selling Price</abbr>
                  </th>
                  <th>
                    <abbr title="Re-Order Level">Re-Order Level</abbr>
                  </th>
                  <th>
                    <abbr title="Expiry">Expiry</abbr>
                  </th>
                  <th>
                    <abbr title="Actions">Actions</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {facilities.map((Inventory, i) => (
                  <tr
                    key={Inventory._id}
                    onClick={() => handleRow(Inventory)}
                    className={
                      Inventory._id === (selectedInventory?._id || null)
                        ? "is-selected"
                        : ""
                    }
                  >
                    <th>{i + 1}</th>
                    {/* <td>{Inventory.productDetail.category}</td> */}
                    <th>{Inventory.name}</th>
                    <td>{Inventory.quantity}</td>
                    <td>{Inventory.baseunit}</td>
                    <td>
                      {Inventory.stockvalue.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>{Inventory.costprice.toFixed(2)}</td>
                    <td>{Inventory.sellingprice}</td>
                    <td>{Inventory.reorder_level}</td>
                    <td>{Inventory.expiry}</td>
                    <td>
                      <span className="showAction">...</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        console.log(res)
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
            {/*  <p className="control">
                    <button className="button is-danger is-small"   onClick={handleSetPrice}>
                        Audit
                    </button>
                </p>
                <p className="control">
                    <button className="button is-info is-small" onClick={handleEdit} >
                        Transaction History
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small"  onClick={handleEdit} >
                        Reorder Level
                    </button>
                </p> */}
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
