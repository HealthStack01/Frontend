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
import {Box, Button as MuiButton, Grid, Typography} from "@mui/material";
import ModalBox from "../../components/modal";
import Card from "@mui/material/Card";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import {TableMenu} from "../../ui/styled/global";
import Input from "../../components/inputs/basic/Input";
import {FormsHeaderText} from "../../components/texts";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Grow from "@mui/material/Grow";
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import Textarea from "../../components/inputs/basic/Textarea";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import RefInput from "../../components/inputs/basic/Input/ref-input";
import dayjs from "dayjs";

const filter = createFilterOptions();

export default function Prescription() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <Box
      sx={{
        width: "90vw",
        maxHeight: "80vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <PrescriptionList />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <PrescriptionCreate />
        </Grid>
      </Grid>
    </Box>
  );
}

export function PrescriptionCreate() {
  const notificationsServer = client.service("notification");
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
    console.log(obj);
    setInstruction(obj.instruction);
    setMedication(obj.medication);

    if (!obj) {
      setInstruction("");
      setMedication("");
    }
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

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

    const client = state.ClientModule.selectedClient;

    const notificationObj = {
      type: "Pharmacy",
      title: "Pending Bill Prescription",
      description: `You have Pending bill prescription(s) for ${client.firstname} ${client.lastname} in Pharmacy`,
      facilityId: user.currentEmployee.facilityDetail._id,
      sender: `${user.firstname} ${user.lastname}`,
      senderId: user._id,
      pageUrl: "/app/pharmacy/billprescription",
      priority: "urgent",
      //dest_locationId: [state.StoreModule.selectedStore._id],
      //dest_userId: staffs.map(item => item.employeeId),
    };

    ClientServ.create(document)
      .then(async res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        /*  setMessage("Created Client successfully") */
        await notificationsServer.create(notificationObj);
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

  const handleRemoveProd = (prod, index) => {
    setProductItem(prev => prev.filter((item, i) => i !== index));
  };

  const productItemSchema = [
    {
      name: "S/N",
      key: "_id",
      selector: row => row.sn,
      description: "Enter",
      sortable: true,
      inputType: "HIDDEN",
      width: "45px",
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
      name: "Act",
      key: "destination",
      description: "Enter Destination",
      selector: (row, i) => (
        <DeleteOutlineIcon
          sx={{color: "red"}}
          fontSize="small"
          onClick={() => handleRemoveProd(row, i)}
        />
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "60px",
    },
  ];

  return (
    <Box>
      <Box
        container
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1.5}
      >
        <FormsHeaderText text="Create Prescription" />

        <GlobalCustomButton
          onClick={() => {
            handleClickProd();
            () => setHidePanel(true);
          }}
        >
          <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
          Add
        </GlobalCustomButton>
      </Box>

      <Box sx={{display: "flex", flexDirection: "column"}} gap={1.5} mb={1.5}>
        <Box>
          <MedicationHelperSearch
            getSearchfacility={getSearchfacility}
            clear={success}
            hidePanel={hidePanel}
          />
          {/* INVISIBLE INPUT THAT HOLDS THE VALUE FOR TESTHELPERSEARCH */}
          <input
            className="input is-small"
            value={medication}
            name="medication"
            type="text"
            onChange={e => setMedication(e.target.value)}
            placeholder="medication"
            style={{display: "none"}}
          />
        </Box>

        <Box>
          <Input
            value={instruction}
            type="text"
            onChange={e => setInstruction(e.target.value)}
            label="Instructions/Note"
            name="instruction"
            disabled={
              !(productItemI.medication && productItemI.medication.length > 0)
            }
          />
        </Box>
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
                destination === user.currentEmployee.facilityDetail.facilityName
                  ? "In-house"
                  : destination
              }
              disabled={true}
              type="text"
              onChange={e => setDestination(e.target.value)}
              label="Destination Pharmacy"
              name="destination"
            />
          </Box>

          <Box item>
            <GlobalCustomButton onClick={handleChangeDestination}>
              Change
            </GlobalCustomButton>
          </Box>
        </Box>
      </Box>

      <Box>
        {productItem.length > 0 && (
          <Box mb={1.5}>
            <CustomTable
              title={"Prescription Orders"}
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
              justifyContent: "flex-end",
            }}
          >
            <GlobalCustomButton onClick={onSubmit}>Complete</GlobalCustomButton>
          </Box>
        )}
      </Box>

      <ModalBox open={destinationModal} onClose={handlecloseModal}>
        <FacilityPopup facilityType="Pharmacy" closeModal={handlecloseModal} />
      </ModalBox>
    </Box>
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
      width: "50px",
    },
    {
      name: "Date",
      key: "name",
      description: "Enter name of band",
      selector: row => format(new Date(row.createdAt), "dd-MM-yy"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
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
      width: "100px",
    },
    {
      name: "Status",
      key: "action",
      description: "Enter Action",
      selector: row => row.order_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
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
        <DeleteOutlineIcon
          sx={{color: "red"}}
          fontSize="small"
          onClick={() => handleDelete(row)}
        />
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "80px",
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
            <GlobalCustomButton onClick={handleCreateNew}>
              <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
              Add
            </GlobalCustomButton>
          )}
        </TableMenu>

        <div style={{width: "100%", overflowY: "scroll"}}>
          <CustomTable
            title={""}
            columns={ordersListSchema}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={false}
            CustomEmptyData={
              <Typography sx={{fontSize: "0.85rem"}}>
                No Prescriptions found......
              </Typography>
            }
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
  //const history = useHistory()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedOrder, setSelectedOrder] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);

  const [confirmationDialog, setConfirmationDialog] = useState({
    message: "",
    open: false,
    action: null,
    type: "",
  });
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  const refs = useMemo(
    () => facilities.map(() => React.createRef()),
    [facilities]
  );
  const [selectedRow, setSelectedRow] = useState({
    row: null,
    index: null,
  });
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
    // let confirm = window.confirm(
    //   `You are about to administer a dose of ${medication.order} for ${
    //     state.ClientModule.selectedClient.firstname +
    //     " " +
    //     state.ClientModule.selectedClient.middlename +
    //     " " +
    //     state.ClientModule.selectedClient.lastname
    //   } ?`
    // );
    // if (confirm) {
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
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
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

    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    //return console.log(document);

    ClientServ.create(document)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        toast.success("Drug administered succesfully");
        setSuccess(false);
        refs[i].current.value = "";
        // setProductItem([])
      })
      .catch(err => {
        toast.error("Error In Drugs Adminstration " + err);
      });
    // }
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
    // let confirm = window.confirm(
    //   `You are about to discontinue this medication ${medication.order} for ${
    //     state.ClientModule.selectedClient.firstname +
    //     " " +
    //     state.ClientModule.selectedClient.middlename +
    //     " " +
    //     state.ClientModule.selectedClient.lastname
    //   } ?`
    // );
    // if (confirm) {
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
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
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
    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    //return console.log(document);

    ClientServ.create(document)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        toast.success("Drug Discontinued succesfully");
        setSuccess(false);
        refs[i].current.value = "";
        // setProductItem([])
      })
      .catch(err => {
        toast.error("Error In Discontinuation of Drug " + err);
      });
    //}
  };

  const handleDrop = (medication, i) => {
    // let confirm = window.confirm(
    //   `You are about to drop this medication ${medication.order} for ${
    //     state.ClientModule.selectedClient.firstname +
    //     " " +
    //     state.ClientModule.selectedClient.middlename +
    //     " " +
    //     state.ClientModule.selectedClient.lastname
    //   } ?`
    // );
    // if (confirm) {
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
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
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
    document.geolocation = {
      type: "Point",
      coordinates: [state.coordinates.latitude, state.coordinates.longitude],
    };

    //return console.log(document);

    ClientServ.create(document)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        toast.success("Drug administered succesfully");
        setSuccess(false);
        refs[i].current.value = "";
        // setProductItem([])
      })
      .catch(err => {
        toast.error("Error In Drugs Adminstration " + err);
      });
    //}
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
        clientId: state.ClientModule.selectedClient._id,
        $limit: 10,
        $sort: {
          treatment_status: 1,
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, row, index) => {
    setAnchorEl(event.currentTarget);

    setSelectedRow(() => ({
      row: row,
      index: index,
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmAdminister = () => {
    setConfirmationDialog(prev => ({
      ...prev,
      open: true,
      message: `You are about to administer a dose of ${
        selectedRow.row.order
      } for ${
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname
      } ?`,

      action: handleAdminister,
      type: "update",
    }));
  };

  const handleConfirmDiscontinue = () => {
    setConfirmationDialog(prev => ({
      ...prev,
      open: true,
      message: `You are about to discontinue this medication ${
        selectedRow.row.order
      } for ${
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname
      } ?`,

      action: handleDiscontinue,
      type: "update",
    }));
  };

  const handleConfirmDrop = () => {
    setConfirmationDialog(prev => ({
      ...prev,
      open: true,
      message: `You are about to drop this medication ${
        selectedRow.row.order
      } for ${
        state.ClientModule.selectedClient.firstname +
        " " +
        state.ClientModule.selectedClient.middlename +
        " " +
        state.ClientModule.selectedClient.lastname
      } ?`,

      action: handleDrop,
      type: "danger",
    }));
  };

  const handleCloseConfirmDialog = () => {
    setConfirmationDialog(prev => ({
      ...prev,
      open: false,
    }));
  };

  const drugAdminColumns = [
    {
      name: "S/N",
      key: "_id",
      selector: (row, i) => i + 1,
      description: "Enter name of band",
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Date",
      key: "treatment_action",
      description: "Enter name of band",
      selector: row => {
        return moment(row?.treatment_action[0]?.createdat).format("L");
      },
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
    },

    {
      name: "Medication",
      key: "order",
      description: "Enter name of Facility",
      selector: row => row.order,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Instructions",
      key: "instruction",
      selector: row => row.instruction,
      description: "Enter name of band",
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Status",
      key: "treatment_status",
      description: "Enter name of band",
      selector: row => row.treatment_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
    },
    {
      name: "Last Administered",
      key: "facility",
      description: "Enter name of Facility",
      selector: row =>
        row.treatment_action[0]?.createdat && (
          <>{moment(row?.treatment_action[0]?.createdat).format("L")}</>
        ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
    },
    {
      name: "Latest Comments",
      key: "treatment_action",
      selector: row => row.treatment_action[0]?.comments,
      description: "Enter name of band",
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Administered By",
      key: "name",
      description: "Enter name of band",
      selector: row => row.treatment_action[0]?.actorname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "New Comment",
      key: "facility",
      description: "Enter name of Facility",
      selector: (row, i) => (
        <Box sx={{width: "200px"}}>
          <RefInput
            sx={{width: "100%"}}
            type="text"
            name={i}
            inputRef={refs[i]}
            placeholder="write here...."
          />
        </Box>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "220px",
      center: true,
    },
    {
      name: "Actions",
      key: "facility",
      description: "Enter name of Facility",
      selector: "treatment_status",
      cell: (row, i) => (
        <div>
          <GlobalCustomButton onClick={event => handleClick(event, row, i)}>
            Actions
            <ArrowDropDownIcon fontSize="small" sx={{marginLeft: "2px"}} />
          </GlobalCustomButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={
                row.treatment_status === "Cancelled"
                  ? {
                      backgroundColor: "#e76f51",
                      pointerEvents: "none",
                      "&:hover": {
                        backgroundColor: "#e76f51",
                      },
                    }
                  : {}
              }
              onClick={() => {
                if (row.treatment_status === "Cancelled") return handleClose();

                handleConfirmAdminister();
                //handleAdminister(selectedRow.row, selectedRow.index);
                handleClose();
              }}
            >
              Administer
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleHistory(selectedRow.row, selectedRow.index);
                handleClose();
              }}
            >
              History
            </MenuItem>

            <MenuItem
              sx={
                row.treatment_status === "Cancelled"
                  ? {
                      backgroundColor: "#e76f51",
                      pointerEvents: "none",
                      "&:hover": {
                        backgroundColor: "#e76f51",
                      },
                    }
                  : {}
              }
              onClick={() => {
                if (row.treatment_status === "Cancelled") return handleClose();

                handleConfirmDiscontinue();
                handleClose();
              }}
            >
              Discountinue
            </MenuItem>

            <MenuItem
              sx={
                row.treatment_status === "Cancelled"
                  ? {
                      backgroundColor: "#e76f51",
                      pointerEvents: "none",
                      "&:hover": {
                        backgroundColor: "#e76f51",
                      },
                    }
                  : {}
              }
              onClick={() => {
                if (row.treatment_status === "Cancelled") return handleClose();

                handleConfirmDrop();
                handleClose();
              }}
            >
              Drop
            </MenuItem>
          </Menu>
        </div>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "120px",
      center: true,
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.treatment_status === "Cancelled",
      style: {
        backgroundColor: "#fed9b7",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "90vw",
          maxHeight: "80vh",
        }}
      >
        <CustomConfirmationDialog
          open={confirmationDialog.open}
          message={confirmationDialog.message}
          confirmationAction={() =>
            confirmationDialog.action(selectedRow.row, selectedRow.index)
          }
          cancelAction={handleCloseConfirmDialog}
          type={confirmationDialog.type}
        />
        <TableMenu>
          <div style={{display: "flex", alignItems: "center"}}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{marginLeft: "10px", fontSize: "0.8rem"}}>
              List of Prescriptions
            </h2>
          </div>

          {!standalone && (
            <GlobalCustomButton onClick={handleCreateNew}>
              <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
              Add
            </GlobalCustomButton>
          )}
        </TableMenu>

        <Box>
          <CustomTable
            title={""}
            columns={drugAdminColumns}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={false}
            CustomEmptyData={
              <Typography sx={{fontSize: "0.85rem"}}>
                No Presciptions found......
              </Typography>
            }
            conditionalRowStyles={conditionalRowStyles}
          />
        </Box>
      </Box>

      <ModalBox
        open={hxModal}
        onClose={handlecloseModal1}
        header="Drug Admin History"
      >
        <DrugAdminHistory currentMed={currentMed} />
      </ModalBox>
    </>
  );
}

export const DrugAdminHistory = ({currentMed}) => {
  const historyColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },

    {
      name: "Date/Time",
      key: "Date",
      description: "date",
      selector: row => dayjs(row?.createdAt).format("DD-MM-YYYY"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
    },

    {
      name: "Action",
      key: "action",
      description: "action",
      selector: row => row.action,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
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
      <Box
        sx={{
          width: "800px",
          display: "flex",
          flexDirection: "column",
        }}
        gap={1.5}
      >
        <Box>
          <FormsHeaderText text={currentMed.order} />
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Input
              label="Ordered By"
              defaultValue={currentMed.requestingdoctor_Name}
              disabled={true}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              label="Time Ordered"
              defaultValue={`${formatDistanceToNowStrict(
                new Date(currentMed.createdAt),
                {
                  addSuffix: true,
                }
              )}-${moment(currentMed.createdAt).format("L")}`}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12}>
            <Textarea
              label="Intructions"
              defaultValue={currentMed.instruction}
              disabled={true}
            />
          </Grid>
        </Grid>

        {currentMed.hasOwnProperty("treatment_action") && (
          <Box>
            <CustomTable
              title={""}
              columns={historyColumns}
              data={currentMed.treatment_action}
              //onRowClicked={handleRow}
              pointerOnHover
              highlightOnHover
              striped
              CustomEmptyData={
                <Typography sx={{fontSize: "0.8rem"}}>
                  No Drug Admin History listed......
                </Typography>
              }
            />
          </Box>
        )}
      </Box>
    </>
  );
};

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

export function MedicationHelperSearch({
  id,
  getSearchfacility,
  clear,
  disable = false,
  label,
}) {
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
  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);

  const getInitial = async id => {
    console.log(id);
    if (!!id) {
      let obj = {
        categoryname: id,
      };
      console.log(obj);
      handleRow(obj);
    }
  };

  useEffect(() => {
    getInitial(id);
    return () => {};
  }, []);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")

    await setSimpa(obj.medication);
    getSearchfacility(obj);
    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };

  const handleAddproduct = () => {
    let obj = {
      medication: val,
    };
    //console.log(obj);
    setSimpa(val);
    handleRow(obj);

    // setProductModal(true)
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

  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };

  useEffect(() => {
    if (clear) {
      console.log("success has changed", clear);
      setSimpa("");
    }
    return () => {};
  }, [clear]);

  return (
    <div>
      <Autocomplete
        size="small"
        value={simpa}
        onChange={(event, newValue, reason) => {
          if (reason === "clear") {
            setSimpa("");
          } else {
            if (typeof newValue === "string") {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                handleAddproduct();
              });
            } else if (newValue && newValue.inputValue) {
              handleAddproduct();
            } else {
              handleRow(newValue);
            }
          }
        }}
        id="free-solo-dialog-demo"
        options={facilities}
        getOptionLabel={option => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.medication;
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option._id === value._id
        }
        onInputChange={(event, newInputValue) => {
          handleSearch(newInputValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              medication: `Use "${params.inputValue}" as Default"`,
            });
          }

          return filtered;
        }}
        inputValue={val}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        noOptionsText={val !== "" ? `${val} Not Found` : "Type something"}
        renderOption={(props, option) => (
          <li {...props} style={{fontSize: "0.75rem"}}>
            {option.medication}
          </li>
        )}
        sx={{
          width: "100%",
        }}
        freeSolo={false}
        renderInput={params => (
          <TextField
            {...params}
            label={label || "Search for Product"}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem",
              backgroundColor: "#ffffff",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: {color: "#2d2d2d"},
            }}
          />
        )}
      />
    </div>
  );
}
