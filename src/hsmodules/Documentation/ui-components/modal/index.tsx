import {Box, IconButton} from "@mui/material";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode | undefined;
  header?: string;
  width?: "string";
}
const style = {
  minWidth: "400px",
  minHeight: "400px",
  maxWidth: "90vw",
  maxHeight: "100%",
  bgcolor: "#FAFAFA",
  boxShadow: 24,
  p: 4,
  borderRadius: "6px",
  //minWidth: "100px !important",
};

const ModalBox: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  header,
  width = "auto",
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
        width: "100%",
        display: "grid",
        placeItems: "center ",
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div
            style={{
              height: "100%",
              width: width,
              overflowY: "auto",
            }}
          >
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h1
                style={{
                  color: "#33415C",
                  fontWeight: "500",
                  lineHeight: "1.5",
                  fontSize: "24px",
                  fontStyle: "SemiBold",
                }}
              >
                {header}
              </h1>

              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            {children}
          </div>
        </Box>
      </Fade>
    </Modal>
  </>
);

export default ModalBox;
