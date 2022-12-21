import * as React from "react";
import {Box, Typography} from "@mui/material";
import "./styles.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {TransitionProps} from "@mui/material/transitions";
import WarningIcon from "@mui/icons-material/Warning";

import {ObjectContext} from "../../context";
import GlobalCustomButton from "../buttons/CustomButton";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface componentProps {
  open: boolean;
  confirmationAction: () => null;
  cancelAction: () => null;
  type?: string | "danger" | "update" | "create" | "neutral" | "warning";
  message?: string;
  customActionButtonText?: string;
  customCancelButtonText?: string;
}

const CustomConfirmationDialog = ({
  open = false,
  confirmationAction,
  cancelAction,
  type = "neutral",
  message = "Are you sure you want to continue?",
  customActionButtonText = "Continue",
  customCancelButtonText = "Cancel",
}: componentProps) => {
  //const {state, setState} = useContext(ObjectContext);
  return (
    <Box>
      <Dialog
        open={open}
        onClose={cancelAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <div className="confirmation-dialog-container">
          <div className={`diaglog-color-head dialog-${type}`} />

          <div className="confirmation-dialog-content-container">
            <div className={`dialog-icon icon-${type}`}>
              <WarningIcon />
            </div>

            <div>
              <Typography sx={{fontSize: "0.95rem"}}>{message}</Typography>
            </div>
          </div>

          <div className="confirmation-dialog-actions-container">
            <GlobalCustomButton
              color="error"
              sx={{marginRight: "15px"}}
              onClick={cancelAction}
            >
              {customCancelButtonText}
            </GlobalCustomButton>

            <GlobalCustomButton color="success" onClick={confirmationAction}>
              {customActionButtonText}
            </GlobalCustomButton>
          </div>
        </div>
      </Dialog>
    </Box>
  );
};

export default CustomConfirmationDialog;
