import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import { toast } from "react-toastify";
import FilterMenu from "../../components/utilities/FilterMenu";
// import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import { fontSize } from "@mui/system";
import ModalBox from "../../components/modal";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import { Grid, Box } from "@mui/material";
import { width } from "@mui/system";
import BadgeIcon from "@mui/icons-material/Badge";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import { fontWeight } from "@mui/system";
import { Portal } from "@mui/material";
import { BottomWrapper, GridWrapper, HeadWrapper } from "../app/styles";
import { GrayWrapper } from "../app/styles";
import ViewText from "../../components/viewtext";
import BandView from "./BandView";
import { BandForm } from "./BandForm";
import { BandSchema } from "./ui-components/schema";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import { Document, Page, pdfjs } from 'react-pdf';
import { polygon } from "leaflet";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const dataH = require("../../data/hci/NHIA-OTHERS.json"); 
const dataD = require("../../data/hci/NHIA-DRUGS.json"); 
//const data = require("../../data/hci/activeClients.json"); 

//const data = require("../../data/hci/updatedproviders2.json"); 

// eslint-disable-next-line
const searchfacility = {};

export default function Bands() {
  // console.log("bands bands bands");
  const { state } = useContext(ObjectContext); //,setState
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  // eslint-disable-next-line
  const [selectedBand, setSelectedBand] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  const handleCreateModal = () => {
    setCreateModal(true);
  };

  const handleHideCreateModal = () => {
    setCreateModal(false);
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Band  Module</span></div>
            </div> */}
      <div className="column is-6">
        <BandList showCreateModal={handleCreateModal} />
        <div className="column is-6">
          {state.BandModule.show === "detail" && <BandDetail />}
          {state.BandModule.show === "modify" && (
            <BandModify Band={selectedBand} />
          )}

          <BandCreate open={createModal} setOpen={handleHideCreateModal} />
        </div>
      </div>
    </section>
  );
}

