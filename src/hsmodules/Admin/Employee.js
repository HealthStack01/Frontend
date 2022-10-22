/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import ModuleList from './ModuleList'
import {toast} from 'bulma-toast'
// eslint-disable-next-line
const searchfacility={};


export default function Employee() {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedEmployee,setSelectedEmployee]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    
    return(
        <section className= "section remPadTop">
           {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Employee  Module</span></div>
            </div> */}
            <div className="columns ">
            <div className="column is-8 ">
                <EmployeeList />
                </div>
            <div className="column is-4 ">
                {(state.EmployeeModule.show ==='create')&&<EmployeeCreate />}
                {(state.EmployeeModule.show ==='detail')&&<EmployeeDetail  />}
                {(state.EmployeeModule.show ==='modify')&&<EmployeeModify Employee={selectedEmployee} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function EmployeeCreate(){
    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const EmployeeServ=client.service('employee')
    //const navigate=useNavigate()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()



    const getSearchfacility=(obj)=>{
        
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
        //setFacility(user.activeEmployee.FacilityId)//
      if (!user.stacker){
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    },[user])

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
          data.createdby=user._id
          //console.log(data);
          if (user.currentEmployee){
         // data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          }
        EmployeeServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created Employee successfully") */
                setSuccess(true)
                toast({
                    message: 'Employee created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating employee ' + err,
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
                    Create Employee
                </p>
            </div>
            <div className="card-content vscrollable">
            { success && <div className="message"> {message}</div>}
            { error && <div className="is-danger"> {message}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small" ref={register({ required: true })}  name="firstname" type="text" placeholder="First Name" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="lastname" type="text" placeholder="Last Name" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div>
            <div className="field">
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
            </div>
           <div className="field"  style={ !user.stacker?{display:"none"}:{}} >
                <InputSearch  getSearchfacility={getSearchfacility} clear={success} /> 
                <p className="control has-icons-left " style={{display:"none"}}>
                    <input className="input is-small" ref={register({ required: true })} name="facility" type="text" placeholder="Facility" />
                    <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                    </span>
                </p>
            </div>
            <div className="field">
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
            </div>
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

export function EmployeeList(){
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const EmployeeServ=client.service('employee')
    //const navigate=useNavigate()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedEmployee, setSelectedEmployee]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newEmployeeModule={
            selectedEmployee:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, EmployeeModule:newEmployeeModule}))
       //console.log(state)
        

    }
    const handleRow= async(Employee)=>{
        //console.log("b4",state)

        //console.log("handlerow",Employee)

        await setSelectedEmployee(Employee)

        const    newEmployeeModule={
            selectedEmployee:Employee,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, EmployeeModule:newEmployeeModule}))
       //console.log(state)

    }

   const handleSearch=(val)=>{
       const field='firstname'
       console.log(val)
       EmployeeServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               facility:user.currentEmployee.facilityDetail._id || "",
                $limit:1000,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Employee  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Employee, probable network issues "+ err )
                setError(true)
            })
        }
   
        const getFacilities= async()=>{
            if (user.currentEmployee){
            
        const findEmployee= await EmployeeServ.find(
                {query: {
                    facility:user.currentEmployee.facilityDetail._id,
                    $limit:200,
                    $sort: {
                        createdAt: -1
                    }
                    }})

         await setFacilities(findEmployee.data)
                }
                else {
                    if (user.stacker){
                        const findEmployee= await EmployeeServ.find(
                            {query: {
                                
                                $limit:100,
                                $sort: {
                                    facility: -1
                                }
                                }})
            
                    await setFacilities(findEmployee.data)

                    }
                }
         
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
                EmployeeServ.on('created', (obj)=>getFacilities())
                EmployeeServ.on('updated', (obj)=>getFacilities())
                EmployeeServ.on('patched', 
                    (obj)=>{
                        getFacilities()
                        //console.log(facilities.filter(el=>(el._id=selectedEmployee._id)))

                })
                EmployeeServ.on('removed', (obj)=>getFacilities())
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
                                        type="text" placeholder="Search Facilities"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Employees </span></div>
                    <div className="level-right">
                        <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>
                    </div>

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th>First Name</th>
                                        <th><abbr title="Last Name">Last Name</abbr></th>
                                        <th><abbr title="Profession">Profession</abbr></th>
                                        <th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th>
                                        <th><abbr title="Department">Department</abbr></th>
                                        <th><abbr title="Departmental Unit">Departmental Unit</abbr></th>
                                       {/*  <th><abbr title="Facility">Facility</abbr></th>
                                        <th><abbr title="Actions">Actions</abbr></th> */}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Employee, i)=>(

                                            <tr key={Employee._id} onClick={()=>handleRow(Employee)}>
                                            <th>{i+1}</th>
                                            <th>{Employee?.firstname}</th>
                                            <td>{Employee?.lastname}</td>
                                            <td>{Employee?.profession}</td>
                                            <td>{Employee?.phone}</td>
                                            <td>{Employee?.email}</td>
                                            <td>{Employee?.department}</td>
                                            <td>{Employee?.deptunit}</td>
                                            {/* <td>{Employee.facility}</td>
                                            <td><span   className="showAction"  >...</span></td> */}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>):<div>loading</div>}
            </>
              
    )
    }


