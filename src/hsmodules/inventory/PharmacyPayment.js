/* eslint-disable */
<<<<<<< HEAD
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
=======
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { format, formatDistanceToNowStrict } from "date-fns";
>>>>>>> refs/remotes/origin/frontend
import PaymentCreate from "../Finance/PaymentCreate";
import PatientProfile from "../Client/PatientProfile";
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
<<<<<<< HEAD
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
=======
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
>>>>>>> refs/remotes/origin/frontend

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-6 ">
          <PharmacyBillingList />
        </div>

        <div className="column is-6 ">
          {state.financeModule.show === "detail" && <PaymentCreate />}
        </div>
        {/*  <div className="column is-3 ">
                
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}
      </div>
    </section>
  );
}

export function PharmacyBillingList() {
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
<<<<<<< HEAD
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
=======
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
>>>>>>> refs/remotes/origin/frontend
  const [selectedFinance, setSelectedFinance] = useState("");
  const [expanded, setExpanded] = useState("");
  const [oldClient, setOldClient] = useState("");

<<<<<<< HEAD
  const handleSelectedClient = async Client => {
=======
  const handleSelectedClient = async (Client) => {
>>>>>>> refs/remotes/origin/frontend
    // await setSelectedClient(Client)
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
<<<<<<< HEAD
    await setState(prevstate => ({
=======
    await setState((prevstate) => ({
>>>>>>> refs/remotes/origin/frontend
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
<<<<<<< HEAD
      selectedOrders.forEach(el => (el.checked = ""));
=======
      selectedOrders.forEach((el) => (el.checked = ""));
>>>>>>> refs/remotes/origin/frontend
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
<<<<<<< HEAD
    await setState(prevstate => ({
=======
    await setState((prevstate) => ({
>>>>>>> refs/remotes/origin/frontend
      ...prevstate,
      financeModule: newProductEntryModule,
    }));

    //set of checked items
    if (e.target.checked) {
<<<<<<< HEAD
      await setSelectedOrders(prevstate => prevstate.concat(order));
    } else {
      setSelectedOrders(prevstate =>
        prevstate.filter(el => el._id !== order._id)
=======
      await setSelectedOrders((prevstate) => prevstate.concat(order));
    } else {
      setSelectedOrders((prevstate) =>
        prevstate.filter((el) => el._id !== order._id)
>>>>>>> refs/remotes/origin/frontend
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
<<<<<<< HEAD
    await setState(prevstate => ({
=======
    await setState((prevstate) => ({
>>>>>>> refs/remotes/origin/frontend
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    //console.log(state)
  };

<<<<<<< HEAD
  const handleSearch = val => {
=======
  const handleSearch = (val) => {
>>>>>>> refs/remotes/origin/frontend
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
            "participantInfo.paymentmode.type": "Cash",
          },
          {
            "participantInfo.paymentmode.type": "Family Cover",
          },
        ],
        "orderInfo.orderObj.order_category": "Prescription",
        "participantInfo.billingFacility":
          user.currentEmployee.facilityDetail._id,
        billing_status: "Unpaid", // need to set this finally
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      },
    })
<<<<<<< HEAD
      .then(res => {
=======
      .then((res) => {
>>>>>>> refs/remotes/origin/frontend
        // console.log(res)
        setFacilities(res.groupedOrder);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
<<<<<<< HEAD
      .catch(err => {
=======
      .catch((err) => {
>>>>>>> refs/remotes/origin/frontend
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
        "orderInfo.orderObj.order_category": "Prescription",
        billing_status: "Unpaid", // need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });

    //console.log("updatedorder", findProductEntry.groupedOrder)
    await setFacilities(findProductEntry.groupedOrder);
    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };
  const handleRow = async (Client, e) => {
    // alert(expanded)
  };
  //1.consider using props for global data
  useEffect(() => {
    // console.log("started")
    getFacilities();
<<<<<<< HEAD
    BillServ.on("created", obj => getFacilities());
    BillServ.on("updated", obj => getFacilities());
    BillServ.on("patched", obj => getFacilities());
    BillServ.on("removed", obj => getFacilities());
=======
    BillServ.on("created", (obj) => getFacilities());
    BillServ.on("updated", (obj) => getFacilities());
    BillServ.on("patched", (obj) => getFacilities());
    BillServ.on("removed", (obj) => getFacilities());
>>>>>>> refs/remotes/origin/frontend
    return () => {};
  }, []);

  useEffect(() => {
    //changes with checked box
    // console.log(selectedOrders)

    return () => {};
  }, [selectedOrders]);

  useEffect(() => {
    if (state.financeModule.show === "create") {
<<<<<<< HEAD
      selectedOrders.forEach(el => (el.checked = ""));
=======
      selectedOrders.forEach((el) => (el.checked = ""));
>>>>>>> refs/remotes/origin/frontend
      setSelectedOrders([]);
    }
    return () => {};
  }, [state.financeModule.show]);

  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="field">
              <p className="control has-icons-left  ">
                <DebounceInput
                  className="input is-small "
                  type="text"
                  placeholder="Search Bills"
                  minLength={3}
                  debounceTimeout={400}
<<<<<<< HEAD
                  onChange={e => handleSearch(e.target.value)}
=======
                  onChange={(e) => handleSearch(e.target.value)}
>>>>>>> refs/remotes/origin/frontend
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="level-item">
          {" "}
          <span className="is-size-6 has-text-weight-medium">
            Unpaid Bills{" "}
          </span>
        </div>
        {/* <div className="level-right">
                       <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div> 
                    </div>*/}
      </div>
      <div className=" pullup ">
        <div className=" is-fullwidth vscrollable pr-1">
          <div>
            {facilities.map((Clinic, i) => (
              <div key={Clinic.client_id}>
                <div>
                  <div>
                    {/* <input type = "checkbox" name={Clinic.client_id}  />   */}
                    <strong>
                      {" "}
                      {i + 1} {Clinic.clientname}{" "}
                      {/* with {Clinic.bills.length} Unpaid bills. */}{" "}
                      {/* Grand Total amount: N */}
                    </strong>
                  </div>
                </div>
                <div>
                  <div className=" is-fullwidth vscrollable pr-1">
                    <div>
                      {Clinic.bills.map((category, i) => (
                        <div key={Clinic.client_id}>
                          <div>
                            <div>
                              {/* <input type = "checkbox" name={Clinic.client_id} onChange={(e)=>handleMedicationRow(Clinic,e)} /> */}
                              {category.catName} with {category.order.length}{" "}
                              Unpaid bills. {/* Total amount: N */}
                            </div>
                          </div>
                          <div>
                            <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                              <thead>
                                <tr>
                                  <th>
                                    <abbr title="Serial No">S/No</abbr>
                                  </th>
                                  <th>
                                    <abbr title="Date">Date</abbr>
                                  </th>
                                  <th>
                                    <abbr title="Description">Description</abbr>
                                  </th>
                                  {/*  <th>Fulfilled</th> */}
                                  <th>
                                    <abbr title="Status">Status</abbr>
                                  </th>
                                  <th>
                                    <abbr title="Amount">Amount</abbr>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {category.order.map((order, i) => (
                                  <tr
                                    key={order._id}
                                    /*  onClick={()=>handleMedicationRow(order)} */ className={
                                      order._id ===
                                      (selectedFinance?._id || null)
                                        ? "is-selected"
                                        : ""
                                    }
                                  >
                                    <th>
                                      <input
                                        type="checkbox"
                                        name={order._id}
<<<<<<< HEAD
                                        onChange={e =>
=======
                                        onChange={(e) =>
>>>>>>> refs/remotes/origin/frontend
                                          handleChoseClient(Clinic, e, order)
                                        }
                                        checked={order.checked}
                                      />{" "}
                                      {i + 1}
                                    </th>
                                    <td>
                                      <span>
                                        {format(
                                          new Date(order.createdAt),
                                          "dd-MM-yy"
                                        )}
                                      </span>
                                    </td>{" "}
                                    {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}
                                    <th>{order.serviceInfo.name}</th>
                                    {/*  <td>{order.fulfilled==="True"?"Yes":"No"}</td> */}
                                    <td>{order.billing_status}</td>
                                    <td>{order.serviceInfo.amount}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
<<<<<<< HEAD
  const {state, setState} = useContext(ObjectContext);
=======
  const { state, setState } = useContext(ObjectContext);
>>>>>>> refs/remotes/origin/frontend
  const BillServ = client.service("order");
  /* const [ProductEntry, setProductEntry] = useState("")
    const [facilities, setFacilities] = useState("") */

  let ProductEntry = state.DispenseModule.selectedDispense;
  //const facilities=ProductEntry.orders

<<<<<<< HEAD
  const handleRow = async ProductEntry => {
=======
  const handleRow = async (ProductEntry) => {
>>>>>>> refs/remotes/origin/frontend
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    await setSelectedMedication(ProductEntry);

    const newProductEntryModule = {
      selectedMedication: ProductEntry,
      show: "detail",
    };
<<<<<<< HEAD
    await setState(prevstate => ({
=======
    await setState((prevstate) => ({
>>>>>>> refs/remotes/origin/frontend
      ...prevstate,
      medicationModule: newProductEntryModule,
    }));
    //console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

<<<<<<< HEAD
  const handleEdit = async ProductEntry => {
=======
  const handleEdit = async (ProductEntry) => {
>>>>>>> refs/remotes/origin/frontend
    const newProductEntryModule = {
      selectedDispense: ProductEntry,
      show: "modify",
    };
<<<<<<< HEAD
    await setState(prevstate => ({
=======
    await setState((prevstate) => ({
>>>>>>> refs/remotes/origin/frontend
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  useEffect(() => {
<<<<<<< HEAD
    const client1 = state.currentClients.find(el => {
=======
    const client1 = state.currentClients.find((el) => {
>>>>>>> refs/remotes/origin/frontend
      return (
        JSON.stringify(el.client_id) ===
        JSON.stringify(state.DispenseModule.selectedDispense)
      );
    });

    setCurrentOrder(client1);
    // console.log(client1)
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
<<<<<<< HEAD
    BillServ.on("patched", obj => {
=======
    BillServ.on("patched", (obj) => {
>>>>>>> refs/remotes/origin/frontend
      //update state.DispenseModule.selectedDispense
      // console.log(obj.clientId)
      // console.log("currentClients",state.currentClients)
      const current1 = state.currentClients.find(
<<<<<<< HEAD
        el => JSON.stringify(el.client_id) === JSON.stringify(obj.clientId)
=======
        (el) => JSON.stringify(el.client_id) === JSON.stringify(obj.clientId)
>>>>>>> refs/remotes/origin/frontend
      );
      setCurrentOrder(current1);
      // console.log("currentone",current1)
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
