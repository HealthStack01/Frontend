import {IconButton, Typography} from "@mui/material";
import {Box} from "@mui/system";
import MessageIcon from "@mui/icons-material/Message";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import dayjs from "dayjs";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Badge from "@mui/material/Badge";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const EachNotification = ({notification}) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px 10px",
        borderBottom: "1px solid #f0f0f0",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#415a77",
            color: "#ffffff",
          }}
        >
          {notification.type == "message" ? (
            <MessageIcon fontSize="small" />
          ) : (
            <RemoveCircleIcon fontSize="small" />
          )}
        </Box>

        <Box ml={0.8}>
          <Typography sx={{fontSize: "0.8rem", color: "#1976d2"}}>
            {notification.title}
          </Typography>
          <Typography sx={{fontSize: "0.75rem"}}>
            {notification.description}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: "#006d77",
          }}
        >
          {dayjs(notification.createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default EachNotification;
