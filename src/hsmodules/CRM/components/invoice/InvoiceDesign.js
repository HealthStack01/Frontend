import {useRef, forwardRef} from "react";
import {Avatar, Divider, p} from "@mui/material";
import {div, fontWeight} from "@mui/system";
import dayjs from "dayjs";
import {useContext, useState, useEffect} from "react";
import CustomTable from "../../../../components/customtable";
import Modaldiv from "../../../../components/modal";
import {ObjectContext, UserContext} from "../../../../context";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

import "./invoice.css";

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
      <p
        style={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.type === "hmo" ? "HMO" : row.type}
      </p>
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
      <p
        style={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {dayjs(row.created_at).format("DD/MM/YYYY")}
      </p>
    ),
    //selector: row => dayjs(row.created_at).format("DD/MM/YYYY"),
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "100px",
  },

  {
    name: "Duration",
    style: {color: "#0364FF"},
    key: "no_of_months",
    description: "Enter Date",
    selector: row => (
      <p
        style={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.length} {row.calendrical}
      </p>
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
      <p
        style={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.premium}
      </p>
    ),
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Number of Heads",
    style: {color: "#0364FF"},
    key: "no_of_heads",
    description: "Enter Date",
    selector: row => (
      <p
        style={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.heads}
      </p>
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
      <p
        style={{fontSize: "0.69rem", whiteSpace: "normal"}}
        data-tag="allowRowEvents"
      >
        {row.amount}
      </p>
    ),
    sortable: true,
    required: true,
    inputType: "TEXT",
    width: "100px",
  },
];

