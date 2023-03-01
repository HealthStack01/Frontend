// import React from 'react';

// import { Checkbox, CheckboxLabel } from './styles';

// interface Props {
//   onClick?: () => void;
// }

// const SwitchButton: React.FC<Props> = ({ onClick }) => {
//   return (
//     <>
//       <Checkbox type="checkbox" name="switch" id="switch" />
//       <CheckboxLabel htmlFor="switch" onClick={onClick}>
//         <FormatListBulletedIcon />
//         <AutoAwesomeMosaicIcon />
//       </CheckboxLabel>
//     </>
//   );
// };

// export default SwitchButton;
import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const items = [
  {
    label: 'List',
    selected: true,
  },
  {
    label: 'Grid',
    selected: false,
  },
];

interface SwitchProps {
  children: React.ReactNode;
}

const Switch: React.FC<SwitchProps> = ({ children }) => {
  const [checked, setChecked] = useState<boolean>(true);

  console.log(checked);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: 0.5,
        px: 0.9,
        background: '#f8f8f8',
        border: '1px solid #0364FF',
        color: 'blue',
        ml: 1,
        borderRadius: '4px',
        marginLeft: '2rem',
      }}
      className="filter-switch"
      spacing={1}
    >
      {children}
    </Stack>
  );
};

export default Switch;
