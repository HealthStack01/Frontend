/* eslint-disable */
import React, {useState, useContext, useEffect} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {toast} from "bulma-toast";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {FacilitySearch} from "../helpers/FacilitySearch";

export default function OrganizationClient() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState();
  const [success, setSuccess] = useState(false);

  //const [showState,setShowState]=useState() //create|modify|detail

  //console.log("Organization parent", state)

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Organization  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-8 ">
          <OrganizationList />
        </div>
        <div className="column is-4 ">
          {/* {(state.facilityModule.show ==='create')&&<OrganizationCreate />} */}
          {state.facilityModule.show === "detail" && <OrganizationDetail />}
          {state.facilityModule.show === "modify" && (
            <OrganizationModify facility={selectedFacility} />
          )}
        </div>
      </div>
    </section>
  );
}

export function OrganizationCreate() {
  const {register, handleSubmit} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const facilityServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const [chosen, setChosen] = useState("");
  const [band, setBand] = useState("");
  const BandsServ = client.service("bands");
  const [providerBand, setProviderBand] = useState([]);
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser

  const handleChangeMode = async e => {
    await setBand(e.target.value);
  };
  /* const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
          data.createdby=user._id
          //console.log(data);
          
        facilityServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
                setMessage("Created Organization successfully")
                setSuccess(true)
            })
            .catch((err)=>{
                setMessage("Error creating facility, probable network issues "+ err )
                setError(true)
            })

      }  */
  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType:
            user.currentEmployee.facilityDetail.facilityType === "HMO"
              ? "Provider"
              : "Company",

          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      // console.log(findServices)
      await setProviderBand(findServices.data);
      // console.log(findServices)
    }
  };

  const handleClick = () => {
    //check band selected
    if (band === "") {
      toast({
        message: "Band not selected, Please select band",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    console.log(chosen);
    let stuff = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: chosen._id,
      relationshiptype: "managedcare",
      band,
    };
    orgServ
      .create(stuff)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setSuccess(true);
        toast({
          message: "Organization added succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setBand("");
      })
      .catch(err => {
        toast({
          message: "Error adding organization " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    // console.log("starting...")
    getProviderBand();
    return () => {};
  }, []);
  const getSearchfacility = obj => {
    setChosen(obj);

    /*  setCategoryName(obj.categoryname)
        setChosen2(obj) */

    if (!obj) {
      //"clear stuff"
      /*  setCategoryName("")
             setChosen2() */
    }
  };

  return (
    <>
      <div className="field is-horizontal">
        <div className="field-body">
          <div
            className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
          >
            <FacilitySearch
              getSearchfacility={getSearchfacility}
              clear={success}
            />
            <p className="control has-icons-left " style={{display: "none"}}>
              <input
                className="input is-small" /* ref={register ({ required: true }) }  */ /* add array no */ /* value={facilityId} name="facilityId" type="text" onChange={e=>setFacilityId(e.target.value)} placeholder="Product Id" */
              />
              <span className="icon is-small is-left">
                <i className="fas  fa-map-marker-alt"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <div className="control">
              <div className="select is-small ">
                <select
                  name="bandType"
                  value={band}
                  onChange={e => handleChangeMode(e)}
                  className="selectadd"
                >
                  <option value="">
                    {user.currentEmployee.facilityDetail.facilityType === "HMO"
                      ? "Choose Provider Band"
                      : "Choose Company Band"}{" "}
                  </option>
                  {providerBand.map((option, i) => (
                    <option key={i} value={option.name}>
                      {" "}
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success is-small selectadd">
                <span className="is-small" onClick={handleClick}>
                  Add
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function OrganizationList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const facilityServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const handleCreateNew = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };
  const handleRow = async facility => {
    //console.log("b4",state)

    //console.log("handlerow",facility)

    await setSelectedFacility(facility.organizationDetail);

    const newfacilityModule = {
      selectedFacility: facility,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };

  const handleSearch = val => {
    const field = "facilityName";
    console.log(val);
    if (val.length > 0) {
      orgServ
        .find({
          query: {
            /* [field]: {
                    $regex:val,
                    $options:'i'
                   
                }, */
            facility: user.currentEmployee.facilityDetail._id,
            $search: val,
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          console.log(res);
          setFacilities(res.data);
          setMessage(" Organization  fetched successfully");
          setSuccess(true);
        })
        .catch(err => {
          console.log(err);
          setMessage("Error creating facility, probable network issues " + err);
          setError(true);
        });
    } else {
      getFacilities();
    }
  };

  /*  if (val.length>2){
                console.log("in")
               
            }

        }
     */
  const getFacilities = () => {
    orgServ
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Organization  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  useEffect(() => {
    getFacilities();

    orgServ.on("created", obj => getFacilities());
    orgServ.on("updated", obj => getFacilities());
    orgServ.on("patched", obj => getFacilities());
    orgServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  return (
    <>
      {" "}
      <OrganizationCreate />
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="field">
              <p className="control has-icons-left  ">
                <DebounceInput
                  className="input is-small "
                  type="text"
                  placeholder="Search Facilities"
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
            List of Contracted Health Insurance Agent (HIA)Organizations{" "}
          </span>
        </div>
        {/*  <div className="level-right">
                        <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>
                    </div> */}
      </div>
      {/* {!!facilities[1] && */}{" "}
      <div className="table-container pullup ">
        <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
          <thead>
            <tr>
              <th>
                <abbr title="S/No">S/No</abbr>
              </th>
              <th>Organization Name</th>
              <th>
                <abbr title="Band"> Band</abbr>
              </th>
              <th>
                <abbr title="Address"> Address</abbr>
              </th>
              <th>
                <abbr title="City">City</abbr>
              </th>
              <th>
                <abbr title="Phone">Phone</abbr>
              </th>
              <th>
                <abbr title="Email">Email</abbr>
              </th>
              <th>
                <abbr title="Type">Type</abbr>
              </th>
              <th>
                <abbr title="Category">Category</abbr>
              </th>
              {/* <th><abbr title="Actions">Actions</abbr></th> */}
            </tr>
          </thead>
          <tfoot></tfoot>
          <tbody>
            {facilities.map(
              (facility, i) =>
                facility.hasOwnProperty("organizationDetail") && (
                  <>
                    <tr
                      key={i}
                      onClick={() => handleRow(facility)}
                      className={
                        facility.organizationDetail?._id ===
                        (selectedFacility?._id || null)
                          ? "is-selected"
                          : ""
                      }
                    >
                      <th>{i + 1}</th>
                      <th>{facility.organizationDetail.facilityName}</th>
                      <td>{facility.band}</td>
                      <td>{facility.organizationDetail.facilityAddress}</td>
                      <td>{facility.organizationDetail.facilityCity}</td>
                      <td>
                        {facility.organizationDetail.facilityContactPhone}
                      </td>
                      <td>{facility.organizationDetail.facilityEmail}</td>
                      <td>{facility.organizationDetail.facilityType}</td>
                      <td>{facility.organizationDetail.facilityCategory}</td>

                      {/*  <td><span   className="showAction"  >...</span></td> */}
                    </tr>
                  </>
                )
            )}
          </tbody>
        </table>
      </div>
      {/*  }  */}
    </>
  );
}

export function OrganizationDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const facilityServ=client.service('/facility')
  //const navigate=useNavigate()
  const {user, setUser} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const facility = state.facilityModule.selectedFacility;

  const handleEdit = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };
  const closeForm = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    console.log("close form");
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Organization Details</p>
          <button
            className="delete pushleft"
            aria-label="close"
            onClick={() => closeForm()}
          ></button>
        </div>
        <div className="card-content vscrollable">
          <fieldset>
            <div className="field ">
              <label className="label is-small">
                {" "}
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital"></i>
                </span>
                Name:{" "}
                <span className="is-small ">
                  {" "}
                  {facility.organizationDetail.facilityName}{" "}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-map-signs"></i>
                </span>
                Address:
                <span className="is-small ">
                  {facility.organizationDetail.facilityAddress}{" "}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                City:
                <span className="is-small ">
                  {facility.organizationDetail.facilityCity}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-phone-alt"></i>
                </span>
                Phone:
                <span className="is-small ">
                  {facility.organizationDetail.facilityContactPhone}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                Email:{" "}
                <span className="is-small ">
                  {facility.organizationDetail.facilityEmail}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                {" "}
                <span className="icon is-small is-left">
                  <i className="fas fa-user-md"></i>
                </span>
                CEO:
                <span className="is-small ">
                  {facility.organizationDetail.facilityOwner}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                {" "}
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital-symbol"></i>
                </span>
                Type:
                <span className="is-small ">
                  {facility.organizationDetail.facilityType}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-clinic-medical"></i>
                </span>
                Category:
                <span className="is-small ">
                  {facility.organizationDetail.facilityCategory}
                </span>
              </label>
            </div>
            {user.stacker && (
              <div className="field">
                <p className="control">
                  <button
                    className="button is-success is-small"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </p>
              </div>
            )}
            {error && <div className="message"> {message}</div>}
          </fieldset>
        </div>
      </div>
    </>
  );
}

export function OrganizationModify() {
  const {register, handleSubmit, setValue, reset} = useForm(); //watch, errors,
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const facilityServ = client.service("/facility");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const facility = state.facilityModule.selectedFacility;

  useEffect(() => {
    setValue("facilityName", facility.facilityName, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityAddress", facility.facilityAddress, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityCity", facility.facilityCity, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityContactPhone", facility.facilityContactPhone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityEmail", facility.facilityEmail, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityOwner", facility.facilityOwner, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityType", facility.facilityType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("facilityCategory", facility.facilityCategory, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, facilityModule: newfacilityModule}));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = facility._id;
    if (conf) {
      facilityServ
        .remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          setMessage("Deleted Organization successfully");
          setSuccess(true);
          changeState();
          setTimeout(() => {
            setSuccess(false);
          }, 200);
          changeState();
        })
        .catch(err => {
          setMessage("Error deleting facility, probable network issues " + err);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 200);
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    console.log(data);
    //data.createdby=user._id
    //console.log(data);

    facilityServ
      .update(facility._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setMessage("updated Organization successfully");
        setSuccess(true);
        changeState();
      })
      .catch(err => {
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Organization Details</p>
        </div>
        <div className="card-content vscrollable">
          {success && <div className="message"> {message}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                Name
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    {...register("x", {required: true})}
                    name="facilityName"
                    type="text"
                    placeholder="Name of Facility"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Address
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small"
                    {...register("x", {required: true})}
                    name="facilityAddress"
                    type="text"
                    placeholder="Address of Facility"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                City
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", {required: true})}
                    name="facilityCity"
                    type="text"
                    placeholder="City/Town"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Phone
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", {required: true})}
                    name="facilityContactPhone"
                    type="text"
                    placeholder="Contact Phone No"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Email
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", {required: true})}
                    name="facilityEmail"
                    type="email"
                    placeholder="Organization Email"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                CEO
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", {required: true})}
                    name="facilityOwner"
                    type="text"
                    placeholder="Organization Owner"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Type
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", {required: true})}
                    name="facilityType"
                    type="text"
                    placeholder="Organization Type"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Category
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", {required: true})}
                    name="facilityCategory"
                    type="text"
                    placeholder="Organization Category"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field  is-grouped">
              <p className="control">
                <button className="button is-success is-small">Save</button>
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
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </p>
            </div>
            {error && <div className="message"> {message}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
