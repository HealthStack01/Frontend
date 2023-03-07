/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
//import {clinicListSchema} from "./schema";
// eslint-disable-next-line
const searchfacility = {};

export default function Clinic() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClinic, setSelectedClinic] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Clinic  Module</span></div>
            </div> */}

      {state.ClinicModule.show === "list" && <ClinicList />}

      {state.ClinicModule.show === "create" && <ClinicCreate />}
      {state.ClinicModule.show === "detail" && <ClinicDetail />}
      {state.ClinicModule.show === "modify" && (
        <ClinicModify Clinic={selectedClinic} />
      )}
    </section>
  );
}

export function ClinicCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClinicServ = client.service("location");

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
    //setFacility(user.activeClinic.FacilityId)//
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
    data.locationType = "Clinic";
    ClinicServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Clinic successfully") */
        setSuccess(true);
        toast({
          message: "Clinic created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: "Error creating Clinic " + err,
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
          <p className="card-header-title">Create Clinic</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small" {...register("x",{required: true})}  name="ClinicType" type="text" placeholder="Type of Clinic" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                </div> */}
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x", {required: true})}
                  name="name"
                  type="text"
                  placeholder="Name of Clinic"
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

export function ClinicList({standalone, closeModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClinicServ = client.service("location");
  const oldpeopleServ = client.service("oldapmispeople");
  const oldpatientServ = client.service("oldapmispatient");
  const foremost = client.service("foremost");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClinic, setSelectedClinic] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    const newClinicModule = {
      selectedClinic: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClinicModule: newClinicModule,
    }));
    //console.log(state)
  };
  const handleRow = async Clinic => {
    //console.log("b4",state)

    //console.log("handlerow",Clinic)

    await setSelectedClinic(Clinic);

    const newClinicModule = {
      selectedClinic: Clinic,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClinicModule: newClinicModule,
    }));
    //console.log(state)
    closeModal();
  };

  const handleSearch = val => {
    const field = "name";
    console.log(val);
    ClinicServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id || "",
        locationType: "Clinic",
        $limit: 10,
        $sort: {
          name: 1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Clinic  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Clinic, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      const findClinic = await ClinicServ.find({
        query: {
          locationType: "Clinic",
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 20,
          $sort: {
            name: 1,
          },
        },
      });

      await setFacilities(findClinic.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findClinic = await ClinicServ.find({
          query: {
            locationType: "Clinic",
            $limit: 20,
            $sort: {
              name: 1,
            },
          },
        });

        await setFacilities(findClinic.data);
        setLoading(false);
      }
    }
    /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Clinic  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Clinic, probable network issues "+ err )
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
    ClinicServ.on("created", obj => getFacilities());
    ClinicServ.on("updated", obj => getFacilities());
    ClinicServ.on("patched", obj => getFacilities());
    ClinicServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  const handleLoad = async () => {
    console.log("something"); //5bb5f0538a2a1e386cc10b2e
    let people = [];
    //1.create blank database
    // oldpeopleServ.create({})
    // oldpatientServ.create({})
    //delete default
    //find foremost base patients
    const findClinic = await oldpatientServ
      .find({
        query: {
          facilityId: "5bb5f0538a2a1e386cc10b2e",
        },
      })
      .then(resp => {
        console.log(resp);
      })

      .catch(err => console.log(err));

    console.log("done");
    // await setFacilities(findClinic.data)
    //take their clients
    //save into healthstack vs import
    //replace facility id for foremost
  };

  const clinicListSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Name",
      key: "name",
      description: "Name",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Location",
      key: "location",
      description: "Location",
      selector: row => row.locationType,
      sortable: true,
      required: true,
      inputType: "TEXT",
      omit: standalone,
    },
  ];

  const employeeLocations = user.currentEmployee.locations || [];

  return (
    <>
      {user ? (
        <>
          <div className="level">
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
                    List of Clinics
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
              <div style={{width: "100%", overflowY: "auto"}}>
                <CustomTable
                  title={""}
                  columns={clinicListSchema}
                  data={employeeLocations.filter(
                    item => item.locationType === "Clinic"
                  )}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRow}
                  progressPending={false}
                />
              </div>
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function ClinicDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ClinicServ=client.service('/Clinic')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);

  const Clinic = state.ClinicModule.selectedClinic;

  const handleEdit = async () => {
    const newClinicModule = {
      selectedClinic: Clinic,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClinicModule: newClinicModule,
    }));
    //console.log(state)
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Clinic Details</p>
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
                    {Clinic.name}{" "}
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
                  <span className="is-size-7 padleft" name="ClinicType">
                    {Clinic.locationType}{" "}
                  </span>
                </td>
              </tr>
              {/*   <tr>
                    <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>Profession: 
                
                    
                    </label>
                    </td>
                <td>
                <span className="is-size-7 padleft "  name="ClinicCity">{Clinic.profession}</span> 
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
                        <span className="is-size-7 padleft "  name="ClinicContactPhone" >{Clinic.phone}</span>
                        </td>
                  </tr>
                    <tr><td>
            
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>Email:                     
                    
                         </label></td><td>
                         <span className="is-size-7 padleft "  name="ClinicEmail" >{Clinic.email}</span>
                         </td>
             
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i></span>Department:
                    
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft "  name="ClinicOwner">{Clinic.department}</span>
                    </td>
               
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>Departmental Unit:              
                    
                </label></td>
                <td>
                <span className="is-size-7 padleft "  name="ClinicType">{Clinic.deptunit}</span>
                </td>
              
                </tr> */}

              {/*   <div className="field">
             <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>Category:              
                    <span className="is-size-7 padleft "  name= "ClinicCategory">{Clinic.ClinicCategory}</span>
                </label>
                 </div> */}
            </tbody>
          </table>

          <div className="field mt-2">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Edit
              </button>
            </p>
          </div>
          {error && <div className="message"> {message}</div>}
        </div>
      </div>
    </>
  );
}

export function ClinicModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClinicServ = client.service("location");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const Clinic = state.ClinicModule.selectedClinic;

  useEffect(() => {
    setValue("name", Clinic.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("locationType", Clinic.locationType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", Clinic.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Clinic.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Clinic.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Clinic.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Clinic.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("ClinicCategory", Clinic.ClinicCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  });

  const handleCancel = async () => {
    const newClinicModule = {
      selectedClinic: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClinicModule: newClinicModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newClinicModule = {
      selectedClinic: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, ClinicModule: newClinicModule}));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Clinic._id;
    if (conf) {
      ClinicServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Clinic successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Clinic deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Clinic, probable network issues "+ err )
          // setError(true)
          toast({
            message: "Error deleting Clinic, probable network issues or " + err,
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
    data.facility = Clinic.facility;
    //console.log(data);

    ClinicServ.patch(Clinic._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Clinic successfully")
        toast({
          message: "Clinic updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Clinic, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Clinic, probable network issues or " + err,
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
          <p className="card-header-title">Clinic Details-Modify</p>
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
                    name="ClinicType"
                    type="text"
                    placeholder="Clinic Type"
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
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="Clinic Email"/>
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
                    <input className="input is-small" {...register("x",{required: true})} name="ClinicCategory" type="text" placeholder="Clinic Category"/>
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
            {/* <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
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
