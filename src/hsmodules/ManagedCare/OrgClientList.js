/* eslint-disable */
import React, {useState,useContext, useEffect} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {toast} from 'bulma-toast'
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {FacilitySearch} from '../helpers/FacilitySearch'




export function OrgList(){
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const facilityServ=client.service('facility')
    const orgServ=client.service('organizationclient')
    //const navigate=useNavigate()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedFacility, setSelectedFacility]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    const {user} = useContext(UserContext)

   

    const handleCreateNew = async()=>{
        const    newfacilityModule={
            selectedFacility:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule}))
       //console.log(state)
        

    }
    const handleRow= async(facility)=>{
        //console.log("b4",state)

        //console.log("handlerow",facility)

        await setSelectedFacility(facility.organizationDetail)

        const    newfacilityModule={
            selectedFacility:facility.organizationDetail,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule}))
       //console.log(state)

    }

   const handleSearch=(val)=>{
       const field='facilityName'
       console.log(val)
       if (val.length >0){
       orgServ.find({query: {
                /* [field]: {
                    $regex:val,
                    $options:'i'
                   
                }, */
                $search:val,
                $limit:10,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Organization  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error creating facility, probable network issues "+ err )
                setError(true)
            })
        }else{
            getFacilities() 
        }
        }

           /*  if (val.length>2){
                console.log("in")
               
            }

        }
     */
        const getFacilities=()=>{
            orgServ.find({query: {
                facility:user.currentEmployee.facilityDetail._id,
                $limit:100,
                $sort: {
                    createdAt: -1
                  }
                    }})
            .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Organization  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating facility, probable network issues "+ err )
                    setError(true)
                })

        }

    useEffect(() => {
        getFacilities()

        orgServ.on('created', (obj)=>getFacilities())
        orgServ.on('updated', (obj)=>getFacilities())
        orgServ.on('patched', (obj)=>getFacilities())
        orgServ.on('removed', (obj)=>getFacilities())
        return () => {
           
        }
    },[])

    //todo: pagination and vertical scroll bar

    return(
            <>   {/* <OrganizationCreate /> */}
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Contracted Organizations </span></div>
                   {/*  <div className="level-right">
                        <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>
                    </div> */}

                </div>
               {!!facilities[1] && <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="S/No">S/No</abbr></th>
                                        <th>Organization Name</th>
                                       {/*  <th><abbr title="Address"> Address</abbr></th>
                                        <th><abbr title="City">City</abbr></th>
                                        <th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th> */}
                                        <th><abbr title="Type">Type</abbr></th>
                                        <th><abbr title="Category">Category</abbr></th>
                                        {/* <th><abbr title="Actions">Actions</abbr></th> */}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((facility, i)=>(

                                            <tr key={facility.organizationDetail._id} onClick={()=>handleRow(facility)} className={facility.organizationDetail._id===(selectedFacility?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{facility.organizationDetail.facilityName}</th>
                                           {/*  <td>{facility.organizationDetail.facilityAddress}</td>
                                            <td>{facility.organizationDetail.facilityCity}</td>
                                            <td>{facility.organizationDetail.facilityContactPhone}</td>
                                            <td>{facility.organizationDetail.facilityEmail}</td>*/}
                                            <td>{facility.organizationDetail.facilityType}</td>
                                            <td>{facility.organizationDetail.facilityCategory}</td> 
                                           
                                           {/*  <td><span   className="showAction"  >...</span></td> */}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>   }            
            </>
              
    )
}

