/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {ProductCreate} from './Products'
import Encounter from '../EncounterMgt/Encounter';
import { ClientSearch } from '../helpers/ClientSearch';
import  ServiceSearch  from '../helpers/ServiceSearch';
var random = require('random-string-generator');
// eslint-disable-next-line
const searchfacility={};

export default function BillServiceCreate(){
    // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
     //const [error, setError] =useState(false)
     const [success, setSuccess] =useState(false)
     const [success1, setSuccess1] =useState(false)
     const [message,setMessage] = useState("")
     // eslint-disable-next-line
     const [facility,setFacility] = useState()
     //const ProductEntryServ=client.service('productentry')
     const OrderServ=client.service('order')
     const BillCreateServ=client.service('createbilldirect')
     //const navigate=useNavigate()
     const {user} = useContext(UserContext) //,setUser
     // eslint-disable-next-line
     const [currentUser,setCurrentUser] = useState()
     const [type,setType] = useState("Bill")
     const [documentNo,setDocumentNo] = useState("")
     const [totalamount,setTotalamount] = useState(0)
     const [qamount,setQAmount] = useState(null)
     const [productId,setProductId] = useState("")
     const [source,setSource] = useState("")
     const [date,setDate] = useState("")
     const [name,setName] = useState("")
     const [inventoryId,setInventoryId] = useState("")
     const [baseunit,setBaseunit] = useState("")
     const [quantity,setQuantity] = useState(1)
     const [sellingprice,setSellingPrice] = useState("")
     const [costprice,setCostprice] = useState(0)
     const [invquantity,setInvQuantity] = useState("")
     const [calcamount,setCalcAmount] = useState(0)
     const [productItem,setProductItem] = useState([])
      const [billingId,setBilllingId]=useState("")  
      const [changeAmount, setChangeAmount] = useState(true)
      const [paymentmode, setPaymentMode] = useState("")
      const [category, setCategory] = useState("")
      const [paymentOptions, setPaymentOptions]=useState([])
      const [billMode, setBillMode]=useState("")
      const [obj, setObj]=useState("")
      const [productModal, setProductModal]=useState(false)
      const [patient, setPatient]=useState("")
      const [contracts, setContracts]=useState("")
     
     const {state,setState}=useContext(ObjectContext)
     const inputEl = useRef(0);
     let calcamount1
     let hidestatus
  

    
  let medication =state.medicationModule.selectedMedication


  const handlecloseModal =()=>{
 //   setProductModal(false)
   // handleSearch(val)
    }


    const 
    
    
    
    handleChangeMode= async(value)=>{
    console.log("value",value)
       await setPaymentMode(value)
        console.log(value)
       let billm= paymentOptions.filter(el=>el.name===value)
       await setBillMode(billm[0])
        console.log(billm)
        // at startup
        // check payment mode options from patient financial info
        // load that to select options
        // default to HMO-->company-->family-->cash
        //when chosen
        //append payment mode to order
        //check service contract for pricing info
        // calculate pricing 
        // pricing


    }

    const handleRow= async(ProductEntry)=>{
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    //await setMedication(ProductEntry)

    const    newProductEntryModule={
        selectedMedication:ProductEntry,
        show :'detail'
    }
  await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
   //console.log(state)
  // ProductEntry.show=!ProductEntry.show

        } 
 
     const [productEntry,setProductEntry]=useState({
         productitems:[],
         date,
         documentNo,
         type,
         totalamount,
         source,
 
     })
  
     const productItemI={
         productId,
         name,
         quantity,
         sellingprice,
         amount:calcamount, //||qamount
         baseunit,
         costprice,
         category: category==="Inventory"?"Prescription":category,
         billingId,
         billingContract:contracts,
         billMode
 
     }
   
     const checkPrice= async(contracts,billMode)=>{
           if( billMode.type==="HMO Cover"){ //paymentmode
           /*  if (billMode.detail.plan==="NHIS"){
                //find contract for NHIS
                let contract=contracts.filter(el=>el.source_org_name==="NHIS")
                if (contract.length){
                   // console.log(contract[0].price)
                  await  setSellingPrice(contract[0].price)     
             }else{
                toast({
                    message: 'Please NHIS does not have cover/price for this service. Either set service price for NHIS, try another service or bill using cash',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                 await setSellingPrice(0)
             }

            }else{ */

            let contract=contracts.filter(el=>el.source_org===billMode.detail.organizationId)
            if (contract.length){
              //  console.log(contract[0].price)
               await setSellingPrice(contract[0].price)
               
             }else{
            toast({
                message: 'Please HMO does not have cover/price for this service. Either set service price for HMO , try another drug, bill using cash or adjust amount ',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
              await setSellingPrice(0)
         }
        
        }
       /*  } */
        if( billMode.type==="Company Cover"){ //paymentmode
            let contract=contracts.filter(el=>el.source_org===billMode.detail.organizationId)
            if (contract.length){
           // console.log(contract[0].price)
          await   setSellingPrice(contract[0].price)
            
           
           }else{

            toast({
                message: 'Please company does not have cover/price for this service. Either set service price for Company or try another drug or bill using cash',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
            await  setSellingPrice(0)   
         }

     }
     if( billMode.type==="Cash" || billMode.type==="Family Cover"){ //paymentmode
        let contract=contracts.filter(el=>el.source_org===el.dest_org)
        if (contract.length){
       // console.log(contract[0].price)
        await setSellingPrice(contract[0].price)
       
       
            }else{

        toast({
            message: 'Please there is no cover/price for this service. Either set service price or try another service. Setting price at zero ',
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          })
          await setSellingPrice(0)   
     }

     }

    }

     const getSearchfacility=async (service)=>{
      //  console.log(JSON.stringify(service))
        if (!service){
            //"clear stuff"
            setProductId("")
            setName("")
            setBaseunit("")
            setInventoryId("")
            setSellingPrice(0)
            setInvQuantity("")
            setQAmount(null)
            setCostprice("")
            setContracts("")
            setCategory("")
            setInventoryId("")
            setBilllingId("")
        
           //setCalcAmount(null)
            return
        }
         setContracts(service.contracts)
         setProductId(service.productId)
         setName(service.name)
         setCategory(service.category)
         setBaseunit(service.baseunit)
         setInventoryId(service.inventoryId)
         setBilllingId(service._id)
         await setObj(service)
        console.log(service.contracts)
        
     }


    const getSearchfacility1=async (person)=>{
       
       
        if (!person){
             //"clear stuff"
           /*   setProductId("")
             setName("")
             setBaseunit("")
             setInventoryId("")
             setSellingPrice("")
             setInvQuantity("")
             setQAmount(null)
             setCostprice("") */
             setPatient("")
             setSource("")
             return
         }
         await setPatient(person)
          setSource(person.firstname+" "+ person.lastname)
     }

     useEffect(() => {
         setCurrentUser(user)
         //console.log(currentUser)
         return () => {
         
         }
     }, [user])
 
     const handleUpdateTotal=async ()=>{
        await setTotalamount(prevtotal=>Number(prevtotal) + Number(calcamount))
     }
 
     const handleChangeType=async (e)=>{
        // console.log(e.target.value)
         await setType(e.target.value)
     }
 
     const handleAmount= async()=>{
        // await setQAmount(null)
        // alert("Iam chaning qamount")
     }

     const handleClickProd=async()=>{
       /*   console.log("amount: ",productItemI.amount)
         console.log("qamount: ",qamount)
         console.log("calcamount: ",calcamount) */
        if ( source===""||quantity===""|| obj===""|| quantity===0||paymentmode==="" ){
            toast({
                message: 'You need to choose a service, billing mode and quantity to proceed',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
              return 
        }

         await setSuccess(false)
         await setProductItem(
             prevProd=>prevProd.concat(productItemI)
         )
        handleUpdateTotal()
            // generate billing info
           
        //update order
        
      /*   OrderServ.patch(medication._id,{
            order_status:"Billed", //Billed
            billInfo,
        }).then((resp)=>{
           // medication=resp
           // console.log(resp)
             handleRow(resp) 
            //update dispense

        })
        .catch((err)=>{
            console.log(err)
        })
         */
        //update status(billed) + action()
        //?attached chosen product to medication
        //dispense helper?

         setName("")
         setBaseunit("")
         setQuantity(1)
         setInventoryId("")
         setSellingPrice(0)
         setInvQuantity("")
            // handleAmount()
        setCalcAmount(0)
        await setSuccess(true)
        getSearchfacility(false)
        setObj("")
        console.log(sellingprice)
        /* console.log(qamount)
        console.log(productItem) */
        setChangeAmount(true)
        setContracts("")
       // alert("finished")
     }
  
 
     const handleQtty=async(e)=>{
        /*  if (invquantity<e.target.value){
             toast({
                 message: 'You can not sell more quantity than exist in inventory ' ,
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               })
             return
         } */
         setQuantity(e.target.value)
         if (e.target.vlue===""){
            setQuantity(1)
         }
         /* calcamount1=quantity*sellingprice
         await setCalcAmount(calcamount1)
         console.log(calcamount) */
     }
 
     useEffect( () => {
          setProductEntry({
             
             date,
             documentNo,
             type,
             totalamount,
             source,
         })
       // setCalcAmount(quantity*sellingprice) 
         return () => {
             
         }
     },[date])
 
     const resetform=()=>{
      setType("Sales")
     setDocumentNo("")
     setTotalamount("")
     setProductId("")
     setSource("")
     setDate("")
     setName("")
     setBaseunit()
     setCostprice()
     setProductItem([])
     setContracts("")
     }


     const handleCreateBill= async()=>{ //handle selected single order
           

           //documentation
           let serviceList=[]
           let document={}
           
             if (user.currentEmployee){
             document.facility=user.currentEmployee.facilityDetail._id 
             document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
             }
            document.documentdetail=productItem
            console.log(document.documentdetail)
             document.documentname="Billed Orders" //state.DocumentClassModule.selectedDocumentClass.name
            // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
             document.location=state.employeeLocation.locationName+" "+state.employeeLocation.locationType
             document.locationId=state.employeeLocation.locationId
             document.client=patient._id
             document.clientname=patient.firstname+ " "+patient.middlename+" "+patient.lastname
             document.clientobj=patient
             document.createdBy=user._id
             document.createdByname=user.firstname+ " "+user.lastname
             document.status="completed"
             console.log(document)
        
             //order
             document.documentdetail.forEach(async (element)=> {
          
                let orderinfo={ //for reach document
                documentationId:"", //tbf
                order_category:element.category, //category
                order: element.name,  //name
                instruction:"",
                destination_name: document.facilityname, //facilityname
                destination: document.facility, //facility id
                order_status:"Billed",
                payer:element.billMode.organizationName,
                paymentmode:element.billMode.paymentmode,
                
                requestingdoctor_Id: document.createdBy, 
                requestingdoctor_Name: document.createdByname,
                requestingdoctor_locationid:document.locationId,
                requestingdoctor_locationName:document.location,
                requestingdoctor_facilityId:document.facility,
                requestingdoctor_facilityname:document.facilityname,
             
                clientId: document.client,
                clientname:document.clientname,
                client:document.clientobj,
              
                order_action:[],
                medication_action:[],
                treatment_action:[]
             }

             let billInfo={
                orderInfo:{
                    orderId:"", //tbf
                    orderObj:orderinfo,
                  },
                  serviceInfo:{            
                    price: element.sellingprice,
                    quantity: element.quantity,
                    productId: element.productId,
                    name: element.name,
                    baseunit: element.baseunit,
                    amount:element.amount,
                    billingId:element.billingId,
                    billingContract:element.billingContract,
                    createdby:user._id,
                  },
                  paymentInfo:{
                    amountDue:element.amount,
                    paidup:0,
                    balance:element.amount,
                    paymentDetails:[]
              
                  },
                  participantInfo:{
                    billingFacility:orderinfo.destination,
                    billingFacilityName:orderinfo.destination_name,
                    locationId:document.locationId, //selected location,
                    clientId:orderinfo.clientId,
                    client:orderinfo.client,
                    paymentmode:element.billMode
                  },
                  createdBy:user._id,
                  billing_status:"Unpaid"
                }
                let items={
                    orderinfo,
                    billInfo
                }

                serviceList.push(items)

            })

            console.log("==================")
            console.log(document,serviceList)
            
        
        let confirm =window.confirm(`You are about to bill ${document.clientname} for ${serviceList.length} service(s)?`)
    if (confirm){
            await BillCreateServ.create({
                document,
                serviceList
            }).then((res)=>{
                        setSuccess(true)
                        toast({
                            message: 'Billed Orders created succesfully',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            })
                            setSuccess(false)
                            setProductItem([])
                            setCalcAmount(0);
                            const today=new Date().toLocaleString()
                            //console.log(today)
                            setDate(today)
                            const invoiceNo=random(6,'uppernumeric')
                            setDocumentNo(invoiceNo)

                    })
                    .catch((err)=>{
                        toast({
                            message: 'Error creating Billed Orders ' + err,
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: true,
                            })
                    }) 
   
            }






       /*  const    newProductEntryModule={
            selectedMedication:{},
            show :'create'
        }
      await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule})) */
       //console.log(state)
      // ProductEntry.show=!ProductEntry.show
    
    }
 
     const onSubmit = async(e) =>{
         e.preventDefault();
         setMessage("")
         //setError(false)
         setSuccess(false)
         await setProductEntry({
             
             date,
             documentNo,
             type,
             totalamount,
             source,
         })
         productEntry.productitems=productItem
         productEntry.createdby=user._id
         productEntry.transactioncategory="debit"
        
          // console.log("b4 facility",productEntry);
           if (user.currentEmployee){
          productEntry.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
           }else{
             toast({
                 message: 'You can not remove inventory from any organization',
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               }) 
               return
           }
           
           if (state.StoreModule.selectedStore._id){
             productEntry.storeId=state.StoreModule.selectedStore._id
           }else{
             toast({
                 message: 'You need to select a store before removing inventory',
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               }) 
               return
 
           }
           
 
       } 
 
  
    const handleChangeAmount=()=>{
        setChangeAmount((rev)=>(!rev))
        
    }

    const newclient=async ()=>{
        await  setProductItem([])
    }

    const createObj= (pay,name,cover,type)=>{
      let details={}
        details= {...pay}
        details.type=type

    return {
            name,
            value:cover,
            detail:details,
            type,
        }

    }

    useEffect(() => {
        
        //update selling price
        if (!!billMode && !!contracts){
           // console.log(contracts)
            checkPrice(contracts,billMode)
        }
       
        return () => {
           
        }
    }, [obj])

   useEffect(() => {
       
        setProductItem([])
        setTotalamount(0)
        const paymentoptions= []
       // const info = client.paymentinfo
        let billme
       let obj
       if (!!patient){
          // console.log(patient)

        patient.paymentinfo.forEach((pay,i)=>{ 
           if (pay.active){
       
            switch(pay.paymentmode) {
                case 'Cash':
                  // code block
                  obj=createObj(pay,"Cash","Cash","Cash" )
                
                  paymentoptions.push(obj)
                  setPaymentMode("Cash")
                  billme=obj
                 // console.log("billme",billme)
                  break;
                case 'Family':
                  // code block
                  obj=createObj(pay,"Family Cover","familyCover", "Family Cover")
                  paymentoptions.push(obj)
                  setPaymentMode("Family Cover")
                  billme=obj
                 // console.log("billme",billme)
                  break;
                case 'Company':
                  // code block
                  let name="Company: " + pay.organizationName + "(" + pay.plan+")"

                  obj=createObj(pay,name,"CompanyCover", "Company Cover" )
                      paymentoptions.push(obj)
                      setPaymentMode("Company: " + pay.organizationName + "(" + pay.plan+")")
                     billme=obj
                    // console.log("billme",billme)
                  break;
                case 'HMO':
                  // code block
                  console.log(pay)
                 let  sname="HMO: " + pay.organizationName + "(" + pay.plan+")"

                  obj=createObj(pay,sname,"HMOCover", "HMO Cover" )
                      paymentoptions.push(obj)
                      setPaymentMode("HMO: " + pay.organizationName + "(" + pay.plan+")")
                     billme=obj
                   //  console.log("billme",billme)
                  break;
                default:
                  // code block
              }
            }
            })
                    
          
        setPaymentOptions(paymentoptions)
        setBillMode(billme)
       }
       //console.log(paymentoptions)
       // console.log(billMode)
        return () => {
           
        }
    }, [source]) 


     useEffect(() => {
         console.log("startup")
       // const medication =state.medicationModule.selectedMedication
         const today=new Date().toLocaleString()
         //console.log(today)
         setDate(today)
         const invoiceNo=random(6,'uppernumeric')
         setDocumentNo(invoiceNo)
         return () => {
            console.log("closeup")
            const today=new Date().toLocaleString()
            //console.log(today)
            setDate(today)
            const invoiceNo=random(6,'uppernumeric')
            setDocumentNo(invoiceNo)
            setCalcAmount(0)
             
         }
     }, [])

     useEffect(() => {
        calcamount1=quantity*sellingprice
         setCalcAmount(calcamount1)
         //console.log(calcamount1)
         setChangeAmount(true)
         return () => {
            
        }
    }, [quantity,sellingprice])

    useEffect(() => {
        // console.log("success", success)
         if (success){
             setSuccess(false)
         }
       
      }, [success])
 
      useEffect(() => {
         // console.log("success", success)
          if (success1){
              setSuccess1(false)
          }
        
       }, [success1])
    
    useEffect(() => {
        if (!!billMode && !!contracts){
            //console.log(contracts)
            checkPrice(contracts,billMode)
        }
        
        return () => {
            
        }
    }, [billMode])

    useEffect(() => {
       // console.log(sellingprice)
        return () => {
            
        }
    }, [sellingprice])

    useEffect(() => {
        getSearchfacility1(state.ClientModule.selectedClient )
        
        /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
        return () => {
           
        }
    }, [state.ClientModule.selectedClient ])

    const handleRemoveBill=(item,index)=>{
        setProductItem(prev=>prev.filter((el,i)=>i!==index))
    }

// console.log("simpa")
     return (
         <>
             <div className="card card-overflow">
             <div className="card-header">
                 <p className="card-header-title">
                     Bill Service
                 </p>
                {/*  <button className="button is-success is-small btnheight mt-2" onClick={showDocumentation}>Documentation</button> */}
             </div>
             <div className="card-content ">
    
             <form onSubmit={onSubmit}> {/* handleSubmit(onSubmit) */}
             <div className="field is-horizontal">
             <div className="field-body">
            {/*  <div className="field">    
                 <div className="control">
                     <div className="select is-small">
                         <select name="type" value={type} onChange={handleChangeType} className="selectadd">
                            <option value="">Choose Type </option>
                             <option value="Dispense">Dispense</option>
                             <option value="Bill">Bill </option> */}
                             {/* <option value="Dispense">Dispense</option>
                             <option value="Audit">Audit</option> */}
                 {/*         </select>
                     </div>
                 </div>
             </div>
 */}
              {state.ClientModule.selectedClient.firstname !==undefined ? <div className="field"> 
              <label className="label is-size-7" > {state.ClientModule.selectedClient.firstname} {state.ClientModule.selectedClient .lastname}</label>
               </div> 
               :
             <div className="field">
                 <ClientSearch  getSearchfacility={getSearchfacility1} clear={success1} /> 
                     {/* <p className="control has-icons-left has-icons-right">
                         <input className="input is-small"  ref={register({ required: true })}  value={source} name="client" type="text" onChange={e=>setSource(e.target.value)} placeholder="Client" />
                         <span className="icon is-small is-left">
                             <i className="fas fa-hospital"></i>
                         </span>                    
                     </p> */}
                 </div>}
                 <div className="field">    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="paymentmode" value={paymentmode} onChange={(e)=>handleChangeMode(e.target.value)} className="selectadd" >
                         <option value="">Billing Mode </option>
                           {paymentOptions.map((option,i)=>(
                               <option key={i} value={option.details}> {option.name}</option>
                           ))}
                           
                            
                            {/*  <option value="Cash">Cash</option>
                             <option value="Family">Family </option>
                            <option value="Company Cover">Company Cover</option>
                             <option value="HMO">HMO</option> */}
                         </select>
                     </div>
                 </div>
             </div>
            
             </div>
             </div> {/* horizontal end */}
            {/*  <div className="field">
                 <p className="control has-icons-left"> // Audit/initialization/Purchase Invoice 
                     <input className="input is-small"  ref={register({ required: true })} name="type" type="text" placeholder="Type of Product Entry"/>
                     <span className="icon is-small is-left">
                     <i className=" fas fa-user-md "></i>
                     </span>
                 </p>
             </div> */}
                <div className="field is-horizontal">
                <div className="field-body">
                <div className="field">
                 <p className="control has-icons-left has-icons-right">
                     <input className="input is-small"  /* ref={register({ required: true })} */ value={date}  name="date" type="text" onChange={e=>setDate(e.target.value)} placeholder="Date" />
                     <span className="icon is-small is-left">
                         <i className="fas fa-map-signs"></i>
                     </span>
                 </p>
             </div>
             <div className="field">
                 <p className="control has-icons-left">
                     <input className="input is-small" /* ref={register} */ name="documentNo" value={documentNo} type="text" onChange={e=>setDocumentNo(e.target.value)} placeholder=" Invoice Number"/>
                     <span className="icon is-small is-left">
                     <i className="fas fa-phone-alt"></i>
                     </span>
                 </p>
             </div>
             <div className="field">
                 <p className="control has-icons-left">
                     <input className="input is-small" /* ref={register({ required: true })} */ value={totalamount} name="totalamount" type="text" onChange={e=>setTotalamount(e.target.value)} placeholder=" Total Amount"/>
                     <span className="icon is-small is-left">
                     <i className="fas fa-coins"></i>
                     </span>
                 </p>
             </div>
 
                 </div> 
                 </div> 
                
                 </form>   
                
        
             <label className="label is-small">Choose Service Item:</label>
          <div className="field is-horizontal">
             <div className="field-body">
             <div className="field is-expanded"  /* style={ !user.stacker?{display:"none"}:{}} */ >
                     <ServiceSearch  getSearchfacility={getSearchfacility} clear={success} mode={billMode}/> 
                     <p className="control has-icons-left " style={{display:"none"}}>
                         <input className="input is-small" /* ref={register ({ required: true }) }  *//* add array no */  value={productId} name="productId" type="text" onChange={e=>setProductId(e.target.value)} placeholder="Product Id" />
                         <span className="icon is-small is-left">
                         <i className="fas  fa-map-marker-alt"></i>
                         </span>
                     </p>
                     
                {/* {sellingprice}  {sellingprice &&   "N"}{sellingprice} {sellingprice &&   "per"}  {baseunit} {invquantity} {sellingprice &&   "remaining"}  */}
                 </div>
             </div>
         </div>
         <div className="field is-horizontal">
             <div className="field-body" >
                 <div className="field" style={{width:"40%"}}>
                 <p className="control has-icons-left" >
                     <input className="input is-small"  /* ref={register({ required: true })} */ name="quantity" value={quantity} type="text" onChange={ e=> handleQtty(e)} placeholder="Quantity"  />
                     <span className="icon is-small is-left">
                     <i className="fas fa-hashtag"></i>
                     </span>
                    
                 </p>
        {/*  <label >{baseunit}</label> */}
             </div> 
             <div className="field">
             <label>Amount:</label>{/* <p>{quantity*sellingprice}</p> */}
             </div>
             <div className="field" style={{width:"40%"}}>
                 <p className="control has-icons-left " /* style={{display:"none"}} */>
                     <input className="input is-small"  name="qamount" disabled={changeAmount} value={calcamount} type="text"  onChange={async e=> await setCalcAmount(e.target.value)}  placeholder="Amount"  />
                     <span className="icon is-small is-left">
                     <i className="fas fa-hashtag"></i>
                     </span>
                 </p>
                 {(user.currentEmployee?.roles.includes('Adjust Price')||user.currentEmployee?.roles.length===0||user.stacker )&& <button className="button is-small is-success btnheight" onClick={handleChangeAmount}>Adjust</button>}
 
             </div> 
             <div className="field">
             <p className="control">
                     <button className="button is-info is-small  is-pulled-right">
                       <span className="is-small" onClick={handleClickProd}> +</span>
                     </button>
                 </p>
             </div>
             </div>
          </div>
    
        {(productItem.length>0) && <div>
             <label>Service Items:</label>
             <div class="table-container">
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                 <thead>
                     <tr>
                     <th><abbr title="Serial No">S/No</abbr></th>
                     <th><abbr title="Category">Category</abbr></th>
                     <th><abbr title="Name">Name</abbr></th>
                     <th><abbr title="Quantity">Quanitity</abbr></th>
                     <th><abbr title="Unit">Unit</abbr></th>
                     <th><abbr title="Selling Price">Selling Price</abbr></th>
                     <th><abbr title="Amount">Amount</abbr></th>
                     <th><abbr title="Billing Mode">Mode</abbr></th>
                     <th><abbr title="Actions">Actions</abbr></th>
                     </tr>
                 </thead>
                 <tfoot>
                     
                 </tfoot>
                 <tbody>
                    { productItem.map((ProductEntry, i)=>(
                          <tr key={i}>
                         <th>{i+1}</th>
                         <td>{ProductEntry.category}</td>
                         <td>{ProductEntry.name}</td>
                         <th>{ProductEntry.quantity}</th>
                         <td>{ProductEntry.baseunit}</td>
                         <td>{ProductEntry.sellingprice}</td>
                         <td>{ProductEntry.amount}</td>
                         <td>{ProductEntry.billMode.type}</td>
                         <td onClick={()=>handleRemoveBill(ProductEntry,i)}><span className="showAction"  >x</span></td>
                         </tr>
                     ))}
                 </tbody>
                 </table>
                 </div>
                 <div className="field mt-2 is-grouped">
                 <p className="control">
                     <button className="button is-success is-small" disabled={!productItem.length>0} onClick={handleCreateBill}>
                        Done
                     </button>
                 </p>
                {/*  <p className="control">
                     <button className="button is-warning is-small" disabled={!productItem.length>0} onClick={onSubmit} >
                         Clear
                     </button>
                 </p> */}
                 </div>
                 </div>
            
             }
             
             
             </div>
             </div>
           
         </>
     )
    
 }

 export  function ServiceSearch2({getSearchfacility,clear}) {
    
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
   const {user} = useContext(UserContext) 
   const {state}=useContext(ObjectContext)
    const [productModal,setProductModal]=useState(false)

   const handleRow= async(obj)=>{
        await setChosen(true)
        //alert("something is chaning")
       await setSimpa(obj.name)
       getSearchfacility(obj)
        // setSelectedFacility(obj)
        setShowPanel(false)
       // await setCount(2)
        /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
   //console.log(state)
    }
    const handleBlur=async(e)=>{
         /* if (count===2){
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
    const handleSearch=async(value)=>{
        setVal(value)
        if (value===""){
            setShowPanel(false)
            getSearchfacility(false)
            return
        }
        const field='name' //field variable

       
        if (value.length>=3 ){
            productServ.find({query: {     //service
                 [field]: {
                     $regex:value,
                     $options:'i'
                    
                 },
                 facility: user.currentEmployee.facilityDetail._id,
                 //storeId: state.StoreModule.selectedStore._id,
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
              //console.log("product  fetched successfully") 
              //console.log(res.data) 
                setFacilities(res.data)
                 setSearchMessage(" product  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error creating ProductEntry ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
             })
         }
        else{
            //console.log("less than 3 ")
           // console.log(val)
            setShowPanel(false)
            await setFacilities([])
           // console.log(facilities)
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
          // console.log("success has changed",clear)
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
                            <DebounceInput className="input is-small  is-expanded" 
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
                        <div className="dropdown-menu expanded" style={{width:"100%"}}>
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item selectadd" /* onClick={handleAddproduct} */> <span> {val} is not in your inventory</span> </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <div><span>{facility.name}</span></div>
                                        <div><span><strong>{facility.quantity}</strong></span>
                                        <span>{facility.baseunit}(s) remaining</span>
                                        <span className="padleft"><strong>Price:</strong> N{facility.sellingprice}</span></div>
                                        
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