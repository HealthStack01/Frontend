/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { ProductCreate, ProductDetail } from "./Products";
import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import ModalBox from "../../components/modal";
var random = require("random-string-generator");
import moment from "moment";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";

import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";

//import MuiButton from "@mui/material/Button";
// eslint-disable-next-line

const filter = createFilterOptions();

import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Grid,
  Button as MuiButton,
  Divider,
  Typography,
} from "@mui/material";

import ProductSearchHelper from "../helpers/ProductSearch";
import InventorySearchHelper from "../helpers/InventorySearch";
// eslint-disable-next-line
const searchfacility = {};

export default function PharmacyProductExit() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  const [createModal, setCreateModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  //const [showState,setShowState]=useState() //create|modify|detail

  const handleOpenCreateModal = () => {
    setCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setCreateModal(false);
  };

  const handleOpenModifyModal = () => {
    setModifyModal(true);
  };
  const handleCloseModifyModal = () => {
    setModifyModal(false);
  };

  const handleOpenDetailModal = () => {
    setDetailModal(true);
    console.log("detail modal");
  };
  const handleCloseDetailModal = () => {
    setDetailModal(false);
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

      <ProductExitList
        openCreateModal={handleOpenCreateModal}
        openDetailModal={handleOpenDetailModal}
      />

      <ModalBox
        open={createModal}
        onClose={handleCloseCreateModal}
        header="Point of Sale: Sales, Dispense, Audit, Transfer out"
      >
        <ProductExitCreate closeModal={handleCloseCreateModal} />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={handleCloseDetailModal}
        header="Issue Out Details"
      >
        <ProductExitDetail />
      </ModalBox>

      <ModalBox open={modifyModal} onClose={handleCloseModifyModal}>
        <ProductExitModify ProductEntry={selectedProductEntry} />
      </ModalBox>
    </section>
  );
}

