import { Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../components/buttons/Button';
import DynamicInput from '../../../components/inputs/DynamicInput';
import { InputType } from '../../app/schema';

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
