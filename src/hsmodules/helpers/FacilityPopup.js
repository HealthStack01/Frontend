import React, {useState,useContext, useEffect} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'


export function Facility() {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedFacility,setSelectedFacility]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    
    //console.log("facility parent", state)
    

    return(
        <section className= "section remPadTop">
           {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Facility  Module</span></div>
            </div> */}
            <div className="columns ">
            <div className="column is-8 ">
              {/*   <FacilityList /> */}
                </div>
            <div className="column is-4 ">
               {/*  {(state.facilityModule.show ==='create')&&<FacilityCreate />}
                {(state.facilityModule.show ==='detail')&&<FacilityDetail  />}
                {(state.facilityModule.show ==='modify')&&<FacilityModify facility={selectedFacility} />} */}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function FacilityCreate(){
    const { register, handleSubmit} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    const facilityServ=client.service('/facility')
    //const navigate=useNavigate()
    const {user} = useContext(UserContext) //,setUser

    
    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
          data.createdby=user._id
          //console.log(data);
          
        facilityServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
                setMessage("Created facility successfully")
                setSuccess(true)
            })
            .catch((err)=>{
                setMessage("Error creating facility, probable network issues "+ err )
                setError(true)
            })

      } 

    return (
        <>
        <section className= "section remPadTop">
        <div className="columns ">
        <div /* className="column is-4 " */>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Create Facility
                </p>
            </div>
            <div className="card-content vscrollable">
            { success && <div className="message"> {message}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small" ref={register({ required: true })}  name="facilityName" type="text" placeholder="Name of Facility" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="facilityAddress" type="text" placeholder="Address of Facility" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="facilityCity" type="text" placeholder="City/Town"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="facilityContactPhone" type="text" placeholder="Contact Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
            </div>
           
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="facilityEmail" type="email" placeholder="Facility Email"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="facilityOwner" type="text" placeholder="Facility Owner"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="facilityType" type="text" placeholder="Facility Type"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="facilityCategory" type="text" placeholder="Facility Category"/>
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
            { error && <div className="message"> {message}</div>}
            </form>
        </div>
        </div>
        </div>
        </div>
        </section>
        </>
    )
   
}

export default function FacilityPopup({facilityType,closeModal}){
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const facilityServ=client.service('facility')
    //const navigate=useNavigate()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedFacility, setSelectedFacility]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)

   

  /*   const handleCreateNew = async()=>{
        const    newfacilityModule={
            selectedFacility:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule}))
       //console.log(state)
        

    } */
    const handleRow= async(facility)=>{
        //console.log("b4",state)

        //console.log("handlerow",facility)

        await setSelectedFacility(facility)

        const    newfacilityModule={
            selectedDestination:facility,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, DestinationModule:newfacilityModule}))
       //console.log(state)
       closeModal()

    }

   const handleSearch=(val)=>{
       const field='facilityName'
       console.log(val)
       facilityServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
                facilityType,
                $limit:10,
                $sort: {
                    facilityName: 1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" facility  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error creating facility, probable network issues "+ err )
                setError(true)
            })
        }

           /*  if (val.length>2){
                console.log("in")
               
            }

        }
     */
        const getFacilities=()=>{
            facilityServ.find({query: {
                facilityType,
                $limit:20,
                $sort: {
                    facilityName: 1
                  }
                    }})
            .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" facility  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                   
                    setMessage("Error creating facility, probable network issues "+ err )
                    setError(true)
                })

        }

    useEffect(() => {
        getFacilities()

        facilityServ.on('created', (obj)=>getFacilities())
        facilityServ.on('updated', (obj)=>getFacilities())
        facilityServ.on('patched', (obj)=>getFacilities())
        facilityServ.on('removed', (obj)=>getFacilities())
        return () => {
           
        }
    },[])

    //todo: pagination and vertical scroll bar

    return(
            <>  
            <section className= "section remPadTop">
            <div /* className="columns " */>
            <div /* className="column is-4 " */>  
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Facilities </span></div>
                    {/* <div className="level-right">
                        <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>
                    </div> */}

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="S/No">S/No</abbr></th>
                                        <th>Facility Name</th>
                                        <th><abbr title="Address"> Address</abbr></th>
                                        <th><abbr title="City">City</abbr></th>
                                        <th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th>
                                        <th><abbr title="Type">Type</abbr></th>
                                        <th><abbr title="Category">Category</abbr></th>
                                        <th><abbr title="Actions">Actions</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((facility, i)=>(

                                            <tr key={facility._id} onClick={()=>handleRow(facility)} className={facility._id===(selectedFacility?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{facility.facilityName}</th>
                                            <td>{facility.facilityAddress}</td>
                                            <td>{facility.facilityCity}</td>
                                            <td>{facility.facilityContactPhone}</td>
                                            <td>{facility.facilityEmail}</td>
                                            <td>{facility.facilityType}</td>
                                            <td>{facility.facilityCategory}</td>
                                           
                                            <td><span   className="showAction"  >...</span></td>
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div> 
                </div> 
                </div> 
                </section>              
            </>
              
    )
}