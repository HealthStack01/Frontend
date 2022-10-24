/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
//import PaymentCreate from './PaymentCreate'
import PatientProfile from "../Client/PatientProfile";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

// Demo styles, see 'Styles' section below for some notes on use.

import {ProductExitCreate} from "./DispenseExit";
//import BillPrescriptionCreate from './BillPrescriptionCreate';

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import {InventoryStoreSchema} from "./schema";

export default function Dispense() {
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
      <div className="columns ">
        <div className="column is-6 ">
          <DispenseList />
        </div>

        <div className="column is-6 ">
          {state.financeModule.show === "detail" && <ProductExitCreate />}
        </div>
        {/*  <div className="column is-3 ">
                
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}
      </div>
    </section>
  );
}

export function DispenseList() {
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
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedFinance, setSelectedFinance] = useState("");
  const [expanded, setExpanded] = useState("");
  const [oldClient, setOldClient] = useState("");

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
    alert("Header touched");

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
        order: {
          $regex: val,
          $options: "i",
        },
        order_status: {
          $regex: val,
          $options: "i",
        },
        order_category: "Prescription",
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 10,
        $sort: {
          createdAt: -1,
        }``,
      },
    })
      .then(res => {
        // console.log(res)
        setFacilities(res.data);
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
        /* $or:[
                    {
                       'participantInfo.paymentmode.type':"Cash"
                    },
                    {
                       'participantInfo.paymentmode.type':"Family Cover"
                    }
                ], */
        "participantInfo.billingFacility":
          user.currentEmployee.facilityDetail._id,
        "orderInfo.orderObj.order_category": "Prescription",
        billing_status: {
          $ne: "Unpaid",
        },
        "orderInfo.orderObj.fulfilled": {
          $ne: "True",
        },
        //billing_status:"Fully Paid",
        // fulfilled:false,
        $limit: 100,
        $sort: {
          updatedAt: 1,
        },
      },
    });

    console.log("updatedorder", findProductEntry.groupedOrder);
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
    BillServ.on("created", obj => getFacilities());
    BillServ.on("updated", obj => getFacilities());
    BillServ.on("patched", obj => getFacilities());
    BillServ.on("removed", obj => getFacilities());
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));

    const newProductEntryModule = {
      selectedFinance: {},
      show: "create",
      state: "",
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  useEffect(() => {
    //changes with checked box
    console.log(selectedOrders);

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

  const onRowClicked = () => {};

  const DispensorySummary = [
    {name: "S/N", selector: row => row.sn},
    {name: "Client Name", selector: row => row.clientname},
    {
      name: "Bill Items",
      selector: row => row.bills.map(obj => obj.order).flat().length,
    },
  ];

  return (
    <>
      <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
        <TableMenu>
          <div style={{display: "flex", alignItems: "center"}}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
              Inventory Store
            </h2>
          </div>

          {handleCreate && (
            <Button
              style={{fontSize: "14px", fontWeight: "600"}}
              label="Add new "
              onClick={handleCreate}
            />
          )}
        </TableMenu>

        <div style={{width: "100%", height: "600px", overflow: "auto"}}>
          <CustomTable
            title={""}
            columns={DispensorySummary}
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
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    await setSelectedMedication(ProductEntry);

    const newProductEntryModule = {
      selectedMedication: ProductEntry,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      medicationModule: newProductEntryModule,
    }));
    //console.log(state)
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
    //console.log(state)
  };

  useEffect(() => {
    const client1 = state.currentClients.find(el => {
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
    BillServ.on("patched", obj => {
      //update state.DispenseModule.selectedDispense
      // console.log(obj.clientId)
      // console.log("currentClients",state.currentClients)
      const current1 = state.currentClients.find(
        el => JSON.stringify(el.client_id) === JSON.stringify(obj.clientId)
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
