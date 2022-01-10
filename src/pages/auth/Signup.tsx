import { Box, Step, StepButton, Stepper } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import CheckboxInput from '../../components/inputs/basic/Checkbox';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';
import AuthWrapper from '../../helper/AuthWrapper';
import AddAdmin from './forms/AddAdmin';
import CreateOrganization from './forms/CreateOrganization';
import SelectModule from './forms/SelectModule';

const steps = [
  'Organization Information',
  'Choose Modules',
  'Add Admin Employees',
];

const Signup = () => {
  let navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  console.log(activeStep);

  const onSubmit = () => {
    navigate('/dashboard');
  };
  return (
    <>
      <AuthWrapper paragraph='Signup here as an organization'>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color='inherit' onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && <CreateOrganization />}
        {activeStep === 1 && <SelectModule />}
        {activeStep === 2 && <AddAdmin />}

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, gap: 10 }}>
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
            <>
              <Button type='submit' onClick={onSubmit}>
                Complete
              </Button>
            </>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </Box>

        <Link
          className='nav-link'
          style={{
            padding: '0',
            background: 'transparent',
            color: 'blue',
            marginLeft: '0.6rem',
            position: 'fixed',
            top: '20px',
            right: '20px',
          }}
          to='/signupindividual'
        >
          Signup as Individual
        </Link>
      </AuthWrapper>
    </>
  );
};

export default Signup;
