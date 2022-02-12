import { Stack } from '@mui/material';
import React from 'react';

import DynamicInput from '../../../components/app/DynamicInput';
import { OnboardingEmployeeSchema } from '../../../components/app/schema';

function NewEmployee({ control }) {
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      {OnboardingEmployeeSchema.map((schema, i) => (
        <DynamicInput {...schema} key={i} name={schema.key} control={control} />
      ))}
    </Stack>
  );
}

export default NewEmployee;
