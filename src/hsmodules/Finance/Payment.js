/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
import PaymentCreate from "./PaymentCreate";
import PatientProfile from "../Client/PatientProfile";

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import ModalBox from "./ui-components/modal";
import "react-datepicker/dist/react-datepicker.css";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

// Demo styles, see 'Styles' section below for some notes on use.

//import BillPrescriptionCreate from './BillPrescriptionCreate';

export default function FinancePayment() {
  //const {state}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
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
  const [selectedOrders, setSelectedOrders] = useState([]); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

      <BillingList />

      {/* <ModalBox open={state.financeModule.show === "detail"}>
        <PaymentCreate />
      </ModalBox> */}

      {/* <div className="column is-4">
        {state.financeModule.show === "detail" && <PaymentCreate />}
      </div> */}
      {/*  <div className="column is-3 ">
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}
    </section>
  );
}

export function BillingList() {
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
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDispense, setSelectedDispense] = useState(); //
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedClient, setSelectedClient] = useState();
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedFinance, setSelectedFinance] = useState("");
  const [expanded, setExpanded] = useState("");
  const [oldClient, setOldClient] = useState("");
  const [clientBills, setClientBills] = useState([]);

  const handleSelectedClient = async Client => {
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
  };

  const handlePay = async (client, i) => {
    console.log(client);
    setOldClient(client.clientname);
    let newClient = client.clientname;
    if (oldClient !== newClient) {
      //alert("New Client Onboard")
      //remove all checked clientsly
      selectedOrders.forEach(el => (el.checked = ""));
      setSelectedOrders([]);
    }

    // console.log(e.target.checked)

    await handleSelectedClient(client.bills[0].order[0].participantInfo.client);
    //handleMedicationRow(order)/

    client.bills.forEach(bill => {
      // console.log(bill)
      bill.order.forEach(order => {
        order.checked = true;
        setSelectedFinance(order);
        const newProductEntryModule = {
          selectedFinance: order,
          show: "detail",
          state: true,
        };
        setState(prevstate => ({
          ...prevstate,
          financeModule: newProductEntryModule,
        }));

        setSelectedOrders(prevstate => prevstate.concat(order));
      });
    });
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

    // console.log(e.target.checked)
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

    // console.log(selectedOrders)
  };
  const handleMedicationRow = async (ProductEntry, e) => {
    //handle selected single order
    //console.log("b4",state)
    // alert("Header touched")
    //console.log("handlerow",ProductEntry)
    /* alert(ProductEntry.checked)*/
    /*  ProductEntry.checked=!ProductEntry.checked */
    /*  await setSelectedFinance(ProductEntry)
    
        const    newProductEntryModule={
            selectedFinance:ProductEntry,
            show :'detail'

        }
      await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule})) */
    //console.log(state)
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
    //console.log(state)
  };

  const handleSearch = val => {
    const field = "name";
    //console.log(val)
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
        billing_status: {
          $ne: "Fully Paid",
        }, //set to not equal to "fully paid" // need to set this finally
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.groupedOrder);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        // console.log(err)
        setMessage(
          "Error fetching ProductEntry, probable network issues " + err
        );
        setError(true);
      });
  };
  const getFacilities = async () => {
    // console.log("here b4 server")
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
        billing_status: {
          $ne: "Fully Paid",
        }, // need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });

    // console.log("updatedorder", findProductEntry.groupedOrder)
    await setFacilities(findProductEntry.groupedOrder);
    console.log(findProductEntry.groupedOrder);
    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };

  const onRowClicked = async (Client, e) => {
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
        };

        allOrders.push(orderData);
      });
      return allOrders;
    });

    //console.log(clientOrders);
    setClientBills(clientOrders.flat(1));
  };
  //1.consider using props for global data
  useEffect(() => {
    // console.log("started")
    getFacilities();
    BillServ.on("created", obj => getFacilities());
    BillServ.on("updated", obj => getFacilities());
    BillServ.on("patched", obj => getFacilities());
    BillServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  useEffect(() => {
    //changes with checked box
    // console.log(selectedOrders)

    return () => {};
  }, [selectedOrders]);

  useEffect(() => {
    if (state.financeModule.show === "create") {
      selectedOrders.forEach(el => (el.checked = ""));
      setSelectedOrders([]);
    }
    return () => {};
  }, [state.financeModule.show]);

  const handleCreate = () => {};

  ///**************************UPDATE SCHEMA ACCORDING TO THE DATA FOR FINANCE PAYMENT PAGE******************************
  const financePlaymentListSchema = [
    {
      name: "S/NO",
      width: "80px",
      headerStyle: (selector, id) => {
        return {textAlign: "center"}; // removed partial line here
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
      name: "Grand Total",
      // width: "130px",
      key: "clientAmount",
      description: "Enter Grand Total",
      selector: row => row.clientAmount.toFixed(2),
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
            {bills[0].catName} {bills[0].catAmount}
          </>
        );
        //row.clientAmount.toFixed(2);
        // console.log(bills);
        // bills.map((category, i) => {
        //   return category.catAmount.toFixed(2);
        // });
      },
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Action",
      key: "bills",
      description: "Enter Grand Total",
      selector: row => (
        <button
          className="button is-info is-small"
          style={{
            backgroundColor: "#3298dc",
            color: "#fff",
            fontSize: "0.75rem",
            borderRadius: "2px",
            padding: "0.4rem 1rem",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            handlePay(row);
          }}
        >
          PAY
        </button>
      ),
      sortable: true,
      required: true,
      inputType: "BUTTON",
    },
  ];

  const selectedClientSchema = [
    {
      name: "S/NO",
      width: "70px",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => (
        <div style={{display: "flex", alignItems: "center"}}>
          <input
            type="checkbox"
            //name={order._id}
            onChange={e => handleChoseClient(selectedClient, e, row.order)}
            checked={row.order.checked}
          />
          {row.sn}
        </div>
      ),
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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          flex: "1",
        }}
      >
        <div>
          <TableMenu>
            <div style={{display: "flex", alignItems: "center"}}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                Unpaid Invoices/Bills
              </h2>
            </div>

            {/* {handleCreateNew && (
              <Button
                style={{fontSize: "14px", fontWeight: "600"}}
                label="Add new "
                onClick={handleCreateNew}
              />
            )} */}
          </TableMenu>

          {/* <div className="level-right">
                       <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div> 
                    </div>*/}
        </div>
        <div>
          <div
            className="columns"
            style={{
              display: "flex",
              width: "100%",
              //flex: "1",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                height: "calc(100% - 70px)",
                width:
                  state.financeModule.show === "detail" && !selectedClient
                    ? "47%"
                    : selectedClient && state.financeModule.show !== "detail"
                    ? "49.5%"
                    : selectedClient && state.financeModule.show === "detail"
                    ? "23%"
                    : "100%",
                transition: "width 0.5s ease-in",
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
              />
            </div>

            {selectedClient && (
              <>
                <div
                  style={{
                    height: "calc(100% - 70px)",
                    width:
                      state.financeModule.show === "detail" ? "24%" : "49.5%",
                    transition: "width 0.5s ease-in",
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

            {state.financeModule.show === "detail" && (
              <div
                style={{
                  height: "calc(100% - 70px)",
                  width: "51.5%",
                  transition: "width 0.5s ease-in",
                }}
              >
                <PaymentCreate />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
