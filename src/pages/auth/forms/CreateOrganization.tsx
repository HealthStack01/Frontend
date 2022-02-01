import { Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import DynamicInput from '../../../components/app/DynamicInput';
import { OrganisationSchema } from '../../../components/app/ModelSchema';

function CreateOrganization() {
  const { handleSubmit, control } = useForm();
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <form onSubmit={handleSubmit(console.log)} >
        {OrganisationSchema.map((data,  i) => (
              <DynamicInput
              control={control}
                {...data}
                key={i}
              />))}
      </form>
    </Stack>
  );
}

export default CreateOrganization;
