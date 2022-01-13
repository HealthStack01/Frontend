import { Stack } from '@mui/material';
import React from 'react';
import AccordionBox from '../../../components/accordion';
import ExistingAdminEmployee from './ExistingAdminEmployee';
import NewEmployee from './NewEmployee';

const AddAdmin = () => {
  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <AccordionBox title='Add Admin Employye'>
        <AccordionBox title='New Admin Employye'>
          <NewEmployee />
        </AccordionBox>
        <AccordionBox title='Inivte an existing user'>
          <ExistingAdminEmployee />
        </AccordionBox>
      </AccordionBox>
    </Stack>
  );
};

export default AddAdmin;
