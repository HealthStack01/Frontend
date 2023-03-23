/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {PageWrapper} from "../../ui/styled/styles";
import * as yup from "yup";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import Grid from "@mui/system/Unstable_Grid/Grid";
import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "../../components/modal";
import CustomSelect from "../../components/inputs/basic/Select";
import {BottomWrapper, GrayWrapper, GridBox, GridWrapper} from "../app/styles";
import {HeadWrapper} from "../app/styles";
import ViewText from "../../components/viewtext";
import {yupResolver} from "@hookform/resolvers/yup";
import {Portal} from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import Input from "../../components/inputs/basic/Input";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

import LocationView from "./LocationView";
import {LocationForm} from "./LocationForm";
// eslint-disable-next-line
const searchfacility = {};

export default function Location() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  const handleShowDetailModal = () => {
    setDetailModal(true);
  };
  const handleHideDetailModal = () => {
    setDetailModal(false);
  };

  const handleShowCreateModal = () => {
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
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Location  Module</span></div>
            </div> */}

      <LocationForm open={createModal} setOpen={handleHideCreateModal} />

      <div className="columns ">
        <div className="column is-8 ">
          <LocationList
            showCreateModal={handleShowCreateModal}
            showDetailModal={handleShowDetailModal}
          />
        </div>
        <div className="column is-4 ">
          {/* <ModalBox open={createModal} onClose={handleHideCreateModal}>
            <LocationCreate/>
          </ModalBox> */}

          <ModalBox open={detailModal} onClose={handleHideDetailModal}>
            <div>
              <LocationDetail showModifyModal={handleModifyModal} />
            </div>
          </ModalBox>
          <ModalBox open={modifyModal} onClose={handleHideModifyModal}>
            <LocationModify />
          </ModalBox>
        </div>
      </div>
    </section>
  );
}

