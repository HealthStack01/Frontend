import React from 'react';

import { Checkbox, CheckboxLabel } from './styles';

interface Props {
  onClick?: () => void;
}

const SwitchButton: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <Checkbox type="checkbox" name="switch" id="switch" />
      <CheckboxLabel htmlFor="switch" onClick={onClick}>
        {/* <FormatListBulletedIcon />
        <AutoAwesomeMosaicIcon /> */}
      </CheckboxLabel>
    </>
  );
};

export default SwitchButton;
