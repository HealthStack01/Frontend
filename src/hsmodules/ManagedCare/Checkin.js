// /* eslint-disable */
// import React, {useState,useContext, useEffect,useRef} from 'react'
// import client from '../../feathers'
// import {DebounceInput} from 'react-debounce-input';
// import { useForm } from "react-hook-form";
// //import {DocumentClassList} from './DocumentClass'
// //import {useNavigate} from 'react-router-dom'
// import {UserContext,ObjectContext} from '../../context'
// import {toast} from 'bulma-toast'
// import {format, formatDistanceToNowStrict } from 'date-fns'
// import  VideoConference  from '../utils/VideoConference';
// /* import  Prescription, { PrescriptionCreate } from './Prescription'; */

// export default function DispensaryMain() {
//  // const { register, handleSubmit, watch, errors } = useForm();
//     // eslint-disable-next-line
//     const [error, setError] =useState(false)
//      // eslint-disable-next-line
//     const [success, setSuccess] =useState(false)
//      // eslint-disable-next-line
//    const [message, setMessage] = useState("")
//     const ClinicServ=client.service('clinicaldocument')
//     //const navigate=useNavigate()
//    // const {user,setUser} = useContext(UserContext)
//     const [facilities,setFacilities]=useState([])
//      // eslint-disable-next-line
//    const [selectedClinic, setSelectedClinic]=useState() //
//     // eslint-disable-next-line
//     const {state,setState}=useContext(ObjectContext)
//     // eslint-disable-next-line
//     const {user,setUser}=useContext(UserContext)
//     const [showModal,setShowModal]=useState(false)
//     const [showPrescriptionModal,setShowPrescriptionModal]=useState(false)
//     // tracking on which page we currently are
//     const [page, setPage] = useState(0);
//     // add loader refrence
//     const loader = useRef(null);

//     const standalone=false

//     const handleNewDocument= async()=>{
//         await setShowModal(true)
//         console.log( showModal)
//     }
//     const handleNewPrescription= async()=>{
//         await setShowPrescriptionModal(true)
//         console.log( showPrescriptionModal)
//     }

//     const handleCreateNew = async()=>{
//         const    newClinicModule={
//             selectedClinic:{},
//             show :'create'
//             }
//        await setState((prevstate)=>({...prevstate, ClinicModule:newClinicModule}))
//        //console.log(state)

//     }
//     const handleRow= async(Clinic)=>{
//         //console.log("b4",state)

//         //console.log("handlerow",Clinic)

//         await setSelectedClinic(Clinic)

//         const    newClinicModule={
//             selectedClinic:Clinic,
//             show :'detail'
//         }
//        await setState((prevstate)=>({...prevstate, ClinicModule:newClinicModule}))
//        //console.log(state)
//        Clinic.show=!Clinic.show

//     }

//    const handleSearch=(val)=>{
//        const field='documentname'
//        console.log(val)
//        ClinicServ.find({query: {
//                 [field]: {
//                     $regex:val,
//                     $options:'i'

//                 },
//               // facility:user.currentEmployee.facilityDetail._id || "",
//                // locationType:"Clinic",
//                client:state.ClientModule.selectedClient._id,
//                $limit:10,
//                 $sort: {
//                     name: 1
//                   }
//                     }}).then((res)=>{
//                 console.log(res)
//                setFacilities(res.data)
//                 setMessage(" Clinic  fetched successfully")
//                 setSuccess(true)
//             })
//             .catch((err)=>{
//                 console.log(err)
//                 setMessage("Error fetching Clinic, probable network issues "+ err )
//                 setError(true)
//             })
//         }

//     const getFacilities= async(page=0)=>{
//             /* const limit=20
//             alert(page) */
//             if (user.currentEmployee){

