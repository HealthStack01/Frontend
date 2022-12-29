import {useState, useContext, useEffect} from "react";

import {UserContext, ObjectContext} from "../../../../context";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {TableMenu} from "../../../../ui/styled/global";
import {PageWrapper} from "../../../app/styles";

const InvoiceList = ({openCreateModal, showCreateView, showDetailView}) => {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const handleRow = data => {
    setState(prev => ({
      ...prev,
      InvoiceModule: {...prev.InvoiceModule, selectedInvoice: data},
    }));
    showDetailView();
  };

  const dummyData = [
    {
      name: "Pascal Grobbs",
      invoice_no: "HCI/INTERTEK/LAG",
      plan: "Family",
      amount: "500,000:00",
      unit: "50",
      status: "Active",
    },
    {
      name: "Matt Albert",
      invoice_no: "HCI/INTERTEK/LAG",
      plan: "Family",
      amount: "500,000:00",
      unit: "50",
      status: "Active",
    },
    {
      name: "David Coughar",
      invoice_no: "HCI/INTERTEK/LAG",
      plan: "Family",
      amount: "500,000:00",
      unit: "50",
      status: "Inactive",
    },

    {
      name: "Blake Angels",
      invoice_no: "HCI/INTERTEK/LAG",
      plan: "Family",
      amount: "500,000:00",
      unit: "50",
      status: "Active",
    },
  ];

  useEffect(() => {
    const currentDeal = state.DealModule.selectedDeal || [];
    setInvoices(currentDeal.invoices);
    console.log(currentDeal);
  }, [state.DealModule]);

  const handleSearch = () => {};

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "active":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "inactive":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      default:
        break;
    }
  };

  const InvoiceSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Name",
      key: "name",
      description: "Enter name of Company",
      selector: row => row.customerName,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Invoice No",
      key: "invoice_no",
      description: "Enter Telestaff name",
      selector: row => row.invoice_number,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Payment Mode",
      key: "payment_type",
      description: "Enter Telestaff name",
      selector: row => row.payment_mode,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Payment Option",
      key: "payment_option",
      description: "Enter name of Disease",
      selector: (row, i) => row.payment_option,
      sortable: true,
      required: true,
      inputType: "DATE",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Subscription Cat",
      key: "subscription_category",
      description: "Enter Telestaff name",
      selector: row => row.subscription_category,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Plans",
      key: "plan",
      description: "Enter bills",
      selector: row => row.plans.length,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter name of Disease",
      selector: (row, i) => row.total_amount,
      sortable: true,
      required: true,
      inputType: "DATE",
    },

    {
      name: "Status",
      key: "status",
      description: "Enter bills",
      selector: "status",
      cell: row => (row.status ? row.status : "----------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <div className="level">
        <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
          <TableMenu>
            <div style={{display: "flex", alignItems: "center"}}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>Invoice</h2>
            </div>

            <GlobalCustomButton onClick={showCreateView}>
              <AddCircleOutlineOutlined
                fontSize="small"
                sx={{marginRight: "5px"}}
              />
              Create Invoice
            </GlobalCustomButton>
          </TableMenu>
          <div style={{width: "100%", overflow: "auto"}}>
            <CustomTable
              title={""}
              columns={InvoiceSchema}
              data={invoices}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
};

export default InvoiceList;
