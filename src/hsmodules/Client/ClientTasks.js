/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import Input from "../../components/inputs/basic/Input";
import {MdCancel} from "react-icons/md";
import {Box, Grid} from "@mui/material";
import ModalHeader from "../../components/modal";
import CustomSelect from "../../components/inputs/basic/Select";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import {toast} from "bulma-toast";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import Textarea from "../../components/inputs/basic/Textarea";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {fontSize} from "@mui/system";
import ModalBox from "../../components/modal";
import EmployeeSearch from "../helpers/EmployeeSearch";
// eslint-disable-next-line
const searchfacility = {};

export default function ClientTasks() {
  const {state} = useContext(ObjectContext); //,setState
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  // eslint-disable-next-line
  const [selectedBand, setSelectedBand] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

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
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Band  Module</span></div>
            </div> */}
      <div>
        <ClientTasksList
          showCreateModal={handleCreateModal}
          showDetailModal={handleShowDetailModal}
        />
        <ModalBox open={createModal} onClose={handleHideCreateModal} header="Create Tasks">
          <ClientTasksCreate />
        </ModalBox>

        <ModalBox open={detailModal} onClose={handleHideDetailModal} header="Tasks Details">
          <ClientTasksDetail showModifyModal={handleModifyModal} />
        </ModalBox>

        <ModalBox open={modifyModal} onClose={handleHideModifyModal} header="Tasks Modify">
          <ClientTasksModify />
        </ModalBox>
      </div>
    </section>
  );
}

