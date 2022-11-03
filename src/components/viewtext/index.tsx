import { Box } from '@mui/material';
import React from 'react';

interface Props {
  label: string;
  text: string;
}

const ViewText: React.FC<Props> = ({ label, text }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <h2>{label}</h2>
      <p>{text}</p>
    </Box>
  );
};

export default ViewText;
