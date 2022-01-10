import React, { forwardRef, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarProps {
  severity?: any;
  onClose: () => void;
  open: boolean;
  label?: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const CustomSnackBar: React.FC<SnackbarProps> = ({
  severity = 'success',
  onClose,
  open,
  label = 'Success',
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {label}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