//         const findClinic= await ClinicServ.find(
//                 {query: {
//                     //locationType:"Clinic",
//                     //facility:user.currentEmployee.facilityDetail._id,
//                     client:state.ClientModule.selectedClient._id,
//                     $limit:20,
//                    /*  $skip:page*limit, */
//                     $sort: {
//                         createdAt: -1
//                     }
//                     }})
//             const total= findClinic.total
//             const ulimit=total*page
//            /*  if (total>(ulimit)){ //only load if we have not reached the total
//                 alert("skip:",ulimit )
//                 console.log("skip:",ulimit ) */
//             await setFacilities(findClinic.data)
//             console.log(findClinic.data)
//            /*  } */
//                 }
//                 else {
//                     if (user.stacker){
//                         const findClinic= await ClinicServ.find(
//                             {query: {
//                                 client:state.ClientModule.selectedClient._id,
//                                     $limit:20,
//                                     $sort: {
//                                         createdAt: -1
//                                     }
//                                 }})

//                     await setFacilities(findClinic.data)

//                     }
//                 }
//           /*   .then((res)=>{
//                 console.log(res)
//                     setFacilities(res.data)
//                     setMessage(" Clinic  fetched successfully")
//                     setSuccess(true)
//                 })
//                 .catch((err)=>{
//                     setMessage("Error creating Clinic, probable network issues "+ err )
//                     setError(true)
//                 }) */
//             }

//             useEffect(() => {
//                 getFacilities()
//                 if (user){

//                 }else{
//                     /* const localUser= localStorage.getItem("user")
//                     const user1=JSON.parse(localUser)
//                     console.log(localUser)
//                     console.log(user1)
//                     fetchUser(user1)
//                     console.log(user)
//                     getFacilities(user) */
//                 }
//                 ClinicServ.on('created', (obj)=>getFacilities(page))
//                 ClinicServ.on('updated', (obj)=>getFacilities(page))
//                 ClinicServ.on('patched', (obj)=>getFacilities(page))
//                 ClinicServ.on('removed', (obj)=>getFacilities(page))

//                 /* var options = {
//                     root: null,
//                     rootMargin: "20px",
//                     threshold: 1.0
//                  }; */
//                 // initialize IntersectionObserver
//                 // and attaching to Load More div
//                 /*  const observer = new IntersectionObserver(handleObserver, options);
//                  if (loader.current) {
//                     observer.observe(loader.current)
//                  } */
//                 return () => {

//                 }
//             },[])
//            /*  useEffect(() => {
//                 // here we simulate adding new posts to List
//                 getFacilities()
//             }, [page]) */

//              // here we handle what happens when user scrolls to Load More div
//             // in this case we just update page variable
//                 /* const handleObserver = (entities) => {
//                     const target = entities[0];
//                     if (target.isIntersecting) {
//                         setPage((page) => page + 1) //load more

//                     }
//                 } */

//     // return (
//     //     <div>
//     //         <VideoConference/>
//     //         <div className="level">
//     //                 <div className="level-left">
//     //                     <div className="level-item">
//     //                         <div className="field">
//     //                             <p className="control has-icons-left  ">
//     //                                 <DebounceInput className="input is-small "
//     //                                     type="text" placeholder="Search documentation"
//     //                                     minLength={3}
//     //                                     debounceTimeout={400}
//     //                                     onChange={(e)=>handleSearch(e.target.value)} />
//     //                                 <span className="icon is-small is-left">
//     //                                     <i className="fas fa-search"></i>
//     //                                 </span>
//     //                             </p>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //                {/*  <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Clinics</span></div> */}
//     //                 <div className="level-right">
//     //             { !standalone &&   <div className="level-item">
//     //                         <div className="level-item">
//     //                         <div className="button is-danger is-small mr-2" onClick={handleNewPrescription}>Presciption</div>
//     //                             <div className="button is-success is-small" onClick={handleNewDocument}>New Document</div>
//     //                             </div>
//     //                     </div>}
//     //                 </div>

//     //             </div>

//     //             <div className=" pullup ">
//     //                             <div className=" is-fullwidth vscrollable pr-1">

//     //                                     {facilities.map((Clinic, i)=>(

