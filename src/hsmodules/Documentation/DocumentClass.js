/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import documentListForm from "../clientForm/oldDocumentList";
import chartListForm from "../clientForm/chartList";
import documentList from "../clientForm/documentList";

import {toast} from "bulma-toast";
// eslint-disable-next-line
const searchfacility = {};

import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import {fontSize} from "@mui/system";
import {Box, Checkbox} from "@mui/material";
import {TableMenu} from "../../ui/styled/global";
//import ModalBox from "./ui-components/modal";

export default function DocumentClass() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedDocumentClass, setSelectedDocumentClass] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">DocumentClass  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-8 ">
          <DocumentClassList />
        </div>
        <div className="column is-4 ">
          {state.DocumentClassModule.show === "create" && (
            <DocumentClassCreate />
          )}
          {state.DocumentClassModule.show === "detail" && (
            <DocumentClassDetail />
          )}
          {state.DocumentClassModule.show === "modify" && (
            <DocumentClassModify DocumentClass={selectedDocumentClass} />
          )}
        </div>
      </div>
    </section>
  );
}

export function DocumentClassCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const DocumentClassServ = client.service("documentclass");
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
    //setFacility(user.activeDocumentClass.FacilityId)//
    if (!user.stacker) {
      // console.log(currentUser)
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
    data.locationType = "DocumentClass";
    DocumentClassServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created DocumentClass successfully") */
        setSuccess(true);
        toast({
          message: "DocumentClass created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: "Error creating DocumentClass " + err,
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
          <p className="card-header-title">Create DocumentClass</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-small"
                  {...register("x", {required: true})}
                  name="name"
                  type="text"
                  placeholder="Name of DocumentClass"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-map-signs"></i>
                </span>
              </p>
            </div>

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

export function DocumentClassList({standalone, closeModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const DocumentClassServ = client.service("documentclass");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedDocumentClass, setSelectedDocumentClass] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  let classList = documentList;

  //classList.push(...documentListForm);
  //console.log(facilities);

  const handleCreateNew = async () => {
    const newDocumentClassModule = {
      selectedDocumentClass: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    //console.log(state)
  };
  const handleRow = async DocumentClass => {
    //console.log("b4",state)

    //console.log("handlerow",DocumentClass)
    //return console.log(DocumentClass);

    await setSelectedDocumentClass(DocumentClass);

    const newDocumentClassModule = {
      selectedDocumentClass: DocumentClass,
      show: "detail",
      encounter_right: true,
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
      //sideMenu: {open: false},
    }));
    //console.log(state)
    if (standalone) {
      closeModal();
    }
  };

  const handleSearch = val => {
    const field = "name";
    console.log(val);
    DocumentClassServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id,
        /* locationType:"DocumentClass", */
        $limit: 10,
        $sort: {
          name: 1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" DocumentClass  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage(
          "Error fetching DocumentClass, probable network issues " + err
        );
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findDocumentClass = await DocumentClassServ.find({
        query: {
          /* locationType:"DocumentClass",*/
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 100,
          $sort: {
            name: 1,
          },
        },
      });

      //console.log(findDocumentClass.data);

      await setFacilities(findDocumentClass.data);
    } else {
      if (user.stacker) {
        const findDocumentClass = await DocumentClassServ.find({
          query: {
            /*  locationType:"DocumentClass", */
            $limit: 1000,
            $sort: {
              name: 1,
            },
          },
        });

        await setFacilities(findDocumentClass.data);
      }
    }
    /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" DocumentClass  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating DocumentClass, probable network issues "+ err )
                    setError(true)
                }) */
  };

  useEffect(() => {
    getFacilities();

    DocumentClassServ.on("created", obj => getFacilities());
    DocumentClassServ.on("updated", obj => getFacilities());
    DocumentClassServ.on("patched", obj => getFacilities());
    DocumentClassServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  const prevRoles = user.currentEmployee.roles;

  const classListSchema = [
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
      name: "Name",
      key: "name",
      description: "Enter name of band",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Facility",
      key: "facility",
      description: "Enter name of Facility",
      selector: row => row.facility,
      omit: user.stacker ? false : true,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Action",
      key: "action",
      description: "Enter Action",
      selector: row => row.facility,
      omit: !standalone ? false : true,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const filteredClassList = classList.filter(item =>
    prevRoles.includes(item.name)
  );

  //console.log(filteredClassList);

  return (
    <>
      {user ? (
        <>
          <Box
            sx={{
              maxHeight: "80vh",
              maxWidth: "600px",
            }}
          >
            <TableMenu>
              <div style={{display: "flex", alignItems: "center"}}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={e => handleSearch(e.target.value)} />
                  </div>
                )}
                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  List of Charts
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

            <div style={{width: "100%", overflowY: "scroll"}}>
              <CustomTable
                title={""}
                columns={classListSchema}
                data={filteredClassList}
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
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
console.log("ClassList");

export function ChartClassList({standalone, closeModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const DocumentClassServ = client.service("documentclass");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedDocumentClass, setSelectedDocumentClass] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  let classList = [];
  classList.push(...chartListForm);

  const handleCreateNew = async () => {
    const newDocumentClassModule = {
      selectedDocumentClass: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    //console.log(state)
  };
  const handleRow = async DocumentClass => {
    //console.log("b4",state)

    console.log("handlerow", DocumentClass);

    await setSelectedDocumentClass(DocumentClass);

    const newDocumentClassModule = {
      selectedDocumentClass: DocumentClass,
      show: "detail",
      encounter_right: true,
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    //console.log(state)
    if (standalone) {
      closeModal();
    }
  };

  const handleSearch = val => {
    const field = "name";
    console.log(val);
    DocumentClassServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id,
        /* locationType:"DocumentClass", */
        $limit: 10,
        $sort: {
          name: 1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" DocumentClass  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage(
          "Error fetching DocumentClass, probable network issues " + err
        );
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findDocumentClass = await DocumentClassServ.find({
        query: {
          /* locationType:"DocumentClass",*/
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 100,
          $sort: {
            name: 1,
          },
        },
      });

      //console.log(findDocumentClass.data);

      await setFacilities(findDocumentClass.data);
    } else {
      if (user.stacker) {
        const findDocumentClass = await DocumentClassServ.find({
          query: {
            /*  locationType:"DocumentClass", */
            $limit: 1000,
            $sort: {
              name: 1,
            },
          },
        });

        await setFacilities(findDocumentClass.data);
      }
    }
    /*   .then((res)=>{
                 console.log(res)
                     setFacilities(res.data)
                     setMessage(" DocumentClass  fetched successfully")
                     setSuccess(true)
                 })
                 .catch((err)=>{
                     setMessage("Error creating DocumentClass, probable network issues "+ err )
                     setError(true)
                 }) */
  };

  useEffect(() => {
    getFacilities();

    DocumentClassServ.on("created", obj => getFacilities());
    DocumentClassServ.on("updated", obj => getFacilities());
    DocumentClassServ.on("patched", obj => getFacilities());
    DocumentClassServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  console.log(user.stacker);

  const classListSchema = [
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
      name: "Name",
      key: "name",
      description: "Enter name of band",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Facility",
      key: "facility",
      description: "Enter name of Facility",
      selector: row => row.facility,
      omit: user.stacker ? false : true,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Action",
      key: "action",
      description: "Enter Action",
      selector: row => row.facility,
      omit: !standalone ? false : true,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      {user ? (
        <>
          <Box
            sx={{
              maxWidth: "80vw",
              maxHeight: "80vh",
            }}
          >
            <TableMenu>
              <div style={{display: "flex", alignItems: "center"}}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={e => handleSearch(e.target.value)} />
                  </div>
                )}
                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  List of Charts
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

            <div style={{width: "100%", overflowY: "scroll"}}>
              <CustomTable
                title={""}
                columns={classListSchema}
                data={classList}
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
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function DocumentClassDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const DocumentClassServ=client.service('/DocumentClass')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);

  const DocumentClass = state.DocumentClassModule.selectedDocumentClass;

  const handleEdit = async () => {
    const newDocumentClassModule = {
      selectedDocumentClass: DocumentClass,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    //console.log(state)
  };

  const handleCreateForm = async () => {};

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">DocumentClass Details</p>
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
                    {DocumentClass.name}{" "}
                  </span>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>

          <div className="field is-grouped mt-2">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Edit
              </button>
            </p>
            {/* <p className="control">
                    <button className="button is-info is-small" onClick={handleCreateForm}>
                        Create Form
                    </button>
                </p> */}
          </div>
          {error && <div className="message"> {message}</div>}
        </div>
      </div>
    </>
  );
}

export function DocumentClassModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const DocumentClassServ = client.service("documentclass");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const DocumentClass = state.DocumentClassModule.selectedDocumentClass;

  useEffect(() => {
    setValue("name", DocumentClass.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("locationType", DocumentClass.locationType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", DocumentClass.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", DocumentClass.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", DocumentClass.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", DocumentClass.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", DocumentClass.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("DocumentClassCategory", DocumentClass.DocumentClassCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  });

  const handleCancel = async () => {
    const newDocumentClassModule = {
      selectedDocumentClass: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newDocumentClassModule = {
      selectedDocumentClass: {},
      show: "create",
    };
    setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = DocumentClass._id;
    if (conf) {
      DocumentClassServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted DocumentClass successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "DocumentClass deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting DocumentClass, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              "Error deleting DocumentClass, probable network issues or " + err,
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
    data.facility = DocumentClass.facility;
    //console.log(data);

    DocumentClassServ.patch(DocumentClass._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated DocumentClass successfully")
        toast({
          message: "DocumentClass updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating DocumentClass, probable network issues "+ err )
        // setError(true)
        toast({
          message:
            "Error updating DocumentClass, probable network issues or " + err,
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
          <p className="card-header-title">DocumentClass Details-Modify</p>
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
            {/* <div className="field">
                <label className="label is-small">Location Type
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small " {...register("x",{required: true})} disabled name="DocumentClassType" type="text" placeholder="DocumentClass Type" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
                </label>
                </div> */}
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
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="DocumentClass Email"/>
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
                    <input className="input is-small" {...register("x",{required: true})} name="DocumentClassCategory" type="text" placeholder="DocumentClass Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-DocumentClass-medical"></i>
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