export function ClientTasksCreate(){
  const {register, handleSubmit, reset} = useForm();

  const formDefaultValues = {
    title: "",
    type: "",
    priority: "",
    information: "",
  };

  const onSubmit = data => {
    addTask(data);
    reset(formDefaultValues);
  };

  return (
    <Box
      sx={{
        width: "500px",
        maxHeight: "80vh",
      }}
    >
      <Grid container spacing={2} pt={1}>
        <Grid item xs={12}>
          <EmployeeSearch />
        </Grid>

        <Grid item xs={12}>
          <Input register={register("title", {required: true})} label="Title" />
        </Grid>

        <Grid item xs={8}>
          <Input
            register={register("status", {required: true})}
            label="Status"
          />
        </Grid>

        <Grid item xs={4}>
          <CustomSelect
            register={register("priority", {required: true})}
            label="Priority"
            options={["High","Medium","Low","Urgent","Not Urgent"]}
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Additional Information"
            placeholder="Write here..."
            register={register("information", {required: true})}
          />
        </Grid>
      </Grid>

      <Box mt={1}>
        <GlobalCustomButton
          sx={{
            marginRight: "10px",
          }}
          color="success"
          onClick={handleSubmit(onSubmit)}
        >
          Assign
        </GlobalCustomButton>

        <GlobalCustomButton
          variant="outlined"
          color="error"
          // onClick={closeModal}
        >
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export function ClientTasksList({showCreateModal, showDetailModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const BandServ = client.service("bands");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState([]);
  // eslint-disable-next-line
  const [selectedBand, setSelectedBand] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  const handleCreateNew = async () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };
  const handleRow = async Band => {
    //console.log("b4",state)

    //console.log("handlerow",Band)

    await setSelectedBand(Band);

    const newBandModule = {
      selectedBand: Band,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
    showDetailModal();
  };

  const handleSearch = val => {
    const field = "name";
    console.log(val);
    BandServ.find({
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
        setMessage(" Band  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Band, probable network issues " + err);
        setError(true);
      });
  };

  const handleRemoveTask = task => {
    setTasks(prev => prev.filter(item => item.title !== task.title));
  };

  const getFacilities = async () => {
    console.log(user);
    setLoading(true);
    if (user.currentEmployee) {
      console.log(user);

      const findBand = await BandServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findBand.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findBand = await BandServ.find({
          query: {
            $limit: 200,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findBand.data);
      }
    }
    /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Band  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Band, probable network issues "+ err )
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
    BandServ.on("created", obj => getFacilities());
    BandServ.on("updated", obj => getFacilities());
    BandServ.on("patched", obj => getFacilities());
    BandServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar
const getTaskColumns = (action, disableAction) => {
    const contactColumns = [
      {
        name: "Title",
        key: "title",
        description: "Enter Date",
        selector: row => row.title,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Type",
        style: {color: "#0364FF"},
        key: "type",
        description: "Enter Date",
        selector: row => row.type,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Priority",
        style: {color: "#0364FF"},
        key: "priority",
        description: "Enter Date",
        selector: row => row.priority,
        sortable: true,
        required: true,
        inputType: "TEXT",
      },
      {
        name: "Information",
        key: "information",
        description: "Enter Date",
        selector: row => row.information,
        sortable: true,
        required: true,
        inputType: "NUMBER",
      },
      {
        name: "Del",
        width: "50px",
        center: true,
        key: "action",
        description: "Enter Date",
        selector: row => (
          <IconButton
            onClick={() => action(row)}
            disabled={disableAction}
            color="error"
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        ),
        sortable: true,
        required: true,
        inputType: "NUMBER",
      },
    ];
  
    return contactColumns;
  };

  const tasksColumns = getTaskColumns(handleRemoveTask, false);


  return (
    <>
      {tasks ? (
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
                    List of Task
                  </h2>
                </div>

                {handleCreateNew && (
                  <GlobalCustomButton
                  style={{fontSize: "14px", fontWeight: "600"}}
                 
                  onClick={showCreateModal}
                >
                  <AddCircleOutline
                    sx={{marginRight: "5px"}}
                    fontSize="small"
                  />
                  Add New
                </GlobalCustomButton>
                )}
              </TableMenu>

              <div style={{width: "50vw", height: "100%", overflow: "auto"}}>
              <CustomTable
          title={"Contact List"}
          columns={tasksColumns}
          data={tasks}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          CustomEmptyData="You haven't Assigned any Tasks yet..."
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

export function ClientTasksDetail({showModifyModal}) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const BandServ=client.service('/Band')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);

  const Band = state.BandModule.selectedBand;

  const handleEdit = async () => {
    const newBandModule = {
      selectedBand: Band,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
    showModifyModal();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ModalHeader text={"Client Details"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <MdCancel
            onClick={() => {
              setShowModal(false),
                setState(prevstate => ({
                  ...prevstate,
                  BandModule: {
                    selectedBand: {},
                    show: "list",
                  },
                }));
            }}
            style={{
              fontSize: "2rem",
              color: "crimson",
              cursor: "pointer",
              float: "right",
            }}
          /> */}
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "20px",
              marginRight: ".8rem",
            }}
          >
            Name:
          </span>
          <span style={{color: " #000000", fontSize: "20px"}}>
            {Band?.name}
          </span>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <span
            style={{
              color: " #0364FF",
              fontSize: "20px",
              marginRight: ".8rem",
            }}
          >
            Band Type:
          </span>
          <span style={{color: " #000000", fontSize: "20px"}}>
            {Band?.bandType}
          </span>
        </Grid>

        <Button
          sx={{fontSize: "14px", fontWeight: "600", width: "80px"}}
          onClick={handleEdit}
        >
          Edit
        </Button>

        {error && <div className="message"> {message}</div>}
      </Grid>
    </>
  );
}

export function ClientTasksModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const BandServ = client.service("bands");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const Band = state.BandModule.selectedBand;

  useEffect(() => {
    setValue("name", Band.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("bandType", Band.bandType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", Band.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Band.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Band.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Band.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Band.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("BandCategory", Band.BandCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  });

  const handleCancel = async () => {
    const newBandModule = {
      selectedBand: {},
      show: "list",
    };
    await setState(prevstate => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, BandModule: newBandModule}));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Band._id;
    if (conf) {
      BandServ.remove(dleteId)
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

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    console.log(data);
    data.facility = Band.facility;
    //console.log(data);

    BandServ.patch(Band._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Band successfully")
        toast({
          message: "Band updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Band, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Band, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                {" "}
                Name
                <p className="control has-icons-left has-icons-right">
                  <Input
                    className="input is-small"
                    register={register("name", {required: true})}
                    name="name"
                    type="text"
                    placeholder="Name of Band"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Band Type
                <p className="control has-icons-left has-icons-right">
                  <Input
                    className="input is-small "
                    {...register("bandType", {required: true})}
                    disabled
                    name="bandType"
                    type="text"
                    placeholder="Band Type"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </label>
            </div>
          </form>

          <Box sx={{display: "flex"}}>
            <p className="control">
              <Button type="submit" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            </p>
            <p className="control">
              <Button onClick={handleCancel}>Cancel</Button>
            </p>
            <p className="control">
              <Button onClick={() => handleDelete()} type="delete">
                Delete
              </Button>
            </p>
          </Box>
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
