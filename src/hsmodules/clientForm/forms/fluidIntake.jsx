import React, {useState,useContext, useEffect,useRef} from 'react'
   import { useForm } from "react-hook-form";
   import { formatDistanceToNowStrict, format, subDays,addDays } from 'date-fns'
   import client from '../../../feathers'
   import {toast} from 'bulma-toast'
   import {UserContext,ObjectContext} from '../../../context'

const FluidIntakeOutput = () => {

  const { register, handleSubmit,setValue} = useForm(); 
  const fluidTypeOptions=["Input","Output"]
  const {user,setUser} = useContext(UserContext)
  const [facilities,setFacilities]=useState([])
  const [selectedFluid,setSelectedFluid]=useState()
  const [chosen, setChosen]=useState(true)
    const [chosen1, setChosen1]=useState(true)
    const [chosen2, setChosen2]=useState(true) 
    const {state}=useContext(ObjectContext)
    const [docStatus,setDocStatus] = useState("Draft")
    const ClientServ=client.service('clinicaldocument')
    const fac = useRef([])
    const struc = useRef([])

  const handleRow = ()=>{
    console.log("let's pray")
  }

  let draftDoc=state.DocumentClassModule.selectedDocumentClass.document


      const checkonadmission=()=>{
        console.log(state.ClientModule.selectedClient.admission_id)
        if (!!state.ClientModule.selectedClient.admission_id){
        setChosen2(false)
        }
        else{
          toast({
            message: 'Patient not on admission',
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          })
        }
      }

    useEffect(() => {
      checkonadmission()
    findexistingChart()

      return () => {
      
      }
    },[draftDoc])


        const findexistingChart=async()=>{

          const findClinic= await ClientServ.find(
            {query: {
                client:state.ClientModule.selectedClient._id,
                facility:user.currentEmployee.facilityDetail._id,
                documentname:state.DocumentClassModule.selectedDocumentClass.name,
                episodeofcare_id:state.ClientModule.selectedClient.admission_id,

                    $limit:20,
                    $sort: {
                        createdAt: -1
                    }
                }})

              fac.current=findClinic.data[0]
              //console.log(fac.current)
              if (findClinic.total >1) {
                setChosen1(false)
                setFacilities(fac.current.documentdetail.recordings)
              }
          
        }

    
          useEffect(() => {
            if( !!draftDoc && draftDoc.status==="Draft"){

              /*  Object.entries(draftDoc.documentdetail).map(([keys,value],i)=>(
                  setValue(keys, value,  {
                      shouldValidate: true,
                      shouldDirty: true
                  })

              )) */
              setFacilities(draftDoc.documentdetail.recordings)
              // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
              }
                  return () => {
                      draftDoc={}
                  }
              }, [draftDoc])
          
              


          const handleSave=()=>{
            
            let document={}
            let data={}
            data.recordings=facilities
            // data.createdby=user._id
            

              if (user.currentEmployee){
                document.facility=user.currentEmployee.facilityDetail._id 
                document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
                }
              document.documentdetail= data
                document.documentname=state.DocumentClassModule.selectedDocumentClass.name
                document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
                document.location=state.ClinicModule.selectedClinic.name+" "+state.ClinicModule.selectedClinic.locationType
                document.locationId=state.ClinicModule.selectedClinic._id
                document.client=state.ClientModule.selectedClient._id
                document.createdBy=user._id
                document.createdByname=user.firstname+ " "+user.lastname
                document.status=docStatus==="Draft"?"Draft":"completed"
                document.episodeofcare_id=state.ClientModule.selectedClient.admission_id
              console.log(document);

            // alert(document.status)
              ClientServ.create(document)
            .then((res)=>{
                    
              setChosen(true)
                
                    toast({
                        message: 'Fluid Input/Output entry successful',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                    
                })
                .catch((err)=>{
                    toast({
                        message: 'Error creating Appointment ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                }) 

          }  

          const onSubmit = async (data,e) =>{
          // console.log(state.DocumentClassModule.selectedDocumentClass)
          console.log(state.employeeLocation.locationName)
            e.preventDefault();
            data.entrytime=new Date()
            data.location=state.employeeLocation.locationName+" "+state.employeeLocation.locationType
            data.locationId=state.employeeLocation.locationId
            data.episodeofcare_id=state.ClientModule.selectedClient.admission_id
            data.createdBy=user._id
            data.createdByname=user.firstname+ " "+user.lastname

          // await update(data)
          struc.current=[data,...facilities]
          // console.log(struc.current)
            setFacilities((prev)=>[data, ...facilities])
          // data.recordings=facilities
          e.target.reset();
          setChosen(false)
          //handleSave()
          let document={}
            data={}
            data.recordings=struc.current
            // data.createdby=user._id
            

              if (user.currentEmployee){
                document.facility=user.currentEmployee.facilityDetail._id 
                document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
                }
              document.documentdetail= data
                document.documentname=state.DocumentClassModule.selectedDocumentClass.name
                document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
                document.location=state.employeeLocation.locationName+" "+state.employeeLocation.locationType
                document.locationId=state.employeeLocation.locationId
                document.client=state.ClientModule.selectedClient._id
                document.createdBy=user._id
                document.createdByname=user.firstname+ " "+user.lastname
                document.status=docStatus==="Draft"?"Draft":"completed"
                document.episodeofcare_id=state.ClientModule.selectedClient.admission_id
              console.log(document);

            // alert(document.status)
            if (chosen1){

              ClientServ.create(document)
            .then((res)=>{
                    
              setChosen(true)
                
                    toast({
                        message: 'Fluid Input/Output entry successful',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                    
                })
                .catch((err)=>{
                    toast({
                        message: 'Fluid Input/Output entry ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                }) 

        
          }  else{
            ClientServ.patch(fac.current._id,{documentdetail:document.documentdetail})
            .then((res)=>{
                    
              setChosen(true)
                
                    toast({
                        message: 'Fluid Input/Output entry successful',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                    
                })
                .catch((err)=>{
                    toast({
                        message: 'Fluid Input/Output entry ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                }) 

          }
        }
       
  return (
   
      
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Fluid Intake and Output Chart</p>
        </div>
        <div className="card-content vscrollable  pt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="columns mb-0 mt-0"> 
          <div className="column"> 
           <div className="field ">
                <label className="label is-small">Date & Time</label>
                <p className="control is-expanded">
                  <input ref={register ({ required: true })} name="fluid_time" className="input is-small" type="datetime-local" />
                </p>
          </div>
        </div>
        <div className="column"> 
        <div className="field">
          <label className="label is-small">Input/Output?</label>    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="fluidType"  ref={register({ required: true })} /* onChange={(e)=>handleChangeMode(e.target.value)} */ className="selectadd" >
                         <option value="">Choose Type </option>
                           {fluidTypeOptions.map((option,i)=>(
                               <option key={i} value={option}> {option}</option>
                           ))}
                         </select>
                     </div>
                 </div>
          </div>
          </div>
          <div className="column"> 
         
              </div>
              </div> 
          <div className="columns"> 
              <div className="column"> 
          <div className="field">
                <label className="label is-small">Route</label>
                <p className="control is-expanded">
                  <input ref={register} name="route" className="input is-small" type="text" />
                </p>
              </div>
              </div>
              <div className="column"> 
          <div className="field">
            <label className="label is-small">Fluid </label>
            <p className="control is-expanded">
              <input ref={register} name="fluid" className="input is-small" type="text" />
            </p>
          </div>
          </div>
          <div className="column"> 
          <div className="field">
            <label className="label is-small">Volume (mls)</label>
            <p className="control is-expanded">
              <input ref={register} name="volume" className="input is-small" type="number" />
            </p>
          </div>
          </div>
         
         

          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Comments</label>
              <div className="control">
                <input ref={register} name="comments" className="input is-small" type="text"/>
              </div>
            </div>
          </div>
          <div className="columns">
          <div className="column">
          <div className="field mt-4">
            <button className="button is-info is-small">Enter</button>
          </div>
          </div>
          <div className="column">
          <div className="field mt-4">
           {/*  <button className="button is-success is-small is-pulled-right" disabled={chosen} onClick={handleSave}>save</button> */}
          </div>
          </div>
          </div>
          </form>
        
        </div>
        < div className="mx-4 " >
        <div className="table-container pullup vscrola">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Time">Date/Time</abbr></th>
                                        {/* <th>Type</th> */}
                                       <th><abbr title="Last Name">Route</abbr></th>
                                       <th><abbr title="Class">Fluid</abbr></th>
                                        <th><abbr title="Location">Input Volume </abbr></th> 
                                        <th><abbr title="Location">Output Volume </abbr></th> 
                                        <th><abbr title="Type">Comments</abbr></th>
                                         <th><abbr title="Status">Entry Time</abbr></th>
                                       {/* <th><abbr title="Reason">Reason</abbr></th>
                                        <th><abbr title="Practitioner">Practitioner</abbr></th> */}
                                        {/* <th><abbr title="Actions">Actions</abbr></th> */}
                                        </tr>
                                    </thead>
                                    <tfoot>                                      
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Client, i)=>(

                                            <tr key={Client._id} onClick={()=>handleRow(Client)}  className={Client._id===(selectedFluid?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <td><strong>{format(new Date(Client.fluid_time),"HH:mm:ss")}</strong></td>
                                            <th>{Client.route}</th>
                                            <td>{Client.fluid}</td>
                                            <td>{Client.fluidType==="Input" && Client.volume}</td>
                                           <td>{Client.fluidType==="Output" && Client.volume}</td>
                                         
                                            <td>{Client.comments}</td>
                                          {Client.entrytime &&  <td>{format(new Date(Client.entrytime),"dd-MM HH:mm:ss")}</td>}
                                       
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>  

    </div>
      </div>
    
  );
};

export default FluidIntakeOutput;
