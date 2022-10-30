import React from 'react';

import { LocationCardWrapper } from '../../ui/styled/global';

const LocationCard = ({ location, onClick }) => {
  return (
    <LocationCardWrapper onClick={() => onClick(location.value)}>
      {location.label}
    </LocationCardWrapper>
  );
};

export default LocationCard;
