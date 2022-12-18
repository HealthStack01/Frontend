import {Box, IconButton} from "@mui/material";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode | undefined;
  header?: "string";
  width?: "string";
}

const ModalBox: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  header,
  width,
}) => {
  const style = {
    minWidth: "24rem",
    width: width ? width : "auto%",
    maxWidth: "95vw",
    minHeight: "150px",

    maxHeight: "95vh",
    bgcolor: "#fff",
    boxShadow: 24,
    p: 2,
    borderRadius: "6px",
    overflow: "auto",
  };

  return (
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div
              style={{
                height: "100%",
                overflowY: "hidden",
              }}
            >
              {header && (
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  mb={1}
                  pl={2}
                  //pr={2}
                >
                  <h1
                    style={{
                      color: "#33415C",
                      fontWeight: "500",
                      lineHeight: "1.5",
                      fontSize: "18px",
                      fontStyle: "SemiBold",
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
              <Box
                sx={{
                  overflowY: "scroll",
                  padding: "10px",
                }}
              >
                {children}
              </Box>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalBox;
