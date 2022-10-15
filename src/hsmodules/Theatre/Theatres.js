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


export default function Theatre() {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    
    return(
        <section className= "section remPadTop">
           {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Store  Module</span></div>
            </div> */}
            <div className="columns ">
            <div className="column is-8 ">
                <StoreList />
                </div>
            <div className="column is-4 ">
                {(state.StoreModule.show ==='create')&&<StoreCreate />}
                {(state.StoreModule.show ==='detail')&&<StoreDetail  />}
                {(state.StoreModule.show ==='modify')&&<StoreModify Store={selectedStore} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function StoreCreate(){
    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const StoreServ=client.service('location')
    //const navigate=useNavigate()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()



    const getSearchfacility=(obj)=>{ // buble-up from inputsearch for creating resource
        
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    }
    
    useEffect(() => {
        setCurrentUser(user)
        //console.log(currentUser)
        return () => {
        
        }
    }, [user])

  //check user for facility or get list of facility  
    useEffect(()=>{
        //setFacility(user.activeStore.FacilityId)//
      if (!user.stacker){
          console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    })

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
          data.locationType="Theatre"
        StoreServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created Store successfully") */
                setSuccess(true)
                toast({
                    message: 'Theatre created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Laboratory ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 

    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Create Laboratory
                </p>
            </div>
            <div className="card-content vscrollable">
   
            <form onSubmit={handleSubmit(onSubmit)}>
               {/*  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small" ref={register({ required: true })}  name="StoreType" type="text" placeholder="Type of Store" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                </div> */}
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="name" type="text" placeholder="Name of Laboratory" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div>
           {/*  <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="profession" type="text" placeholder="Profession"/>
                    <span className="icon is-small is-left">
                    <i className=" fas fa-user-md "></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="phone" type="text" placeholder=" Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
            </div>
           
            <div className="field">
                <p className="control has-icons-left">
                
                    <input className="input is-small" ref={register({ required: true })} name="email" type="email" placeholder="Email"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div> */}
           <div className="field"  style={ !user.stacker?{display:"none"}:{}} >
                <InputSearch  getSearchfacility={getSearchfacility} clear={success} /> 
                <p className="control has-icons-left " style={{display:"none"}}>
                    <input className="input is-small" ref={register ({ required: true }) } name="facility" type="text" placeholder="Facility" />
                    <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                    </span>
                </p>
            </div>
           {/*  <div className="field">
                <div className="control has-icons-left">
                    <div className="dropdown ">
                        <div className="dropdown-trigger">
                            <input className="input is-small" ref={register({ required: true })} name="department" type="text" placeholder="Department"/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-hospital-symbol"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">
                                    simpa
                                </div>
                                <div className="dropdown-item is-active">
                                    simpa 2
                                </div>
                                <div className="dropdown-item">
                                    simpa 3
                                </div>
                                <div className="dropdown-item">
                                    simpa 4
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="deptunit" type="text" placeholder="Department Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="password" type="text" placeholder="password"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div> */}
            <div className="field">
                <p className="control">
                    <button className="button is-success is-small">
                        Create
                    </button>
                </p>
            </div>
            
            </form>
            </div>
            </div>
        </>
    )
   
}

export function StoreList({standalone,closeModal}){
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const StoreServ=client.service('location')
    //const navigate=useNavigate()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedStore, setSelectedStore]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newStoreModule={
            selectedStore:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, StoreModule:newStoreModule}))
       //console.log(state)
        

    }
    const handleRow= async(Store)=>{
        //console.log("b4",state)

        //console.log("handlerow",Store)

        await setSelectedStore(Store)

        const    newStoreModule={
            selectedStore:Store,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, StoreModule:newStoreModule}))
       //console.log(state)
       //closeModal()

    }

   const handleSearch=(val)=>{
       const field='name'
       console.log(val)
       StoreServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               facility:user.currentEmployee.facilityDetail._id || "",
                locationType:"Theatre",
               $limit:10,
                $sort: {
                    name: 1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Store  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Store, probable network issues "+ err )
                setError(true)
            })
        }
   
        const getFacilities= async()=>{
            if (user.currentEmployee){
            
        const findStore= await StoreServ.find(
                {query: {
                    locationType:"Laboratory",
                    facility:user.currentEmployee.facilityDetail._id,
                    $limit:20,
                    $sort: {
                        name: 1
                    }
                    }})

         await setFacilities(findStore.data)
                }
                else {
                    if (user.stacker){
                        const findStore= await StoreServ.find(
                            {query: {
                                locationType:"Theatre",
                                $limit:20,
                                $sort: {
                                    name: 1
                                }
                                }})
            
                    await setFacilities(findStore.data)

                    }
                }
          /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Store  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Store, probable network issues "+ err )
                    setError(true)
                }) */
            }
            
           
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
                StoreServ.on('created', (obj)=>getFacilities())
                StoreServ.on('updated', (obj)=>getFacilities())
                StoreServ.on('patched', (obj)=>getFacilities())
                StoreServ.on('removed', (obj)=>getFacilities())
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
                                        type="text" placeholder="Search Stores"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Theatre Locations </span></div>
                    <div className="level-right">
                { !standalone &&   <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>}
                    </div>

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th>Name</th>
                                        {/* <th><abbr title="Last Name">Store Type</abbr></th>
                                       <th><abbr title="Profession">Profession</abbr></th>
                                         <th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th>
                                        <th><abbr title="Department">Department</abbr></th>
                                        <th><abbr title="Departmental Unit">Departmental Unit</abbr></th> 
                                        <th><abbr title="Facility">Facility</abbr></th>*/}
                                       { !standalone &&  <th><abbr title="Actions">Actions</abbr></th>}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Store, i)=>(

                                            <tr key={Store._id} onClick={()=>handleRow(Store)} className={Store._id===(selectedStore?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{Store.name}</th>
                                            {/*<td>{Store.StoreType}</td>
                                            < td>{Store.profession}</td>
                                            <td>{Store.phone}</td>
                                            <td>{Store.email}</td>
                                            <td>{Store.department}</td>
                                            <td>{Store.deptunit}</td> 
                                            <td>{Store.facility}</td>*/}
                                          { !standalone &&   <td><span   className="showAction"  >...</span></td>}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>):<div>loading</div>}
            </>
              
    )
    }

    export function StoreListStandalone({standalone,closeModal}){
        // const { register, handleSubmit, watch, errors } = useForm();
         // eslint-disable-next-line
         const [error, setError] =useState(false)
          // eslint-disable-next-line
         const [success, setSuccess] =useState(false)
          // eslint-disable-next-line
        const [message, setMessage] = useState("") 
         const StoreServ=client.service('location')
         //const navigate=useNavigate()
        // const {user,setUser} = useContext(UserContext)
         const [facilities,setFacilities]=useState([])
          // eslint-disable-next-line
        const [selectedStore, setSelectedStore]=useState() //
         // eslint-disable-next-line
         const {state,setState}=useContext(ObjectContext)
         // eslint-disable-next-line
         const {user,setUser}=useContext(UserContext)
     
     
     
         const handleCreateNew = async()=>{
             const    newStoreModule={
                 selectedStore:{},
                 show :'create'
                 }
            await setState((prevstate)=>({...prevstate, StoreModule:newStoreModule}))
            //console.log(state)
             
     
         }
         const handleRow= async(Store)=>{
             //console.log("b4",state)
     
             //console.log("handlerow",Store)
     
             await setSelectedStore(Store)
     
             const    newStoreModule={
                 selectedStore:Store,
                 show :'detail'
             }
            await setState((prevstate)=>({...prevstate, StoreModule:newStoreModule}))
            //console.log(state)
            closeModal()
     
         }
     
        const handleSearch=(val)=>{
            const field='name'
            console.log(val)
            StoreServ.find({query: {
                     [field]: {
                         $regex:val,
                         $options:'i'
                        
                     },
                    facility:user.currentEmployee.facilityDetail._id || "",
                     locationType:"Theatre",
                    $limit:10,
                     $sort: {
                         name: 1
                       }
                         }}).then((res)=>{
                     console.log(res)
                    setFacilities(res.data)
                     setMessage(" Store  fetched successfully")
                     setSuccess(true) 
                 })
                 .catch((err)=>{
                     console.log(err)
                     setMessage("Error fetching Store, probable network issues "+ err )
                     setError(true)
                 })
             }
        
             const getFacilities= async()=>{
                 if (user.currentEmployee){
                 
             const findStore= await StoreServ.find(
                     {query: {
                         locationType:"Theatre",
                         facility:user.currentEmployee.facilityDetail._id,
                         $limit:20,
                         $sort: {
                             name: 1
                         }
                         }})
     
              await setFacilities(findStore.data)
                     }
                     else {
                         if (user.stacker){
                             const findStore= await StoreServ.find(
                                 {query: {
                                     locationType:"Theatre",
                                     $limit:20,
                                     $sort: {
                                         name: 1
                                     }
                                     }})
                 
                         await setFacilities(findStore.data)
     
                         }
                     }
               /*   .then((res)=>{
                     console.log(res)
                         setFacilities(res.data)
                         setMessage(" Store  fetched successfully")
                         setSuccess(true)
                     })
                     .catch((err)=>{
                         setMessage("Error creating Store, probable network issues "+ err )
                         setError(true)
                     }) */
                 }
                 
           
     
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
                     StoreServ.on('created', (obj)=>getFacilities())
                     StoreServ.on('updated', (obj)=>getFacilities())
                     StoreServ.on('patched', (obj)=>getFacilities())
                     StoreServ.on('removed', (obj)=>getFacilities())
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
                                             type="text" placeholder="Search Stores"
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
                         <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Theatre Locations </span></div>
                         <div className="level-right">
                     { !standalone &&   <div className="level-item"> 
                                 <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                             </div>}
                         </div>
     
                     </div>
                     <div className="table-container pullup ">
                                     <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                                         <thead>
                                             <tr>
                                             <th><abbr title="Serial No">S/No</abbr></th>
                                             <th>Name</th>
                                             {/* <th><abbr title="Last Name">Store Type</abbr></th>
                                            <th><abbr title="Profession">Profession</abbr></th>
                                              <th><abbr title="Phone">Phone</abbr></th>
                                             <th><abbr title="Email">Email</abbr></th>
                                             <th><abbr title="Department">Department</abbr></th>
                                             <th><abbr title="Departmental Unit">Departmental Unit</abbr></th> 
                                             <th><abbr title="Facility">Facility</abbr></th>*/}
                                            { !standalone &&  <th><abbr title="Actions">Actions</abbr></th>}
                                             </tr>
                                         </thead>
                                         <tfoot>
                                             
                                         </tfoot>
                                         <tbody>
                                             {facilities.map((Store, i)=>(
     
                                                 <tr key={Store._id} onClick={()=>handleRow(Store)} className={Store._id===(selectedStore?._id||null)?"is-selected":""}>
                                                 <th>{i+1}</th>
                                                 <th>{Store.name}</th>
                                                 {/*<td>{Store.StoreType}</td>
                                                 < td>{Store.profession}</td>
                                                 <td>{Store.phone}</td>
                                                 <td>{Store.email}</td>
                                                 <td>{Store.department}</td>
                                                 <td>{Store.deptunit}</td> 
                                                 <td>{Store.facility}</td>*/}
                                               { !standalone &&   <td><span   className="showAction"  >...</span></td>}
                                                
                                                 </tr>
     
                                             ))}
                                         </tbody>
                                         </table>
                                         
                     </div>              
                 </>):<div>loading</div>}
                 </>
                   
         )
         }
