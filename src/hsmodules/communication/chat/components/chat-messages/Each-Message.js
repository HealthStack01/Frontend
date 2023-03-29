import {Box, Typography} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import "./styles.scss";

const EachChatMessage = ({message}) => {
  const isSent = true;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "2rem",
        display: "flex",
        alignItems: "center",
        marginBottom: "12px",
        justifyContent: message.isSent ? "flex-end" : "flex-start",
        padding: "15px 6%",
      }}
    >
      <Box
        className={`each-message-container ${
          message.isSent ? "sent-message" : "received-message"
        }`}
      >
        <div className="message">
          <p> {message.message}</p>
          <Box
            sx={{
              width: "100%",
              //position: "absolute",
              right: 0,
              bottom: "0px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <span>1min</span>
            {message.isSent && <DoneAllIcon sx={{color: "#f6fff8"}} />}
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default EachChatMessage;
