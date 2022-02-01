import { Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import DynamicInput from '../../../components/app/DynamicInput';
import { OnboardingEmployeeSchema } from '../../../components/app/ModelSchema';

import Button from '../../../components/buttons/Button';

function NewEmployee() {

 const { handleSubmit, control } = useForm();

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <form>
        {OnboardingEmployeeSchema.map((schema,  i) => (
         <DynamicInput
          {...schema}
          key={i}
          name={schema.key}
          control={control}
         />
        ))}

        <Button type="submit" label="Create Admin" fullwidth />
      </form>
    </Stack>
  );
}

export default NewEmployee;
