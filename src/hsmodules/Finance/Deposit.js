/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
var random = require("random-string-generator");

import {Box, Button, Grid, Typography} from "@mui/material";
import CustomSelect from "../../components/inputs/basic/Select";
import Input from "../../components/inputs/basic/Input";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GlobalCustomButton from "../../components/buttons/CustomButton";
// eslint-disable-next-line
const searchfacility = {};

export default function MakeDeposit({closeModal, balance}) {
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
  //const [balance, setBalance] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  const [partPay, setPartPay] = useState([]);
  const [part, setPart] = useState(false);
  const [partBulk, setPartBulk] = useState("");
  const [isPart, setIsPart] = useState(false);
  const [subWallet, setSubWallet] = useState();
  const [loading, setLoading] = useState(false);
  const [partTable, setPartTable] = useState([]);

  const {state, setState} = useContext(ObjectContext);

  const inputEl = useRef(0);
  let calcamount1;
  let hidestatus;

  let medication = state.financeModule.selectedFinance;
  //console.log(state.financeModule.state)

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

  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

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

  //console.log(state.financeModule);

  //initialize page

  return (
    <Box
      container
      sx={{
        width: "500px",
      }}
      mt={3}
    >
      <Box
        container
        mb={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          item
          sx={{
            width: "calc(100% - 200px)",
            width: "100%",
            height: "80px",
            border: "1px solid #E5E5E5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 15px",
          }}
        >
          <Typography sx={{display: "flex", alignItems: "center"}}>
            <AccountBalanceIcon color="primary" sx={{marginRight: "5px"}} />{" "}
            Balance
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: "2d2d2d",
            }}
          >
            {" "}
            &#8358;{balance.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Box container mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Input
              name="order"
              value={amountPaid}
              type="text"
              onChange={e => setAmountPaid(e.target.value)}
              label="Amount"
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              name="description"
              value={description}
              type="text"
              onChange={async e => await setDescription(e.target.value)}
              label="Payment Details"
            />
          </Grid>

          <Grid item xs={3}>
            <CustomSelect
              options={["Cash", "Wallet", "Bank Transfer", "Card", "Cheque"]}
              placeholder="Payment Mode"
              defaultValue={paymentmode}
              name="paymentmode"
              onChange={e => handleChangeMode(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <GlobalCustomButton onClick={handleAccept}>
        Confirm Deposit
      </GlobalCustomButton>
    </Box>
  );
}