export function StoreDetail(){
    //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
     // eslint-disable-next-line
    const [error, setError] =useState(false) //, 
    //const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
    const [message, setMessage] = useState("") //,
    //const StoreServ=client.service('/Store')
    //const navigate=useNavigate()
    //const {user,setUser} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

   

   const Store =state.StoreModule.selectedStore 

    const handleEdit= async()=>{
        const    newStoreModule={
            selectedStore:Store,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, StoreModule:newStoreModule}))
       //console.log(state)
       
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                   Laboratory Details
                </p>
            </div>
            <div className="card-content vscrollable">
           
                <table> 
                <tbody>         
                <tr>
                    <td>
                
                    <label className="label is-small"> <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                        Name: 
                        </label>
                        </td>
                        <td>
                        <span className="is-size-7 padleft"   name="name"> {Store.name} </span>
                        </td>
                    </tr>
                    <tr>
                    <td>
                <label className="label is-small"><span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>Location Type:
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft"   name="StoreType">{Store.locationType} </span> 
                    </td>
                </tr>
                  {/*   <tr>
                    <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>Profession: 
                
                    
                    </label>
                    </td>
                <td>
                <span className="is-size-7 padleft "  name="StoreCity">{Store.profession}</span> 
                </td>
                </tr>
                    <tr>
            <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>Phone:           
                    
                        </label>
                        </td>
                        <td>
                        <span className="is-size-7 padleft "  name="StoreContactPhone" >{Store.phone}</span>
                        </td>
                  </tr>
                    <tr><td>
            
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>Email:                     
                    
                         </label></td><td>
                         <span className="is-size-7 padleft "  name="StoreEmail" >{Store.email}</span>
                         </td>
             
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i></span>Department:
                    
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft "  name="StoreOwner">{Store.department}</span>
                    </td>
               
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>Departmental Unit:              
                    
                </label></td>
                <td>
                <span className="is-size-7 padleft "  name="StoreType">{Store.deptunit}</span>
                </td>
              
                </tr> */}
                    
          {/*   <div className="field">
             <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>Category:              
                    <span className="is-size-7 padleft "  name= "StoreCategory">{Store.StoreCategory}</span>
                </label>
                 </div> */}

            </tbody> 
            </table> 
           
            <div className="field mt-2">
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Edit
                    </button>
                </p>
            </div>
            { error && <div className="message"> {message}</div>}
           
        </div>
        </div>
        </>
    )
   
   
}

