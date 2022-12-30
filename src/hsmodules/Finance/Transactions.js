/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import CustomTable from "../../components/customtable";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import FacilityAccount from "./FacilityAccount";
import ModalBox from "../../components/modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Button as MuiButton,
  Typography,
  Grid,
} from "@mui/material";
import {FormsHeaderText} from "../../components/texts";
// eslint-disable-next-line
const searchfacility = {};

export function TransactionsList({isModal}) {
  // eslint-disable-next-line
  const [facility, setFacility] = useState([]);
  const InventoryServ = client.service("subwallettransactions");
  const SubwalletServ = client.service("subwallet");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [balance, setBalance] = useState(0);

  const [accountType, setAccountType] = useState("credit");

  const handleToggleAccount = type => {
    setAccountType(prev => (prev === "credit" ? "debit" : "credit"));
  };

  const clientSel = state.SelectedClient.client;
  const getSearchfacility = obj => {};

  useEffect(() => {
    setCurrentUser(user);
    ////console.log(currentUser)
    return () => {};
  }, [user]);

  useEffect(() => {
    getaccountdetails();
    getBalance();
    return () => {};
  }, [clientSel]);

  const getaccountdetails = () => {
    InventoryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        client: clientSel.client,

        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        setFacility(res.data);

        toast({
          message: "Account details succesful",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        // setSuccess(false)
      })
      .catch(err => {
        toast({
          message: "Error getting account details " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const getBalance = async () => {
    const findProductEntry = await SubwalletServ.find({
      query: {
        client: clientSel.client,
        organization: user.currentEmployee.facilityDetail._id,

        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });

    if (findProductEntry.data.length > 0) {
      await setBalance(findProductEntry.data[0].amount);
    } else {
      await setBalance(0);
    }
  };

  return (
    <>
      <Box
        container
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid container spacing={1}>
          <Grid item sx={12} sm={12} md={5} lg={5}>
            <CreditTransactions isModal={isModal} />
          </Grid>

          <Grid item sx={12} sm={12} md={7} lg={7}>
            <DebitTransactions isModal={isModal} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export const CreditTransactions = ({isModal}) => {
  // eslint-disable-next-line
  const [facility, setFacility] = useState([]);
  const InventoryServ = client.service("subwallettransactions");
  const SubwalletServ = client.service("subwallet");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [balance, setBalance] = useState(0);

  const [accountType, setAccountType] = useState("credit");

  const clientSel = state.SelectedClient.client;
  const getSearchfacility = obj => {};

  useEffect(() => {
    setCurrentUser(user);
    ////console.log(currentUser)
    return () => {};
  }, [user]);

  useEffect(() => {
    getaccountdetails();
    getBalance();
    return () => {};
  }, [clientSel]);

  const getaccountdetails = () => {
    InventoryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        //IF SELECTED CLIENT IS FROM COLLECTIONS, CLIENT ID IS STORE IN client key but if Selected Client is from client, use the _id key
        client: clientSel.client || clientSel._id,

        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        setFacility(res.data);
      })
      .catch(err => {
        toast("Error getting account details " + err);
      });
  };

  const getBalance = async () => {
    const findProductEntry = await SubwalletServ.find({
      query: {
        client: clientSel.client || clientSel._id,
        organization: user.currentEmployee.facilityDetail._id,

        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });

    if (findProductEntry.data.length > 0) {
      await setBalance(findProductEntry.data[0].amount);
    } else {
      await setBalance(0);
    }
  };

  const creditSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Date & Time",
      key: "createdAt",
      description: "Enter Date",
      selector: row => format(new Date(row.createdAt), "dd-MM-yy HH:mm"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    // {
    //   name: "Description",
    //   style: {color: "#0364FF", textTransform: "capitalize"},
    //   key: "description",
    //   description: "Enter Date",
    //   selector: row => (row.description ? row.description : "-----------"),
    //   sortable: true,
    //   required: true,
    //   inputType: "DATE",
    // },
    {
      name: "Amount",
      key: "amount",
      description: "Enter Date",
      selector: row => row.amount,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Mode",
      key: "paymentmode",
      description: "Enter Date",
      selector: row => row.paymentmode,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
  ];

  const creditTransactions =
    facility && facility.filter(item => item.category === "credit");

  const totalCreditAmout =
    creditTransactions &&
    creditTransactions.reduce((n, {amount}) => n + amount, 0);
  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1.5}
      >
        <FormsHeaderText text="Credit Transactions" color="#588157" />
        <Box
          style={{
            minWidth: "200px",
            height: "40px",
            border: "1px solid #E5E5E5",
            display: "flex",
            padding: "0 10px",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={1.5}
        >
          <Typography
            sx={{
              color: "#000000",
              fontSize: "14px",
              lineHeight: "21.86px",
            }}
          >
            Total Credit Amount:
          </Typography>

          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "20px",
              color: "#386641",
            }}
          >
            <span>&#8358;</span>
            {totalCreditAmout}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          height: isModal ? "calc(80vh - 160px)" : "calc(100vh - 210px)",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={creditSchema}
          data={creditTransactions}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          progressPending={false}
        />
      </Box>
    </Box>
  );
};

export const DebitTransactions = ({isModal}) => {
  // eslint-disable-next-line
  const [facility, setFacility] = useState([]);
  const InventoryServ = client.service("subwallettransactions");
  const SubwalletServ = client.service("subwallet");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [balance, setBalance] = useState(0);

  const [accountType, setAccountType] = useState("credit");

  const clientSel = state.SelectedClient.client;
  const getSearchfacility = obj => {};

  useEffect(() => {
    setCurrentUser(user);
    ////console.log(currentUser)
    return () => {};
  }, [user]);

  useEffect(() => {
    getaccountdetails();
    getBalance();
    return () => {};
  }, [clientSel]);

  const getaccountdetails = () => {
    InventoryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        client: clientSel.client || clientSel._id,

        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        setFacility(res.data);
      })
      .catch(err => {
        toast("Error getting account details " + err);
      });
  };

  const getBalance = async () => {
    const findProductEntry = await SubwalletServ.find({
      query: {
        client: clientSel.client || clientSel._id,
        organization: user.currentEmployee.facilityDetail._id,

        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });

    if (findProductEntry.data.length > 0) {
      await setBalance(findProductEntry.data[0].amount);
    } else {
      await setBalance(0);
    }
  };
  const debitColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Date & Time",
      key: "createdAt",
      description: "Enter Date",
      selector: row => format(new Date(row.createdAt), "dd-MM-yy HH:mm"),
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "120px",
    },
    {
      name: "Description",
      style: {color: "#0364FF"},
      key: "description",
      description: "Enter Date",
      selector: row => row.description,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter Date",
      selector: row => row.amount,
      sortable: true,
      required: true,
      inputType: "NUMBER",
      width: "120px",
    },
    {
      name: "Mode",
      key: "paymentmode",
      description: "Enter Date",
      selector: row => row.paymentmode,
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "120px",
    },
  ];

  const debitTransactions =
    facility && facility.filter(item => item.category === "debit");

  const totalDebitAmout =
    debitTransactions &&
    debitTransactions.reduce((n, {amount}) => n + amount, 0);

  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1.5}
      >
        <FormsHeaderText text="Debit Transactions" color="#e63946" />
        <Box
          style={{
            minWidth: "200px",
            height: "40px",
            border: "1px solid #E5E5E5",
            display: "flex",
            padding: "0 10px",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={1.5}
        >
          <Typography
            sx={{
              color: "#000000",
              fontSize: "14px",
              lineHeight: "21.86px",
            }}
          >
            Total Debit Amount:
          </Typography>

          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "20px",
              color: "#e63946",
            }}
          >
            <span>&#8358;</span>
            {totalDebitAmout}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          height: isModal ? "calc(80vh - 160px)" : "calc(100vh - 210px)",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={debitColumns}
          data={debitTransactions}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          progressPending={false}
        />
      </Box>
    </Box>
  );
};
