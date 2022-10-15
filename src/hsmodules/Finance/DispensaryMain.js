/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {DocumentClassList} from './DocumentClass'
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'
import  VideoConference  from '../utils/VideoConference';
import  Prescription, { PrescriptionCreate } from './Prescription';

export default function DispensaryMain() {
 // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const ClinicServ=client.service('clinicaldocument')
    //const navigate=useNavigate()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedClinic, setSelectedClinic]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)
    const [showModal,setShowModal]=useState(false)
    const [showPrescriptionModal,setShowPrescriptionModal]=useState(false)
    // tracking on which page we currently are
    const [page, setPage] = useState(0);
    // add loader refrence 
    const loader = useRef(null);
    
    const standalone=false

    const handleNewDocument= async()=>{
        await setShowModal(true)                                                                                                                                                        
        console.log( showModal)
    }
    const handleNewPrescription= async()=>{
        await setShowPrescriptionModal(true)                                                                                                                                                        
        console.log( showPrescriptionModal)
    }


    const handleCreateNew = async()=>{
        const    newClinicModule={
            selectedClinic:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, ClinicModule:newClinicModule}))
       //console.log(state)
        

    }
    const handleRow= async(Clinic)=>{
        //console.log("b4",state)

        //console.log("handlerow",Clinic)

        await setSelectedClinic(Clinic)

        const    newClinicModule={
            selectedClinic:Clinic,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, ClinicModule:newClinicModule}))
       //console.log(state)
       Clinic.show=!Clinic.show

    }

   const handleSearch=(val)=>{
       const field='documentname'
       console.log(val)
       ClinicServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
              // facility:user.currentEmployee.facilityDetail._id || "",
               // locationType:"Clinic",
               client:state.ClientModule.selectedClient._id,
               $limit:10,
                $sort: {
                    name: 1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Clinic  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Clinic, probable network issues "+ err )
                setError(true)
            })
        }
   
    const getFacilities= async(page=0)=>{
            /* const limit=20
            alert(page) */
            if (user.currentEmployee){
            
        const findClinic= await ClinicServ.find(
                {query: {
                    //locationType:"Clinic",
                    //facility:user.currentEmployee.facilityDetail._id,
                    client:state.ClientModule.selectedClient._id,
                    $limit:20,
                   /*  $skip:page*limit, */
                    $sort: {
                        createdAt: -1
                    }
                    }})
            const total= findClinic.total
            const ulimit=total*page
           /*  if (total>(ulimit)){ //only load if we have not reached the total
                alert("skip:",ulimit )
                console.log("skip:",ulimit ) */
            await setFacilities(findClinic.data)
            console.log(findClinic.data)
           /*  } */
                }
                else {
                    if (user.stacker){
                        const findClinic= await ClinicServ.find(
                            {query: {
                                client:state.ClientModule.selectedClient._id,
                                    $limit:20,
                                    $sort: {
                                        createdAt: -1
                                    }
                                }})
            
                    await setFacilities(findClinic.data)

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
            }
          

            useEffect(() => {
                getFacilities()
                if (user){
                    
                }else{
                    /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
                }
                ClinicServ.on('created', (obj)=>getFacilities(page))
                ClinicServ.on('updated', (obj)=>getFacilities(page))
                ClinicServ.on('patched', (obj)=>getFacilities(page))
                ClinicServ.on('removed', (obj)=>getFacilities(page))

                /* var options = {
                    root: null,
                    rootMargin: "20px",
                    threshold: 1.0
                 }; */
                // initialize IntersectionObserver
                // and attaching to Load More div
                /*  const observer = new IntersectionObserver(handleObserver, options);
                 if (loader.current) {
                    observer.observe(loader.current)
                 } */
                return () => {
                
                }
            },[])
           /*  useEffect(() => {
                // here we simulate adding new posts to List
                getFacilities()
            }, [page]) */

             // here we handle what happens when user scrolls to Load More div
            // in this case we just update page variable
                /* const handleObserver = (entities) => {
                    const target = entities[0];
                    if (target.isIntersecting) {   
                        setPage((page) => page + 1) //load more 
                        
                    }
                } */

    return (
        <div>
            <VideoConference/>
            <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search documentation"
                                        minLength={3}
                                        debounceTimeout={400}
                                        onChange={(e)=>handleSearch(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                   {/*  <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Clinics</span></div> */}
                    <div className="level-right">
                { !standalone &&   <div className="level-item"> 
                            <div className="level-item">
                            <div className="button is-danger is-small mr-2" onClick={handleNewPrescription}>Presciption</div>
                                <div className="button is-success is-small" onClick={handleNewDocument}>New Document</div>
                                </div>
                        </div>}
                    </div>

                </div>
                
                <div className=" pullup ">
                                <div className=" is-fullwidth vscrollable pr-1">
                                   
                                        {facilities.map((Clinic, i)=>(

                                            <div key={Clinic._id}  onClick={()=>handleRow(Clinic)}   className={Clinic._id===(selectedClinic?._id||null)?"is-selected":""}>
                                               <div className="card mt-1 hovercard">
                                                    <header className="card-header" onClick={(Clinic)=>Clinic.show=!Clinic.show}>
                                                        <div className="card-header-title">
                                                        <div className="docdate">{formatDistanceToNowStrict(new Date(Clinic.createdAt),{addSuffix: true})} <br/><span>{format(new Date(Clinic.createdAt),'dd-MM-yy')}</span></div> {Clinic.documentname} by {Clinic.createdByname} at {Clinic.location},{Clinic.facilityname} 
                                                        <p className="right ml-2 mr-0">{Clinic.status} </p> 
                                                        </div>
                                                       {/*  <button className="card-header-icon" aria-label="more options">
                                                        <span className="icon">
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </span>
                                                        </button> */}
                                                    </header>
                                                  {Clinic.documentname!=="Prescription" &&  <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"}>
                                                        { Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
                                                            <div className="field is-horizontal"> 
                                                                    <div className="field-label"> 
                                                                        <label className="label is-size-7" key={i}>
                                                                            {keys}:
                                                                            </label>
                                                                    </div>
                                                                    <div className="field-body"> 
                                                                        <div className="field" >
                                                                            {value}   
                                                                        </div>  
                                                                    </div>                                                 
                                                            </div>
                                                            ))
                                                        }
                                                </div>}
                                                {Clinic.documentname==="Prescription" &&  
                                                <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"}>
                                                        
                                                        {(Clinic.documentdetail.length>0) && <div>
                                                            <label>Medications:</label>
                                                        <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                                                <thead>
                                                                    <tr>
                                                                    <th><abbr title="Serial No">S/No</abbr></th>
                                                                
                                                                    <th><abbr title="Type">Medication</abbr></th>
                                                                    <th><abbr title="Destination">Destination</abbr></th>
                                                                    </tr>
                                                                </thead>
                                                                <tfoot>
                                                                    
                                                                </tfoot>
                                                                <tbody>
                                                                { Clinic.documentdetail.map((ProductEntry, i)=>(

                                                                        <tr key={i}>
                                                                        <th>{i+1}</th>
                                                                        {/* <td>{ProductEntry.name}</td> */}
                                                                        <td>{ProductEntry.medication}<br/>
                                                                        <span className="help is-size-7">{ProductEntry.instruction}</span></td> 
                                                                        <td>{ProductEntry.destination}</td>                                                                     
                                                                        </tr>

                                                                    ))}
                                                                </tbody>
                                                                </table>
                                                                </div>}                                                   
                                                            </div>}
                                                    </div>                                           
                                            </div>

                                        ))}
                                      {/* <!-- Add Ref to Load More div --> */}
                                       {/*  <div className="loading" ref={loader}>
                                                <h2>Load More</h2>
                                    </div> */}
                                </div>
                                    
                </div> 
                <div className={`modal  ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card ">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Document Class</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <DocumentClassList standalone="true" />
                                        </section>
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
                                    </div>
                                </div>
                                <div className={`modal ${showPrescriptionModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card larger">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Prescription</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowPrescriptionModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <Prescription standalone="true" />
                                        </section>
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
                                    </div>
                                </div>                            
        </div>
    )
}
