[
    {policyNo:{
        $regex: val,
        $options: "i",
      }},{          
organizationType: {
$regex: val,
$options: "i",
}},
{organizationName:{
$regex: val,
$options: "i",
}},{
"organization.facilityName":{  
$regex: val,
$options: "i",}},
{"principal.lastname":{
$regex: val,
$options: "i",
}},
{"principal.firstname":{
$regex: val,
$options: "i",
}},{           
"dependantBeneficiaries.type": {
$regex: val,
$options: "i",
}},
{           
"dependantBeneficiaries.firstname": {
  $regex: val,
  $options: "i",
}},
{           
"dependantBeneficiaries.lastname": {
  $regex: val,
  $options: "i",
  }},

,{        
"sponsor.facilityName": {
$regex: val,
$options: "i",
}},{
       
       
sponsorshipType: {
$regex: val,
$options: "i",
}},{
       
       
planType: {
$regex: val,
$options: "i",
}},{
       
       
"plan.planName":{
$regex: val,
$options: "i",
}},
{

"providers.facilityName":{
  $regex: val,
  $options: "i",
}},
        
       
  
      {
        firstname: {
          $regex: val,
          $options: "i",
        },
      },
      {
        lastname: {
          $regex: val,
          $options: "i",
        },
      },
      {
        middlename: {
          $regex: val,
          $options: "i",
        },
      },
      {
        phone: {
          $regex: val,
          $options: "i",
        },
      },
      {
        clientTags: {
          $regex: val,
          $options: "i",
        },
      },
      {
        mrn: {
          $regex: val,
          $options: "i",
        },
      },
      {
        email: {
          $regex: val,
          $options: "i",
        },
      },
      {
        specificDetails: {
          $regex: val,
          $options: "i",
        },
      },
  providers
             
premiumContract: { type: Schema.Types.Mixed,  }},{
             
             
premium: { type: String }},{
             
             
active:{
    $regex: val,
    $options: "i",
  }},{
             
             
isPaid: { type: Schema.Types.Boolean, default: false }},{
             
             
approved:{ type: Boolean,default:false}},{
             
             

approvalDate:{type:Date}},{
             
             
approvedby:{
  employeename:{
              $regex: val,
              $options: "i",
            }},{
             
             

paymentmode:{
    $regex: val,
    $options: "i",
  }},{
             
              //HMO

agent:{ type: Schema.Types.Mixed,  }},{
             
             
agentName:{ type: String,  }},{
             
             



validityPeriods:{
    $regex: val,
    $options: "i",
  }},{
             
             
validitystarts:{
    $regex: val,
    $options: "i",
  }},{
             
             
validityEnds:{ type: Schema.Types.Date,}},{
             
             
Date_JoinScheme: {
    $regex: val,
    $options: "i",
  }},{
             
             
providers:{
    $regex: val,
    $options: "i",
  }},{
             
             
status:{
    $regex: val,
    $options: "i",
  }},{
             
             
]