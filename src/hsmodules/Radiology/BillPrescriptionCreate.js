/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {ProductCreate} from "./Products";
import Encounter from "../Documentation/Documentation";
import ModalBox from "../../components/modal";
import {
  Box,
  Grid,
  Typography,
  Card,
  Collapse,
  Grow,
  Button,
} from "@mui/material";
//import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import CustomTable from "../../components/customtable";
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};

export default function BillPrescriptionCreate({closeModal}) {
  // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset
  //const [error, setError] =useState(false)
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ProductEntryServ = client.service("productentry");
  const OrderServ = client.service("order");
  const BillCreateServ = client.service("createbilldirect");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [type, setType] = useState("Bill");
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
  const [paymentmode, setPaymentMode] = useState("");
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [billMode, setBillMode] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [obj, setObj] = useState("");
  const [objService, setObjService] = useState("");
  const [patient, setPatient] = useState("");
  const [contracts, setContracts] = useState("");
  const [category, setCategory] = useState("");

  const {state, setState} = useContext(ObjectContext);
  const inputEl = useRef(0);
  let calcamount1;
  let hidestatus;

  let medication = state.medicationModule.selectedMedication;
  //console.log(medication)

  const showDocumentation = async value => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    // handleSearch(val)
  };

  const handleChangeMode = async value => {
    // console.log(value)
    await setPaymentMode(value);
    // console.log(paymentOptions)
    let billm = paymentOptions.filter(el => el.name === value);
    await setBillMode(billm[0]);
  };

  const handleRow = async ProductEntry => {
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    //await setMedication(ProductEntry)

    const newProductEntryModule = {
      selectedMedication: ProductEntry,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      medicationModule: newProductEntryModule,
    }));
    //console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

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
    amount: calcamount, //||qamount
    baseunit,
    costprice,
    category: "Prescription", //category==="Inventory"?"Prescription":category,
    billingId,
    billMode,
  };

  const checkPrice = async (contracts, billMode) => {
    if (billMode.type === "HMO Cover") {
      //paymentmode
      if (billMode.detail.plan === "NHIS") {
        //find contract for NHIS
        let contract = contracts.filter(el => el.source_org_name === "NHIS");
        if (contract.length) {
          // console.log(contract[0].price)
          await setSellingPrice(contract[0].price);
        } else {
          toast.error(
            "Please NHIS does not have cover/price for this service. Either set service price for NHIS, try another service or bill using cash"
          );
          await setSellingPrice(0);
        }
      } else {
        let contract = contracts.filter(
          el => el.source_org === billMode.detail.organizationId
        );
        if (contract.length) {
          // console.log(contract[0].price)
          await setSellingPrice(contract[0].price);
        } else {
          toast.error(
            "Please HMO does not have cover/price for this service. Either set service price for HMO , try another drug, bill using cash or adjust amount "
          );
          await setSellingPrice(0);
        }
      }
    }
    if (billMode.type === "Company Cover") {
      //paymentmode
      let contract = contracts.filter(
        el => el.source_org === billMode.detail.organizationId
      );
      if (contract.length) {
        // console.log(contract[0].price)
        await setSellingPrice(contract[0].price);
      } else {
        toast.error(
          "Please company does not have cover/price for this service. Either set service price for Company or try another drug or bill using cash"
        );
        await setSellingPrice(0);
      }
    }
    if (billMode.type === "Cash" || billMode.type === "Family Cover") {
      //paymentmode
      let contract = contracts.filter(el => el.source_org === el.dest_org);
      if (contract.length) {
        // console.log(contract[0].price)
        await setSellingPrice(contract[0].price);
      } else {
        toast.error(
          "Please there is no cover/price for this service. Either set service price or try another service. Setting price at zero "
        );
        await setSellingPrice(0);
      }
    }
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = async obj1 => {
    // console.log(obj)

    if (!obj1) {
      //"clear stuff"
      setProductId("");
      setName("");
      setBaseunit("");
      setInventoryId("");
      setSellingPrice("");
      setInvQuantity("");
      setQAmount(null);
      setCostprice("");
      setContracts("");
      setCategory("");
      setBilllingId("");
      setObjService("");
      // setCalcAmount(null)
      return;
    }

    setProductId(obj1.productId);
    setName(obj1.name);
    setBaseunit(obj1.baseunit);
    setInventoryId(obj1.inventoryId);
    setSellingPrice(obj1.sellingprice); //modify this based on billing mode
    setInvQuantity(obj1.quantity);
    setCostprice(obj1.costprice);
    setBilllingId(obj1.billingId);
    setContracts(obj1.billingDetails.contracts);
    setCategory("Prescription"); //obj1.billingDetails.category
    await setObj(obj1);
    await setObjService(obj.billingDetails);
  };
  useEffect(() => {
    /*  console.log(obj)
        console.log(billMode)
        if( paymentmode!=="Cash" && obj){
            const contracts=obj.billingDetails.contracts
            let contract=contracts.filter(el=>el.source_org===billMode.detail.hmo)
           console.log(contract[0].price)
           setSellingPrice(contract[0].price)
           console.log(sellingprice)
       }
         return () => {
            
         } */
  }, [obj]);

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  const handleUpdateTotal = async () => {
    await setTotalamount(prevtotal => Number(prevtotal) + Number(calcamount));
  };

  const handleChangeType = async e => {
    //console.log(e.target.value)
    await setType(e.target.value);
  };

  const handleAmount = async () => {
    await setQAmount(null);
    // alert("Iam chaning qamount")
  };

  const handleClickProd = async () => {
    if (
      quantity === 0 ||
      quantity === "" ||
      productId === "" ||
      paymentmode === ""
    ) {
      toast.error("You need to choose a product and quantity to proceed");
      return;
    }

    await setSuccess(false);
    await setProductItem(prevProd => prevProd.concat(productItemI));
    handleUpdateTotal();
    // generate billing info
    const billInfo = {
      orderInfo: {
        orderId: medication._id,
        orderObj: medication,
      },
      serviceInfo: {
        price: productItemI.sellingprice,
        quantity: productItemI.quantity,
        productId: productItemI.productId,
        name: productItemI.name,
        baseunit: productItemI.baseunit,
        amount: productItemI.amount,
        billingId: productItemI.billingId,
        createdby: user._id,
      },
      paymentInfo: {
        amountDue: productItemI.amount,
        paidup: 0,
        balance: productItemI.amount,
        paymentDetails: [],
      },
      participantInfo: {
        billingFacility: medication.destination,
        billingFacilityName: medication.destination_name,
        locationId: state.StoreModule.selectedStore._id, //selected location,
        clientId: medication.clientId,
        client: medication.client,
        paymentmode: billMode,
      },
      createdBy: user.id,
      billing_status: "Unpaid",
    };

    //update order

    OrderServ.patch(medication._id, {
      order_status: "Billed", //Billed
      billInfo,
    })
      .then(resp => {
        // medication=resp
        // console.log(resp)
        handleRow(resp);
        //update dispense
      })
      .catch(err => {
        console.log(err);
      });

    //update status(billed) + action()
    //?attached chosen product to medication
    //dispense helper?
    setName("");
    setBaseunit("");
    setQuantity("");
    setInventoryId("");
    setSellingPrice("");
    setInvQuantity("");
    handleAmount();
    // setCalcAmount(null)
    await setSuccess(true);
    getSearchfacility(false);
    setObj("");

    setChangeAmount(true);
  };

  const handleQtty = async e => {
    if (invquantity < e.target.value) {
      toast.error("You can not sell more quantity than exist in inventory ");
      return;
    }
    setQuantity(e.target.value);
    calcamount1 = quantity * sellingprice;
    await setCalcAmount(calcamount1);
    //console.log(calcamount)
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

  const handleMedicationDone = async () => {
    const newProductEntryModule = {
      selectedMedication: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      medicationModule: newProductEntryModule,
    }));
    closeModal && closeModal();
    //console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

  const onSubmit = async e => {
    e.preventDefault();
    setMessage("");
    //setError(false)
    setSuccess(false);
    await setProductEntry({
      date,
      documentNo,
      type,
      totalamount,
      source,
    });
    productEntry.productitems = productItem;
    productEntry.createdby = user._id;
    productEntry.transactioncategory = "debit";

    // console.log("b4 facility",productEntry);
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
  };

  const handleChangeAmount = () => {
    setChangeAmount(rev => !rev);
  };

  const newclient = async () => {
    await setProductItem([]);
  };

  useEffect(() => {
    setPatient(medication.client);
    const oldname = medication.clientname;
    // console.log("oldname",oldname)
    setSource(medication.clientname);

    const newname = source;
    // console.log("newname",newname)
    if (oldname !== newname) {
      //newdispense

      setProductItem([]);
      setTotalamount(0);
    }

    return () => {};
  }, [medication]);

  useEffect(() => {
    //setPatient(medication.client)
    setProductItem([]);
    setTotalamount(0);
    const paymentoptions = [];
    // const info = client.paymentinfo
    let billme;
    let obj;
    patient &&
      patient.paymentinfo.forEach((pay, i) => {
        if (pay.active) {
          switch (pay.paymentmode) {
            case "Cash":
              // code block
              obj = createObj(pay, "Cash", "Cash", "Cash");

              paymentoptions.push(obj);
              setPaymentMode("Cash");
              billme = obj;
              // console.log("billme",billme)
              break;
            case "Family":
              // code block
              obj = createObj(
                pay,
                "Family Cover",
                "familyCover",
                "Family Cover"
              );
              paymentoptions.push(obj);
              setPaymentMode("Family Cover");
              billme = obj;
              // console.log("billme",billme)
              break;
            case "Company":
              // code block
              let name =
                "Company: " + pay.organizationName + "(" + pay.plan + ")";

              obj = createObj(pay, name, "CompanyCover", "Company Cover");
              paymentoptions.push(obj);
              setPaymentMode(
                "Company: " + pay.organizationName + "(" + pay.plan + ")"
              );
              billme = obj;
              // console.log("billme",billme)
              break;
            case "HMO":
              // code block
              let sname = "HMO: " + pay.organizationName + "(" + pay.plan + ")";

              obj = createObj(pay, sname, "HMOCover", "HMO Cover");
              paymentoptions.push(obj);
              setPaymentMode(
                "HMO: " + pay.organizationName + "(" + pay.plan + ")"
              );
              billme = obj;
              //  console.log("billme",billme)
              break;
            default:
            // code block
          }
        }
      });

    setPaymentOptions(paymentoptions);
    setBillMode(billme);
    //console.log(paymentoptions)
    // console.log(billMode)
    return () => {};
  }, [source]); //source

  useEffect(() => {
    // const medication =state.medicationModule.selectedMedication
    const today = new Date().toLocaleString();
    //console.log(today)
    setDate(today);
    const invoiceNo = random(6, "uppernumeric");
    setDocumentNo(invoiceNo);
    return () => {};
  }, []);

  useEffect(() => {
    // console.log("success", success)
    if (success) {
      setSuccess(false);
    }
  }, [success]);

  const createObj = (pay, name, cover, type) => {
    let details = {};
    details = {...pay};
    details.type = type;

    return {
      name,
      value: cover,
      detail: details,
      type,
    };
  };

  useEffect(() => {
    //update selling price
    if (!!billMode && !!contracts) {
      // console.log(contracts)
      checkPrice(contracts, billMode);
    }

    return () => {};
  }, [obj]);

  useEffect(() => {
    calcamount1 = quantity * sellingprice;
    setCalcAmount(calcamount1);
    // console.log(calcamount)
    setChangeAmount(true);
    return () => {};
  }, [quantity, sellingprice]);

  useEffect(() => {
    if (!!billMode && !!contracts) {
      checkPrice(contracts, billMode);
    }

    return () => {};
  }, [billMode]);

  const productSchema = [
    {
      name: "S/NO",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      sortable: true,
      required: true,
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
      key: "order",
      description: "Enter quantity",
      selector: row => row.quantity,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    ,
    {
      name: "Unit",
      key: "baseunit",
      description: "Enter Unit",
      selector: row => row.baseunit,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Selling Price",
      key: "sellingprice",
      description: "Enter selling price",
      selector: row => row.sellingprice,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Amount",
      key: "order",
      description: "Enter amount",
      selector: row => row.amount,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Actions",
      key: "actions",
      description: "Enter action",
      selector: row => <p style={{color: "red", fontSize: ".75rem"}}>Remove</p>,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];
  return (
    <>
      <div className="card card-overflow" style={{width: "100%"}}>
        <Box container sx={{width: "100%"}}>
          <Box item sx={{width: "100%", padding: "15px 0"}}>
            <Button onClick={showDocumentation} style={{fontSize: "0.8rem"}}>
              Documentation
            </Button>
          </Box>

          <form onSubmit={onSubmit} style={{width: "100%"}}>
            <Box container sx={{width: "100%"}}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Input
                    name="client"
                    value={source}
                    //register={register("client", {required: true})}
                    type="text"
                    onChange={e => setSource(e.target.value)}
                    label="Client"
                    disabled
                  />
                </Grid>

                <Grid item xs={4} mt={1.5}>
                  <CustomSelect
                    name="paymentmode"
                    defaultValue={paymentmode}
                    onChange={e => handleChangeMode(e.target.value)}
                    options={paymentOptions.map(item => item.name)}
                    initialOption="Payment option"
                    label="Billing Mode"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box container>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Input
                    className="input is-small"
                    value={date}
                    name="date"
                    type="text"
                    onChange={e => setDate(e.target.value)}
                    placeholder="Date"
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
                    disabled
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    value={totalamount}
                    name="totalamount"
                    type="text"
                    onChange={e => setTotalamount(e.target.value)}
                    label=" Total Amount"
                  />
                </Grid>
              </Grid>
            </Box>
          </form>

          <Box>
            <Grid container>
              <Grid item xs={12}>
                <Input
                  name="order"
                  value={medication.order}
                  type="text"
                  onChange={e => handleQtty(e)}
                  label="Medication"
                />
              </Grid>

              <Grid item>
                <Box
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                    }}
                    mr={0.5}
                    component="h1"
                  >
                    Medication :
                  </Typography>
                  <Typography
                    sx={{display: "inline", fontSize: "0.75rem"}}
                    component="span"
                  >
                    {medication.instruction}
                  </Typography>
                </Box>

                <Box
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                    }}
                    mr={0.5}
                    component="h1"
                  >
                    Billing Status :
                  </Typography>
                  <Typography
                    sx={{display: "inline", fontSize: "0.75rem"}}
                    component="span"
                  >
                    {medication.order_status}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography
              sx={{display: "inline", fontWeight: "bold", fontSize: "0.8rem"}}
              component="h1"
            >
              Choose Product Item:
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box>
                  <InventorySearch
                    getSearchfacility={getSearchfacility}
                    clear={success}
                  />

                  <Typography
                    sx={{
                      display: "inline",
                      fontSize: "0.85rem",
                    }}
                    component="span"
                  >
                    {sellingprice && "N"}
                    {sellingprice} {sellingprice && "per"} {baseunit}
                    {invquantity} {sellingprice && "remaining"}
                  </Typography>
                </Box>
                <input
                  style={{display: "none"}}
                  value={productId}
                  name="productId"
                  type="text"
                  onChange={e => setProductId(e.target.value)}
                  placeholder="Product Id"
                />
              </Grid>

              <Grid item xs={2}>
                <Box>
                  <Input
                    className="input is-small"
                    name="quantity"
                    value={quantity}
                    type="text"
                    onChange={e => handleQtty(e)}
                    label="Quantity"
                  />

                  <Button
                    variant="contained"
                    onClick={handleClickProd}
                    style={{
                      width: "100%",
                      fontSize: "0.8rem",
                    }}
                    // disabled={
                    //   quantity === 0 ||
                    //   quantity === "" ||
                    //   productId === "" ||
                    //   paymentmode === ""
                    // }
                  >
                    Add
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={2}>
                <Box>
                  <Input
                    className="input is-small"
                    name="qamount"
                    disabled={changeAmount}
                    value={calcamount}
                    type="text"
                    onChange={async e => await setCalcAmount(e.target.value)}
                    label="Amount"
                  />
                  <Button
                    variant="contained"
                    onClick={handleChangeAmount}
                    style={{
                      width: "100%",
                      fontSize: "0.8rem",
                      //background: "#0364FF",
                    }}
                  >
                    {!changeAmount ? "Done" : "Adjust"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {productItem.length > 0 && (
          <Box>
            <div
              style={{
                width: "100%",
                height: "200px",
                overflowY: "scroll",
              }}
            >
              <CustomTable
                title={""}
                columns={productSchema}
                data={productItem}
                pointerOnHover
                highlightOnHover
                striped
                //onRowClicked={row => handleMedicationRow(row)}
                progressPending={false}
              />
            </div>
            <Button
              disabled={!productItem.length > 0}
              onClick={handleMedicationDone}
              variant="contained"
            >
              Done
            </Button>
          </Box>
        )}
      </div>

      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header="Documentation"
      >
        <section className="modal-card-body modalcolor">
          <Encounter standalone={true} />
        </section>
      </ModalBox>
    </>
  );
}

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

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

  const dropDownRef = useRef(null);

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
    /*  if (count===2){
             console.log("stuff was chosen")
         }
        */
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
          //  console.log("product  fetched successfully")
          //  console.log(res.data)
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
      //  console.log("success has changed",clear)
      setSimpa("");
    }
    return () => {};
  }, [clear]);

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className="dropdown-trigger"
            style={{width: "100%", position: "relative"}}
          >
            <DebounceInput
              className="input is-small  is-expanded"
              type="text"
              placeholder="Search Product"
              value={simpa}
              minLength={3}
              debounceTimeout={400}
              onBlur={e => handleBlur(e)}
              onChange={e => handleSearch(e.target.value)}
              inputRef={inputEl}
              element={Input}
            />

            <Grow in={showPanel}>
              <Card>
                <Box
                  ref={dropDownRef}
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "150px",
                    overflowY: "scroll",
                    zIndex: "5",
                    position: "absolute",
                    background: "#ffffff",
                    width: "100%",
                    border: "1px solid lightgray",
                    zIndex: "500",
                  }}
                >
                  {facilities.length > 0 ? (
                    facilities.map((facility, i) => (
                      <Box
                        item
                        key={i}
                        onClick={() => handleRow(facility)}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          padding: "0 8px",
                          width: "100%",
                          minHeight: "50px",
                          borderTop: i !== 0 ? "1px solid gray" : "",
                          cursor: "pointer",
                          zIndex: "100",
                        }}
                      >
                        <span>{facility.name}</span>
                        <div>
                          <span>
                            <strong>{facility.quantity}</strong>{" "}
                            {facility.baseunit}(s) remaining
                          </span>

                          <span style={{paddingLeft: "5px"}}>
                            <strong>Price:</strong> N{facility.sellingprice}
                          </span>
                        </div>
                      </Box>
                    ))
                  ) : (
                    <Box
                      className="dropdown-item"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        width: "100%",
                        minHeight: "50px",
                        borderTop: "1px solid gray",
                        cursor: "pointer",
                        zIndex: "100",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                        }}
                      >
                        {val} doesn't exist in your inventory
                      </span>{" "}
                    </Box>
                  )}
                </Box>
              </Card>
            </Grow>
          </div>
        </div>
      </div>
    </div>
  );
}
