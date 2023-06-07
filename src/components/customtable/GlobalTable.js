import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const GlobalTable = () => {
  return (
    <Table style={{ border: '1px solid #a6a6a6', marginBottom:"20px",  borderRadius: '8px',borderCollapse: 'separate', borderSpacing: '0 8px' }}>
      <TableHead>
        <TableRow style={{ backgroundColor: '#ecf3ff' }}>
          <TableCell style={{ fontWeight: 'bold' }}>Unaided</TableCell>
          <TableCell style={{ fontWeight: 'bold' }}>Aided</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow style={{ border: '1px solid #000' }}>
          <TableCell>RVA</TableCell>
          <TableCell>RVA</TableCell>
        </TableRow>
        <TableRow style={{ border: '1px solid #000' }}>
          <TableCell>LVA</TableCell>
          <TableCell>LVA</TableCell>
        </TableRow>
        <TableRow style={{ border: '1px solid #000' }}>
          <TableCell>NV</TableCell>
          <TableCell>NV</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default GlobalTable;
