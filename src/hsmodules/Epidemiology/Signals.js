/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {format, formatDistanceToNowStrict} from "date-fns";
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import "leaflet.markercluster";

import "./App.css";
// eslint-disable-next-line

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import CustomSelect from "../../components/inputs/basic/Select";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../components/inputs/basic/Textarea";
import Input from "../../components/inputs/basic/Input";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ModalBox from "../../components/modal";
/* import *  as hospData from "../../data/nigeriahealthfacilities.json" */

import "leaflet/dist/leaflet.css";
import {Box} from "@mui/system";
import LocationSearch from "../helpers/LocationSearch";
import EmployeeSearch from "../helpers/EmployeeSearch";
import {FacilitySearch} from "../helpers/FacilitySearch";
import {Grid} from "@mui/material";
import dayjs from "dayjs";
// let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow
// });
const data = [] //require("../../data/hci/nigeriahealthfacilities.json");
// L.Marker.prototype.options.icon =DefaultIcon;

const searchfacility = {};

export default function EpidemiologySignals() {
  const {state} = useContext(ObjectContext); //,setState
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState({});

  const handleShowDetailModal = () => {
    setDetailModal(true);
  };

  const handleHideDetailModal = () => {
    setDetailModal(false);
  };
  const handleCreateModal = () => {
    setCreateModal(true);
  };

  const handleHideCreateModal = () => {
    setCreateModal(false);
  };
  const handleModifyModal = () => {
    setModifyModal(true);
  };

  const handleHideModifyModal = () => {
    setModifyModal(false);
  };

  return (
    <section className="section remPadTop">
      <div>
        <SignalsList
          showCreateModal={handleCreateModal}
          showDetailModal={handleShowDetailModal}
          setSelectedSigal={setSelectedSignal}
        />
        {/* <ModalBox  open={createModal} onClose={handleHideCreateModal}>
          <SignalCreate />
        </ModalBox> */}

        <ModalBox
          open={detailModal}
          onClose={handleHideDetailModal}
          header={`Details for Signal Created on ${dayjs(
            selectedSignal?.createdAt
          ).format("DD/MM/YYYY hh:mm ")}`}
        >
          <SignalDetail showModifyModal={handleModifyModal} />
        </ModalBox>
        {/* <ModalBox open={modifyModal} onClose={handleHideModifyModal}>
          <SignalModify />
        </ModalBox> */}
      </div>
    </section>
  );
}