//     //                                         <div key={Clinic._id}  onClick={()=>handleRow(Clinic)}   className={Clinic._id===(selectedClinic?._id||null)?"is-selected":""}>
//     //                                            <div className="card mt-1 hovercard">
//     //                                                 <header className="card-header" onClick={(Clinic)=>Clinic.show=!Clinic.show}>
//     //                                                     <div className="card-header-title">
//     //                                                     <div className="docdate">{formatDistanceToNowStrict(new Date(Clinic.createdAt),{addSuffix: true})} <br/><span>{format(new Date(Clinic.createdAt),'dd-MM-yy')}</span></div> {Clinic.documentname} by {Clinic.createdByname} at {Clinic.location},{Clinic.facilityname}
//     //                                                     <p className="right ml-2 mr-0">{Clinic.status} </p>
//     //                                                     </div>
//     //                                                    {/*  <button className="card-header-icon" aria-label="more options">
//     //                                                     <span className="icon">
//     //                                                         <i className="fas fa-angle-down" aria-hidden="true"></i>
//     //                                                     </span>
//     //                                                     </button> */}
//     //                                                 </header>
//     //                                               {Clinic.documentname!=="Prescription" &&  <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"}>
//     //                                                     { Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
//     //                                                         <div className="field is-horizontal">
//     //                                                                 <div className="field-label">
//     //                                                                     <label className="label is-size-7" key={i}>
//     //                                                                         {keys}:
//     //                                                                         </label>
//     //                                                                 </div>
//     //                                                                 <div className="field-body">
//     //                                                                     <div className="field" >
//     //                                                                         {value}
//     //                                                                     </div>
//     //                                                                 </div>
//     //                                                         </div>
//     //                                                         ))
//     //                                                     }
//     //                                             </div>}
//     //                                             {Clinic.documentname==="Prescription" &&
//     //                                             <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"}>

//     //                                                     {(Clinic.documentdetail.length>0) && <div>
//     //                                                         <label>Medications:</label>
//     //                                                     <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
//     //                                                             <thead>
//     //                                                                 <tr>
//     //                                                                 <th><abbr title="Serial No">S/No</abbr></th>

//     //                                                                 <th><abbr title="Type">Medication</abbr></th>
//     //                                                                 <th><abbr title="Destination">Destination</abbr></th>
//     //                                                                 </tr>
//     //                                                             </thead>
//     //                                                             <tfoot>

//     //                                                             </tfoot>
//     //                                                             <tbody>
//     //                                                             { Clinic.documentdetail.map((ProductEntry, i)=>(

//     //                                                                     <tr key={i}>
//     //                                                                     <th>{i+1}</th>
//     //                                                                     {/* <td>{ProductEntry.name}</td> */}
//     //                                                                     <td>{ProductEntry.medication}<br/>
//     //                                                                     <span className="help is-size-7">{ProductEntry.instruction}</span></td>
//     //                                                                     <td>{ProductEntry.destination}</td>
//     //                                                                     </tr>

//     //                                                                 ))}
//     //                                                             </tbody>
//     //                                                             </table>
//     //                                                             </div>}
//     //                                                         </div>}
//     //                                                 </div>
//     //                                         </div>

//     //                                     ))}
//     //                                   {/* <!-- Add Ref to Load More div --> */}
//     //                                    {/*  <div className="loading" ref={loader}>
//     //                                             <h2>Load More</h2>
//     //                                 </div> */}
//     //                             </div>

