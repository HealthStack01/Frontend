import { Box, FormGroup, Stack } from '@mui/material';
import React, { useState } from 'react';

import CheckboxInput from '../../../components/inputs/basic/Checkbox';
import { modules } from '../../../utils/data';

function SelectModule() {
  const [values, setValues] = useState({});

  return (
    <Stack spacing={3} sx={{ width: '100%', mt: 4, mb: 4 }}>
      <form action="">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <FormGroup>
            {modules.first.map((module, index) => (
              <CheckboxInput
                label={module}
                key={index}
                name={module}
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ))}
          </FormGroup>
          <FormGroup>
            {modules.second.map((module, index) => (
              <CheckboxInput
                label={module}
                key={index}
                name={module}
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ))}
          </FormGroup>
        </Box>
      </form>
    </Stack>
  );
}

export default SelectModule;
