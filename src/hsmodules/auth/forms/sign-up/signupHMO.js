import {useContext, useEffect, useReducer, useState,useRef} from "react";
import {Box, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate, useParams} from "react-router-dom";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CreateOrganizationStepper from "./stepper";
import OrganizationForm from "./Organization";
import ContactForm from "./Contact";
import AdminForm from "./Admin";
import ModulesForm from "./Module";
import Side from "../../../../components/banner/side";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {
  adminValidationSchema,
  contactValidationSchema,
  organizationValidationSchema,
} from "./schemas";
import AnimatedDots from "../../../../components/animated-dots/animated-dots";
import client from "../../../../feathers";
import {toast} from "react-toastify";
import {UserContext} from "../../../../context";
import {orgTypeModules} from "../../../app/app-modules";

const steps = ["Organization", "Contact", "Admin"];

const initState = {
  organizationData: {
    facilityModules: [],
    facilityName: "",
    facilityType: "",
    facilityCategory: "",
    facilityCAC: "",
    facilityAddress: "",
    facilityState: "",
    facilityCity: "",
    facilityLGA: "",
    facilityCountry: "",
    facilityContactPhone: "",
    facilityEmail: "",
    facilityOwner: "",
    //facilityCreated: "",
  },
  adminData: {},
};

