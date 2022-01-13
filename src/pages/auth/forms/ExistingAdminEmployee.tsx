import { Stack } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../components/buttons/Button';
import Input from '../../../components/inputs/basic/Input';

const ExistingAdminEmployee = () => {
  const [values, setValues] = useState({});
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <form action=''>
        <Input
          label='Organization Email'
          name='organizationEmail'
          onChange={e =>
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            })
          }
        />

        <Button type='submit' label='Send Invitation' fullwidth />
      </form>
    </Stack>
  );
};

export default ExistingAdminEmployee;
