/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
import ReportCreate from "./ReportCreate";
import PatientProfile from "../Client/PatientProfile";
import {clinicalSignSchema, syptomSchema, labSchema} from './schema'

/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import ModalBox from "../../components/modal";
import { Box } from "@mui/material";
import { GrayWrapper, GridWrapper } from "../app/styles";
import Input from "../../components/inputs/basic/Input";
import DataTable from "react-data-table-component";

// Demo styles, see 'Styles' section below for some notes on use.

//import BillPrescriptionCreate from './BillPrescriptionCreate';

export default function CaseDefinition() {
  //const {state}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const BillServ = client.service("casedefinition");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedOrders, setSelectedOrders] = useState([]); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [modal, setModal] = useState(false)

    const handleCloseCreateModal  = () => {
      setModal(false)
    }
    const handleOpenCreateModal= () => {
      setModal(true)
    }

  return (

    
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

          
          <CaseDefinitionList openCreateModal={handleOpenCreateModal}/>
          <ModalBox open={modal} onClose={handleCloseCreateModal}>
          <CaseDefinitionCreate  />
          </ModalBox>
        
          
          {state.EpidemiologyModule.show === "detail" && (
            <CaseDefinitionDetail />
          )}
        
        {/*  <div className="column is-3 ">  <ReportCreate />
                
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}
      
    </section>
  );
}

export function CaseDefinitionCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const BandServ = client.service("casedefinition");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const bandTypeOptions = ["Immediate Notification", "Weekly", "Monthly"];
  const notifierOptions = [
    "Facility Focal Person",
    "DSNO",
    "Asst DSNO",
    "State Epidemiologist",
  ];

  const [finding, setFinding] = useState("");
  const [findings, setFindings] = useState([]);
  const [findingreq, setFindingreq] = useState(false);

  const [symptom, setSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [duration, setDuration] = useState("");
  const [sympreq, setSympreq] = useState(false);

  const [lab, setLab] = useState("");
  const [labs, setLabs] = useState([]);
  const [labvalue, setLabvalue] = useState("");
  /* const [sympreq,setSympreq] = useState(false) */
  const [observations, setObservations] = useState([]);
  const [mgtProtocol, setMgtProtocol] = useState("");
  const [notified, setNotified] = useState("");

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
    //setFacility(user.activeBand.FacilityId)//
    if (!user.stacker) {
      setValue("facility", user.currentEmployee.facilityDetail._id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  });
  const handleChecked = e => {
    // console.log(e.target.checked)
    setSympreq(e.target.checked);
  };

  const handleChecked2 = e => {
    // console.log(e.target.checked)
    setFindingreq(e.target.checked);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    /*  data.Presenting_Complaints=symptoms
        data.Clinical_Findings=findings */
    //data.LaboratoryConfirmation=labconfirms
    data.observations = [];
    data.disease = {
      name: data.disease,
      icdcode: "",
      icdver: "",
      snomed: "",
      snomedver: "",
    };

    if (data.notificationtype === "") {
      alert("Kindly choose notification type");
      return;
    }
    if (symptoms.length > 0) {
      let sympcollection = [];
      symptoms.forEach(el => {
        let obs = {
          category: "symptoms",
          name: el.symptom,
          duration: el.duration,
          /* note:"",
                    snomed:"" ,
                    response:"" , */
          required: el.sympreq,
          /* value:""  */
        };
        console.log(obs);
        sympcollection.push(obs);
        console.log(sympcollection);
      });
      data.observations = [...data.observations, ...sympcollection];
    }
    if (findings.length > 0) {
      let findingscollection = [];
      findings.forEach(el => {
        let obs = {
          category: "Signs",
          name: el.finding,
          /*  duration:el.duration , */
          /* note:"",
                    snomed:"" ,
                    response:"" , */
          required: el.findingreq,
          /* value:""  */
        };
        findingscollection.push(obs);
      });
      data.observations = [...data.observations, ...findingscollection];
    }
    if (labs.length > 0) {
      let labscollection = [];
      labs.forEach(el => {
        let obs = {
          category: "Laboratory",
          name: el.lab,
          /*  duration:el.duration , */
          /* note:"",
                    snomed:"" ,
                    response:"" , */
          /*  required:el.findingreq, */
          value: el.labvalue,
        };
        labscollection.push(obs);
      });
      data.observations = [...data.observations, ...labscollection];
    }
    let notifiedlist = [];
    notifiedlist.push(data.notifiedPerson);
    console.log(notifiedlist);
    data.notification_destination = notifiedlist[0];
    data.treatmentprotocol = mgtProtocol;
    // await setObservations((prev)=>([...prev, symp]))
    setMessage("");
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    BandServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Band successfully") */
        setSuccess(true);
        /*   setAllergies([]) */
        setSymptoms([]);
        setFindings([]);
        setLabs([]);
        setMgtProtocol([]);
        toast({
          message: "Band created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: "Error creating Band " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };
  const handleAddSymptoms = () => {
    let newsymptom = {
      symptom,
      duration,
      sympreq,
    };
    console.log(newsymptom);
    setSymptoms(prev => [...prev, newsymptom]);
    // setAllergy({})
    setSymptom("");
    setDuration("");
    setSympreq(false);
  };
  const handleAddFindings = () => {
    let newFinding = {
      finding,
      findingreq,
    };
    console.log(newFinding);
    setFindings(prev => [...prev, newFinding]);
    // setAllergy({})
    setFinding("");
    setFindingreq(false);
  };
  const handleAddLabs = () => {
    let newLabs = {
      lab,
      labvalue,
    };
    console.log(newLabs);
    setLabs(prev => [...prev, newLabs]);
    // setAllergy({})
    setLab("");
    setLabvalue("");
    /*  setFindingreq(false) */
  };
  const onDelete = (comp, i) => {
    //console.log(comp,i)
    setSymptoms(prevstate => prevstate.filter((el, index) => index !== i));
  };
  const onDeleteFinding = (comp, i) => {
    //console.log(comp,i)
    setFindings(prevstate => prevstate.filter((el, index) => index !== i));
  };
  const onDeleteLab = (comp, i) => {
    //console.log(comp,i)
    setLabs(prevstate => prevstate.filter((el, index) => index !== i));
  };
  const labData = [{sn:1, test:"positive", value:"Acute", action:"take drug"}]
  const data=[{sn:1, symptom:"cholera", duration:"3 months", required:"yes", action:"take drug"}]
  const clinicalSigns=[{sn:1, finding:"Stomach Ache", required:"yes", action:"take drug"}]
  return (
    <>
    
      <Box>
        <GridWrapper className="four-columns">
          <Input 
                {...register("Symptoms")}
                label="Symptoms"
                type="text"
                placeholder="Specify" />
          <Input label="Duration" />
          <Input 
          type="checkbox" 
          style={{width:"20px"}}
           label="Required" />
           <Button
                  style={{fontSize: "14px", fontWeight: "600", width:"80px"}}
                  label="Add" />
        </GridWrapper>
      
        <CustomTable
                  title={"Syptom"}
                  columns={syptomSchema}
                  data={data}
                  pointerOnHover
                  highlightOnHover
                  striped
                />
        <GridWrapper>
        <Input 
                {...register("Signs")}
                label="Signs"
                type="text"
                placeholder="Specify" />
                <Input 
          type="checkbox"
           label="Required" />
           <Button
                  style={{fontSize: "14px", fontWeight: "600", width:"80px"}}
                  label="Add "/>
        </GridWrapper>

        <CustomTable
                  title={"Clinical Signs"}
                  columns={clinicalSignSchema}
                  data={clinicalSigns}
                  pointerOnHover
                  highlightOnHover
                  striped
                />

<GridWrapper>
        <Input 
                {...register("Lab")}
                label="Lab"
                type="text"
                placeholder="Specify" />

<Input 
                {...register("Value")}
                label="Value"
                type="text"
                placeholder="Specify" />

<Button
                  style={{fontSize: "14px", fontWeight: "600", width:"80px"}}
                  label="Add "/>
                
        </GridWrapper>

        <CustomTable
                  title={"Lab Confirmation"}
                  columns={labSchema}
                  data={labData}
                  pointerOnHover
                  highlightOnHover
                  striped
                />


             



          

          
          
      </Box>
    
      
    </>
  );
}

export function CaseDefinitionList({openCreateModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const BandServ = client.service("casedefinition");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedBand, setSelectedBand] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);

  const handleCreateNew = async () => {
    const newBandModule = {
      selectedEpid: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      EpidemiologyModule: newBandModule,
    }));
    openCreateModal()
    //console.log(state)
  };
  const handleRow = async Band => {
    //console.log("b4",state)

    //console.log("handlerow",Band)

    await setSelectedBand(Band);

    const newBandModule = {
      selectedEpid: Band,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      EpidemiologyModule: newBandModule,
    }));
    console.log(newBandModule);
  };

  const handleSearch = val => {
    const field = "disease.name";
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

  const getFacilities = async () => {
    if (user.currentEmployee) {
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
    BandServ.on("created", obj => getFacilities());
    BandServ.on("updated", obj => getFacilities());
    BandServ.on("patched", obj => getFacilities());
    BandServ.on("removed", obj => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar
  const caseDefinitionSchema = [
    {
      name: "S/NO",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Disease",
      key: "name",
      description: "Enter name of Disease",
      selector: row => row.disease.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Notification Type",
      key: "notificationtype",
      description: "Enter Notification Type",
      selector: row => row.notificationtype,
      sortable: true,
      required: true,
      inputType: "SELECT_LIST",
      options: ["immediate", "WhatsApp", "Monthly", "Weekly"],
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
                  Case Definitions
                </h2>
              </div>

              {handleCreateNew && (
                <Button
                  style={{fontSize: "14px", fontWeight: "600"}}
                  label="Add new "
                  onClick={handleCreateNew}
                />
              )}
            </TableMenu>

            <div style={{width: "100%", height: "600px", overflow: "auto"}}>
              <CustomTable
                title={""}
                columns={caseDefinitionSchema}
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

export function CaseDefinitionDetail() {
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

  const Band = state.EpidemiologyModule.selectedEpid;

  const handleEdit = async () => {
    const newBandModule = {
      EpidemiologyModule: Band,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      EpidemiologyModule: newBandModule,
    }));
    //console.log(state)
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Case Definition Details</p>
        </div>
        <div className="card-content vscrollable">
          <div>
            <label className="label is-small">
              {" "}
              <span className="icon is-small is-left">
                <i className="fas fa-hospital"></i>
              </span>
              Disease :
              <span className="is-size-7 padleft" name="name">
                {" "}
                {Band.disease.name}{" "}
              </span>
            </label>
          </div>
          <div className=" mt-2">
            <label className="label is-small">
              <span className="icon is-small is-left">
                <i className="fas fa-map-signs"></i>
              </span>
              Notification Type:{" "}
              <span className="is-size-7 padleft" name="BandType">
                {Band.notificationtype}{" "}
              </span>
            </label>
          </div>
          <div className=" mt-2">
            <label className=" mt-2">
              <b> Symptoms </b>
            </label>
            <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>

                  <th>
                    <abbr title="Type"> Symptom</abbr>
                  </th>
                  <th>
                    <abbr title="Destination">Duration</abbr>
                  </th>
                  <th>
                    <abbr title="Destination">Required</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {Band.observations.map((ProductEntry, i) => (
                  <>
                    {ProductEntry.category === "symptoms" && (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{ProductEntry.name}</td>
                        <td>{ProductEntry.duration}</td>
                        <td>{ProductEntry.required.toString()}</td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" mt-2">
            <label className=" mt-2">
              <b>Clinical Signs </b>
            </label>
            <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>

                  <th>
                    <abbr title="Type"> Symptom</abbr>
                  </th>
                  <th>
                    <abbr title="Destination">Duration</abbr>
                  </th>
                  <th>
                    <abbr title="Destination">Required</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {Band.observations.map((ProductEntry, i) => (
                  <>
                    {ProductEntry.category === "Signs" && (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{ProductEntry.name}</td>
                        <td>{ProductEntry.required}</td>
                        {/* <td>{ProductEntry.required.toString()}</td>  */}
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" mt-2">
            <label className=" mt-2">
              <b> Laboratory</b>
            </label>
            <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>

                  <th>
                    <abbr title="Type"> Lab Test </abbr>
                  </th>
                  <th>
                    <abbr title="Destination">Value</abbr>
                  </th>
                  {/*  <th><abbr title="Destination">Required</abbr></th> */}
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {Band.observations.map((ProductEntry, i) => (
                  <>
                    {ProductEntry.category === "symptoms" && (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{ProductEntry.name}</td>
                        <td>{ProductEntry.duration}</td>
                        <td>{ProductEntry.required.toString()}</td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" mt-2">
            <label className="label is-small">
              {" "}
              <span className="icon is-small is-left">
                <i className="fas fa-hospital"></i>
              </span>
              Treatment Protocol:
            </label>

            <span className="is-size-7 padleft" name="name">
              {" "}
              {Band.treatmentprotocol}{" "}
            </span>
          </div>
          <div className=" mt-2">
            <label className="label is-small">
              {" "}
              <span className="icon is-small is-left">
                <i className="fas fa-hospital"></i>
              </span>
              Person to Notify :{" "}
              <span className="is-size-7 padleft" name="name">
                {" "}
                {Band.notification_destination[0]}{" "}
              </span>
            </label>
          </div>
          {/*  
            <div className="field mt-2">
                <p className="control">
                    <button className="button is-success is-small is-disabled" onClick={handleEdit}>
                        Edit
                    </button>
                </p>
            </div> */}
        </div>
      </div>
    </>
  );
}

export function CaseDefinitionModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const BandServ = client.service("casedefinition");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const Band = state.EpidemiologyModule.selectedBand;

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
      show: "create",
    };
    await setState(prevstate => ({...prevstate, BandModule: newBandModule}));
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
        <div className="card-header">
          <p className="card-header-title">Band Details-Modify</p>
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
                    {...register("name", {required: true})}
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
                Band Type
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    {...register("x", {required: true})}
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
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="Band Email"/>
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
                    <input className="input is-small" {...register("x",{required: true})} name="BandCategory" type="text" placeholder="Band Category"/>
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

  console.log(facilities);
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
