import { Box, FormGroup, Stack } from '@mui/material';
import React from 'react';

import DynamicInput from '../../../components/inputs/DynamicInput';
import { ModulesSchema } from '../../app/schema';

function SelectModule({ control }) {
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {ModulesSchema.map((schema, i) => (
          <FormGroup key={i}>
            <DynamicInput control={control} {...schema} />
          </FormGroup>
        ))}
      </Box>
    </Stack>
  );
}

export default SelectModule;