export function StoreModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); //watch, errors,
    // eslint-disable-next-line 
    const [error, setError] =useState(false)
    // eslint-disable-next-line 
    const [success, setSuccess] =useState(false)
    // eslint-disable-next-line 
    const [message,setMessage] = useState("")
    // eslint-disable-next-line 
    const StoreServ=client.service('location')
    //const navigate=useNavigate()
     // eslint-disable-next-line
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const Store =state.StoreModule.selectedStore 

        useEffect(() => {
            setValue("name", Store.name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("locationType", Store.locationType,  {
                shouldValidate: true,
                shouldDirty: true
            })
           /*  setValue("profession", Store.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Store.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Store.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Store.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Store.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
          /*   setValue("StoreCategory", Store.StoreCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newStoreModule={
        selectedStore:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, StoreModule:newStoreModule}))
   //console.log(state)
           }


        const changeState =()=>{
        const    newStoreModule={
            selectedStore:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, StoreModule:newStoreModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=Store._id
        if (conf){
             
        StoreServ.remove(dleteId)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                reset();
               /*  setMessage("Deleted Store successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
                toast({
                    message: 'Store deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
               // setMessage("Error deleting Store, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error deleting Store, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
        }
    }
        

   /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
    const onSubmit = (data,e) =>{
        e.preventDefault();
        
        setSuccess(false)
        console.log(data)
        data.facility=Store.facility
          //console.log(data);
          
        StoreServ.patch(Store._id,data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
               // e.target.reset();
               // setMessage("updated Store successfully")
                 toast({
                    message: 'Store updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                //setMessage("Error creating Store, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error updating Store, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 
     
      
    return (
        
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Store Details-Modify
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label is-small"> Name
                    <p className="control has-icons-left has-icons-right">
                        <input className="input  is-small" ref={register({ required: true })}  name="name" type="text" placeholder="Name" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                    </label>
                    </div>
                <div className="field">
                <label className="label is-small">Location Type
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small " ref={register({ required: true })} disabled name="StoreType" type="text" placeholder="Store Type" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
                </label>
                </div>
            {/* <div className="field">
            <label className="label is-small">Profession
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="profession" type="text" placeholder="Profession"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Phone
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="phone" type="text" placeholder="Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
                </label>
                 </div>
            <div className="field">
            <label className="label is-small">Email
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="email" type="email" placeholder="Store Email"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Department
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="department" type="text" placeholder="Department"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                    </span>
                </p>
                </label>
                {errors.department && <span>This field is required</span>}
                </div>
            <div className="field">
            <label className="label is-small">Departmental Unit
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="deptunit" type="text" placeholder="Departmental Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>
                </p>
                </label>
                </div> */}
           {/*  <div className="field">
            <label className="label is-small">Category
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="StoreCategory" type="text" placeholder="Store Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
                </label>
            </div> */}
           
           
            </form>
            
            <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" onClick={handleSubmit(onSubmit)}>
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" onClick={handleCancel}>
                        Cancel
                    </button>
                </p>
                {/* <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
            </div>
        </div>
        </div>
        </>
    )
   
   
                
}   

export  function InputSearch({getSearchfacility,clear}) {
    
    const facilityServ=client.service('facility')
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
     const [searchError, setSearchError] =useState(false)
     // eslint-disable-next-line
    const [showPanel, setShowPanel] =useState(false)
     // eslint-disable-next-line
   const [searchMessage, setSearchMessage] = useState("") 
   // eslint-disable-next-line 
   const [simpa,setSimpa]=useState("")
   // eslint-disable-next-line 
   const [chosen,setChosen]=useState(false)
   // eslint-disable-next-line 
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)


   const handleRow= async(obj)=>{
        await setChosen(true)
        //alert("something is chaning")
       getSearchfacility(obj)
       
       await setSimpa(obj.facilityName)
       
        // setSelectedFacility(obj)
        setShowPanel(false)
        await setCount(2)
        /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
   //console.log(state)
}
    const handleBlur=async(e)=>{
         if (count===2){
             console.log("stuff was chosen")
         }
       
       /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
    }
    const handleSearch=async(val)=>{
        
        const field='facilityName' //field variable
       
        if (val.length>=3){
            facilityServ.find({query: {     //service
                 [field]: {
                     $regex:val,
                     $options:'i'
                    
                 },
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
              console.log("facility  fetched successfully") 
                setFacilities(res.data)
                 setSearchMessage(" facility  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                 console.log(err)
                 setSearchMessage("Error searching facility, probable network issues "+ err )
                 setSearchError(true)
             })
         }
        else{
            console.log("less than 3 ")
            console.log(val)
            setShowPanel(false)
            await setFacilities([])
            console.log(facilities)
        }
    }
    useEffect(() => {
       if (clear){
           setSimpa("")
       }
        return () => {
            
        }
    }, [clear] )
    return (
        <div>
            <div className="field">
                <div className="control has-icons-left  ">
                    <div className={`dropdown ${showPanel?"is-active":""}`}>
                        <div className="dropdown-trigger">
                            <DebounceInput className="input is-small " 
                                type="text" placeholder="Search Facilities"
                                value={simpa}
                                minLength={1}
                                debounceTimeout={400}
                                onBlur={(e)=>handleBlur(e)}
                                onChange={(e)=>handleSearch(e.target.value)}
                                inputRef={inputEl}
                                  />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        {searchError&&<div>{searchMessage}</div>}
                        <div className="dropdown-menu" >
                            <div className="dropdown-content">
                            {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)} >
                                        
                                        <span>{facility.facilityName}</span>
                                        
                                    </div>
                                    
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    )
}