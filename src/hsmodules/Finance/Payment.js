/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { format, formatDistanceToNowStrict } from "date-fns";
import PaymentCreate from "./PaymentCreate";
import PatientProfile from "../Client/PatientProfile";
import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";

import "react-datepicker/dist/react-datepicker.css";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

// Demo styles, see 'Styles' section below for some notes on use.

//import BillPrescriptionCreate from './BillPrescriptionCreate';

export default function Payment() {
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
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-8 ">
          <BillingList />
        </div>

        <div className="column is-4">
          {state.financeModule.show === "detail" && <PaymentCreate />}
        </div>
        {/*  <div className="column is-3 ">
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}
      </div>
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
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [selectedFinance, setSelectedFinance] = useState("");
  const [expanded, setExpanded] = useState("");
  const [oldClient, setOldClient] = useState("");

  const handleSelectedClient = async (Client) => {
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
  };

  const handlePay = async (client, i) => {
    // console.log(client)
    setOldClient(client.clientname);
    let newClient = client.clientname;
    if (oldClient !== newClient) {
      //alert("New Client Onboard")
      //remove all checked clientsly
      selectedOrders.forEach((el) => (el.checked = ""));
      setSelectedOrders([]);
    }

    // console.log(e.target.checked)

    await handleSelectedClient(client.bills[0].order[0].participantInfo.client);
    //handleMedicationRow(order)/

    client.bills.forEach((bill) => {
      // console.log(bill)
      bill.order.forEach((order) => {
        order.checked = true;
        setSelectedFinance(order);
        const newProductEntryModule = {
          selectedFinance: order,
          show: "detail",
          state: true,
        };
        setState((prevstate) => ({
          ...prevstate,
          financeModule: newProductEntryModule,
        }));

        setSelectedOrders((prevstate) => prevstate.concat(order));
      });
    });
  };

  const handleChoseClient = async (client, e, order) => {
    setOldClient(client.clientname);
    let newClient = client.clientname;
    if (oldClient !== newClient) {
      //alert("New Client Onboard")
      //remove all checked clientsly
      selectedOrders.forEach((el) => (el.checked = ""));
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
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));

    //set of checked items
    if (e.target.checked) {
      await setSelectedOrders((prevstate) => prevstate.concat(order));
    } else {
      setSelectedOrders((prevstate) =>
        prevstate.filter((el) => el._id !== order._id)
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
    await setState((prevstate) => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  const handleSearch = (val) => {
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
      .then((res) => {
        console.log(res);
        setFacilities(res.groupedOrder);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
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
    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };
  const onRowClicked = async (Client, e) => {
    // alert(expanded)
    //console.log(Client)
    await setSelectedClient(Client);
  };
  //1.consider using props for global data
  useEffect(() => {
    // console.log("started")
    getFacilities();
    BillServ.on("created", (obj) => getFacilities());
    BillServ.on("updated", (obj) => getFacilities());
    BillServ.on("patched", (obj) => getFacilities());
    BillServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);

  useEffect(() => {
    //changes with checked box
    // console.log(selectedOrders)

    return () => {};
  }, [selectedOrders]);

  useEffect(() => {
    if (state.financeModule.show === "create") {
      selectedOrders.forEach((el) => (el.checked = ""));
      setSelectedOrders([]);
    }
    return () => {};
  }, [state.financeModule.show]);

  const handleCreate = () => {};

  const PaymentSchema = [
    {
      name: "S/No",
      key: "_id",
      selector: (row) => row._id && row._id.substring(0, 7),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Name",
      key: "name",
      description: "Enter name of band",
      selector: (row) => row.orderInfo.orderObj.clientname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Date",
      key: "date",
      description: "Enter date",
      selector: (row) => row.createdAt && row.createdAt.substring(0, 10),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Description of Band",
      key: "description",
      description: "Enter description of band",
      selector: (row) => row.orderInfo.orderObj.order,
      sortable: true,
      required: false,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "billing_status",
      description: "Enter status",
      selector: (row) => row.billing_status,
      sortable: true,
      required: false,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter amount",
      selector: (row) => row.serviceInfo.amount,
      sortable: true,
      required: false,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <PageWrapper style={{ flexDirection: "column", padding: "0.6rem 1rem" }}>
        <TableMenu>
          <div style={{ display: "flex", alignItems: "center" }}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>Payment</h2>
          </div>

          {handleCreate && (
            <Button
              style={{ fontSize: "14px", fontWeight: "600" }}
              label="Add new "
              onClick={handleCreate}
            />
          )}
        </TableMenu>

        <div style={{ width: "100%", height: "600px", overflow: "auto" }}>
          <CustomTable
            title={""}
            columns={PaymentSchema}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={onRowClicked}
            progressPending={loading}
          />
        </div>
      </PageWrapper>
    </>
  );
}

// {/*
//       <div className="level">
//         <div className="level-left">
//           <div className="level-item">
//             <div className="field">
//               <p className="control has-icons-left  ">
//                 <DebounceInput
//                   className="input is-small "
//                   type="text"
//                   placeholder="Search Bills"
//                   minLength={3}
//                   debounceTimeout={400}
//                   onChange={(e) => handleSearch(e.target.value)}
//                 />
//                 <span className="icon is-small is-left">
//                   <i className="fas fa-search"></i>
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="level-item">
//           {" "}
//           <span className="is-size-6 has-text-weight-medium">
//             Unpaid Invoices/Bills{" "}
//           </span>
//         </div>
//         {/* <div className="level-right">
//                        <div className="level-item">
//                             <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
//                         </div>
//                     </div>*/}
//       </div>
//       <div className=" pullup shift-right ">
//         <div className="columns">
//           <div className="column shift-right">
//             <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
//               <thead>
//                 <tr>
//                   <th>
//                     <abbr title="Serial No">S/No</abbr>
//                   </th>
//                   <th>
//                     <abbr title="Name">Name</abbr>
//                   </th>
//                   <th>
//                     <abbr title="Amount">Grand Total</abbr>
//                   </th>
//                   <th>
//                     <abbr title="Category Amount">Categories Total</abbr>
//                   </th>
//                   <th>
//                     <abbr title="Action">Action</abbr>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {facilities.map(
//                   (
//                     Clinic,
//                     i //key={order._id}  /*  onClick={()=>handleMedicationRow(order)} */  }
//                   ) => (
//                     <tr
//                       className={
//                         Clinic.client_id === (selectedClient?.client_id || null)
//                           ? "is-selected"
//                           : ""
//                       }
//                       key={Clinic.client_id}
//                       onClick={() => {
//                         handleRow(Clinic, i);
//                       }}
//                     >
//                       <td>
//                         <strong> {i + 1}</strong>
//                       </td>
//                       <td>{Clinic.clientname}</td>
//                       <td>{Clinic.clientAmount.toFixed(2)}</td>
//                       <td>
//                         {Clinic.bills.map((category, i) => (
//                           <p>
//                             {category.catName} {category.catAmount.toFixed(2)}
//                           </p>
//                         ))}
//                       </td>
//                       <td>
//                         <button
//                           className="button is-info is-small"
//                           onClick={() => {
//                             handlePay(Clinic, i);
//                           }}
//                         >
//                           PAY
//                         </button>
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {selectedClient && (
//             <div className="column ">
//               <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-0 ">
//                 <thead>
//                   <tr>
//                     <th>
//                       <abbr title="Serial No">S/No</abbr>
//                     </th>
//                     <th>
//                       <abbr title="Date">Date</abbr>
//                     </th>
//                     <th>
//                       <abbr title="Category">Category</abbr>
//                     </th>
//                     <th>
//                       <abbr title="Description">Description</abbr>
//                     </th>
//                     {/*  <th>Fulfilled</th> */}
//                     <th>
//                       <abbr title="Status">Status</abbr>
//                     </th>
//                     <th>
//                       <abbr title="Amount">Amount</abbr>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedClient?.bills.map((category, i) => (
//                     <>
//                       {/*  <div> {category.catName} with {category.order.length} Unpaid bills.</div> */}

//                       {category.order.map((order, i) => (
//                         <tr
//                           key={i}
//                           /*  onClick={()=>handleMedicationRow(order)} */ className={
//                             order._id === (selectedFinance?._id || null)
//                               ? "is-selected"
//                               : ""
//                           }
//                         >
//                           <th>
//                             <input
//                               type="checkbox"
//                               name={order._id}
//                               onChange={(e) =>
//                                 handleChoseClient(selectedClient, e, order)
//                               }
//                               checked={order.checked}
//                             />{" "}
//                             {i + 1}
//                           </th>
//                           <td>
//                             <span>
//                               {format(new Date(order.createdAt), "dd-MM-yy")}
//                             </span>
//                           </td>{" "}
//                           {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}
//                           <td>{category.catName}</td>
//                           <th>{order.serviceInfo.name}</th>
//                           <td>{order.billing_status}</td>
//                           <td>
//                             {order.billing_status === "Unpaid"
//                               ? order.serviceInfo.amount
//                               : order.paymentInfo.balance}
//                           </td>
//                         </tr>
//                       ))}
//                     </>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div> */}
