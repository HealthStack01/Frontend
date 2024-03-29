import {useRef} from "react";
import {Avatar, Divider, Typography} from "@mui/material";
import {Box, fontWeight} from "@mui/system";
import dayjs from "dayjs";
import {useContext, useState, useEffect} from "react";
// import CustomTable from "../../../../components/customtable";
import ReactToPrint, {useReactToPrint} from "react-to-print";
// import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import client from "../../../../feathers";
import ModalBox from "../../components/modal";
import {ObjectContext, UserContext} from "../../../../../../context";
import CustomTable from "../../../../components/customtable";
import GlobalCustomButton from "../../components/buttons/CustomButton";

const customStyles = {
  rows: {
    style: {
      minHeight: "30px", // override the row height
      "&:not(:last-of-type)": {
        borderBottomWidth: "0px",
      },
      padding: "0.15rem",
      backgroundColor: "##F8F8F8",
    },
  },
  headRow: {
    style: {
      borderBottomWidth: "0px",
      padding: "0.15rem",
      backgroundColor: "#F8F8F8",
      fontSize: "0.67rem",
    },
  },
  headCells: {
    style: {
      padding: "0.15rem",
      paddingLeft: "0.25rem", // override the cell padding for head cells
      paddingRight: "0.25rem",
      paddingTop: "0.1rem",
      paddingBottom: "0.1rem",
      fontSize: "0.7rem",
      fontWeight: "bold",
      color: "#000000",
    },
  },
  cells: {
    style: {
      paddingLeft: "0.25rem", // override the cell padding for data cells
      paddingRight: "0.25rem",
      paddingTop: "0.1rem",
      paddingBottom: "0.1rem",
      fontSize: "0.69rem",
      color: "#000000",
      fontWeight: "400",
    },
  },
};

const columns = [
  {
    name: "Type",
    key: "file_name",
    description: "Enter Date",
    selector: row => (
      <Typography
        sx={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.type === "hmo" ? "HMO" : row.type}
      </Typography>
    ),
    sortable: true,
    required: true,
    inputType: "TEXT",
    style: {
      textTransform: "capitalize",
    },
    width: "120px",
  },

  {
    name: "Date",
    style: {color: "#0364FF"},
    key: "created_at",
    description: "Enter Date",
    selector: row => (
      <Typography
        sx={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {dayjs(row.created_at).format("DD/MM/YYYY")}
      </Typography>
    ),
    //selector: row => dayjs(row.created_at).format("DD/MM/YYYY"),
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "99px",
  },

  {
    name: "Duration",
    style: {color: "#0364FF"},
    key: "no_of_months",
    description: "Enter Date",
    selector: row => (
      <Typography
        sx={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.length} {row.calendrical}
      </Typography>
    ),
    //selector: row => `${row.length} ${row.calendrical}`,
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "120px",
  },

  {
    name: "Premium",
    style: {color: "#0364FF"},
    key: "premium",
    description: "Enter Date",
    selector: row => (
      <Typography
        sx={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.premium}
      </Typography>
    ),
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "99px",
  },

  {
    name: "Heads",
    style: {color: "#0364FF"},
    key: "no_of_heads",
    description: "Enter Date",
    selector: row => (
      <Typography
        sx={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.heads}
      </Typography>
    ),
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "70px",
  },

  {
    name: "Amount(₦)",
    style: {color: "#0364FF"},
    key: "amount",
    description: "Enter Date",
    selector: row => (
      <Typography
        sx={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.amount}
      </Typography>
    ),
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "99px",
  },
];

const billsColumns = [
  {
    name: "S/N",
    width: "50px",
    key: "sn",
    description: "Enter name of Disease",
    selector: row => row.sn,
    sortable: true,
    required: true,
    inputType: "HIDDEN",
  },
  {
    name: "Date",
    key: "date",
    description: "Enter Date",
    selector: row => dayjs(row.date).format("DD/MM/YYYY"),
    sortable: true,
    required: true,
    inputType: "DATE",
    width: "100px",
  },
  {
    name: "Category",
    key: "category",
    description: "Enter Category",
    selector: row => (
      <Typography
        sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.category}
      </Typography>
    ),
    sortable: true,
    required: true,
    inputType: "SELECT",
  },
  {
    name: "Description",
    key: "description",
    description: "Enter Description",
    selector: row => (
      <Typography
        sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.description}
      </Typography>
    ),
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Amount",
    key: "amount",
    description: "Enter Amount",
    selector: row => row.amount,
    sortable: true,
    required: true,
    inputType: "NUMBER",
    width: "100px",
  },
];

