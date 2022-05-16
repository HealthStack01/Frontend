import { Stack } from '@mui/material';
import React from 'react';

import DynamicInput from '../../../components/inputs/DynamicInput';

const AddAddress = ({ control, schema, errors }) => {
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      {schema.map((data, i) => (
        <DynamicInput
          key={i}
          {...data}
          defaultValue=""
          label={data.description}
          name={data.key}
          control={control}
          errors={errors}
        />
      ))}
    </Stack>
  );
};

export default AddAddress;
