import { Stack } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../components/buttons/Button';
import Input from '../../../components/inputs/basic/Input';
import CustomSelect from '../../../components/inputs/basic/Select';
import {
  countriesOptions,
  departmentOptions,
  statesOptions,
  unitsOptions,
} from '../../../utils/data';

const NewEmployee = () => {
  const [values, setValues] = useState({});
  console.log(values);

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
        <Input
          label='Email Address'
          type='email'
          name='email'
          onChange={e =>
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            })
          }
        />
        <Input
          label='Phone Number'
          type='tel'
          name='phoneNumber'
          onChange={e =>
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            })
          }
        />
        <CustomSelect
          label='Country'
          options={countriesOptions}
          name='country'
          onChange={e =>
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            })
          }
        />
        <CustomSelect
          label='State'
          options={statesOptions}
          name='state'
          onChange={e =>
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            })
          }
        />
        <CustomSelect
          label='Department'
          options={departmentOptions}
          name='Department'
          onChange={e =>
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            })
          }
        />
        <CustomSelect
          label='Unit'
          options={unitsOptions}
          name='unit'
          onChange={e =>
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            })
          }
        />

        <Button type='submit' label='Create Admin' fullwidth />
      </form>
    </Stack>
  );
};

export default NewEmployee;
