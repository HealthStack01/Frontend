/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import PaymentCreate from "./PaymentCreate";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import ModalBox from "../../components/modal";
import "react-datepicker/dist/react-datepicker.css";

// Demo styles, see 'Styles' section below
import BillServiceCreate from "./BillServiceCreate";
import {CustomButton} from "../../components/buttons/Button/base/styles";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../components/texts";
import {Typography} from "@mui/material";

export default function PharmacyBillService() {
  const [createModal, setCreateModal] = useState(false);
  const {state, setState} = useContext(ObjectContext);

  const handleOpenCreateModal = async () => {
    await setCreateModal(true);
  };

  const handleCloseCreateModal = async () => {
    await setCreateModal(false);
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

      <BillsList openCreateModal={handleOpenCreateModal} />

      <ModalBox
        open={createModal}
        onClose={handleCloseCreateModal}
        header="Create Bill Service"
      >
        <BillServiceCreate closeModal={handleCloseCreateModal} />
      </ModalBox>

      {/* <BillServiceCreate /> */}

      {/*  <div className="column is-3 ">
                
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}
    </section>
  );
}

export function BillsList({openCreateModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const BillServ = client.service("bills");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedDispense, setSelectedDispense] = useState(); //
  const [selectedOrders, setSelectedOrders] = useState([]);
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedFinance, setSelectedFinance] = useState("");
  const [expanded, setExpanded] = useState("");
  const [oldClient, setOldClient] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientBills, setClientBills] = useState([]);

  const handleSelectedClient = async Client => {
    // await setSelectedClient(Client)
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
  };

  const handleChoseClient = async (client, e, order) => {
    setOldClient(client.clientname);
    let newClient = client.clientname;
    if (oldClient !== newClient) {
      //alert("New Client Onboard")
      //remove all checked clientsly
      selectedOrders.forEach(el => (el.checked = ""));
      setSelectedOrders([]);
    }

    // //console.log(e.target.checked)
    order.checked = e.target.checked;
    await handleSelectedClient(order.participantInfo.client);
    //handleMedicationRow(order)
    await setSelectedFinance(order);
    const newProductEntryModule = {
      selectedFinance: order,
      show: "detail",
      state: e.target.checked,
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));

    //set of checked items
    if (e.target.checked) {
      await setSelectedOrders(prevstate => prevstate.concat(order));
    } else {
      setSelectedOrders(prevstate =>
        prevstate.filter(el => el._id !== order._id)
      );
    }

    // //console.log(selectedOrders)
  };
  const handleMedicationRow = async (ProductEntry, e) => {
    //handle selected single order
    ////console.log("b4",state)
    // alert("Header touched")
    ////console.log("handlerow",ProductEntry)
    /* alert(ProductEntry.checked)*/
    /*  ProductEntry.checked=!ProductEntry.checked */
    /*  await setSelectedFinance(ProductEntry)
     
         const    newProductEntryModule={
             selectedFinance:ProductEntry,
             show :'detail'
 
         }
       await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule})) */
    ////console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

  const handleCreateNew = async () => {
    const newProductEntryModule = {
      selectedDispense: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));

    await openCreateModal(true);
  };

  const handleSearch = val => {
    const field = "name";
    ////console.log(val)
    BillServ.find({
      query: {
        "participantInfo.paymentmode.detail.principalName": {
          $regex: val,
          $options: "i",
        },

        $or: [
          {
            "participantInfo.paymentmode.type": "Cash",
          },
          {
            "participantInfo.paymentmode.type": "Family Cover",
          },
        ],

        "participantInfo.billingFacility":
          user.currentEmployee.facilityDetail._id,
        billing_status: "Unpaid", // need to set this finally
        //order_category:"Prescription",
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 30,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        // //console.log(res)
        setFacilities(res.groupedOrder);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        // //console.log(err)
        setMessage(
          "Error fetching ProductEntry, probable network issues " + err
        );
        setError(true);
      });
  };
  const getFacilities = async () => {
    setLoading(true);
    // //console.log("here b4 server")
    const findProductEntry = await BillServ.find({
      query: {
        $or: [
          {
            "participantInfo.paymentmode.type": "Cash",
          },
          {
            "participantInfo.paymentmode.type": "Family Cover",
          },
        ],

        "participantInfo.billingFacility":
          user.currentEmployee.facilityDetail._id,
        billing_status: "Unpaid", // need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });

    //  //console.log("updatedorder", findProductEntry.groupedOrder)
    await setFacilities(findProductEntry.groupedOrder);
    setLoading(false);

    //console.log(findProductEntry.groupedOrder);
    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };

  //1.consider using props for global data
  useEffect(() => {
    // //console.log("started")
    getFacilities();
    BillServ.on("created", obj => getFacilities());
    BillServ.on("updated", obj => getFacilities());
    BillServ.on("patched", obj => getFacilities());
    BillServ.on("removed", obj => getFacilities());

    const newClient = {
      selectedClient: "",
      show: "create",
    };
    setState(prevstate => ({...prevstate, ClientModule: newClient}));

    return () => {};
  }, []);

  useEffect(() => {
    //changes with checked box
    // //console.log(selectedOrders)

    return () => {};
  }, [selectedOrders]);

  useEffect(() => {
    if (state.financeModule.show === "create") {
      selectedOrders.forEach(el => (el.checked = ""));
      setSelectedOrders([]);
    }
    return () => {};
  }, [state.financeModule.show]);

  const onRowClicked = async (Client, e) => {
    if (selectedClient && selectedClient.client_id === Client.client_id)
      return setSelectedClient(null);
    await setSelectedClient(Client);

    const clientOrders = Client.bills.map(data => {
      const allOrders = [];

      data.order.map(order => {
        const orderData = {
          date: order.createdAt,
          status: order.billing_status,
          description: order.serviceInfo.name,
          category: data.catName,
          amount: data.catAmount,
          order: order,
          bills: [],
        };

        allOrders.push(orderData);
      });
      return allOrders;
    });

    ////console.log(clientOrders);
    setClientBills(clientOrders.flat(1));
  };

  const returnNumberOfBills = bills => {
    const billsLength = bills.reduce((accumulator, object) => {
      return accumulator + object.order.length;
    }, 0);

    return billsLength;
  };

  const financePlaymentListSchema = [
    {
      name: "S/N",
      width: "60px",
      headerStyle: (selector, id) => {
        return {textAlign: "center"};
      },

      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Name",
      //width: "200px",
      key: "clientname",
      description: "Enter Name",
      selector: row => row.clientname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Categories Total",
      key: "bills",
      description: "Enter Category Total",
      selector: row => {
        const bills = row.bills;
        return (
          <>
            {console.log(row)}
            {bills.map((category, i) => (
              <Typography sx={{fontSize: "0.75rem"}} data-tag="allowRowEvents">
                {category.catName} {category.catAmount.toFixed(2)}
              </Typography>
            ))}
          </>
        );
        //row.clientAmount.toFixed(2);
        // //console.log(bills);
        // bills.map((category, i) => {
        //   return category.catAmount.toFixed(2);
        // });
      },
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Grand Total",
      // width: "130px",
      key: "clientAmount",
      description: "Enter Grand Total",
      selector: row => row.clientAmount.toFixed(2),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "150px",
    },
    {
      name: "No of Bills",
      key: "bills",
      description: "Enter Number of Bills",
      selector: row => returnNumberOfBills(row.bills),
      sortable: true,
      required: true,
      inputType: "BUTTON",
      center: true,
      width: "100px",
    },
  ];

  const selectedClientSchema = [
    {
      name: "S/NO",
      width: "70px",
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
      selector: row => format(new Date(row.date), "dd-MM-yy"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Category",
      key: "category",
      description: "Enter Category",
      selector: row => row.category,
      sortable: true,
      required: true,
      inputType: "SELECT",
    },
    {
      name: "Description",
      key: "description",
      description: "Enter Description",
      selector: row => row.description,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "status",
      description: "Enter Status",
      selector: row => row.status,
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
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.client_id === selectedClient?.client_id,
      style: {
        backgroundColor: "#4cc9f0",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  console.log(selectedClient);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          width: "100%",
          flex: "1",
        }}
      >
        <TableMenu>
          <div style={{display: "flex", alignItems: "center"}}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2
              style={{
                marginLeft: "10px",
                fontSize: "0.95rem",
                marginRight: "10px",
              }}
            >
              Unpaid Bills
            </h2>

            {selectedClient && (
              <FormsHeaderText text={`- ${selectedClient?.clientname}`} />
            )}
          </div>

          {handleCreateNew && (
            <GlobalCustomButton onClick={handleCreateNew}>
              <AddCircleOutlineOutlinedIcon
                sx={{marginRight: "5px"}}
                fontSize="small"
              />
              Add New
            </GlobalCustomButton>
          )}
        </TableMenu>
        <div
          //className="columns"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: "calc(100vh - 170px)",
              overflowY: "auto",
              transition: "width 0.5s ease-in",
              width: selectedClient ? "49%" : "100%",
            }}
          >
            <CustomTable
              title={""}
              columns={financePlaymentListSchema}
              data={facilities}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={row => onRowClicked(row)}
              progressPending={loading}
              conditionalRowStyles={conditionalRowStyles}
            />
          </div>

          {selectedClient && (
            <>
              <div
                style={{
                  height: "calc(100vh - 170px)",
                  width: "49%",
                }}
              >
                <CustomTable
                  title={""}
                  columns={selectedClientSchema}
                  data={clientBills}
                  pointerOnHover
                  highlightOnHover
                  striped
                  //onRowClicked={row => onRowClicked(row)}
                  progressPending={loading}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
