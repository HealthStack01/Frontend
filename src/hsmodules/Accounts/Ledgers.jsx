/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
/* import FacilityAccount from "./FacilityAccount" */
// eslint-disable-next-line
const searchfacility={};


export default function Ledgers() {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedInventory,setSelectedInventory]=useState()
    alert("ledger")
    //const [showState,setShowState]=useState() //create|modify|detail
    
    return(
        <section className= "section remPadTop">
           {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Inventory  Module</span></div>
            </div> */}
            <div className="columns ">
                <div className="column is-5 ">
                    <LedgerList />
                </div>
           <div className="column is-7 ">
          
                { (state.SelectedClient.show ==='detail') && <LedgerAccount />}
                {/*  {(state.InventoryModule.show ==='detail')&&<InventoryDetail  />}
                {(state.InventoryModule.show ==='modify')&&<InventoryModify Inventory={selectedInventory} />}*/}
               
            </div> 

            </div>                            
            </section>
       
    )
    
}

export function LedgerAccount(){
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


    const clientSel= state.SelectedClient.client
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
        getBalance()
        return () => {
           
        }
    }, [clientSel])



    const getaccountdetails=()=>{
        InventoryServ.find({query: {
            facility:user.currentEmployee.facilityDetail._id,
            client:clientSel.client,
           // storeId:state.StoreModule.selectedStore._id,
           // category:"credit",
            
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

    const getBalance=async ()=>{
        const findProductEntry= await SubwalletServ.find(
            {query: {
               
                client:clientSel.client,
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
    

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
         // data.createdby=user._id
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          }
        

      } 
    

    return (
        <>
            <div className="card cardheight">
                <div className="card-header">
                    <p className="card-header-title">
                        Account Details: {facility[0]?.fromName}
                    </p>
                    <button className="button is-success is-small btnheight mt-2" >
                    Current Balance: N {balance}
                 </button>
                </div>
                <div className="card-content ">
                
           {/*  <div className="level"> vscrollable
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Inventory  Module</span></div>
            </div> */}
            <div className="columns ">
                <div className="column is-6 ">
                    <div className="card cardht80">
                            <div className="card-header">
                                <p className="card-header-title">
                                    Credit
                                </p>
                            </div>
                            <div className="card-content vscrollable mx-0.5">
                                   
                                    <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable mx-0.5">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Cost Price">Date</abbr></th>
                                        <th><abbr title="Quantity">Amount</abbr></th>
                                        <th><abbr title="Base Unit">Mode</abbr></th>
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
                                        {Inventory.category==="credit" && 
                                            <tr key={Inventory._id} >
                                            <th>{i+1}</th>
                                            <td>{new Date(Inventory.createdAt).toLocaleString('en-GB')}</td> {/*add time  */}
                                            
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
                </div>
           <div className="column is-6 ">
                <div className="card cardht80">
                            <div className="card-header">
                                <p className="card-header-title">
                                Debit
                                </p>
                            </div>
                            <div className="card-content vscrollable mx-0.5">
                                   
                                    <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable  is-scrollable mx-0.5">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Cost Price">Date</abbr></th>
                                         <th><abbr title="Description">Description</abbr></th> 
                                        
                                        <th><abbr title="Quantity">Amount</abbr></th>
                                        <th><abbr title="Base Unit">Mode</abbr></th>
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
               
            </div> 

            </div>                            
           
            
                </div>
            </div>
        </>
    )
   
}

export function LedgerList(){
    // const { register, handleSubmit, watch, errors } = useForm();
     // eslint-disable-next-line
     const [error, setError] =useState(false)
      // eslint-disable-next-line
     const [success, setSuccess] =useState(false)
      // eslint-disable-next-line
    const [message, setMessage] = useState("") 
     const LocationServ=client.service('chartsofaccount')
     //const navigate=useNavigate()
    // const {user,setUser} = useContext(UserContext)
     const [facilities,setFacilities]=useState([])
      // eslint-disable-next-line
    const [selectedLocation, setSelectedLocation]=useState() //
     // eslint-disable-next-line
     const {state,setState}=useContext(ObjectContext)
     // eslint-disable-next-line
     const {user,setUser}=useContext(UserContext)
 
 
 
     const handleCreateNew = async()=>{
         const    newLocationModule={
             selectedAccount:{},
             show :'create'
             }
        await setState((prevstate)=>({...prevstate,  ChartAccountModule:newLocationModule}))
        //console.log(state)
         
 
     }
     const handleRow= async(Location)=>{
         //console.log("b4",state)
 
         //console.log("handlerow",Location)
 
         await setSelectedLocation(Location)
 
         const    newLocationModule={
             selectedAccount:Location,
             show :'detail'
         }
        await setState((prevstate)=>({...prevstate,  ChartAccountModule:newLocationModule}))
        //console.log(state)
 
     }
 
    const handleSearch=(val)=>{
        const field='name'
        console.log(val)
        LocationServ.find({query: {
                 [field]: {
                     $regex:val,
                     $options:'i'
                    
                 },
                facility:user.currentEmployee.facilityDetail._id || "",
                 $limit:100,
                 $sort: {
                     accountType: 1
                   }
                     }}).then((res)=>{
                 console.log(res)
                setFacilities(res.data)
                 setMessage(" Location  fetched successfully")
                 setSuccess(true) 
             })
             .catch((err)=>{
                 console.log(err)
                 setMessage("Error fetching Location, probable network issues "+ err )
                 setError(true)
             })
         }
    
         const getFacilities= async()=>{
             if (user.currentEmployee){
             
         const findLocation= await LocationServ.find(
                 {query: {
                    /*  facility:user.currentEmployee.facilityDetail._id, */
                     $limit:2000,
                     $sort: {
                         accountType: 1
                     }
                     }})
 
          await setFacilities(findLocation.data)
                 }
                 else {
                     if (user.stacker){
                         const findLocation= await LocationServ.find(
                             {query: {
                                 
                                 $limit:2000,
                                 $sort: {
                                     accountType: 1
                                 }
                                 }})
             
                     await setFacilities(findLocation.data)
 
                     }
                 }
           /*   .then((res)=>{
                 console.log(res)
                     setFacilities(res.data)
                     setMessage(" Location  fetched successfully")
                     setSuccess(true)
                 })
                 .catch((err)=>{
                     setMessage("Error creating Location, probable network issues "+ err )
                     setError(true)
                 }) */
             }
             
             useEffect(() => {
              
 
                 return () => {
                     
 
                 }
             },[])
 
             useEffect(() => {
                
                 if (user){
                     getFacilities()
                 }else{
                     /* const localUser= localStorage.getItem("user")
                     const user1=JSON.parse(localUser)
                     console.log(localUser)
                     console.log(user1)
                     fetchUser(user1)
                     console.log(user)
                     getFacilities(user) */
                 }
                 LocationServ.on('created', (obj)=>getFacilities())
                 LocationServ.on('updated', (obj)=>getFacilities())
                 LocationServ.on('patched', (obj)=>getFacilities())
                 LocationServ.on('removed', (obj)=>getFacilities())
                 return () => {
                 
                 }
             },[])
 
 
     //todo: pagination and vertical scroll bar
 
     return(
         <>
            {user?( <>  
                 <div className="level">
                     <div className="level-left">
                         <div className="level-item">
                             <div className="field">
                                 <p className="control has-icons-left  ">
                                     <DebounceInput className="input is-small " 
                                         type="text" placeholder="Search Locations"
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
                     <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Accounts </span></div>
                     <div className="level-right">
                         <div className="level-item"> 
                             <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                         </div>
                     </div>
 
                 </div>
                 <div className="table-container pullup  vscrola">
                                 <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                     <thead>
                                         <tr>
                                         <th><abbr title="Serial No">S/No</abbr></th>
                                         <th>Name</th>
                                         <th><abbr title="Account Type">Account Type</abbr></th>
                                        <th><abbr title="Account Class">Class</abbr></th>
                                          <th><abbr title="Subclass">Subclass</abbr></th>
                                          <th><abbr title="Code">Code</abbr></th>
                                         <th><abbr title="Description">Description</abbr></th>
                                         
                                        {/*  <th><abbr title="Departmental Unit">Departmental Unit</abbr></th>  */}
                                        {user.stacker && <th><abbr title="Facility">Facility</abbr></th>}
                                         {/* <th><abbr title="Actions">Actions</abbr></th> */}
                                         </tr>
                                     </thead>
                                     <tfoot>
                                         
                                     </tfoot>
                                     <tbody>
                                         {facilities.map((Location, i)=>(
 
                                             <tr key={Location._id} onClick={()=>handleRow(Location)} className={Location._id===(selectedLocation?._id||null)?"is-selected":""}>
                                             <th>{i+1}</th>
                                             <th>{Location.accountName}</th>
                                             <td>{Location.accountType}</td>
                                             <td>{Location.class}</td>
                                             <td>{Location.subclass}</td>
                                             <td>{Location.code}</td>
                                             <td>{Location.description}</td>
                                                {/*  <td>{Location.deptunit}</td>  */}
                                            {user.stacker &&  <td>{Location.facility}</td>}
                                            {/*  <td><span   className="showAction"  >...</span></td> */}
                                            
                                             </tr>
 
                                         ))}
                                     </tbody>
                                     </table>
                                     
                 </div>              
             </>):<div>loading</div>}
             </>
               
     )
     }