<div >
{facilities.map((Clinic, i)=>(
    <>
    <div  key={Clinic.client_id}  >
       <div >
            <div  >
            {/* <input type = "checkbox" name={Clinic.client_id}  />   */}
            <strong> {i+1} {Clinic.clientname} {/* with {Clinic.bills.length} Unpaid bills. */} {/* Grand Total amount: N */}</strong> 
            </div>
        </div>
        <div>
            <div className=" is-fullwidth vscrollable pr-1">   
                <div>
                    {Clinic.bills.map((category, i)=>(
                        <div  key={i} >
                            <div >
                            <div  >
                            {/* <input type = "checkbox" name={Clinic.client_id} onChange={(e)=>handleMedicationRow(Clinic,e)} /> */}  
                                 {category.catName} with {category.order.length} Unpaid bills. {/* Total amount: N */}
                            </div>
                            </div>
                            <div>
                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                        <thead>
                                            <tr>
                                                <th><abbr title="Serial No">S/No</abbr></th>
                                                <th><abbr title="Date">Date</abbr></th>
                                                <th><abbr title="Description">Description</abbr></th>
                                            {/*  <th>Fulfilled</th> */}
                                                <th><abbr title="Status">Status</abbr></th>
                                                <th><abbr title="Amount">Amount</abbr></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                             { category.order.map((order, i)=>(

                                <tr key={order._id}  /*  onClick={()=>handleMedicationRow(order)} */  className={order._id===(selectedFinance?._id||null)?"is-selected":""}>                                         
                                <th><input type = "checkbox" name={order._id} onChange={(e)=>handleChoseClient(Clinic,e, order)}  checked={order.checked}/>  {i+1}</th>
                                <td><span>{format(new Date(order.createdAt),'dd-MM-yy')}</span></td> {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */} 
                                <th>{order.serviceInfo.name}</th>
                               {/*  <td>{order.fulfilled==="True"?"Yes":"No"}</td> */}
                                <td>{order.billing_status}</td>
                                <td>{(order.billing_status==="Unpaid")?order.serviceInfo.amount:order.paymentInfo.balance}</td>
                                </tr>
                        ))}
                    </tbody>
                    </table>

                            </div>                                          
                        </div>
                    ))}
                </div>
            </div>
        </div>                    
    </div >

<div> {category.catName} with {category.order.length} Unpaid bills.</div>
</>
))}
</div>


