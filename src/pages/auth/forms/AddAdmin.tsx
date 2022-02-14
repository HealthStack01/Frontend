import { Stack } from '@mui/material';
import React from 'react';

import AccordionBox from '../../../components/accordion';
import ExistingAdminEmployee from './ExistingAdminEmployee';
import NewEmployee from './NewEmployee';

function AddAdmin({ control, adminEmployee }) {
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <AccordionBox title={adminEmployee ? 'Admin Employee' : 'Add Admin Employye'}>
        <AccordionBox title="New Admin Employee">
          <NewEmployee control={control} />
        </AccordionBox>
        <AccordionBox title="Inivte an existing user">
          <ExistingAdminEmployee />
        </AccordionBox>
      </AccordionBox>
    </Stack>
  );
}

export default AddAdmin;
