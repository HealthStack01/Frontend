import { Box } from '@mui/material';
import React from 'react';
import Single from './Single';

interface Props {
  month?: string;
}

const GridRow: React.FC<Props> = ({ month = 'JAN' }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
        <Single status='attended' />
        <Single status='attended' />
        <Single status='attended' />
        <Single status='cancelled' />
        <Single status='absent' />
        <Single status='confirmed' />
        <Single status='confirmed' />
        <Single status='rescheduled' />
        <Single />
        <Single />
        <Single />
        <Single />
        <Single />
      </Box>

      <p>{month}</p>
    </Box>
  );
};

export default GridRow;
