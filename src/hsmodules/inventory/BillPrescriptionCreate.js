/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {ProductCreate} from "./Products";
import Encounter from "../Documentation/Documentation";
import Input from "../../components/inputs/basic/Input";
import Button from "./ui-components/buttons/Button";
import { Box } from "@mui/material";
import { GridWrapper } from "../app/styles";
import CustomTable from "../../components/customtable";
import CustomSelect from "../../components/inputs/basic/Select"
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};


export default function BillPrescriptionCreate() {
  const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset
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
    // const contracts=obj.billingDetails.contracts
    //const billingserv=client.service('billing')
    //just did this
    /* if( billMode.type==="HMO Cover"){ //paymentmode
         let contract=contracts.filter(el=>el.source_org===billMode.detail.hmo)
         if (contract.length){
            console.log(contract[0].price)
            setSellingPrice(contract[0].price)
            console.log(sellingprice)
         }else{
            toast({
                message: 'Please HMO does not have cover/price for this drug. Either set drug price for HMO or try another drug or bill using cash',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
              setSellingPrice(0)
         }
        
        
        }
        if( billMode.type==="Company Cover"){ //paymentmode
            let contract=contracts.filter(el=>el.source_org===billMode.detail.company)
            if (contract.length){
            console.log(contract[0].price)
            setSellingPrice(contract[0].price)
            console.log(sellingprice)
           
           }else{

            toast({
                message: 'Please company does not have cover/price for this drug. Either set drug price for Company or try another drug or bill using cash',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
              setSellingPrice(0)   
         }
          
        /*  setValue("facility", obj._id,  {
             shouldValidate: true,
             shouldDirty: true
         }) */
    /*} */
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
    //handle selected single order
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    // await setSelectedMedication("")

    const newProductEntryModule = {
      selectedMedication: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      medicationModule: newProductEntryModule,
    }));
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
    //console.log("b4 create",productEntry);
    // ProductEntryServ.create(productEntry)
    //.then((res)=>{
    //console.log(JSON.stringify(res))
    //      resetform()
    /*  setMessage("Created ProductEntry successfully") */
    //    setSuccess(true)
    //  toast({
    /*    message: 'ProductExit created succesfully',
                     type: 'is-success',
                     dismissible: true,
                     pauseOnHover: true,
                   })
                   setSuccess(false)
                   setProductItem([])
                   const today=new Date().toLocaleString()
       
                   setDate(today)
                   const invoiceNo=random(6,'uppernumeric')
                 setDocumentNo(invoiceNo)
                 setType("Sales")
             })
             .catch((err)=>{
                 toast({
                     message: 'Error creating ProductExit ' + err,
                     type: 'is-danger',
                     dismissible: true,
                     pauseOnHover: true,
                   })
             }) */
  };

  // console.log("i am rendering")
  /*   useEffect(() => {
         setMedication(state.medicationModule.selectedMedication)
        // console.log(medication)
         return () => {
             
         }
     }, [state])
  */
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

    /*         const paymentoptions= []
        const info = medication.client.paymentinfo
        let billme={}
       
        if( medication.client.paymentinfo.cash===true){
            const details={}
            details.detail=  info.cashDetails
            details.type="Cash"
            const obj={
                name:"Cash",
                value:"Cash",
                detail:details,
                type:"Cash"
            }
            paymentoptions.push(obj)
            setPaymentMode("Cash")
            billme=obj
        }
        if( medication.client.paymentinfo.familyCover===true){
            const details={}
            details.detail=  info.familyDetails
            details.type="Family Cover"
            const obj={
                name:"Family Cover",
                value:"familyCover",
                detail:details,
                type:"Family Cover"
            }
            paymentoptions.push(obj)
            setPaymentMode("Family Cover")
            billme=obj
            
        }
        if( medication.client.paymentinfo.companyCover===true){
            const details={}
            details.type="Company Cover"
            details.detail=  info.companyDetails.filter(el=>el.active===true)
            details.detail.forEach(el=>{
                const obj={
                    name:"Company: " +el.companyName +"("+el.companyPlan+")",
                    value:"companyCover",
                    detail:el,
                    type:"Company Cover" 
                }
                paymentoptions.push(obj)
                setPaymentMode("Company: " +el.companyName +"("+el.companyPlan+")")
               // console.log("Company: " +el.companyName +"("+el.companyPlan+")")
               billme=obj
            })
        }

        if( medication.client.paymentinfo.hmoCover===true){
            
            const details={}
            details.type="HMO Cover"
            details.detail=  info.hmoDetails.filter(el=>el.active===true)
            details.detail.forEach(el=>{
                const obj={
                    name:"HMO: " +el.hmoName +"("+el.hmoPlan+")",
                    value:"hmoCover",
                    detail:el,
                    type:"HMO Cover"
                }
                paymentoptions.push(obj)
                setPaymentMode("HMO: " +el.hmoName +"("+el.hmoPlan+")")
                //console.log("HMO: " +el.hmoName +"("+el.hmoPlan+")")
                billme=obj
            })
         
        }
        setPaymentOptions(paymentoptions)
        setBillMode(billme)
       console.log(paymentoptions)
        console.log(billMode) */
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

  const billDescriptionSchema = [
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
      description: "name",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  
    {
      name: "Quantity",
      key: "quantity",
      description: "quantity",
      selector: row => row.quantity,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  
    {
      name: "Baseunit",
      key: "baseunit",
      description: "baseunit",
      selector: row => row.baseunit,
      sortable: true,
      required: true,
      inputType: "checkbox",
    },
    

      {
        name: "Selling gprice",
        key: "sellingprice",
        description: "sellingprice",
        selector: row => row.sellingprice,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Amount",
        key: "amount",
        description: "amount",
        selector: row => row.amount,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
]  

const proddata=[{sn:1, name:"Helen", quantity:"2", baseunit:"4", sellingprice:"200", amount:"3"}]

  // console.log("simpa")
  return (
    <>
      <div >
        <div >
          <button
            className="button is-success is-small btnheight mt-2"
            onClick={showDocumentation}
          >
            Documentation
          </button>
        </div>
        <div className="card-content ">
          <form onSubmit={onSubmit}>
              {" "}<GridWrapper>
            <CustomSelect
                name="type" value={type} 
                onChange={handleChangeType}
                options={["Choose Type", "Dispense", "Bill", "Audit"]}/>

                <Input
                    register={register("client", {required:true})}
                      value={source}
                    name="client"
                    type="text"
                    onChange={e => setSource(e.target.value)}
                    placeholder="Client"
                  />
                  <CustomSelect
                       name="paymentmode"
                       value={paymentmode}
                       onChange={e => handleChangeMode(e.target.value)}
                       options={["Cash", "Family", "Cover", "HMO"]}              
                  /> {""}

                      <Input
                       register={register("date", {required:true})}
                       name="date"
                       type="text"
                       onChange={e => setDate(e.target.value)}
                       placeholder="Date"
                      />

                      <Input
                     register={register("documentNo", {required:true})}
                      name="documentNo"
                      value={documentNo}
                      type="text"
                      onChange={e => setDocumentNo(e.target.value)}
                      placeholder=" Invoice Number"/>

                      <Input
                     register={register("totalamount", {required:true})}
                      value={totalamount}
                      name="totalamount"
                      type="text"
                      onChange={e => setTotalamount(e.target.value)}
                      placeholder=" Total Amount"/>



                </GridWrapper>

                    
                   
                      </form>

          {/* array of ProductEntry items */}

         
  <GridWrapper>
                 	
                   <Input
                   register={register("order", {required:true})}
                   name="order"
                   value={medication.order}
                   type="text"
                   onChange={e => handleQtty(e)}
                   placeholder="Quantity"
                   />
                   
                   <Box>
                   <strong>Instruction: </strong>
                 {medication.instruction}
                 </Box>
                 <Box>
                 <strong>Billing Status: </strong>
               {medication.order_status}
               </Box>

               <InventorySearch
                     getSearchfacility={getSearchfacility}
                     clear={success}
                   />
                 

             <Input

             register={register("productId", {required:true})} 
             value={productId}
             name="productId"
             type="text"
             onChange={e => setProductId(e.target.value)}
             placeholder="Product Id"
             />

             <Input
                 register={register("quantity", {required:true})} 
                 name="quantity"
                 value={quantity}
                 type="text"
                 onChange={e => handleQtty(e)}
                 placeholder="Quantity"
             />

                 <Input
                 name="qamount"
                 disabled={changeAmount}
                 value={calcamount}
                 type="text"
                 onChange={async e => await setCalcAmount(e.target.value)}
                 placeholder="Amount"
               />

               <Button
               style={{fontSize: "14px", fontWeight: "600", width:"80px"}}
               label="Adjust"
               onClick={handleChangeAmount}
             />

               {/* <Button
               style={{fontSize: "14px", fontWeight: "600", width:"80px"}}
                onClick={handleClickProd}/> */}

               

               </GridWrapper>

               <CustomTable
                       title={"Product Table"}
                       columns={billDescriptionSchema}
                       data={proddata}
                       pointerOnHover
                       highlightOnHover
                       striped
               />
                <Box style={{display: "flex", marginTop: "30px",  marginBottom:"30px"
        }}>
               {/* <Button 
               style={{fontSize: "14px", fontWeight: "600", width:"80px"}}
                disabled={!productItem.length > 0}
                 onClick={handleMedicationDone}>Done </Button> */}
               {/* <Button
               style={{fontSize: "14px", fontWeight: "600", width:"80px"}} disabled={!productItem.length>0} onClick={onSubmit} >
                      Clear
              </Button> */}
               
              {/* <Button style={{fontSize: "14px", fontWeight: "600", width:"80px"}}
           onClick={handlecloseModal}/> */}

           <Button style={{fontSize: "14px", fontWeight: "600", width:"80px"}}>Save</Button>
           {/* <Button style={{fontSize: "14px", fontWeight: "600", width:"80px"}}>Cancel</Button> */}
               </Box>  </div>
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