const PaymentInvoice = ({clientId, bills, clientAmount}) => {
  const ClientServ = client.service("client");
  const {state} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectAccountModal, setSelectAccountModal] = useState(true);
  const [billedClient, setBilledClient] = useState(null);

  const printRef = useRef(null);

  const organization = user.currentEmployee.facilityDetail;
  const invoice = state.InvoiceModule.selectedInvoice;
  const customer = state.DealModule.selectedDeal;
  const account = state.InvoiceModule.selectedBankAccount;

  const handleGetClinet = async () => {
    await ClientServ.get(clientId)
      .then(resp => {
        console.log(resp);
        setBilledClient(resp);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    handleGetClinet();
  }, []);

  return (
    <Box
      sx={{
        width: "700px",
        height: "842px",
        padding: "20px 10px",
      }}
      ref={printRef}
    >
      <ModalBox
        open={selectAccountModal}
        header="Select Bank Account To Receive Payment"
      >
        <OrganizationAccountList
          closeModal={() => setSelectAccountModal(false)}
        />
      </ModalBox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{display: "flex", alignItems: "center"}}>
            {organization.facilitylogo ? (
              <Avatar
                sx={{width: 40, height: 40, marginRight: "5px"}}
                src={organization.facilitylogo}
                alt="logo"
              />
            ) : (
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#C6C6C6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "5px",
                }}
              >
                <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
                  Logo
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  color: "#0064CC",
                }}
              >
                {organization?.facilityName}
              </Typography>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  background: "#000000",
                  margin: "0 5px",
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#000000",
                }}
              >
                Invoice
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: "280px",
              marginLeft: "45px",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              {organization?.facilityAddress}, {organization?.facilityCity}
              {/* 296 Herbert Macaulay Way,Yaba, Lagos.P.O.Box 782, Marina,Lagos */}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              website: www.healthcare-ng.com
            </Typography>

            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              Email : {organization?.facilityEmail}
              {/* email: info@healthcare-ng.com */}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              Tel: {organization?.facilityContactPhone}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: "300",
              }}
            >
              INVOICE NUMBER
            </Typography>

            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: "600",
              }}
            >
              {invoice?.invoice_number}
              {/* HCI/INTERTEK/LAG/ HO/2022/EO/1181 */}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: "300",
              }}
            >
              INVOICE DATE
            </Typography>

            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: "600",
              }}
            >
              {dayjs(invoice?.createdAt).format("MMM D, YYYY")}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box mt={3} mb={3}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: "#000000",
            fontWeight: "600",
          }}
        >
          RECIPIENT
        </Typography>
        <Box mt={0.5}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                marginRight: "5px",
              }}
            >
              Name:
            </Typography>
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: "600",
              }}
            >
              {billedClient?.firstname} {billedClient?.lastname}
              {/* INTERTEK - Caleb Brett */}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                marginRight: "5px",
              }}
            >
              Address:
            </Typography>
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: "600",
              }}
            >
              {billedClient?.address}, {billedClient?.lga}, {billedClient?.city}
              , {billedClient?.state}, {billedClient?.country}.
              {/* Plot 73B, Marine Road, Apapa, Lagos, Nigeria. */}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                marginRight: "5px",
              }}
            >
              Phone:
            </Typography>
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: "600",
              }}
            >
              {billedClient?.phone}
              {/* 08123456789, 09123412134 */}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <CustomTable
          columns={billsColumns}
          data={bills}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRowClick}
          CustomEmptyData="There are no bills"
          progressPending={false}
          preferredCustomStyles={customStyles}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: "38px",
        }}
        mt={2}
      >
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #CCCCCC",
            width: "200px",
            justifyContent: "space-between",
            paddingBottom: "5px",
          }}
          mb={1}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#0364FF",
            }}
          >
            Subtotal
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            {clientAmount}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #CCCCCC",
            width: "200px",
            justifyContent: "space-between",
            paddingBottom: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#0364FF",
            }}
          >
            Total
          </Typography>

          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            {clientAmount}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: "38px",
        }}
        mt={2}
      >
        <Box
          sx={{
            width: "200px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0364FF",
            cursor: "pointer",
          }}
          onClick={() => setSelectAccountModal(true)}
        >
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "0.8rem",
            }}
          >
            Account Data
          </Typography>
        </Box>

        <Box
          sx={{
            width: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.65rem",
            }}
          >
            Payment should be made into the bank account with details stated
            below:
          </Typography>
        </Box>

        <Box
          mt={0.5}
          sx={{
            width: "200px",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                marginRight: "5px",
              }}
            >
              Bank:
            </Typography>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              {account?.bankname}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                marginRight: "5px",
              }}
            >
              A/C name:
            </Typography>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              {account?.accountname}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                marginRight: "5px",
              }}
            >
              A/C Num:
            </Typography>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              {account?.accountnumber}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                marginRight: "5px",
              }}
            >
              Sort Code:
            </Typography>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              {account?.sortcode}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* <ReactToPrint
        trigger={() => (
          <GlobalCustomButton color="info">Print Invoice</GlobalCustomButton>
        )}
        content={() => printRef.current}
      /> */}
    </Box>
  );
};

