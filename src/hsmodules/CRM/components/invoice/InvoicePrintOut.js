import {useRef} from "react";
import {Avatar, Divider, Grid, Typography} from "@mui/material";
import {Box, fontWeight} from "@mui/system";
import dayjs from "dayjs";
import {useContext, useState, useEffect} from "react";
import CustomTable from "../../../../components/customtable";
import ModalBox from "../../../../components/modal";
import {ObjectContext, UserContext} from "../../../../context";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CRMInvoiceDesign, {
  CRMEmailTemplate,
  EmailTemplate,
} from "./InvoiceDesign";
import {ContactsEmailSource, EmailsSourceList} from "../deals/SendLink";
import client from "../../../../feathers";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import Input from "../../../../components/inputs/basic/Input";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import {renderToStaticMarkup} from "react-dom/server";

const invoiceFormat = (invoice, plans) => {
  const htmlSend = `<html>
	<head>
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img src="https://www.sparksuite.com/images/logo.png" style="width: 100%; max-width: 300px" />
								</td>

								<td>
									Invoice #: 123<br />
									Created: January 1, 2015<br />
									Due: February 1, 2015
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
									Acme Corp.<br />
									John Doe<br />
									john@example.com
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>Check #</td>
				</tr>

				<tr class="details">
					<td>Check</td>

					<td>1000</td>
				</tr>

				<tr class="heading">
					<td>Type</td>

					<td>Date</td>

          <td>Duration</td>

          <td>Premium</td>

          <td>Heads</td>

          <td>Amount</td>
				</tr>

        ${plans.map(
          plan =>
            `
        <tr class="item">
					<td>${plan.type}</td>

					<td>${dayjs(plan.created_at).format("DD/MM/YYYY")}</td>

          <td>${plan.length} ${plan.calendrical}</td>

          <td>${plan.premiun}</td>

          <td>${plan.heads}</td>

          <td>${plan.amount}</td>
				</tr>
            `
        )}



				<tr class="total">
					<td></td>

					<td>Total: $385.00</td>
				</tr>
			</table>
		</div>
	</body>
</html>`;

  return htmlSend;
};

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

const InvoicePrintOut = ({closeModal}) => {
  const {state} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectAccountModal, setSelectAccountModal] = useState(true);
  const [emailModal, setEmailModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const printRef = useRef(null);

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

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    print: async printIframe => {
      //console.log(printIframe);
      setInvoiceData(printIframe);
      setEmailModal(true);
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "842px",
        padding: "20px 10px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "none",
        }}
      >
        <CRMInvoiceDesign ref={printRef} user={user} state={state} />
      </Box>
      <ModalBox
        open={selectAccountModal}
        header="Select Bank Account To Receive Payment"
      >
        <OrganizationAccountList
          closeModal={() => setSelectAccountModal(false)}
        />
      </ModalBox>

      <ModalBox
        open={emailModal}
        onClose={() => setEmailModal(false)}
        header="Send Invoice Via Email"
      >
        <SendInvoiceViaEmail
          closeModal={() => setEmailModal(false)}
          invoice={invoiceData}
          plans={invoice.plans}
        />
        {/* <CRMEmailTemplate /> */}
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
              {customer?.name}
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
              {customer?.address}, {customer?.lga}, {customer?.city},{" "}
              {customer?.state}, {customer?.country}.
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
              {customer?.phone}
              {/* 08123456789, 09123412134 */}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
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
            {totalAmount}
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
            {totalAmount}
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

      <Box
        sx={{
          position: "absolute",
          left: "0px",
          bottom: "0",
          width: "100%",
          //height: "40px",
          display: "flex",
        }}
        gap={2}
      >
        <ReactToPrint
          trigger={() => (
            <GlobalCustomButton color="info">Print Invoice</GlobalCustomButton>
          )}
          content={() => printRef.current}
        />

        <GlobalCustomButton onClick={handlePrint}>
          Send Invoice
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default InvoicePrintOut;

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

export const SendInvoiceViaEmail = ({invoice, closeModal, plans}) => {
  const emailServer = client.service("email");
  const {user} = useContext(UserContext);
  const {state, showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const [emailsModal, setEmailModals] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [destinationEmail, setDestinationEmail] = useState(
    state.DealModule.selectedDeal.email || ""
  );
  const [toEmailModal, setToEmailModal] = useState(false);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    //const deal = state.DealModule.selectedDeal.email;
    reset({
      to: destinationEmail,
      name: user.currentEmployee.facilityDetail.facilityName,
      subject: "Invoice",
      from: selectedEmail,
    });
  }, [selectedEmail, destinationEmail]);

  const handleSelectEmail = email => {
    setSelectedEmail(email);
    setEmailModals(false);
  };

  const handleSelectDestinationEmail = email => {
    setDestinationEmail(email);
    setToEmailModal(false);
  };

  const handleSendEmail = async data => {
    const html = renderToStaticMarkup(<CRMEmailTemplate />);

    const facility = user.currentEmployee.facilityDetail;
    showActionLoader();

    const document = {
      organizationId: facility._id,
      organizationName: facility.facilityName,
      html: html,
      //attachments: attachments,
      text: "",
      status: "pending",
      ...data,
    };

    //return console.log(document);

    await emailServer
      .create(document)
      .then(res => {
        hideActionLoader();
        closeModal();
        toast.success(`Invoice was sent successfully`);
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
        toast.error(`Sorry, Failed to send Invoice ${err}`);
      });
  };

  return (
    <Box
      sx={{
        width: "60vw",
      }}
    >
      <ModalBox
        open={emailsModal}
        //onClose={() => setEmailModals(false)}
        header="Plese Select Your Email Source"
      >
        <EmailsSourceList selectEmail={handleSelectEmail} />
      </ModalBox>

      <ModalBox
        open={toEmailModal}
        onClose={() => setToEmailModal(false)}
        header="Select Contact To Receive Email"
      >
        <ContactsEmailSource selectEmail={handleSelectDestinationEmail} />
      </ModalBox>

      <Box
        sx={{display: "flex", justifyContent: "flex-end"}}
        mb={2}
        mt={-1}
        gap={1.5}
      >
        <GlobalCustomButton
          sx={{marginTop: "5px"}}
          color="success"
          onClick={() => setEmailModals(true)}
        >
          Change Source Email
        </GlobalCustomButton>

        <GlobalCustomButton
          sx={{marginTop: "5px"}}
          color="secondary"
          onClick={() => setToEmailModal(true)}
        >
          Change Destination Email
        </GlobalCustomButton>
      </Box>

      <Grid container spacing={1} mb={2}>
        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Name"
            register={register("name", {require: "Please enter Name"})}
            errorText={errors?.name?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Subject"
            register={register("subject", {require: "Please enter Subject"})}
            errorText={errors?.subject?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} gap={1}>
          <Input
            important
            label="From"
            register={register("from", {require: "Please Add Source Email"})}
            errorText={errors?.from?.message}
            disabled
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="To"
            register={register("to", {
              require: "Please Enter Destination Email",
            })}
            errorText={errors?.to?.message}
          />
        </Grid>
      </Grid>

      <Box>
        <GlobalCustomButton onClick={handleSubmit(handleSendEmail)}>
          Send Invoice Via Email
          <SendIcon fontSize="small" sx={{marginLeft: "4px"}} />
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
