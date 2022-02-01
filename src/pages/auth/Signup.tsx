import { Box, Step, StepButton, Stepper } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/buttons/Button';
import AuthWrapper from '../../helper/AuthWrapper';
import AddAdmin from './forms/AddAdmin';
import CreateOrganization from './forms/CreateOrganization';
import SelectModule from './forms/SelectModule';

const steps = [
  'Organization Information',
  'Choose Modules',
  'Add Admin Employees',
];

function Signup() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<{
    [k: number]: any;
  }>({});

  const { handleSubmit, control } = useForm();

  const totalSteps = () => steps.length;

  const getCompletedSteps = () => Object.keys(completedSteps).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => getCompletedSteps() === totalSteps();

  const handleNext = (data) => {
    console.log({  data  });
    setCompletedSteps({...completedSteps, [activeStep]: data});
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completedSteps))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
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

  const onSubmit = () => {
    navigate('/app');
  };
  return (
    <AuthWrapper paragraph='Signup here as an organization'>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={!!completedSteps[index]}>
            <StepButton color='inherit' onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(handleNext)}>
      {activeStep === 0 && <CreateOrganization control={control} />}
      {activeStep === 1 && <SelectModule control={control} />}
      {activeStep === 2 && <AddAdmin />}
   
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 2,
          gap: 10,
        }}
      >
        <Button
          color='inherit'
          disabled={activeStep === 0}
          onClick={handleBack}
          style={{ background: 'lightgray', color: 'black' }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === 2 ? (
          <Button type='submit' onClick={onSubmit}>
            Complete
          </Button>
        ) : (
          <Button>Next</Button>
        )}
      </Box>
      </form>
      <p style={{ padding: '2rem 0' }}>
        Have an account?
        <Link
          className='nav-link'
          style={{
            padding: '0',
            background: 'transparent',
            color: 'blue',
            marginLeft: '0.6rem',
          }}
          to='/'
        >
          Login
        </Link>
      </p>

      <Link
        className='nav-link'
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
        to='/signupindividual'
      >
        Signup as Individual
      </Link>
    </AuthWrapper>
  );
}

export default Signup;