export function SignalCreate() {
  const {register, handleSubmit, setValue, control} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const StoreServ = client.service("location");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();

  const getSearchfacility = obj => {
    // buble-up from inputsearch for creating resource

    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeStore.FacilityId)//
    if (!user.stacker) {
      console.log(currentUser);
      setValue("facility", user.currentEmployee.facilityDetail._id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    data.locationType = "Laboratory";
    StoreServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Store successfully") */
        setSuccess(true);
        toast({
          message: "Laboratory created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: "Error creating Laboratory " + err,
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
          <p className="card-header-title">Create Laboratory</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{paddingBottom: "1rem"}}>
              <MuiCustomDatePicker
                label="Date"
                register={register("date", {required: true})}
                name="date"
                control={control}
              />
            </div>
            <div style={{paddingBottom: "1rem"}}>
              <CustomSelect
                label="Disease"
                name="status"
                options={["Measles", "Covid-19", "Cholera"]}
                register={register("disease", {required: true})}
              />
            </div>
            <div style={{paddingBottom: "1rem"}}>
              <LocationSearch />
            </div>
            <div style={{paddingBottom: "1rem"}}>
              <FacilitySearch />
            </div>
            <div style={{paddingBottom: "1rem"}}>
              <EmployeeSearch />
            </div>
            <div style={{paddingBottom: "1rem"}}>
              <Input
                register={register("notification", {required: true})}
                name="notificaton"
                type="text"
                label="Notification Type"
              />
            </div>
            <div style={{paddingBottom: "1rem"}}>
              <CustomSelect
                label="Status"
                name="status"
                options={[
                  "Comfirmed",
                  "Uncomfirmed",
                  "Suspected",
                  "Unsuspected",
                ]}
              />
            </div>
            <div style={{paddingBottom: "1rem"}}>
              <CustomSelect
                label="Status"
                name="status"
                options={["Attended", "Unattended"]}
              />
            </div>
            <div style={{paddingBottom: "1rem"}}>
              <EmployeeSearch />
            </div>
            {/*  <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="profession" type="text" placeholder="Profession"/>
                    <span className="icon is-small is-left">
                    <i className=" fas fa-user-md "></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="phone" type="text" placeholder=" Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
            </div>
           
            <div className="field">
                <p className="control has-icons-left">
                
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="Email"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div> */}
            <div
              className="field"
              style={!user.stacker ? {display: "none"} : {}}
            >
              <InputSearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
              <p className="control has-icons-left " style={{display: "none"}}>
                <input
                  className="input is-small"
                  {...register("x", {required: true})}
                  name="facility"
                  type="text"
                  placeholder="Facility"
                />
                <span className="icon is-small is-left">
                  <i className="fas  fa-map-marker-alt"></i>
                </span>
              </p>
            </div>
            {/*  <div className="field">
                <div className="control has-icons-left">
                    <div className="dropdown ">
                        <div className="dropdown-trigger">
                            <input className="input is-small" {...register("x",{required: true})} name="department" type="text" placeholder="Department"/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-hospital-symbol"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">
                                    simpa
                                </div>
                                <div className="dropdown-item is-active">
                                    simpa 2
                                </div>
                                <div className="dropdown-item">
                                    simpa 3
                                </div>
                                <div className="dropdown-item">
                                    simpa 4
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="deptunit" type="text" placeholder="Department Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="password" type="text" placeholder="password"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div> */}
            <div>
              <GlobalCustomButton>
                <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Create
              </GlobalCustomButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export function SignalsList({setSelectedSigal, showDetailModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const StoreServ = client.service("epidalerts");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedStore, setSelectedStore] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  const handleCreateNew = async () => {
    const newStoreModule = {
      selectedStore: {},
      show: "create",
    };
    await setState(prevstate => ({...prevstate, StoreModule: newStoreModule}));
    //console.log(state)
  };
  const handleRow = async Store => {
    //console.log("b4",state)

    //console.log("handlerow",Store)

    await setSelectedStore(Store);
    setSelectedSigal(Store);

    const newStoreModule = {
      selectedStore: Store,
      show: "detail",
    };
    //await setState(prevstate => ({...prevstate, StoreModule: newStoreModule}));
    setState(prev => ({
      ...prev,
      EpidemiologyModule: {...prev.EpidemiologyModule, selectedSignal: Store},
    }));
    //console.log(state)
    // closeModal()
    showDetailModal();
  };

  const handleSearch = val => {
    const field = "disease";
    console.log(val);
    StoreServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        /*    facility:user.currentEmployee.facilityDetail._id || "",
                locationType:"Laboratory", */
        /*  $limit:10, */
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Store  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Store, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      const findStore = await StoreServ.find({
        query: {
          /* locationType:"Laboratory", */
          /*  facility:user.currentEmployee.facilityDetail._id, */
          /*  $limit:20, */
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findStore.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findStore = await StoreServ.find({
          query: {
            /*   locationType:"Laboratory", */
            $limit: 20,
            $sort: {
              name: -1,
            },
          },
        });

        await setFacilities(findStore.data);
        setLoading(false);
      }
    }
    /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Store  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Store, probable network issues "+ err )
                    setError(true)
                }) */
  };

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    StoreServ.on("created", obj => getFacilities());
    StoreServ.on("updated", obj => getFacilities());
    StoreServ.on("patched", obj => getFacilities());
    StoreServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  const signalsSchema = [
    {
      name: "S/NO",
      width: "60px",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Date and Time",
      width: "120px",
      key: "createdAt",
      description: "Enter Date and Time",
      selector: row => dayjs(row?.createdAt).format("DD/MM/YYYY hh:mm"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Disease",
      width: "150px",
      key: "disease",
      description: "Enter Disease",
      selector: row => row?.disease,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Location",
      width: "150px",
      key: "location",
      description: "Enter Location",
      selector: row => row?.location,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Facility",
      key: "facility",
      description: "Enter Facility",
      selector: row => (row?.facility ? row?.facility : "----------------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Notified By",
      width: "120px",
      key: "notified_by",
      description: "Enter Notified by",
      selector: row => row?.notified_by_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Notification Type",
      width: "150px",
      key: "notification_type",
      description: "Enter Notification Type",
      selector: row => row?.notification_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      width: "100px",
      key: "status",
      description: "Enter Status",
      selector: row => row?.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Action",
      key: "action",
      width: "100px",
      description: "Enter Action",
      selector: row => row?.action,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Person Notified",
      key: "person_notified",
      description: "Enter Person Notified",
      selector: row => row?.person_notified,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      {user ? (
        <>
          <PageWrapper
            style={{flexDirection: "column", padding: "0.6rem 1rem"}}
          >
            <TableMenu>
              <div style={{display: "flex", alignItems: "center"}}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  Notifications
                </h2>
              </div>

              {
                handleCreateNew && null
                // <GlobalCustomButton
                // onClick={showCreateModal}
                // >
                //   <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                // Add New Signal
                // </GlobalCustomButton>
              }
            </TableMenu>

            <div style={{width: "100%", height: "600px", overflow: "auto"}}>
              <CustomTable
                title={""}
                columns={signalsSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={loading}
              />
            </div>
          </PageWrapper>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function StoreListStandalone({standalone, closeModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const StoreServ = client.service("location");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedStore, setSelectedStore] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  const handleCreateNew = async () => {
    const newStoreModule = {
      selectedStore: {},
      show: "create",
    };
    await setState(prevstate => ({...prevstate, StoreModule: newStoreModule}));
    //console.log(state)
  };
  const handleRow = async Store => {
    //console.log("b4",state)

    //console.log("handlerow",Store)

    await setSelectedStore(Store);

    const newStoreModule = {
      selectedEpid: Store,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      EpidemiologyModule: newStoreModule,
    }));
    //console.log(state)
    closeModal();
  };

  const handleSearch = val => {
    const field = "name";
    console.log(val);
    StoreServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id || "",
        locationType: "Laboratory",
        $limit: 10,
        $sort: {
          name: 1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Store  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Store, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findStore = await StoreServ.find({
        query: {
          locationType: "Laboratory",
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 20,
          $sort: {
            name: 1,
          },
        },
      });

      await setFacilities(findStore.data);
    } else {
      if (user.stacker) {
        const findStore = await StoreServ.find({
          query: {
            locationType: "Laboratory",
            $limit: 20,
            $sort: {
              name: 1,
            },
          },
        });

        await setFacilities(findStore.data);
      }
    }
    /*   .then((res)=>{
                     console.log(res)
                         setFacilities(res.data)
                         setMessage(" Store  fetched successfully")
                         setSuccess(true)
                     })
                     .catch((err)=>{
                         setMessage("Error creating Store, probable network issues "+ err )
                         setError(true)
                     }) */
  };

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      /* const localUser= localStorage.getItem("user")
                         const user1=JSON.parse(localUser)
                         console.log(localUser)
                         console.log(user1)
                         fetchUser(user1)
                         console.log(user)
                         getFacilities(user) */
    }
    StoreServ.on("created", obj => getFacilities());
    StoreServ.on("updated", obj => getFacilities());
    StoreServ.on("patched", obj => getFacilities());
    StoreServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  const storeListSchema = [
    {
      name: "S/NO",
      key: "sn",
      description: "Serial Number",
      selector: row => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Name",
      //width: "200px",
      key: "name",
      description: "Enter Name",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Action",
      //width: "200px",
      key: "clientname",
      description: "Enter Name",
      selector: row => "--------",
      sortable: true,
      required: true,
      inputType: "TEXT",
      omit: standalone ? true : false,
    },
  ];

  const employeeLocations = user.currentEmployee.locations || [];

  return (
    <>
      {user ? (
        <>
          <Box container>
            <Box item>
              <TableMenu>
                <Box sx={{display: "flex", alignItems: "center"}}>
                  {handleSearch && (
                    <Box item>
                      <FilterMenu onSearch={handleSearch} />
                    </Box>
                  )}
                  <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                    List of Laboratory
                  </h2>
                </Box>

                {!standalone && (
                  <Button
                    style={{fontSize: "14px", fontWeight: "600"}}
                    label="Add new "
                    onClick={handleCreateNew}
                  />
                )}
              </TableMenu>
            </Box>

            <Box
              item
              sx={{
                width: "100%",
                height: "calc(100% - 80px)",
                overflowY: "scroll",
              }}
            >
              <CustomTable
                title={""}
                columns={storeListSchema}
                data={employeeLocations.filter(
                  item => item.locationType !== "Laboratory"
                )}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={row => handleRow(row)}
                progressPending={false}
              />
            </Box>
          </Box>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
export function SignalDetail({showModifyModal}) {
  const StoreServ = client.service("epidalerts");
  const {control, reset, register} = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const StoreServ=client.service('/Store')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);

  const Store = state.StoreModule.selectedStore;

  useEffect(() => {
    //
    reset(state.EpidemiologyModule.selectedSignal);
  }, [state.EpidemiologyModule]);

  const confirmSignal = () => {
    showActionLoader();
    const docId = state.EpidemiologyModule.selectedSignal._id;
    StoreServ.patch(docId, {status: "Confirmed"})
      .then(res => {
        hideActionLoader();
        toast.success("Signal Sucessfully Confirmed");
        setState(prev => ({
          ...prev,
          EpidemiologyModule: {...prev.EpidemiologyModule, selectedSignal: res},
        }));
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Failed to Confirm Signal ${err}`);
      });
  };

  const unconfirmSignal = () => {
    showActionLoader();
    const docId = state.EpidemiologyModule.selectedSignal._id;
    StoreServ.patch(docId, {status: "Unconfirmed"})
      .then(res => {
        hideActionLoader();
        toast.success("Signal Sucessfully Unconfirmed");
        setState(prev => ({
          ...prev,
          EpidemiologyModule: {
            ...prev.EpidemiologyModule,
            selectedSignal: res,
          },
        }));
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Failed to Unconfirm Signal ${err}`);
      });
  };

  return (
    <Box
      sx={{
        width: "60vw",
        maxHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        mb={2}
      >
        {state?.EpidemiologyModule?.selectedSignal?.status?.toLowerCase() ===
        "confirmed" ? (
          <GlobalCustomButton onClick={unconfirmSignal}>
            Unonfirm Signal
          </GlobalCustomButton>
        ) : (
          <GlobalCustomButton onClick={confirmSignal}>
            Confirm Signal
          </GlobalCustomButton>
        )}
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={4}>
            <Input
              label="Notification Type"
              register={register("notification_type")}
              disabled
            />
          </Grid>

          <Grid item lg={4}>
            <Input
              label="Disease Name"
              register={register("disease")}
              disabled
            />
          </Grid>

          <Grid item lg={4}>
            <Input label="Status" register={register("status")} disabled />
          </Grid>

          <Grid item lg={6}>
            <Input
              label="Notified By"
              register={register("notified_by_name")}
              disabled
            />
          </Grid>

          <Grid item lg={6}>
            <Input
              label="Person Notified"
              register={register("person_notified")}
              disabled
            />
          </Grid>

          <Grid item lg={6}>
            <Input
              label="Organization"
              register={register("facility")}
              disabled
            />
          </Grid>

          <Grid item lg={6}>
            <Input
              label="Organization Location"
              register={register("location")}
              disabled
            />
          </Grid>

          <Grid item lg={12}>
            <Textarea
              label="Observations"
              register={register("location")}
              disabled
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export function SignalModify() {
  const {register, handleSubmit, setValue, reset, errors, control} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const StoreServ = client.service("location");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const Store = state.StoreModule.selectedStore;

  useEffect(() => {
    setValue("name", Store.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("locationType", Store.locationType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", Store.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Store.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Store.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Store.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Store.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("StoreCategory", Store.StoreCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  });

  const handleCancel = async () => {
    const newStoreModule = {
      selectedStore: {},
      show: "create",
    };
    await setState(prevstate => ({...prevstate, StoreModule: newStoreModule}));
    //console.log(state)
  };

  const changeState = () => {
    const newStoreModule = {
      selectedStore: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, StoreModule: newStoreModule}));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Store._id;
    if (conf) {
      StoreServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Store successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Store deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Store, probable network issues "+ err )
          // setError(true)
          toast({
            message: "Error deleting Store, probable network issues or " + err,
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
    console.log(data);
    data.facility = Store.facility;
    //console.log(data);

    StoreServ.patch(Store._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Store successfully")
        toast({
          message: "Store updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Store, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Store, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div
          className="card-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <div style={{marginRight: "4rem"}}>
            {" "}
            <p>Modify Signal</p>
          </div>
          <Box sx={{display: "flex", gap: "1rem"}}>
            <GlobalCustomButton type="submit" onClick={handleSubmit(onSubmit)}>
              Save
            </GlobalCustomButton>

            <GlobalCustomButton color="warning" onClick={handleCancel}>
              Cancel
            </GlobalCustomButton>

            <GlobalCustomButton
              color="error"
              onClick={() => handleDelete()}
              type="delete"
            >
              Delete
            </GlobalCustomButton>
          </Box>
        </div>
        <div className="card-content vscrollable">
          <div style={{paddingBottom: "1rem"}}>
            <MuiCustomDatePicker
              label="Date"
              register={register("date", {required: true})}
              name="date"
              control={control}
            />
          </div>
          <div style={{paddingBottom: "1rem"}}>
            <CustomSelect
              label="Disease"
              name="status"
              options={["Measles", "Covid-19", "Cholera"]}
              register={register("disease", {required: true})}
            />
          </div>
          <div style={{paddingBottom: "1rem"}}>
            <LocationSearch />
          </div>
          <div style={{paddingBottom: "1rem"}}>
            <FacilitySearch />
          </div>
          <div style={{paddingBottom: "1rem"}}>
            <EmployeeSearch />
          </div>
          <div style={{paddingBottom: "1rem"}}>
            <Input
              register={register("notification", {required: true})}
              name="notificaton"
              type="text"
              label="Notification Type"
            />
          </div>
          <div style={{paddingBottom: "1rem"}}>
            <CustomSelect
              label="Status"
              name="status"
              options={["Comfirmed", "Uncomfirmed", "Suspected", "Unsuspected"]}
            />
          </div>
          <div style={{paddingBottom: "1rem"}}>
            <CustomSelect
              label="Status"
              name="status"
              options={["Attended", "Unattended"]}
            />
          </div>
          <div style={{paddingBottom: "1rem"}}>
            <EmployeeSearch />
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
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="Store Email"/>
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
                    <input className="input is-small" {...register("x",{required: true})} name="StoreCategory" type="text" placeholder="Store Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
                </label>
            </div> */}
        </div>
      </div>
    </>
  );
}

export function InputSearch({getSearchfacility, clear}) {
  const facilityServ = client.service("facility");
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

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

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
  const handleBlur = async e => {
    if (count === 2) {
      console.log("stuff was chosen");
    }

    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };
  const handleSearch = async val => {
    const field = "facilityName"; //field variable

    if (val.length >= 3) {
      facilityServ
        .find({
          query: {
            //service
            [field]: {
              $regex: val,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Facilities"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
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
