import { Portal } from '@mui/material';
import React, { useState } from 'react';

import LocationCard from '../pages/app/admin/Bands/LocationCard';
import { GridWrapper } from '../pages/app/styles';
import { FlexBox } from '../ui/styled/global';
import ModalBox from './modal';

const LocationModal = ({ data }) => {
  const [open, setOpen] = useState<boolean>(true);
  const closeModal = () => setOpen(false);
  return (
    <Portal>
      <ModalBox open={open} onClose={closeModal}>
        <FlexBox className="row">
          <h4>Select a location</h4>
          <button
            onClick={closeModal}
            style={{
              borderRadius: '32px',
              background: '#f3f3f3',
              border: 'none',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              margin: '1rem 0',
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </FlexBox>

        <GridWrapper>
          {data.map((dt) => (
            <LocationCard title={dt} onClick={closeModal} />
          ))}
        </GridWrapper>
      </ModalBox>
    </Portal>
  );
};

export default LocationModal;
