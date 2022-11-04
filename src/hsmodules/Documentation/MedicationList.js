import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {DocumentClassList} from './DocumentClass'
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

export default function MedicationList() {

    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
    //const navigate=useNavigate()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const [allergy,setAllergy] = useState("")
    const [reaction,setReaction] = useState("")
    const [allergine,setAllergine] = useState("")
    const [allergies,setAllergies] = useState([])
    const [notes,setNotes] = useState("")
    const [drugname,setDrugName] = useState("")
    const [strengthfreq,setStrengthFreq] = useState("")
    const [symptoms,setSymptoms] = useState([])
    const [docStatus,setDocStatus] = useState("Draft")

    const [dataset,setDataset] = useState()
    const {state, setState}=useContext(ObjectContext)


     let draftDoc=state.DocumentClassModule.selectedDocumentClass.document
   

     //state.DocumentClassModule.selectedDocumentClass.name

     useEffect(() => {
         if(!!draftDoc && draftDoc.status==="Draft"){

            Object.entries(draftDoc.documentdetail).map(([keys,value],i)=>(
                setValue(keys, value,  {
                    shouldValidate: true,
                    shouldDirty: true
                })

            ))
            setSymptoms(draftDoc.documentdetail.Medications)
            setAllergies(draftDoc.documentdetail.Allergies)
    }
         return () => {
             draftDoc={}
         }
     }, [draftDoc])

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
        //setFacility(user.activeClient.FacilityId)//
      if (!user.stacker){
       /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
      }
    })

    const coughinfo =["productive", "dry", "barking", "paroxysimal", "post-tusive vomiting ", "worse at night ", 
                        "worse at any time of the day ", "worse in certain posture " ,"progressive" ]
    const coughsymptoms=["fever", "catarrh", "night sweats", "weight loss", "contact with someone with chronic cough", "facial swelling", "leg swelling"]
    const coughsputum=["creamy", "brown", "blood stained", "whitish"]
    const resp=["Difficulty breathing","fast breathing","excessive sneezing", "allergy salute", "chest pain", "atopy", "family history of atopy"]
    const cvs=["cough","easy defatigability","breathelessness", "breathelessness  at rest", "breathelessness on exertion","Othopnea","Paroxymal nocturnal orthopnea","palpitation","chest pain"]
    const yesno=["Yes","No"]
    const urinary=["frequency","nocturia","polyuria","poor stream","incomplete bladder empty","urgency","hesistancy"]
    const neuro=["headache","neck pain","neck stiffness","vertigo","dizziness","fainting spells","akward gait","weakness of upper limbs","weakness of lower limbs"]
    const headache=["throbing", "dull", "generalised", "frontal", "right-sided", "left sided", "photophia"]
    const limbs=["Right Limb", "Left Limb", "Both Limbs"]
    const side=["Right","Left","Both"]
    const eardis=["Right","Left","Both", "Purulent","bloody"]
    const ent=["Sore throat", "change in voice","nasal discharge","excessive sneezing","allergy salute"]
    const endo=["heat intolerance", "apathy", "excessive sweating","excessive hair growth","weight gain", "weight loss", "menstral irregularity"]
    const birthmode = ["Spontenous varginal delivery","Elective Suregery", "Emergency Surgery"]
    const vachist=["caregiver's report", "child health card"]
    const pernotes=["dull", "resonant", "hyper-resonant"]
    const pulsenature=["Regular","Irregular", "Normal volume", "Pounding", "Synchronous", "Asynchronous"	]
    const heartsound=["S1","S2","S3","S4"]
    const abd=["Full","Distended", "Flat","moves with respiration","Abdominal vein visible"]
    const bowelsound=["Normal", "absent", "hyperactive", "reduced or hypoactive"]


       /*  const joins=(p)=>{
        let x=p.split(" ")
        console.log(x)
        x.forEach((el,i)=>({
            setSub(prev => (prev+"_"+el))
        }
        ))
    } */
    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
         // data.createdby=user._id
         // console.log(data)
          data.Medications=symptoms
          data.Allergies=allergies
        
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
          }
         document.documentdetail=data
          document.documentname="Medication List"  //"Lab Result"
         // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
          document.location=state.employeeLocation.locationName +" "+ state.employeeLocation.locationType
          document.locationId=state.employeeLocation.locationId
          document.client=state.ClientModule.selectedClient._id
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status=docStatus==="Draft"?"Draft":"completed"
          //console.log(document)

          if (
            document.location===undefined ||!document.createdByname || !document.facilityname ){
            toast({
                message: ' Documentation data missing, requires location and facility details' ,
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
              return
          }
        let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
        if (confirm){

        if (!!draftDoc &&  draftDoc.status==="Draft"){
            ClientServ.patch(draftDoc._id, document)
            .then((res)=>{
                    //console.log(JSON.stringify(res))
                    e.target.reset();
                    setAllergies([])
                    setSymptoms([])
                   /*  setMessage("Created Client successfully") */
                    setSuccess(true)
                    toast({
                        message: 'Pediatric Pulmonology Form updated succesfully',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                      setSuccess(false)
                      
                })
                .catch((err)=>{
                    toast({
                        message: 'Error updating Pediatric Pulmonology Form ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                })

        }else{
        ClientServ.create(document)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
                setAllergies([])
                setSymptoms([])
               /*  setMessage("Created Client successfully") */
                setSuccess(true)
                toast({
                    message: 'Medication List created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
                  closeForm()
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Medication List ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
        }
        }
      } 

        const handleChangePart=async (e)=>{
            //console.log(e)
            //const (name, value) = e.target
            let {name, value}= e.target
            console.log(name,value)
        await   setDataset((prev ) => ({...prev, [name]:value}))
        //  console.log(dataset)

        }
        const handleChangeStatus=async (e)=>{
        // await setAppointment_type(e.target.value)
       
        setDocStatus(e.target.value)

        //console.log(e.target.value)

        }

      /*   useEffect(() => {
           
            return () => {
               
            }
        }, [docStatus]) */

<<<<<<< HEAD
        const handleAllergy=async (e)=>{
            //console.log(e)
            //const (name, value) = e.target
            const {name, value}= e.target
            console.log(name,value)
           // [name]=value
         await   setAllergy((prev ) => ({...prev, [name]:value}))
          console.log(allergy)

        }


    const handleAdd = ()=>{
        let allergy = {
            allergine:allergine,
            reaction:reaction
        } 
        setAllergies((prev)=>([...prev, allergy]))
        setAllergy({})
        setReaction("")
        setAllergine("")

    }
    const handleAddMedication = ()=>{
        let newMedication = {
            drugname,
            strengthfreq,
            notes
        } 
        setSymptoms((prev)=>([...prev, newMedication]))
       // setAllergy({})
        setDrugName("")
        setStrengthFreq("")
        setNotes("")

    }
    const closeForm=async()=>{
        let documentobj={}
        documentobj.name=""
        documentobj.facility=""
        documentobj.document=""
      //  alert("I am in draft mode : " + Clinic.documentname)
        const    newDocumentClassModule={
            selectedDocumentClass:documentobj,
            //state.DocumentClassModule.selectedDocumentClass.name
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
        console.log("close form")
    }

    const onDelete = (comp,i)=>{
        //console.log(comp,i)
       setSymptoms(prevstate=>prevstate.filter((el,index)=>index!==i))
    }
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                Medication List
                </p>
                <button className="delete pushleft" aria-label="close"  onClick={()=>closeForm(false)}></button>
            </div>
            <div className="card-content vscrollable remPad1">

              {/*   <label className="label is-size-7">
=======
  const handleAllergy = async e => {
    //console.log(e)
    //const (name, value) = e.target
    const {name, value} = e.target;
    console.log(name, value);
    // [name]=value
    await setAllergy(prev => ({...prev, [name]: value}));
    console.log(allergy);
  };

  const handleAdd = () => {
    let allergy = {
      allergine: allergine,
      reaction: reaction,
    };
    setAllergies(prev => [...prev, allergy]);
    setAllergy({});
    setReaction("");
    setAllergine("");
  };
  const handleAddMedication = () => {
    let newMedication = {
      drugname,
      strengthfreq,
      notes,
    };
    setSymptoms(prev => [...prev, newMedication]);
    // setAllergy({})
    setDrugName("");
    setStrengthFreq("");
    setNotes("");
  };
  const closeForm = async () => {
    let documentobj = {};
    documentobj.name = "";
    documentobj.facility = "";
    documentobj.document = "";
    //  alert("I am in draft mode : " + Clinic.documentname)
    const newDocumentClassModule = {
      selectedDocumentClass: documentobj,
      //state.DocumentClassModule.selectedDocumentClass.name
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
    console.log("close form");
  };

  const onDelete = (comp, i) => {
    //console.log(comp,i)
    setSymptoms(prevstate => prevstate.filter((el, index) => index !== i));
  };
      
  


  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Medication List</p>
          <button
            className="delete pushleft"
            aria-label="close"
            onClick={() => closeForm(false)}
          ></button>
        </div>
        <div className="card-content vscrollable remPad1">
          {/*   <label className="label is-size-7">
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
                  Client:  {order.orderInfo.orderObj.clientname}
                </label>
                <label className="label is-size-7">
                 Test:  {order.serviceInfo.name}
                </label> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                        <p className="control ">
                            <input className="input is-small"   ref={register} name="Date" type="text" placeholder="Date"  />
                                      
                        </p>
                </div>
                <h4><b>Allergies</b></h4>
                    <input className="input is-small is-hidden"   ref={register} name="Allergies" type="text" placeholder="Specify" />  
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Allergine</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={allergine} /* ref={register} */ onChange={(e)=>{setAllergine(e.target.value)}} name="allergine" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Reaction</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={reaction}  /* ref={register} */ onChange={(e)=>{setReaction(e.target.value)}}  name="reaction" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                       
                    </div>
                    <div className="field">
                        <div className="control">
                            <div  className="button is-info is-small selectadd is-pulled-right" onClick={handleAdd}>
                               Add
                            </div>
                         </div>
                        </div>
                    <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                        <thead>
                            <tr>
                            <th><abbr title="Serial No">S/No</abbr></th>
                        
                            <th><abbr title="Type"> Allergine</abbr></th>
                            <th><abbr title="Destination">Reaction</abbr></th>
                            </tr>
                        </thead>
                        <tfoot>
                            
                        </tfoot>
                        <tbody>
                        { allergies.map((ProductEntry, i)=>(

                                <tr key={i}>
                                <th>{i+1}</th>
                                <td>{ProductEntry.allergine}</td> 
                                <td>{ProductEntry.reaction}</td>                                                                     
                                </tr>

                            ))}
                        </tbody>
                        </table>
                

                <h4><b>Medication</b></h4>
                <input className="input is-small is-hidden"   ref={register} name="Medications" type="text" placeholder="Specify" />  
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Drug Name</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={drugname} /* ref={register} */ onChange={(e)=>{setDrugName(e.target.value)}} name="Drugname" type="text" placeholder="Name" />           
                                </p>
                            </div>
                        
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Strength/Frequency</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={strengthfreq} /* ref={register} */ onChange={(e)=>{setStrengthFreq(e.target.value)}} name="strengthfreq" type="text" placeholder="Strength/Frequency" />           
                                </p>
                            </div>
                        
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Notes</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={notes}  /* ref={register} */ onChange={(e)=>{setNotes(e.target.value)}}  name="notes" type="text" placeholder="Notes" />           
                                </p>
                            </div>
                        </div>
                       
                    </div>
                    <div className="field">
                        <div className="control">
                            <div  className="button is-info is-small selectadd is-pulled-right" onClick={handleAddMedication}>
                               Add
                            </div>
                         </div>
                        </div>
                    <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                        <thead>
                            <tr>
                            <th><abbr title="Serial No">S/No</abbr></th>
                        
                            <th><abbr title="Name"> Name</abbr></th>
                            <th><abbr title="Strength/Frequency">Strength/Frequency</abbr></th>
                            <th><abbr title="Notes"> Notes</abbr></th>
                            <th><abbr title="Action"> Action</abbr></th>
                            </tr>
                        </thead>
                        <tfoot>
                            
                        </tfoot>
                        <tbody>
                        { symptoms.map((ProductEntry, i)=>(

                                <tr key={i} >
                                <th>{i+1}</th>
                                <td>{ProductEntry.drugname}</td> 
                                <td>{ProductEntry.strengthfreq}</td>  
                                <td>{ProductEntry.notes} </td> 
                                <td onClick={()=>onDelete(ProductEntry, i)}>x</td>                                                                    
                                </tr>

                            ))}
                        </tbody>
                        </table>
             
                
               
                <div className="field">
                    <label className=" is-small">
                        <input  type="radio"  checked={docStatus==="Draft"} name="status" value="Draft"  onChange={(e)=>{handleChangeStatus(e)}}/>
                        <span > Draft</span>
                    </label> <br/>
                    <label className=" is-small">
                        <input type="radio" checked={docStatus==="Final"} name="status"  value="Final" onChange={(e)=>handleChangeStatus(e)}/>
                        <span> Final </span>
                    </label>
                </div>  
              
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button type="reset" className="button is-warning is-small" >
                        Cancel
                    </button>
                </p>
               
            </div>
     
            </form>
            </div>
            </div>
                 
        </>
    )
   
}




