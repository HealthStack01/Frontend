import {useContext, useState} from "react";
import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Box} from "@mui/system";
import MessageIcon from "@mui/icons-material/Message";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import dayjs from "dayjs";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Badge from "@mui/material/Badge";
import client from "../../feathers";
import {ObjectContext, UserContext} from "../../context";
import {toast} from "react-toastify";
import {useNavigate, useLocation} from "react-router-dom";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const EachNotification = ({notification, closeDrawer}) => {
  const notificationsServer = client.service("notification");
  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleOpenOptions = event => {
    setAnchorEl(event.currentTarget);
  };

  const markAsSeen = async () => {
    const prevReads = notification.isRead;
    const documentId = notification._id;
    const userId = user.currentEmployee._id;
    showActionLoader();

    const newReads = [userId, ...prevReads];

    await notificationsServer
      .patch(documentId, {isRead: newReads})
      .then(res => {
        hideActionLoader();
        handleCloseOptions();
        toast.success("Notification successfully marked as read");
      })
      .catch(err => {
        console.log(err);
        hideActionLoader();
        toast.error(`Failed to mark notification as read ${err}`);
      });
  };

  const viewNotification = async () => {
    const notificationPath = notification.pageUrl || "/app";

    const prevReads = notification.isRead;
    const documentId = notification._id;
    const userId = user.currentEmployee._id;
    showActionLoader();

    const newReads = [userId, ...prevReads];

    await notificationsServer
      .patch(documentId, {isRead: newReads})
      .then(res => {
        hideActionLoader();
        handleCloseOptions();
        navigate(notificationPath);
        closeDrawer();
        //toast.success('Notification successfully marked as read');
      });

    // console.log(location.pathname);
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box>
        <IconButton
          onClick={handleOpenOptions}
          sx={{
            position: "absolute",
            right: "5px",
            top: "0px",
          }}
        >
          <MoreHorizIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={handleCloseOptions}
          anchorOrigin={{horizontal: "right", vertical: "center"}}
        >
          <MenuItem sx={{fontSize: "0.8rem"}} onClick={markAsSeen}>
            Mark as Read
          </MenuItem>

          <MenuItem sx={{fontSize: "0.8rem"}} onClick={viewNotification}>
            View Notification
          </MenuItem>
        </Menu>
      </Box>

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
        onClick={viewNotification}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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

          <Box
            //ml={0.6}
            sx={{
              width: "calc(100% - 48px)",
            }}
          >
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
    </Box>
  );
};

export default EachNotification;
