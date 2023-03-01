/* eslint-disable */
import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch, Link, NavLink} from 'react-router-dom'
import ChartofAccount from './Accounts/ChartofAccount'
import Expense from './Accounts/Expense'
import AccountHome from './Accounts/AccountHome'
import Payment from './Finance/Payment'
import Store, { StoreList, StoreListStandalone } from './Finance/Store' 
import {UserContext,ObjectContext} from '../context'
import Journal from './Accounts/Journal'
import Ledgers from './Accounts/Ledgers'
import Report from './Accounts/Report'

export default function AccountModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    const {user,setUser}=useContext(UserContext)
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    const [showModal,setShowModal]=useState(false)
    const [showmenu, setShowMenu]=useState(false)

  
    
    useEffect(() => {
       
        console.log("starting up Finance module")
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
        locationType:"Finance",
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
                                        Health Stack::Finance::{selectedStore?selectedStore.name:""}</span>
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
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/chartsaccount`}>Chart of Account</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/payment`}>Payment</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/expenses`}>Expenses</NavLink>
                                    </div> 
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/journal`}>Journal</NavLink>
                                    </div>
                                   
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/ledgers`}>Ledgers</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/reports`}>Reports</NavLink>
                                    </div>
                                     
                                   {/* <div className="navbar-item">
                                        <NavLink to={`${url}/inv-exit`}>Product Exit</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-products`}>Products</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-reports`}>Reports</NavLink>
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
                            <AccountHome />
                        </Route>
                        <Route path={`${path}/payments`} exact >
                            <Payment />
                        </Route>
                        <Route path={`${path}/expenses`} exact >
                            <Expense />
                        </Route>
                       <Route path={`${path}/reports`} exact >
                            <Report />
                        </Route>
                         <Route path={`${path}/journals`} exact>
                            <Journal/>
                        </Route>
                        <Route path={`${path}/ledgers`} exact>
                            <Ledgers/>
                        </Route>
                        <Route path={`${path}/chartsaccount`} exact>
                            <ChartofAccount />
                        </Route>
                        {/* <Route path={`${path}/inv-entry`} exact>
                            <ProductEntry />
                        </Route>
                        <Route path={`${path}/inv-exit`} exact>
                            <ProductExit/>
                        </Route>
                        <Route path={`${path}/inv-products`} exact>
                            <Products />
                        </Route>
                        <Route path={`${path}/inv-reports`} exact>
                            <FinanceReport />
                        </Route> 
                        <Route path={`${path}/location`} exact>
                            <Store />
                        </Route>*/}

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
