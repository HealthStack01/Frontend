/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
// eslint-disable-next-line
const searchfacility={};

export default function FacilityAccount() {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedInventory,setSelectedInventory]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    
    return(
        <section className= "section remPadTop">
           {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Inventory  Module</span></div>
            </div> */}
            <div className="columns ">
            <div className="column is-3 ">
                   
                </div>
                <div className="column is-6 ">
                    <FacilityServiceRevenue />
                </div>
           <div className="column is-3 ">
          {/*  <FacilityAccount/>
                { (state.SelectedClient.show ==='detail') && <ClientAccount />} */}
                {/*  {(state.InventoryModule.show ==='detail')&&<InventoryDetail  />}
                {(state.InventoryModule.show ==='modify')&&<InventoryModify Inventory={selectedInventory} />}*/}
               
            </div> 

            </div>                            
            </section>
       
    )
    
}

export  function FacilityServiceRevenue(){
    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState([])
    const InventoryServ=client.service('subwallettransactions')
    const SubwalletServ=client.service('subwallet')
    //const navigate=useNavigate()
    const {user} = useContext(UserContext) //,setUser
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const [balance, setBalance]=useState(0)


    //const clientSel= state.SelectedClient.client
    const getSearchfacility=(obj)=>{
      /*   
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
    }
    
    useEffect(() => {
        setCurrentUser(user)
        //console.log(currentUser)
        return () => {
        
        }
    }, [user])

  //check user for facility or get list of facility  
   /*  useEffect(()=>{
        //setFacility(user.activeInventory.FacilityId)//
      if (!user.stacker){
          console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    }) */

    useEffect(() => {
        getaccountdetails()
        //getBalance()
        return () => {
           
        }
    }, [])



    const getaccountdetails=()=>{
        InventoryServ.find({query: {
            facility:user.currentEmployee.facilityDetail._id,
            //client:clientSel.client,
           // storeId:state.StoreModule.selectedStore._id,
            category:"debit",
            
            $sort: {
                createdAt: -1
            }
            }})
        .then((res)=>{
                console.log(res)
                setFacility(res.data)
                //e.target.reset();
               /*  setMessage("Created Inventory successfully") */
               // setSuccess(true)
                toast({
                    message: 'Account details succesful',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                 // setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error getting account details ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
    }

    /* const getBalance=async ()=>{
        const findProductEntry= await SubwalletServ.find(
            {query: {
               
                //client:clientSel.client,
                organization:user.currentEmployee.facilityDetail._id,
                //storeId:state.StoreModule.selectedStore._id,
                //clientId:state.ClientModule.selectedClient._id,
                $limit:100,
                $sort: {
                    createdAt: -1
                }
                }})
                 console.log(findProductEntry)
    
         // console.log("balance", findProductEntry.data[0].amount)
            if (findProductEntry.data.length>0){
                await setBalance(findProductEntry.data[0].amount)
            }else{
                await setBalance(0) 
                
            } 
    
          //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
            }   
    
 */
   /*  const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
         // data.createdby=user._id
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          }
        

      }  */
    

    return (
        <>
            <div className="card cardheight">
                <div className="card-header">
                    <p className="card-header-title">
                      Service  Revenue 
                    </p>
                   {/*  <button className="button is-success is-small btnheight mt-2" >
                    Current Balance: N {balance}
                 </button> */}
                </div>
               
                            <div className="card-content vscrollable mx-0.5">
                                   
                                    <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable  is-scrollable mx-0.5">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Date">Date</abbr></th>
                                        <th><abbr title="Client">Client</abbr></th>
                                         <th><abbr title="Description">Description</abbr></th> 
                                        
                                        <th><abbr title="Amount">Amount</abbr></th>
                                        <th><abbr title="Mode">Mode</abbr></th>
                                       {/*  <th><abbr title="Stock Value">Stock Value</abbr></th>
                                         
                                        <th><abbr title="Selling Price">Selling Price</abbr></th>
                                        <th><abbr title="Re-Order Level">Re-Order Level</abbr></th>
                                        <th><abbr title="Expiry">Expiry</abbr></th> 
                                        <th><abbr title="Actions">Actions</abbr></th> */}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facility.map((Inventory, i)=>(
                                        <>
                                          {Inventory.category==="debit" && <tr key={Inventory._id} >
                                            <th>{i+1}</th>
                                            <td>{new Date(Inventory.createdAt).toLocaleString('en-GB')}</td> {/*add time  */}
                                            <th>{Inventory.fromName}</th>
                                            <th>{Inventory.description}</th>
                                            <td>{Inventory.amount}</td>
                                            <td>{Inventory.paymentmode}</td>
                                            {/* <td>{Inventory.stockvalue}</td>
                                            <td>{Inventory.costprice}</td>
                                            <td>{Inventory.sellingprice}</td>
                                            <td>{Inventory.reorder_level}</td> 
                                            <td>{Inventory.expiry}</td>
                                            <td><span   className="showAction"  >...</span></td> */}
                                           
                                            </tr>

                                            }
                                        </>
                                        ))}
                                    </tbody>
                                    </table>
                                    
                        </div>              
                                    
                            </div>
                    </div>
               
           
        </>
    )
   
}

export  function HMOServiceRevenue(){
    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState([])
    const InventoryServ=client.service('subwallettransactions')
    const SubwalletServ=client.service('subwallet')
    //const navigate=useNavigate()
    const {user} = useContext(UserContext) //,setUser
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const [balance, setBalance]=useState(0)


    //const clientSel= state.SelectedClient.client
    const getSearchfacility=(obj)=>{
      /*   
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
    }
    
    useEffect(() => {
        setCurrentUser(user)
        //console.log(currentUser)
        return () => {
        
        }
    }, [user])

  //check user for facility or get list of facility  
   /*  useEffect(()=>{
        //setFacility(user.activeInventory.FacilityId)//
      if (!user.stacker){
          console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    }) */

    useEffect(() => {
        getaccountdetails()
        //getBalance()
        return () => {
           
        }
    }, [])



    const getaccountdetails=()=>{
        InventoryServ.find({query: {
            facility:user.currentEmployee.facilityDetail._id,
            //client:clientSel.client,
           // storeId:state.StoreModule.selectedStore._id,
            category:"debit",
            
            $sort: {
                createdAt: -1
            }
            }})
        .then((res)=>{
                console.log(res)
                setFacility(res.data)
                //e.target.reset();
               /*  setMessage("Created Inventory successfully") */
               // setSuccess(true)
                toast({
                    message: 'Account details succesful',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                 // setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error getting account details ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
    }

    /* const getBalance=async ()=>{
        const findProductEntry= await SubwalletServ.find(
            {query: {
               
                //client:clientSel.client,
                organization:user.currentEmployee.facilityDetail._id,
                //storeId:state.StoreModule.selectedStore._id,
                //clientId:state.ClientModule.selectedClient._id,
                $limit:100,
                $sort: {
                    createdAt: -1
                }
                }})
                 console.log(findProductEntry)
    
         // console.log("balance", findProductEntry.data[0].amount)
            if (findProductEntry.data.length>0){
                await setBalance(findProductEntry.data[0].amount)
            }else{
                await setBalance(0) 
                
            } 
    
          //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
            }   
    
 */
   /*  const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
         // data.createdby=user._id
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          }
        

      }  */
    

    return (
        <>
            <div className="card cardheight">
                <div className="card-header">
                    <p className="card-header-title">
                      Service  Revenue 
                    </p>
                   {/*  <button className="button is-success is-small btnheight mt-2" >
                    Current Balance: N {balance}
                 </button> */}
                </div>
               
                            <div className="card-content vscrollable mx-0.5">
                                   
                                    <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable  is-scrollable mx-0.5">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Date">Date</abbr></th>
                                        <th><abbr title="Client">Client</abbr></th>
                                         <th><abbr title="Description">Description</abbr></th> 
                                        
                                        <th><abbr title="Amount">Amount</abbr></th>
                                        <th><abbr title="Mode">Mode</abbr></th>
                                       {/*  <th><abbr title="Stock Value">Stock Value</abbr></th>
                                         
                                        <th><abbr title="Selling Price">Selling Price</abbr></th>
                                        <th><abbr title="Re-Order Level">Re-Order Level</abbr></th>
                                        <th><abbr title="Expiry">Expiry</abbr></th> 
                                        <th><abbr title="Actions">Actions</abbr></th> */}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facility.map((Inventory, i)=>(
                                        <>
                                          {Inventory.category==="debit" && <tr key={Inventory._id} >
                                            <th>{i+1}</th>
                                            <td>{new Date(Inventory.createdAt).toLocaleString('en-GB')}</td> {/*add time  */}
                                            <th>{Inventory.fromName}</th>
                                            <th>{Inventory.description}</th>
                                            <td>{Inventory.amount}</td>
                                            <td>{Inventory.paymentmode}</td>
                                            {/* <td>{Inventory.stockvalue}</td>
                                            <td>{Inventory.costprice}</td>
                                            <td>{Inventory.sellingprice}</td>
                                            <td>{Inventory.reorder_level}</td> 
                                            <td>{Inventory.expiry}</td>
                                            <td><span   className="showAction"  >...</span></td> */}
                                           
                                            </tr>

                                            }
                                        </>
                                        ))}
                                    </tbody>
                                    </table>
                                    
                        </div>              
                                    
                            </div>
                    </div>
               
           
        </>
    )
   
}