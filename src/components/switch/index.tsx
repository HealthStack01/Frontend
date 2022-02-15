import React from 'react';

import { Checkbox, CheckboxLabel } from './styles';

const SwitchButton = () => {
  return (
    <>
      <Checkbox type="checkbox" name="switch" id="switch" />
      <CheckboxLabel htmlFor="switch">
        {/* <FormatListBulletedIcon />
        <AutoAwesomeMosaicIcon /> */}
      </CheckboxLabel>
    </>
  );
};

export default SwitchButton;
