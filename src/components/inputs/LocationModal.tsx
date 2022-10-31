import { Portal } from '@mui/material';
import React from 'react';
import { GridWrapper } from '../../hsmodules/app/styles';

import { FlexBox } from '../../ui/styled/global';
import ModalBox from '../modal';
import LocationCard from './LocationCard';

const LocationModal = ({ locations, onSelectLocation, open, setOpen }) => {
  const closeModal = () => setOpen(false);
  return (
    <Portal>
      <ModalBox open={open}>
        <FlexBox className="row">
          <h4>Select a location</h4>
        </FlexBox>

        <GridWrapper>
          {locations.map((location, index) => (
            <LocationCard
              key={index}
              location={location}
              onClick={() => {
                closeModal();
                onSelectLocation(location.location);
              }}
            />
          ))}
        </GridWrapper>
      </ModalBox>
    </Portal>
  );
};

export default LocationModal;
