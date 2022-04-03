import React from 'react';

import { LocationCardWrapper } from '../../ui/styled/global';

const LocationCard = ({ title, onClick }) => {
  return <LocationCardWrapper onClick={onClick}>{title}</LocationCardWrapper>;
};

export default LocationCard;