//     //             </div>
//     //             <div className={`modal  ${showModal?"is-active":""}` }>
//     //                                 <div className="modal-background"></div>
//     //                                 <div className="modal-card ">
//     //                                     <header className="modal-card-head">
//     //                                     <p className="modal-card-title">Choose Document Class</p>
//     //                                     <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
//     //                                     </header>
//     //                                     <section className="modal-card-body">
//     //                                     <DocumentClassList standalone="true" />
//     //                                     </section>
//     //                                     {/* <footer className="modal-card-foot">
//     //                                     <button className="button is-success">Save changes</button>
//     //                                     <button className="button">Cancel</button>
//     //                                     </footer> */}
//     //                                 </div>
//     //                             </div>
//     //                             <div className={`modal ${showPrescriptionModal?"is-active":""}` }>
//     //                                 <div className="modal-background"></div>
//     //                                 <div className="modal-card mediumr">
//     //                                     <header className="modal-card-head">
//     //                                     <p className="modal-card-title">Prescription</p>
//     //                                     <button className="delete" aria-label="close"  onClick={()=>setShowPrescriptionModal(false)}></button>
//     //                                     </header>
//     //                                     <section className="modal-card-body">
//     //                                     <Prescription standalone="true" />
//     //                                     </section>
//     //                                     {/* <footer className="modal-card-foot">
//     //                                     <button className="button is-success">Save changes</button>
//     //                                     <button className="button">Cancel</button>
//     //                                     </footer> */}
//     //                                 </div>
//     //                             </div>
//     //     </div>
//     // )
// }
/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
import {Box, Grid, Button as MuiButton} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import DatePicker from "react-datepicker";
import LocationSearch from "../helpers/LocationSearch";
import EmployeeSearch from "../helpers/EmployeeSearch";
import BillServiceCreate from "../Finance/BillServiceCreate";
import "react-datepicker/dist/react-datepicker.css";

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import Switch from "../../components/switch";
import {BsFillGridFill, BsList} from "react-icons/bs";
import CalendarGrid from "../../components/calender";
import ModalBox from "../../components/modal";
import DebouncedInput from "../Appointment/ui-components/inputs/DebouncedInput";
import {MdCancel} from "react-icons/md";
// eslint-disable-next-line
const searchfacility = {};

export default function CheckIn() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="section remPadTop">
      <CheckInList showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}

