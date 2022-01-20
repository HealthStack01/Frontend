import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalBox: React.FC<ModalProps> = ({ open, onClose, children }) => (
  <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <div>{children}</div>
    </Fade>
  </Modal>
);

export default ModalBox;
