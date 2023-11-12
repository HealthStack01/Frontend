import {useState, useRef, useEffect, useCallback, useContext} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import Slide from "@mui/material/Slide";
import Highlighter from "react-highlight-words";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import "./styles.scss";
import moment from "moment";
import {ObjectContext, UserContext} from "../../context";

const EachChatMessage = ({
  messageObj,
  searchValue,
  chatBoxContainerRef,
  markAsSeen,
}) => {
  const {user} = useContext(UserContext);

  const {message, _id, senderId, time, sender, status, dp} = messageObj;
  const currentUser = user.currentEmployee.userId;
  const isUserMsg = currentUser === senderId;

  const healthstackId = "63d275e3b40a06001641ef71";

  useEffect(() => {
    if (isUserMsg || messageObj.seen.includes(currentUser)) return;

    markAsSeen(messageObj);
  }, []);

  const messageStatus = status => {
    switch (status.toLowerCase()) {
      case "delivered":
        return (
          <Typography style={{color: "#17935C", fontSize: "0.75rem"}}>
            {status}
          </Typography>
        );

      case "seen":
        return (
          <Typography style={{color: "#FFA500", fontSize: "0.75rem"}}>
            {status}
          </Typography>
        );

      case "failed":
        return (
          <Typography style={{color: "#ED0423", fontSize: "0.75rem"}}>
            {status}
          </Typography>
        );

      default:
        break;
    }
  };

  const isAdmin =
    messageObj?.senderOrgId === healthstackId ||
    sender.toLowerCase() === "healthstack admin";

  return (
    <Slide direction="right" in={true} container={chatBoxContainerRef.current}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: isUserMsg ? "flex-end" : "flex-start",
        }}
      >
        {isUserMsg && (
          <Avatar
            src={dp}
            sx={{width: "40px", height: "40px", marginRight: "7px"}}
          />
        )}
        <Box
          sx={{
            width: "calc(100% - 50px)",
            padding: "10px",
            boxShadow: 3,
            borderRadius: "7.5px",
            backgroundColor: isAdmin
              ? "#344E41"
              : !isAdmin && isUserMsg
              ? "#f8f7ff"
              : "#0064CC",
          }}
          mb={2}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            mb={0.7}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: isUserMsg ? "#0064CC" : "#ffffff",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                {`${sender} ${
                  messageObj.senderOrgName && !isAdmin
                    ? `(${messageObj.senderOrgName})`
                    : ""
                }`}
                {isAdmin && <AdminPanelSettingsIcon sx={{fill: "#FFB703"}} />}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: isUserMsg ? "#2d2d2d" : "#ffffff",
              }}
            >
              {moment(time).calendar()}
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: isUserMsg ? "#000000" : "#ffffff",
              }}
            >
              <Highlighter
                highlightClassName="chat-message-highlight-search"
                searchWords={[`${searchValue}`]}
                autoEscape={true}
                textToHighlight={message}
                activeIndex={1}
              />
              <div style={{width: "50px"}} />
            </Typography>

            <Box
              sx={{
                width: "100%",
                //position: "absolute",
                right: 0,
                bottom: "0px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {isUserMsg && messageStatus(status)}
            </Box>
          </Box>
        </Box>
        {!isUserMsg && (
          <Avatar
            src={dp}
            sx={{width: "40px", height: "40px", marginLeft: "7px"}}
          />
        )}
      </Box>
    </Slide>
  );
};

export default EachChatMessage;