export function EmployeeDetail(){
    //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
     // eslint-disable-next-line
    const [error, setError] =useState(false) //, 
    //const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
    const [message, setMessage] = useState("") //,
    //const EmployeeServ=client.service('/Employee')
    //const navigate=useNavigate()
    //const {user,setUser} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)
    const [showRoles, setShowRoles] = useState("") 

   

   const Employee =state.EmployeeModule.selectedEmployee 

    const handleEdit= async()=>{
        const    newEmployeeModule={
            selectedEmployee:Employee,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, EmployeeModule:newEmployeeModule}))
       //console.log(state)
       
    }
    const handleRoles=()=>{
        setShowRoles(true)
    }
    const handlecloseModal =()=>{
        setShowRoles(false)
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Employee Details
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <fieldset>
                <tr>
                    <td>
                
                    <label className="label is-small"> <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                        First Name: 
                        </label>
                        </td>
                        <td>
                        <span className="is-medium "   name="EmployeeName"> {Employee?.firstname} </span>
                        </td>
                    </tr>
                    <tr>
                    <td>
                <label className="label is-small"><span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>Last Name:
                    </label></td>
                    <td>
                    <span className="is-small "  name="EmployeeAddress">{Employee?.lastname} </span> 
                    </td>
                </tr>
                    <tr>
                    <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>Profession: 
                
                    
                    </label>
                    </td>
                <td>
                <span className="is-small "  name="EmployeeCity">{Employee?.profession}</span> 
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
                        <span className="is-small "  name="EmployeeContactPhone" >{Employee?.phone}</span>
                        </td>
                  </tr>
                    <tr><td>
            
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>Email:                     
                    
                         </label></td><td>
                         <span className="is-small "  name="EmployeeEmail" >{Employee?.email}</span>
                         </td>
             
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i></span>Department:
                    
                    </label></td>
                    <td>
                    <span className="is-small "  name="EmployeeOwner">{Employee?.department}</span>
                    </td>
               
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>Departmental Unit:              
                    
                </label></td>
                <td>
                <span className="is-small "  name="EmployeeType">{Employee?.deptunit}</span>
                </td>
              
                </tr>
                    
          {/*   <div className="field">
             <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>Category:              
                    <span className="is-small "  name= "EmployeeCategory">{Employee.EmployeeCategory}</span>
                </label>
                 </div> */}


        <div className="field mt-2 is-grouped"> 
           
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Edit
                    </button>
                </p>
         
          
                <p className="control">
                    <button className="button is-info is-small" onClick={handleRoles}>
                        Set Roles
                    </button>
                </p>
         
            </div>
            { error && <div className="message"> {message}</div>}
            </fieldset>
        </div>
        </div>
        <div className={`modal ${showRoles?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head minHt">
                                        <p className="modal-card-title">Employee Roles</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        {/* <StoreList standalone="true" /> */}
                                        <ModuleList handlecloseModal={handlecloseModal}/>
                                        </section>
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
                                    </div>
                                </div>  
        </>
    )
   
   
}

export function EmployeeModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); //watch, errors,
    // eslint-disable-next-line 
    const [error, setError] =useState(false)
    // eslint-disable-next-line 
    const [success, setSuccess] =useState(false)
    // eslint-disable-next-line 
    const [message,setMessage] = useState("")
    // eslint-disable-next-line 
    const EmployeeServ=client.service('employee')
    //const navigate=useNavigate()
     // eslint-disable-next-line
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const Employee =state.EmployeeModule.selectedEmployee 

        useEffect(() => {
            setValue("firstname", Employee.firstname,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("lastname", Employee.lastname,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("profession", Employee.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Employee.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Employee.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Employee.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Employee.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            })
          /*   setValue("EmployeeCategory", Employee.EmployeeCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newEmployeeModule={
        selectedEmployee:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, EmployeeModule:newEmployeeModule}))
   //console.log(state)
           }


        const changeState =()=>{
        const    newEmployeeModule={
            selectedEmployee:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, EmployeeModule:newEmployeeModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=Employee._id
        if (conf){
             
        EmployeeServ.remove(dleteId)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                reset();
               /*  setMessage("Deleted Employee successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
                toast({
                    message: 'Employee deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
               // setMessage("Error deleting Employee, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error deleting Employee, probable network issues or "+ err,
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
        data.facility=Employee.facility
          //console.log(data);
          
        EmployeeServ.patch(Employee._id,data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
               // e.target.reset();
               // setMessage("updated Employee successfully")
                 toast({
                    message: 'Employee updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                //setMessage("Error creating Employee, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error updating Employee, probable network issues or "+ err,
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
                    Employee Details-Modify
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label is-small">First Name
                    <p className="control has-icons-left has-icons-right">
                        <input className="input  is-small" ref={register({ required: true })}  name="firstname" type="text" placeholder="First Name" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                    </label>
                    </div>
                <div className="field">
                <label className="label is-small">Last Name
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="lastname" type="text" placeholder="Last Name" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
                </label>
                </div>
            <div className="field">
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
                    <input className="input is-small" ref={register({ required: true })} name="email" type="email" placeholder="Employee Email"/>
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
                </div>
           {/*  <div className="field">
            <label className="label is-small">Category
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="EmployeeCategory" type="text" placeholder="Employee Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
                </label>
            </div> */}
           
           
            </form>
            <div className="block">
            <div className="field  is-grouped">
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
                <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p>
            </div>
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
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
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