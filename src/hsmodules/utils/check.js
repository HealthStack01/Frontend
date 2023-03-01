const handleCheck= async ()=>{
    
    if (!categoryname){
        toast({
            message: 'Enter Category!',
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          }) 
        return true
    }
    await ServicesServ.find({
        query:{
            name:source,
            facility: user.currentEmployee.facilityDetail._id,
            category:categoryname
        }
    }).then((resp)=>{
        console.log(resp)
        if (resp.data.length>0){
        toast({
            message: 'Service already exist. Kindly modify it ' , //+ resp.data
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          }) 
          return true
        }
    })
    .catch((err)=>{
        toast({
            message: 'Error checking services  '+ err ,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          }) 
    })
}
  
//utilize
let check= await handleCheck()
if (check){
    return
}