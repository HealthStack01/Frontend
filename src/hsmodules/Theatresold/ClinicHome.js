/* eslint-disable */
import React ,{useState,useEffect,useContext} from 'react'
import Store, { StoreList } from './Clinic'
import {UserContext,ObjectContext} from '../../context'
import { Outlet } from 'react-router-dom'

export default function ClinicHome({children}) {
   // const [activeModal, setActiveModal]=useState("modal is-active ")
    const {state,setState}=useContext(ObjectContext)
    const handleCloseModal=()=>{
        state.showStoreModal  =  "modal"                                                                                                                                                        
        setState(state)
        console.log( state.showStoreModal)
    }
    
       
 
    return (
      <section className="section remPadTop">
        {/*  <div className="is-1"> Appointment sdchedule for patients for this clinic</div>
               <div className="is-1"> Communication Command Center</div>     */}
        <section className="hero is-info is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Clinic Module</h1>
              <h2 className="subtitle">Have fun working today!</h2>
            </div>
            <div className="layout__content-main">
              {children}
              <Outlet />
            </div>
          </div>
        </section>
      </section>
    );
}