export function DispenseDetail(){
    //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
     // eslint-disable-next-line
    const [error, setError] =useState(false) //, 
    const [selectedMedication, setSelectedMedication] =useState("")
    const [currentOrder, setCurrentOrder] =useState("")
     // eslint-disable-next-line
    const [message, setMessage] = useState("") //,
    //const ProductEntryServ=client.service('/ProductEntry')
    //const navigate=useNavigate()
    //const {user,setUser} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)
    const BillServ=client.service('order')
    /* const [ProductEntry, setProductEntry] = useState("")
    const [facilities, setFacilities] = useState("") */

 let ProductEntry =state.DispenseModule.selectedDispense
   //const facilities=ProductEntry.orders

   const handleRow= async(ProductEntry)=>{
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    await setSelectedMedication(ProductEntry)

    const    newProductEntryModule={
        selectedMedication:ProductEntry,
        show :'detail'
    }
  await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
   //console.log(state)
  // ProductEntry.show=!ProductEntry.show

}

    const handleEdit= async(ProductEntry)=>{
        const    newProductEntryModule={
            selectedDispense:ProductEntry,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
       //console.log(state)
       
    }

    useEffect(() => {


      const client1=  state.currentClients.find(el=>{
            return JSON.stringify(el.client_id)===JSON.stringify(state.DispenseModule.selectedDispense)
        })

    setCurrentOrder(client1)
   // console.log(client1)
        return () => {
        
        }
    }, [])
   

 /*  
     const setprod=async()=>{
        await setProductEntry(state.DispenseModule.selectedDispense)
    } */
 
    useEffect(() => {
        /* BillServ.on('created', (obj)=>getFacilities())
        BillServ.on('updated', (obj)=>getFacilities())
       
        BillServ.on('removed', (obj)=>getFacilities()) */
        BillServ.on('patched',  (obj)=>{
            //update state.DispenseModule.selectedDispense
           // console.log(obj.clientId)
           // console.log("currentClients",state.currentClients)
           const current1=state.currentClients.find(el=>(JSON.stringify(el.client_id)===JSON.stringify(obj.clientId)))
           setCurrentOrder(current1)
          // console.log("currentone",current1)
        })
      
        return () => {
         
        }
    },[])
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Dispense Details
                </p>
            </div>
            <div className="card-content vscrollable">
            {/* {JSON.stringify(ProductEntry.orders,2,10)} */}
            <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        {/* <th><abbr title="Client Name">Client Name</abbr></th> */}
                                        {/* <th><abbr title="Number of Orders"># of Medication</abbr></th> */}
                                        <th><abbr title="Date">Date</abbr></th>
                                        <th><abbr title="Order">Medication</abbr></th>
                                        <th>Fulfilled</th>
                                        <th><abbr title="Status">Status</abbr></th>
                                        <th><abbr title="Requesting Physician">Requesting Physician</abbr></th>
                                        
                                        {/* <th><abbr title="Actions">Actions</abbr></th> */}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {state.DispenseModule.selectedDispense.orders.map((order, i)=>(

                                            <tr key={order._id} onClick={()=>handleRow(order)} className={order._id===(selectedMedication?._id||null)?"is-selected":""}>
                                            
                                               <th>{i+1}</th>
                                                 {/* <td>{ProductEntry.clientname}</td> 
                                                <td>{ProductEntry.orders.length}</td> */}
                                           
                                           
                                            <td><span>{format(new Date(order.createdAt),'dd-MM-yy')}</span></td> {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */} 
                                          <th>{order.order}</th>
                                            <td>{order.fulfilled==="True"?"Yes":"No"}</td>
                                            <td>{order.order_status}</td>
                                            <td>{order.requestingdoctor_Name}</td>
                                            
                                           {/*  <td><span className="showAction"  >...</span></td> */}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                        
                </div>              
               
            </div>
        </div>
        </>
    )
}

const resetform=()=>{
    setType("Sales")
   setDocumentNo("")
   setTotalamount("")
   setProductId("")
   setSource("")
   setDate("")
   setName("")
   setBaseunit("")
   setCostprice("")
   setProductItem([])
   }


   const handleMedicationDone= async()=>{ //handle selected single order
      //console.log("b4",state)
  
      //console.log("handlerow",ProductEntry)
  
     // await setSelectedMedication("")
  
      const    newProductEntryModule={
          selectedMedication:{},
          show :'create'
      }
      
    await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
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

  
  const handleClickProd=async()=>{
    /*   console.log("amount: ",productItemI.amount)
      console.log("qamount: ",qamount)
      console.log("calcamount: ",calcamount) */
     if ( quantity===0||quantity===""|| productId===""){
         toast({
             message: 'You need to choose a product and quantity to proceed',
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
         const billInfo={
             orderInfo:{
                 orderId:medication._id,
                 orderObj:medication,
               },
               serviceInfo:{            
                 price: productItemI.sellingprice,
                 quantity: productItemI.quantity,
                 productId: productItemI.productId,
                 name: productItemI.name,
                 baseunit: productItemI.baseunit,
                 amount:productItemI.amount,
                 billingId:productItemI.billingId,
                 createdby:user._id,
               },
               paymentInfo:{},
               participantInfo:{
                 billingFacility:medication.destination,
                 billingFacilityName:medication.destination_name,
                 locationId:state.StoreModule.selectedStore._id, //selected location,
                 clientId:medication.clientId,
                 client:medication.client,
                 paymentmode:billMode
               },
               createdBy:user.id,
               billing_status:"Unpaid"
             }

     //update order
     
     OrderServ.patch(medication._id,{
         order_status:"Billed",
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
     
     //update status(billed) + action()
     //?attached chosen product to medication
     //dispense helper?
      setName("")
      setBaseunit("")
      setQuantity("")
      setInventoryId("")
      setSellingPrice("")
      setInvQuantity("")
          handleAmount()
     // setCalcAmount(null)
     await setSuccess(true)
     /* console.log(success)
     console.log(qamount)
     console.log(productItem) */
     setChangeAmount(true)
  }


  const handleQtty=async(e)=>{
      if (invquantity<e.target.value){
          toast({
              message: 'You can not sell more quantity than exist in inventory ' ,
              type: 'is-danger',
              dismissible: true,
              pauseOnHover: true,
            })
          return
      }
      setQuantity(e.target.value)
      calcamount1=quantity*sellingprice
      await setCalcAmount(calcamount1)
    //  console.log(calcamount)
  }

  const handleUpdateTotal=async ()=>{
    await setTotalamount(prevtotal=>Number(prevtotal) + Number(calcamount))
 }

 const handleChangeType=async (e)=>{
     //console.log(e.target.value)
     await setType(e.target.value)
 }

 const handleAmount= async()=>{
     await setDescription("")
    // alert("Iam chaning qamount")
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
 
        const showDocumentation = async (value)=>{
            setProductModal(true)
          }

          <div className={`modal ${productModal?"is-active":""}` }>
          <div className="modal-background"></div>
          <div className="modal-card  modalbkgrnd">
              <header className="modal-card-head  btnheight">
              <p className="modal-card-title">Documentation</p>
              <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
              </header>
              <section className="modal-card-body modalcolor">
            
             {/*   <Encounter standalone="true" /> */}
              </section> 
              {/* <footer className="modal-card-foot">
              <button className="button is-success">Save changes</button>
              <button className="button">Cancel</button>
              </footer>  */}
         </div>
      </div>  
      
      
 export  function InventorySearch({getSearchfacility,clear}) {
    
    const productServ=client.service('inventory')
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
       getSearchfacility(obj)
       
       await setSimpa(obj.name)
       
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
                 storeId: state.StoreModule.selectedStore._id,
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
              console.log("product  fetched successfully") 
              console.log(res.data) 
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
            console.log("less than 3 ")
            console.log(val)
            setShowPanel(false)
            await setFacilities([])
            console.log(facilities)
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
                            <DebounceInput className="input is-small  is-expanded" 
                                type="text" placeholder="Search Product"
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
                          { facilities.length>0?"":<div className="dropdown-item" /* onClick={handleAddproduct} */> <span> {val} is not in your inventory</span> </div>}

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