/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
import HmoClaimCreate from "./HmoClaimCreate";
import PatientProfile from "../Client/PatientProfile";
import PaymentsIcon from "@mui/icons-material/Payments";

import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import CustomTable from "../../components/customtable";
import ModalBox from "../../components/modal";
import "react-datepicker/dist/react-datepicker.css";
import {Box, Typography} from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// eslint-disable-next-line
//const searchfacility={};

// Demo styles, see 'Styles' section below for some notes on use.

//import BillPrescriptionCreate from './BillPrescriptionCreate';

export default function HMOauth() {
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
    <section>
      <BillingList />

      {/* <HmoClaimCreate /> */}
    </section>
  );
}

export function BillingList({openModal}) {
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
  const [totalAmount, setTotalAmount] = useState(0);

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
    setOldClient(client.clientname);
    let newClient = client.clientname;
    if (oldClient !== newClient) {
      selectedOrders.forEach(el => (el.checked = ""));
      setSelectedOrders([]);
      setState(prev => ({
        ...prev,
        financeModule: {
          ...prev.financeModule,
          selectedBills: [],
        },
      }));
    }

    // //console.log(e.target.checked)

    await handleSelectedClient(client.bills[0].order[0].participantInfo.client);
    //handleMedicationRow(order)/

    await client.bills.forEach(bill => {
      // //console.log(bill)
      bill.order.forEach(order => {
        let medication = order;
        medication.show = "none";
        medication.checked = true;
        medication.proposedpayment = {
          balance: 0,
          paidup:
            medication.paymentInfo.paidup + medication.paymentInfo.balance,
          amount: medication.paymentInfo.balance,
        };
        setSelectedFinance(order);
        const newProductEntryModule = {
          selectedFinance: order,
          show: "detail",
          state: true,
          selectedBills: [],
        };
        setState(prevstate => ({
          ...prevstate,
          financeModule: {
            ...newProductEntryModule,
            selectedBills: prevstate.financeModule.selectedBills.concat(order),
          },
        }));

        setSelectedOrders(prevstate => prevstate.concat(order));
      });
    });

    openModal();
  };

  const handleChoseClient = async (client, e, order) => {
    setOldClient(client.clientname);

    order.checked = e.target.checked;
    await handleSelectedClient(order.participantInfo.client);
    //handleMedicationRow(order)
    await setSelectedFinance(order);

    const newProductEntryModule = {
      ...state.financeModule,
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
      let medication = order;
      medication.show = "none";
      medication.proposedpayment = {
        balance: 0,
        paidup: medication.paymentInfo.paidup + medication.paymentInfo.balance,
        amount: medication.paymentInfo.balance,
      };

      await setState(prev => ({
        ...prev,
        financeModule: {
          ...prev.financeModule,
          selectedBills: prev.financeModule?.selectedBills?.concat(medication),
        },
      }));
      await setSelectedOrders(prevstate => prevstate.concat(medication));
    } else {
      await setState(prev => ({
        ...prev,
        financeModule: {
          ...prev.financeModule,
          selectedBills: prev.financeModule.selectedBills.filter(
            el => el._id !== order._id
          ),
        },
      }));

      setSelectedOrders(prevstate =>
        prevstate.filter(el => el._id !== order._id)
      );
    }

    // //console.log(selectedOrders)
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
        /*  $or:[
                {
           
                } ,
                {
            'orderInfo.orderObj.clientname': {
                        $regex:val,
                        $options:'i'
                    
                    }
                }
                ], */

        //order_category:"Prescription",
        $or: [
          {
            "participantInfo.paymentmode.type": "HMO",
          },
          {
            "participantInfo.paymentmode.type": "Company Cover",
          },
        ],
        "participantInfo.billingFacility":
          user.currentEmployee.facilityDetail._id,
        billing_status: {
          $ne: "Fully Paid",
        }, //set to not equal to "fully paid" // need to set this finally
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 100,
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
            "participantInfo.paymentmode.type": "HMO Cover",
          },
          {
            "participantInfo.paymentmode.type": "Company Cover",
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

    console.log("updatedorder", findProductEntry.groupedOrder);
    await setFacilities(findProductEntry.groupedOrder);
    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };

  const onRowClicked = async (client, e) => {
    await setSelectedClient(client);

    setOldClient(client.clientname);
    let newClient = client.clientname;

    if (oldClient !== newClient) {
      selectedOrders.forEach(el => (el.checked = ""));
      setSelectedOrders([]);
      setState(prev => ({
        ...prev,
        financeModule: {
          ...prev.financeModule,
          selectedBills: [],
        },
      }));
    }

    const clientOrders = client.bills.map(data => {
      const allOrders = [];

      data.order.map(order => {
        const orderData = {
          date: order.createdAt,
          status: order.billing_status,
          description: order.serviceInfo.name,
          category: data.catName,
          amount:
            order.billing_status === "Unpaid"
              ? order.serviceInfo.amount
              : order.paymentInfo.balance,
          order: order,
        };

        allOrders.push(orderData);
      });
      return allOrders;
    });

    ////console.log(clientOrders);
    setClientBills(clientOrders.flat(1));
  };
  //1.consider using props for global data
  useEffect(() => {
    // //console.log("started")
    getFacilities();
    BillServ.on("created", obj => getFacilities());
    BillServ.on("updated", obj => getFacilities());
    BillServ.on("patched", obj => getFacilities());
    BillServ.on("removed", obj => getFacilities());
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

  useEffect(() => {
    const productItem = selectedOrders;
    setTotalAmount(0);
    productItem.forEach(el => {
      if (el.show === "none") {
        if (el.billing_status === "Unpaid") {
          setTotalAmount(
            prevtotal => Number(prevtotal) + Number(el.serviceInfo.amount)
          );
        } else {
          setTotalAmount(
            prevtotal => Number(prevtotal) + Number(el.paymentInfo.balance)
          );
        }
      }
      if (el.show === "flex") {
        setTotalAmount(prevtotal => Number(prevtotal) + Number(el.partPay));
      }

      //
    });
  }, [selectedOrders]);

  const financePlaymentListSchema = [
    {
      name: "S/NO",
      width: "50px",
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
      width: "200px",
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
      width: "120px",
    },
    {
      name: "Categories Total",
      key: "bills",
      description: "Enter Category Total",
      selector: row => {
        const bills = row.bills;
        return (
          <>
            {bills.map((category, i) => (
              <Typography sx={{fontSize: "0.75rem"}}>
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
      name: "Action",
      key: "bills",
      description: "Enter Grand Total",
      selector: row => (
        <GlobalCustomButton
          onClick={() => {
            handlePay(row);
          }}
        >
          <CheckCircleOutlineIcon sx={{marginRight: "3px"}} fontSize="small" />
          Approve
        </GlobalCustomButton>
      ),
      sortable: true,
      required: true,
      inputType: "BUTTON",
      width: "120px",
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
            style={{marginRight: "3px"}}
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
        <TableMenu>
          <div style={{display: "flex", alignItems: "center"}}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{marginLeft: "10px", fontSize: "0.9rem"}}>
              Unpaid Invoices/Bills
            </h2>
          </div>

          {selectedOrders.length > 0 && (
            <h2 style={{marginLeft: "10px", fontSize: "0.9rem"}}>
              Amount Due : <span>&#8358;</span>
              {totalAmount}
            </h2>
          )}

          {selectedOrders.length > 0 && (
            <GlobalCustomButton onClick={openModal}>
              <CheckCircleOutlineIcon
                sx={{marginRight: "3px"}}
                fontSize="small"
              />
              Approve Bill
            </GlobalCustomButton>
          )}
        </TableMenu>

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
              transition: "width 0.5s ease-in",
              width: selectedClient ? "49.5%" : "100%",
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
                  width: "49.5%",
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
        </div>
      </div>
    </>
  );
}

export function DispenseDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  const [selectedMedication, setSelectedMedication] = useState("");
  const [currentOrder, setCurrentOrder] = useState("");
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ProductEntryServ=client.service('/ProductEntry')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);
  const BillServ = client.service("order");
  /* const [ProductEntry, setProductEntry] = useState("")
    const [facilities, setFacilities] = useState("") */

  let ProductEntry = state.DispenseModule.selectedDispense;
  //const facilities=ProductEntry.orders

  const handleRow = async ProductEntry => {
    ////console.log("b4",state)

    ////console.log("handlerow",ProductEntry)

    await setSelectedMedication(ProductEntry);

    const newProductEntryModule = {
      selectedMedication: ProductEntry,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      medicationModule: newProductEntryModule,
    }));
    ////console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

  const handleEdit = async ProductEntry => {
    const newProductEntryModule = {
      selectedDispense: ProductEntry,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    ////console.log(state)
  };

  useEffect(() => {
    const client1 = state.currentClients.find(el => {
      return (
        JSON.stringify(el.client_id) ===
        JSON.stringify(state.DispenseModule.selectedDispense)
      );
    });

    setCurrentOrder(client1);
    // //console.log(client1)
    return () => {};
  }, []);

  /*  
     const setprod=async()=>{
        await setProductEntry(state.DispenseModule.selectedDispense)
    } */

  useEffect(() => {
    /* BillServ.on('created', (obj)=>getFacilities())
        BillServ.on('updated', (obj)=>getFacilities())
       
        BillServ.on('removed', (obj)=>getFacilities()) */
    BillServ.on("patched", obj => {
      //update state.DispenseModule.selectedDispense
      // //console.log(obj.clientId)
      // //console.log("currentClients",state.currentClients)
      const current1 = state.currentClients.find(
        el => JSON.stringify(el.client_id) === JSON.stringify(obj.clientId)
      );
      setCurrentOrder(current1);
      // //console.log("currentone",current1)
    });

    return () => {};
  }, []);

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Dispense Details</p>
        </div>
        <div className="card-content vscrollable">
          {/* {JSON.stringify(ProductEntry.orders,2,10)} */}
          <div className="table-container pullup ">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>
                  {/* <th><abbr title="Client Name">Client Name</abbr></th> */}
                  {/* <th><abbr title="Number of Orders"># of Medication</abbr></th> */}
                  <th>
                    <abbr title="Date">Date</abbr>
                  </th>
                  <th>
                    <abbr title="Order">Medication</abbr>
                  </th>
                  <th>Fulfilled</th>
                  <th>
                    <abbr title="Status">Status</abbr>
                  </th>
                  <th>
                    <abbr title="Requesting Physician">
                      Requesting Physician
                    </abbr>
                  </th>

                  {/* <th><abbr title="Actions">Actions</abbr></th> */}
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {state.DispenseModule.selectedDispense.orders.map(
                  (order, i) => (
                    <tr
                      key={order._id}
                      onClick={() => handleRow(order)}
                      className={
                        order._id === (selectedMedication?._id || null)
                          ? "is-selected"
                          : ""
                      }
                    >
                      <th>{i + 1}</th>
                      {/* <td>{ProductEntry.clientname}</td> 
                                                <td>{ProductEntry.orders.length}</td> */}
                      <td>
                        <span>
                          {format(new Date(order.createdAt), "dd-MM-yy")}
                        </span>
                      </td>{" "}
                      {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}
                      <th>{order.order}</th>
                      <td>{order.fulfilled === "True" ? "Yes" : "No"}</td>
                      <td>{order.order_status}</td>
                      <td>{order.requestingdoctor_Name}</td>
                      {/*  <td><span className="showAction"  >...</span></td> */}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
