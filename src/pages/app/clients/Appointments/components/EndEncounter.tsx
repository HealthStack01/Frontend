import { Portal } from '@mui/material';
import React, { useState } from 'react';

import Button from '../../../../../components/buttons/Button';
import ModalBox from '../../../../../components/modal';
import { FlexBox, LocationCardWrapper } from '../../../../../ui/styled/global';
import { GridWrapper } from '../../../styles';

const endEncounterOptions = [
  'Continue Management',
  'Set Next Appointment',
  'Discharge',
  'Admit to Ward',
  'Refer',
  'Dead',
];

const EndEncounter = ({ onEndEncounter }) => {
  const [open, setOpen] = useState<any>();
  return open ? (
    <Portal>
      <ModalBox open={open} onClose={() => setOpen(false)}>
        <FlexBox className="row">
          <h4>End Encounter</h4>
        </FlexBox>

        <GridWrapper>
          {endEncounterOptions.map((step, index) => (
            <LocationCardWrapper
              key={index}
              onClick={() => onEndEncounter(step)}
            >
              {step}
            </LocationCardWrapper>
          ))}
        </GridWrapper>
      </ModalBox>
    </Portal>
  ) : (
    <Button
      label={'End Encounter'}
      background={'#ff0000'}
      color={'#fff'}
      onClick={() => setOpen(true)}
    />
  );
};

export default EndEncounter;