export function CheckInCreate({showModal, setShowModal}) {
  const {state, setState} = useContext(ObjectContext);
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState();
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [type, setType] = useState();
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("appointments");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  // const [appointment_reason,setAppointment_reason]= useState()
  const [appointment_status, setAppointment_status] = useState("");
  const [appointment_type, setAppointment_type] = useState("");
  const [billingModal, setBillingModal] = useState(false);

  const [chosen, setChosen] = useState();
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();
  const appClass = ["On-site", "Teleconsultation", "Home Visit"];

  let appointee; //  =state.ClientModule.selectedClient
  /*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
  const handleChangeType = async e => {
    await setAppointment_type(e.target.value);
  };

  const handleChangeStatus = async e => {
    await setAppointment_status(e.target.value);
  };

  const getSearchfacility = obj => {
    setClientId(obj._id);
    setChosen(obj);
    //handleRow(obj)
    if (!obj) {
      //"clear stuff"
      setClientId();
      setChosen();
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility1 = obj => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };
  const getSearchfacility2 = obj => {
    setPractionerId(obj._id);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setPractionerId();
      setChosen2();
    }
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    setShowModal(false),
      setState(prevstate => ({
        ...prevstate,
        AppointmentModule: {
          selectedAppointment: {},
          show: "list",
        },
      }));

    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    data.locationId = locationId; //state.ClinicModule.selectedClinic._id
    data.practitionerId = practionerId;
    data.appointment_type = appointment_type;
    // data.appointment_reason=appointment_reason
    data.appointment_status = appointment_status;
    data.clientId = clientId;
    data.firstname = chosen.firstname;
    data.middlename = chosen.middlename;
    data.lastname = chosen.lastname;
    data.dob = chosen.dob;
    data.gender = chosen.gender;
    data.phone = chosen.phone;
    data.email = chosen.email;
    data.practitioner_name = chosen2.firstname + " " + chosen2.lastname;
    data.practitioner_profession = chosen2.profession;
    data.practitioner_department = chosen2.department;
    data.location_name = chosen1.name;
    data.location_type = chosen1.locationType;
    data.actions = [
      {
        action: appointment_status,
        actor: user.currentEmployee._id,
      },
    ];
    console.log(data);

    ClientServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        setAppointment_type("");
        setAppointment_status("");
        setClientId("");
        setLocationId("");
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast({
          message:
            "Appointment created succesfully, Kindly bill patient if required",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch(err => {
        toast({
          message: "Error creating Appointment " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    getSearchfacility(state.ClientModule.selectedClient);

    /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
    return () => {};
  }, [state.ClientModule.selectedClient]);

  /*   const showBilling = () =>{
        setBillingModal(true)
       //history.push('/app/finance/billservice')
        }
        const  handlecloseModal1 = () =>{
            setBillingModal(false)
            }


            const handleRow= async(Client)=>{
              //  await setSelectedClient(Client)
                const    newClientModule={
                    selectedClient:Client,
                    show :'detail'
                }
               await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
            } */

  return (
    <>
      <div className="card ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ModalHeader text={"Create Appointment"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MdCancel
                onClick={() => {
                  setShowModal(false),
                    setState(prevstate => ({
                      ...prevstate,
                      AppointmentModule: {
                        selectedAppointment: {},
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
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ClientSearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <LocationSearch
                getSearchfacility={getSearchfacility1}
                clear={success1}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <EmployeeSearch
                getSearchfacility={getSearchfacility2}
                clear={success2}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="field ml-3 ">
                {/* <label className= "mr-2 "> <b>Modules:</b></label> */}
                {appClass.map((c, i) => (
                  <label
                    className=" is-small"
                    key={c}
                    style={{fontSize: "16px", fontWeight: "bold"}}
                  >
                    <input
                      type="radio"
                      value={c}
                      name="appointmentClass"
                      {...register("appointmentClass", {required: true})}
                      style={{
                        border: "1px solid #0364FF",
                        transform: "scale(1.5)",
                        color: "#0364FF",
                        margin: ".5rem",
                      }}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <div className="field">
                <input
                  name="start_time"
                  {...register("start_time", {required: true})}
                  type="datetime-local"
                  style={{
                    border: "1px solid #0364FF",
                    padding: "1rem",
                    color: " #979DAC",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <select
                name="type"
                value={type}
                onChange={handleChangeType}
                style={{
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
                }}
              >
                <option defaultChecked>Choose Appointment Type </option>
                <option value="New">New</option>
                <option value="Followup">Followup</option>
                <option value="Readmission with 24hrs">
                  Readmission with 24hrs
                </option>
                <option value="Annual Checkup">Annual Checkup</option>
                <option value="Walk in">Walk-in</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <select
                name="appointment_status"
                value={appointment_status}
                onChange={handleChangeStatus}
                style={{
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
                }}
              >
                <option defaultChecked>Appointment Status </option>
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked In">Checked In</option>
                <option value="Vitals Taken">Vitals Taken</option>
                <option value="With Nurse">With Nurse</option>
                <option value="With Doctor">With Doctor</option>
                <option value="No Show">No Show</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Billed">Billed</option>
              </select>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <textarea
                className="input is-small"
                name="appointment_reason"
                {...register("appointment_reason", {required: true})}
                type="text"
                placeholder="Appointment Reason"
                rows="10"
                cols="50"
                style={{
                  border: "1px solid #0364FF",
                  padding: "1rem",
                  color: " #979DAC",
                  width: "100%",
                }}
              >
                {" "}
              </textarea>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#0364FF",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Button
                type="button"
                onClick={e => e.target.reset()}
                style={{
                  backgroundColor: "#ffffff",
                  width: "100%",
                  color: "#0364FF",
                  border: "1px solid #0364FF",
                  cursor: "pointer",
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export function CheckInList({showModal, setShowModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("appointments");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("list");

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    await setState(prevstate => ({...prevstate, ClientModule: newClient}));
    setShowModal(true);
  };

  const handleRow = async Client => {
    setShowModal(true);
    await setSelectedAppointment(Client);
    const newClientModule = {
      selectedAppointment: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
  };
  //console.log(state.employeeLocation)

  const handleSearch = val => {
    const field = "firstname";
    //  console.log(val)

    let query = {
      $or: [
        {
          firstname: {
            $regex: val,
            $options: "i",
          },
        },
        {
          lastname: {
            $regex: val,
            $options: "i",
          },
        },
        {
          middlename: {
            $regex: val,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_type: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_status: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_reason: {
            $regex: val,
            $options: "i",
          },
        },
        {
          location_type: {
            $regex: val,
            $options: "i",
          },
        },
        {
          location_name: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_department: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_profession: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_name: {
            $regex: val,
            $options: "i",
          },
        },
      ],
      facility: user.currentEmployee.facilityDetail._id, // || "",
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    };
    if (state.employeeLocation.locationType !== "Front Desk") {
      query.locationId = state.employeeLocation.locationId;
    }

    ClientServ.find({query: query})
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      // if (state.employeeLocation.locationType !== "Front Desk") {
      //   stuff.locationId = state.employeeLocation.locationId;
      // }

      const findClient = await ClientServ.find({query: stuff});

      await setFacilities(findClient.data);
      console.log(findClient.data);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      handleCalendarClose();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    ClientServ.on("created", obj => handleCalendarClose());
    ClientServ.on("updated", obj => handleCalendarClose());
    ClientServ.on("patched", obj => handleCalendarClose());
    ClientServ.on("removed", obj => handleCalendarClose());
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, ClientModule: newClient}));
    return () => {};
  }, []);
  const handleCalendarClose = async () => {
    let query = {
      start_time: {
        $gt: subDays(startDate, 1),
        $lt: addDays(startDate, 1),
      },
      facility: user?.currentEmployee?.facilityDetail?._id,

      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };
    // if (state.employeeLocation.locationType !== "Front Desk") {
    //   query.locationId = state.employeeLocation.locationId;
    // }

    const findClient = await ClientServ.find({query: query});

    await setFacilities(findClient.data);
  };

  const handleDate = async date => {
    setStartDate(date);
  };

  useEffect(() => {
    if (!!startDate) {
      handleCalendarClose();
    } else {
      getFacilities();
    }

    return () => {};
  }, [startDate]);
  //todo: pagination and vertical scroll bar

  const onRowClicked = () => {};

  const mapFacilities = () => {
    let mapped = [];
    facilities.map((facility, i) => {
      mapped.push({
        title: facility?.firstname + " " + facility?.lastname,
        start: format(new Date(facility?.start_time), "yyyy-MM-ddTHH:mm"),
        end: facility?.end_time,
        id: i,
      });
    });
    return mapped;
  };
  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  const dummyData = [
    {
      encounter: "27-10-21",
      patient_name: "Tejiri Tabor",
      policy: "234.75.43.01",
      health: "In patient",
      enStatus: "Confirmed",
      exStatus: "Active",
      preauth: "uncheck",
      fee: "Filed",
      cap: "Filed",
    },
    {
      encounter: "27-10-21",
      patient_name: "Tejiri Tabor",
      policy: "234.75.43.01",
      health: "Out patient",
      enStatus: "Confirmed",
      exStatus: "Cancelled",
      preauth: "uncheck",
      fee: "Filed",
      cap: "Filed",
    },
    {
      encounter: "27-10-21",
      patient_name: "Tejiri Tabor",
      policy: "234.75.43.01",
      health: "In patient",
      enStatus: "Confirmed",
      exStatus: "Active",
      preauth: "check",
      fee: "Not Required",
      cap: "Filed",
    },
    {
      encounter: "27-10-21",
      patient_name: "Tejiri Tabor",
      policy: "234.75.43.01",
      health: "In patient",
      enStatus: "Confirmed",
      exStatus: "Active",
      preauth: "check",
      fee: "Filed",
      cap: "Filed",
    },
    {
      encounter: "27-10-21",
      patient_name: "Tejiri Tabor",
      policy: "234.75.43.01",
      health: "In patient",
      enStatus: "Confirmed",
      exStatus: "Active",
      preauth: "check",
      fee: "Filed",
      cap: "Filed",
    },
    {
      encounter: "27-10-21",
      patient_name: "Tejiri Tabor",
      policy: "234.75.43.01",
      health: "In patient",
      enStatus: "Unconfirmed",
      exStatus: "Active",
      preauth: "check",
      fee: "Not Required",
      cap: "Unfiled",
    },
    {
      encounter: "27-10-21",
      patient_name: "Tejiri Tabor",
      policy: "234.75.43.01",
      health: "Out patient",
      enStatus: "Confirmed",
      exStatus: "Active",
      preauth: "uncheck",
      fee: "Filed",
      cap: "Unfiled",
    },
    {
      encounter: "27-10-21",
      patient_name: "Tejiri Tabor",
      policy: "234.75.43.01",
      health: "In patient",
      enStatus: "Unconfirmed",
      exStatus: "Active",
      preauth: "check",
      fee: "Filed",
      cap: "Filed",
    },
  ];

  const returnCell = status => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case "confirmed":
      case "active":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "unconfirmed":
        return <span style={{color: "#F1A153"}}>{status}</span>;

      case "cancelled":
      case "expired":
        return <span style={{color: "#ED0423"}}>{status}</span>;

      case "check":
        return (
          <CheckCircleOutlineIcon sx={{color: "#17935C"}} fontSize="medium" />
        );

      case "uncheck":
        return <HighlightOffIcon sx={{color: "#ED0423"}} fontSize="medium" />;

      default:
        break;
    }
  };

  const checkInSchema = [
    {
      name: "Date",
      key: "encounter",
      description: "Enter Date of Encounter",
      selector: row => row.encounter,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Patients Name",
      key: "patients name",
      description: "Enter Patient Name",
      selector: row => row.patient_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Policy ID",
      key: "id",
      description: "id",
      selector: row => row.policy,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Premium Status",
      key: "premium",
      description: "Enter Premimum Status",
      selector: (row, i) => (
        <CheckCircleOutlineIcon sx={{color: "#17935C"}} fontSize="medium" />
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Health Encounter Type",
      key: "health type",
      description: "Enter Health Encounter Type",
      selector: row => row.health,
      //   cell: row => returnCell(row.health),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Encounter Status",
      key: "enStatus",
      description: "Enter Encounter Status",
      selector: "enStatus",
      cell: row => returnCell(row.enStatus),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Expiration Status",
      key: "exStatus",
      description: "Enter Expiration Status",
      selector: "exStatus",
      cell: row => returnCell(row.exStatus),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "PreAuth Requested",
      key: "preauth",
      description: "Enter PreAuth Requested",
      selector: "preauth",
      cell: row => returnCell(row.preauth),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    // {
    //   name: "Claim Filling Status:",
    //   key: "claim",
    //   description: "Enter Claim Filling Status:",
    //   selector:  (row, i) => row.claim,
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
    {
      name: "Capitation",
      key: "cap",
      description: "Enter Capitation",
      selector: (row, i) => row.cap,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Fee for service",
      key: "fee",
      description: "Fee for service",
      selector: (row, i) => row.fee,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.status === "approved",
      style: {
        color: "red",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: row => row.status === "ongoing",
      style: {
        color: "rgba(0,0,0,.54)",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

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
                  <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
                    Check-in
                  </h2>
                  {/* <DatePicker
                    selected={startDate}
                    onChange={date => handleDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Filter By Date"
                    isClearable
                  /> */}
                  {/* <SwitchButton /> */}
                  <Switch>
                    <button
                      value={value}
                      onClick={() => {
                        setValue("list");
                      }}
                      style={value === "list" ? activeStyle : {}}
                    >
                      <BsList style={{fontSize: "1rem"}} />
                    </button>
                    <button
                      value={value}
                      onClick={() => {
                        setValue("grid");
                      }}
                      style={value === "grid" ? activeStyle : {}}
                    >
                      <BsFillGridFill style={{fontSize: "1rem"}} />
                    </button>
                  </Switch>
                </div>

                {handleCreateNew && (
                  <MuiButton
                    variant="contained"
                    sx={{
                      width: "fit",
                      textTransform: "capitalize",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    onClick={handleCreateNew}
                  >
                    <AddCircleOutline
                      sx={{marginRight: "5px"}}
                      fontSize="small"
                    />
                    New Check in
                  </MuiButton>
                )}
              </TableMenu>
              <div style={{width: "100%", height: "450px", overflow: "auto"}}>
                {value === "list" ? (
                  <CustomTable
                    title={""}
                    columns={checkInSchema}
                    data={dummyData}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={handleRow}
                    progressPending={loading}
                    // expandableRows={true}
                    //conditionalRowStyles={conditionalRowStyles}
                  />
                ) : (
                  <CalendarGrid appointments={mapFacilities()} />
                )}
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
