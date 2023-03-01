/* eslint-disable */
import React ,{useState,useContext,useEffect} from 'react'
import {Route, Switch,   Link, NavLink} from 'react-router-dom'
import CareTeam from './facility/CareTeam'
import Department from './facility/Department'
import DeptUnits from './facility/DeptUnits'
//import ReferralHome from './Referral/RefferalHome'
import ReferralHome from './Referral/ReferralHome'
import Employee from './facility/Employee'
import Facility from './facility/Facility'
import HSModules from './facility/HSModules'
import Location from './facility/Location'
import Roaster from './facility/Roaster'
import Workspace from './facility/Workspace'
import Accessibility from './facility/Accessibility'
import ClinicSetup from './Clinic/ClinicSetup'
import {UserContext,ObjectContext} from '../context'
import Bands from './facility/Bands'

export default function ReferralModule() {
    const [showmenu, setShowMenu]=useState(false)
  
    const {user,setUser}=useContext(UserContext)
    const handleBurger=()=>{
       
        setShowMenu(prev=>(!prev))
    }
    return (
            <section className="section has-background-info remPad">
               {/*  <div className=""> */}
                    <nav className="navbar minHt z10 has-background-info">
                        <div className="container minHt ">
                            <div className="navbar-brand minHt ">
                                <div className="navbar-item ">
                                    <span className="is-small has-text-weight-medium">Health Stack::Facility</span> 
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
                                        <NavLink to={`${url}/accessibility`}>User Access</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/careteam`}>Care Teams</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/department`}>Department</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/dept-unit`}>Department Units</NavLink>
                                    </div> 
                                     <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/hsmodules`}>Modules</NavLink>
                                    </div>*/}
                                     <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/inref`}>Incoming Referrals</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/outref`}>Outgoing Referrals</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/refaccount`}>Referral Account</NavLink>
                                    </div>
                                    {user.stacker &&  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/refsetup`}>Setup Referral</NavLink>
                                    </div>}
                                   { <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/setting`}> Settings</NavLink>
                                    </div>} 
                                    {/* <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/roaster`}>Roaster</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/workspace`}>Workspace</NavLink>
                                    </div> */}
                                    
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
                            <ReferralHome />
                        </Route>
                        <Route path={`${path}/inref`} exact >
                            <Accessibility />
                        </Route>
                      
                        <Route path={`${path}/outref`} exact>
                            <CareTeam />
                        </Route>
                        <Route path={`${path}/refaccount`} exact>
                            <Department/>
                        </Route>
                        <Route path={`${path}/refsetup`} exact>
                            <DeptUnits />
                        </Route>
                        <Route path={`${path}/setting`} >
                            <Employee />
                        </Route>
                        <Route path={`${path}/facility`} exact >
                            <Facility />
                        </Route>
                        <Route path={`${path}/hsmodules`} exact>
                            <HSModules />
                        </Route>
                        <Route path={`${path}/location`} exact>
                            <Location/>
                        </Route>
                        <Route path={`${path}/bands`} exact>
                            <Bands/>
                        </Route>
                        <Route path={`${path}/roaster`} exact>
                            <Roaster/>
                        </Route>
                        <Route path={`${path}/Workspace`} exact>
                            <Workspace />
                        </Route>
                        <Route path={`${path}/clinicsetup`} exact >
                            <ClinicSetup />
                        </Route>

                    </Switch>
                  

                
            </section>
    )
}
