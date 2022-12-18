import React, {useContext} from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import {ObjectContext} from "../../context";
import {Box, Typography} from "@mui/material";

export default function ActionLoader() {
  const {state, setState} = useContext(ObjectContext);

  return (
    <div>
      <Backdrop
        sx={{color: "#fff", zIndex: "999999"}}
        open={state.actionLoader.open}
        //open={true}

        //onClick={handleClose}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          gap={2}
        >
          <CircularProgress color="inherit" />
          {state.actionLoader.message && (
            <Typography>{state.actionLoader.message}</Typography>
          )}
        </Box>
      </Backdrop>
    </div>
  );
}