const CRMInvoiceDesign = forwardRef(({state, user}, ref) => {
  //const {state} = useContext(ObjectContext);
  //const {user} = useContext(UserContext);
  const [totalAmount, setTotalAmount] = useState(0);

  const organization = user.currentEmployee.facilityDetail;
  const invoice = state.InvoiceModule.selectedInvoice;
  const customer = state.DealModule.selectedDeal;
  const account = state.InvoiceModule.selectedBankAccount;

  useEffect(() => {
    //console.log(plans[0]);
    const totalPlansSum = invoice?.plans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

    setTotalAmount(`${totalPlansSum}.00`);
  }, [invoice.plans]);

  return (
    <div
      style={{
        width: "100%",
        height: "842px",
      }}
      p={5}
      ref={ref}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{display: "flex", alignItems: "center"}}>
            {organization.facilitylogo ? (
              <Avatar
                style={{width: 40, height: 40, marginRight: "5px"}}
                src={organization.facilitylogo}
                alt="logo"
              />
            ) : (
              <div
                style={{
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
                <p style={{fontSize: "0.75rem", color: "#000000"}}>Logo</p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  color: "#0064CC",
                }}
              >
                {organization?.facilityName}
              </p>

              <Divider
                orientation="vertical"
                flexItem
                style={{
                  background: "#000000",
                  margin: "0 5px",
                }}
              />

              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#000000",
                }}
              >
                Invoice
              </p>
            </div>
          </div>

          <div
            style={{
              width: "280px",
              marginLeft: "45px",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              {organization?.facilityAddress}, {organization?.facilityCity}
              {/* 296 Herbert Macaulay Way,Yaba, Lagos.P.O.div 782, Marina,Lagos */}
            </p>

            <p
              style={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              website: www.healthcare-ng.com
            </p>

            <p
              style={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              Email : {organization?.facilityEmail}
              {/* email: info@healthcare-ng.com */}
            </p>

            <p
              style={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              Tel: {organization?.facilityContactPhone}
            </p>
          </div>
        </div>

        <div>
          <div>
            <p
              style={{
                fontSize: "0.6rem",
                fontWeight: "300",
              }}
            >
              INVOICE NUMBER
            </p>

            <p
              style={{
                fontSize: "0.6rem",
                fontWeight: "600",
              }}
            >
              {invoice?.invoice_number}
              {/* HCI/INTERTEK/LAG/ HO/2022/EO/1181 */}
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: "0.6rem",
                fontWeight: "300",
              }}
            >
              INVOICE DATE
            </p>

            <p
              style={{
                fontSize: "0.6rem",
                fontWeight: "600",
              }}
            >
              {dayjs(invoice?.createdAt).format("MMM D, YYYY")}
            </p>
          </div>
        </div>
      </div>

      <div mt={3} mb={3}>
        <p
          style={{
            fontSize: "0.7rem",
            color: "#000000",
            fontWeight: "600",
          }}
        >
          RECIPIENT
        </p>
        <div mt={0.5}>
          <div
            style={{
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                marginRight: "5px",
              }}
            >
              Name:
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: "600",
              }}
            >
              {customer?.name}
              {/* INTERTEK - Caleb Brett */}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                marginRight: "5px",
              }}
            >
              Address:
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: "600",
              }}
            >
              {customer?.address}, {customer?.lga}, {customer?.city},{" "}
              {customer?.state}, {customer?.country}.
              {/* Plot 73B, Marine Road, Apapa, Lagos, Nigeria. */}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                marginRight: "5px",
              }}
            >
              Phone:
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: "600",
              }}
            >
              {customer?.phone}
              {/* 08123456789, 09123412134 */}
            </p>
          </div>
        </div>
      </div>

      <div>
        <CustomTable
          columns={columns}
          data={invoice.plans}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRowClick}
          CustomEmptyData="There are no bills"
          progressPending={false}
          preferredCustomStyles={customStyles}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: "38px",
        }}
        mt={2}
      >
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #CCCCCC",
            width: "200px",
            justifyContent: "space-between",
            paddingBottom: "5px",
          }}
          mb={1}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#0364FF",
            }}
          >
            Subtotal
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            {totalAmount}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #CCCCCC",
            width: "200px",
            justifyContent: "space-between",
            paddingBottom: "5px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#0364FF",
            }}
          >
            Total
          </p>

          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            {totalAmount}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: "38px",
        }}
        mt={2}
      >
        <div
          style={{
            width: "200px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0364FF",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontSize: "0.8rem",
            }}
          >
            Account Data
          </p>
        </div>

        <div
          style={{
            width: "200px",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
            }}
          >
            Payment should be made into the bank account with details stated
            below:
          </p>
        </div>

        <div
          mt={0.5}
          style={{
            width: "200px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                marginRight: "5px",
              }}
            >
              Bank:
            </p>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              {account?.bankname}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                marginRight: "5px",
              }}
            >
              A/C name:
            </p>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              {account?.accountname}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                marginRight: "5px",
              }}
            >
              A/C Num:
            </p>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              {account?.accountnumber}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                marginRight: "5px",
              }}
            >
              Sort Code:
            </p>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: "600",
              }}
            >
              {account?.sortcode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CRMInvoiceDesign;

export const EmailTemplate = "hello world";

const logo =
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHw%3D&w=1000&q=80";

export const CRMEmailTemplate = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "150px",
          backgroundColor: "#0077b6",
          padding: "15px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "1px solid #f0f0f0",
                borderRadius: "50%",
                overflow: "hidden",
                marginRight: "5px",
              }}
            >
              <img
                src={logo}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>

            <div>
              <h1 style={{color: "#c7f9cc", fontSize: "16px"}}>
                Healthstack Solutions |{" "}
                <span style={{color: "#ffffff"}}>#INVOICE</span>
              </h1>
            </div>
          </div>

          <div>
            <p
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "12px",
              }}
            >
              17b Bala road, Excellence street, Ikeja, Lagos, Nigeria.
            </p>
            <p
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "12px",
              }}
            >
              Website : www.helloworld.com
            </p>

            <p
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "12px",
              }}
            >
              Email : example@email.com
            </p>

            <p
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "12px",
              }}
            >
              Tel : 09034543232
            </p>
          </div>
        </div>

        <div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#c7f9cc",
              }}
            >
              Invoice Number
            </h3>
            <p
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "12px",
              }}
            >
              FKJIIUE309090434
            </p>
          </div>

          <div>
            <h3
              style={{
                margin: 0,
                color: "#c7f9cc",
                fontSize: "14px",
              }}
            >
              Invoice Date
            </h3>
            <p
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "12px",
              }}
            >
              11/12/2022
            </p>
          </div>
        </div>
      </div>

      {/* <div
        style={{
          width: "100%",
        }}
      >
        <table
          style={{
            width: "800px",
            tableLayout: "fixed",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Twitter</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td data-column="First Name">James</td>
              <td data-column="Last Name">Matman</td>
              <td data-column="Job Title">Chief Sandwich Eater</td>
              <td data-column="Twitter">@james</td>
            </tr>
            <tr>
              <td data-column="First Name">Andor</td>
              <td data-column="Last Name">Nagy</td>
              <td data-column="Job Title">Designer</td>
              <td data-column="Twitter">@andornagy</td>
            </tr>
            <tr>
              <td data-column="First Name">Tamas</td>
              <td data-column="Last Name">Biro</td>
              <td data-column="Job Title">Game Tester</td>
              <td data-column="Twitter">@tamas</td>
            </tr>
            <tr>
              <td data-column="First Name">Zoli</td>
              <td data-column="Last Name">Mastah</td>
              <td data-column="Job Title">Developer</td>
              <td data-column="Twitter">@zoli</td>
            </tr>
            <tr>
              <td data-column="First Name">Szabi</td>
              <td data-column="Last Name">Nagy</td>
              <td data-column="Job Title">Chief Sandwich Eater</td>
              <td data-column="Twitter">@szabi</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};