export function LocationCreate({open, setOpen}) {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const LocationServ = client.service("location");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const locationTypeOptions = [
    "Front Desk",
    "Clinic",
    "Ward",
    "Store",
    "Laboratory",
    "Finance",
    "Theatre",
    "Pharmacy",
    "Radiology",
    "Managed Care",
  ];
  const getSearchfacility = obj => {
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
    //setFacility(user.activeLocation.FacilityId)//
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
    if (data.locationType === "") {
      alert("Kindly choose location type");
      return;
    }
    setMessage("");
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    LocationServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Location successfully") */
        setSuccess(true);
        toast({
          message: "Location created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: "Error creating Location " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card" style={{width: "50vw"}}>
        <div className="card-header">
          <p
            className="card-header-title"
            style={{fontSize: "300", fontWeight: "bold"}}
          >
            Create Location
          </p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <GridBox>
              <div className="field">
                <div className="control">
                  {/* <div className="select"> */}
                  <CustomSelect
                    label="Choose Location Type "
                    name="type"
                    options={locationTypeOptions}
                    register={register("locationType", {
                      required: true,
                    })}
                  />
                  {/* </div> */}
                </div>
              </div>

              <Input
                {...register("name", {required: true})}
                name="typename"
                type="text"
                placeholder="Name of Location"
              />
            </GridBox>
            <GridBox>
              <div
                className="field"
                style={!user.stacker ? {display: "none"} : {}}
              >
                <InputSearch
                  getSearchfacility={getSearchfacility}
                  clear={success}
                />

                <Input
                  {...register("facility", {required: true})}
                  name="typename"
                  type="text"
                  placeholder="Facility"
                />
              </div>
            </GridBox>
            <GlobalCustomButton type="submit">
              <CreateIcon fontSize="small" sx={{marginRight: "5px"}} />
              Create Location
            </GlobalCustomButton>
          </form>
        </div>
      </div>
    </>
  );
}

export function LocationList({showCreateModal, showDetailModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const LocationServ = client.service("location");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleCreateNew = async () => {
    const newLocationModule = {
      selectedLocation: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      LocationModule: newLocationModule,
    }));
    //console.log(state)
  };
  const handleRow = async Location => {
    //console.log("b4",state)

    //console.log("handlerow",Location)

    await setSelectedLocation(Location);

    const newLocationModule = {
      selectedLocation: Location,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      LocationModule: newLocationModule,
    }));
    showDetailModal();
    //console.log(state)
  };
  const handleRowClicked = async (row) => {
    setSelectedLocation(row);
    const newLocationModule = {
      selectedLocation: row,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      LocationModule: newLocationModule,
    }));
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSearch = val => {
    setLoading(true);
    const field = "name";
    //console.log(val);
    LocationServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setLoading(false);
        setMessage(" Location  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setMessage("Error fetching Location, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      const findLocation = await LocationServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findLocation.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findLocation = await LocationServ.find({
          query: {
            $limit: 200,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findLocation.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

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
    LocationServ.on("created", obj => getFacilities());
    LocationServ.on("updated", obj => getFacilities());
    LocationServ.on("patched", obj => getFacilities());
    LocationServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  const LocationSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "Enter name of location",
      sortable: true,
      selector: row => row.sn,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Name of Location",
      key: "name",
      description: "Enter name of Location",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter name of Location"),
    },
    {
      name: "Location Type",
      key: "locationType",
      description: "Enter name of Location",
      selector: row => row.locationType,
      sortable: true,
      required: true,
      inputType: "SELECT_LIST",
      options: ["Front Desk", "Clinic", "Store", "Laboratory", "Finance"],
      validator: yup.string().required("Choose a Location Type"),
    },
  ];

  return (
    <>
      {user ? (
        <>
          <Portal>
            <ModalBox open={open} header="Location Details" onClose={handleCloseModal} width="80%">
              <LocationView
                location={selectedLocation}
                open={open}
                setOpen={handleCloseModal}
              />
            </ModalBox>
          </Portal>
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
                  Employee Locations
                </h2>
              </div>

              {handleCreateNew && (
                <GlobalCustomButton onClick={showCreateModal}>
                  <ControlPointIcon
                    fontSize="small"
                    sx={{marginRight: "5px"}}
                  />
                  Add New
                </GlobalCustomButton>
              )}
            </TableMenu>

            <div
              style={{
                width: "100%",
                height: "calc(100vh - 170px)",
                overflow: "auto",
              }}
            >
              <CustomTable
                title={""}
                columns={LocationSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRowClicked}
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

export function LocationDetail({showModifyModal}) {
  const {register, handleSubmit, watch, setValue, reset} = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const LocationServ=client.service('/Location')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const [showSub, setShowSub] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const {state, setState} = useContext(ObjectContext);
  const [editClient, setEditClient] = useState(false);

  const LocationServ = client.service("location");

  const sublocationTypeOptions = ["Bed", "Unit"];

  const Location = state.LocationModule.selectedLocation;

  const handleEdit = async () => {
    const newLocationModule = {
      selectedLocation: Location,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      LocationModule: newLocationModule,
    }));
    //console.log(state)
    showModifyModal();
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Location._id;
    if (conf) {
      LocationServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Band successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Band deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Band, probable network issues "+ err )
          // setError(true)
          toast({
            message: "Error deleting Band, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };
  const handleSublocation = () => {
    setShowSub(true);
    // show popup to create new sublocation.
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (data.type === "" || data.typeName === "") {
      alert("Kindly enter missing data ");
      return;
    }

    // console.log(data);
  
    if (!Location.sublocations) {
      Location.sublocations = [];
    }

    Location.sublocations.push(data);
    reset();
    setShowUpdate(true);
  };

  const handleUpdate = () => {
    LocationServ.patch(Location._id, Location)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Location successfully")
        toast({
          message: "Location updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        setShowUpdate(false);
      })
      .catch(err => {
        //setMessage("Error creating Location, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Location, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };
  const LocationDetailSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "sn",
      sortable: true,
      selector: row => row.sn,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Type",
      key: "typeName",
      description: " Enter typeName",
      selector: row => row.type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Name",
      key: "key",
      description: "Enter name ",
      selector: row => row.typeName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  // console.log(Location.sublocations);

  return (
    <GrayWrapper>
      <HeadWrapper>
        {/* <div>
          <h2>Location Details</h2>
          <span>Location Detail of {Location.name}</span>
        </div> */}

        <BottomWrapper>
          <GlobalCustomButton onClick={handleDelete} color="error">
            <DeleteIcon fontSize="small" sx={{marginRight: "5px"}} />
            Delete
          </GlobalCustomButton>

          <GlobalCustomButton onClick={handleEdit}>
            <CreateIcon fontSize="small" sx={{marginRight: "5px"}} />
            Edit
          </GlobalCustomButton>
        </BottomWrapper>
      </HeadWrapper>
      <GridWrapper className="two-columns">
        <ViewText label="Name" text={Location.name} />
        <ViewText label="Location Type" text={Location.locationType} />
      </GridWrapper>

      {/* <Grid item xs={12} sm={3} md={4}>
        <span
          style={{
            color: " #0364FF",
            fontSize: "20px",
            marginRight: ".8rem",
          }}
        >
          Sublocations:
        </span>
      </Grid> */}
      {(Location.sublocations?.length > 0 || showSub) && (
        <>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select is-small ">
                        <CustomSelect
                          label="Choose Sub-location Type"
                          name="type"
                          options={sublocationTypeOptions}
                          register={register("type", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {Location.sublocations?.length > 0 && (
            <div>
              <CustomTable
                title={""}
                columns={LocationDetailSchema}
                data={Location.sublocations}
                pointerOnHover
                highlightOnHover
                striped
                progressPending={false}
              />
            </div>
          )}
        </>
      )}
      {!showSub && (
        <p
          className={
            Location.sublocations?.length > 0 ? "is-hidden control" : " control"
          }
        >
          <GlobalCustomButton
            type="submit"
            onClick={handleSublocation}
            style={{
              position: "relative",
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CreateIcon fontSize="small" sx={{marginRight: "5px"}} />
            Create Sublocation
          </GlobalCustomButton>
        </p>
      )}
      {showUpdate && (
        <BottomWrapper>
          <GlobalCustomButton onClick={handleUpdate}>
            <CreateIcon fontSize="small" sx={{marginRight: "5px"}} />
            Update
          </GlobalCustomButton>
        </BottomWrapper>
      )}
    </GrayWrapper>
  );
}

export function LocationModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const LocationServ = client.service("location");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const Location = state.LocationModule.selectedLocation;

  useEffect(() => {
    setValue("name", Location.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("locationType", Location.locationType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", Location.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Location.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Location.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Location.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Location.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("LocationCategory", Location.LocationCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  }, []);

  const handleCancel = async () => {
    const newLocationModule = {
      selectedLocation: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      LocationModule: newLocationModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newLocationModule = {
      selectedLocation: {},
      show: "create",
    };
    setState(prevstate => ({
      ...prevstate,
      LocationModule: newLocationModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Location._id;
    if (conf) {
      LocationServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Location successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Location deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Location, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              "Error deleting Location, probable network issues or " + err,
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
    data.facility = Location.facility;
    //console.log(data);

    LocationServ.patch(Location._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Location successfully")
        toast({
          message: "Location updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Location, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Location, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <GrayWrapper>
        <HeadWrapper>
          <p className="card-header-title">Location Details-Modify</p>
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", {required: true})}
            name="name"
            type="text"
            label="Name"
            placeholder="Name"
          />

          <Input
            {...register("locationType", {required: true})}
            name="locationType"
            type="text"
            label="Location Type"
            placeholder="Location Type"
          />
        </form>
        <BottomWrapper>
          <GlobalCustomButton type="submit" onClick={handleSubmit}>
            {" "}
            <CheckIcon fontSize="small" sx={{marginRight: "5px"}} />
            Save
          </GlobalCustomButton>

          <GlobalCustomButton type="submit" onClick={handleCancel}>
            <CloseIcon fontSize="small" sx={{marginRight: "5px"}} />
            Cancel
          </GlobalCustomButton>

          <GlobalCustomButton type="submit" onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{marginRight: "5px"}} />
            Delete
          </GlobalCustomButton>
        </BottomWrapper>
      </GrayWrapper>
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
