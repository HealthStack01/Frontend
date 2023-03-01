import React, {useState,useContext, useEffect,useRef} from 'react'
//import {Route, Switch,   Link, NavLink, } from 'react-router-dom'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
//import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import { formatDistanceToNowStrict, format } from 'date-fns'
// eslint-disable-next-line
//const searchfacility={};


export  default function CreateServiceSearch({id,getSearchfacility,clear}) {
    
    const ClientServ=client.service('billing')
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
   const [val,setVal]=useState("")
   const {user} = useContext(UserContext) 
   const {state}=useContext(ObjectContext)
    const [productModal,setProductModal]=useState(false)

    const getInitial=async(id)=>{
        console.log(id)
        if(!!id){

            let obj={
                categoryname:id,
    
            }
            console.log(obj)
            handleRow(obj)
       }
    }

        useEffect(() => {
            getInitial(id)
            return () => {
                
            }
        }, [])

   const handleRow= async(obj)=>{
        await setChosen(true)
        //alert("something is chaning")
      
       
       await setSimpa(obj.categoryname)
       getSearchfacility(obj)
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
       /*   if (count===2){
             console.log("stuff was chosen")
         } */
       
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
        setVal(val)
        if (val===""){
            setShowPanel(false)
            getSearchfacility(false)
            return
        }
        const field='name' //field variable
        /* name: { type: String, required: true },
        locationType: { type: String }, */
       
        if (val.length>=3 ){
            ClientServ.find({query: {
               
                   category: {
                        $regex:val,
                        $options:'i' 
                    },
                    /*  $or:[   { lastname: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { profession: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { department: {
                        $regex:val,
                        $options:'i' 
                    }},
                   { clientTags: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { mrn: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { specificDetails: {
                        $regex:val,
                        $options:'i' 
                    }}, 
                ],*/
              
                 //facility: user.currentEmployee.facilityDetail._id,
                 //storeId: state.StoreModule.selectedStore._id,
                 $limit:1000,
                 $sort: {
                    category: 1
                   }
                     }}).then((res)=>{
              console.log("Service category  fetched successfully") 
              console.log(res.data) 
              console.log(res.groupedOrder)
                setFacilities(res.groupedOrder)
                 setSearchMessage("Service category fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error searching Service category  ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
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

    const handleAddproduct =()=>{
       
        let obj={
            categoryname:val,

        }
        console.log(obj)
        handleRow(obj)
       
       // setProductModal(true) 
    }
    const handlecloseModal =()=>{
        setProductModal(false)
        handleSearch(val)
    }
    useEffect(() => {
       if (clear){
           console.log("success has changed",clear)
           setSimpa("")
       }
        return () => {
            
        }
    }, [clear] )
    return (
        <div>
            <div className="field">
                <div className="control has-icons-left  ">
                    <div className={`dropdown ${showPanel?"is-active":""}`} style={{width:"100%"}}>
                        <div className="dropdown-trigger" style={{width:"100%"}}>
                            <DebounceInput className="input is-small  is-expanded mb-0" 
                                type="text" placeholder="Search for Service Category"
                                value={simpa}
                                minLength={3}
                                debounceTimeout={400}
                                onBlur={(e)=>handleBlur(e)}
                                onChange={(e)=>handleSearch(e.target.value)}
                                inputRef={inputEl}
                                  />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu expanded" style={{width:"100%"}}>
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item selectadd dropitem mb-4" onClick={handleAddproduct} > 
                          {/* <span>  */}<strong>{val}</strong> is not a known service category! Add it?{/* </span> */} </div>}

                              {facilities.map((facility, i)=>(
                                
                                    <div className="dropdown-item selectadd " key={facility.categoryname} onClick={()=>handleRow(facility)}>
                                        
                                        <div ><span>{facility.categoryname}</span>
                                         {/*  <span className="padleft">{facility.category}</span>
                                      <span className="padleft">{facility.profession}</span>
                                        <span className="padleft">{facility.department} Department</span> */}
                                         {/* <span className="padleft"> {facility.dob && formatDistanceToNowStrict(new Date(facility.dob))}</span>
                                       
                                        <span className="padleft">{facility.profession}</span>
                                        <span className="padleft">{facility.phone}</span> */}
                                        {/* <span className="padleft">{facility.email}</span> */}
                                        </div>
                            
                                        <br />
                                    </div>
                                    
                                    ))}
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal ${productModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Store</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        {/* <StoreList standalone="true" /> */}
                                        {/* <ProductCreate /> */}
                                        </section>
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
                                    </div>
                                </div>       
        </div>
    )
}