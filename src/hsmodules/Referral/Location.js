/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
// eslint-disable-next-line
const searchfacility = {};

export default function Location() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Location  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-8 ">
          <LocationList />
        </div>
        <div className="column is-4 ">
          {state.LocationModule.show === "create" && <LocationCreate />}
          {state.LocationModule.show === "detail" && <LocationDetail />}
          {state.LocationModule.show === "modify" && (
            <LocationModify Location={selectedLocation} />
          )}
        </div>
      </div>
    </section>
  );
}

export function LocationCreate() {
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
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Create Location</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small"  {...register("x",{required: true})}  name="locationType" type="text" placeholder="Type of Location" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                </div> */}
            <div className="field">
              <div className="control">
                <div className="select is-small ">
                  <select
                    name="locationType"
                    {...register("x", {required: true})}
                    /* onChange={(e)=>handleChangeMode(e.target.value)} */ className="selectadd"
                  >
                    <option value="">Choose Location Type </option>
                    {locationTypeOptions.map((option, i) => (
                      <option key={i} value={option}>
                        {" "}
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x", {required: true})}
                  name="name"
                  type="text"
                  placeholder="Name of Location"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-map-signs"></i>
                </span>
              </p>
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
                  ref={register({required: true})}
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
            <div className="field">
              <p className="control">
                <button className="button is-success is-small">Create</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export function LocationList() {
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
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

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
    //console.log(state)
  };

  const handleSearch = val => {
    const field = "name";
    console.log(val);
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
        setMessage(" Location  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Location, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
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
      }
    }
    /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Location  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Location, probable network issues "+ err )
                    setError(true)
                }) */
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

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <p className="control has-icons-left  ">
                    <DebounceInput
                      className="input is-small "
                      type="text"
                      placeholder="Search Locations"
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
                List of Locations{" "}
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
          </div>
          <div className="table-container pullup ">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>
                  <th>Name</th>
                  <th>
                    <abbr title="Last Name">Location Type</abbr>
                  </th>
                  {/*<th><abbr title="Profession">Profession</abbr></th>
                                         <th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th>
                                        <th><abbr title="Department">Department</abbr></th>
                                        <th><abbr title="Departmental Unit">Departmental Unit</abbr></th> */}
                  {user.stacker && (
                    <th>
                      <abbr title="Facility">Facility</abbr>
                    </th>
                  )}
                  {/* <th><abbr title="Actions">Actions</abbr></th> */}
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {facilities.map((Location, i) => (
                  <tr
                    key={Location._id}
                    onClick={() => handleRow(Location)}
                    className={
                      Location._id === (selectedLocation?._id || null)
                        ? "is-selected"
                        : ""
                    }
                  >
                    <th>{i + 1}</th>
                    <th>{Location.name}</th>
                    <td>{Location.locationType}</td>
                    {/*< td>{Location.profession}</td>
                                            <td>{Location.phone}</td>
                                            <td>{Location.email}</td>
                                            <td>{Location.department}</td>
                                            <td>{Location.deptunit}</td> */}
                    {user.stacker && <td>{Location.facility}</td>}
                    {/*  <td><span   className="showAction"  >...</span></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function LocationDetail() {
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

    console.log(data);
    /*   if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          } */
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

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Location Details</p>
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
                    Name:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    {" "}
                    {Location.name}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="label is-small">
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                    Location Type:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="LocationType">
                    {Location.locationType}{" "}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {(Location.sublocations?.length > 0 || showSub) && (
            <>
              <label className="label is-size-7 mt-2">Sublocations:</label>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="field is-horizontal">
                    <div class="field-body">
                      <div className="field">
                        <div className="control">
                          <div className="select is-small ">
                            <select
                              name="type"
                              {...register("x", {required: true})}
                              /* onChange={(e)=>handleChangeMode(e.target.value)} */ className="selectadd"
                            >
                              <option value="">
                                Choose Sub-location Type{" "}
                              </option>
                              {sublocationTypeOptions.map((option, i) => (
                                <option key={i} value={option}>
                                  {" "}
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <p className="control has-icons-left has-icons-right">
                          <input
                            className="input is-small"
                            {...register("x", {required: true})}
                            name="typeName"
                            type="text"
                            placeholder="Name of Sub-location"
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                          </span>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control">
                          <button className="button is-success is-small selectadd">
                            Add
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {Location.sublocations?.length > 0 && (
                <div>
                  <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                    <thead>
                      <tr>
                        <th>
                          <abbr title="Serial No">S/No</abbr>
                        </th>
                        <th>
                          <abbr title="Type">Type</abbr>
                        </th>
                        <th>
                          <abbr title="Name">Name</abbr>
                        </th>
                      </tr>
                    </thead>
                    <tfoot></tfoot>
                    <tbody>
                      {Location.sublocations?.map((ProductEntry, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{ProductEntry.type}</td>
                          <td>{ProductEntry.typeName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          <div className="field mt-2  is-grouped">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Edit
              </button>
            </p>
            {!showSub && (
              <p
                className={
                  Location.sublocations?.length > 0
                    ? "is-hidden control"
                    : " control"
                }
              >
                <button
                  className="button is-info is-small"
                  onClick={handleSublocation}
                >
                  Create Sublocation
                </button>
              </p>
            )}
            {showUpdate && (
              <p className="control">
                <button
                  className="button is-info is-small"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
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
  });

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
    setState(prevstate => ({...prevstate, LocationModule: newLocationModule}));
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
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Location Details-Modify</p>
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
                Location Type
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    {...register("x", {required: true})}
                    disabled
                    name="locationType"
                    type="text"
                    placeholder="Location Type"
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
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="Location Email"/>
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
                    <input className="input is-small" {...register("x",{required: true})} name="LocationCategory" type="text" placeholder="Location Category"/>
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
