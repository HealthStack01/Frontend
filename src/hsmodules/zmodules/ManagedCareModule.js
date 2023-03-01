/* eslint-disable */
import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,   Link, NavLink} from 'react-router-dom'
import Analytics from './ManagedCare/Analytics'
import Beneficiary from './ManagedCare/Beneficiary'
import Checkin from './ManagedCare/Checkin'
import ManagedCareHome from './ManagedCare/ManagedCareHome'
import Claims from './ManagedCare/Claims'
import Complaints from './ManagedCare/Complaints'
import Payment from './ManagedCare/Payment'
import OrganizationClient from './ManagedCare/OrganizationClient'
import Corporate from './ManagedCare/Corporate'
import Store, { StoreList, StoreListStandalone } from './ManagedCare/ManagedcareLocation'
import {UserContext,ObjectContext} from '../context'
import Preauthourization from './ManagedCare/Preauthorization'
import ManagedServices from './ManagedCare/ManagedServices'
import FundsManagement from './ManagedCare/FundsManagement'
import HealthPlan from './ManagedCare/HealthPlan'
import Policy from './ManagedCare/Policy'
import HIA from './ManagedCare/HIA'
import ProviderPayment from './ManagedCare/ProviderPayment'
import Providers from './ManagedCare/Providers'
import Referral from './ManagedCare/Referral'
import UserManagement from './ManagedCare/UserManagement'

export default function ManagedCareModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    const {user,setUser}=useContext(UserContext)
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    const [showModal,setShowModal]=useState(false)
    const [showmenu, setShowMenu]=useState(false)

  
    
    useEffect(() => {
       
        console.log("starting up ManagedCare module")
        if (!selectedStore){
            handleChangeStore()


            }
         return () => {       
            }
        }, [])
   
    useEffect(()=>{
     setSelectedStore(state.StoreModule.selectedStore)

     const    newEmployeeLocation={
        locationName:state.StoreModule.selectedStore.name,
        locationType:"ManagedCare",
        locationId:state.StoreModule.selectedStore._id,
        facilityId:user.currentEmployee.facilityDetail._id   ,
        facilityName:user.currentEmployee.facilityDetail.facilityName
    }
   setState((prevstate)=>({...prevstate, employeeLocation:newEmployeeLocation}))

    },[state.StoreModule])

    const handleChangeStore= async()=>{
        await setShowModal(true)                                                                                                                                                        
        console.log( showModal)
    }

    const handleBurger=()=>{
        
        setShowMenu(prev=>(!prev))
    }

    return (
            <section className="section has-background-info remPad">
               
               {/*  <div className=""> */}
                    <nav className="navbar minHt z10 has-background-info">
                        <div className="container minHt ">
                            <div className="navbar-brand minHt">
                                <div className="navbar-item ">
                                    <span className="is-small has-text-weight-medium">
                                        Health Stack::ManagedCare::{selectedStore?selectedStore.name:""}</span>
                                        <button className="button is-small is-info selectadd" onClick={()=>handleChangeStore()}>Change Location</button> 
                                </div>
                                
                            {/* <div className="navbar-item">
                                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                            </div> */}
                                <span className="navbar-burger minHt" data-target="navbarMenuHeroB" onClick={handleBurger}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroB" className={`navbar-menu minHt  has-background-info ${showmenu?"is-active":""}`}>
                                <div className={`navbar-end ${showmenu?"bckcolor":""}`}>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}`}>Home Page</NavLink> 
                                    </div>

                                    {/*  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/analytics`}>Analytics</NavLink>
                                    </div> */}
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/policy`}>Policy</NavLink>
                                    </div>
                                     <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/beneficiaries`}>Beneficiaries</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/checkin`}>Check In</NavLink>
                                    </div>
                                   {/*  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/claims`}>Claims</NavLink>
                                    </div> */}
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/provider`}> Provider</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/Corporate`}>Corporate</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/complaints`}>Complaints</NavLink>
                                    </div>
                                   {/*  <div className="navbar-item">
                                        <NavLink to={`${url}/fundsmgt`}>Funds Management</NavLink>
                                    </div> */}
                                   {/*  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/healthplan`}>Health Plans</NavLink>
                                    </div>  */}
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/hia`}>HIA</NavLink>
                                    </div>
                                    
                                   
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/premium`}>Premiums</NavLink>
                                    </div>
                                   {/*  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/preauths`}>Preauthourization</NavLink>
                                    </div> */}
                                   {/*  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/providerpayment`}>Provider Payment</NavLink>
                                    </div> */}
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/organization`}>Organizations</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/referral`}>Referrals</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/services`}>Tariff</NavLink>
                                    </div>
                                     
                                 
                                   {/*  <div className="navbar-item">
                                        <NavLink to={`${url}/usermgt`}>User Mgt</NavLink>
                                    </div> */}
                                    {/* <div className="navbar-item">
                                        <NavLink to={`${url}/inv-reports`}>Reports</NavLink>
                                    </div>  */}
                                {/* <span className="navbar-item">
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
                            <ManagedCareHome />
                        </Route>
                        <Route path={`${path}/organization`} exact>
                            <OrganizationClient />
                        </Route>
                        <Route path={`${path}/policy`} exact>
                            <Policy />
                        </Route>
                        <Route path={`${path}/services`} exact >
                            <ManagedServices />
                        </Route>
                        <Route path={`${path}/payment`} exact >
                            <Payment />
                        </Route>                  
                         <Route path={`${path}/beneficiaries`} exact>
                            <Beneficiary/>
                        </Route>
                        <Route path={`${path}/Analytics`} exact>
                            <Analytics />
                        </Route>
                        <Route path={`${path}/checkin`} exact >
                            <Checkin />
                        </Route>
                        <Route path={`${path}/claims`} exact >
                            <Claims />
                        </Route>                  
                         <Route path={`${path}/complaints`} exact>
                            <Complaints/>
                        </Route>
                        <Route path={`${path}/corporate`} exact>
                            <Corporate />
                        </Route>
                        <Route path={`${path}/fundsmgt`} exact>
                            <FundsManagement />
                        </Route>
                        <Route path={`${path}/Healthplan`} exact >
                            <HealthPlan />
                        </Route>
                        <Route path={`${path}/hia`} exact >
                            <HIA />
                        </Route>                  
                         <Route path={`${path}/premium`} exact>
                            <Payment/>
                        </Route>
                        <Route path={`${path}/preauth`} exact>
                            <Preauthourization />
                        </Route>
                        <Route path={`${path}/providerpayment`} exact >
                            <ProviderPayment />
                        </Route> 
                        <Route path={`${path}/provider`} exact >
                            <Providers />
                        </Route>                   
                         <Route path={`${path}/referral`} exact>
                            <Referral/>
                        </Route>
                        <Route path={`${path}/usermgt`} exact>
                            <UserManagement/>
                        </Route>
                    </Switch>
                  

                    <div className={`modal ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Location</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <StoreListStandalone standalone="true" closeModal={()=>setShowModal(false)} />
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
