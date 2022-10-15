/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {ServicesCreate} from '../Finance/Services'

// eslint-disable-next-line
const searchfacility={};

export default function ServiceSearch({getSearchfacility,clear,mode}) {
    const {user} = useContext(UserContext)
    const productServ=client.service('billing')
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
    const [productModal,setProductModal]=useState(false)

   const handleRow= async(obj)=>{
        await setChosen(true)
        //alert("something is chaning")
       await setSimpa(obj.name)
       getSearchfacility(obj)
       
        // setSelectedFacility(obj)
        setShowPanel(false)
      /*   await setCount(2) */
        /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
   //console.log(state)
}
    const handleBlur=async(e)=>{
        /*  if (count===2){
             console.log("stuff was chosen")
         }
        */
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
    const handleSearch=async(value)=>{
        console.log(mode)
        setVal(value)
        if (value===""){
            setShowPanel(false)
            getSearchfacility(false)
            await setFacilities([])
            return
        }
        const field='name' //field variable

       
        if (value.length>=3 ){
            if (mode.value=== "Cash" ||mode.value=== "Family Cover"){

          
            productServ.find({query: {     //service
                 name: {
                     $regex:value,
                     $options:'i'
                    
                 },
                 facility: user.currentEmployee.facilityDetail._id,
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
             // console.log("product  fetched successfully") 
              //console.log(res.data) 
                setFacilities(res.data)
                 setSearchMessage(" product  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error creating Services ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
             })
            }
            if (mode.value=== "CompanyCover"){
                //if it is hmo or company cover
                //band of hospital
                //hmo facility Id
                productServ.find({query: {     //service
                    name: {
                        $regex:value,
                        $options:'i'
                       
                    },
                    facility: user.currentEmployee.facilityDetail._id,
                    $limit:10,
                    $sort: {
                        createdAt: -1
                      }
                        }}).then((res)=>{
                // console.log("product  fetched successfully") 
                 //console.log(res.data) 
                   setFacilities(res.data)
                    setSearchMessage(" product  fetched successfully")
                    setShowPanel(true)
                })
                .catch((err)=>{
                   toast({
                       message: 'Error creating Services ' + err,
                       type: 'is-danger',
                       dismissible: true,
                       pauseOnHover: true,
                     })
                })

            }
            if (mode.value=== "HMOCover"){
                //if it is hmo or company cover
                //band of hospital
                //hmo facility Id
                //check if the hmo is a state hmo or not
                console.log(mode)
                if(true){
                    productServ.find({query: {     //service
                        name: {
                            $regex:value,
                            $options:'i'
                        
                        },
                        facility:mode.detail.organizationId ,
                        mode:"HMOCover",
                        dest_org:user.currentEmployee.facilityDetail._id,
                        $limit:10,
                        $sort: {
                            createdAt: -1
                        }
                            }}).then((res)=>{
                    // console.log("product  fetched successfully") 
                    //console.log(res.data) 
                    setFacilities(res.data)
                        setSearchMessage(" product  fetched successfully")
                        setShowPanel(true)
                    })
                    .catch((err)=>{
                    toast({
                        message: 'Error creating Services ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        })
                    })

                }
            }
         }
        else{
           // console.log("less than 3 ")
            //console.log(val)
            setShowPanel(false)
            await setFacilities([])
            //console.log(facilities)
        }
    }

    const handleAddproduct =()=>{
        setProductModal(true) 
    }
    const handlecloseModal =()=>{
        setProductModal(false)
        handleSearch(val)
    }
    useEffect(() => {
       if (clear){
           //console.log("success has changed",clear)
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
                            <DebounceInput className="input is-small " 
                                type="text" placeholder="Search Services"
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
                        {/* {searchError&&<div>{searchMessage}</div>} */}
                        <div className="dropdown-menu" style={{width:"100%"}} >
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item" onClick={handleAddproduct}> <span>Add {val} to service list</span> </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item selectadd" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <span>{facility.name} ({facility.category})</span>
                                        
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
                                        <p className="modal-card-title">Create Service</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        {/* <StoreList standalone="true" /> */}
                                        <ServicesCreate />
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