/* eslint-disable */
import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,   Link, NavLink} from 'react-router-dom'
import ClinicReport from './Ward/ClinicReport'
import Discharge from './Ward/Discharge'
import Transfer from './Ward/Transfer'
import WardHome from './Ward/WardHome'
import Inpatient from './Ward/Inpatient'
import Admissions from './Ward/Admissions'
import Encounter from './EncounterMgt/Encounter'
import Patients from './ClientMgt/Patient'
import Ward, { WardList } from './Ward/Ward'
import {UserContext,ObjectContext} from '../context'

export default function WardModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    const {user,setUser}=useContext(UserContext)
    // eslint-disable-next-line
    const [selectedClinic,setSelectedClinic]=useState()
    const [showModal,setShowModal]=useState(false)
    const [showmenu, setShowMenu]=useState(false)
  
    
    useEffect(() => {
       
       // console.log("starting up Client module")
        if (!selectedClinic){
            handleChangeClinic()

            }
         return () => {       
            }
        }, [])
   
    useEffect(()=>{
     setSelectedClinic(state.WardModule.selectedWard)

     const    newEmployeeLocation={
        locationName:state.WardModule.selectedWard.name,
        locationType:"Ward",
        locationId:state.WardModule.selectedWard._id,
        facilityId:user.currentEmployee.facilityDetail._id   ,
        facilityName:user.currentEmployee.facilityDetail.facilityName
    }
   setState((prevstate)=>({...prevstate, employeeLocation:newEmployeeLocation}))

    },[state.WardModule.selectedWard])

    const handleChangeClinic= async()=>{
        await setShowModal(true)                                                                                                                                                        
       // console.log( showModal)
    }

    const handleBurger=()=>{
       
        setShowMenu(prev=>(!prev))
    }
//
    return (
            <section className="section has-background-info remPad">

               {/*  <div className=""> */}
                    <nav className="navbar minHt z10 has-background-info">
                        <div className="container minHt">
                            <div className="navbar-brand  minHt">
                                <div className="navbar-item ">
                                    <span className="is-small has-text-weight-medium">
                                        HealthStack:: Ward ::{selectedClinic?selectedClinic.name:""}</span>
                                        <button className="button is-small is-info selectadd" onClick={()=>handleChangeClinic()}>Change Location</button> 
                                </div>
                                
                            {/* <div className="navbar-item">
                                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                            </div> */}
                                <span className="navbar-burger minHt" data-target="navbarMenuHeroB"  onClick={handleBurger}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroB" className={`navbar-menu minHt  has-background-info ${showmenu?"is-active":""}`}>
                                <div className={`navbar-end ${showmenu?"bckcolor":""}`}>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}`}>Home Page</NavLink> 
                                    </div>
                                    {/* <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/frontdesk`}>Front Desks</NavLink>
                                    </div> */}
                                  
                                     <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/admissions`}>Admission List</NavLink>
                                    </div>
                                 
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/inpatients`}>Inpatient</NavLink>
                                    </div>
                                     {/* <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/transfer`}>Transfer List</NavLink>
                                    </div> */} 
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/discharge`}>Discharge List</NavLink>
                                    </div> 
                                     {/*  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/clinicsetup`}> Clinic Admin</NavLink>
                                    </div> */}
                                    {/* <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/clinicreports`}>Reports</NavLink>
                                    </div> */}
                                {/* <span className="navbar-item" onClick={handleBurger}>
                                <div className="button is-info is-inverted">
                                    <span className="icon">
                                    <i className="fab fa-github"></i>
                                    </span>
                                    <span>Download</span>
                                </div>
                                </span> */}
                                </div>
                            </div>
                        </div>
                    </nav>
                    
               {/*  </div> */}
                
                {/* <div className="section"> */}
                {/* <div className="container mvUp " > */}
                       
                    <Switch>
                        <Route path={path} exact>
                            <WardHome />
                        </Route>
                        <Route path={`${path}/transfer`} exact >
                            <Transfer />
                        </Route>
                        <Route path={`${path}/inpatients`} exact>
                            <Inpatient/>
                        </Route>
                        <Route path={`${path}/admissions`} exact>
                            <Admissions />
                        </Route>
                        <Route path={`${path}/encounter`} exact>
                            <Encounter/>
                        </Route>
                        <Route path={`${path}/discharge`} exact>
                            <Discharge />
                        </Route>
                      {/*   <Route path={`${path}/clinicreports`} exact>
                            <ClinicReport />
                        </Route>
                        <Route path={`${path}/frontdesk`} exact>
                            <FrontDesk />
                        </Route> */}
                        

                    </Switch>
                  

                    <div className={`modal ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Location</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <WardList standalone="true"  closeModal={()=>setShowModal(false)}/>
                                        </section>
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
                                    </div>
                                </div>        
            </section>
    )
}
