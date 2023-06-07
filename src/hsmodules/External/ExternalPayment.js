/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import "./main.css";
import RemitaPayment from "react-remita";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {useNavigate,useParams} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import short from 'short-uuid'
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import CustomTable from "../../components/customtable";
import {Box, Button, Grid, Typography} from "@mui/material";
import ModalBox from "../../components/modal";
import Input from "../../components/inputs/basic/Input";
import MakeDeposit from "./Deposit";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import {FlutterWaveIcon, PaystackIcon} from "./ui-components/Icons";
// import WalletIcon from "@mui/icons-material/Wallet";
import RadioButton from "../../components/inputs/basic/Radio";
import {v4 as uuidv4} from "uuid";
import PayWithWallet from "../PouchiiWallet/payWithWallet";


export default function ExternalPaymentPage({closeModal, handleGoBack}) {
  const SubwalletServ = client.service("extsubwallet");
  const InvoiceServ = client.service("invoice");
  const BillServ = client.service("extbills");
  const {user} = useContext(UserContext); //,setUser
  const [type, setType] = useState("Bill");
  const [documentNo, setDocumentNo] = useState("");
  const [totalamount, setTotalamount] = useState(0);
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [calcamount, setCalcAmount] = useState(0);
  const [externalPayment, setExternalPayemt] = useState([]);
  const [paymentmode, setPaymentMode] = useState("Cash");
  const [balance, setBalance] = useState(0);
  const [partPay, setPartPay] = useState([]);
  const [part, setPart] = useState(false);
  const [partBulk, setPartBulk] = useState("");
  const [isPart, setIsPart] = useState(false);
  const [subWallet, setSubWallet] = useState();
  const [loading, setLoading] = useState(false);
  const [partTable, setPartTable] = useState([]);
  const [depositModal, setDepositModal] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [selectedorders, setSelectedOrders] = useState([]);
  const [selectedfinance, setSelectedFinance] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [facility, setFacility] = useState("");
  const  xbill =useRef([])
  const  xtotal =useRef(0)
  const {state, setState} = useContext(ObjectContext);
  const {hospitalId,patientId} = useParams();

  let medication = state.financeModule.selectedFinance;

 // console.log(medication)
  const handleHideCreateModal = () => {
    setCreateModal(false);
  };

  //Remita Config
  const config = {
    key: "QzAwMDA1NDIwMjB8MTEwMDUzNTMwNjc5fGNlZTQ2YWIyZTdhOTg0M2EwODNlNjQyOTllNjg1ZTY4NWU5MWFlNjVkMjVlMzdkM2Q5YjEzOWFlYjg2NWEwNzdiYzdiYzcxNzZiNTM5MWZjYzY3YzUwOTNlNTUyNDFlNjhlOGEyODJmNDVkMzBmNGUwYTM5YjhlMzZmOTkyN2E4", // enter your key here
    customerId: uuidv4(),
    firstName: source,
    lastName: "",
    email: "",
    amount: part ? partBulk : totalamount,
    narration: "payment",
  };

  let data = {
    ...config,
    onSuccess: function (response) {
      // function callback when payment is successful
      console.log(response);
      toast.success("Payment Successful");
    },
    onError: function (response) {
      // function callback when payment fails
      console.log(response);
      toast.error("Payment Failed");
    },
  };

  //Paystack Config

  // const config = {
  //   reference: new Date().getTime().toString(),
  //   email: "simpa@healthstack.africa",
  //   amount: part ? partBulk * 100 : totalamount * 100,
  //   publicKey: "pk_test_f8300ac84ffd54afdf49ea31fd3daa90ebd33275",
  // };

  // const componentProps = {
  //   ...config,
  //   text: "Make a Deposit",
  //   onSuccess: reference => handleSuccess(reference, amount),
  //   onClose: closeModal,
  // };

  // const handleSuccess = (amount, reference) => {
  //   let transactionDetails = amount;
  //   transactionDetails.amount = reference;
  //   // dispatch(saveTransactionRef(transactionDetails));
  //   // //console.log(transactionDetails, "AMOUNT");
  //   // return history("/business/payment");
  // };

  // //FLUTTERWAVE CONFIG
  // const configfw = {
  //   public_key: "FLWPUBK_TEST-2c01585fca911f2d419e051d15b76382-X",
  //   tx_ref: Date.now(),
  //   amount: part ? partBulk : totalamount,
  //   email: "simpa@healthstack.africa",
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: "simpa@healthstack.africa",
  //     phone_number: "070********",
  //     name: "john doe",
  //   },
  //   customizations: {
  //     title: "my Payment Title",
  //     description: "Payment for items in cart",
  //     logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  //   },
  // };

  // const handleFlutterPayment = useFlutterwave(configfw);


  ////console.log(state.financeModule.state)


  const handleChangeMode = async value => {
    ////console.log(value)
    await setPaymentMode(value);
  };

  // const [productEntry, setProductEntry] = useState({
  //   externalPayments: [],
  //   date,
  //   documentNo,
  //   type,
  //   totalamount,
  //   source,
  // });


  // useEffect(() => {
  //   setCurrentUser(user);
  //   ////console.log(currentUser)
  //   return () => {};
  // }, [user]);

  // useEffect(() => {
  //   setProductEntry({
  //     date,
  //     documentNo,
  //     type,
  //     totalamount,
  //     source,
  //   });

  //   setCalcAmount(quantity * sellingprice);
  //   return () => {};
  // }, [date]);

  const handleSelectedClient = async Client => {
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    console.log(Client)
  };

  const handlePay = async (client, i) => {
   
     
     await setSelectedOrders([]);
     await setState(prev => ({
        ...prev,
        financeModule: {
          ...prev.financeModule,
          selectedBills: [],
        },
      }));
      console.log("Paynow",client)
  

    // //console.log(e.target.checked)

    await handleSelectedClient(client.bills[0].order[0].participantInfo.client);
    //handleMedicationRow(order)/

    await client.bills.forEach(bill => {
      // //console.log(bill)
      bill.order.forEach(order => {
        let medication = order;
        medication.show = "none";
        medication.checked = true;
        medication.proposedpayment = {
          balance: 0,
          paidup:
            medication.paymentInfo.paidup + medication.paymentInfo.balance,
          amount: medication.paymentInfo.balance,
        };

        setSelectedFinance(order);

        const newProductEntryModule = {
          selectedFinance: order,
          show: "detail",
          state: true,
          selectedBills: [],
        };

        setState(prevstate => ({
          ...prevstate,
          financeModule: {
            ...newProductEntryModule,
            selectedBills: prevstate.financeModule.selectedBills.concat(order),
          },
        }));

        setSelectedOrders(prevstate => prevstate.concat(order));
      });
    });

    setExternalPayemt(state.financeModule.selectedBills);
   // showCreateScreen();

    //openModal();
  };

  const getExternalPayment = async () => {
    let findWalletBalance = await SubwalletServ.find({
      query: {
        client:patientId, //medication.participantInfo.client._id,
        organization:hospitalId, //user.employeeData[0].facilityDetail._id,
        $sort: {
          createdAt: -1,
        },
      },
    });
   // console.log(findWalletBalance)


    // //console.log("balance", findProductEntry.data[0].amount)
    if (findWalletBalance.data.length > 0) {
      setSubWallet(findWalletBalance.data[0]);
      await setBalance(findWalletBalance.data[0].amount);
    } else {
      await setBalance(0);
    }
    
   //find unpaid bills

   setLoading(true);
   const findBills = await BillServ.find({
     query: {
       $or: [
         {
           "participantInfo.paymentmode.type": "Cash",
         },
         {
           "participantInfo.paymentmode.type": "Family Cover",
         },
       ],
       "participantInfo.billingFacility":hospitalId,
         "participantInfo.clientId": patientId,
       
       billing_status: {
         $ne: "Fully Paid",
       }, // need to set this finally
    
       $limit: 100,
       $sort: {
         createdAt: -1,
       },
     },
   });


   setLoading(false);

   findBills?.data?.forEach(el => {
    el.show = "none"
  
  })
   const newProductEntryModule = {
    // selectedBills: [],
    selectedFinance: findBills?.data,
    show: "create",
  };
  await setState(prevstate => ({
    ...prevstate,
    financeModule: newProductEntryModule,
  }));
  setExternalPayemt(findBills.data )
  xbill.current=findBills.data
  // medication = externalPayment
  getTotal()
  setName(findBills.data[0].participantInfo.client.firstname +" "+ findBills.data[0].participantInfo.client.lastname)
  setFacility(findBills.data[0].orderInfo.orderObj.destination_name)
 
  };



  const getTotal = async () => {
  /*   console.log("xxx",state.financeModule.selectedFinance)
    console.log("starting total", externalPayment) */
    setTotalamount(0);
   xbill.current.forEach(el => {
  
      if (el.show === "none") {
      
        if (el.billing_status === "Unpaid") {
          setTotalamount(
            prevtotal => Number(prevtotal) + Number(el.serviceInfo.amount)
          );
          xtotal.current=xtotal.current+ Number(el.serviceInfo.amount)
        /*   console.log(totalamount) */
        } else {
          setTotalamount(
            prevtotal => Number(prevtotal) + Number(el.paymentInfo.balance)
          );
          xtotal.current=xtotal.current+ Number(el.paymentInfo.balance)
        }
      /*    console.log("payment solution", el.paymentInfo.balance) */
      }
      if (el.show === "flex") {
        setTotalamount(prevtotal => Number(prevtotal) + Number(el.partPay));
        xtotal.current=xtotal.current+  + Number(el.partPay)
      }
     
      //
    });
    //setbalance(totalamount)
    await setState(prevstate => ({
      ...prevstate,
      total: totalamount,
      xtotal: xtotal.current
    }));

  };


  //initialize page
  
  useEffect(() => {
    const today = new Date().toLocaleString();
    setDate(today);
    const invoiceNo = short.generate();
    setDocumentNo(invoiceNo);
    getExternalPayment();
    /* getTotal() */
    SubwalletServ.on("created", obj => getExternalPayment());
    SubwalletServ.on("updated", obj => getExternalPayment());
    SubwalletServ.on("patched", obj => getExternalPayment());
    SubwalletServ.on("removed", obj => getExternalPayment());

    return async () => {
      // const newProductEntryModule = {
      //   selectedBills: [],
      //   selectedFinance: {},
      //   show: "create",
      // };
      // await setState(prevstate => ({
      //   ...prevstate,
      //   financeModule: newProductEntryModule,
      // }));
      // await setPartPay([]);
    };
  }, []);

  const handleChangePart = async (bill, e) => {
    // //console.log(bill, e.target.value)
    if (e.target.value === "Part") {
      bill.show = "flex";
      setPartPay(prev => prev.concat(bill));
      setPartTable(prev => prev.concat(bill));
    }

    if (e.target.value === "Full") {
      bill.show = "none";

      let item = await externalPayment.find(el => el._id === bill._id);
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
      setPartTable(prev => prev.filter(i => i._id !== bill._id));
    }
  };

  const handleChangeFull = async e => {
    // //console.log(medication)
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
    //const itemList=externalPayment
    if (partAmount === "" || partAmount === 0) {
      toast.error("Please enter an amount as part payment");
      return;
    }
    let item = await externalPayment.find(el => el._id === bill._id);
    item.partPay = partAmount;
    setPartPay(prev => prev.concat(bill));
  };

  const handleUpdate = async (bill, e) => {
    if (
      bill.partPay === "" ||
      bill.partPay === 0 ||
      bill.partPay === undefined
    ) {
      toast.error("Please enter an amount as part payment");
      return;
    }
    // //console.log(bill)
    let item = await externalPayment.find(el => el._id === bill._id);

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
    toast.success("Part payment updated successfully");
  };

  const handlePayment = async () => {
    //1. check if there is sufficient amount
    if (totalamount > balance) {
      toast.error(
        "Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid"
      );

      return;
    }

    externalPayment.forEach(el => {
      if (!el.proposedpayment.amount) {
        toast.error("one or more bills do not have a payment method selected");
        return;
      }
    });

    //transform
    externalPayment.forEach(el => {
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

    let allItems = externalPayment;

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

    //console.log(obj)

    InvoiceServ.create(obj)
      .then(async resp => {
        setExternalPayemt([]);
        toast.success("payment successful");
        const newProductEntryModule = {
          selectedBills: [],
          selectedFinance: {},
          show: "create",
        };
        await setState(prevstate => ({
          ...prevstate,
          finance: newProductEntryModule,
        }));
      })
      .catch(err => {
        toast.error("Error occurred with payment" + err);
      });
  };

  const handleBulkPayment = async () => {
    //1. check if there is sufficient amount

    let fraction = 1;

    if (part) {
      // apply fraction to all bills
      if (partBulk === "" || partBulk === 0 || partBulk === undefined) {
        toast.error("Please enter an amount as part payment");
        return;
      }

      if (partBulk > balance) {
        toast.error(
          "Amount entered greater than balance. Kindly top up account or reduce amount entered"
        );

        return;
      }

      fraction = +(partBulk / totalamount).toFixed(2);
      // //console.log(fraction)
      // //console.log(partBulk)

      externalPayment.forEach(el => {
        // //console.log(el)

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
        toast.error(
          "Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid"
        );

        return;
      }

      //pay all bills in full
      externalPayment.forEach(el => {
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

    let allItems = externalPayment;

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

    //  //console.log(isPart)
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

    //  //console.log(obj.amountPaid)

    InvoiceServ.create(obj)
      .then(async resp => {
        setExternalPayemt([]);
        toast.success("payment successful");
        const newProductEntryModule = {
          selectedBills: [],
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
        toast.error("Error occurred with payment" + err);
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

  const paymentCreateSchema = [
    {
      name: "S/NO",
      width: "60px",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Category",
      key: "category",
      description: "Enter Category",
      selector: row => <b>{row.orderInfo.orderObj.order_category}</b>,
      sortable: true,
      required: true,
      inputType: "SELECT_TYPE",
    },
    {
      name: "Description",
      key: "description",
      description: "Enter Description",
      selector: row => row.serviceInfo.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Type",
      width: "200px",
      center: true,
      key: "sn",
      description: "Enter Type",
      selector: "row",
      cell: row => (
        <Box>
          <RadioButton
            onChange={e => {
              handleChangePart(row, e);
            }}
            options={["Full", "Part"]}
            name={row._id}
          />

          {partTable.find(i => i._id === row._id) && (
            <div>
              <div style={{marginBottom: "5px"}}>
                <Input
                  type="text"
                  name={row._id}
                  placeholder="Amount"
                  value={partBulk}
                  onChange={e => handlePartAmount(row, e)}
                />
              </div>
              <GlobalCustomButton
                onClick={e => handleUpdate(row, e)}
                color="secondary"
              >
                Update
              </GlobalCustomButton>
            </div>
          )}
        </Box>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      width: "200px",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => (
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{display: "flex", marginBottom: "8px"}}>
            <b style={{marginRight: "3px"}}>Balance Due:</b>{" "}
            {row.paymentInfo.balance.toFixed(2)}
          </div>
          <div style={{display: "flex", marginBottom: "8px"}}>
            <b style={{marginRight: "3px"}}>Paid up:</b>{" "}
            {row.paymentInfo.paidup.toFixed(2)}
          </div>
          <div style={{display: "flex", marginBottom: "8px"}}>
            <b style={{marginRight: "3px"}}>Amount:</b>{" "}
            {row.paymentInfo.amountDue.toFixed(2)}
          </div>
        </div>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  return (
    <>
      <ModalBox
        open={createModal}
        onClose={handleHideCreateModal}
        header="Pay With Wallet"
      >
        <PayWithWallet amount={part ? partBulk : totalamount} />
      </ModalBox>
      <div style={{width: "100%"}}>
        <ModalBox
          open={depositModal}
          onClose={() => setDepositModal(false)}
          header={`Make Deposit`}
        >
          <MakeDeposit balance={balance} />
        </ModalBox>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f8f8f8",
            backgroundColor: "#f8f8f8",
          }}
          p={2}
          mb={2}
        >
          {/* <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon fontSize="small" sx={{marginRight: "5px"}} />
            Back
          </GlobalCustomButton> */}

          <Typography
            sx={{
              fontSize: "0.95rem",
              color: "2d2d2d",
            }}
          >
            Pay Bills for {name} at {facility}
            <span
              style={{
                textTransform: "capitalize",
                fontWeight: "600",
                color: "#023e8a",
              }}
            >
              {source}
            </span>{" "}
            #{documentNo}
          </Typography>

          <Box>
            <GlobalCustomButton onClick={() => setDepositModal(true)}>
              <LocalAtmIcon fontSize="small" sx={{marginRight: "5px"}} />
              Make Deposit
            </GlobalCustomButton>
          </Box>
        </Box>

        <Box pl={2} pr={2} mb={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Box sx={{display: "flex"}} gap={1} mb={1}>
                <Box>
                  <RadioButton
                    name="fullPay"
                    options={["Full", "Part"]}
                    onChange={e => {
                      handleChangeFull(e);
                    }}
                    value={part ? "Part" : "Full"}
                  />
                </Box>

                {part && (
                  <Box style={{marginLeft: "15px", width: "200px"}}>
                    <Input
                      label="Amount"
                      type="text"
                      name="bulkpa"
                      placeholder="Enter amount"
                      value={partBulk}
                      onChange={e => handleBulkAmount(e)}
                    />
                  </Box>
                )}
              </Box>

              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
                gap={1}
              >
                <GlobalCustomButton onClick={handleBulkPayment}>
                  <PaymentsIcon sx={{marginRight: "5px"}} fontSize="small" />
                  Pay
                </GlobalCustomButton>

                {/* <GlobalCustomButton
									sx={{
										backgroundColor: '#6c584c',
										'&:hover': { backgroundColor: '#6c584c;' },
									}}>
									<WalletIcon
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									Pay with Wallet
								</GlobalCustomButton> */}
                {/* 
								<GlobalCustomButton
									sx={{
										backgroundColor: '#023e8a',
										'&:hover': { backgroundColor: '#023e8a' },
									}}>
									<WalletIcon
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									<RemitaPayment
										remitaData={data}
										className='btn'
										text='Pay with Remita'
									/>
								</GlobalCustomButton> */}
                {/* <GlobalCustomButton
                  onClick={() => {
                    handleFlutterPayment({
                      callback: response => {
                        console.log(response);
                        closePaymentModal();
                      },
                      onClose: () => {
                        closeModal;
                      },
                    });
                  }}
                  sx={{
                    backgroundColor: "#2d3142",
                    color: "#ffffff",
                    "&:hover": {backgroundColor: "#2d3142"},
                  }}
                >
                  <FlutterWaveIcon />
                  Pay with Flutterwave
                </GlobalCustomButton>

                <PaystackConsumer {...componentProps}>
                  {({initializePayment}) => (
                    <GlobalCustomButton
                      onClick={() =>
                        initializePayment(handleSuccess, closeModal)
                      }
                      sx={{
                        backgroundColor: "#023e8a",
                        "&:hover": {backgroundColor: "#023e8a"},
                      }}
                    >
                      <PaystackIcon />
                      Pay with PayStack
                    </GlobalCustomButton>
                  )}
                </PaystackConsumer> */}
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Box
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                gap={1}
              >
                <Box
                  item
                  sx={{
                    minWidth: "200px",
                    height: "80px",
                    border: "1px solid #E5E5E5",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 15px",
                  }}
                >
                  <Typography sx={{display: "flex", alignItems: "center"}}>
                    <AccountBalanceWalletIcon color="primary" /> Total Amount
                    Due
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "red",
                    }}
                  >
                    {" "}  
                    &#8358;{state.xtotal?.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  item
                  sx={{
                    minWidth: "100px",
                    height: "80px",
                    border: "1px solid #E5E5E5",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 15px",
                  }}
                >
                  <Typography sx={{display: "flex", alignItems: "center"}}>
                    <AccountBalanceIcon color="primary" /> Current Balance
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#85BB65",
                    }}
                  >
                    &#8358;{balance.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {!!externalPayment && (
          <Box
            pr={2}
            pl={2}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            gap={2}
          >
            <div
              style={{
                height: "calc(100% - 300px)",
                width: "100%",
              }}
            >
              <CustomTable
                title={""}
                columns={paymentCreateSchema}
                data={externalPayment}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={row => row}
                progressPending={loading}
              />
              {/* 
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <GlobalCustomButton
                  disabled={!externalPayment.length > 0}
                  onClick={handlePayment}
                  sx={{marginRight: "15px"}}
                >
                  <PaymentsIcon sx={{marginRight: "5px"}} fontSize="small" />
                  Pay
                </GlobalCustomButton>
              </div> */}
            </div>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
              gap={1}
            >
              <GlobalCustomButton onClick={handlePayment} color="success">
                <PaymentsIcon sx={{marginRight: "5px"}} fontSize="small" />
                Make Full Payment
              </GlobalCustomButton>

              {/* <GlobalCustomButton
								sx={{
									backgroundColor: '#6c584c',
									'&:hover': { backgroundColor: '#6c584c;' },
								}}
								onClick={handleCreateModal}>
								<WalletIcon
									sx={{ marginRight: '5px' }}
									fontSize='small'
								/>
								Pay with Wallet
							</GlobalCustomButton> */}

              {/* <GlobalCustomButton
                onClick={() => {
                  handleFlutterPayment({
                    callback: response => {
                      console.log(response);
                      closePaymentModal();
                    },
                    onClose: () => {
                      closeModal;
                    },
                  });
                }}
                sx={{
                  backgroundColor: "#2d3142",
                  color: "#ffffff",
                  "&:hover": {backgroundColor: "#2d3142"},
                }}
              >
                <FlutterWaveIcon />
                Pay with Flutterwave
              </GlobalCustomButton>

              <PaystackConsumer {...componentProps}>
                {({initializePayment}) => (
                  <GlobalCustomButton
                    onClick={() => initializePayment(handleSuccess, closeModal)}
                    sx={{
                      backgroundColor: "#023e8a",
                      "&:hover": {backgroundColor: "#023e8a"},
                    }}
                  >
                    <PaystackIcon />
                    Pay with PayStack
                  </GlobalCustomButton>
                )}
             </PaystackConsumer> */}
              {/* <GlobalCustomButton
								sx={{
									backgroundColor: '#023e8a',
									'&:hover': { backgroundColor: '#023e8a' },
								}}>
								<WalletIcon
									sx={{ marginRight: '5px' }}
									fontSize='small'
								/>
								<RemitaPayment
									remitaData={data}
									className='btn'
									text='Pay with Remita'
								/>
							</GlobalCustomButton> */}
            </Box>
          </Box>
        )}
      </div>
    </>
  );
}