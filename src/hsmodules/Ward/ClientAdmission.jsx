/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'
//import BillDispenseCreate from './BillPrescriptionCreate'
//import PatientProfile from '../ClientMgt/PatientProfile'
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};


// Demo styles, see 'Styles' section below for some notes on use.



//fetching billed prescription for client
export default function ClientBilledAdmission({selectedClient}){
    // const { register, handleSubmit, watch, errors } = useForm();
     // eslint-disable-next-line
     const [error, setError] =useState(false)
      // eslint-disable-next-line
     const [success, setSuccess] =useState(false)
      // eslint-disable-next-line
    const [message, setMessage] = useState("") 
     const OrderServ=client.service('order')
     //const navigate=useNavigate()
    // const {user,setUser} = useContext(UserContext)
     const [clientOrders,setClientOrders]=useState([])
      // eslint-disable-next-line
    const [selectedDispense, setSelectedDispense]=useState() //
     // eslint-disable-next-line
     const {state,setState}=useContext(ObjectContext)
     // eslint-disable-next-line
     const {user,setUser}=useContext(UserContext)
     const [selectedMedication, setSelectedMedication] =useState("")


    // console.log(selectedClient)
 
     const handleSelectedClient= async(Client)=>{
         // await setSelectedClient(Client)
          const    newClientModule={
              selectedClient:Client,
              show :'detail'
          }
         await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
      }
 
     const handleMedicationRow= async(ProductEntry)=>{ //handle selected single order
         //console.log("b4",state)
     
         //console.log("handlerow",ProductEntry)
         await handleSelectedClient(ProductEntry.client)
 
     
         await setSelectedMedication(ProductEntry)
     
         const    newProductEntryModule={
             selectedMedication:ProductEntry,
             show :'detail'
         }
       await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
        //console.log(state)
       // ProductEntry.show=!ProductEntry.show
     
     }
 
     const handleCreateNew = async()=>{
         const    newProductEntryModule={
             selectedDispense:{},
             show :'create'
             }
        await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
        //console.log(state)
         
 
     }
   
 
     const handleSearch=(val)=>{
        const field='name'
        //console.log(val)
        OrderServ.find({query: {
                 order: {
                     $regex:val,
                     $options:'i'
                    
                 },
                 order_status: {
                     $regex:val,
                     $options:'i'
                    
                 },
                 order_status:"Billed",  
                 clientId:selectedClient,
                 order_category:"Lab Order",
                // storeId:state.StoreModule.selectedStore._id,
                //facility:user.currentEmployee.facilityDetail._id || "",
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
                // console.log(res)
                setClientOrders(res.data)
                 setMessage(" ProductEntry  fetched successfully")
                 setSuccess(true) 
             })
             .catch((err)=>{
                // console.log(err)
                 setMessage("Error fetching ProductEntry, probable network issues "+ err )
                 setError(true)
             })
         }
     const getFacilities= async()=>{
        
             // console.log("here b4 server")
     const findProductEntry= await OrderServ.find(
             {query: {
                 order_category:"Lab Order",
                 fulfilled:"False",
                 destination: user.currentEmployee.facilityDetail._id,
                 order_status:"Billed",  
                 clientId:selectedClient,//selectedClient, //
                 // need to set this finally
                 //storeId:state.StoreModule.selectedStore._id,
                 //clientId:state.ClientModule.selectedClient._id,
                 $limit:50,
                 $sort: {
                     createdAt: -1
                 }
                 }})
 
            // console.log("clientorders", findProductEntry)
             await setClientOrders(findProductEntry.data)
             //await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
             }   
 
     //1.consider using props for global data
     useEffect(() => {
         // console.log("started")
             getFacilities()
             OrderServ.on('created', (obj)=>getFacilities())
             OrderServ.on('updated', (obj)=>getFacilities())
             OrderServ.on('patched', (obj)=>getFacilities())
             OrderServ.on('removed', (obj)=>getFacilities())
             return () => {
             
             }
             },[])
 
         const handleRow= async(ProductEntry)=>{
     
         await setSelectedDispense(ProductEntry)
 
         const    newProductEntryModule={
             selectedDispense:ProductEntry,
             show :'detail'
         }
         await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
         //console.log(state)
         
         }
 
 
     return(     
             <>  
                 {/* <div className="level">
                     <div className="level-left">
                         <div className="level-item">
                             <div className="field">
                                 <p className="control has-icons-left  ">
                                     <DebounceInput className="input is-small " 
                                         type="text" placeholder="Search Medications"
                                         minLength={3}
                                         debounceTimeout={400}
                                         onChange={(e)=>handleSearch(e.target.value)} />
                                     <span className="icon is-small is-left">
                                         <i className="fas fa-search"></i>
                                     </span>
                                 </p>
                             </div>
                         </div>
                     </div> */}
                     {/* <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Billed Prescriptions </span></div> */}
                      {/* <div className="level-right">
                        <div className="level-item"> 
                             <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                         </div> 
                     </div>*/}
 
                 {/* </div> */}
                 <div className=" pullupx ">
                     <div className=" is-fullwidth vscrollable pr-1">   
                     <div>
                         
                             <div  >
                                <div >
                                <div  >
                                       {/*  {i+1}  {Clinic.clientname} with  */ } {clientOrders.length} billed test(s)  
                                 </div>
                                 </div>
                                 <div>
                                     <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                             <thead>
                                                 <tr>
                                                     <th><abbr title="Serial No">S/No</abbr></th>
                                                     <th><abbr title="Date">Date</abbr></th>
                                                     <th><abbr title="Order">Test</abbr></th>
                                                     <th>Fulfilled</th>
                                                     <th><abbr title="Status">Status</abbr></th>
                                                     <th><abbr title="Requesting Physician">Requesting Physician</abbr></th>
                                                 </tr>
                                             </thead>
                                             <tbody>
                                             { clientOrders.map((order, i)=>(
 
                                                         <tr key={order._id} /* onClick={()=>handleMedicationRow(order)} */ className={order._id===(selectedMedication?._id||null)?"is-selected":""}>                                         
                                                         <th>{i+1}</th>
                                                         <td><span>{format(new Date(order.createdAt),'dd-MM-yy')}</span></td> {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */} 
                                                         <th>{order.order}</th>
                                                         <td>{order.fulfilled==="True"?"Yes":"No"}</td>
                                                         <td>{order.order_status}</td>
                                                         <td>{order.requestingdoctor_Name}</td>
                                                         </tr>
                                                 ))}
                                             </tbody>
                                             </table>
 
                               </div>                                          
                                 </div>
                           
                             {/* <!-- Add Ref to Load More div --> */}
                             {/*  <div className="loading" ref={loader}>
                                     <h2>Load More</h2>
                         </div> */}
                         </div>
                     </div>                   
                 </div>  
             </>          
     )
     }
