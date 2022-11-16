/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";

export default function Facility() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  //console.log("Organization parent", state)

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Organization  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-8 ">
          <FacilityList />
        </div>
        <div className="column is-4 ">
          {state.facilityModule.show === "create" && <FacilityCreate />}
          {state.facilityModule.show === "detail" && <FacilityDetail />}
          {state.facilityModule.show === "modify" && (
            <FacilityModify facility={selectedFacility} />
          )}
        </div>
      </div>
    </section>
  );
}

export function FacilityCreate() {
  const { register, handleSubmit } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const facilityServ = client.service("/facility");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    data.createdby = user._id;
    //console.log(data);

    facilityServ
      .create(data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        setMessage("Created Organization successfully");
        setSuccess(true);
      })
      .catch((err) => {
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Create Facility</p>
        </div>
        <div className="card-content vscrollable">
          {success && <div className="message"> {message}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field mb-2">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x", { required: true })}
                  name="facilityName"
                  type="text"
                  placeholder="Name of Facility"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital"></i>
                </span>
              </p>
            </div>
            <div className="field mb-2">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x", { required: true })}
                  name="facilityAddress"
                  type="text"
                  placeholder="Address of Facility"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-map-signs"></i>
                </span>
              </p>
            </div>
            <div className="field mb-2">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x", { required: true })}
                  name="facilityCity"
                  type="text"
                  placeholder="City/Town"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
              </p>
            </div>
            <div className="field mb-2">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x", { required: true })}
                  name="facilityContactPhone"
                  type="text"
                  placeholder="Contact Phone No"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-phone-alt"></i>
                </span>
              </p>
            </div>

            <div className="field mb-2">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x", { required: true })}
                  name="facilityEmail"
                  type="email"
                  placeholder="Organization Email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field mb-2">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x", { required: true })}
                  name="facilityOwner"
                  type="text"
                  placeholder="Organization CEO"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user-md"></i>
                </span>
              </p>
            </div>
            <div className="field mb-2">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x", { required: true })}
                  name="facilityType"
                  type="text"
                  placeholder="Organization Type"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital-symbol"></i>
                </span>
              </p>
            </div>
            <div className="field mb-2">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x", { required: true })}
                  name="facilityCategory"
                  type="text"
                  placeholder="Organization Category"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-clinic-medical"></i>
                </span>
              </p>
            </div>
            <div className="field mb-2">
              <p className="control">
                <button className="button is-success is-small">Create</button>
              </p>
            </div>
            {error && <div className="message"> {message}</div>}
          </form>
        </div>
      </div>
    </>
  );
}

export function FacilityList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const facilityServ = client.service("facility");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);

  const handleCreateNew = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };
  const handleRow = async (facility) => {
    //console.log("b4",state)

    //console.log("handlerow",facility)

    await setSelectedFacility(facility);

    const newfacilityModule = {
      selectedFacility: facility,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };

  const handleSearch = (val) => {
    const field = "facilityName";
    console.log(val);
    facilityServ
      .find({
        query: {
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
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Organization  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  /*  if (val.length>2){
                console.log("in")
               
            }

        }
     */
  const getFacilities = () => {
    facilityServ
      .find({
        query: {
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Organization  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  useEffect(() => {
    getFacilities();

    facilityServ.on("created", (obj) => getFacilities());
    facilityServ.on("updated", (obj) => getFacilities());
    facilityServ.on("patched", (obj) => getFacilities());
    facilityServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

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
                  placeholder="Search Facilities"
                  minLength={3}
                  debounceTimeout={400}
                  onChange={(e) => handleSearch(e.target.value)}
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
            List of Facilities{" "}
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
                <abbr title="S/No">S/No</abbr>
              </th>
              <th>Organization Name</th>
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
            {facilities.map((facility, i) => (
              <tr
                key={facility._id}
                onClick={() => handleRow(facility)}
                className={
                  facility._id === (selectedFacility?._id || null)
                    ? "is-selected"
                    : ""
                }
              >
                <th>{i + 1}</th>
                <th>{facility.facilityName}</th>
                <td>{facility.facilityAddress}</td>
                <td>{facility.facilityCity}</td>
                <td>{facility.facilityContactPhone}</td>
                <td>{facility.facilityEmail}</td>
                <td>{facility.facilityType}</td>
                <td>{facility.facilityCategory}</td>

                {/*  <td><span   className="showAction"  >...</span></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function FacilityDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const facilityServ=client.service('/facility')
  //const navigate=useNavigate()
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const facility = state.facilityModule.selectedFacility;

  const handleEdit = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: "modify",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Organization Details</p>
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
                <span className="is-small " name="facilityName">
                  {" "}
                  {facility.facilityName}{" "}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-map-signs"></i>
                </span>
                Address:
                <span className="is-small " name="facilityAddress">
                  {facility.facilityAddress}{" "}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                City:
                <span className="is-small " name="facilityCity">
                  {facility.facilityCity}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-phone-alt"></i>
                </span>
                Phone:
                <span className="is-small " name="facilityContactPhone">
                  {facility.facilityContactPhone}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                Email:{" "}
                <span className="is-small " name="facilityEmail">
                  {facility.facilityEmail}
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
                <span className="is-small " name="facilityOwner">
                  {facility.facilityOwner}
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
                <span className="is-small " name="facilityType">
                  {facility.facilityType}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-clinic-medical"></i>
                </span>
                Category:
                <span className="is-small " name="facilityCategory">
                  {facility.facilityCategory}
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

export function FacilityModify() {
  const { register, handleSubmit, setValue, reset } = useForm(); //watch, errors,
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const facilityServ = client.service("/facility");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

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
    await setState((prevstate) => ({
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
    setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = facility._id;
    if (conf) {
      facilityServ
        .remove(dleteId)
        .then((res) => {
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
        .catch((err) => {
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
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        setMessage("updated Organization successfully");
        setSuccess(true);
        changeState();
      })
      .catch((err) => {
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
                    {...register("x", { required: true })}
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
                    {...register("x", { required: true })}
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
                    {...register("x", { required: true })}
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
                    {...register("x", { required: true })}
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
                    {...register("x", { required: true })}
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
                    {...register("x", { required: true })}
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
                    {...register("x", { required: true })}
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
                    {...register("x", { required: true })}
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
