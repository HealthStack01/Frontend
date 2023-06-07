import {useContext, useState, useEffect} from "react";
import {Box, Typography} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import dayjs from "dayjs";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import "./styles.scss";
import {UserContext} from "../../../../../context";
import moment from "moment";

const EachChatMessage = ({message}) => {
  const {user} = useContext(UserContext);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const isSent = message.createdbyId === user.currentEmployee._id;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "2rem",
        display: "flex",
        alignItems: "center",
        marginBottom: "12px",
        justifyContent: isSent ? "flex-end" : "flex-start",
        padding: "15px 6%",
      }}
    >
      <Box
        className={`each-message-container ${
          isSent ? "sent-message" : "received-message"
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
            <span>{moment(message.createdAt).format("LT")}</span>
            {isSent && <DoneAllIcon sx={{color: "#f6fff8"}} />}
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default EachChatMessage;
