import { Stack } from '@mui/material';
import React, { useState } from 'react';

import Input from '../../../components/inputs/basic/Input';
import CustomSelect from '../../../components/inputs/basic/Select';
import { createOrganizationData } from '../../../utils/data';

function CreateOrganization() {
  const [values, setValues] = useState({});

  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <form action="">
        {createOrganizationData.map((data, index) => {
          const { name, options, label } = data;

          if (!options) {
            return (
              <Input
                {...data}
                name={name}
                key={index}
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            );
          }
          return (
            <CustomSelect
              {...data}
              name={name}
              label={label}
              key={index}
              options={options}
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
          );
        })}
      </form>
    </Stack>
  );
}

export default CreateOrganization;