export function BandCreate({ open, setOpen }) {
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const BandServ = client.service("bands");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const bandTypeOptions = [
    "Provider",
    "Company",
    "Patient",
    "Plan",
    "Corporate Sponsor",
  ];

  //corporate sponsors pay premium and not claims
  //company pays claims and not premium

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeBand.FacilityId)//
    if (!user.stacker) {
      console.log(currentUser);
      setValue("facility", user.currentEmployee.facilityDetail._id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, []);

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (data.bandType === "") {
      alert("Kindly choose band type");
      return;
    }
    setMessage("");
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    BandServ.create(data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Band successfully") */
        setSuccess(true);
        toast({
          message: "Band created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch((err) => {
        toast({
          message: "Error creating Band " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header"></div>
        <div className="card-content vscrollable">
          <BandForm open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}

export function BandList({ showCreateModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const BandServ = client.service("bands");
  const facilityServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const ClientServ = client.service("client");
  const policyServ = client.service("policy");
  const InvoiceServ = client.service('corpinvoices');
  const planServ = client.service('healthplan');
  const accServ = client.service('accpersons');
  const TariffServ = client.service('tariff');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);

  const [loading, setLoading] = useState([]);
  // eslint-disable-next-line
  const [selectedBand, setSelectedBand] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [text, setText] = useState([]);
  const [file, setFile] = useState(null);
  const [sponsor, setSponsor] = useState();
  const [plan, setPlan] = useState();
  const [currFacility, setCurrFacility] = useState()
  const provRef=useRef()
  const pdfContentRef=useRef()
  const hlistRef=useRef()
  const plistRef= useRef()
  const [pdfContent, setPdfContent] = useState([]);
  const [hList, setHList] = useState([]);
  const [pList, setPList] = useState([]);
  const clientCountRef=useRef()
  const policyCountRef=useRef(0)
  
  
  

  const handleCreateNew = async () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const handleRowClicked = (row) => {
    setSelectedBand(row);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleRow = async (Band) => {
    await setSelectedBand(Band);
    const newBandModule = {
      selectedBand: Band,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const handleSearch = (val) => {
    // const field = "name";

    console.log("====>>>  handleSearch");
    BandServ.find({
      query: {
        // [field]: {
        //   $regex: val,
        //   $options: "i",
        // },
        $or: [
          // {
          //   policyNo: {
          //     $regex: val,
          //     $options: "i",
          //   },
          // },
          {
            bandType: {
              $regex: val,
              $options: "i",
            },
          },
        ],

        facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Band  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error fetching Band, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    console.log(user);
    setLoading(true);
    if (user.currentEmployee) {
      console.log(user);

      const findBand = await BandServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findBand.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const findBand = await BandServ.find({
          query: {
            $limit: 200,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findBand.data);
      }
    }
  };

  useEffect(() => {
    //getFacilities();
    findstuff()
    

    BandServ.on("created", (obj) => getFacilities());
    BandServ.on("updated", (obj) => getFacilities());
    BandServ.on("patched", (obj) => getFacilities());
    BandServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  const handleFileUpload3 =  async(event) => {
   


    const hosp=[] //data.slice(start,end)

    const uniquePolicy = [...new Set(hosp.map(obj => obj.Beneficiaries))];
    let n=0

    for (const unique of uniquePolicy){
        //find the beneficiaries
      let benefits=  hosp.filter(el=>el.Beneficiaries===unique)
      let dependents=[]
      let principal={}
      let genNo=""
      let faci={}
      n=n+1 
        for (const benfi of benefits){

          faci=benfi
         
            let client={
              firstname: faci.EmployeeOthername, 
              middlename:"",
              lastname:faci.EmployeeSurname,
              dob:faci.Date_Birth?faci.Date_Birth:"1/01/1960" ,
              gender:faci.Sex,
              maritalstatus: faci.MaritalStatusID,
              religion: "",
              phone:faci.Phone,
              email: `${n}${faci.EmployeeOthername}@healthstack.africa`, //unique: true
              bloodgroup: faci.BloodTypeID,
              genotype:faci.Genotype,
              clientTags:"hci beneficiary",
              facility:user.currentEmployee.facilityDetail._id ,
              address:faci.Address1,
            }
      
             await  ClientServ.create(client)
             .then(async(resp)=>{
              if (benfi.FamilyCode== "0"){
                resp.type="Principal"
                principal=resp
                genNo=benfi["Policy No"]
              }else{
                resp.type="Dependent"
                dependents.push(resp)
              }
             
             // create policy 
             
               console.log("end of story")

             })
             .catch((err) => {
               console.log("Error creating client " + err);
             });

        
          }
          let provi=[]
          let provider={
            facilityName:faci.HospitalName,
              code:faci["Hospital ID"] 
          }
          
              provi.push(provider)
 //create policy
                  let policy = {
                    policyNo: genNo,
                    organizationType:user.currentEmployee.facilityDetail.facilityType,
                      
                    organizationId:user.currentEmployee.facilityDetail._id,
                    
                    organizationName:user.currentEmployee.facilityDetail.facilityName,
                    
                    organization:user.currentEmployee.facilityDetail,
                    
                    principal: principal,
                    dependantBeneficiaries: dependents,
                    providers:provi , //
                    sponsorshipType:faci.CustomerName==="Individual"?"Self":"Company",
                    sponsor: {facilityName:faci.CustomerName,
                               code:faci.CustomerID   },
                    plan:{
                      planName: faci.PlanDescription,
                      planId:faci.PlanID
                    },
                    planType: faci.FamilyCode>0?"Family":"Individual",

                  //  validityPeriods:[ { type: String,  }],
                  validitystarts:faci.PaymentStartDate,
                  validityEnds:faci.PaymentEndDate,
                  Date_JoinScheme:faci.Date_JoinScheme,
                    active: true,
                    isPaid: true,
                    approved:true,
                    statushx: [
                      {
                        date: new Date(),
                        employeename: `${user.currentEmployee.firstname} ${user.currentEmployee.lastname}`,
                        employeeId: user.currentEmployee._id,
                        status: "Policy Created",
                      }
                  ]
                  }
                 
                  await policyServ
                    .create(policy)
                    .then((res) => {
                    console.log("policy created succesfully",res);
                    console.log("policy #"+n,policy)
                    })
                    .catch((err) => {
                      console.log("Error creating policy " + err);
                    });

        }
    }

    const handleupdateOrg =async ()=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

      const hosp=[] //data
    //  const uniquePolicy = [...new Set(data.map(obj => obj.facilityname))];
      let n=0
      let m=0
      let one=[]
      let two=[]
      let zero=[]
      let others=[]
      for (const benfi of hosp){
        m=m+1
        console.log(m)
       let avail= await facilityServ.find({
        query:{
          facilityName:benfi.Facilityname
        }
       })
       //console.log(benfi.Facilityname +":",avail.total)
       switch(avail.total){
        case 0:
          console.log(benfi)
          let holder={}
        
          let facilitydata={
         
            facilityCAC:"",
            
          
            facilityName:benfi.Facilityname,
          
            facilityOwner: "",
          
            facilityType: "Corporate",
          
            facilityCategory:"SME",
          
            facilityCountry: "Nigeria",
          
            facilityState: benfi.FacilityState,
          
            facilityLGA: "",
          
            facilityCity:benfi.Facilitycity, 
          
            facilityAddress:benfi.FacilityAddress,
          
            facilityContactPhone:"0801111111",
          
            facilityEmail:`${n}@hci-corp.com`,
            facilityModules: ['Admin', 'Complaint', 'Corporate', 'Communication']
              }
          let admindata ={
            firstname:benfi.adminfirstname,
            lastname:"Admin",
            phone: "08011111111",
            email: `${n}@hci-corp.com`,
    
            profession: "Admin",
            position: "Admin",
           
            department: "Admin",
            deptunit: "Admin",
            password: "Administrator",
           roles:['Admin', 'Complaint', 'Corporate', 'Communication']
    
    
          }
    
            const facilityDocument = {
              ...facilitydata,
              hasEmployee: true,
              employeeData:admindata
            }
      
           await  facilityServ.create(facilityDocument)
            .then(async(resp)=>{
              //create relationship
              holder=resp
              console.log("facility created #"+n ,resp)
              let obj = {
                facility: user.currentEmployee.facilityDetail._id,
                organization: resp._id,
                relationshiptype: "sponsor",
                status: "Pending",
                code:benfi.customerId
                
              };
          
             // console.log("query", query);
          //create organizatuonal relationship
              await orgServ
                .create(obj)
                .then((res) => {
                  console.log("res", res);
                 console.log("Organization added succesfully"); 
                })
                .catch((err) => {
                  console.log("Error adding organization " + err);
                });
      
                //create invoice
                let invoice={
                  customerId:holder._id,//sending money
                    customer:holder,
                    customerName:benfi.Facilityname,
                    customerAddress:benfi.FacilityAddress,
                    customerCity:"",
                    customerCountry:"Nigeria",
                    customerLGA:"",
                    customerState:"",
                    customerPhone:benfi.AdminPhone,
                    customerEmail: `${n}@hci-corp.com`,
                    customerType:"Corporate",
                    date:new Date(),
                    facilityId:user.currentEmployee.facilityDetail._id, //hmo insuing invoice
                    facility:user.currentEmployee.facilityDetail,
                    invoice_number:"",
                    total_amount:0,
                  
                    payment_option:"Cash",
                    subscription_category:"Annual",
                  
                    status:"Unpaid", //unpaid, fullypaid
                }
                await InvoiceServ
                .create(invoice)
                .then((res) => {
                  console.log("res", res);
                
                 console.log("Invoice created succesfully #"+n);
                  
                  
                })
                .catch((err) => {
                  console.log("Error cereating invoice " + err);
                });
      
            })
            .catch((err)=>{
              console.log("facility not created :" + err)
            })
        
          console.log (`0:${zero.length},1:${one.length}, 2:${two.length}, 3:${others.length}`)
        
          zero.push(avail)
          console.log(avail)
          return
        break;
        case 1:
          one.push(avail)
        break;
        case 2:
          two.push(avail)
          avail.data.forEach( async el=>{
            if (el.facilityEmail===""){
              await  facilityServ.remove(el._id)
              .then(async(resp)=>{
                //create relationship
               
                console.log("facility deleted #"+m,el)
               
            
              })
              .catch((err)=>{
                console.log("facility could not be deleted :" + err)
              })

            }

          })
        break
       default:
          others.push(avail)
        break;
       }

     /*   if (avail.total>1){
        n=n+1
        let holder={}

     
  
       await  facilityServ.remove(facilityDocument)
        .then(async(resp)=>{
          //create relationship
          holder=resp
          console.log("facility created #"+n ,resp)
         
      
        })
        .catch((err)=>{
          console.log("facility not created :" + err)
        })
      } */
      }
      let everyone=[]
      everyone.push(two)
      everyone.push(others)
      console.log (`0:${zero.length},1:${one.length}, 2:${two.length}, 3:${others.length}`)
      console.log("multiples:",everyone)

    }

    const handleFileUpload2 =  async(event) => {
         const hosp=data.slice(start,end)

      //read the json file
      for (const provider of hosp){
       let org= await orgServ.find({
        query:{
          'organization.facilityName': provider.provider
        }
       })
      let policies = await orgServ.find({
      query:{  'providers.facilityName':provider.policy

      }})

  /*   for (const provider of policies){

      
    } */
    const params = {
      query: { 'providers.facilityName':provider.policy }
    };
     let repo=[]
    repo.push(org)

    policyServ.patch(null,{providers:repo }, params )
      }
      // search policy for name of provider
      //update name in policy
      //update id in policy

  
    //  const uniquePolicy = [...new Set(hosp.map(obj => obj.Beneficiaries))];
 
              
      }

      //read file
      //read page
      // get words
      // check words
      //create object for -client + policy

      
    
    
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const extractTextFromPDF = async () => {
    try {
      if (!file) {
        console.error('No file uploaded.');
        return;
      }

      const pdfData = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
      const numPages = pdf.numPages;
      //let extractedText = '';
     let extractedText = [];
    
     let policyarray=[]
     let currentbenef={}
     let provider={}
     let npol=0
     //console.log(start,end)
    /*  let pageText={}
     pageText.items=[] */
     const providerMatches = [];
     
     const contentArray = [];
     // for (let pageNumber = +start ; pageNumber <= +end; pageNumber++) {

    // let pages=[8877]

    // for (let pageNumber = +start ; pageNumber <= +end; pageNumber++) {
      for (let q = 3 ; q <=numPages ; q++) {  //pages.length-1
      // let pageNumber=q //pages[q]
      //  let pageExtractedText=[]
       
        const page = await pdf.getPage(q);
        
         const pageText = await page.getTextContent();

         let data ={
          page:q,
          content:pageText
         }

         contentArray.push(data)
        /*  console.log("starting new page")
         console.log(pageNumber,pageText)
         const currentHosp={}; */
        //pageText.items= [...pageText.items, ...apageText.items]

       // console.log ("allpages",pageText.items)
      
        //loop through 
       
      
     // console.log("end of page", q)
    // console.log("something",contentArray)
     
      //provRef.current={}
   
    }
   // console.log("end of document",pdfContent)
   //  setPdfContent(contentArray)

    // hlistRef.current=contentArray
    extractFacilities(contentArray)
    
   // toast.success("Content Upload complete")
   //console.log("something",contentArray)
   //extractdrugs(contentArray) //--upload nhis drugs//

    } catch (error) {
      console.error('Error extracting text:', error);
    }

   
  };
const updateNHisTariff =()=>{
  let tariffList =[]
  for (let p = 0 ; p <=dataH.length-1 ; p++){  //dataH.length-1
    let service=dataH[p]

    let  tarrifobj={
      source_org: user.currentEmployee.facilityDetail._id, //writer -NHIS,HMO (NHIS is a plan though)
      source_org_name:user.currentEmployee.facilityDetail.facilityName,
      
      serviceName:service.investigations,
      serviceId:service["NHIS CODE"],
      
      price:+service.PRICE,
      comments:"NHIA Service",
      plans:[{
        planName:"NHIS",
        //planId:{ type: Schema.Types.ObjectId },
       // benefit:{type: String},
        //benefitId:{ type: Schema.Types.ObjectId },
        //benefitcategory:{type: String},
       // status:{ type: String },
        feeForService:true,
        capitation:false,
        coPay:true,
        copayDetail:service["% co pay"].toString(), //%
        reqPA:true, 
        covered:true,
       // comments:{ type: String },
       // band:{ type: String },
       // bandId:{ type: Schema.Types.ObjectId },
       }],

     }
  tariffList.push(tarrifobj) 
    }
  
  console.log(tariffList.length)

  for (let q = 0 ; q <=dataD.length-1 ; q++){  //
    let service=dataD[q]

    let  tarrifobj={
      source_org: user.currentEmployee.facilityDetail._id, //writer -NHIS,HMO (NHIS is a plan though)
      source_org_name:user.currentEmployee.facilityDetail.facilityName,
      
      serviceName: `${service["NAME OF MEDICINES"]}, ${service.STRENGTHS},  ${service["DOSAGE FORM"]}, ${service.PRESENTATION} `, //service.investigations,
      serviceId:service["NHIS CODE"],
      
      price:+service.PRICE,
      comments:"NHIA Drug",
      plans:[{
        planName:"NHIS",
        //planId:{ type: Schema.Types.ObjectId },
       // benefit:{type: String},
        //benefitId:{ type: Schema.Types.ObjectId },
        //benefitcategory:{type: String},
       // status:{ type: String },
        feeForService:true,
        capitation:false,
        coPay:true,
        copayDetail:service["% co pay"]?service["% co pay"].toString():"0", //%
        reqPA:true, 
        covered:true,
       // comments:{ type: String },
       // band:{ type: String },
       // bandId:{ type: Schema.Types.ObjectId },
       }],

     }
     
     tariffList.push(tarrifobj)
}
console.log("tarrif",tariffList.length)
console.log(tariffList)
TariffServ.find({
  query: {
    organizationId: user.currentEmployee.facilityDetail._id,
    band:"NHIS",
   
    $sort: {
      createdAt: -1,
    },
  },
}).then(res => {
  let findtariff=res.data[0]
  let tariff=findtariff
 console.log("data fetched");
/*  console.log("NHIS",findtariff.data)

 let oldcontract=tariff.contracts
 let newcontract=tariffList
 let contract=[...oldcontract,...newcontract] */
 //console.log("combinedcontract",contract)
 console.log("2",tariffList)
  TariffServ.patch(tariff._id, {contracts:tariffList}).then(res => {
  
   console.log("done updating tariff")
 
 })
 .catch(err => {
   
   console.log("Error updating tariff, probable network issues or " + err);
 }); 
 
 
})
.catch(err => {
  
  toast.error("Error updating Client, probable network issues or " + err);
});

}

const extractdrugs=async(content)=>{
  let serviceList=[]
  let tariffList =[]
  for (let p = 0 ; p <=content.length-1 ; p++) { //content.length-1
    let pagecontent = content[p]
    let items=pagecontent.content.items
    let item={}


    let lastcode=""
    for (let i = 0 ; i <= items.length-1; i++) {
      item=items[i]
      if (i+7<items.length-1){
        lastcode=items[i+6].str
        //console.log(lastcode)
      }

    //  let lastcode=items[i+7].str
      //new row
      if (item.str==="NHIS" && lastcode!=='00'){
        //console.log("new line: "+item.str, items[i+1].str)

        items[i+7].str
        let nhiscode=items[i].str+items[i+1].str+items[i+2].str+items[i+3].str+items[i+4].str+items[i+5].str+items[i+6].str
       // console.log("new line: "+nhiscode)
        if (items[i+2].str=='36' && items[i+6].str==='2' ){
          nhiscode=nhiscode+items[i+7].str
          //console.log(nhiscode+items[i+7].str)
        }
        let service={}
        service.code=nhiscode
        if (i+11<items.length-1){
        service.name=items[i+8].str +items[i+9].str+items[i+10].str+items[i+11].str+items[i+12].str
       // console.log("service name:",service.name)
        
        /* for (let t = 0 ; t <= 20; t++) {
          console.log(t+i+11)
          let z=t+i+11
          if (z<items.length-1){
          console.log("inner "+z,items[z].str )
          
           if (items[t+i].str==="NHIS"){
            service.cost= items[t-2].str
            console.log("amount",service.cost)
            break
          } 
        }
        } */

        for (let q = i+1 ; q <= items.length-1; q++) {
         let nextI=items[q].str
          if(nextI==="NHIS"){
            service.cost= items[q-2].str
          //  console.log("amount",service.cost)
          let result = startsWithLetter(service.cost)
          if (!result  && (service.cost.length<9 &&( service.cost!=='0.15g'||service.cost!=='18.2.2 VACCINES FOR SPECIFIC IMMUNIZATION'||service.cost!=='13% for dilution'))){
            service.cost = convertToPlainNumber(service.cost)
            //console.log(service.cost,result)
            if (isNaN(service.cost)){
            //  console.log(service.cost,result)
              service.cost=0
           //   console.log(service)
            }
           
//service.cost=+service.cost
            serviceList.push(service)
          let  tarrifobj={
              source_org: user.currentEmployee.facilityDetail._id, //writer -NHIS,HMO (NHIS is a plan though)
              source_org_name:user.currentEmployee.facilityDetail.facilityName,
              
              serviceName:service.name,
              serviceId:service.code,
              
              price:service.cost,
              comments:"NHIA drugs",
              plans:[{
                planName:"NHIS",
                //planId:{ type: Schema.Types.ObjectId },
               // benefit:{type: String},
                //benefitId:{ type: Schema.Types.ObjectId },
                //benefitcategory:{type: String},
               // status:{ type: String },
                feeForService:true,
                capitation:false,
                coPay:true,
                copayDetail:'10%', //%
                reqPA:true, 
                covered:true,
               // comments:{ type: String },
               // band:{ type: String },
               // bandId:{ type: Schema.Types.ObjectId },
               }],
     
          }
          tariffList.push(tarrifobj)
           /*  let g=p+1
            console.log(q-i,"page "+g )
            console.log(items.length,i)
            console.log("end:",items.length-i) */
            break
          }
          if (q==items.length-1){
            //console.log("end of file, page:" +p, q)

          }

        }


        }
      }


  }



}
  }
console.log(serviceList)
console.log(tariffList)

TariffServ.find({
  query: {
    organizationId: user.currentEmployee.facilityDetail._id,
    band:"NHIS",
   
    $sort: {
      createdAt: -1,
    },
  },
}).then(res => {
  let findtariff=res.data[0]
 console.log("data fetched");
 console.log("NHIS",findtariff.data)
 let tariff=findtariff
 let oldcontract=tariff.contracts
 let newcontract=tariffList
 let contract=[...oldcontract,...newcontract]
 console.log("combinedcontract",contract)
 
  TariffServ.patch(tariff._id, {contracts:contract}).then(res => {
  
   console.log("done updating tariff")
 
 })
 .catch(err => {
   
   console.log("Error updating Client, probable network issues or " + err);
 });
 
 
})
.catch(err => {
  
  toast.error("Error updating Client, probable network issues or " + err);
});

}

function startsWithLetter(inputString) {
  return /^[A-Za-z]/.test(inputString);
}

function convertToPlainNumber(numberString) {
  return Number(numberString.replace(/,/g, ''));
}



  const extractFacilities =(pdfContentx)=>{
    //process upload of enrolee
   console.log("inside", pdfContentx)
    let facil=pdfContentx

    let hosplist=[]
    let patList=[]
    let gimlist=[]
    let providerInfo={}
    let sheet={}
    const pattern = /^[A-Z]{2,3}\/\d{4}\/[A-Z]$/; //facilitycode
    const pattern2= /^\d{4,8}$/; //policyNo

    //facil.forEach((sheet,p)=>{
      for (let p = 0 ; p <= facil.length-1; p++) {
     sheet=facil[p]
     // sheet.content.items.forEach((item,i)=>{
      let items=sheet.content.items
        let item={}
        for (let i = 0 ; i <= items.length-1; i++) {
          item=items[i]


       
         if ((pattern.test(item.str)) && (i===4)) { 
       /*  if (i==4){

        item.str="NW/0148/P" */

           providerInfo={
            code:item.str,
            name: `${sheet.content.items[i+2].str} ${sheet.content.items[i+3].str}-${item.str}`,
            address:`${sheet.content.items[i+4].str} ${sheet.content.items[i+5].str}`,
            pagenumber:sheet.page,
            index:i,
            patients:[]
          }
         // console.log("providerinfo"+i +" "+item.str, providerInfo)
          providerInfo.totalP= providerInfo.patients.length
          hosplist.push(providerInfo)
          setHList(providerInfo)
        // console.log("hosp: "+p, hosplist)
        }

        if (pattern2.test(item.str)) {
         // console.log("firstpass" +i, item.str)

          let currentPolicy={
            principal:{},
            dependents:[],
            number:item.str,
            family:`${sheet.content.items[i-1].str}`,
            page:sheet.page,
           // provider:providerInfo

          }
         // gimlist.push(currentPolicy)


         // console.log("policy@firstpass", currentPolicy)
          let  nchild=1
          let statement=""
          let shift=0
           let keyword=items[i+1].str 
           if(keyword==="GIFShip"){
              shift=0
           }else{
            shift=1
           }

           let gimfis={
            firstname:`${sheet.content.items[i+7+shift].str}`,
            lastname:`${sheet.content.items[i+3+shift].str}`,
            gender:`${sheet.content.items[i+5+shift].str}`,
            dob:`${sheet.content.items[i+6+shift].str}`,
            code:"GIFSHIP",
            gifship:true,
            policyNo:`${item.str}-0`

          }

          currentPolicy.principal=gimfis
          providerInfo.patients.push(currentPolicy)
          patList.push(currentPolicy)
          gimlist.push(currentPolicy)


         /*  for (let n = i+1; n < sheet.content.items.length-1; n++) {
            let stuff=sheet.content.items[n].str
            if(pattern2.test(stuff)){
              break
            }{
              statement= statement+" "+stuff+" "+"("+n+")"+" "
             
            }
            
          }
          console.log("statement: ",statement)
 */
  
//merge facilities



   // check(hosplist)  


  }
}
      }
      setPList(patList)
      plistRef.current=patList
      console.log("hosp list",hosplist)
      console.log("patient list",patList)
      console.log("Gim list",gimlist)
   //   check(hosplist) //uncomment for progress
    }

const check=async(hospList2)=>{

 let facilityinfo={}
  //hospList2.forEach(async(facilityinfo,i)=>{
    for (let i = 0 ; i <= hospList2.length-1; i++) {
 //check provider
      facilityinfo=hospList2[i]

    /*   if (facilityinfo.name.includes("COTTAGE HOSPITAL/COMPREHENSI")){
        console.log(facilityinfo)
      } */

  await createfacility(facilityinfo)

    
   /*  const facility = await orgServ.find({
      query:{
        code:facilityinfo.code,
        facility: user.currentEmployee.facilityDetail._id,
        relationshiptype: "managedcare"
      }
     }) 
     
  if (facility.total>0){
     let provider=facility.data[0].organizationDetail
     // console.log("Provider found in db", provider)
     hospList2[i].providerdetials=provider
     
    }else{
      console.log("creating new provider for :" +facilityinfo.code,facilityinfo.name)
      hospList2[i].providerdetials={}    
    } */
//const pattern = /^.(\\|.{2}\\)/;
 //check name
   /*  facilityinfo.patients.forEach((patient,p)=>{
      try{

  
      if(typeof patient.principal.firstname !== "string"||patient.principal.firstname==" "){
       // console.log("principal firstname is not a string ", patient.number)
        hospList2[i].patients[p].principal.firstname=patient.family
      }
      if(typeof patient.principal.lastname !== "string"||patient.principal.lastname==" "){
      ////  console.log("principal lastname is not a string ", patient.number)
        hospList2[i].patients[p].principal.lastname=patient.family
      }
      if (patient.principal.dob=="OYIO"){
        console.log(facilityinfo)
      }
      if( !patient.principal.dob||!(patient.principal.dob.includes('/')) ){
      ////  console.log("principal lastname is not a string ", patient.number)
        hospList2[i].patients[p].principal.dob="01/01/1960"
      }

     if (patient.dependents.lenght>0){
      patient.dependents.forEach((dept,d)=>{
        if(typeof dept.firstname !== "string"){
        //  console.log("dept firstname is not a string: "+ d, patient.number)
          hospList2[i].patients[p].dependents[d].firstname=patient.family
        }
        if(typeof dept.lastname !== "string"){
        //  console.log("dept lastname is not a string: " + d, patient.number)
          hospList2[i].patients[p].dependents[d].lastname=patient.family
        }
         if(!dept.dob|| !(dept.dob.includes('/')) ){
      ////  console.log("principal lastname is not a string ", patient.number)
        hospList2[i].patients[p].dependents[d].dob="01/01/1960"
      }
      if (dept.dob=="OYIO"){
        console.log(facilityinfo)
      }

      })
     }
    }catch (error) {
      console.error('Error extracting text:'+ error, patient);
    }



    }) */







  }

  console.log("checked" ,hospList2)
 // createpolicy(hospList2)  //uncomment for progress


 
}


  const analyse=async(pageText)=>{
    
    pageText.items.forEach(async(item,i) =>{
        
      //escape if str is irrelevant
      if (item.str==="Issued by NHIS"||item.str==="HEALTHCARE INTERNATIONAL LIMITED"||item.str===''||item.str===" "||item.str==="8/1/2023"
      ||item.str==="page"){
        //console.log("dummies")
        return
      }
      let x=i-2
      if (x>0){

       if (  pageText.items[x].str==="page"){
       // console.log("dummies")
        return
       }
      }
      //find hospital fro top of page
      
      const pattern = /^[A-Z]{2}\/\d{4}\/[A-Z]$/;
      if (pattern.test(item.str)) {
        let man=[]
     
        console.log("Provider Match found! " + item.str );
        if(i===4){
       
         // if(currentHosp.id!==item.str){
            //check that facility does not exist in db
            console.log("this is a different code")

            currentHosp.id=item.str
            currentHosp.name= `${pageText.items[i+2].str} ${pageText.items[i+3].str}`
            currentHosp.address= `${pageText.items[i+4].str} ${pageText.items[i+5].str}`

            const providerInfo={
              id:item.str,
              name: `${pageText.items[i+2].str} ${pageText.items[i+3].str}`,
              address:`${pageText.items[i+4].str} ${pageText.items[i+5].str}`,
              pagenumber:pageNumber,
              index:i
            }
         //   console.log("providerinfo", providerInfo)
           
            

               if (provRef.current && provRef.current.code){
                        if( provRef.current.code===providerInfo.id){
                          
                          console.log("Same provider already")
                      }else{
                         console.log("Provider was created different from current")
                      await  createfacility(providerInfo)
                       
                      }
                    }else {
                        await createfacility(providerInfo)
                        console.log("Provider was created")
                      }

            console.log(provRef.current)
            man.push(provRef.current)
            providerInfo.providers=man 
            providerMatches.push(providerInfo);
           
         //   console.log("providers list 2 ", providerMatches)
           
            /*  console.log("check " + item.str,)
             console.log("current",currentHosp)
             setCurrFacility(providerInfo) */
        }
            
          }else{

            
      //find policy number
      const pattern2= /^\d{7,8}$/
      if (pattern2.test(item.str)) {
        npol++
       // let provider=currentHosp
        console.log(npol+" Policy Number Match found! " + item.str);
        console.log("providers list ", providerMatches)
        //creating policy
       // console.log("position",i)
        let currentPolicy={
          
          principal:{},
          dependents:[]
        }
         
            currentPolicy.number=item.str
            currentPolicy.family=`${pageText.items[i-1].str}`
          //  currentPolicy.facility=currHosp
          //  console.log("currentpolicy1",currentPolicy)
            //add benefiiaries
           let  nchild=1
            for (let n = i+1; n < pageText.items.length-1; n++) {
              let stuff=pageText.items[n].str
             if (stuff.includes("CHILD")) {
               // console.log("child found")
                stuff="Child"
              }
              if (pattern2.test(stuff)){
                console.log("new family",n)
                let x=pageNumber-1
                currentPolicy.facility=providerMatches[x]
               policyarray.push(currentPolicy)
              createpolicy(currentPolicy)
                break
              }
              
              switch(stuff){
                case 'PRINCIPAL':
               //   console.log("principal",n)
                  let principal={
                    firstname:`${pageText.items[n+7].str}`,
                    lastname:`${pageText.items[n+2].str}`,
                    gender:`${pageText.items[n+5].str}`,
                    dob:`${pageText.items[n+6].str}`,
                    code:`${pageText.items[n+4].str}`,
                    policyNo:`${item.str}-0`

                  }
                  currentPolicy.principal=principal
                  if ((n+16)>=pageText.items.length-1){
                   // console.log("end of items  on page")
                   let x=pageNumber-1
                   currentPolicy.facility=providerMatches[x]
                    policyarray.push(currentPolicy)
                    createpolicy(currentPolicy)
                  //  console.log("z="+ (n+16))
                    // create policy
                  }
                  // code block
                  break
                case 'SPOUSE':
                 
                  let spouse={
                    firstname:`${pageText.items[n+7].str}`,
                    lastname:`${pageText.items[n+2].str}`,
                    gender:`${pageText.items[n+5].str}`,
                    dob:`${pageText.items[n+6].str}`,
                    code:`${pageText.items[n+4].str}`,
                    relationship:"Spouse",
                    policyNo:`${item.str}-1`

                  }
                 // console.log("spouse",n)
                  currentPolicy.dependents.push(spouse)
                  if ((n+16)>=pageText.items.length-1){
                  //  console.log("end of items  on page")
                    let x=pageNumber-1
                    currentPolicy.facility=providerMatches[x]
                    policyarray.push(currentPolicy)
                  createpolicy(currentPolicy)
                    //console.log("z="+ (n+16))
                  }
                  // code block
                  break;
                case 'Child':
                   // console.log("child",n)
                   nchild++
                    let child={
                      firstname:`${pageText.items[n+7].str}`,
                      lastname:`${pageText.items[n+2].str}`,
                      gender:`${pageText.items[n+5].str}`,
                      dob:`${pageText.items[n+6].str}`,
                      code:`${pageText.items[n+4].str}`,
                      relationship:"Child",
                      policyNo:`${item.str}-${nchild}`

                    }
                    
                    currentPolicy.dependents.push(child)
                    if ((n+16)>=pageText.items.length-1){
                     // console.log("end of items  on page")
                      let x=pageNumber-1
                      currentPolicy.facility=providerMatches[x]
                      policyarray.push(currentPolicy)
                      createpolicy(currentPolicy)
                     // console.log("z="+ (n+16))
                    }
                    // code block
                    break;
                case 'GIFSHIP':
                      console.log("GIFSHIP",n)
                      let gimfis={
                        firstname:`${pageText.items[n+6].str}`,
                        lastname:`${pageText.items[n+2].str}`,
                        gender:`${pageText.items[n+4].str}`,
                        dob:`${pageText.items[n+5].str}`,
                        code:"GIFSHIP",
                        gifship:true,
                        policyNo:`${item.str}-0`

                      }

                      currentPolicy.principal=gimfis
                      if ((n+16)>=pageText.items.length-1){
                       // console.log("end of items  on page")
                        let x=pageNumber-1
                        currentPolicy.facility=providerMatches[x]
                        policyarray.push(currentPolicy)
                       createpolicy(currentPolicy)
                       // console.log("z="+ (n+16))
                        // create policy
                      }
                      // code block
                      break
              }
          }
       //  console.log("policyarray", policyarray)
         // currentPolicy.providers.push(currentPolicy)
        // console.log("policy", currentPolicy)
      }
    }
    });

  }

  const findstuff =async()=>{
    const healthplan=await planServ.get('6425c3255694e80014037e74')
    console.log(healthplan)
    setPlan(healthplan)
    
    // find sponsor
    const nhissponsor = await facilityServ.get('64f955b57a5c490014d34987')
    console.log(nhissponsor)
    setSponsor(nhissponsor)
  }

  const createfacility=async(facilityinfo)=>{
  //console.log("facility info", facilityinfo)
    
    
             const facility = await orgServ.find({
                  query:{
                    code:facilityinfo.code,
                    facility: user.currentEmployee.facilityDetail._id,
                    relationshiptype: "managedcare"
                  }
                 }) 
                 
              if (facility.total>0){
                 let provider=facility.data[0].organizationDetail
                  console.log("Provider found in db", provider)
                  /* provider.code=facilityinfo.code
                  provRef.current=provider */
                }else{
                  console.log("creating new provider for :" +facilityinfo.code,facilityinfo.name)
                 
                const rd=Math.floor(Math.random() * (100 - 10 + 1)) + 10;
               
                //create new facility
               // set new facility as current provider
              let abc=facilityinfo.name.split(" ")
              let ab2=abc.join("")
              let facilitydata={
                            
                facilityCAC:"",
                
              
                facilityName:facilityinfo.name,
              
                facilityOwner: "",
              
                facilityType: "Hospital",
              
                facilityCategory:"NHIS",
              
                facilityCountry: "Nigeria",
              
                facilityState: "",
              
                facilityLGA: "",
              
                facilityCity:"", 
              
                facilityAddress:facilityinfo.address,
              
                facilityContactPhone:"08077777777",
              
                facilityEmail:`admin${rd}@${ab2}.nhis`,
                facilityModules: [
                  "Admin",
                  "Client",
                  "Clinic",
                  "Appointment",
                  "Check-In",
                  "Ward",
                  "Laboratory",
                  "Radiology",
                  "Pharmacy",
                  "Theatre",
                  "Blood Bank",
                  "Inventory",
                  "Communication",
                  "Immunization",
                  "Finance",
                  "Accounting",
                  "Complaints",
                  "Referral",
                  "Epidemiology",
                  "Engagement"
                ],
                  }
              let admindata ={
                firstname:"Admin",
                lastname:"Admin",
                phone: "08077777777",
                email: `admin${rd}@${ab2}.nhis`,

                profession: "Admin",
                position: "Admin",
              
                department: "Admin",
                deptunit: "Admin",
                password: "Admin",
              roles:['Admin', 'Complaint', 'Corporate', 'Communication']


              }

              const facilityDocument = {
              ...facilitydata,
              hasEmployee: true,
              employeeData:admindata
              }

              console.log(facilityDocument)

            
          await  facilityServ.create(facilityDocument)
          .then(async(resp)=>{
          //create relationship
          let holder=resp
          console.log("facility created #",resp)
          //provider=resp
          /* resp.code=facilityinfo.code
          provRef.current=resp */
          let obj = {
            facility: user.currentEmployee.facilityDetail._id,
            organization: resp._id,
            relationshiptype: "managedcare",
            status: "Approved",
            code:facilityinfo.code,
            band:"NHIA"
            
          };
          await orgServ
                    .create(obj)
                    .then((res) => {
                     /*  console.log("res", res);*/
                    console.log("Organization added succesfully");  
                    })
                    .catch((err) => {
                      console.log("Error adding organization " + err,obj);
                    });
                  })
                  .catch((err)=>{
                    console.log("facility rellationship not created :" + err,facilityDocument )
                  })
            }
         
          };


  const createsponsor= async()=>{

 
      let facilitydata={
            
        facilityCAC:"",
        
      
        facilityName:"National Health Insurance Agency",
      
        facilityOwner: "",
      
        facilityType: "Corporate",
      
        facilityCategory:"SME",
      
        facilityCountry: "Nigeria",
      
        facilityState: "Abuja",
      
        facilityLGA: "",
      
        facilityCity:"Abuja", 
      
        facilityAddress:" Plot 297, P.O.W. Mafemi Crescent, Off Solomon Lar Way, Utako District, Abuja.",
      
        facilityContactPhone:"08059282008",
      
        facilityEmail:"admin@nhia.gov.ng",
        facilityModules: ['Admin', 'Complaint', 'Corporate', 'Communication']
          }
      let admindata ={
        firstname:"Admin",
        lastname:"Admin",
        phone: "08083280131",
        email: "admin@nhia.gov.ng",

        profession: "Admin",
        position: "Admin",
      
        department: "Admin",
        deptunit: "Admin",
        password: "Admin",
      roles:['Admin', 'Complaint', 'Corporate', 'Communication']


      }

        const facilityDocument = {
          ...facilitydata,
          hasEmployee: true,
          employeeData:admindata
        }

   await  facilityServ.create(facilityDocument)
    .then(async(resp)=>{
      //create relationship
      let holder=resp
      console.log("facility created #",resp)
      let obj = {
        facility: user.currentEmployee.facilityDetail._id,
        organization: resp._id,
        relationshiptype: "sponsor",
        status: "Approved",
        code:"NHIA"
        
      };
  
     // console.log("query", query);
  //create organizatuonal relationship
      await orgServ
        .create(obj)
        .then((res) => {
          console.log("res", res);
         console.log("Organization added succesfully"); 
        })
        .catch((err) => {
          console.log("Error adding organization " + err, obj);
        });
      })
      .catch((err)=>{
        console.log("facility not created :" + err)
      })
    }


    const createpolicy=async(provList)=>{
    console.log("creating policy....")
          let policy={}
          let provider={}
          let newpol=0
          let newclient=0
        let  facilityinfo
      for (let i = 0; i <= provList.length-1; i++) {

        facilityinfo=provList[i]

        const facility = await orgServ.find({
          query:{
            code:facilityinfo.code,
            facility: user.currentEmployee.facilityDetail._id,
            relationshiptype: "managedcare"
          }
         }) 
         
      if (facility.total>0){
          provider=facility.data[0].organizationDetail
         // console.log("Provider found in db", provider)
          /* provider.code=facilityinfo.code
          provRef.current=provider */
        }else{
          console.log("facility not yet created ",facilityinfo)
          provider={}
        }
     
    for (let p = 0; p <= facilityinfo.patients.length-1; p++) {
      policy=facilityinfo.patients[p]
      //console.log("policy",policy)''

     
      policy.principal.type="Principal"
      policy.dependents.forEach(el=>{
        el.type="dependent"
      })

      let dependents=[]
      let principal1=policy.principal
      let genNo=""
      let faci={}
      let principal={}
    
      policy.beneficiaries=[
        principal1,
        ...policy.dependents
       
      ]
     
        for (const benfi of policy.beneficiaries){
          let dob
          faci=benfi
          if(!!faci.dob){
            dob=faci.dob.split(" ")
          }else{
            dob="01/01/1960"
          }
          
          const rd=Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        // console.log(dob)
            let client={
              firstname: faci.firstname, 
              middlename:"",
              lastname:faci.lastname,
              dob:faci.dob?dob[0]:"1/01/1960" ,
              gender:faci.gender==="M"?"Male":"Female",
              maritalstatus: "",
              religion: "",
              phone:"08000000000",
              email: `${faci.firstname}.${faci.lastname}${rd}@nhia-enrollee.ng`, //unique: true
              bloodgroup: "",
              genotype:"",
              clientTags:"nhia beneficiary",
              facility:user.currentEmployee.facilityDetail._id ,
              address:"",
            }
      
             await  ClientServ.create(client)
             .then(async(resp)=>{
              newclient++
              clientCountRef.current=newclient
              resp.policyNo=benfi.policyNo
              if (benfi.type== "Principal"){
                resp.type="Principal"
                principal=resp
               
                genNo=policy.number
              }else{
                resp.type="Dependent"
                
                dependents.push(resp)
              }
             
             // create policy 
             
             //  console.log("policy created")

             })
             .catch((err) => {
               console.log("Error creating client " + err);
             });

        
          }
          let provi=[] 
         /*  let provider={  //consider creating facilities
            facilityName:faci.providers[0].name,
              code:faci.providers[0].id, 
          } */
          

              provi.push( provider) 
 //create policy
                  let policydata = {
                    policyNo: policy.number,
                    organizationType:user.currentEmployee.facilityDetail.facilityType,
                      
                    organizationId:user.currentEmployee.facilityDetail._id,
                    
                    organizationName:user.currentEmployee.facilityDetail.facilityName,
                    
                    organization:user.currentEmployee.facilityDetail,
                    
                    principal: principal,
                    dependantBeneficiaries: dependents,
                    providers:provi , //
                    sponsorshipType:"Company",
                    sponsor:sponsor, /* {facilityName:faci.CustomerName, //nhis
                               code:faci.CustomerID   }, */
                    plan: plan,/* {
                      planName:"NHIS",
                      planId:faci.PlanID
                    }, */
                    planType: policy.dependents.length>0?"Family":"Individual",

                  //  validityPeriods:[ { type: String,  }],
                  validitystarts:"01/01/2023",
                  validityEnds:"01/01/2030",
                  Date_JoinScheme:new Date(),
                    active: true,
                    isPaid: true,
                    approved:true,
                    statushx: [
                      {
                        date: new Date(),
                        employeename: `${user.currentEmployee.firstname} ${user.currentEmployee.lastname}`,
                        employeeId: user.currentEmployee._id,
                        status: "Policy Created",
                      }
                  ]
                  }
                 
                   
             
            
                  await policyServ
                    .create(policydata)
                    .then((res) => {
                      newpol++
                      policyCountRef.current=newpol
                      console.log("policy created succesfully",newpol);//res
                    //console.log("policy #"+n,policy)
                    })
                    .catch((err) => {
                      console.log("Error creating policy " + err,policydata );
                    });

                  
    }
  }
  console.log("finished  creating policies")
}
 const addNHIS =async()=>{

//find all nhis hospitals
let p=3
let skip=40000
let limit =100

/* const find=await accServ.find(
  {
    query:{
      orgId:user.currentEmployee.facilityDetail._id,
      limit:10000,
      skip:skip
    }
  }
) */
// patch nhisband with the data
//console.log("stuff", find)
console.log("count",skip)

  //await policyServ.
  await ClientServ.find({
  query:{
    
   /*  organizationId:user.currentEmployee.facilityDetail._id,
    $limit:limit,
    $skip:skip */
    paymentinfo:   {
      $size: 1 // Change 1 to the desired minimum array size
    }
,
    clientTags:"nhia beneficiary"
  },
  //paginate:false
}).then(async resp=>{
  console.log("success",resp.total)
  console.log(resp.data)

  await setText(resp.data)
  findPolicies(resp.data)
 /*  findPolicy(resp.data) */
})
.catch(err=>console.log(err))


 }

 const findPolicies= async (booked)=>{
  let people=[]
  for (let p = 0; p <= booked.length-1; p++) {
    let person=booked[p]
    await policyServ.find({
      query:{
        $or:[
          {
            "dependantBeneficiaries._id":person._id
          },
          {
            "principal._id":person._id
          }
        ]
      }
    }).then((resp)=>{
        people=[...people, ...resp.data]
        console.log("people",people)

    })
    .catch(err=>console.log(err))
  }
findPolicy(people)
 }

 const findPolicy =async(all)=>{
  const allpolicy=all
  for (let p= 0; p<= all.length-1; p++) { //
    // let client = allpolicy[p]
     let result= allpolicy[p]
     let principalstate=true
     //console.log(p)
     //principal
    // console.log(result)
     try{

    
     if (!!result.principal){

    
     let principalx=result.principal._id

    // console.log(principalx)
     let pclient= await ClientServ.get(principalx)
     
    /*  .then(async(resp)=>{
       pclient=resp */
       // console.log("final",resp)
       //context.result=resp

       let payinfo=pclient.paymentinfo
       if (payinfo.length==1){
         let clientpolicy= {
           paymentmode:"HMO",
           organizationId:result.organizationId,
           organizationName:result.organizationName,
           principalId:result.policyNo,
           clientId:result.policyNo,
           principalName:`${result.principal.firstname} ${result.principal.lastname}`, //confirm --result.principal.name?result.principal.name:
           plan:result.plan.planName, //confirm --result.plan.name?result.plan.name: 
           active:true,
           principal:result.principal._id,
           organizationType: result.organizationType,
           agent:result.agent,
           agentName:result.agentName,
           policy:result
         }
         // add hmo policy
      payinfo.push(clientpolicy)
        await ClientServ.patch(principalx, {paymentinfo:payinfo})
        
       /*  .then((resp)=>{
          //console.log("final",resp)
         //context.result=resp
        })
        .catch((err)=>{
          console.log(err)
        })
        */
       }
     /*  })
      .catch((err)=>{
        console.log("principal" + err,principalx)
      }) */
     }else{
       console.log("no principal",result)
       principalstate=false
     }
     
//dependents
     if (result.dependantBeneficiaries.length >0){
       for (let i = 0; i <= result.dependantBeneficiaries.length-1; i++) {
      // for (let element of result.dependantBeneficiaries) {
           let element = result.dependantBeneficiaries[i]
         let dept=element._id
     let dclient= await ClientServ.get(dept)
     //.then(async(dresp)=>{
       // console.log("final",resp)
       //context.result=resp
      // dclient=dresp
       let dpayinfo=dclient.paymentinfo
       if (dpayinfo.length==1){
            
         let clientpolicy1= {
           paymentmode:"HMO",
           organizationId:result.organizationId,
           organizationName:result.organizationName,
           principalId:result.policyNo,
           clientId:element.policyNo?element.policyNo:result.policyNo,
           principalName:principalstate?`${result.principal.firstname} ${result.principal.lastname}`:"", //confirm
           plan:result.plan.planName, //confirm
           active:true,
           principal:principalstate?result.principal._id:"",
           organizationType: result.organizationType,
           agent:result.agent,
           agentName:result.agentName,
           policy:result
         }
 
         //let patient1 = await clientServ.get(element._id)
         let paymentinfo1=dpayinfo
         paymentinfo1.push(clientpolicy1)
         await ClientServ.patch(element._id, {paymentinfo:paymentinfo1})
        /*  ).then((resp)=>{
          // console.log("final",resp)
          //context.result=resp
         })
         .catch((err)=>{
           console.log(err) //throw error
         }) */
 
       }

     /*  })
      .catch((err)=>{
        console.log("dependent"+err,dept )
      })
      
   }} */
    }
   }
 }
 catch(error){
   console.log(error)
   console.log(p,result)
 }
 //let step=p+skip
 console.log("done")
}
 }


 const handleCreatePolicy = async item => {
  console.log("state",item)
   const newI= deepCopy(item)
  if (newI.paymentinfo.length==1){
    console.log("add policy")
    let result=newI.policy
    delete newI.policy
    let clientpolicy= {
      paymentmode:"HMO",
      organizationId:result.organizationId,
      organizationName:result.organizationName,
      principalId:result.policyNo,
      clientId:result.policyNo,
      principalName:`${result.principal.firstname} ${result.principal.lastname}`, //confirm
      plan:result.plan.planName, //confirm
      active:true,
      principal:result.principal._id,
      organizationType: result.organizationType,
      agent:result.agent,
      agentName:result.agentName,
      policy:result
    }
    newI.paymentinfo.push(clientpolicy)
    console.log("updated item", newI)
    await ClientServ.patch(item._id, {paymentinfo:newI.paymentinfo})
    .then((resp)=>{
      console.log("update successful "+ resp)
    })
    .catch((err)=>{
      toast.error("Update not successful "+ err)
    })
  } 
}


  return (
    <>
      <Box sx={{ gap:2}}>
      {/* <input type="number"  value={start} name="begin" onChange={(e)=> setStart(e.target.value) } />
      <input type="number" value={end} name="end" onChange={(e)=> setEnd(e.target.value) } /> */}
      <GlobalCustomButton onClick={updateNHisTariff}>
         Update NHIA Tariff
          <SendIcon fontSize="small" sx={{marginLeft: "4px"}} />
        </GlobalCustomButton>  
      </Box> 
 <div className="text-extraction">
      <h2>PDF Text Extraction</h2>
          {/*  <input type="file" accept=".pdf" onChange={handleFileUpload} />
      <button onClick={extractTextFromPDF}>Extract Text</button> */}
      <div className="extracted-text">
        <h3>Extracted Text:</h3>
        <Box sx={{
          height:"50%",
          width:"80%",
          overflow:"auto"
        }}>
          <div>
           {/*  {text} */}
           <ul>
           {/*  {text.map((page, pageIndex) => (
              <li key={pageIndex}>
                <h4>Page {pageIndex + 1}:</h4>
                <ul>
                  {page.extract.map((row, rowIndex) => (
                    <li key={rowIndex}>{row}</li>
                  ))}
                </ul>
              </li>
            ))} */}
          </ul>
          </div>
          </Box>
      </div>
    </div>
    
       {pdfContent.length>0 ? (
        <>
          {/* <ModalBox open={open} onClose={handleCloseModal}>
            <BandView
              band={selectedBand}
              open={open}
              setOpen={handleCloseModal}
            />
          </ModalBox> */}
          <PageWrapper
            style={{ flexDirection: "column", padding: "0.6rem 1rem" }}
          >
            {/* <TableMenu>
              <div style={{ display: "flex", alignItems: "center" }}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                  List of Bands
                </h2>
              </div>

              {handleCreateNew && (
                <GlobalCustomButton onClick={showCreateModal}>
                  <ControlPointIcon
                    fontSize="small"
                    sx={{ marginRight: "5px" }}
                  />
                  Add New
                </GlobalCustomButton>
              )}
            </TableMenu> */}

            <div
              style={{
                width: "100%",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <div></div>
              <Box
                sx={{
                  width: "100%",
                  height: "calc(100vh - 180px)",
                  overflowY: "auto",
                }}
              >
                {/* <div>
                  <h2>Policy Count</h2>: {policyCountRef.current}
                </div>

                <div>
                  <h2>Client Count</h2>: {clientCountRef.current}
                </div> */}
                {/* <CustomTable
                  title={""}
                  columns={BandSchema}
                  data={facilities}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRowClicked}
                  progressPending={loading}
                /> */}
                {/*
                  pdfContent.map((pageContent, index)=>(
                    <div key={index}>
                      <p>Page {index + 1} Content:</p>
                      <p> {pageContent.page}</p>
                      <pre>{pageContent.content?.items?.str}</pre>
                    </div>
                  ))
                  */}

              </Box>
            </div>
          </PageWrapper>
        </>
      ) : (
        <div>loading content</div>
      )} 
    </>
  );
}


export function BandDetail({ showModifyModal }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const BandServ=client.service('/Band')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const { state, setState } = useContext(ObjectContext);

  const Band = state.BandModule.selectedBand;

  const handleEdit = async () => {
    const newBandModule = {
      selectedBand: Band,
      show: "modify",
    };
    await setState((prevstate) => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
    showModifyModal();
  };

  return (
    <GrayWrapper>
      <HeadWrapper>
        <div>
          <h2>Band Detail</h2>
          <span>Band detail of {Band.name}</span>
        </div>
        <BottomWrapper>
          <GlobalCustomButton
            text="Delete Band"
            background="#FFE9E9"
            color="#ED0423"
          />

          <GlobalCustomButton
            text={`Edit Client`}
            showicon
            icon="bi bi-pen-fill"
            onClick={handleEdit}
          />
        </BottomWrapper>
      </HeadWrapper>

      <GridWrapper className="two-columns">
        <ViewText label="Name" text={Band.name} />
        <ViewText label="Band Type" text={Band.bandType} />
      </GridWrapper>

      {error && <div className="message"> {message}</div>}
    </GrayWrapper>
  );
}

export function BandModify() {
  const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const BandServ = client.service("bands");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const Band = state.BandModule.selectedBand;

  useEffect(() => {
    setValue("name", Band.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("bandType", Band.bandType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*  setValue("profession", Band.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Band.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Band.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Band.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Band.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("BandCategory", Band.BandCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  }, []);

  const handleCancel = async () => {
    const newBandModule = {
      selectedBand: {},
      show: "list",
    };
    await setState((prevstate) => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    setState((prevstate) => ({ ...prevstate, BandModule: newBandModule }));
  };
  const handleDelete = async () => {
    //let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Band._id;
    //if (conf) {
    BandServ.remove(dleteId)
      .then((res) => {
        //console.log(JSON.stringify(res))
        reset();
        /*  setMessage("Deleted Band successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
        toast.success("Band deleted succesfully");
        changeState();
      })
      .catch((err) => {
        // setMessage("Error deleting Band, probable network issues "+ err )
        // setError(true)
        toast.error("Error deleting Band, probable network issues or " + err);
      });
    //}
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    console.log(data);
    data.facility = Band.facility;
    //console.log(data);

    BandServ.patch(Band._id, data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Band successfully")
        toast.success("Band updated succesfully");

        changeState();
      })
      .catch((err) => {
        //setMessage("Error creating Band, probable network issues "+ err )
        // setError(true)
        toast("Error updating Band, probable network issues or " + err);
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Band Details-Modify</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name", { required: true })}
              name="name"
              type="text"
              placeholder="Name"
            />
            <Input
              {...register("bandtype", { required: true })}
              name="bandtype"
              type="text"
              placeholder="Band Type"
            />
            <div style={{ display: "flex" }}>
              <GlobalCustomButton
                type="submit"
                onClick={handleSubmit(onSubmit)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Save
              </GlobalCustomButton>

              <GlobalCustomButton
                type="submit"
                onClick={handleCancel}
                style={{
                  backgroundColor: "#ffdd57",
                  width: "100px",
                  position: "relative",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Cancel
              </GlobalCustomButton>

              <GlobalCustomButton
                type="submit"
                onClick={() => setConfirmDialog(true)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Delete
              </GlobalCustomButton>
            </div>
          </form>

          <CustomConfirmationDialog
            open={confirmDialog}
            cancelAction={() => setConfirmDialog(false)}
            confirmationAction={handleDelete}
            type="danger"
            message="Are you sure you want to delete this data?"
          />
        </div>
      </div>
    </>
  );
}

export function InputSearch({ getSearchfacility, clear }) {
  const facilityServ = client.service("facility");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };
  const handleBlur = async (e) => {
    if (count === 2) {
      console.log("stuff was chosen");
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
  };
  const handleSearch = async (val) => {
    const field = "facilityName"; //field variable

    if (val.length >= 3) {
      facilityServ
        .find({
          query: {
            //service
            [field]: {
              $regex: val,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Facilities"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
