import React from 'react';
import { Checkbox, CheckboxLabel } from './styles';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const SwitchButton = () => {
  return (
    <>
      <Checkbox type='checkbox' name='switch' id='switch' />
      <CheckboxLabel htmlFor='switch'>
        {/* <FormatListBulletedIcon />
        <AutoAwesomeMosaicIcon /> */}
      </CheckboxLabel>
    </>
  );
};

export default SwitchButton;