export default PaymentInvoice;

const OrganizationAccountList = ({closeModal}) => {
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const bankColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Bank Name",
      key: "bank_name",
      description: "Bank Name",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal", color: "#1976d2"}}
          data-tag="allowRowEvents"
        >
          {row.bankname}
        </Typography>
      ),
      sortable: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Account Name",
      key: "account_name",
      description: "Account Name",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal", color: "#1976d2"}}
          data-tag="allowRowEvents"
        >
          {row.accountname}
        </Typography>
      ),
      sortable: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Account Number",
      key: "account_number",
      description: "Account Number",
      selector: row => row.accountnumber,
      sortable: true,
      inputType: "TEXT",
      width: "150px",
    },
    {
      name: "Branch",
      key: "branch",
      description: "Branch",
      selector: row => row.branch,
      sortable: true,
      inputType: "TEXT",
      width: "150px",
    },
    {
      name: "Sort Code",
      key: "sort_code",
      description: "Sort Code",
      selector: row => row.sortcode,
      sortable: true,
      inputType: "TEXT",
      width: "120px",
    },
    {
      name: "Comments",
      key: "sort_code",
      description: "Sort Code",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.comment ? row.comment : "----------"}
        </Typography>
      ),
      sortable: true,
      inputType: "TEXT",
    },
  ];

  const handleRow = account => {
    setState(prev => ({
      ...prev,
      InvoiceModule: {...prev.InvoiceModule, selectedBankAccount: account},
    }));
    closeModal();
  };

  return (
    <Box sx={{width: "85vw"}}>
      <Box>
        <CustomTable
          title={""}
          columns={bankColumns}
          data={user?.currentEmployee?.facilityDetail?.facilityBankAcct || []}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          CustomEmptyData={
            <Typography sx={{fontSize: "0.8rem"}}>
              You haven't added a bank account to your Organization yet...
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};
