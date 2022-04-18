import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { forwardRef } from 'react';

interface SnackbarProps {
  severity?: any;
  onClose: () => void;
  open: boolean;
  label?: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CustomSnackBar: React.FC<SnackbarProps> = ({
  severity = 'success',
  onClose,
  open,
  label = 'Success',
}) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {label}
    </Alert>
  </Snackbar>
);

export default CustomSnackBar;
