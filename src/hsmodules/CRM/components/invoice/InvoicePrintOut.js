import {Divider, Typography} from "@mui/material";
import {Box, fontWeight} from "@mui/system";
import CustomTable from "../../../../components/customtable";

export const customStyles = {
  rows: {
    style: {
      minHeight: "40px", // override the row height
      "&:not(:last-of-type)": {
        borderBottomWidth: "0px",
      },
      padding: "0.25rem",
      backgroundColor: "##F8F8F8",
    },
  },
  headRow: {
    style: {
      borderBottomWidth: "0px",
      padding: "0.25rem",
      backgroundColor: "#F8F8F8",
      fontSize: "0.75rem",
    },
  },
  headCells: {
    style: {
      padding: "0.25rem",
      paddingLeft: "0.5rem", // override the cell padding for head cells
      paddingRight: "0.5rem",
      paddingTop: "0.2rem",
      paddingBottom: "0.2rem",
      fontSize: "0.8rem",
      fontWeight: "bold",
      color: "#000000",
    },
  },
  cells: {
    style: {
      paddingLeft: "0.5rem", // override the cell padding for data cells
      paddingRight: "0.5rem",
      paddingTop: "0.2rem",
      paddingBottom: "0.2rem",
      fontSize: "0.79rem",
      color: "#000000",
      fontWeight: "400",
    },
  },
};

const data = [
  {
    details: "Gold Ultra Plus",
    months: "6",
    num_of_plans: "40",
    price: "58,333.00",
    amount: "1,283,326.00",
  },

  {
    details: "Gold Ultra Plus",
    months: "5",
    num_of_plans: "30",
    price: "58,333.00",
    amount: "1,283,326.00",
  },

  {
    details: "Gold Ultra Plus",
    months: "4",
    num_of_plans: "24",
    price: "58,333.00",
    amount: "1,283,326.00",
  },

  {
    details: "Gold Ultra Plus",
    months: "12",
    num_of_plans: "11",
    price: "58,333.00",
    amount: "1,283,326.00",
  },
];

const columns = [
  {
    name: "Details",
    key: "details",
    description: "Enter Date",
    selector: row => row.details,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
  {
    name: "No of Plan",
    key: "num_of_plans",
    description: "Enter Date",
    selector: row => row.num_of_plans,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Unit Price(N)",
    key: "price",
    description: "Enter Date",
    selector: row => row.price,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "No of Month",
    key: "months",
    description: "Enter Date",
    selector: row => row.months,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Amount(N)",
    key: "amount",
    description: "Enter Date",
    selector: row => row.amount,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

const InvoicePrintOut = () => {
  return (
    <Box
      sx={{
        width: "595px",
        height: "842px",
        padding: "20px 10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{display: "flex", alignItems: "center"}}>
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
                HCI Healthcare Limited
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
              296 Herbert Macaulay Way,Yaba, Lagos.P.O.Box 782, Marina,Lagos
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
              email: info@healthcare-ng.com
            </Typography>

            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#999999",
              }}
            >
              Tel: 01-08052099099, 07030009099, 01-4489821
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
              HCI/INTERTEK/LAG/ HO/2022/EO/1181
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
              04/08/2022{" "}
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
              INTERTEK - Caleb Brett
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
              Plot 73B, Marine Road, Apapa, Lagos, Nigeria.
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
              08123456789, 09123412134
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <CustomTable
          columns={columns}
          data={data}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRowClick}
          CustomEmptyData="There are no bills"
          progressPending={false}
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
            4,768,326.00
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
            4,768,326.00
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
          }}
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
              Sterling Bank
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
              HCI Healthcare Limited
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
              0009930871
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
              232150443
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InvoicePrintOut;
