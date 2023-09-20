import {useState, useEffect, useContext} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomTable from "../../../../components/customtable";
import moment from "moment";
import {CustomerView} from "../lead/LeadDetailView";
import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {formatDistanceToNowStrict} from "date-fns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {PageCreatePlan} from "../plans/CreatePlan";
import Plans from "../../Plans";
import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {generateRandomString} from "../../../helpers/generateString";
const random = generateRandomString;

const InvoiceCreate = ({closeModal, handleGoBack, policies}) => {
  const InvoiceServer = client.service("corpinvoices");
  const notificationsServer = client.service("notification");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [duration, setDuration] = useState("");

  const {register, control, setValue, reset, handleSubmit} = useForm();

  const selectedCorp = state.ManagedCareCorporate.selectedCorporate.organizationDetail;
  console.log(selectedCorp)


  const handleAddNewPlan = plan => {
    setPlans(prev => [plan, ...prev]);
  };

  const handleRemovePlan = plan => {
    setPlans(prev => prev.filter(item => item._id !== plan._id));
  };

  const createInvoice = async data => {
  //  showActionLoader();
   // const currentDeal = state.DealModule.selectedDeal;
    const employee = user.currentEmployee;
    console.log(data)

    const document = {
      ...data,
      plans,
     // createdAt: new Date(),
     // dealId: currentDeal._id,
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      customerName: selectedCorp.facilityName,
      customerEmail: selectedCorp.facilityEmail,
      customerPhone: selectedCorp.facilityContactPhone      ,
      customerAddress: selectedCorp.facilityAddress,
      customerCity: selectedCorp.facilityCity,
      customerLGA: selectedCorp.facilityLGA,
      customerState: selectedCorp.facilityState,
      customerCountry: selectedCorp.facilityCountry,
      customerType: selectedCorp.facilityType,
      customerCategory: selectedCorp.facilityCategory,
      customer:selectedCorp,
      customerId:selectedCorp._id,
      facilityId:user.currentEmployee.facilityDetail._id, //hmo insuing invoice
      faciltyName:user.currentEmployee.facilityDetail.facilityName,
      facility:user.currentEmployee.facilityDetail,
      status: "Pending",
    
    };

    const notificationObj = {
      type: "Invoice",
      title: "New Invoice Created For Renewal",
      description: `${employee.firstname} ${employee.lastname} Created a new Invoice  for Renewal for  ${selectedCorp.facilityName}`,
      facilityId: employee.facilityDetail._id,
      sender: `${employee.firstname} ${employee.lastname}`,
      senderId: employee._id,
      pageUrl: "/app/managedcare/invoice",
      priority: "normal",
     // dest_userId: currentDeal.assignStaff.map(item => item.employeeId),
    };

    //return console.log(document);

    //const prevInvoices = currentDeal.invoices || [];

    //const newInvoices = [document, ...prevInvoices];

    //const documentId = currentDeal._id;
    await InvoiceServer
      .create(document)
      .then(async res => {
        await notificationsServer.create(notificationObj);
        hideActionLoader();
        //setContacts(res.contacts);
       /*  setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        })); */
        //closeModal();
        reset({
          subscription_category: "",
          payment_option: "",
          payment_mode: "",
          invoice_number: random(12, "uppernumeric"),
          date: new Date(),
          total_amount: 0,
        });
        setPlans([]);
        toast.success(`You have successfully Created a new Invoice`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Create an Invoice. ${err}`);
      });
  };

const processPlans=()=>{
  let planObject = {}; 
  console.log(policies)
  const employee = user.currentEmployee;
//find unqiue plans
//count number of heads
//

const uniqueArr = [...new Set(policies.map(data => data.plan._id))];
const uniqueplan= [...new Set(policies.map(data => data.plan.planName ))]
const uniqueplanid= [...new Set(policies.map(data => data.plan.planId ))]

console.log("uniqueArr",uniqueArr)
console.log("uniqueplan",uniqueplan)
console.log("uniqueplanid",uniqueplanid)


const arrlength=uniqueArr.length
let planx=[]
let planobj={
  type: "",
  premium: "",
  heads: "",
  calendrical: "",
  length: "",
  amount: "",
 /*  _id: uuidv4(), */
  created_at: new Date(),
  createdBy: employee.userId,
  createdByName: `${employee.firstname} ${employee.lastname}`
}

policies.forEach(el => {
  const planId = el.plan._id?el.plan._id:el.plan.planId;

    // Check if the planId is already in the planObject
    if (planObject.hasOwnProperty(planId)) {
      // If it exists, increment the count
      planObject[planId].count++;
      planObject[planId].policy.push(el)
     // planObject[planId].plans.push(el.plan)
      if (el.planType==="Family"){
        planObject[planId].familyplan.push(el.plan)
      }else(
        planObject[planId].individualplan.push(el.plan)
      )

    } else {
      // If it doesn't exist, add it to the planObject with initial count of 1
      planObject[planId] = {
        plan: el.plan,
        planName:el.plan.planName,
        planType: el.planType,
        count: 1,
        policy: [el],
        familyplan:[],
        individualplan:[]
      }; 
      if (el.planType==="Family"){
        planObject[planId].familyplan.push(el.plan)
      }else(
        planObject[planId].individualplan.push(el.plan)
      ) 
    }
   });

console.log("planObject",planObject)

const keys = Object.keys(planObject);

keys.forEach((property) => {
  //console.log(`${property}: ${person[property]}`);

  if (planObject[property].familyplan.length>0){
   const familypremium= planObject[property].plan.premiums.find(el=>el.planType==="Family")
    const amount = (+familypremium.premiumAmount)*(+planObject[property].familyplan.length)

    let planobj={
      name: planObject[property].planName,
      type:"Family",   
      planId: property,
      premium: familypremium.premiumAmount,
      heads: planObject[property].familyplan.length,
      
      calendrical: "Year(s)",
      length: "1",
      amount: amount,
      utilizationStatus:"Incomplete",
      tracking:0,
      created_at: new Date(),
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      oldPolicies:planObject[property].familyplan,
    }
    
    handleAddNewPlan(planobj)
  }
  if (planObject[property].individualplan.length>0){
    const individualpremium= planObject[property].plan.premiums.find(el=>el.planType==="Individual")
    const amount = (+individualpremium.premiumAmount)*(+planObject[property].individualplan.length)

    let planobj={
      name: planObject[property].planName,
      type:"Individual",    
      planId: property,
      premium: individualpremium.premiumAmount,
      heads: planObject[property].individualplan.length,
      calendrical: "Year(s)",
      length: "1",
      amount: amount,
      utilizationStatus:"Incomplete",
      tracking:0,
      created_at: new Date(),
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      oldPolicies:planObject[property].individualplan,

    }
    
    handleAddNewPlan(planobj)
    
  }
  
});


/* let planArray=[... planObject]
console.log(planArray) */

}

  useEffect(() => {
  //  const selectedCorp = state.ManagedCareCorporate.selectedCorporate;
    setValue("invoice_number", random(12, "uppernumeric"));
    setValue("date", new Date());
    setValue("total_amount", 0);
    setValue("subscription_category","Renewal")
    if(policies!==undefined){
      processPlans()
    }
    
  }, []);

  useEffect(() => {
    //console.log(plans[0]);
    const totalPlansSum = plans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

    setValue("total_amount", totalPlansSum);
  }, [plans]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f8f8f8",
            backgroundColor: "#f8f8f8",
          }}
          p={2}
        >
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon />
            Back
          </GlobalCustomButton>

          <Box
            sx={{
              display: "flex",
            }}
            gap={1}
          >
            <GlobalCustomButton
              color="success"
              onClick={handleSubmit(createInvoice)}
            >
              Create Invoice
            </GlobalCustomButton>
          </Box>
        </Box>

        <Grid container spacing={2} p={2}>
          <Grid item lg={12} md={12} sm={12}>
            <PageCustomerDetail />
          </Grid>

          <Grid item lg={12} md={12} sm={12}>
            <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Invoice Information" />
            </Box>

            <Grid container spacing={1} mb={1.5}>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <MuiCustomDatePicker
                  label="Date"
                  disabled={true}
                  control={control}
                  name="date"
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Input
                  label="Invoice Number"
                  register={register("invoice_number")}
                  disabled={true}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Input
                  label="Total Amount"
                  register={register("total_amount")}
                  disabled={true}
                  type="number"
                />
              </Grid>

              <Grid item lg={3} md={4} sm={6} xs={12}>
                <CustomSelect
                  label="Payment Mode"
                  options={["Cash", "Cheque", "Transfer"]}
                  control={control}
                  name="payment_mode"
                  required
                />
              </Grid>

              <Grid item lg={3} md={4} sm={6} xs={12}>
                <CustomSelect
                  label="Payment Option"
                  options={["Annually", "Bi-Annually", "Quarterly"]}
                  control={control}
                  name="payment_option"
                  required
                />
              </Grid>

              <Grid item lg={3} md={4} sm={6} xs={12}>
                {/* <CustomSelect
                  label="Subscribtion Category"
                  options={["New", "Renewal", "Additional"]}
                  control={control}
                  name="subscription_category"
                  required
                /> */}
                 <Input
                  label="Subscribtion Category"
                  register={register("subscription_category")}
                  disabled={true}
                  type="text"
              
                />
              </Grid>
            </Grid>

            <Box>
              <PageCreatePlan addNewPlan={handleAddNewPlan} />
            </Box>

            <Box mt={1} mb={1}>
              <Plans
                omitCreate={true}
                plans={plans}
                removePlan={handleRemovePlan}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvoiceCreate;

export const HealthPlanSearchSelect = ({handleChange, clearValue}) => {
  const HealthPlanServ = client.service("healthplan");
  const [facilities, setFacilities] = useState([]);
  const {user, setUser} = useContext(UserContext);
  const [value, setValue] = useState("");

  const getFacilities = async () => {
    if (user.currentEmployee) {
      let stuff = {
        organizationId: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };

      const findHealthPlan = await HealthPlanServ.find({query: stuff});

      await setFacilities(findHealthPlan.data);
    } else {
      if (user.stacker) {
        const findClient = await HealthPlanServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  const createNewOptions = async () => {
    const promises = facilities.map(item => {
      console.log(item.premiumns);
      const premiums = item.premiumns;
      premiums.map(prem => {
        return {
          ...prem,
          planName: item.planName,
        };
      });
    });

    const data = await Promise.all(promises);

    console.log(data);
  };

  const finalOptions =
    facilities.length > 0
      ? facilities.map(item => {
          // console.log(item);
          return item.premiums.map(prem => {
            return {
              ...prem,
              planName: item.planName,
              planCategory: item.planCategory,
            };
          });
        })
      : [];

  const onChange = data => {
    //setValue(`${data.planName} (${data.planType})`);
    setValue(data);
    handleChange(data);
  };

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{width: "100%"}}
      //value={value}
      onChange={(event, newValue, reason) => {
        if (reason === "clear") {
          setValue("");
        } else {
          onChange(newValue);
        }
      }}
      options={finalOptions.flat(1)}
      //options={plans}
      groupBy={option => `${option.planName} (${option.planCategory})`}
      autoHighlight
      getOptionLabel={option => `${option.planName} (${option.planType})`}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{fontSize: "0.85rem"}}>
          {option.planType} - {option.premiumAmount}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: false, // disable autocomplete and autofill
          }}
          label={"Choose Your Plan"}
          //ref={inputEl}
          sx={{
            fontSize: "0.75rem",
            backgroundColor: "#ffffff",
            "& .MuiInputBase-input": {
              height: "0.9rem",
              fontSize: "0.8rem",
            },
          }}
          InputLabelProps={{
            Autocomplete: false,
            shrink: true,
            style: {color: "#2d2d2d"},
          }}
        />
      )}
    />
  );
};
