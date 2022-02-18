import React from 'react';
import { Checkbox, CheckboxLabel } from './styles';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

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
