import React,{useState,useContext,useEffect} from 'react'
import {UserContext,ObjectContext} from '../context'



export default function LandingPage() {
    const {state,setState}=useContext(ObjectContext)
    
    const handleClick=async ()=>{
        //console.log(state.showpanel)
       await setState((prevstate)=>({...prevstate, showpanel:true}))
       //console.log(state)
       
    }

    return (
        <div>
           <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                    <h1 className="title">
                       Welcome!!
                    </h1>
                    <h2 className="subtitle">
                        Have fun working today!
                    </h2>
                    <button className="button is-info minHt pullup  startbutton " onClick={()=>handleClick()}>
                    Start Here !!
                    </button>
                    </div>

                </div>
            </section>
        </div>
    )
}
