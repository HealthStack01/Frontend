/* eslint-disable */
import React, {useState, useContext, useEffect, useRef, useMemo} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import FacilityPopup from "../helpers/FacilityPopup";
import {toast} from "react-toastify";
import {format, formatDistanceToNowStrict} from "date-fns";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
const searchfacility = {};
import {Box, Button as MuiButton} from "@mui/material";
import ModalBox from "../../components/modal";
import Card from "@mui/material/Card";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import {TableMenu} from "../../ui/styled/global";
import Input from "../../components/inputs/basic/Input";
import Grow from "@mui/material/Grow";

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

      {/*  {(state.OrderModule.show ==='detail')&&<ProductEntryDetail  />}
                {(state.OrderModule.show ==='modify')&&<ProductEntryModify ProductEntry={selectedProductEntry} />} */}

      <Box
        container
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "90vw",
          height: "600px",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Box
          item
          sx={{
            display: "flex-inline",
            width: "60%",
          }}
        >
          <PrescriptionList />
        </Box>

        <Box
          item
          sx={{
            display: "flex-inline",
            width: "35%",
          }}
        >
          <PrescriptionCreate />
        </Box>
      </Box>
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
      toast.error("medication can not be empty ");
      return;
    }
    console.log(productItemI);
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
        toast.success("Presciption created succesfully");
        setDestination(user.currentEmployee.facilityDetail.facilityName);
        setDestinationId(user.currentEmployee.facilityDetail._id);
        setSuccess(false);
        setProductItem([]);
      })
      .catch(err => {
        toast.error(`Error creating Prescription  ${err}`);
      });
  };

  useEffect(() => {
    setDestination(user.currentEmployee.facilityDetail.facilityName);
    setDestinationId(user.currentEmployee.facilityDetail._id);
    return () => {};
  }, []);

  const productItemSchema = [
    {
      name: "S/N",
      key: "_id",
      selector: row => row.sn,
      description: "Enter",
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Test",
      key: "test",
      description: "Enter Test name",
      selector: row => row.medication,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Instruction",
      key: "action",
      description: "Enter Action",
      selector: row => (row.instruction ? row.instruction : "-------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Destination",
      key: "destination",
      description: "Enter Destination",
      selector: row => row.destination,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Action",
      key: "destination",
      description: "Enter Destination",
      selector: row => <p style={{fontSize: "0.7rem", color: "red"}}>Remove</p>,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Card>
      <Box
        sx={{
          padding: "15px",
          minHeight: "400px",
          maxHeight: "600px",
        }}
      >
        <div className="card card-overflow">
          <Box
            container
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p className="card-header-title">Create Prescription</p>
          </Box>
          <div className="card-content ">
            {/*  <form onSubmit={onSubmit}> {/* handleSubmit(onSubmit)  </form>  */}

            {/* array of ProductEntry items */}

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

                  <Input
                    value={instruction}
                    type="text"
                    onChange={e => setInstruction(e.target.value)}
                    placeholder="Instructions/Note"
                    name="instruction"
                    disabled={
                      !(
                        productItemI.medication &&
                        productItemI.medication.length > 0
                      )
                    }
                  />

                  <input
                    className="input is-small"
                    value={medication}
                    name="medication"
                    type="text"
                    onChange={e => setMedication(e.target.value)}
                    placeholder="medication"
                    style={{display: "none"}}
                  />

                  <Box
                    container
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      item
                      sx={{
                        width: "calc(100% - 100px)",
                      }}
                    >
                      <Input
                        value={
                          destination ===
                          user.currentEmployee.facilityDetail.facilityName
                            ? "In-house"
                            : destination
                        }
                        disabled={true}
                        type="text"
                        onChange={e => setDestination(e.target.value)}
                        placeholder="Destination Pharmacy"
                        name="destination"
                      />
                    </Box>

                    <Box item>
                      <Button
                        onClick={handleChangeDestination}
                        sx={{
                          fontSize: "0.75rem",
                          width: "85px",
                        }}
                      >
                        Change
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    container
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                    mb={2}
                  >
                    <Button
                      onClick={() => {
                        handleClickProd();
                        () => setHidePanel(true);
                      }}
                      sx={{
                        width: "40%",
                        fontSize: "0.75rem",
                      }}
                    >
                      Add Product
                    </Button>
                  </Box>
                </div>
              </div>
            </div>

            {productItem.length > 0 && (
              <Box
                sx={{
                  height: "200px",
                  overflowY: "scroll",
                }}
              >
                <CustomTable
                  title={"Lab Orders"}
                  columns={productItemSchema}
                  data={productItem}
                  pointerOnHover
                  highlightOnHover
                  striped
                  //onRowClicked={handleRow}
                  progressPending={false}
                  //selectableRowsComponent={Checkbox}
                />
              </Box>
            )}

            {productItem.length > 0 && (
              <Box
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={onSubmit}
                  sx={{
                    width: "150px",
                    fontSize: "0.75rem",
                  }}
                >
                  Create
                </Button>
              </Box>
            )}
          </div>
        </div>

        <ModalBox open={destinationModal} onClose={handlecloseModal}>
          <FacilityPopup
            facilityType="Pharmacy"
            closeModal={handlecloseModal}
          />
        </ModalBox>
      </Box>
    </Card>
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

  const ordersListSchema = [
    {
      name: "S/N",
      key: "_id",
      selector: row => row.sn,
      description: "Enter name of band",
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Date",
      key: "name",
      description: "Enter name of band",
      selector: row => format(new Date(row.createdAt), "dd-MM-yy"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Test",
      key: "facility",
      description: "Enter name of Facility",
      selector: row => row.order,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Note",
      key: "action",
      description: "Enter Action",
      selector: row => (row.instruction ? row.instruction : "-----------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Fulfilled",
      key: "facility",
      description: "Enter name of Facility",
      selector: row => (row.fulfilled === "true" ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "action",
      description: "Enter Action",
      selector: row => row.order_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Requesting Physician",
      key: "facility",
      description: "Enter name of Facility",
      selector: row => row.requestingdoctor_Name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Action",
      key: "destination",
      description: "Enter Destination",
      selector: row => (
        <p
          style={{fontSize: "0.7rem", color: "red"}}
          onClick={() => handleDelete(row)}
        >
          Delete
        </p>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <Box>
        <TableMenu>
          <div style={{display: "flex", alignItems: "center"}}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{marginLeft: "10px", fontSize: "0.8rem"}}>
              List of Presciption
            </h2>
          </div>

          {!standalone && (
            <Button
              style={{fontSize: "14px", fontWeight: "600"}}
              label="Add new "
              onClick={handleCreateNew}
            />
          )}
        </TableMenu>

        <div style={{width: "100%", height: "430px", overflowY: "scroll"}}>
          <CustomTable
            title={""}
            columns={ordersListSchema}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={false}
            //selectableRowsComponent={Checkbox}
          />
        </div>
      </Box>
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
  // console.log(facilities);
  const medicationSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      width: "70px",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },

    {
      name: "Date",
      key: "Date",
      description: "date",
      width: "80px",
      selector: row => format(new Date(row.createdAt), "dd-MM-yy"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Medication",
      key: "order",
      description: "order",
      width: "120px",
      selector: row => row.order,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Instructions",
      key: "Instructions",
      description: "fufiled",
      width: "100px",
      selector: row => row.instruction,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Status",
      key: "status",
      description: "status",
      width: "80px",
      selector: row => row.treatment_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Last Administered",
      key: "lastadministered",
      description: "lastadministered",
      width: "100px",
      selector: row => row.lastadministered,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Lastest Comments",
      key: "lastest comments",
      description: "lastest comments",
      selector: row => row.treatment_action[0]?.comments,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Administered By",
      key: "AdministeredBy",
      description: "AdministeredBy",
      selector: row => row.requestingdoctor_Name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "New comments",
      key: "comments",
      description: "comments",
      selector: row => row.comments,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Action",
      key: "action",
      width: "180px",
      description: "action",
      selector: row => [
        <Box style={{display: "flex", flexWrap: "wrap", width: "180px"}}>
          <Button
            style={{
              fontSize: "0.7rem",
              color: "white",
              width: "70px",
              backgroundColor: "#00C4A7",
              marginBottom: "5px",
            }}
            onClick={() => handleAdminister(row)}
          >
            Administer
          </Button>

          <Button
            style={{
              fontSize: "0.7rem",
              color: "white",
              width: "70px",
              marginBottom: "5px",
            }}
            onClick={() => handleHistory(row)}
          >
            History
          </Button>

          <Button
            style={{
              fontSize: "0.7rem",
              color: "white",
              width: "70px",
              backgroundColor: "#FFDB4A",
            }}
            onClick={() => handleDiscontinue(row)}
          >
            Discontinue
          </Button>

          <Button
            style={{
              fontSize: "0.7rem",
              color: "white",
              width: "70px",
              backgroundColor: "#F03A5F",
            }}
            onClick={() => handleDrop(row)}
          >
            Drop
          </Button>
        </Box>,
      ],
      // omit: !standalone?false: true,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const orderSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },

    {
      name: "Date/Time",
      key: "Date",
      description: "date",
      selector: row => format(new Date(row.createdAt), "dd-MM-yy"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Action",
      key: "action",
      description: "action",
      selector: row => row.action,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Comments",
      key: "comments",
      description: "comments",
      selector: row => row.comments,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Personel",
      key: "status",
      description: "status",
      selector: row => row.actorname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <div>
        <div>
          <div>
            <div style={{display: "flex", marginBottom: "20px"}}>
              {handleSearch && (
                <div>
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
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
        <Box>
          <div style={{height: "400px", width: "100%"}}>
            <CustomTable
              title={""}
              columns={medicationSchema}
              data={facilities}
              onRowClicked={handleRow}
              pointerOnHover
              highlightOnHover
              striped
            />
          </div>
        </Box>
      </div>
      <div>
        <ModalBox
          open={hxModal}
          onClose={handlecloseModal1}
          header="Drug Admin History"
        >
          <div
            className="modal-card"
            style={{height: "400px", overflow: "auto"}}
          >
            {/* <p className="modal-card-title"> </p> */}

            <Box>
              <div>
                <span className="is-medium">
                  <strong>{currentMed.order}</strong>
                </span>
              </div>
              <div>
                <span>
                  <strong>Instruction: </strong>
                  {currentMed.instruction}
                </span>
              </div>

              <div>
                <span>
                  <strong>Ordered by:</strong>{" "}
                  {currentMed.requestingdoctor_Name}
                </span>
              </div>

              {currentMed.createdAt && (
                <span>
                  <strong>
                    {formatDistanceToNowStrict(new Date(currentMed.createdAt), {
                      addSuffix: true,
                    })}
                  </strong>{" "}
                  <span>
                    {format(new Date(currentMed.createdAt), "dd-MM-yy")}
                  </span>
                </span>
              )}

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
                  <tbody>
                    {currentMed.hasOwnProperty("treatment_action") && (
                      <div style={{height: "250px", overflow: "auto"}}>
                        <CustomTable
                          title={""}
                          columns={orderSchema}
                          data={facilities}
                          onRowClicked={handleRow}
                          pointerOnHover
                          highlightOnHover
                          striped
                        />
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </Box>

            {/* <StoreList standalone="true" /> */}
            {/* <BillServiceCreate closeModal={handlecloseModal1}/> */}

            {/* <footer className="modal-card-foot">
                                  <button className="button is-success">Save changes</button>
                                  <button className="button">Cancel</button>
                                  </footer> */}
          </div>
        </ModalBox>
      </div>
    </>
  );
}

const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
};

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

  const dropDownRef = useRef(null);

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

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className="control has-icons-left  ">
            <div
              className="dropdown-trigger"
              style={{width: "100%", position: "relative"}}
            >
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Product"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
                onBlur={e => handleBlur(e.target.value)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
                element={Input}
              />

              <Grow in={showPanel}>
                <Box
                  ref={dropDownRef}
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "250px",
                    overflowY: "scroll",
                    zIndex: "5",
                    position: "absolute",
                    background: "#ffffff",
                    width: "100%",
                    boxShadow: "3",
                    border: "1px solid lightgray",
                  }}
                >
                  {facilities.map((facility, i) => (
                    <Box
                      item
                      key={i}
                      onClick={() => handleRow(facility)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        width: "100%",
                        minHeight: "50px",
                        borderTop: i !== 0 ? "1px solid gray" : "",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                        }}
                      >
                        {facility.medication}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                        }}
                      >
                        {facility.instruction}
                      </span>
                    </Box>
                  ))}
                </Box>
              </Grow>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
