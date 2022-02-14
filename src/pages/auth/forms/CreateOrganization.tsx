import { Stack } from '@mui/material';
import React from 'react';

import DynamicInput from '../../../components/app/DynamicInput';
import { OrganisationSchema } from '../../../components/app/schema';

function CreateOrganization({ control, errors }) {
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      {OrganisationSchema.map((data, i) => (
        <DynamicInput key={i} {...data} name={data.key} control={control} errors={errors} />
      ))}
    </Stack>
  );
}

export default CreateOrganization;
