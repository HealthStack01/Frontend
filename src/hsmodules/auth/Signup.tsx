import {useContext} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Step, StepButton, Stepper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import AuthWrapper from "../../components/AuthWrapper";
import Button from "../../components/buttons/Button";
import client from "../../feathers";
import {
  getOrganisationContactSchema,
  getOrganisationSchema,
  OnboardingEmployeeSchema,
} from "../app/schema/ModelSchema";
import {getResolver} from "../app/schema/util";
import AddAdmin from "./forms/AddAdmin";
import CreateOrganization from "./forms/CreateOrganization";
import SelectModule from "./forms/SelectModule";
import {ObjectContext, UserContext} from "../../context";
import GlobalCustomButton from "../../components/buttons/CustomButton";

const steps = ["Organization", "Contact ", "Modules", "Admin"];

const adminRoles = [
  "Admin",
  "Admin Employees",
  "Admin Bands",
  "Admin Location",
];

const STEP_ORGANISATION = 0;
const STEP_ADDRESS = 1;
const STEP_MODULES = 2;
const STEP_EMPLOYEE = 3;

function Signup() {
  const FacilityServ = client.service("facility");
  const EmployeeServ = client.service("employee");
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const {setUser} = useContext(UserContext);
  const organisationResolver = getResolver(getOrganisationSchema());
  const [contactSchema, setContactSchema] = useState(
    getOrganisationContactSchema({})
  );
  const employeeResolver = getResolver(OnboardingEmployeeSchema);

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [createdFacility, setCreatedFacility] = useState<any>();
  const [createdAdminEmployee, setCreatedAdminEmployee] = useState<any>();
  const {
    handleSubmit,
    control,
    formState: {errors},
    watch,
  } = useForm({
    resolver: yupResolver(organisationResolver),
  });

  const handleNext = data => {
    processStep(data)
      .then(_ => {
        const newActiveStep =
          activeStep < STEP_EMPLOYEE ? activeStep + 1 : activeStep;
        setActiveStep(newActiveStep);
      })
      .catch(error => {
        toast.error(error.message ? error.message : error);
      });
  };

  const handleBack = () => {
    setActiveStep(activeStep > STEP_ORGANISATION ? activeStep - 1 : activeStep);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  //FIXME: use this  code or remove
  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  useEffect(() => {
    hideActionLoader();
  }, []);

  const processStep = async data => {
    if (activeStep === STEP_ORGANISATION) {
      return Promise.resolve(true);
    } else if (activeStep === STEP_ADDRESS) {
      return Promise.resolve(true);
    } else if (activeStep === STEP_MODULES) {
      const modules = [...(data.modules1 || []), ...(data.modules2 || [])];
      if (modules.length > 1) {
        // showActionLoader();
        return createFacility({...data, modules})
          .then(res => {
            setCreatedFacility(res);
            hideActionLoader();
            return true;
          })
          .catch(error => {
            hideActionLoader();
            return Promise.reject(
              `Error occurred creating facility ${error.message}`
            );
          });
      } else {
        hideActionLoader();
        return Promise.reject("Please select 2 modules or more!");
      }
    } else if (activeStep === STEP_EMPLOYEE) {
      showActionLoader();
      return createAdminEmployee({
        ...data,
        roles: adminRoles,
        facility: createdFacility._id,
      })
        .then(async res => {
          setCreatedAdminEmployee(res);
          //console.log(data);
          await client
            .authenticate({
              strategy: "local",
              email: data.email,
              password: data.password,
            })
            .then(res => {
              hideActionLoader();
              const user = {
                ...res.user,
                currentEmployee: {...res.user.employeeData[0]},
              };
              localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
              toast.success("You successfully logged in");
              navigate("/app");
            })
            .catch(err => {
              toast.error(`Automatic Log in failed ${err}`);
            });
        })
        .catch(error => {
          hideActionLoader();
          return Promise.reject(
            `Error occurred creating admin employee ${error.message}`
          );
        });
    }
  };

  const createFacility = data => {
    console.log(data);
    const facility = {
      ...data,
      facilityModules: data.modules,
      _facilityModules: Object.keys(data)
        .filter(key => key.includes("module") && data[key])
        .map(key => key.substring(6)),
    };
    //return console.log(facility);
    return FacilityServ.create(facility);
  };

  const createAdminEmployee = async data => {
    return employeeResolver
      .validate(data)
      .then(_ => {
        const employee = {
          ...data,
          relatedfacilities: [
            {
              facility: createdFacility && createdFacility._id,
              roles: adminRoles,
              deptunit: data.deptunit,
              email: data.email,
            },
          ],
        };
        //return console.log(employee);
        return EmployeeServ.create(employee);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if (name === "facilityState") {
        const newSchema = getOrganisationContactSchema({...value});
        setContactSchema(newSchema);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <AuthWrapper paragraph="Signup here as an organization">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit(handleNext)}>
        {activeStep === STEP_ORGANISATION && (
          <CreateOrganization
            schema={getOrganisationSchema()}
            control={control}
            errors={errors}
          />
        )}
        {activeStep === STEP_ADDRESS && (
          <CreateOrganization
            schema={contactSchema}
            control={control}
            errors={errors}
          />
        )}
        {activeStep === STEP_MODULES && <SelectModule control={control} />}
        {activeStep === STEP_EMPLOYEE && (
          <AddAdmin control={control} adminEmployee={createdAdminEmployee} />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {activeStep > STEP_ORGANISATION && !createdFacility ? (
            <GlobalCustomButton
              color="warning"
              disabled={activeStep === STEP_ORGANISATION}
              onClick={handleBack}
              //style={{background: "lightgray", color: "black"}}
            >
              <ArrowBackIcon fontSize="small" sx={{marginRight: "5px"}} />
              Back
            </GlobalCustomButton>
          ) : (
            <></>
          )}
          <Box sx={{flex: "1 1 auto"}} />
          {activeStep === STEP_EMPLOYEE ? (
            <GlobalCustomButton
              color="success"
              onClick={handleSubmit(handleNext)}
            >
              Complete
              <DoneAllIcon fontSize="small" sx={{marginLeft: "5px"}} />
            </GlobalCustomButton>
          ) : (
            <GlobalCustomButton onClick={handleSubmit(handleNext)}>
              Next
              <ArrowForwardIcon fontSize="small" sx={{marginLeft: "5px"}} />
            </GlobalCustomButton>
          )}
        </Box>
      </form>

      <Box
        sx={{
          display: "flex",
          height: "40px",
          boxShadow: 3,
          alignItems: "center",
          justifyContent: "center",
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

      <Link
        className="nav-link"
        style={{display: "none"}}
        to="/signupindividual"
      >
        Signup as Individual
      </Link>
    </AuthWrapper>
  );
}

export default Signup;
