/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
import ReportCreate from "./ReportCreate";
import PatientProfile from "../Client/PatientProfile";
import Encounter from "../Documentation/Encounter";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

//import BillPrescriptionCreate from './BillPrescriptionCreate';

export default function TheatreReport() {
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
        <div className="column is-4 ">
          <TheatreOrderList />
        </div>

        <div className="column is-5 ">
          {state.financeModule.show === "detail" && <TheatreNoteCreate />}
        </div>

        <div className="column is-3 ">
          {state.ClientModule.show === "detail" && <PatientProfile />}
        </div>
      </div>
    </section>
  );
}

export function TheatreOrderList() {
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
  const handleMedicationRow = async order => {
    await setSelectedFinance(order);
    await handleSelectedClient(order.participantInfo.client);
    // grab report
    // if draft show create/modify
    //if final: show final
    // console.log(order)
    const newProductEntryModule = {
      selectedFinance: order,
      show: "detail",
      report_status: order.report_status,
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
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
        "orderInfo.orderObj.order_category": "Theatre Order",
        "participantInfo.billingFacility":
          user.currentEmployee.facilityDetail._id,
        billing_status: "Unpaid", // need to set this finally
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        // console.log(res)
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
        /*  $or:[
                    {
                       'participantInfo.paymentmode.type':"Cash"
                    },
                    {
                       'participantInfo.paymentmode.type':"Family Cover"
                    }
                ], */
        "participantInfo.billingFacility":
          user.currentEmployee.facilityDetail._id,
        "orderInfo.orderObj.order_category": "Theatre Order",
        // billing_status:"Unpaid",  // need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 1000,
        $sort: {
          createdAt: -1,
        },
      },
    });

    //    console.log("bills", findProductEntry.data)
    await setFacilities(findProductEntry.data);
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
    return () => {};
  }, []);

  useEffect(() => {
    return () => {};
  }, [selectedOrders]);

  useEffect(() => {
    if (state.financeModule.show === "create") {
      selectedOrders.forEach(el => (el.checked = ""));
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
                  onChange={e => handleSearch(e.target.value)}
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
            Theatre Investigations{" "}
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
                  <abbr title="Client">Client</abbr>
                </th>
                {/*  <th><abbr title="Client">Client</abbr></th> */}
                <th>
                  <abbr title="Description">Test</abbr>
                </th>
                <th>
                  <abbr title="Amount">Amount</abbr>
                </th>
                {/*  <th>Fulfilled</th> */}
                <th>
                  <abbr title="Status">Payment Status</abbr>
                </th>
                <th>
                  <abbr title="Status">Result Status</abbr>
                </th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((order, i) => (
                <tr
                  key={order._id}
                  onClick={() => handleMedicationRow(order)}
                  className={
                    order._id === (selectedFinance?._id || null)
                      ? "is-selected"
                      : ""
                  }
                >
                  <th>{i + 1}</th>
                  <td>
                    <span>{format(new Date(order.createdAt), "dd-MM-yy")}</span>
                  </td>{" "}
                  {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}
                  <th>{order.orderInfo.orderObj.clientname}</th>
                  {/* client name */}
                  <th>{order.serviceInfo.name}</th>
                  {/* test name */}{" "}
                  {/*  <td>{order.fulfilled==="True"?"Yes":"No"}</td> */}
                  <td>{order.serviceInfo.amount}</td>
                  <td>{order.billing_status}</td>
                  <td>{order.report_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function TheatreNoteCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("labresults");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [reportStatus, setReportStatus] = useState("Draft");
  const {state, setState} = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);

  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    // setState((prevstate)=>({...prevstate, labFormType:value}))
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Post-Op Documentation";
    document.documentname = `Post-Op Notes`; /* `${order.serviceInfo.name} Result` */
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Post-op Notes updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Post-op Notes " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      setValue("Finding", order.resultDetail.documentdetail.Finding, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue(
        "Recommendation",
        order.resultDetail.documentdetail.Recommendation,
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
      setReportStatus(order.report_status);
    }

    return () => {};
  }, [order]);
  const showDocumentation = async value => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    // handleSearch(val)
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">
            Post-Op Note for {order.orderInfo.orderObj.clientname} Surgery:{" "}
            {order.serviceInfo.name}
          </p>
          <button
            className="button is-success is-small btnheight mt-2"
            onClick={showDocumentation}
          >
            Documentation
          </button>
        </div>
        <div className="card-content vscrollable remPad1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="Procedure"
                      type="text"
                      placeholder="Procedure"
                      disabled={bill_report_status === "Final"}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register("x")}
                      name="Clinical Indication"
                      type="text"
                      placeholder="Clinical Indication"
                      disabled={bill_report_status === "Final"}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register("x")}
                      name="Technique"
                      type="text"
                      placeholder="Technique"
                      disabled={bill_report_status === "Final"}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register("x")}
                      name="Comparison"
                      type="text"
                      placeholder="Comparison"
                      disabled={bill_report_status === "Final"}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register("x")}
                      name="Finding"
                      type="text"
                      placeholder="Findings"
                      disabled={bill_report_status === "Final"}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register("x")}
                      name="Impression"
                      type="text"
                      placeholder="Impression"
                      disabled={bill_report_status === "Final"}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register("x")}
                      name="Recommendation"
                      type="text"
                      placeholder="Recommendation"
                      disabled={bill_report_status === "Final"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label className=" is-small">
                <input
                  type="radio"
                  name="status"
                  value="Draft"
                  checked={
                    reportStatus === "Draft" || reportStatus === "Pending"
                  }
                  onChange={e => {
                    handleChangePart(e);
                  }}
                  disabled={bill_report_status === "Final"}
                />
                <span> Draft</span>
              </label>{" "}
              <br />
              <label className=" is-small">
                <input
                  type="radio"
                  name="status"
                  value="Final"
                  checked={reportStatus === "Final"}
                  onChange={e => handleChangePart(e)}
                  disabled={bill_report_status === "Final"}
                />
                <span> Final </span>
              </label>
            </div>
            <div className="field  is-grouped mt-2">
              <p className="control">
                <button
                  type="submit"
                  className="button is-success is-small"
                  disabled={bill_report_status === "Final"}
                >
                  {bill_report_status === "Pending" ? "Save" : "Update"}
                </button>
              </p>
              {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
            </div>
          </form>
        </div>
      </div>
      <div className={`modal ${productModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card  modalbkgrnd">
          <header className="modal-card-head  btnheight">
            <p className="modal-card-title">Documentation</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body modalcolor">
            <Encounter standalone="true" />
          </section>
          {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer>  */}
        </div>
      </div>
    </>
  );
}
