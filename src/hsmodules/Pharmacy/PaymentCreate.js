/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {ProductCreate} from "./Products";
import Encounter from "../Documentation/Encounter";
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};

export default function PaymentCreate() {
  // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset
  //const [error, setError] =useState(false)

  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const SubwalletTxServ = client.service("subwallettransactions");
  const SubwalletServ = client.service("subwallet");
  const OrderServ = client.service("order");
  const InvoiceServ = client.service("invoice");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [type, setType] = useState("Bill");
  const [documentNo, setDocumentNo] = useState("");
  const [totalamount, setTotalamount] = useState(0);
  const [description, setDescription] = useState("");
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
  const [paymentmode, setPaymentMode] = useState("Cash");
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [billMode, setBillMode] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [obj, setObj] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [balance, setBalance] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  const [partPay, setPartPay] = useState([]);
  const [part, setPart] = useState(false);
  const [partBulk, setPartBulk] = useState("");
  const [isPart, setIsPart] = useState(false);
  const [subWallet, setSubWallet] = useState();

  const {state, setState} = useContext(ObjectContext);
  const inputEl = useRef(0);
  let calcamount1;
  let hidestatus;

  let medication = state.financeModule.selectedFinance;
  //console.log(state.financeModule.state)

  const handlecloseModal = () => {
    setProductModal(false);
    // handleSearch(val)
  };

  const handleChangeMode = async value => {
    //console.log(value)
    await setPaymentMode(value);
    /*   console.log(paymentOptions)
       let billm= paymentOptions.filter(el=>el.name===value)
       await setBillMode(billm)
        console.log(billm) */
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
    billingId,
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = async obj => {
    await setObj(obj);
    if (!obj) {
      //"clear stuff"
      setProductId("");
      setName("");
      setBaseunit("");
      setInventoryId("");
      setSellingPrice("");
      setInvQuantity("");
      setDescription("");
      setCostprice("");
      // setCalcAmount(null)
      return;
    }

    setProductId(obj.productId);
    setName(obj.name);
    setBaseunit(obj.baseunit);
    setInventoryId(obj.inventoryId);
    setSellingPrice(obj.sellingprice); //modify this based on billing mode
    setInvQuantity(obj.quantity);
    setCostprice(obj.costprice);
    setBilllingId(obj.billingId);

    const contracts = obj.billingDetails.contracts;
    //const billingserv=client.service('billing')
    if (billMode.type === "HMO Cover") {
      //paymentmode
      let contract = contracts.filter(
        el => el.source_org === billMode.detail.hmo
      );
      //  console.log(contract[0].price)
      setSellingPrice(contract[0].price);
      //  console.log(sellingprice)
    }
    if (billMode.type === "Company Cover") {
      //paymentmode
      let contract = contracts.filter(
        el => el.source_org === billMode.detail.company
      );
      //   console.log(contract[0].price)
      setSellingPrice(contract[0].price);
      //   console.log(sellingprice)
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

  const handleAccept = async () => {
    await setButtonState(true);
    if (paymentmode === "" || amountPaid === 0 || amountPaid === "") {
      toast({
        message: "Kindly choose payment mode or enter amount",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      await setButtonState(false);
      return;
    }
    let obj = {
      // toWallet:{ type: Schema.Types.ObjectId, ref:'facility', }, //receiving money
      //fromWallet:{ type: Schema.Types.ObjectId, ref:'facility', },//sending money
      //subwallet:{ type: Schema.Types.ObjectId, ref:'subwallet', },
      client: medication.participantInfo.client._id,
      organization: user.employeeData[0].facilityDetail._id,
      category: "credit", //debit/credit
      amount: amountPaid,
      description: description,

      toName: user.employeeData[0].facilityDetail.facilityName,
      fromName:
        medication.participantInfo.client.firstname +
        " " +
        medication.participantInfo.client.lastname,
      createdby: user._id,

      // refBill:[{ type: Schema.Types.ObjectId, ref:'bills'  }], //billid to be paid : ref invoice to pay
      // info:{ type: Schema.Types.Mixed},
      paymentmode: paymentmode,

      facility: user.employeeData[0].facilityDetail._id,
      locationId: state.LocationModule.selectedLocation._id,
      type: "Deposit",
    };
    let confirm = window.confirm(
      `Are you sure you want to accept N ${obj.amount} from ${obj.fromName}`
    );
    if (confirm) {
      await SubwalletTxServ.create(obj)
        .then(resp => {
          // console.log(resp)

          toast({
            message: "Deposit accepted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setAmountPaid(0);
          setDescription("");
        })
        .catch(err => {
          toast({
            message: "Error accepting deposit " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    await setButtonState(false);
  };

  useEffect(() => {
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

    const newname = source;
    //   console.log("newname",newname)
    if (oldname !== newname) {
      //newdispense

      setProductItem([]);
      setTotalamount(0);
    }
    //is the row checked or unchecked
    if (state.financeModule.state) {
      medication.show = "none";
      medication.proposedpayment = {
        balance: 0,
        paidup: medication.paymentInfo.paidup + medication.paymentInfo.balance,
        amount: medication.paymentInfo.balance,
      };
      //no payment detail push

      setProductItem(prevProd => prevProd.concat(medication));
    } else {
      if (productItem.length > 0) {
        setProductItem(prevProd =>
          prevProd.filter(el => el._id !== medication._id)
        );
      }
    }

    // const paymentoptions= []
    //const info = medication.participantInfo.client.paymentinfo
    //let billme={}
    getFacilities();

    return () => {};
  }, [state.financeModule]);

  const getTotal = async () => {
    setTotalamount(0);
    productItem.forEach(el => {
      if (el.show === "none") {
        if (el.billing_status === "Unpaid") {
          setTotalamount(
            prevtotal => Number(prevtotal) + Number(el.serviceInfo.amount)
          );
        } else {
          setTotalamount(
            prevtotal => Number(prevtotal) + Number(el.paymentInfo.balance)
          );
        }
      }
      if (el.show === "flex") {
        setTotalamount(prevtotal => Number(prevtotal) + Number(el.partPay));
      }

      //
    });
  };

  useEffect(() => {
    //   console.log(productItem)
    getTotal();
    return () => {};
  }, [productItem]);

  const getFacilities = async () => {
    // console.log("here b4 server")
    const findProductEntry = await SubwalletServ.find({
      query: {
        client: medication.participantInfo.client._id,
        organization: user.employeeData[0].facilityDetail._id,
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        //$limit:100,
        $sort: {
          createdAt: -1,
        },
      },
    });
    //    console.log(findProductEntry)

    // console.log("balance", findProductEntry.data[0].amount)
    if (findProductEntry.data.length > 0) {
      setSubWallet(findProductEntry.data[0]);
      await setBalance(findProductEntry.data[0].amount);
    } else {
      await setBalance(0);
    }

    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };

  //initialize page
  useEffect(() => {
    // const medication =state.medicationModule.selectedMedication
    const today = new Date().toLocaleString();
    //console.log(today)
    setDate(today);
    const invoiceNo = random(6, "uppernumeric");
    setDocumentNo(invoiceNo);

    getFacilities();
    SubwalletServ.on("created", obj => getFacilities());
    SubwalletServ.on("updated", obj => getFacilities());
    SubwalletServ.on("patched", obj => getFacilities());
    SubwalletServ.on("removed", obj => getFacilities());

    return async () => {
      const newProductEntryModule = {
        selectedFinance: {},
        show: "create",
      };
      await setState(prevstate => ({
        ...prevstate,
        financeModule: newProductEntryModule,
      }));
      await setPartPay([]);
    };
  }, []);

  /*   useEffect(() => {
        calcamount1=quantity*sellingprice
         setCalcAmount(calcamount1)
         console.log(calcamount)
         setChangeAmount(true)
        return () => {
            
        }
    }, [quantity]) */

  const handleChangePart = async (bill, e) => {
    // console.log(bill, e.target.value)
    if (e.target.value === "Part") {
      bill.show = "flex";
      setPartPay(prev => prev.concat(bill));
    }

    if (e.target.value === "Full") {
      bill.show = "none";

      let item = await productItem.find(el => el._id === bill._id);
      const payObj = {
        amount: item.paymentInfo.balance,
        mode: "Full",
        date: new Date().toLocaleString(),
      };
      //item.partPay=""
      // item.paymentInfo.paymentDetails.push(payObj)
      item.proposedpayment = {
        balance: Number(item.paymentInfo.balance) - Number(payObj.amount),
        paidup: Number(item.paymentInfo.paidup) + Number(payObj.amount),
        amount: payObj.amount,
      };
      // item.paymentInfo.balance=item.paymentInfo.balance - item.paymentInfo.balance
      //  item.paymentInfo.paidup=Number(item.paymentInfo.paidup) + Number(payObj.amount)
      getTotal();
      setPartPay(prev => prev.concat(bill));
    }
  };

  const handleChangeFull = async e => {
    // console.log(medication)
    if (e.target.value === "Part") {
      setPart(true);
    }

    if (e.target.value === "Full") {
      setPart(false);

      getTotal();
    }
  };

  const handlePartAmount = async (bill, e) => {
    let partAmount = e.target.value;
    // bill.partPay=partAmount
    //const itemList=productItem
    if (partAmount === "" || partAmount === 0) {
      toast({
        message: "Please enter an amount as part payment",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    let item = await productItem.find(el => el._id === bill._id);
    item.partPay = partAmount;
    setPartPay(prev => prev.concat(bill));
    //setProductItem(productItem)
  };

  const handleUpdate = async (bill, e) => {
    if (
      bill.partPay === "" ||
      bill.partPay === 0 ||
      bill.partPay === undefined
    ) {
      toast({
        message: "Please enter an amount as part payment",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    // console.log(bill)
    let item = await productItem.find(el => el._id === bill._id);

    let partAmount = item.partPay;

    if (bill.show === "flex") {
      const payObj = {
        amount: partAmount,
        mode: "Part",
        date: new Date().toLocaleString(),
      };

      item.proposedpayment = {
        balance: Number(item.paymentInfo.balance) - Number(payObj.amount),
        paidup: Number(item.paymentInfo.paidup) + Number(payObj.amount),
        amount: payObj.amount,
      };
    }

    getTotal();
    setPartPay(prev => prev.concat(bill));
    toast({
      message: "Part payment updated successfully",
      type: "is-success",
      dismissible: true,
      pauseOnHover: true,
    });
  };

  const handlePayment = async () => {
    //1. check if there is sufficient amount
    if (totalamount > balance) {
      toast({
        message:
          "Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });

      return;
    }

    productItem.forEach(el => {
      if (!el.proposedpayment.amount) {
        toast({
          message: "one or more bills do not have a payment method selected",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }
    });

    //transform
    productItem.forEach(el => {
      if (el.show === "flex") {
        const payObj = {
          amount: el.proposedpayment.amount,
          mode: "Part",
          date: new Date().toLocaleString(),
        };
        el.paymentInfo.paymentDetails.push(payObj);
      }

      if (el.show === "none") {
        const payObj = {
          amount: el.proposedpayment.amount,
          mode: "Full",
          date: new Date().toLocaleString(),
        };
        el.paymentInfo.paymentDetails.push(payObj);
      }
    });

    let allItems = productItem;

    allItems.forEach(el => {
      el.paymentInfo.balance = el.proposedpayment.balance;
      el.paymentInfo.paidup = el.proposedpayment.paidup;
      el.paymentInfo.amountpaid = el.proposedpayment.amount;

      if (el.paymentInfo.balance === 0) {
        el.billing_status = "Fully Paid";
      } else {
        el.billing_status = "Part Payment";
      }
      el.show = "none";
      el.checked = false;
      delete el.proposedpayment;
      delete el.partPay;
    });

    const obj = {
      clientId: medication.participantInfo.client._id, //sending money
      clientName: source,
      client: medication.participantInfo.client,
      facilityId: user.employeeData[0].facilityDetail._id,
      invoiceNo: documentNo,
      totalamount: totalamount,
      createdby: user._id,
      status: "Fully Paid", //billid to be paid : ref invoice to pay
      bills: allItems,
      balance: balance,
      facilityName: user.employeeData[0].facilityDetail.facilityName,
      subwallet: subWallet,
      amountPaid: totalamount,
    };

    // console.log(obj)

    InvoiceServ.create(obj)
      .then(async resp => {
        setProductItem([]);
        toast({
          message: "payment successful",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        const newProductEntryModule = {
          selectedFinance: {},
          show: "create",
        };
        await setState(prevstate => ({
          ...prevstate,
          finance: newProductEntryModule,
        }));
      })
      .catch(err => {
        toast({
          message: "Error occurred with payment" + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });

    //2. call single end point for billspayment?

    //2.1 create subwallet transaction- debit

    //2.2 update subwallet

    //2.3 mark orders as paid

    //2.4 mark bills as paid
  };

  const handleBulkPayment = async () => {
    //1. check if there is sufficient amount

    let fraction = 1;

    if (part) {
      // apply fraction to all bills
      if (partBulk === "" || partBulk === 0 || partBulk === undefined) {
        toast({
          message: "Please enter an amount as part payment",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
        return;
      }

      if (partBulk > balance) {
        toast({
          message:
            "Amount entered greater than balance. Kindly top up account or reduce amount entered",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });

        return;
      }

      fraction = +(partBulk / totalamount).toFixed(2);
      // console.log(fraction)
      // console.log(partBulk)

      productItem.forEach(el => {
        // console.log(el)

        const payObj = {
          amount: el.proposedpayment.amount * fraction,
          mode: "Part",
          date: new Date().toLocaleString(),
        };
        //  el.paymentInfo.paymentDetails.push(payObj)
        el.proposedpayment = {
          balance: Number(el.paymentInfo.balance) - Number(payObj.amount),
          paidup: Number(el.paymentInfo.paidup) + Number(payObj.amount),
          amount: payObj.amount,
        };
      });
    }
    if (!part) {
      //check that balance can pay bills
      if (totalamount > balance) {
        toast({
          message:
            "Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });

        return;
      }

      //pay all bills in full
      productItem.forEach(el => {
        if (el.show === "flex") {
          const payObj = {
            amount: el.proposedpayment.amount,
            mode: "Part",
            date: new Date().toLocaleString(),
          };
          el.paymentInfo.paymentDetails.push(payObj);
        }

        if (el.show === "none") {
          const payObj = {
            amount: el.proposedpayment.amount,
            mode: "Full",
            date: new Date().toLocaleString(),
          };
          el.paymentInfo.paymentDetails.push(payObj);
        }
      });
    }

    let allItems = productItem;

    allItems.forEach(el => {
      el.paymentInfo.balance = el.proposedpayment.balance;
      el.paymentInfo.paidup = el.proposedpayment.paidup;
      el.paymentInfo.amountpaid = el.proposedpayment.amount;

      if (el.paymentInfo.balance === 0) {
        el.billing_status = "Fully Paid";
      } else {
        el.billing_status = "Part Payment";
        setIsPart(true);
      }
      el.show = "none";
      el.checked = false;
      delete el.proposedpayment;
      delete el.partPay;
    });

    //  console.log(isPart)
    const obj = {
      clientId: medication.participantInfo.client._id, //sending money
      clientName: source,
      client: medication.participantInfo.client,
      facilityId: user.employeeData[0].facilityDetail._id,
      invoiceNo: documentNo,
      totalamount: totalamount,
      createdby: user._id,
      status: part ? "Part Payment" : "Fully Paid", //billid to be paid : ref invoice to pay
      bills: allItems,
      balance: balance,
      facilityName: user.employeeData[0].facilityDetail.facilityName,
      subwallet: subWallet,
      amountPaid: part ? partBulk : totalamount,
    };

    //  console.log(obj.amountPaid)

    InvoiceServ.create(obj)
      .then(async resp => {
        setProductItem([]);
        toast({
          message: "payment successful",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        const newProductEntryModule = {
          selectedFinance: {},
          show: "create",
        };
        await setState(prevstate => ({
          ...prevstate,
          finance: newProductEntryModule,
        }));
        setPartBulk("");
        setPart(false);
        setIsPart(false);
      })
      .catch(err => {
        toast({
          message: "Error occurred with payment" + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });

    //2. call single end point for billspayment?

    //2.1 create subwallet transaction- debit

    //2.2 update subwallet

    //2.3 mark orders as paid

    //2.4 mark bills as paid
  };

  const handleBulkAmount = e => {
    setPartBulk(e.target.value);
  };
  // console.log("simpa")
  return (
    <>
      <div className="card card-overflow mb-2 ">
        <div className="card-header">
          <p className="card-header-title">Make Deposit for {source}</p>
          <button className="button is-success is-small btnheight mt-2">
            Balance: N {balance.toFixed(2)}
          </button>
        </div>
        <div className="card-content pb-1">
          <div id="Deposit">
            <div className="field is-horizontal pullup">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <div className="select is-small ">
                      <select
                        name="paymentmode"
                        value={paymentmode}
                        onChange={e => handleChangeMode(e.target.value)}
                        className="selectadd"
                      >
                        <option value="">Payment Mode </option>
                        <option value="Cash">Cash</option>
                        <option value="Wallet">Wallet </option>
                        <option value="Bank Transfer">Bank Transfer </option>
                        <option value="Card">Card</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      name="order"
                      value={amountPaid}
                      type="text"
                      onChange={e => setAmountPaid(e.target.value)}
                      placeholder="Amount"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-hashtag"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p
                    className="control  " /* style={{display:"none"}} has-icons-left*/
                  >
                    <input
                      className="input is-small"
                      name="description"
                      value={description}
                      type="text"
                      onChange={async e => await setDescription(e.target.value)}
                      placeholder="Payment Details"
                    />
                    {/* <span className="icon is-small is-left">
                     <i className="fas fa-dollar-sign"></i> 
                     </span>*/}
                  </p>
                </div>
                <div className="field ">
                  <p className="control">
                    <button
                      className="button is-info is-small  is-pulled-left selectadd"
                      disabled={buttonState}
                    >
                      <span className="is-small" onClick={handleAccept}>
                        Accept
                      </span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-overflow">
        <div className="card-header">
          <div className="card-header-title">
            Pay Bills for {source} #{documentNo}
          </div>
          <div>
            <div className="button is-danger is-small btnheight my-1">
              Total Amount Due: N {totalamount.toFixed(2)}
            </div>
            <div>
              <div className="row">
                <label className=" is-small">
                  <input
                    type="radio"
                    name="fullPay"
                    value="Full"
                    checked={!part}
                    onChange={e => {
                      handleChangeFull(e);
                    }}
                  />
                  <span> Full </span>
                </label>
                <label className=" is-small">
                  <input
                    type="radio"
                    name="fullPay"
                    value="Part"
                    onChange={e => handleChangeFull(e)}
                  />
                  <span> Part </span>
                </label>
              </div>
              {part ? (
                <div className="field has-addons mr-1 mb-1">
                  <div className="control">
                    <input
                      className="input is-small selectadd"
                      type="text"
                      name="bulkpay"
                      value={partBulk}
                      onChange={e => handleBulkAmount(e)}
                    />
                  </div>
                  <div className="control">
                    <button
                      className="button is-info  is-small selectadd"
                      onClick={e => handleBulkPayment(e)}
                    >
                      Pay
                    </button>
                  </div>
                </div>
              ) : (
                <div className="control">
                  <button
                    className="button is-info  is-small selectadd"
                    onClick={e => handleBulkPayment(e)}
                  >
                    Pay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card-content px-1 ">
          {productItem.length > 0 && (
            <>
              <div className="vscrollable-acc pullup">
                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable shift-right shift-left">
                  <thead>
                    <tr>
                      <th>
                        <abbr title="Serial No">S/No</abbr>
                      </th>
                      <th>
                        <abbr title="Category">Category</abbr>
                      </th>
                      <th>
                        <abbr title="Description">Description</abbr>
                      </th>

                      <th>
                        <abbr title="Cost Price">Type</abbr>
                      </th>
                      <th>
                        <abbr title="Amount">Amount</abbr>
                      </th>
                      {/* <th><abbr title="Cost Price">Amount</abbr></th> */}
                      {/* <th><abbr title="Actions">Actions</abbr></th> */}
                    </tr>
                  </thead>
                  <tfoot></tfoot>
                  <tbody>
                    {productItem.map((ProductEntry, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <th>
                          {ProductEntry.orderInfo.orderObj.order_category}
                        </th>
                        <td>{ProductEntry.serviceInfo.name}</td>
                        <td>
                          <label className=" is-small">
                            <input
                              type="radio"
                              name={ProductEntry._id}
                              value="Full"
                              checked={ProductEntry.show === "none"}
                              onChange={e => {
                                handleChangePart(ProductEntry, e);
                              }}
                            />
                            <span> Full</span>
                          </label>{" "}
                          <br />
                          <label className=" is-small">
                            <input
                              type="radio"
                              name={ProductEntry._id}
                              value="Part"
                              onChange={e => handleChangePart(ProductEntry, e)}
                            />
                            <span> Part </span>
                          </label>
                          <div style={{display: `${ProductEntry.show}`}}>
                            <div className="blk">
                              <div>
                                <input
                                  className="input selectadd shift-left"
                                  type="text"
                                  name={ProductEntry._id}
                                  /* value={ProductEntry.partPay}  */ onChange={e =>
                                    handlePartAmount(ProductEntry, e)
                                  }
                                />
                              </div>
                              <div>
                                <button
                                  className="button is-info selectadd"
                                  onClick={e => handleUpdate(ProductEntry, e)}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                          {/*  {ProductEntry.partPay} */}
                        </td>
                        <td>
                          <p>
                            <strong>Balance Due:</strong>
                            {ProductEntry.paymentInfo?.balance.toFixed(2)} (
                            {ProductEntry.proposedpayment?.balance.toFixed(2)})
                          </p>
                          <p>
                            <strong>Paid Up:</strong>
                            {ProductEntry.paymentInfo?.paidup.toFixed(2)} (
                            {ProductEntry.proposedpayment?.paidup.toFixed(2)})
                          </p>
                          <p>
                            <strong>Amount:</strong>
                            {ProductEntry.paymentInfo.amountDue.toFixed(2)}
                          </p>
                        </td>

                        {/* <td>{ProductEntry.amount}</td> */}
                        {/*  <td><span className="showAction"  >x</span></td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  className="field mt-2 is-grouped"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    className="button is-success is-small"
                    disabled={!productItem.length > 0}
                    onClick={handlePayment}
                  >
                    Pay
                  </button>

                  {/* <p className="control">
                     <button className="button is-info is-small" disabled={!productItem.length>0} onClick={onSubmit} >
                         Generate Invoice
                     </button>
                 </p>  */}

                  <button className="button is-danger is-small">Cancel</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
