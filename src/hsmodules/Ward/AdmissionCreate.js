/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
//import {ProductCreate} from './Products'
import Encounter from "../Documentation/Encounter";
import ServiceSearch from "../helpers/ServiceSearch";
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};

export default function AdmissionCreate() {
  // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset
  //const [error, setError] =useState(false)
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ProductEntryServ = client.service("productentry");
  const OrderServ = client.service("order");
  const LocationServ = client.service("location");
  const BillCreateServ = client.service("createbilldirect");
  const AdmissionServ = client.service("admission");
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
  const [quantity, setQuantity] = useState(1);
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
  const [chosenBed, setChosenBed] = useState();
  const [bedObject, setBedObject] = useState();

  const {state, setState} = useContext(ObjectContext);
  const inputEl = useRef(0);
  let calcamount1;
  let hidestatus;

  let medication = state.AdmissionModule.selectedAdmission;
  let physicalbeds = state.WardModule.selectedWard?.sublocations;
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
    //console.log(billm)
    // at startup
    // check payment mode options from patient financial info
    // load that to select options
    // default to HMO-->company-->family-->cash
    //when chosen
    //append payment mode to order
    //check service contract for pricing info
    // calculate pricing
    // pricing
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
          toast({
            message:
              "Please NHIS does not have cover/price for this service. Either set service price for NHIS, try another service or bill using cash",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
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
          toast({
            message:
              "Please HMO does not have cover/price for this service. Either set service price for HMO , try another drug, bill using cash or adjust amount ",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
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
        toast({
          message:
            "Please company does not have cover/price for this service. Either set service price for Company or try another drug or bill using cash",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
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
        toast({
          message:
            "Please there is no cover/price for this service. Either set service price or try another service. Setting price at zero ",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
        await setSellingPrice(0);
      }
    }
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = async service => {
    // console.log(obj)

    if (!service) {
      //"clear stuff"
      setProductId("");
      setName("");
      setBaseunit("");
      setInventoryId("");
      setSellingPrice(0);
      setInvQuantity("");
      setQAmount(null);
      setCostprice("");
      setContracts("");
      setCategory("");
      setInventoryId("");
      setBilllingId("");
      // setCalcAmount(null)
      return;
    }

    setContracts(service.contracts);
    setProductId(service.productId);
    setName(service.name);
    setCategory(service.category); //Lab Order
    setBaseunit(service.baseunit);
    setInventoryId(service.inventoryId);
    setBilllingId(service._id);
    await setObj(service);
  };
  useEffect(() => {}, [obj]);

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
    /*   console.log("amount: ",productItemI.amount)
         console.log("qamount: ",qamount)
         console.log("calcamount: ",calcamount) */
    if (
      quantity === 0 ||
      quantity === "" ||
      productId === "" ||
      paymentmode === ""
    ) {
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
    /* console.log(success)
        console.log(qamount)
        console.log(productItem) */
    setChangeAmount(true);
  };

  const handleQtty = async e => {
    /*  if (invquantity<e.target.value){
             toast({
                 message: 'You can not sell more quantity than exist in inventory ' ,
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               })
             return
         } */
    setQuantity(e.target.value);
    if (e.target.vlue === "") {
      setQuantity(1);
    }
    /*  calcamount1=quantity*sellingprice
         await setCalcAmount(calcamount1) */
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

  const handleAdmit = async e => {
    //handle admit

    //alert("something")
    //update order
    //create admission resource
    //?create bill?

    const note = {
      Note:
        "Patient Admitted to " +
        state.employeeLocation.locationName +
        " " +
        state.employeeLocation.locationType +
        " at " +
        Date().toLocaleString(),
      Instruction: medication.instruction,
    };

    //console.log(note)
    let document = {};
    // data.createdby=user._id
    // console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = note;
    console.log(document.documentdetail);
    document.documentname = "Admission"; //state.DocumentClassModule.selectedDocumentClass.name
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = medication.client._id;
    document.clientname =
      medication.client.firstname +
      " " +
      medication.client.middlename +
      " " +
      medication.client.lastname;
    document.clientobj = medication.client;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = "completed";

    const data = {
      //  encounter_id:{type: Schema.Types.ObjectId,},
      //  hospitalization_id:{type: Schema.Types.ObjectId,},
      //order
      order: medication,
      order_id: medication._id,

      //location: ward/bed
      ward_name: state.WardModule.selectedWard.typeName,
      ward_id: state.WardModule.selectedWard._id,
      bed: bedObject.typeName,
      bed_id: bedObject._id,
      facility: user.currentEmployee.facilityDetail._id,
      //billing:perpertuity
      /* bill:{type:Schema.Types.Mixed},
                bill_id:{type: Schema.Types.ObjectId,}, */
      //status
      status: "occupied",
      //client
      client: medication.client,
      client_id: medication.clientId,
      //careteam
      admissionhx: [],
      careteam: [],
      start_time: new Date(),
      //end_time:"",
      createdby: user._id,
      documentation: document,
    };

    e.preventDefault();
    setMessage("");
    //  setError(false)
    setSuccess(false);
    // data.createdby=user._id
    console.log(data);
    /*   if (user.currentEmployee){
                 data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
                  } */
    // data.locationType="Front Desk"
    AdmissionServ.create(data)
      .then(async res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        /*  setMessage("Created Clinic successfully") */
        setSuccess(true);
        toast({
          message: "Admission successfull",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setChosenBed();
        setBedObject();
        const newProductEntryModule = {
          selectedAdmission: {},
          show: "",
        };
        await setState(prevstate => ({
          ...prevstate,
          AdmissionModule: newProductEntryModule,
        }));
      })
      .catch(err => {
        toast({
          message: "Error creating Admission " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const handleBed = e => {
    //console.log(JSON.parse(e.target.value))
    setChosenBed(e.target.value);
    let simpa = physicalbeds.find(obj => obj._id === e.target.value);
    setBedObject(simpa);
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
      //newclient

      //recalculate bedspace: subtract occupied from physical space

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
    const ward = state.WardModule.selectedWard;
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

  // console.log("simpa")
  return (
    <>
      <div className="card card-overflow">
        <div className="card-header">
          <p className="card-header-title">Admit Patient</p>
          <button
            className="button is-success is-small btnheight mt-2"
            onClick={showDocumentation}
          >
            Documentation
          </button>
        </div>
        <div className="card-content ">
          <form onSubmit={onSubmit}>
            {" "}
            {/* handleSubmit(onSubmit) */}
            <div className="field is-horizontal">
              <div className="field-body">
                {/*  <div className="field">    
                 <div className="control">
                     <div className="select is-small">
                         <select name="type" value={type} onChange={handleChangeType} className="selectadd">
                            <option value="">Choose Type </option>
                             <option value="Dispense">Dispense</option>
                             <option value="Bill">Bill </option> */}
                {/* <option value="Dispense">Dispense</option>
                             <option value="Audit">Audit</option> */}
                {/*         </select>
                     </div>
                 </div>
             </div>
 */}
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      /* ref={register({ required: true })} */ value={source}
                      name="client"
                      type="text"
                      onChange={e => setSource(e.target.value)}
                      placeholder="Client"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <div className="control">
                    <div className="select is-small ">
                      <select
                        name="paymentmode"
                        value={paymentmode}
                        onChange={e => handleChangeMode(e.target.value)}
                        className="selectadd"
                      >
                        <option value="">Billing Mode </option>
                        {paymentOptions.map((option, i) => (
                          <option key={i} value={option.details}>
                            {" "}
                            {option.name}
                          </option>
                        ))}

                        {/*  <option value="Cash">Cash</option>
                             <option value="Family">Family </option>
                            <option value="Company Cover">Company Cover</option>
                             <option value="HMO">HMO</option> */}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* array of ProductEntry items */}

          <label className="label is-small">Admission Ward:</label>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field" style={{width: "40%"}}>
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    /* ref={register({ required: true })} */ disabled
                    name="order"
                    value={medication.order}
                    type="text"
                    onChange={e => handleQtty(e)}
                    placeholder="Quantity"
                  />

                  {/*  <span className="helper is-size-7"><strong>Instruction: </strong>{medication.instruction}</span> */}
                </p>
                <span className="helper is-size-7">
                  <strong>Instructions: </strong>
                </span>
                <p>{medication.instruction}</p>
              </div>
            </div>
          </div>
          <label className="label is-small">Choose Bed:</label>
          {!!state.WardModule.selectedWard.sublocations && (
            <div>
              <select
                name="bed"
                value={chosenBed}
                onChange={e => handleBed(e)}
                className="selectadd"
              >
                <option value="">Choose Bed </option>
                {physicalbeds.map((locat, i) => (
                  <option key={i} value={locat._id}>
                    {" "}
                    {locat.typeName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <div className="field mt-2 is-grouped">
              <p className="control">
                <button
                  className="button is-success is-small"
                  /* disabled={!productItem.length>0} */ onClick={handleAdmit}
                >
                  Admit
                </button>
              </p>
              {/*  <p className="control">
                     <button className="button is-warning is-small" disabled={!productItem.length>0} onClick={onSubmit} >
                         Clear
                     </button>
                 </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className={`modal ${productModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card  modalbkgrnd">
          <header className="modal-card-head  btnheight">
            <p className="modal-card-title">Documentation</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body modalcolor">
            <Encounter standalone="true" />
          </section>
          {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer>  */}
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
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? "is-active" : ""}`}
            style={{width: "100%"}}
          >
            <div className="dropdown-trigger" style={{width: "100%"}}>
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
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {/* {searchError&&<div>{searchMessage}</div>} */}
            <div className="dropdown-menu expanded" style={{width: "100%"}}>
              <div className="dropdown-content">
                {facilities.length > 0 ? (
                  ""
                ) : (
                  <div
                    className="dropdown-item" /* onClick={handleAddproduct} */
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
      </div>
    </div>
  );
}
