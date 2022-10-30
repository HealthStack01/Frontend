/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { ProductCreate } from "./Products";
import { formatDistanceToNowStrict, format, subDays, addDays } from "date-fns";
import DatePicker from "react-datepicker";
import InfiniteScroll from "react-infinite-scroll-component";

import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";

import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "./ui-components/modal";
// eslint-disable-next-line
const searchfacility = {};

export default function ProductEntry() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  //const [showState,setShowState]=useState() //create|modify|detail

  const handleOpenCreateModal = () => {
    setCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setCreateModal(false);
  };

  const handleOpenDetailModal = () => {
    setDetailModal(true);
  };
  const handleCloseDetailModal = () => {
    setDetailModal(false);
  };

  const handleOpenModifyModal = () => {
    setModifyModal(true);
  };
  const handleCloseModifyModal = () => {
    setModifyModal(false);
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

      <ProductEntryList
        openCreateModal={handleOpenCreateModal}
        openDetailModal={handleOpenDetailModal}
      />

      <ModalBox open={createModal} onClose={handleCloseCreateModal}>
        <ProductEntryCreate />
      </ModalBox>

      <ModalBox open={detailModal} onClose={handleCloseDetailModal}>
        <ProductEntryDetail openModifyModal={handleOpenModifyModal} />
      </ModalBox>

      <ModalBox open={modifyModal} onClose={handleCloseModifyModal}>
        <ProductEntryModify />
      </ModalBox>
    </section>
  );
}

