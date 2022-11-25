/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {ProductCreate} from "./Products";
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import ModalBox from "../../components/modal";
import moment from "moment";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";

const filter = createFilterOptions();

import TextField from "@mui/material/TextField";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Grid,
  Button as MuiButton,
  Divider,
  Typography,
} from "@mui/material";
import {FormsHeaderText} from "../../components/texts";
import GlobalCustomButton from "../../components/buttons/CustomButton";

export default function ProductEntry() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-6 ">
          <ProductExitList />
        </div>
        <div className="column is-6 ">
          {state.ProductExitModule.show === "create" && <ProductExitCreate />}
          {state.ProductExitModule.show === "detail" && <ProductExitDetail />}
          {state.ProductExitModule.show === "modify" && (
            <ProductExitModify ProductEntry={selectedProductEntry} />
          )}
        </div>
      </div>
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
  const {user} = useContext(UserContext); //,setUser
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
  const {state} = useContext(ObjectContext);
  const inputEl = useRef(0);
  let calcamount1;
  let hidestatus;

  //console.log("medication", medication);

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
  const getSearchfacility = obj => {
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
    setTotalamount(prevtotal => Number(prevtotal) + Number(calcamount));
  };

  const handleChangeType = async e => {
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
    await setProductItem(prevProd => prevProd.concat(productItemI));
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

  const handleQtty = async e => {
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

  const onSubmit = async e => {
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
      toast.error("You can not remove inventory from any organization");
      return;
    }
    if (state.StoreModule.selectedStore._id) {
      productEntry.storeId = state.StoreModule.selectedStore._id;
    } else {
      toast.error("You need to select a store before removing inventory");
      return;
    }
    console.log("b4 create", productEntry);
    ProductEntryServ.create(productEntry)
      .then(res => {
        //console.log(JSON.stringify(res))
        resetform();
        /*  setMessage("Created ProductEntry successfully") */
        setSuccess(true);
        toast.success("ProductExit created succesfully");
        setSuccess(false);
        setProductItem([]);
        const today = new Date().toLocaleString();

        setDate(today);
        const invoiceNo = random(6, "uppernumeric");
        setDocumentNo(invoiceNo);
        setType("Sales");
      })
      .catch(err => {
        toast.error(`Error creating ProductExit ${err}`);
      });
  };

  const handleChangeAmount = () => {
    setChangeAmount(rev => !rev);
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

  let medication = state.financeModule.selectedFinance;
  const dispenseProducts = state.financeModule.selectedBills;

  useEffect(() => {
    if (!!medication) {
      const oldname =
        medication.participantInfo.client.firstname +
        " " +
        medication.participantInfo.client.lastname;
      // console.log("oldname",oldname)
      setSource(
        medication.participantInfo.client.firstname +
          " " +
          medication.participantInfo.client.lastname
      );

      const updatedDispenseProducts = dispenseProducts.map(item => {
        let newItem = item;
        newItem.serviceInfo.sellingprice = newItem.serviceInfo.price;
        newItem.serviceInfo.billinfo = {
          billid: newItem._id,
          bill_status: newItem.billing_status,
          orderId: newItem.orderInfo.orderId,
        };

        return newItem.serviceInfo;
      });

      const newname = source;
      // console.log("newname",newname)
      if (oldname !== newname) {
        //newdispense

        setProductItem([]);
        setTotalamount(0);
      }
      setType("Dispense");
      if (state.financeModule.state) {
        /*  medication.show="none"
            medication.proposedpayment={
                balance:0,
                paidup:medication.paymentInfo.paidup + medication.paymentInfo.balance,
                amount:medication.paymentInfo.balance
            } */
        //no payment detail push
        getTotal();
        medication.serviceInfo.sellingprice = medication.serviceInfo.price;
        medication.serviceInfo.billinfo = {
          billid: medication._id,
          bill_status: medication.billing_status,
          orderId: medication.orderInfo.orderId,
        };

        setProductItem(prevProd => prevProd.concat(updatedDispenseProducts));
        //console.log(state.financeModule.selectedBills);
      } else {
        if (productItem.length > 0) {
          setProductItem(prevProd =>
            prevProd.filter(
              el => el.productId !== medication.serviceInfo.productId
            )
          );
        }
      }

      // const paymentoptions= []
      //const info = medication.participantInfo.client.paymentinfo
      //let billme={}
      getTotal();
    }
    return () => {};
  }, [state.financeModule]);

  const getTotal = async () => {
    setTotalamount(0);
    productItem.forEach(el => {
      setTotalamount(prevtotal => Number(prevtotal) + Number(el.amount));
    });
  };

  useEffect(() => {
    getTotal();
    console.log(totalamount);
    return () => {};
  }, [productItem]);

  const productCreateSchema = [
    {
      name: "S/N",
      key: "sn",
      width: "70px",
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
      name: "QTY",
      width: "70px",
      key: "quanity",
      description: "Enter quantity",
      selector: row => row.quantity,
      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
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

  return (
    <>
      <Box
        sx={{
          width: "90vw",
          maxHeight: "80vh",
        }}
      >
        <Box container>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12}>
              <Box sx={{height: "40px"}} mb={1}>
                <FormsHeaderText text="Product Detail" />
              </Box>

              <Grid container spacing={1}>
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
                <Grid item xs={4}>
                  <CustomSelect
                    defaultValue={type}
                    name="type"
                    options={["Sales", "In-house", "Dispense", "Audit"]}
                    onChange={handleChangeType}
                  />
                </Grid>
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
            </Grid>

            <Grid item lg={6} md={6} sm={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "40px",
                }}
                mb={1}
              >
                <FormsHeaderText text="Add Product Items" />

                <GlobalCustomButton onClick={handleClickProd}>
                  <AddCircleOutline
                    sx={{marginRight: "5px"}}
                    fontSize="small"
                  />
                  Add
                </GlobalCustomButton>
              </Box>

              <Grid container spacing={1}>
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
                    <GlobalCustomButton
                      onClick={handleChangeAmount}
                      sx={{marginTop: "5px"}}
                    >
                      Adjust Amount
                    </GlobalCustomButton>
                  </Box>
                </Grid>
              </Grid>

              {productItem.length > 0 && (
                <Box sx={{width: "100%"}} mt={1}>
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
            </Grid>
          </Grid>
        </Box>

        <Box
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
          mt={2}
        >
          <GlobalCustomButton
            disabled={!productItem.length > 0}
            onClick={onSubmit}
            sx={{
              marginRight: "15px",
            }}
          >
            Complete sale
          </GlobalCustomButton>

          <GlobalCustomButton
            variant="outlined"
            color="error"
            onClick={closeModal}
          >
            Cancel
          </GlobalCustomButton>
        </Box>
      </Box>
    </>
  );
}

export function ProductExitList() {
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
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  const handleCreateNew = async () => {
    const newProductExitModule = {
      selectedProductEntry: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
    }));
    //console.log(state)
  };
  const handleRow = async ProductEntry => {
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    await setSelectedProductEntry(ProductEntry);

    const newProductExitModule = {
      selectedProductEntry: ProductEntry,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
    }));
    //console.log(state)
  };

  const handleSearch = val => {
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
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
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
    ProductEntryServ.on("created", obj => getFacilities());
    ProductEntryServ.on("updated", obj => getFacilities());
    ProductEntryServ.on("patched", obj => getFacilities());
    ProductEntryServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  useEffect(() => {
    getFacilities();
    console.log("store changed");
    return () => {};
  }, [state.StoreModule.selectedStore]);
  //todo: pagination and vertical scroll bar

  return (
    <>
      {state.StoreModule.selectedStore ? (
        <>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <p className="control has-icons-left  ">
                    <DebounceInput
                      className="input is-small "
                      type="text"
                      placeholder="Search ProductEntry"
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
                Product Exits{" "}
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
                  <th>
                    <abbr title="Date">Date</abbr>
                  </th>
                  <th>
                    <abbr title="Type">Type</abbr>
                  </th>
                  <th>Client</th>
                  <th>
                    <abbr title="Document No">Document No</abbr>
                  </th>
                  <th>
                    <abbr title="Total Amount">Total Amount</abbr>
                  </th>
                  <th>
                    <abbr title="Enteredby">Entered By</abbr>
                  </th>
                  <th>
                    <abbr title="Actions">Actions</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {facilities.map((ProductEntry, i) => (
                  <tr
                    key={ProductEntry._id}
                    onClick={() => handleRow(ProductEntry)}
                  >
                    <th>{i + 1}</th>
                    <td>{ProductEntry.date}</td>
                    <th>{ProductEntry.type}</th>
                    <td>{ProductEntry.source}</td>
                    <td>{ProductEntry.documentNo}</td>
                    <td>{ProductEntry.totalamount}</td>
                    <td>{ProductEntry.enteredby}</td>
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
  const {state, setState} = useContext(ObjectContext);

  const ProductEntry = state.ProductExitModule.selectedProductEntry;

  const handleEdit = async () => {
    const newProductExitModule = {
      selectedProductEntry: ProductEntry,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
    }));
    //console.log(state)
  };

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
                    {ProductEntry.date}{" "}
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
          <label className="label is-size-7 mt-2">Product Items:</label>
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
                  <abbr title="Selling Price">Selling Price</abbr>
                </th>
                <th>
                  <abbr title="Amount">Amount</abbr>
                </th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {ProductEntry.productitems.map((ProductEntry, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{ProductEntry.name}</td>
                  <th>{ProductEntry.quantity}</th>
                  <td>{ProductEntry.baseunit}</td>
                  <td>{ProductEntry.sellingprice}</td>
                  <td>{ProductEntry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*   <tr>
                    <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>Profession: 
                
                    
                    </label>
                    </td>
                <td>
                <span className="is-size-7 padleft "  name="ProductEntryCity">{ProductEntry.profession}</span> 
                </td>
                </tr>
                    <tr>
            <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>Phone:           
                    
                        </label>
                        </td>
                        <td>
                        <span className="is-size-7 padleft "  name="ProductEntryContactPhone" >{ProductEntry.phone}</span>
                        </td>
                  </tr>
                    <tr><td>
            
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>Email:                     
                    
                         </label></td><td>
                         <span className="is-size-7 padleft "  name="ProductEntryEmail" >{ProductEntry.email}</span>
                         </td>
             
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i></span>Department:
                    
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft "  name="ProductEntryOwner">{ProductEntry.department}</span>
                    </td>
               
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>Departmental Unit:              
                    
                </label></td>
                <td>
                <span className="is-size-7 padleft "  name="ProductEntryType">{ProductEntry.deptunit}</span>
                </td>
              
                </tr> */}

          {/*   <div className="field">
             <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>Category:              
                    <span className="is-size-7 padleft "  name= "ProductEntryCategory">{ProductEntry.ProductEntryCategory}</span>
                </label>
                 </div> */}

          {/*  <div className="field mt-2">
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Edit
                    </button>
                </p>
            </div>
            { error && <div className="message"> {message}</div>} */}
        </div>
      </div>
    </>
  );
}

export function ProductExitModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
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
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

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
    await setState(prevstate => ({
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
    setState(prevstate => ({
      ...prevstate,
      ProductExitModule: newProductExitModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = ProductEntry._id;
    if (conf) {
      ProductEntryServ.remove(dleteId)
        .then(res => {
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
        .catch(err => {
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
      .then(res => {
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
      .catch(err => {
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
                    {...register("x", {required: true})}
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
                    {...register("x", {required: true})}
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

export function InventorySearch({getSearchfacility, clear}) {
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
  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);

  const handleRow = async obj => {
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
  const handleBlur = async e => {
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
  const handleSearch = async value => {
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
        .then(res => {
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
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
      <Autocomplete
        size="small"
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
        sx={{width: "100%"}}
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
            InputLabelProps={{
              shrink: true,
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
