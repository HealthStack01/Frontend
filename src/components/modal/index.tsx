import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}
const style = {
  width: '40%',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
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
      sx={{ width: '100%', display: 'grid', placeItems: 'center' }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  </>
);

export default ModalBox;