const OrganizationSignupHMO = () => {
  const FacilityServ = client.service("facility");
  const DealServ = client.service("deal");
  const InvServ = client.service("corpinvoices");
  //const [state, dispatch] = useReducer(reducer, initState);
  // const [data, setData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [facilityData, setFacilityData] = useState(initState.organizationData);
  //const [adminData, setAdminData] = useState({});
  const [creatingOrganizaiton, setCreatingOrganization] = useState(false);
  const [creatingAdmin, setcreatingAdmin] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [dealinvoice, setDealInvoice]=useState()
  const [org, setOrg]=useState({})
  const fac=useRef()

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();

  const {type,id} = useParams();
 

  //HOOK FORM FOR ORGANIZATION STEP
  const {
    register: organizationRegister,
    control: organizationControl,
    handleSubmit: handleSubmitOrgnization,
    watch: organizationWatch,
    setValue: organizationSetValue,
    formState: {errors: organizationErrors},
  } = useForm({
    defaultValues: {
      facilityType: type.charAt(0).toUpperCase() + type.slice(1),
    },
    resolver: yupResolver(organizationValidationSchema),
  });

  //HOOK FORM FOR CONTACT STEP
  const {
    register: contactRegister,
    control: contactControl,
    handleSubmit: handleSubmitContact,
    setValue: contactSetValue,
    watch: contactWatch,
    formState: {errors: contactErrors},
  } = useForm({
    resolver: yupResolver(contactValidationSchema),
  });

  //HOOK FORM FOR MODULES STEP
  const {
    register: modulesRegister,
    control: modulesControl,
    handleSubmit: handleSubmitModules,
    reset: modulesReset,
    setValue: modulesSetValue,
  } = useForm();

  //HOOK FORM FOR ADMIN STEPS
  const {
    register: adminRegister,
    control: adminControl,
    handleSubmit: handleSubmitAdmin,
    formState: {errors: adminErrors},
  } = useForm({resolver: yupResolver(adminValidationSchema)});

  const handleGetData = data => {
    setActiveStep(prev => prev + 1);

    return setFacilityData(prev => ({
      ...prev,
      ...data,
    }));
  };

  const handleGoToNextForm = () => {
    switch (activeStep) {
      case 0:
        handleSubmitOrgnization(handleGetData)();
        return;
      case 1:
        return handleSubmitContact(handleGetData)();
      case 2:
        return handleSubmitAdmin(handleCompleteRegistration)();
      default:
        return;
    }
  };

  const hanldeGoToPrevForm = () => {
    setActiveStep(prev => prev - 1);
  };


  const createinvoice=async(res,deal) => {
    //find the invoice from deal
    console.log("starting to create invoices")
     console.log(res,deal)
    //create it in corpinvoice
    deal.invoices.map(async(inv,i) => {
      console.log("starting 2")
      
      inv.customerId=res._id
      inv.customer=res
      inv.facility=deal.facility
      inv.facilityId=deal.facilityId

      inv.facilityName=deal.facilityName
      
      delete inv._id
      inv.plans.map((plan,i)=>{
        delete plan._id

      })
      console.log("invoices",inv)
        await InvServ.create(inv)
       .then(res=>console.log(res))
       .catch(error=>console.log(error))

    
    })
  }

  const handleCompleteRegistration = async data => {
    if (!agreedToTerms)
      return toast.error("Please agree to our Terms and Conditions");
    setCreatingOrganization(true);

    const selectedType = orgTypeModules.find(
      item => item.name === facilityData.facilityType
    );
    
      const deal = await DealServ.get(id)
      setDealInvoice(deal)
     console.log("deal",deal)
      let dealdata=[]
      let dealobj={
        deal:deal,
        dealId:id
      }
      dealdata=[...dealdata, dealobj]
      
    const facilityDocument = {
      ...facilityData,
      facilityModules: selectedType ? selectedType.modules : ["Admin"],
      dealInfo:dealdata,
      hasEmployee: true,
      employeeData: {
        ...data,
        roles: selectedType ? selectedType.modules : ["Admin"],
      },
    };

   const pres=    await FacilityServ.create(facilityDocument)
      .then(async res => {
        toast.success("Organization Account successfully Created");
        setCreatingOrganization(false);
        setSigningIn(true);
        console.log(res);
        fac.current=res
       setOrg(res)
        await client
          .authenticate({
            strategy: "local",
            email: data.email,
            password: data.password,
          })
          .then(async res => {
            const user = {
              ...res.user,
              currentEmployee: {...res.user.employeeData[0]},
            };
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            toast.success("You have successfully been logged in");
            setSigningIn(false);
            //create invoice
           
            //
          });

          
      })
      .catch(err => {
        setCreatingOrganization(false);
        // setcreatingAdmin(false);
        setSigningIn(false);
        toast.error(`Sorry, There was an error creating your account; ${err}`);
        console.log(err);
      });
      await createinvoice(fac.current,deal) 
          navigate("/app");
  };

  function ActiveFormStep(step) {
    switch (step) {
      case 0:
        return (
          <OrganizationForm
            register={organizationRegister}
            control={organizationControl}
            errors={organizationErrors}
            watch={organizationWatch}
            setValue={organizationSetValue}
            option={type}
          />
        );
      case 1:
        return (
          <ContactForm
            register={contactRegister}
            control={contactControl}
            watch={contactWatch}
            errors={contactErrors}
            setValue={contactSetValue}
          />
        );

      case 2:
        return <AdminForm register={adminRegister} errors={adminErrors} />;
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {(creatingOrganizaiton || creatingAdmin || signingIn) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: "999999",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.7)",
          }}
          gap={4}
        >
          <CircularProgress />
          {creatingOrganizaiton && (
            <AnimatedDots text="Creating Organization Account" />
          )}

          {creatingAdmin && <AnimatedDots text="Creating Admin Account" />}

          {signingIn && <AnimatedDots text="Signing you into Admin Account" />}
        </Box>
      )}

      <Side />

      <Box
        sx={{
          width: "65%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "#f8f8f8",
        }}
      >
        <Box mb={4}>
          <Typography sx={{fontWeight: "600"}}>
            Create An Organization
          </Typography>
        </Box>

        <Box
          sx={{
            width: "30rem",
          }}
          mb={3}
        >
          <CreateOrganizationStepper steps={steps} activeStep={activeStep} />
        </Box>

        <Box
          sx={{
            width: "25rem",
            padding: "15px",
            backgroundColor: "#ffffff",
            border: "1px solid #f0f0f0",
            // boxShadow: "3",
            // maxHeight: "25rem",
          }}
          mb={1.5}
        >
          {ActiveFormStep(activeStep)}
        </Box>

        {activeStep === steps.length - 1 && (
          <Box
            sx={{
              width: "25rem",
              display: "flex",
              justifyContent: "flex-start",
            }}
            mb={1}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={agreedToTerms}
                    onChange={e => setAgreedToTerms(e.target.checked)}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                    }}
                  >
                    Please confrm that you agree to our
                    <GlobalCustomButton
                      variant="text"
                      onClick={() => console.log("hello world")}
                    >
                      Terms & Condtions
                    </GlobalCustomButton>
                  </Typography>
                }
              />
            </FormGroup>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            width: "25rem",
            justifyContent: "space-between",
          }}
        >
          <GlobalCustomButton
            onClick={hanldeGoToPrevForm}
            disabled={activeStep === 0}
            color="warning"
          >
            <ArrowBackIcon fontSize="small" sx={{marginRight: "5px"}} />
            Prev Step
          </GlobalCustomButton>

          {activeStep === steps.length - 1 ? (
            <GlobalCustomButton onClick={handleGoToNextForm}>
              <TaskAltIcon fontSize="small" sx={{marginRight: "5px"}} />
              Complete Registration
            </GlobalCustomButton>
          ) : (
            <GlobalCustomButton onClick={handleGoToNextForm} color="success">
              Next Step
              <ArrowForwardIcon fontSize="small" sx={{marginLeft: "5px"}} />
            </GlobalCustomButton>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            height: "40px",
            width: "25rem",
            //boxShadow: 3,
            alignItems: "center",
            justifyContent: "center",
            //backgroundColor: "#fffffff",
            backgroundColor: "#ffffff",
            border: "1px solid #f0f0f0",
          }}
          mt={2}
        >
          <p style={{padding: "0"}}>
            Have an account?
            <Link
              className="nav-link"
              style={{
                padding: "0",
                background: "transparent",
                color: "blue",
                marginLeft: "0.6rem",
              }}
              to="/"
            >
              Login
            </Link>
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationSignupHMO;
