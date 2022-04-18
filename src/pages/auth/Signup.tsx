import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Step, StepButton, Stepper } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthWrapper from '../../components/AuthWrapper';
import Button from '../../components/buttons/Button';
import client from '../../context/feathers';
import {
  OnboardingEmployeeSchema,
  OrganisationSchema,
} from '../app/schema/ModelSchema';
import { getResolver } from '../app/schema/util';
import AddAdmin from './forms/AddAdmin';
import CreateOrganization from './forms/CreateOrganization';
import SelectModule from './forms/SelectModule';

const steps = [
  'Organization Information',
  'Choose Modules',
  'Add Admin Employees',
];

const STEP_ORGANISATION = 0;
const STEP_MODULES = 1;
const STEP_EMPLOYEE = 2;

function Signup() {
  const FacilityServ = client.service('facility');
  const EmployeeServ = client.service('employee');
  const organnisationResolver = getResolver(OrganisationSchema);
  const employeeResolver = getResolver(OnboardingEmployeeSchema);

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [createdFacility, setCreatedFacility] = useState<any>();
  const [createdAdminEmployee, setCreatedAdminEmployee] = useState<any>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(organnisationResolver),
  });

  const handleNext = (data) => {
    processStep(data)
      .then((_) => {
        const newActiveStep =
          activeStep < STEP_EMPLOYEE ? activeStep + 1 : activeStep;
        setActiveStep(newActiveStep);
      })
      .catch((error) => {
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

  const processStep = async (data) => {
    if (activeStep === STEP_ORGANISATION) {
      return Promise.resolve(true);
    } else if (activeStep === STEP_MODULES) {
      if ([...data.modules1, ...data.modules2].length > 1) {
        return createFacility(data)
          .then((res) => {
            setCreatedFacility(res);
            return true;
          })
          .catch((error) => {
            return Promise.reject(
              `Error occurred creating facility ${error.message}`,
            );
          });
      } else {
        return Promise.reject('Please select 2 modules or more!');
      }
    } else if (activeStep === STEP_EMPLOYEE) {
      return createAdminEmployee(data)
        .then((res) => {
          setCreatedAdminEmployee(res);
          navigate('/');
        })
        .catch((error) => {
          return Promise.reject(
            `Error occurred creating admin employee ${error.message}`,
          );
        });
    }
  };

  const createFacility = (data) => {
    const facility = {
      ...data,
      facilityModules: Object.keys(data)
        .filter((key) => key.includes('module') && data[key])
        .map((key) => key.substring(6)),
    };
    return FacilityServ.create(facility);
  };

  const createAdminEmployee = async (data) => {
    return employeeResolver
      .validate(data)
      .then((_) => {
        const employee = {
          ...data,
          relatedfacilities: [
            {
              facility: createdFacility && createdFacility._id,
              roles: ['Admin'],
              deptunit: data.deptunit,
              email: data.email,
            },
          ],
        };
        return EmployeeServ.create(employee);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return (
    <AuthWrapper paragraph="Signup here as an organization">
      <Stepper nonLinear activeStep={activeStep}>
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
          <CreateOrganization control={control} errors={errors} />
        )}
        {activeStep === STEP_MODULES && <SelectModule control={control} />}
        {activeStep === STEP_EMPLOYEE && (
          <AddAdmin control={control} adminEmployee={createdAdminEmployee} />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 2,
            gap: 10,
          }}
        >
          {activeStep > STEP_ORGANISATION && !createdFacility ? (
            <Button
              color="inherit"
              disabled={activeStep === STEP_ORGANISATION}
              onClick={handleBack}
              style={{ background: 'lightgray', color: 'black' }}
            >
              Back
            </Button>
          ) : (
            <></>
          )}
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === STEP_EMPLOYEE ? (
            <Button>Complete</Button>
          ) : (
            <Button>Next</Button>
          )}
        </Box>
      </form>
      <p style={{ padding: '2rem 0' }}>
        Have an account?
        <Link
          className="nav-link"
          style={{
            padding: '0',
            background: 'transparent',
            color: 'blue',
            marginLeft: '0.6rem',
          }}
          to="/"
        >
          Login
        </Link>
      </p>

      <Link
        className="nav-link"
        style={{
          padding: '16px 32px',
          color: '#333',
          borderRadius: '4px',
          background: '#eeeeee',
          marginLeft: '0.6rem',
          position: 'fixed',
          top: '20px',
          right: '20px',
          textDecoration: 'none',
        }}
        to="/signupindividual"
      >
        Signup as Individual
      </Link>
    </AuthWrapper>
  );
}

export default Signup;
