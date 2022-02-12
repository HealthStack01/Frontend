import { Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import DynamicInput from '../../../components/app/DynamicInput';
import { InputType } from '../../../components/app/schema';
import Button from '../../../components/buttons/Button';

function ExistingAdminEmployee() {
  const { control } = useForm();
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <form>
        <DynamicInput
          inputType={InputType.TEXT}
          key={'mail'}
          name="organizationEmail"
          desceription="Organization Email"
          control={control}
        />

        <Button type="submit" label="Send Invitation" fullwidth />
      </form>
    </Stack>
  );
}

export default ExistingAdminEmployee;
