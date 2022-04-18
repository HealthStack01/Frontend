import { Stack } from '@mui/material';
import React from 'react';

import DynamicInput from '../../../components/inputs/DynamicInput';
import { OnboardingEmployeeSchema } from '../../app/schema/ModelSchema';

function NewEmployee({ control }) {
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      {OnboardingEmployeeSchema.map((schema, i) => (
        <DynamicInput
          {...schema}
          key={i}
          label={schema.description}
          name={schema.key}
          control={control}
        />
      ))}
    </Stack>
  );
}

export default NewEmployee;
