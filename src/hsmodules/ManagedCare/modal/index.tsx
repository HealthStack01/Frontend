import { Box, IconButton } from '@mui/material';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode | undefined;
  header?: 'string';
  width?: 'string';
}
const style = {
  minWidth: '800px',
  maxWidth: '95vw',
  minHeight: '200px',

  maxHeight: '95vh',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  overflow: 'scroll',
  //minWidth: "100px !important",
};

const ModalBox: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  header,
}) => (
  <>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        width: '100%',
        display: 'grid',
        placeItems: 'center ',
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div
            style={{
              height: '100%',
              overflowY: 'scroll',
            }}
          >
            {header && (
              <Box
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                mb={2}
              >
                <h1
                  style={{
                    color: '#33415C',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    fontSize: '20px',
                    fontStyle: 'SemiBold',
                  }}
                >
                  {header}
                </h1>

                {onClose && (
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            )}

            {children}
          </div>
        </Box>
      </Fade>
    </Modal>
  </>
);

export default ModalBox;
