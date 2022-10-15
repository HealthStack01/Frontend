/* eslint-disable */
import React, {useState,useContext, useEffect,useRef, useCallback} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm} from "react-hook-form";
import {DocumentClassList} from './DocumentClass'
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import AsthmaIntake from './AsthmaIntake';
import PulmonologyIntake from './Pulmonology';
import NewPatientConsult from './NewPatientConsult';
import ProgressNote from './ProgressNote';
import MedicationList from './MedicationList';
import Dropzone from 'react-dropzone-uploader'
//import 'react-dropzone-uploader/dist/styles.css'


export default function Clerking(){
    const { register, handleSubmit,setValue , getValues } = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
    const uploadserv=client.service('upload')
    //const navigate=useNavigate()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const {state}=useContext(ObjectContext)
    const [docStatus,setDocStatus] = useState("Draft")
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false)


  const onSubmit= async(data)=>{
      console.log(data.files)
       const formData = new FormData()
       formData.append("files", data.files[0])
       const res= await fetch('http://localhost:3035/upload',{
           method:"POST",
           body:formData
       }).then((resp)=>{ 
           /* resp = resp.json */
            console.log(JSON.stringify(resp))
        })
       .catch((err)=>{console.log(err)})
       
     /*  uploadserv.create(data.file,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
      }) */
  }

    return(
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <input ref={register} type="file" name="files" />
            <button>Submit</button>
        </form>
    )

  
}