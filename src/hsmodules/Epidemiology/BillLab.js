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
import BillPrescriptionCreate from "./BillLabCreate";
import PatientProfile from "../Client/PatientProfile";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

// Demo styles, see 'Styles' section below for some notes on use.

import ClientBilledLab from "./ClientLab";

export default function BillLab() {
  //const {state}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const OrderServ = client.service("order");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedDispense, setSelectedDispense] = useState(); //
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

  /*  useEffect(() => {
        const updatedOne= state.currentClients.filter(el=>(JSON.stringify(el.client_id)===JSON.stringify(state.DispenseModule.selectedDispense.client_id)))
        console.log("udatedone", updatedOne)
        console.log("state", state.currentClients)
        handleRow(updatedOne)
         return () => {
             
         }
     }, []) */

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-5 ">
          <BillLabList />
        </div>

        <div className="column is-4 ">
          {state.medicationModule.show === "detail" && (
            <BillPrescriptionCreate />
          )}
        </div>
        <div className="column is-3 ">
          {state.medicationModule.show === "detail" && <PatientProfile />}
        </div>
      </div>
    </section>
  );
}

export function BillLabList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const OrderServ = client.service("order");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedDispense, setSelectedDispense] = useState(); //
  // eslint-disable-next-line
<<<<<<< HEAD
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedMedication, setSelectedMedication] = useState("");

  const handleSelectedClient = async Client => {
=======
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [selectedMedication, setSelectedMedication] = useState("");

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

<<<<<<< HEAD
  const handleMedicationRow = async ProductEntry => {
=======
  const handleMedicationRow = async (ProductEntry) => {
>>>>>>> refs/remotes/origin/frontend
    //handle selected single order
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)
    await handleSelectedClient(ProductEntry.client);

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
  const handleSearch = async val => {
=======
  const handleSearch = async (val) => {
>>>>>>> refs/remotes/origin/frontend
    const field = "name";
    console.log(val);
    OrderServ.find({
      query: {
        $or: [
          {
            order: {
              $regex: val,
              $options: "i",
            },
          },
          {
            order_status: {
              $regex: val,
              $options: "i",
            },
          },
          {
            clientname: {
              $regex: val,
              $options: "i",
            },
          },
        ],
        order_category: "Lab Order",
        fulfilled: false,
        destination: user.currentEmployee.facilityDetail._id,
        order_status: "Pending",
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 50,
        $sort: {
          createdAt: -1,
        },
      },
    })
<<<<<<< HEAD
      .then(async res => {
=======
      .then(async (res) => {
>>>>>>> refs/remotes/origin/frontend
        console.log(res);
        setFacilities(res.groupedOrder);
        // await setState((prevstate)=>({...prevstate, currentClients:res.groupedOrder}))
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
    console.log("here b4 server");
    const findProductEntry = await OrderServ.find({
      query: {
        order_category: "Lab Order",
        fulfilled: "False",
        destination: user.currentEmployee.facilityDetail._id,
        order_status: "Pending", // need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 50,
        $sort: {
          createdAt: -1,
        },
      },
    });

    // console.log("updatedorder", findProductEntry.groupedOrder)
    await setFacilities(findProductEntry.groupedOrder);
<<<<<<< HEAD
    await setState(prevstate => ({
=======
    await setState((prevstate) => ({
>>>>>>> refs/remotes/origin/frontend
      ...prevstate,
      currentClients: findProductEntry.groupedOrder,
    }));
  };

  //1.consider using props for global data
  useEffect(() => {
    // console.log("started")
    getFacilities();
<<<<<<< HEAD
    OrderServ.on("created", obj => getFacilities());
    OrderServ.on("updated", obj => getFacilities());
    OrderServ.on("patched", obj => getFacilities());
    OrderServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  const handleRow = async ProductEntry => {
=======
    OrderServ.on("created", (obj) => getFacilities());
    OrderServ.on("updated", (obj) => getFacilities());
    OrderServ.on("patched", (obj) => getFacilities());
    OrderServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);

  const handleRow = async (ProductEntry) => {
>>>>>>> refs/remotes/origin/frontend
    await setSelectedDispense(ProductEntry);

    const newProductEntryModule = {
      selectedDispense: ProductEntry,
      show: "detail",
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
                  placeholder="Search Tests"
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
            Pending Tests{" "}
          </span>
        </div>
        {/* <div className="level-right">
                       <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div> 
                    </div>*/}
      </div>
      <div className=" pullup">
        <div className=" is-fullwidth vscrollable pr-1">
          <div>
            {facilities.map((Clinic, i) => (
              <div key={Clinic.client_id}>
                <div>
                  <div>
                    <strong>
                      {" "}
                      {i + 1} {Clinic.clientname} with {Clinic.orders.length}{" "}
                      Pending Test(s){" "}
                    </strong>
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
                      </tr>
                    </thead>
                    <tbody>
                      {Clinic.orders.map((order, i) => (
                        <tr
                          key={order._id}
                          onClick={() => handleMedicationRow(order)}
                          className={
                            order._id === (selectedMedication?._id || null)
                              ? "is-selected"
                              : ""
                          }
                        >
                          <th>{i + 1}</th>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/*   */}
                  <ClientBilledLab selectedClient={Clinic.client_id} />
                  {/*  } */}
                </div>
              </div>
            ))}
            {/* <!-- Add Ref to Load More div --> */}
            {/*  <div className="loading" ref={loader}>
                                    <h2>Load More</h2>
                        </div> */}
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
  const OrderServ = client.service("order");
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
    /* OrderServ.on('created', (obj)=>getFacilities())
        OrderServ.on('updated', (obj)=>getFacilities())
       
        OrderServ.on('removed', (obj)=>getFacilities()) */
<<<<<<< HEAD
    OrderServ.on("patched", obj => {
=======
    OrderServ.on("patched", (obj) => {
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
