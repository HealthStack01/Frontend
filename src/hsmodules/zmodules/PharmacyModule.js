/* eslint-disable */
import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,   Link, NavLink} from 'react-router-dom'
import InventoryReport from './Pharmacy/InventoryReport'
import InventorySetup from './Pharmacy/InventorySetup'
import InventoryStore from './Pharmacy/InventoryStore'
import PharmacyHome from './Pharmacy/PharmacyHome'
import ProductEntry from './Pharmacy/ProductEntry'
import ProductExit from './Pharmacy/ProductExit'
import Dispense from './Pharmacy/Dispensary'
import Products from './Pharmacy/Products'
import BillService from './Finance/BillService'
import PharmacyPayment from './Pharmacy/PharmacyPayment'
import Pharmacy, { PharamcyList, PharmacyListStandalone } from './Pharmacy/Pharmacy'
import {UserContext,ObjectContext} from '../context'
import BillPrescription from './Pharmacy/BillPrescription'

export default function PharmacyModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    const {user,setUser}=useContext(UserContext)
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    const [showModal,setShowModal]=useState(false)
    const [showmenu, setShowMenu]=useState(false)

  
    
    useEffect(() => {
       
        console.log("starting up inventory module")
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
        locationType:"Pharmacy",
        locationId:state.StoreModule.selectedStore._id,
        facilityId:user.currentEmployee.facilityDetail._id   ,
        facilityName:user.currentEmployee.facilityDetail.facilityName
    }
   setState((prevstate)=>({...prevstate, employeeLocation:newEmployeeLocation}))

    },[state.StoreModule])

    const handleChangeStore= async()=>{
        await setShowModal(true)                                                                                                                                                        
       // console.log( showModal)
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
                                        Health Stack::Pharmacy::{selectedStore?selectedStore.name:""}</span>
                                        <button className="button is-small is-info selectadd" onClick={()=>handleChangeStore()}>Change Pharmacy</button> 
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
                                    <div className="navbar-item"   onClick={handleBurger}>
                                        <NavLink to={`${url}`}>Home Page</NavLink> 
                                    </div>
                                    {/* <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-stores`}>Stores</NavLink>
                                    </div> */}
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/billservice`}>Bill Client</NavLink>
                                    </div>
                                     <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-bill`}>Bill Prescription Sent</NavLink>
                                    </div>
                                   {/*  <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-payment`}>Payment</NavLink>
                                    </div> */}
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-dispense`}>Dispensary</NavLink>
                                    </div>
                                   
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-inventory`}>Store Inventory</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-entry`}>Product Entry</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-exit`}>POS</NavLink>
                                    </div>
                                  {user.stacker &&  <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-products`}>Products</NavLink>
                                    </div>}
                                   {/*  <div className="navbar-item"  onClick={handleBurger}>
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
                            <PharmacyHome />
                        </Route>
                        <Route path={`${path}/inv-dispense`} exact >
                            <Dispense />
                        </Route>
                        <Route path={`${path}/inv-bill`} exact >
                            <BillPrescription />
                        </Route>
                        <Route path={`${path}/inv-admin`} exact >
                            <InventorySetup />
                        </Route>
                        <Route path={`${path}/inv-inventory`} exact>
                            <InventoryStore />
                        </Route>
                        <Route path={`${path}/inv-entry`} exact>
                            <ProductEntry />
                        </Route>
                        <Route path={`${path}/inv-exit`} exact>
                            <ProductExit/>
                        </Route>
                        <Route path={`${path}/inv-products`} exact>
                            <Products />
                        </Route>
                        <Route path={`${path}/billservice`} exact>
                            <BillService />
                        </Route>
                        <Route path={`${path}/inv-reports`} exact>
                            <InventoryReport />
                        </Route>
                        <Route path={`${path}/inv-stores`} exact>
                            <Pharmacy />
                        </Route>
                        <Route path={`${path}/inv-payment`} exact>
                            <PharmacyPayment />
                        </Route>

                    </Switch>
                  

                    <div className={`modal ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Pharmacy</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <PharmacyListStandalone standalone="true" closeModal={()=>setShowModal(false)} />
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
