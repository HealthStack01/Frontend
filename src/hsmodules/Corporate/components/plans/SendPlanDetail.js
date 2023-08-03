import {useState, useEffect, useContext} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import EmployeeList,{ListEmployee} from "./EmployeeList"


const SendPlanDetail = ({updatePlan, closeModal}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, handleSubmit, control, getValues, reset} = useForm();
  const [edit, setEdit] = useState(false);
  const [config, setConfig] = useState([]);
  const plan = state.InvoiceModule.selectedPlan;
  const emailServer = client.service("email");
  const facilityConfigServer = client.service("facility-config");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [planId, setPlanId] = useState("");
  const [emailBody, setEmailBody] = useState("");

  console.log(plan)

  const selectedemployee =(data)=>{
    setEmailBody(`<p>Please follow this <a style="color:red;" href=${`https://citizen-healthstack.netlify.app/corporate-beneficiary-signup/${invoiceId}/${planId}`}>LINK</a> 
    to complete your registration as a beneficiary.Use your email to login, no passowrd required. You will setyur passowrd after you log in for the first time. <br>
    Management </p>`)
    setSelectedEmployees(data)
  }


  const getConfig = async () => {
    
      const findConfig = await facilityConfigServer.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setConfig(findConfig.data);

      
     
    }
  const handleUpdatePlan = async data => {
    showActionLoader();
    const employee = user.currentEmployee;
    const invoiceDetail = state.InvoiceModule.selectedInvoice;
    const prevPlans = invoiceDetail.plans;
    const currentDeal = state.DealModule.selectedDeal;
    const selectedPlan = state.InvoiceModule.selectedPlan;

    const newPlans = prevPlans.map(item => {
      if (item._id === selectedPlan._id) {
        return {
          ...item,
          ...data,
          updatedAt: new Date(),
          updatedBy: employee.userId,
          updatedByName: `${employee.firstname} ${employee.lastname}`,
        };
      } else {
        return item;
      }
    });

    const totalPlansSum = newPlans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

    const newInvoiceDetail = {
      ...invoiceDetail,
      total_amount: totalPlansSum,
      plans: newPlans,
    };

    const prevInvoices = currentDeal.invoices;

    //console.log(prevInvoices);

    const newInvoices = prevInvoices.map(item => {
      if (item._id === newInvoiceDetail._id) {
        return newInvoiceDetail;
      } else {
        return item;
      }
    });

    //return console.log(newInvoices);

    const documentId = currentDeal._id;

    await dealServer
      .patch(documentId, {invoices: newInvoices})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));

        setState(prev => ({
          ...prev,
          InvoiceModule: {
            ...prev.InvoiceModule,
            selectedInvoice: newInvoiceDetail,
          },
        }));
        closeModal();
        toast.success(`You have successfully Updated Plan`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Update the Plan. ${err}`);
      });
  };

  useEffect(() => {
    getConfig()
    const plan = state.InvoiceModule.selectedPlan;
    const invoice=state.InvoiceModule.selectedInvoice
    setPlanId(plan._id)
    setInvoiceId(invoice._id)
   
    reset(plan);
  }, []);


const  handlesendlink =async ()=>{
  console.log("invoiceid", invoiceId)
  console.log("planid", planId)
  if(config.length>1){
    setSelectedEmail(config[0])
  }else{
    toast.error("Email Configuration not set")
    return
  }

  if(invoiceId==""){
    toast.error("Reference invoice missing, kindly select invoice again")
    return
  }
 
  showActionLoader();
  selectedEmployees.forEach( async el=>{

  
  let document={}

  let data ={
    to: el.email, //destinationEmail,
    name: user.currentEmployee.facilityDetail.facilityName,
    subject: "Create your account",
    from: selectedEmail,
  }
 
  const facility = user.currentEmployee.facilityDetail;
 

 document = {
    organizationId: facility._id,
    organizationName: facility.facilityName,
    html: emailBody,
    text: "",
    status: "pending",
    ...data,
  };


  await emailServer
    .create(document)
    .then(res => {
      Object.keys(data).forEach(key => {
        data[key] = "";
      });

      reset(data);
      hideActionLoader();
      closeModal();
      toast.success(`Email was sent successfully`);
    })
    .catch(err => {
      
      console.log(err);
      toast.error(`Sorry, Failed to send Email ${err}`);
    });
    hideActionLoader();
  })
  }

  return (
    <>
      <Box
       
      >
        {selectedEmployees.length>0  &&  <Input
             value={emailBody}
              label="email"
              type="text"
              disabled
            />}
        <Box
          mb={1.5}
          sx={{display: "flex", justifyContent: "flex-end", width:"100%"}}
          gap={1}
        >
          {selectedEmployees.length>0 && <GlobalCustomButton disabled={!selectedEmployees.length>0}
            onClick={() => {
              navigator.clipboard.writeText(emailBody);
              toast.success("Email Copied to your Clipboard");
            }}
          >
            Copy Email Body
          </GlobalCustomButton>}
          
            <GlobalCustomButton onClick={handlesendlink} disabled={!selectedEmployees.length>0}>
              <EditIcon fontSize="small" sx={{marginRight: "5px"}} />
             Send link
            </GlobalCustomButton>
       
        </Box>

        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Input
              register={register("name", {required: true})}
              label="Plan"
              type="text"
              disabled
            />
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={6}>
            <CustomSelect
              label="Plan Type"
              options={["Family", "Individual"]}
              disabled
              control={control}
              name="type"
            />
          </Grid>

       {/*    <Grid item lg={6} md={6} sm={6} xs={12}>
            <Input
              register={register("premium", {required: true})}
              label="Premium"
              type="number"
              disabled={!edit}
            />
          </Grid> */}

          <Grid item lg={3} md={3} sm={3} xs={6}>
            <Input
              register={register("heads", {required: true})}
              label="No of Heads"
              type="number"
              disabled
              //placeholder="Enter customer number"
            />
          </Grid>

      {/*     <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomSelect
              label="Duration Calendrical"
              options={["Week(s)", "Month(s)", "Year(s)"]}
              disabled={!edit}
              control={control}
              name="calendrical"
            />
          </Grid> */}

       {/*    <Grid item lg={6} md={6} sm={6} xs={12}>
            <Input
              register={register("length", {required: true})}
              label="Duration Legnth"
              type="number"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid> */}

         {/*  <Grid item lg={6} md={6} sm={6} xs={12}>
            <Input
              register={register("amount", {required: true})}
              label="Amount"
              type="NUMBER"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid> */}
        </Grid>
        <ListEmployee  selectedemployee={selectedemployee} limit={plan?.heads}/>
      </Box>
    </>
  );
};

export default SendPlanDetail;
