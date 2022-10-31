/* eslint-disable */
import React, {useState, useContext, useEffect, useRef, useMemo} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import FacilityPopup from "../helpers/FacilityPopup";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
const searchfacility = {};

export default function Prescription() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-6 ">
          <PrescriptionList />
        </div>
        <div className="column is-6 ">
          {state.OrderModule.show === "create" && <PrescriptionCreate />}
          {/*  {(state.OrderModule.show ==='detail')&&<ProductEntryDetail  />}
                {(state.OrderModule.show ==='modify')&&<ProductEntryModify ProductEntry={selectedProductEntry} />} */}
        </div>
      </div>
    </section>
  );
}

export function PrescriptionCreate() {
  // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ProductEntryServ = client.service("productentry");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [type, setType] = useState("Purchase Invoice");
  const [documentNo, setDocumentNo] = useState("");
  const [totalamount, setTotalamount] = useState("");
  const [productId, setProductId] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [hidePanel, setHidePanel] = useState(false);
  const [destination, setDestination] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [destinationModal, setDestinationModal] = useState(false);
  const [medication, setMedication] = useState();
  const [instruction, setInstruction] = useState();
  const [productItem, setProductItem] = useState([]);
  const {state, setState} = useContext(ObjectContext);
  const ClientServ = client.service("clinicaldocument");

  const [productEntry, setProductEntry] = useState({
    productitems: [],
    date,
    documentNo,
    type,
    totalamount,
    source,
  });

  const handlecloseModal = () => {
    setDestinationModal(false);
    //handleSearch(val)
  };
  const productItemI = {
    /*   productId,
        name, */
    medication,
    destination,
    instruction,
    destinationId,
    /* costprice,
        amount:quantity*costprice,
        baseunit */
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = obj => {
    setInstruction(obj.instruction);
    setMedication(obj.medication);

    if (!obj) {
      //"clear stuff"
      setInstruction("");
      setMedication("");
    }
    // setBaseunit(obj.baseunit)

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);
  /*  useEffect(() => {
        setProductItem(
            prevProd=>prevProd.concat(productItemI)
        )
        console.log(productItem)
        return () => {
            
        }
    },[productItemI])
 */
  useEffect(() => {
    setDestination(state.DestinationModule.selectedDestination.facilityName);
    setDestinationId(state.DestinationModule.selectedDestination._id);
    return () => {};
  }, [state.DestinationModule.selectedDestination]);

  const handleChangeType = async e => {
    await setType(e.target.value);
  };
  const handleClickProd = async () => {
    await setSuccess(false);
    if (!(productItemI.medication && productItemI.medication.length > 0)) {
      toast({
        message: "medication can not be empty ",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }
    await setProductItem(prevProd => prevProd.concat(productItemI));
    setHidePanel(false);
    setName("");
    setMedication("");
    setInstruction("");
    setDestination(user.currentEmployee.facilityDetail.facilityName);
    setDestinationId(user.currentEmployee.facilityDetail._id);
    // setDestination("")
    await setSuccess(true);
    const newfacilityModule = {
      selectedDestination: user.currentEmployee.facilityDetail,
      show: "list",
    };
    await setState(prevstate => ({
      ...prevstate,
      DestinationModule: newfacilityModule,
    }));
  };
  //check user for facility or get list of facility
  /*  useEffect(()=>{
        //setFacility(user.activeProductEntry.FacilityId)//
      if (!user.stacker){
          console.log(currentUser)
           /* setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  

      }
    }) */

  const handleChangeDestination = () => {
    setDestinationModal(true);
  };

  const resetform = () => {
    setType("Purchase Invoice");
    setDocumentNo("");
    setTotalamount("");
    setProductId("");
    setSource("");
    setDate("");
    setName("");
    setMedication("");
    setInstruction("");
    setProductItem([]);
  };

  const onSubmit = () => {
    //data,e
    // e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    //write document
    let document = {};
    // data.createdby=user._id
    // console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = productItem;

    document.documentname = "Prescription"; //state.DocumentClassModule.selectedDocumentClass.name
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.clientname =
      state.ClientModule.selectedClient.firstname +
      " " +
      state.ClientModule.selectedClient.middlename +
      " " +
      state.ClientModule.selectedClient.lastname;
    document.clientobj = state.ClientModule.selectedClient;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = "completed";

    ClientServ.create(document)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        toast({
          message: "Presciption created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setDestination(user.currentEmployee.facilityDetail.facilityName);
        setDestinationId(user.currentEmployee.facilityDetail._id);
        setSuccess(false);
        setProductItem([]);
      })
      .catch(err => {
        toast({
          message: "Error creating Prescription " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    setDestination(user.currentEmployee.facilityDetail.facilityName);
    setDestinationId(user.currentEmployee.facilityDetail._id);
    return () => {};
  }, []);

  return (
    <div>
      <div className="card card-overflow">
        <div className="card-header">
          <p className="card-header-title">Create Prescription</p>
        </div>
        <div className="card-content ">
          {/*  <form onSubmit={onSubmit}> {/* handleSubmit(onSubmit)  </form>  */}

          {/* array of ProductEntry items */}

          <label className="label is-small">Add Medication:</label>
          <div className="field is-horizontal">
            <div className="field-body">
              <div
                className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
              >
                <MedicationHelperSearch
                  getSearchfacility={getSearchfacility}
                  clear={success}
                  hidePanel={hidePanel}
                />
                <p
                  className="control has-icons-left "
                  style={{display: "none"}}
                >
                  <input
                    className="input is-small"
                    /* ref={register ({ required: true }) }  */ value={
                      medication
                    }
                    name="medication"
                    type="text"
                    onChange={e => setMedication(e.target.value)}
                    placeholder="medication"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                  </span>
                </p>
              </div>
              {/*  <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="medication" value={medication} type="text" onChange={e=>setMedication(e.target.value)} placeholder="medication"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
       
            </div>  */}

              <div className="field" onClick={() => setHidePanel(true)}>
                <p className="control">
                  <button className="button is-info is-small  is-pulled-right">
                    <span className="is-small" onClick={handleClickProd}>
                      {" "}
                      +
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    /* {...register("x",{required: true})} */ name="instruction"
                    value={instruction}
                    type="text"
                    onChange={e => setInstruction(e.target.value)}
                    placeholder="Instructions/Note"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small "
                    disabled
                    /* {...register("x",{required: true})} */ name="destination"
                    value={
                      destination ===
                      user.currentEmployee.facilityDetail.facilityName
                        ? "In-house"
                        : destination
                    }
                    type="text"
                    onChange={e => setDestination(e.target.value)}
                    placeholder="Destination Pharmacy"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
                <button
                  className="button is-small is-success btnheight"
                  onClick={handleChangeDestination}
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          {productItem.length > 0 && (
            <div>
              <label className="label is-size-7">Medications:</label>
              <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                <thead>
                  <tr>
                    <th>
                      <abbr title="Serial No">S/No</abbr>
                    </th>
                    {/*  <th><abbr title="Type">Name</abbr></th> */}
                    <th>
                      <abbr title="Medication">Medication</abbr>
                    </th>
                    <th>
                      <abbr title="Destination">Destination</abbr>
                    </th>
                    {/*<th><abbr title="Cost Price">Cost Price</abbr></th>
                    <th><abbr title="Cost Price">Amount</abbr></th> */}
                    <th>
                      <abbr title="Actions">Actions</abbr>
                    </th>
                  </tr>
                </thead>
                <tfoot></tfoot>
                <tbody>
                  {productItem.map((ProductEntry, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      {/* <td>{ProductEntry.name}</td> */}
                      <td>
                        {ProductEntry.medication}
                        <br />
                        <span className="help">{ProductEntry.instruction}</span>
                      </td>
                      <td>
                        {ProductEntry.destination ===
                        user.currentEmployee.facilityDetail.facilityName
                          ? "In-house"
                          : ProductEntry.destination}
                      </td>
                      {/* <td>{ProductEntry.costprice}</td>
                        <td>{ProductEntry.amount}</td> */}
                      <td>
                        <span className="showAction">x</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="field mt-2">
                <p className="control">
                  <button
                    className="button is-success is-small"
                    disabled={!productItem.length > 0}
                    onClick={onSubmit}
                  >
                    Create
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`modal ${destinationModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Choose Destination</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <FacilityPopup
              facilityType="Pharmacy"
              closeModal={handlecloseModal}
            />
            {/* <StoreList standalone="true" /> */}
            {/*  <ProductCreate /> */}
          </section>
          {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
        </div>
      </div>
    </div>
  );
}

export function PrescriptionList({standalone}) {
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
  const [selectedOrder, setSelectedOrder] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  const handleCreateNew = async () => {
    const newProductEntryModule = {
      selectedOrder: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      OrderModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  const handleDelete = doc => {
    // console.log(doc)
    let confirm = window.confirm(
      `You are about to delete the prescription: ${doc.order}?`
    );
    if (confirm) {
      OrderServ.remove(doc._id)
        .then(res => {
          toast({
            message: "Prescription deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error deleting Prescription" + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const handleRow = async ProductEntry => {
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)
    if (!standalone) {
      await setSelectedOrder(ProductEntry);

      const newProductEntryModule = {
        selectedOrder: ProductEntry,
        show: "detail",
      };
      await setState(prevstate => ({
        ...prevstate,
        OrderModule: newProductEntryModule,
      }));
      //console.log(state)
    }
  };

  const handleSearch = val => {
    const field = "name";

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
        ],
        order_category: "Prescription",
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        setFacilities(res.data);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        setMessage(
          "Error fetching ProductEntry, probable network issues " + err
        );
        setError(true);
      });
  };

  const getFacilities = async () => {
    const findProductEntry = await OrderServ.find({
      query: {
        order_category: "Prescription",

        clientId: state.ClientModule.selectedClient._id,
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    });
    await setFacilities(findProductEntry.data);
  };

  useEffect(() => {
    getFacilities();

    OrderServ.on("created", obj => getFacilities());
    OrderServ.on("updated", obj => getFacilities());
    OrderServ.on("patched", obj => getFacilities());
    OrderServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

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
                  placeholder="Search Medications"
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
        {!standalone && (
          <>
            <div className="level-item">
              {" "}
              <span className="is-size-6 has-text-weight-medium">
                List of Prescriptions{" "}
              </span>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="level-item">
                  <div
                    className="button is-success is-small"
                    onClick={handleCreateNew}
                  >
                    New
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="table-container pullup ">
        <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
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
                <abbr title="Requesting Physician">Requesting Physician</abbr>
              </th>
              {/* <th><abbr title="Client Name">Client Name</abbr></th> */}
              {!standalone && (
                <th>
                  <abbr title="Actions">Actions</abbr>
                </th>
              )}
            </tr>
          </thead>
          <tfoot></tfoot>
          <tbody>
            {facilities.map((ProductEntry, i) => (
              <tr
                key={ProductEntry._id}
                /* onClick={()=>handleRow(ProductEntry)} */ className={
                  ProductEntry._id === (selectedOrder?._id || null)
                    ? "is-selected"
                    : ""
                }
              >
                <th>{i + 1}</th>
                <td>
                  {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}
                  <span>
                    {format(new Date(ProductEntry.createdAt), "dd-MM-yy")}
                  </span>
                </td>
                <th>{ProductEntry.order}</th>
                <td>{ProductEntry.fulfilled === "True" ? "Yes" : "No"}</td>
                <td>{ProductEntry.order_status}</td>
                <td>{ProductEntry.requestingdoctor_Name}</td>
                {/* <td>{ProductEntry.clientId}</td> */}
                {!standalone && (
                  <td>
                    {" "}
                    <button
                      className="button  sbut"
                      aria-label="more options"
                      onClick={() => handleDelete(ProductEntry)}
                    >
                      <span>x</span>
                    </button>{" "}
                    {/* <span className="showAction"  >...</span> */}{" "}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function DrugAdminList({standalone}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  const [hxModal, setHxModal] = useState(false);
  const [currentMed, setCurrentMed] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const OrderServ = client.service("order");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedOrder, setSelectedOrder] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const refs = useMemo(
    () => facilities.map(() => React.createRef()),
    [facilities]
  );
  const ClientServ = client.service("clinicaldocument");

  const handleCreateNew = async () => {
    const newProductEntryModule = {
      selectedOrder: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      OrderModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  const handleHistory = async (medication, i) => {
    setHxModal(true);
    setCurrentMed(medication);
  };

  const handlecloseModal1 = async () => {
    setHxModal(false);
  };

  const handleAdminister = (medication, i) => {
    let confirm = window.confirm(
      `You are about to administer a dose of ${medication.order} for ${
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname
      } ?`
    );
    if (confirm) {
      //update the medication

      medication.treatment_status = "Active";

      const treatment_action = {
        actorname: user.firstname + " " + user.lastname,
        actorId: user._id,
        order_id: medication._id,
        action: "Administered",
        comments: refs[i].current.value,
        createdat: new Date().toLocaleString(),
        description:
          "Administered current dose of " +
          medication.order +
          " " +
          user.firstname +
          " " +
          user.lastname +
          " @ " +
          new Date().toLocaleString(),
      };

      medication.treatment_action = [
        treatment_action,
        ...medication.treatment_action,
      ];
      const treatment_doc = {
        Description:
          "Administered current dose of " +
          medication.order +
          " " +
          user.firstname +
          " " +
          user.lastname +
          " @ " +
          new Date().toLocaleString(),
        Comments: refs[i].current.value,
      };
      let productItem = treatment_doc;
      let document = {};
      // data.createdby=user._id
      // console.log(data);
      document.order = medication;
      document.update = treatment_action;
      if (user.currentEmployee) {
        document.facility = user.currentEmployee.facilityDetail._id;
        document.facilityname =
          user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
      }
      document.documentdetail = productItem;

      document.documentname = "Drug Administration"; //state.DocumentClassModule.selectedDocumentClass.name
      // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
      document.location =
        state.employeeLocation.locationName +
        " " +
        state.employeeLocation.locationType;
      document.locationId = state.employeeLocation.locationId;
      document.client = state.ClientModule.selectedClient._id;
      document.clientname =
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname;
      document.clientobj = state.ClientModule.selectedClient;
      document.createdBy = user._id;
      document.createdByname = user.firstname + " " + user.lastname;
      document.status = "completed";

      ClientServ.create(document)
        .then(res => {
          //console.log(JSON.stringify(res))
          // e.target.reset();
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast({
            message: "Drug administered succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          refs[i].current.value = "";
          // setProductItem([])
        })
        .catch(err => {
          toast({
            message: "Error In Drugs Adminstration " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const handleDelete = doc => {
    // console.log(doc)
    let confirm = window.confirm(
      `You are about to delete the prescription: ${doc.order}?`
    );
    if (confirm) {
      OrderServ.remove(doc._id)
        .then(res => {
          toast({
            message: "Prescription deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error deleting Prescription" + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const handleDiscontinue = (medication, i) => {
    let confirm = window.confirm(
      `You are about to discontinue this medication ${medication.order} for ${
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname
      } ?`
    );
    if (confirm) {
      medication.treatment_status = "Cancelled";

      const treatment_action = {
        actorname: user.firstname + " " + user.lastname,
        actorId: user._id,
        order_id: medication._id,
        action: "Discountinued",
        comments: refs[i].current.value,
        createdat: new Date().toLocaleString(),
        description:
          "Discontinued " +
          medication.order +
          " for " +
          user.firstname +
          " " +
          user.lastname +
          " @ " +
          new Date().toLocaleString(),
      };

      medication.treatment_action = [
        treatment_action,
        ...medication.treatment_action,
      ];
      const treatment_doc = {
        Description:
          "Discontinued  " +
          medication.order +
          " for " +
          user.firstname +
          " " +
          user.lastname +
          " @ " +
          new Date().toLocaleString(),
        Comments: refs[i].current.value,
      };
      let productItem = treatment_doc;
      let document = {};
      // data.createdby=user._id
      // console.log(data);
      document.order = medication;
      document.update = treatment_action;
      if (user.currentEmployee) {
        document.facility = user.currentEmployee.facilityDetail._id;
        document.facilityname =
          user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
      }
      document.documentdetail = productItem;

      document.documentname = "Drug Administration"; //state.DocumentClassModule.selectedDocumentClass.name
      // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
      document.location =
        state.employeeLocation.locationName +
        " " +
        state.employeeLocation.locationType;
      document.locationId = state.employeeLocation.locationId;
      document.client = state.ClientModule.selectedClient._id;
      document.clientname =
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname;
      document.clientobj = state.ClientModule.selectedClient;
      document.createdBy = user._id;
      document.createdByname = user.firstname + " " + user.lastname;
      document.status = "completed";

      ClientServ.create(document)
        .then(res => {
          //console.log(JSON.stringify(res))
          // e.target.reset();
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast({
            message: "Drug administered succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          refs[i].current.value = "";
          // setProductItem([])
        })
        .catch(err => {
          toast({
            message: "Error In Drugs Adminstration " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const handleDrop = (medication, i) => {
    let confirm = window.confirm(
      `You are about to drop this medication ${medication.order} for ${
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname
      } ?`
    );
    if (confirm) {
      medication.treatment_status = "Aborted";
      medication.drop = true;

      const treatment_action = {
        actorname: user.firstname + " " + user.lastname,
        actorId: user._id,
        order_id: medication._id,
        action: "Aborted",
        comments: refs[i].current.value,
        createdat: new Date().toLocaleString(),
        description:
          "Dropped " +
          medication.order +
          " for " +
          user.firstname +
          " " +
          user.lastname +
          " @ " +
          new Date().toLocaleString(),
      };

      medication.treatment_action = [
        treatment_action,
        ...medication.treatment_action,
      ];
      const treatment_doc = {
        Description:
          "Dropped  " +
          medication.order +
          " for " +
          user.firstname +
          " " +
          user.lastname +
          " @ " +
          new Date().toLocaleString(),
        Comments: refs[i].current.value,
      };
      let productItem = treatment_doc;
      let document = {};
      // data.createdby=user._id
      // console.log(data);
      document.order = medication;
      document.update = treatment_action;
      if (user.currentEmployee) {
        document.facility = user.currentEmployee.facilityDetail._id;
        document.facilityname =
          user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
      }
      document.documentdetail = productItem;

      document.documentname = "Drug Administration"; //state.DocumentClassModule.selectedDocumentClass.name
      // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
      document.location =
        state.employeeLocation.locationName +
        " " +
        state.employeeLocation.locationType;
      document.locationId = state.employeeLocation.locationId;
      document.client = state.ClientModule.selectedClient._id;
      document.clientname =
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname;
      document.clientobj = state.ClientModule.selectedClient;
      document.createdBy = user._id;
      document.createdByname = user.firstname + " " + user.lastname;
      document.status = "completed";

      ClientServ.create(document)
        .then(res => {
          //console.log(JSON.stringify(res))
          // e.target.reset();
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast({
            message: "Drug administered succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          refs[i].current.value = "";
          // setProductItem([])
        })
        .catch(err => {
          toast({
            message: "Error In Drugs Adminstration " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const handleRow = async ProductEntry => {
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)
    if (!standalone) {
      await setSelectedOrder(ProductEntry);

      const newProductEntryModule = {
        selectedOrder: ProductEntry,
        show: "detail",
      };
      await setState(prevstate => ({
        ...prevstate,
        OrderModule: newProductEntryModule,
      }));
      //console.log(state)
    }
  };

  const handleSearch = val => {
    const field = "name";

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
        ],
        order_category: "Prescription",
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        setFacilities(res.data);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        setMessage(
          "Error fetching ProductEntry, probable network issues " + err
        );
        setError(true);
      });
  };

  const getFacilities = async () => {
    const findProductEntry = await OrderServ.find({
      query: {
        order_category: "Prescription",
        //destination: user.currentEmployee.facilityDetail._id,

        //storeId:state.StoreModule.selectedStore._id,
        clientId: state.ClientModule.selectedClient._id,
        drop: false,
        $limit: 200,
        $sort: {
          treatment_status: 1,
          createdAt: -1,
        },
      },
    });
    await setFacilities(findProductEntry.data);
  };

  useEffect(() => {
    getFacilities();

    OrderServ.on("created", obj => getFacilities());
    OrderServ.on("updated", obj => getFacilities());
    OrderServ.on("patched", obj => getFacilities());
    OrderServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

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
                  placeholder="Search Medications"
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
        {!standalone && (
          <>
            <div className="level-item">
              {" "}
              <span className="is-size-6 has-text-weight-medium">
                List of Prescriptions{" "}
              </span>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="level-item">
                  <div
                    className="button is-success is-small"
                    onClick={handleCreateNew}
                  >
                    New
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="table-container pullup ">
        <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
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
              <th>Instructions</th>

              <th>
                <abbr title="Status">Status</abbr>
              </th>
              <th>
                <abbr title="Last Administered">Last Administered</abbr>
              </th>
              <th>
                <abbr title="Latest Comments">Latest Comments</abbr>
              </th>
              <th>
                <abbr title="Administered by">Administered By</abbr>
              </th>
              <th>
                <abbr title="Comments">New Comments</abbr>
              </th>
              <th>
                <abbr title="Actions">Actions</abbr>
              </th>
            </tr>
          </thead>
          <tfoot></tfoot>
          <tbody>
            {facilities.map((ProductEntry, i) => (
              <tr
                key={ProductEntry._id}
                /* onClick={()=>handleRow(ProductEntry)} */ className={
                  ProductEntry.treatment_status === "Cancelled" ? "cancel" : ""
                }
              >
                <th>{i + 1}</th>
                <td>
                  {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}
                  <span>
                    {format(new Date(ProductEntry.createdAt), "dd-MM-yy")}
                  </span>
                </td>
                <th>{ProductEntry.order}</th>
                <th>{ProductEntry.instruction}</th>
                {/* <td>{ProductEntry.requestingdoctor_Name}</td> */}
                <td>{ProductEntry.treatment_status}</td>
                <td>
                  {ProductEntry.treatment_action[0]?.createdat && (
                    <span>
                      {format(
                        new Date(ProductEntry.treatment_action[0].createdat),
                        "dd-MM-yy hh:mmm:ss"
                      )}
                    </span>
                  )}
                </td>
                <td>{ProductEntry.treatment_action[0]?.comments} </td>
                <td>{ProductEntry.treatment_action[0]?.actorname} </td>
                {/* <td>{ProductEntry.clientId}</td> */}
                <td>
                  {" "}
                  <input classname="input" type="text" name={i} ref={refs[i]} />
                </td>
                <td>
                  <button
                    className="button is-small btnheight is-primary"
                    disabled={ProductEntry.treatment_status === "Cancelled"}
                    aria-label="more options"
                    onClick={() => handleAdminister(ProductEntry, i)}
                  >
                    <span>Administer</span>
                  </button>
                  <button
                    className="button is-small btnheight is-info"
                    aria-label="more options"
                    onClick={() => handleHistory(ProductEntry, i)}
                  >
                    <span>History</span>
                  </button>
                  <button
                    className="button is-small btnheight is-warning"
                    disabled={ProductEntry.treatment_status === "Cancelled"}
                    aria-label="more options"
                    onClick={() => handleDiscontinue(ProductEntry, i)}
                  >
                    <span>Discountinue</span>
                  </button>
                  <button
                    className="button is-small btnheight  is-danger"
                    disabled={ProductEntry.treatment_status === "Cancelled"}
                    aria-label="more options"
                    onClick={() => handleDrop(ProductEntry, i)}
                  >
                    <span>Drop </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`modal ${hxModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Drug Admin History </p>

            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="table-container pullup ">
              <div>
                <span className="is-medium">
                  <strong>{currentMed.order}</strong>
                </span>
                <br />
                <span>
                  <strong>Instruction: </strong>
                  {currentMed.instruction}
                </span>
                <br />
                <span>
                  <strong>Ordered by:</strong>{" "}
                  {currentMed.requestingdoctor_Name}
                </span>
                <br />
                {currentMed.createdAt && (
                  <span>
                    <strong>
                      {formatDistanceToNowStrict(
                        new Date(currentMed.createdAt),
                        {addSuffix: true}
                      )}
                    </strong>{" "}
                    <span>
                      {format(new Date(currentMed.createdAt), "dd-MM-yy")}
                    </span>
                  </span>
                )}
              </div>
              <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                <thead>
                  <tr>
                    <th>
                      <abbr title="Serial No">S/No</abbr>
                    </th>
                    <th>
                      <abbr title="Date">Date/Time</abbr>
                    </th>
                    <th>
                      <abbr title="Action">Action</abbr>
                    </th>
                    <th>Comments</th>
                    <th>
                      <abbr title="Personnel">Personel</abbr>
                    </th>
                    {/*  <th><abbr title="Status">Status</abbr></th>
                                             <th><abbr title="Last Administered">Last Administered</abbr></th>
                                             <th><abbr title="Administered by">Administered By</abbr></th> 
                                             <th><abbr title="Comments">Comments</abbr></th> 
                                             <th><abbr title="Actions">Actions</abbr></th> */}
                  </tr>
                </thead>
                <tfoot></tfoot>
                <tbody>
                  {currentMed.hasOwnProperty("treatment_action") &&
                    currentMed.treatment_action.map((ProductEntry, i) => (
                      <tr
                        key={
                          ProductEntry._id
                        } /* onClick={()=>handleRow(ProductEntry)}  className={ProductEntry._id!== "Active"?"is-selected":""}*/
                      >
                        <th>{i + 1}</th>
                        <td>
                          {ProductEntry.createdat && (
                            <span>
                              {format(
                                new Date(ProductEntry.createdat),
                                "dd-MM-yy hh:mmm:ss"
                              )}
                            </span>
                          )}
                        </td>
                        <th>{ProductEntry.action}</th>
                        <th>{ProductEntry.comments}</th>
                        <td>{ProductEntry.actorname} </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* <StoreList standalone="true" /> */}
            {/* <BillServiceCreate closeModal={handlecloseModal1}/> */}
          </section>
          {/* <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                            </footer> */}
        </div>
      </div>
    </>
  );
}

export function ProductEntryDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ProductEntryServ=client.service('/ProductEntry')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);

  const ProductEntry = state.ProductEntryModule.selectedProductEntry;

  const handleEdit = async () => {
    const newProductEntryModule = {
      selectedProductEntry: ProductEntry,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">ProductEntry Details</p>
        </div>
        <div className="card-content vscrollable">
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="label is-small">
                    {" "}
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                    Type
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    {" "}
                    {ProductEntry.type}{" "}
                  </span>
                </td>
                <td></td>
                <td>
                  <label className="label is-small padleft">
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                    Supplier:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="ProductEntryType">
                    {ProductEntry.source}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="label is-small">
                    {" "}
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                    Date:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    {" "}
                    {ProductEntry.date}{" "}
                  </span>
                </td>
                <td></td>
                <td>
                  <label className="label is-small padleft">
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                    Invoice No:
                  </label>
                </td>

                <td>
                  <span className="is-size-7 padleft" name="ProductEntryType">
                    {ProductEntry.documentNo}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="label is-small">
                    {" "}
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                    Total Amount:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    {" "}
                    {ProductEntry.totalamount}{" "}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <label className="label is-size-7 mt-2">Product Items:</label>
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>
                <th>
                  <abbr title="Type">Name</abbr>
                </th>
                <th>
                  <abbr title="Type">Quanitity</abbr>
                </th>
                <th>
                  <abbr title="Document No">Unit</abbr>
                </th>
                <th>
                  <abbr title="Cost Price">Cost Price</abbr>
                </th>
                <th>
                  <abbr title="Cost Price">Amount</abbr>
                </th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {ProductEntry.productitems.map((ProductEntry, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{ProductEntry.name}</td>
                  <th>{ProductEntry.quantity}</th>
                  <td>{ProductEntry.baseunit}</td>
                  <td>{ProductEntry.costprice}</td>
                  <td>{ProductEntry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*   <tr>
                    <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>Profession: 
                
                    
                    </label>
                    </td>
                <td>
                <span className="is-size-7 padleft "  name="ProductEntryCity">{ProductEntry.profession}</span> 
                </td>
                </tr>
                    <tr>
            <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>Phone:           
                    
                        </label>
                        </td>
                        <td>
                        <span className="is-size-7 padleft "  name="ProductEntryContactPhone" >{ProductEntry.phone}</span>
                        </td>
                  </tr>
                    <tr><td>
            
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>Email:                     
                    
                         </label></td><td>
                         <span className="is-size-7 padleft "  name="ProductEntryEmail" >{ProductEntry.email}</span>
                         </td>
             
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i></span>Department:
                    
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft "  name="ProductEntryOwner">{ProductEntry.department}</span>
                    </td>
               
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>Departmental Unit:              
                    
                </label></td>
                <td>
                <span className="is-size-7 padleft "  name="ProductEntryType">{ProductEntry.deptunit}</span>
                </td>
              
                </tr> */}

          {/*   <div className="field">
             <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>Category:              
                    <span className="is-size-7 padleft "  name= "ProductEntryCategory">{ProductEntry.ProductEntryCategory}</span>
                </label>
                 </div> */}

          {/*  <div className="field mt-2">
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Edit
                    </button>
                </p>
            </div>
            { error && <div className="message"> {message}</div>} */}
        </div>
      </div>
    </>
  );
}

export function ProductEntryModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ProductEntryServ = client.service("productentry");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const ProductEntry = state.ProductEntryModule.selectedProductEntry;

  useEffect(() => {
    setValue("name", ProductEntry.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("ProductEntryType", ProductEntry.ProductEntryType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", ProductEntry.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", ProductEntry.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", ProductEntry.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", ProductEntry.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", ProductEntry.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("ProductEntryCategory", ProductEntry.ProductEntryCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  });

  const handleCancel = async () => {
    const newProductEntryModule = {
      selectedProductEntry: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newProductEntryModule = {
      selectedProductEntry: {},
      show: "create",
    };
    setState(prevstate => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = ProductEntry._id;
    if (conf) {
      ProductEntryServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted ProductEntry successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "ProductEntry deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting ProductEntry, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              "Error deleting ProductEntry, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);

    data.facility = ProductEntry.facility;
    //console.log(data);

    ProductEntryServ.patch(ProductEntry._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated ProductEntry successfully")
        toast({
          message: "ProductEntry updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating ProductEntry, probable network issues "+ err )
        // setError(true)
        toast({
          message:
            "Error updating ProductEntry, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">ProductEntry Details-Modify</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                {" "}
                Name
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    {...register("x", {required: true})}
                    name="name"
                    type="text"
                    placeholder="Name"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                ProductEntry Type
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    {...register("x", {required: true})}
                    disabled
                    name="ProductEntryType"
                    type="text"
                    placeholder="ProductEntry Type"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </label>
            </div>
            {/* <div className="field">
            <label className="label is-small">Profession
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="profession" type="text" placeholder="Profession"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Phone
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="phone" type="text" placeholder="Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
                </label>
                 </div>
            <div className="field">
            <label className="label is-small">Email
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="ProductEntry Email"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Department
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="department" type="text" placeholder="Department"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                    </span>
                </p>
                </label>
                {errors.department && <span>This field is required</span>}
                </div>
            <div className="field">
            <label className="label is-small">Departmental Unit
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="deptunit" type="text" placeholder="Departmental Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>
                </p>
                </label>
                </div> */}
            {/*  <div className="field">
            <label className="label is-small">Category
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="ProductEntryCategory" type="text" placeholder="ProductEntry Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
                </label>
            </div> */}
          </form>

          <div className="field  is-grouped mt-2">
            <p className="control">
              <button
                type="submit"
                className="button is-success is-small"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </p>
            <p className="control">
              <button
                className="button is-danger is-small"
                onClick={() => handleDelete()}
                type="delete"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function MedicationHelperSearch({getSearchfacility, clear, hidePanel}) {
  const productServ = client.service("medicationhelper");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);
  const ref = useRef(null);
  let value;

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.medication);

    setShowPanel(false);
    await setCount(2);
  };
  const handleBlur = async () => {
    console.log(document.activeElement);

    // setShowPanel(false)
    getSearchfacility({
      medication: val,
      instruction: "",
    });
  };

  const handleBlur2 = async () => {
    // console.log(document.activeElement)

    setShowPanel(false);
    getSearchfacility({
      medication: val,
      instruction: "",
    });
  };
  const handleSearch = async value => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility(false);
      return;
    }
    const field = "medication"; //field variable

    if (value.length >= 3) {
      productServ
        .find({
          query: {
            //service
            [field]: {
              $regex: value,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          if (res.total > 0) {
            setFacilities(res.data);
            setSearchMessage(" product  fetched successfully");
            setShowPanel(true);
          } else {
            setShowPanel(false);
            getSearchfacility({
              medication: value,
              instruction: "",
            });
          }
        })
        .catch(err => {
          toast({
            message: "Error fetching medication " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      setShowPanel(false);
      await setFacilities([]);
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {};

  useEffect(() => {
    setSimpa(value);
    return () => {};
  }, [simpa]);
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);

  useEffect(() => {
    if (hidePanel) {
      setShowPanel(false);
    }
    return () => {};
  }, [hidePanel]);

  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? "is-active" : ""}`}
            style={{width: "100%"}}
          >
            <div className="dropdown-trigger" style={{width: "100%"}}>
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Order"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
                onBlur={e => handleBlur(e.target.value)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {/* {searchError&&<div>{searchMessage}</div>} */}
            <div
              className="dropdown-menu"
              style={{width: "100%"}}
              onBlur={handleBlur2}
            >
              <div
                className="dropdown-content"
                onMouseOver={() => setShowPanel(true)}
                onMouseOut={() => setShowPanel(false)}
              >
                {/*  { facilities.length>0?"":<div className="dropdown-item" onClick={handleAddproduct}> <span>Add {val} to product list</span> </div>} */}

                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.medication}</span> //{" "}
                    <span>{facility.instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
