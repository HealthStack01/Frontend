import { Box } from '@mui/material';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import React from 'react';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}
const style = {
  width: '68%',
  maxWidth: '90%',
  height: '80%',
  maxHeight: '100%',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  minWidth: '350px !important',
};

const ModalBox: React.FC<ModalProps> = ({ open, onClose, children }) => (
  <>
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={onClose}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ width: '100%', display: 'grid', placeItems: 'center ' }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div style={{ height: '100%', overflowY: 'auto' }}>{children}</div>
        </Box>
      </Fade>
    </Modal>
  </>
);

export default ModalBox;