export function ProductExitCreate({closeModal}) {
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
  const [type, setType] = useState("Sales");
  const [documentNo, setDocumentNo] = useState("");
  const [totalamount, setTotalamount] = useState(0);
  const [qamount, setQAmount] = useState(null);
  const [productId, setProductId] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [inventoryId, setInventoryId] = useState("");
  const [baseunit, setBaseunit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [costprice, setCostprice] = useState(0);
  const [invquantity, setInvQuantity] = useState("");
  const [calcamount, setCalcAmount] = useState(0);
  const [productItem, setProductItem] = useState([]);
  const [billingId, setBilllingId] = useState("");
  const [changeAmount, setChangeAmount] = useState(true);
  const { state } = useContext(ObjectContext);
  const inputEl = useRef(0);
  let calcamount1;
  let hidestatus;

  let medication = state.financeModule.selectedFinance;
  console.log("medication", medication);

  const [productEntry, setProductEntry] = useState({
    productitems: [],
    date,
    documentNo,
    type,
    totalamount,
    source,
  });

  const productItemI = {
    productId,
    name,
    quantity,
    sellingprice,
    amount: calcamount, //qamount||
    baseunit,
    costprice,
    billingId,
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = (obj) => {
    setProductId(obj.productId);
    setName(obj.name);
    setBaseunit(obj.baseunit);
    setInventoryId(obj.inventoryId);
    setSellingPrice(obj.sellingprice);
    setInvQuantity(obj.quantity);
    setCostprice(obj.costprice);
    setBilllingId(obj.billingId);
    if (!obj) {
      //"clear stuff"
      setProductId("");
      setName("");
      setBaseunit("");
      setInventoryId("");
      setSellingPrice("");
      setInvQuantity("");
      setQAmount(null);
      setCostprice("");
      // setCalcAmount(null)
    }

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

  const handleUpdateTotal = () => {
    setTotalamount((prevtotal) => Number(prevtotal) + Number(calcamount));
  };

  const handleChangeType = async (e) => {
    await setType(e.target.value);
  };

  const handleAmount = async () => {
    await setQAmount(null);
    // alert("Iam chaning qamount")
  };
  const handleClickProd = async () => {
    console.log("amount: ", productItemI.amount);
    console.log("qamount: ", qamount);
    console.log("calcamount: ", calcamount);

    if (quantity === 0 || quantity === "" || productId === "") {
      toast({
        message: "You need to choose a product and quantity to proceed",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    await setSuccess(false);
    await setProductItem((prevProd) => prevProd.concat(productItemI));
    handleUpdateTotal();
    setName("");
    setBaseunit("");
    setQuantity("");
    setInventoryId("");
    setSellingPrice("");
    setInvQuantity("");
    handleAmount();
    // setCalcAmount(null)
    await setSuccess(true);
    /*  console.log(success)
       console.log(qamount)
       console.log(productItem) */
    setChangeAmount(true);
  };
  //check user for facility or get list of facility
  /*  useEffect(()=>{
        //setFacility(user.activeProductEntry.FacilityId)//
      if (!user.stacker){
          console.log(currentUser)
           /* setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  

      }
    }) */

  const handleQtty = async (e) => {
    if (invquantity < e.target.value) {
      toast({
        message: "You can not sell more quantity than exist in inventory ",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    setQuantity(e.target.value);
    calcamount1 = quantity * sellingprice;
    await setCalcAmount(calcamount1);
    console.log(calcamount);
  };

  useEffect(() => {
    setProductEntry({
      date,
      documentNo,
      type,
      totalamount,
      source,
    });
    setCalcAmount(quantity * sellingprice);
    return () => {};
  }, [date]);

  const resetform = () => {
    setType("Sales");
    setDocumentNo("");
    setTotalamount("");
    setProductId("");
    setSource("");
    setDate("");
    setName("");
    setBaseunit();
    setCostprice();
    setProductItem([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    /* await setProductEntry({
            
            date,
            documentNo,
            type,
            totalamount,
            source,
        }) */
    productEntry.date = date;
    productEntry.documentNo = documentNo;
    productEntry.type = type;
    productEntry.totalamount = totalamount;
    productEntry.source = source;
    productEntry.productitems = productItem;
    productEntry.createdby = user._id;
    productEntry.transactioncategory = "debit";

    console.log("b4 facility", productEntry);
    if (user.currentEmployee) {
      productEntry.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    } else {
      toast({
        message: "You can not remove inventory from any organization",
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
        message: "You need to select a store before removing inventory",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    console.log("b4 create", productEntry);
    ProductEntryServ.create(productEntry)
      .then((res) => {
        //console.log(JSON.stringify(res))
        resetform();
        /*  setMessage("Created ProductEntry successfully") */
        setSuccess(true);
        toast({
          message: "ProductExit created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setProductItem([]);
        const today = new Date().toLocaleString();

        setDate(today);
        const invoiceNo = random(6, "uppernumeric");
        setDocumentNo(invoiceNo);
        setType("Sales");
      })
      .catch((err) => {
        toast({
          message: "Error creating ProductExit " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const handleChangeAmount = () => {
    setChangeAmount((rev) => !rev);
  };
  // console.log("i am rendering")

  useEffect(() => {
    const today = new Date().toLocaleString();
    //console.log(today)
    setDate(today);
    const invoiceNo = random(6, "uppernumeric");
    setDocumentNo(invoiceNo);
    return () => {};
  }, []);

  useEffect(() => {
    calcamount1 = quantity * sellingprice;
    setCalcAmount(calcamount1);
    console.log(calcamount);
    setChangeAmount(true);
    return () => {};
  }, [quantity]);

  const onRowClicked = () => {};

  const productCreateSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Name",
      key: "name",
      description: "Enter Name",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Quantity",
      key: "quanity",
      description: "Enter quantity",
      selector: row => row.quantity,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Unit",
      key: "baseunit",
      description: "Base Unit",
      selector: row => row.baseunit,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Selling Price",
      key: "costprice",
      description: "Enter cost price",
      selector: row => row.sellingprice,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Amount",
      key: "amount",
      description: "Enter amount",
      selector: row => row.amount,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Actions",
      key: "costprice",
      description: "costprice",
      selector: (row, i) => (
        <p
          style={{color: "red", fontSize: "0.75rem"}}
          onClick={() => removeEntity(row, i)}
        >
          Remove
        </p>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const DatePickerCustomInput = React.forwardRef(({value, onClick}, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      style={{
        width: "100%",
        height: "48px",
        border: "1.5px solid #BBBBBB",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        margin: "0.75rem 0",
        fontSize: "0.85rem",
        padding: "0 15px",
        color: "#000000",
        backgroundColor: "#fff",
      }}
    >
      {value === "" ? "Pick Date" : value}
    </div>
  ));

  return (
    <>
      <Box
        sx={{
          width: "780px",
          height: "600px",
          overflowY: "auto",
        }}
      >
        <Box container>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Input
                  /* ref={register({ required: true })} */
                  value={source}
                  name="client"
                  type="text"
                  onChange={e => setSource(e.target.value)}
                  label="Client"
                />
              </Grid>
              <Grid item xs={4} sx={{margin: "0.75rem 0"}}>
                <CustomSelect
                  defaultValue={type}
                  name="type"
                  options={["Sales", "In-house", "Dispense", "Audit"]}
                  onChange={handleChangeType}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Input
                  label="Date"
                  value={date}
                  name="date"
                  type="text"
                  onChange={e => setDate(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="documentNo"
                  value={documentNo}
                  type="text"
                  onChange={e => setDocumentNo(e.target.value)}
                  label="Invoice Number"
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  value={totalamount}
                  name="totalamount"
                  type="text"
                  onChange={async e => await setTotalamount(e.target.value)}
                  label="Total Amount"
                />
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{margin: "20px 0"}} />
          <Box
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            mb={1}
          >
            <Box item>
              <Typography>Add Product Items</Typography>
            </Box>

            <Box item>
              <MuiButton
                variant="outlined"
                sx={{width: "100px", textTransform: "capitalize"}}
                onClick={handleClickProd}
              >
                <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Add
              </MuiButton>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Box>
                <>
                  <InventorySearch
                    getSearchfacility={getSearchfacility}
                    clear={success}
                  />
                  <input
                    className="input is-small"
                    /* ref={register ({ required: true }) }  */ /* add array no */
                    value={productId}
                    name="productId"
                    type="text"
                    onChange={e => setProductId(e.target.value)}
                    placeholder="Product Id"
                    style={{display: "none"}}
                  />
                </>

                <Typography style={{fontSize: "0.75rem"}}>
                  {sellingprice && "N"}
                  {sellingprice} {sellingprice && "per"} {baseunit}
                  {invquantity} {sellingprice && "remaining"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={2}>
              <Input
                /* ref={register({ required: true })} */
                name="quantity"
                value={quantity}
                type="text"
                onChange={e => handleQtty(e)}
                label="Quantity"
              />
            </Grid>

            <Grid item xs={3}>
              <Box container>
                <Input
                  /* ref={register({ required: true })} */
                  name="qamount"
                  disabled={changeAmount}
                  value={calcamount}
                  type="text"
                  onChange={async e => await setCalcAmount(e.target.value)}
                  label="Amount"
                />
                <MuiButton
                  variant="contained"
                  sx={{
                    width: "100%",
                    textTransform: "capitalize",
                    fontSize: "0.75rem",
                  }}
                  onClick={handleChangeAmount}
                >
                  Adjust
                </MuiButton>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {productItem.length > 0 && (
          <Box sx={{height: "200px", widht: "300%"}}>
            <CustomTable
              title={""}
              columns={productCreateSchema}
              data={productItem}
              pointerOnHover
              highlightOnHover
              striped
            />
          </Box>
        )}

        <Box
          container
          sx={{
            width: "100%",
            display: "flex",
          }}
          mt={2}
        >
          <MuiButton
            variant="contained"
            disabled={!productItem.length > 0}
            onClick={onSubmit}
            sx={{
              width: "150px",
              height: "40px",
              textTransform: "capitalize",
              marginRight: "15px",
            }}
          >
            Add Product(s)
          </MuiButton>
          <MuiButton
            variant="outlined"
            color="error"
            sx={{width: "150px", height: "40px", textTransform: "capitalize"}}
            onClick={closeModal}
          >
            Cancel
          </MuiButton>
        </Box>
      </Box>

    </>
  );
}

export function ProductExitList({ openDetailModal, openCreateModal }) {
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
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    const newProductExitModule = {
      selectedProductEntry: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
    }));
    //console.log(state)
    openCreateModal();
  };
  const handleRow = async (ProductEntry) => {
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    await setSelectedProductEntry(ProductEntry);

    const newProductExitModule = {
      selectedProductEntry: ProductEntry,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
    }));
    //console.log(state)
    openDetailModal();
  };

  const handleSearch = (val) => {
    const field = "name";
    console.log(val);
    ProductEntryServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        transactioncategory: "debit",
        storeId: state.StoreModule.selectedStore._id,
        facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
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
          transactioncategory: "debit",
          facility: user.currentEmployee.facilityDetail._id,
          storeId: state.StoreModule.selectedStore._id,
          $limit: 20,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findProductEntry.data);
      console.log(findProductEntry.data);
    } else {
      if (user.stacker) {
        /* toast({
                            message: 'You do not qualify to view this',
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: true,
                          }) 
                          return */
        const findProductEntry = await ProductEntryServ.find({
          query: {
            transactioncategory: "debit",
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findProductEntry.data);
      }
    }
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
    ProductEntryServ.on("created", (obj) => getFacilities());
    ProductEntryServ.on("updated", (obj) => getFacilities());
    ProductEntryServ.on("patched", (obj) => getFacilities());
    ProductEntryServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);

  useEffect(() => {
    getFacilities();
    console.log("store changed");
    return () => {};
  }, [state.StoreModule.selectedStore]);
  //todo: pagination and vertical scroll bar

  const ProductExitSchema = [
    {
      name: "S/No",
      key: "sn",
      description: "",
      selector: (row) => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "date",
      key: "date",
      description: "Enter date",
      selector: (row) => row.date,

      sortable: true,
      required: true,
      inputType: "DATETIME",
    },
    {
      name: "Type",
      key: "type",
      description: "Enter type",
      selector: (row) => row.type,
      sortable: true,
      required: true,
      inputType: "SELECT_LIST",
      options: ["Purchase Invoice", "Initialization", "Audit"],
    },
    {
      name: "Client",
      key: "source",
      description: "Enter client",
      selector: (row) => (row.source ? row.source : "----"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Document No",
      key: "DocumentNO",
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
      inputType: "TEXT",
    },
    {
      name: "Entered By ",
      key: "source",
      description: "Enter Entered By ",
      selector: (row) => (row.enteredby ? row.enteredby : "----"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: " Actions",
      key: "actions",
      description: "Enter Actions",
      selector: (row) => "----",
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
                  Inventory Store
                </h2>
              </div>

              {handleCreateNew && (
                <Button
                  style={{ fontSize: "14px", fontWeight: "600" }}
                  label="Add new "
                  onClick={handleCreateNew}
                />
              )}
            </TableMenu>

            <div style={{ width: "100%", height: "600px", overflow: "auto" }}>
              <CustomTable
                title={""}
                columns={ProductExitSchema}
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
        <div>loading... Choose a Store</div>
      )}
    </>
  );
}

export function ProductExitDetail() {
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

  const ProductEntry = state.ProductExitModule.selectedProductEntry;

  const handleEdit = async () => {
    const newProductExitModule = {
      selectedProductEntry: ProductEntry,
      show: "modify",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
    }));
    //console.log(state)
  };

  const productItemsSchema = [
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
      name: "Name",
      key: "name",
      description: "Enter name of product",
      selector: (row) => row.sn,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Quantity",
      key: "quantity",
      description: "Enter Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Unit",
      key: "unit",
      description: "Enter Unit",
      selector: (row) => (row.baseunit ? row.baseunit : "----"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Selling Price",
      key: "sellingprice",
      description: "Enter Selling price",
      selector: (row) => row.sellingprice,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter Amount",
      selector: (row) => row.amount,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <Box
        container
        sx={{
          width: "700px",
          height: "400px",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Input value={ProductEntry.source} label="Supplier" disabled />
          </Grid>

          <Grid item xs={4}>
            <Input value={ProductEntry.type} label="Type" disabled />
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}>
            <Input
              value={
                ProductEntry.date
                  ? moment(ProductEntry.date).format("YYYY-MM-DD HH:mm:ss")
                  : "-----"
              }
              label="Date"
              disabled
            />
          </Grid>

          <Grid item xs={4}>
            <Input
              value={ProductEntry.documentNo}
              label="Invoice Number"
              disabled
            />
          </Grid>

          <Grid item xs={4}>
            <Input
              value={ProductEntry.totalamount}
              label="Total Amount"
              disabled
            />
          </Grid>
        </Grid>

        <Box sx={{width: "100%", height: "200px", overflowY: "auto"}}>
          <CustomTable
            title={""}
            columns={productItemsSchema}
            data={ProductEntry.productitems}
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={row => onRowClicked(row)}
            progressPending={false}
          />
        </Box>
      </Box>
    </>
  );
}

export function ProductExitModify() {
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

  const ProductEntry = state.ProductExitModule.selectedProductEntry;

  useEffect(() => {
    setValue("name", ProductEntry.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("ProductEntryType", ProductEntry.ProductEntryType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", ProductEntry.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", ProductEntry.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", ProductEntry.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", ProductEntry.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", ProductEntry.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("ProductEntryCategory", ProductEntry.ProductEntryCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  });

  const handleCancel = async () => {
    const newProductExitModule = {
      selectedProductEntry: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newProductExitModule = {
      selectedProductEntry: {},
      show: "create",
    };
    setState((prevstate) => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
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

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    console.log(data);
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
            {/* <div className="field">
            <label className="label is-small">Profession
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="profession" type="text" placeholder="Profession"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Phone
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="phone" type="text" placeholder="Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
                </label>
                 </div>
            <div className="field">
            <label className="label is-small">Email
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="ProductEntry Email"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Department
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="department" type="text" placeholder="Department"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                    </span>
                </p>
                </label>
                {errors.department && <span>This field is required</span>}
                </div>
            <div className="field">
            <label className="label is-small">Departmental Unit
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="deptunit" type="text" placeholder="Departmental Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>
                </p>
                </label>
                </div> */}
            {/*  <div className="field">
            <label className="label is-small">Category
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="ProductEntryCategory" type="text" placeholder="ProductEntry Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
                </label>
            </div> */}
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

export function InventorySearch({ getSearchfacility, clear }) {
  const productServ = client.service("inventory");
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
  const { user } = useContext(UserContext);
  const { state } = useContext(ObjectContext);
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
  const handleBlur = async (e) => {
    if (count === 2) {
      console.log("stuff was chosen");
    }

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
  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility(false);
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
            facility: user.currentEmployee.facilityDetail._id,
            storeId: state.StoreModule.selectedStore._id,
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log("product  fetched successfully");
          console.log(res.data);
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
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
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
      console.log("success has changed", clear);
      setSimpa("");
    }
    return () => {};
  }, [clear]);

  return (
    <div>
      {/* <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? "is-active" : ""}`}
            style={{ width: "100%" }}
          >
            <div className="dropdown-trigger" style={{ width: "100%" }}>
              <DebounceInput
                className="input is-small  is-expanded"
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

            <div className="dropdown-menu expanded" style={{width: "100%"}}>

              <div className="dropdown-content">
                {facilities.length > 0 ? (
                  ""
                ) : (
                  <div
                    className="dropdown-item" 
                  >
                    {" "}
                    <span> {val} is not in your inventory</span>{" "}
                  </div>
                )}

                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <div>
                      <span>{facility.name}</span>
                    </div>
                    <div>
                      <span>
                        <strong>{facility.quantity}</strong>
                      </span>
                      <span>{facility.baseunit}(s) remaining</span>
                      <span className="padleft">
                        <strong>Price:</strong> N{facility.sellingprice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Autocomplete
        value={simpa}
        onChange={(event, newValue) => {
          handleRow(newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `"${params.inputValue} is not in your inventory"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={facilities}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <div
            {...props}
            style={{
              fontSize: "0.75rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              borderBottom: "1px solid gray",
            }}
          >
            <div style={{marginBottom: "5px"}}>
              <span>{option.name}</span>
            </div>

            <div style={{display: "flex"}}>
              <div style={{marginRight: "10px"}}>
                <span>
                  <strong>{option.quantity} </strong>
                </span>
                <span>{option.baseunit}(s) remaining</span>
              </div>
              <div>
                <span className="padleft">
                  <strong>Price:</strong> N{option.sellingprice}
                </span>
              </div>
            </div>
          </div>
        )}
        sx={{width: "100%", margin: "0.75rem 0"}}
        freeSolo
        renderInput={params => (
          <TextField
            {...params}
            label="Search for Products"
            onChange={e => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
            }}
            size="small"
            InputLabelProps={{
              shrink: true,
              style: {color: "#2d2d2d"},
            }}
          />
        )}
      />

      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header="Choose Store"
      >
        <ProductCreate />
      </ModalBox>
      {/* 
      <div className={`modal ${productModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Choose Store</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <ProductCreate />
          </section>
        </div>
      </div> */}
    </div>
  );
}
