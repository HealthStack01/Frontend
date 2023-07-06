/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";

import client from "../../feathers";

//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";

import {toast} from "react-toastify";

import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

//import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import {Box, Button, Grid, Typography} from "@mui/material";

import GlobalCustomButton from "../../components/buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {generateRandomString} from "../helpers/generateString";

// eslint-disable-next-line

export default function HMOAuthCreate({closeModal, handleGoBack}) {
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
  const [loading, setLoading] = useState(false);
  const [partTable, setPartTable] = useState([]);
  const [depositModal, setDepositModal] = useState(false);
  const [fullpay, setFullpay] = useState([]);
  const [sponsor, setSponsor] = useState();
  const {state, setState} = useContext(ObjectContext);
  let medication = state.financeModule.selectedFinance;

  //Paystack Config
  const handleSuccess = (amount, reference) => {
    let transactionDetails = amount;
    transactionDetails.amount = reference;
    // dispatch(saveTransactionRef(transactionDetails));
    // //console.log(transactionDetails, "AMOUNT");
    // return history("/business/payment");
  };

  const inputEl = useRef(0);
  let calcamount1;
  let hidestatus;

  ////console.log(state.financeModule.state)

  const handlecloseModal = () => {
    setProductModal(false);
    // handleSearch(val)
  };

  const handleChangeMode = async value => {
    ////console.log(value)
    await setPaymentMode(value);
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
      //  //console.log(contract[0].price)
      setSellingPrice(contract[0].price);
      //  //console.log(sellingprice)
    }
    if (billMode.type === "Company Cover") {
      //paymentmode
      let contract = contracts.filter(
        el => el.source_org === billMode.detail.company
      );
      //   //console.log(contract[0].price)
      setSellingPrice(contract[0].price);
      //   //console.log(sellingprice)
    }

    /*  setValue("facility", obj._id,  {
             shouldValidate: true,
             shouldDirty: true
         }) */
  };

  useEffect(() => {
    setCurrentUser(user);
    ////console.log(currentUser)
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

  const getFacilities = async () => {
    // //console.log("here b4 server")
    const findProductEntry = await SubwalletServ.find({
      query: {
        client: sponsor.organizationId,
        organization: user.employeeData[0].facilityDetail._id,
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        //$limit:100,
        $sort: {
          createdAt: -1,
        },
      },
    });
    //    //console.log(findProductEntry)

    // //console.log("balance", findProductEntry.data[0].amount)
    if (findProductEntry.data.length > 0) {
      setSubWallet(findProductEntry.data[0]);
      await setBalance(findProductEntry.data[0].amount);
    } else {
      await setBalance(0);
    }

    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };

  ////console.log(state.financeModule);

  useEffect(() => {
    setSource(
      medication?.participantInfo?.client?.firstname +
        " " +
        medication?.participantInfo?.client?.lastname
    );
    setProductItem(state.financeModule.selectedBills);

    let paytype = medication.participantInfo.client.paymentinfo;
    let hmo = paytype.filter(
      el => el.paymentmode === "HMO" || el.paymentmode === "Company Cover"
    );
    setSponsor(hmo[0]);
    console.log(hmo[0]);

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
    //   //console.log(productItem)
    getTotal();
    return () => {};
  }, [productItem]);

  //initialize page
  useEffect(() => {
    // const medication =state.medicationModule.selectedMedication

    const today = new Date().toLocaleString();
    ////console.log(today)
    setDate(today);
    const invoiceNo = generateRandomString(6);
    setDocumentNo(invoiceNo);

    getFacilities();
    SubwalletServ.on("created", obj => getFacilities());
    SubwalletServ.on("updated", obj => getFacilities());
    SubwalletServ.on("patched", obj => getFacilities());
    SubwalletServ.on("removed", obj => getFacilities());

    return async () => {
      const newProductEntryModule = {
        selectedBills: [],
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

  const handleUpdate = async (bill, e) => {
    //disable approve button

    // updatedbill[i].checked=false

    // todo: update bill to fully paid
    let item = await productItem.findIndex(el => el._id === bill._id);
    productItem[item].checked = false;
    console.log(productItem[item]);

    // bill.billing_status = "Fully Paid";
    productItem[item].billing_status = "Fully Paid";
    setFullpay(prev => prev.concat(productItem[item]));
    getTotal();
    toast.success("Bill approved successfully");
    console.log(fullpay);
    console.log("medication:", medication);
  };

  const handlePayment = async () => {
    //1. check if there is sufficient amount
    //2. call single end point for billspayment?invoice

    //2.1 create subwallet transaction- debit

    //2.2 update subwallet

    //2.3 mark orders as paid

    //2.4 mark bills as paid

    //transform
    fullpay.forEach(el => {
      const payObj = {
        amount: el.proposedpayment.amount,
        mode: "Full",
        date: new Date().toLocaleString(),
      };
      el.paymentInfo.paymentDetails.push(payObj);
    });

    let allItems = fullpay;
    console.log(allItems);

    allItems.forEach(el => {
      el.paymentInfo.balance = el.proposedpayment.balance;
      el.paymentInfo.paidup = el.proposedpayment.paidup;
      el.paymentInfo.amountpaid = el.proposedpayment.amount;

      /*  if (el.paymentInfo.balance === 0) {
        el.billing_status = "Fully Paid";
      } else {
        el.billing_status = "Part Payment";
      } */

      el.checked = false;
    });

    // filter out apprroved from unapproved bills
    const remain = productItem.filter(bill => bill.checked == true);
    console.log(remain);
    setProductItem(remain);

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
      paymentmode: sponsor.paymentmode,
      sponsorId: sponsor.organizationId,
      policy: sponsor.policy,
      sponsor: sponsor,
    };

    console.log(obj);

    InvoiceServ.create(obj)
      .then(async resp => {
        // setProductItem([]);
        setFullpay([]);
        toast.success("Approval successful");
        console.log(medication);
        const newProductEntryModule = {
          selectedBills: productItem,
          selectedFinance: productItem.length > 0 ? medication : {},
          show: "create",
        };
        await setState(prevstate => ({
          ...prevstate,
          finance: newProductEntryModule,
        }));
        //goback
      })
      .catch(err => {
        toast.error("Error occurred with payment " + err);
      });
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
      name: "Amount",
      width: "200px",
      key: "sn",
      description: "amount",
      selector: row => (
        <div style={{display: "flex", marginBottom: "8px"}}>
          <b style={{marginRight: "3px"}}>Amount:</b>{" "}
          {row.paymentInfo.amountDue.toFixed(2)}
        </div>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Type",
      width: "200px",
      key: "sn",
      description: "Enter Type",
      selector: row => (
        <Box sx={{display: "flex", flexDirection: "column"}} gap={0.5}>
          <div>
            {/*  <div style={{marginBottom: "5px"}}>
              <Input
                type="text"
                name={row._id}
                //placeholder="Amount"
                // value={partBulk}
                onChange={e => handlePartAmount(row, e)}
              />
            </div> */}
            <GlobalCustomButton
              onClick={e => handleUpdate(row, e)}
              disabled={!row.checked}
              color="primary"
            >
              Approve
            </GlobalCustomButton>

            {/*  <GlobalCustomButton
              onClick={e => handleUpdate(row, e)}
              color="secondary"
            >
              Reject
            </GlobalCustomButton> */}
          </div>
        </Box>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <div style={{width: "100%"}}>
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
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon fontSize="small" sx={{marginRight: "5px"}} />
            Back
          </GlobalCustomButton>
          <Box>
            <Typography sx={{fontSize: "1.75rem", fontWeight: "600"}}>
              Client Name: {source}
            </Typography>
            <Typography>
              Client ID:{sponsor?.clientId} HMO:{sponsor?.organizationName}{" "}
              Plan:{sponsor?.plan} Principal:{sponsor?.principalName} Principal
              ID:{sponsor?.principalId}{" "}
            </Typography>
            {/*  <Typography>
              HMO:{sponsor?.organizationName}

            </Typography>
            <Typography>
              Plan:{sponsor?.plan}
            </Typography>
            
            <Typography>
              Principal:{sponsor?.principalName}
            </Typography>
            <Typography>
              Principal ID:{sponsor?.principalId}
            </Typography> */}
            {/* <Typography>
              Principal ID:{sponsor?.principalId}
            </Typography> */}
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "2d2d2d",
              }}
            >
              Aprrove Bills for{" "}
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
            <Box
              item
              sx={{
                minWidth: "200px",
                height: "40px",
                border: "1px solid #E5E5E5",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 15px",
              }}
              gap={1}
            >
              <Typography sx={{display: "flex", alignItems: "center"}}>
                <AccountBalanceWalletIcon color="primary" /> Amount Due:
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "red",
                }}
              >
                {" "}
                &#8358;{totalamount.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/*  <Box>
            <GlobalCustomButton onClick={() => setDepositModal(true)}>
              <LocalAtmIcon fontSize="small" sx={{marginRight: "5px"}} />
              Make Deposit
            </GlobalCustomButton>
          </Box> */}
        </Box>

        {productItem.length > 0 && (
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
                data={productItem}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={row => row}
                progressPending={loading}
              />
            </div>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
              gap={1}
            >
              {productItem.length > 0 && (
                <GlobalCustomButton
                  onClick={handlePayment}
                  disabled={fullpay.length === 0}
                >
                  <PaymentsIcon sx={{marginRight: "5px"}} fontSize="small" />
                  Save
                </GlobalCustomButton>
              )}

              {/*    <GlobalCustomButton
                sx={{
                  backgroundColor: "#6c584c",
                  "&:hover": {backgroundColor: "#6c584c;"},
                }}
              >
                <WalletIcon sx={{marginRight: "5px"}} fontSize="small" />
                Pay with Wallet
              </GlobalCustomButton> */}

              {/*  <GlobalCustomButton
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
              </GlobalCustomButton> */}

              {/*   <PaystackConsumer {...componentProps}>
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
            </Box>
          </Box>
        )}
      </div>
    </>
  );
}
