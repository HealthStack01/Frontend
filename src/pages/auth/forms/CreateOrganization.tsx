import { Stack } from '@mui/material';
import React from 'react';

import DynamicInput from '../../../components/inputs/DynamicInput';
import { OrganisationSchema } from '../../app/schema';

function CreateOrganization({ control, errors }) {
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      {OrganisationSchema.map((data, i) => (
        <DynamicInput key={i} {...data} label={data.description} name={data.key} control={control} errors={errors} />
      ))}
    </Stack>
  );
}

export default CreateOrganization;