export function ProductEntryCreate() {
  // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ProductEntryServ = client.service("productentry");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [type, setType] = useState("Purchase Invoice");
  const [documentNo, setDocumentNo] = useState("");
  const [totalamount, setTotalamount] = useState("");
  const [productId, setProductId] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [baseunit, setBaseunit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costprice, setCostprice] = useState("");
  const [productItem, setProductItem] = useState([]);
  const { state } = useContext(ObjectContext);

  /*  const [productEntry,setProductEntry]=useState({
        productitems:[],
        date,
        documentNo,
        type,
        totalamount,
        source,

    })
  */
  const productItemI = {
    productId,
    name,
    quantity,
    costprice,
    amount: quantity * costprice,
    baseunit,
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = (obj) => {
    setProductId(obj._id);
    setName(obj.name);
    setBaseunit(obj.baseunit);

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  const handleChangeType = async (e) => {
    await setType(e.target.value);
  };
  const handleClickProd = async () => {
    if (!productId || !quantity || !costprice) {
      toast({
        message: "Kindly choose Product,price and quantity",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    await setSuccess(false);
    setProductItem((prevProd) => prevProd.concat(productItemI));
    setName("");
    setBaseunit("");
    setQuantity("");
    setCostprice("");
    await setSuccess(true);
    // console.log(success)
    //  console.log(productItem)
  };
  const handleDate = async (date) => {
    setDate(date);
  };

  const resetform = () => {
    setType("Purchase Invoice");
    setDocumentNo("");
    setTotalamount("");
    setProductId("");
    setSource("");
    setDate("");
    setName("");
    setBaseunit("");
    setCostprice("");
    setProductItem([]);
  };

  const onSubmit = async (e) => {
    let confirm = window.confirm(`Are you sure you want to save this entry ?`);
    if (confirm) {
      e.preventDefault();
      setMessage("");
      setError(false);
      setSuccess(false);
      if (!date) {
        toast({
          message: "Kindly choose date",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }

      let productEntry = {
        date,
        documentNo,
        type,
        totalamount,
        source,
      };
      productEntry.productitems = productItem;
      productEntry.createdby = user._id;
      productEntry.transactioncategory = "credit";

      //console.log("b4 facility",productEntry);
      if (user.currentEmployee) {
        productEntry.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
      } else {
        toast({
          message: "You can not add inventory to any organization",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }
      if (state.StoreModule.selectedStore._id) {
        productEntry.storeId = state.StoreModule.selectedStore._id;
      } else {
        toast({
          message: "You need to select a store before adding inventory",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }
      //console.log("b4 create",productEntry);
      ProductEntryServ.create(productEntry)
        .then((res) => {
          //console.log(JSON.stringify(res))
          resetform();
          /*  setMessage("Created ProductEntry successfully") */
          setSuccess(true);
          toast({
            message: "ProductEntry created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          setProductItem([]);
        })
        .catch((err) => {
          toast({
            message: "Error creating ProductEntry " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };
  const removeEntity = (entity, i) => {
    //console.log(entity)
    setProductItem((prev) => prev.filter((obj, index) => index !== i));
  };

  return (
    <>
      <div className="card card-overflow">
        <div className="card-header">
          <p className="card-header-title">
            Create ProductEntry: Initialization, Purchase Invoice, Audit
          </p>
        </div>
        <div className="card-content ">
          <form onSubmit={onSubmit}>
            {" "}
            {/* handleSubmit(onSubmit) */}
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <div className="select is-small">
                      <select
                        name="type"
                        value={type}
                        onChange={handleChangeType}
                      >
                        <option value="">Choose Type </option>
                        <option value="Purchase Invoice">
                          Purchase Invoice{" "}
                        </option>
                        <option value="Initialization">Initialization</option>
                        <option value="Audit">Audit</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      /* {...register("x",{required: true})} */ value={source}
                      name="supplier"
                      type="text"
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="Supplier"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* horizontal end */}
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <DatePicker
                      selected={date}
                      onChange={(date) => handleDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Pick Date"

                      //isClearable
                    />
                    {/*   <input className="input is-small"   {...register("x",{required: true})}  value={date}  name="date" type="text" onChange={e=>setDate(e.target.value)} placeholder="Date" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span> */}
                  </div>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      /* ref={register} */ name="documentNo"
                      value={documentNo}
                      type="text"
                      onChange={(e) => setDocumentNo(e.target.value)}
                      placeholder=" Invoice Number"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-phone-alt"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      /* {...register("x",{required: true})} */ value={
                        totalamount
                      }
                      name="totalamount"
                      type="text"
                      onChange={async (e) =>
                        await setTotalamount(e.target.value)
                      }
                      placeholder=" Total Amount"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-coins"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </form>

          {/* array of ProductEntry items */}

          <label className="label is-small">Add Product Items:</label>
          <div className="field is-horizontal">
            <div className="field-body">
              <div
                className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
              >
                <ProductSearch
                  getSearchfacility={getSearchfacility}
                  clear={success}
                />
                <p
                  className="control has-icons-left "
                  style={{ display: "none" }}
                >
                  <input
                    className="input is-small"
                    /* ref={register ({ required: true }) }  */ /* add array no */ value={
                      productId
                    }
                    name="productId"
                    type="text"
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Product Id"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    /* {...register("x",{required: true})} */ name="quantity"
                    value={quantity}
                    type="text"
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
                <label>{baseunit}</label>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    /* {...register("x",{required: true})} */ name="costprice"
                    value={costprice}
                    type="text"
                    onChange={(e) => setCostprice(e.target.value)}
                    placeholder="Cost Price"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-dollar-sign"></i>
                  </span>
                </p>
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

          {productItem.length > 0 && (
            <div>
              <label>Product Items:</label>
              <div className="table-container  vscrol" id="scrollableDiv">
                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                  <thead>
                    <tr>
                      <th>
                        <abbr title="Serial No">S/No</abbr>
                      </th>
                      <th>
                        <abbr title="Type">Name</abbr>
                      </th>
                      <th>
                        <abbr title="Type">Quanitity</abbr>
                      </th>
                      <th>
                        <abbr title="Document No">Unit</abbr>
                      </th>
                      <th>
                        <abbr title="Cost Price">Cost Price</abbr>
                      </th>
                      <th>
                        <abbr title="Cost Price">Amount</abbr>
                      </th>
                      <th>
                        <abbr title="Actions">Actions</abbr>
                      </th>
                    </tr>
                  </thead>
                  <tfoot></tfoot>
                  <tbody>
                    {productItem.map((ProductEntry, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{ProductEntry.name}</td>
                        <th>{ProductEntry.quantity}</th>
                        <td>{ProductEntry.baseunit}</td>
                        <td>{ProductEntry.costprice}</td>
                        <td>{ProductEntry.amount}</td>
                        <td onClick={() => removeEntity(ProductEntry, i)}>
                          <span className="showAction">x</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="field mt-2">
                <p className="control">
                  <button
                    className="button is-success is-small"
                    disabled={!productItem.length > 0}
                    onClick={onSubmit}
                  >
                    Create
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function ProductEntryList({ openCreateModal, openDetailModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ProductEntryServ = client.service("productentry");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20); //LIMITATIONS FOR THE NUMBER OF FACILITIES FOR SERVER TO RETURN PER PAGE
  const [total, setTotal] = useState(0); //TOTAL NUMBER OF FACILITIES AVAILABLE IN THE SERVER
  const [restful, setRestful] = useState(true);
  const [next, setNext] = useState(false);

  const handleCreateNew = async () => {
    const newProductEntryModule = {
      selectedProductEntry: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
    openCreateModal();
  };
  const handleRow = async (ProductEntry) => {
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    await setSelectedProductEntry(ProductEntry);

    const newProductEntryModule = {
      selectedProductEntry: ProductEntry,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
    openDetailModal();
  };

  const handleSearch = async (val) => {
    const field = "source";
    //console.log(val)
    ProductEntryServ.find({
      query: {
        $or: [
          {
            source: {
              $regex: val,
              $options: "i",
            },
          },
          {
            type: {
              $regex: val,
              $options: "i",
            },
          },
        ],

        storeId: state.StoreModule.selectedStore._id,
        facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        //console.log(res)
        setFacilities(res.data);
        setTotal(res.total);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        //  console.log(err)
        setMessage(
          "Error fetching ProductEntry, probable network issues " + err
        );
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findProductEntry = await ProductEntryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          storeId: state.StoreModule.selectedStore._id,
          $limit: limit,
          $skip: page * limit,
          /*  $limit:20, */
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setTotal(findProductEntry.total);
      await setFacilities((prevstate) =>
        prevstate.concat(findProductEntry.data)
      );
      if (findProductEntry.total > findProductEntry.skip) {
        setNext(true);

        setPage((page) => page + 1);
      } else {
        setNext(false);
      }
    } else {
      if (user.stacker) {
        const findProductEntry = await ProductEntryServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findProductEntry.data);
      }
    }
  };

  const getNewFacilities = async () => {
    if (user.currentEmployee) {
      const findProductEntry = await ProductEntryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          storeId: state.StoreModule.selectedStore._id,
          $limit: limit,
          //$skip:page * limit,
          /*  $limit:20, */
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then((resp) => {
          setTotal(resp.total);
          setFacilities(resp.data);
          if (resp.total > resp.data.length) {
            setNext(true);

            setPage((page) => page + 1);
          } else {
            setNext(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (user.stacker) {
        const findProductEntry = await ProductEntryServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findProductEntry.data);
      }
    }
  };

  const getUpdatedFacilities = async () => {
    const findProductEntry = await ProductEntryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        storeId: state.employeeLocation.locationId,
        $limit: limit,

        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((resp) => {
        setTotal(resp.total);
        updatelist(resp.data);
        //setFacilities(resp.data)
        if (resp.total > resp.data.length) {
          setNext(true);
          setPage((page) => page + 1);
        } else {
          setNext(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!state.StoreModule.selectedStore) {
      toast({
        message: "kindly select a store",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
      //  getFacilities()
    }
    ProductEntryServ.on("created", (obj) => getUpdatedFacilities());
    ProductEntryServ.on("updated", (obj) => getUpdatedFacilities());
    ProductEntryServ.on("patched", (obj) => getUpdatedFacilities());
    ProductEntryServ.on("removed", (obj) => getUpdatedFacilities());
    return () => {};
  }, []);

  const updatelist = async (data) => {
    await setFacilities(data);
  };
  const updates = () => {
    // setFacilities([])
    rest1();
  };

  useEffect(() => {
    rest1();
    return () => {};
  }, [state.StoreModule.selectedStore._id]);
  //todo: pagination and vertical scroll bar

  const rest1 = async () => {
    setPage(0);
    setTotal(0);
    getNewFacilities();
  };
  const handleDelete = async (obj) => {
    let confirm = window.confirm(
      `Are you sure you want to delete this entry with Document No: ${obj.documentNo} ?`
    );
    if (confirm) {
      await ProductEntryServ.remove(obj._id)
        .then((resp) => {
          toast({
            message: "Sucessfuly deleted ProductEntry ",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
          toast({
            message: "Error deleting ProductEntry " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const productEntrySchema = [
    {
      name: "S/NO",
      key: "sn",
      description: "Enter name of Disease",
      selector: (row) => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Date",
      key: "createdAt",
      description: "Enter Created date",
      selector: (row) => row.createdAt,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Type",
      key: "type",
      description: "Enter Type",
      selector: (row) => row.type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Source",
      key: "source",
      description: "Enter Source",
      selector: (row) => row.source,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Document No",
      key: "documentNo",
      description: "Enter Document Number",
      selector: (row) => row.documentNo,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Total Amount",
      key: "totalamount",
      description: "Enter Total Amount",
      selector: (row) => row.totalamount,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Actions",
      key: "action",
      description: "Enter Action",
      selector: (row) => (
        <Button
          className="button is-info is-small"
          sx={{
            background: "none",
            color: "red",
            fontSize: "0.75rem",
            borderRadius: "2px",
            padding: "0.27rem 1rem",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            handleDelete(row);
          }}
        >
          Delete
        </Button>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      {state.StoreModule.selectedStore ? (
        <>
          <PageWrapper
            style={{ flexDirection: "column", padding: "0.6rem 1rem" }}
          >
            <TableMenu>
              <div style={{ display: "flex", alignItems: "center" }}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                  Notifications
                </h2>
              </div>

              {handleCreateNew && (
                <Button
                  style={{ fontSize: "14px", fontWeight: "600" }}
                  label="Add new "
                  onClick={openCreateModal}
                />
              )}
            </TableMenu>

            <div style={{ width: "100%", height: "600px", overflow: "auto" }}>
              <CustomTable
                title={""}
                columns={productEntrySchema}
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
        <div>loading... </div>
      )}
    </>
  );
}

export function ProductEntryDetail({ openModifyModal }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ProductEntryServ=client.service('/ProductEntry')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const { state, setState } = useContext(ObjectContext);

  const ProductEntry = state.ProductEntryModule.selectedProductEntry;

  const handleEdit = async () => {
    const newProductEntryModule = {
      selectedProductEntry: ProductEntry,
      show: "modify",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
    openModifyModal();
  };
  const ProductDetailSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "Serial Number",
      sortable: true,
      selector: (row) => row.sn,
      inputType: "HIDDEN",
    },
    {
      name: "Name",
      key: "name",
      description: "Enter Name",
      selector: (ProductEntry) => ProductEntry.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Quantity",
      key: "quantity",
      description: "Enter quantity",
      selector: (ProductEntry) => ProductEntry.quantity,
      sortable: true,
      required: true,
      inputType: "NUMBER",
      options: ["Front Desk", "Clinic", "Store", "Laboratory", "Finance"],
    },
    {
      name: "Unit",
      key: "baseunit",
      description: "Enter unit",
      selector: (ProductEntry) => ProductEntry.baseunit,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Cost Price",
      key: "costprice",
      description: "Enter cost price",
      selector: (ProductEntry) => ProductEntry.costprice,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter amount",
      selector: (ProductEntry) => ProductEntry.amount,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];
  const handleRow = () => {};
  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">ProductEntry Details</p>
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
                    Type
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    {" "}
                    {ProductEntry.type}{" "}
                  </span>
                </td>
                <td></td>
                <td>
                  <label className="label is-small padleft">
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                    Supplier:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="ProductEntryType">
                    {ProductEntry.source}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="label is-small">
                    {" "}
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                    Date:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    {" "}
                    {format(new Date(ProductEntry.date), "dd-MM-yy HH:mm")}{" "}
                  </span>
                </td>
                <td></td>
                <td>
                  <label className="label is-small padleft">
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                    Invoice No:
                  </label>
                </td>

                <td>
                  <span className="is-size-7 padleft" name="ProductEntryType">
                    {ProductEntry.documentNo}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="label is-small">
                    {" "}
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                    Total Amount:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    {" "}
                    {ProductEntry.totalamount}{" "}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Product Items</p>
            <CustomTable
              title={""}
              columns={ProductDetailSchema}
              data={ProductEntry.productitems}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              // progressPending={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductEntryModify() {
  const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ProductEntryServ = client.service("productentry");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const ProductEntry = state.ProductEntryModule.selectedProductEntry;

  useEffect(() => {
    setValue("name", ProductEntry.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("ProductEntryType", ProductEntry.ProductEntryType, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newProductEntryModule = {
      selectedProductEntry: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newProductEntryModule = {
      selectedProductEntry: {},
      show: "create",
    };
    setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = ProductEntry._id;
    if (conf) {
      ProductEntryServ.remove(dleteId)
        .then((res) => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted ProductEntry successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "ProductEntry deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch((err) => {
          // setMessage("Error deleting ProductEntry, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              "Error deleting ProductEntry, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    // console.log(data)
    data.facility = ProductEntry.facility;
    //console.log(data);

    ProductEntryServ.patch(ProductEntry._id, data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated ProductEntry successfully")
        toast({
          message: "ProductEntry updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch((err) => {
        //setMessage("Error creating ProductEntry, probable network issues "+ err )
        // setError(true)
        toast({
          message:
            "Error updating ProductEntry, probable network issues or " + err,
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
          <p className="card-header-title">ProductEntry Details-Modify</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                {" "}
                Name
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    {...register("x", { required: true })}
                    name="name"
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
                ProductEntry Type
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    {...register("x", { required: true })}
                    disabled
                    name="ProductEntryType"
                    type="text"
                    placeholder="ProductEntry Type"
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
            <p className="control">
              <button
                className="button is-danger is-small"
                onClick={() => handleDelete()}
                type="delete"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductSearch({ getSearchfacility, clear }) {
  const productServ = client.service("products");
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
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.name);

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
  const handleBlur = async (e) => {};
  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      return;
    }
    const field = "name"; //field variable

    if (value.length >= 3) {
      productServ
        .find({
          query: {
            //service
            [field]: {
              $regex: value,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          // console.log("product  fetched successfully")
          // console.log(res.data)
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          toast({
            message: "Error creating ProductEntry " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      // console.log("less than 3 ")
      // console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      // console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? "is-active" : ""} wt100`}>
            <div className="dropdown-trigger wt100">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Product"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {/* {searchError&&<div>{searchMessage}</div>} */}
            <div className="dropdown-menu wt100">
              <div className="dropdown-content">
                {facilities.length > 0 ? (
                  ""
                ) : (
                  <div className="dropdown-item" onClick={handleAddproduct}>
                    {" "}
                    <span>Add {val} to product list</span>{" "}
                  </div>
                )}

                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item "
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.name}</span>
                    <span>({facility.baseunit})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal ${productModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head minHt">
            <p className="modal-card-title">Product</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <ProductCreate />
          </section>
          {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
        </div>
      </div>
    </div>
  );
}
