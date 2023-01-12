import {useState, useEffect, useContext, useCallback} from "react";
import {Badge, Box, IconButton, Typography} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

import {FormsHeaderText} from "../texts";
import GlobalCustomButton from "../buttons/CustomButton";

import {dummyNotifications} from "./data";
import EachNotification from "./EachNotification";

import no_notification_gif from "./assets/no_notification.gif";

const AppNotifications = () => {
  const [notifications, setNotification] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Box>
      <IconButton
        sx={{
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => setShowDrawer(true)}
      >
        <Badge
          badgeContent={4}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        onOpen={() => setShowDrawer(true)}
        //hysteresis={0}
      >
        <Box
          sx={{
            width: "450px",
            height: "100vh",
            overflowY: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e9ecef",
              backgroundColor: "#f8f9fa",
            }}
            pl={1.5}
            pr={1}
          >
            <FormsHeaderText text="Notifications" />

            <IconButton onClick={() => setShowDrawer(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box
            sx={{
              width: "100%",
              minheight: "calc(100vh - 6rem)",
            }}
          >
            {dummyNotifications.length > 0 ? (
              <Box
                sx={{
                  width: "100%",
                  height: "calc(100vh - 6rem)",
                  overflowY: "auto",
                }}
              >
                {dummyNotifications.map((notification, i) => {
                  return (
                    <EachNotification notification={notification} key={i} />
                  );
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={no_notification_gif}
                  alt="No Notifcation"
                  style={{width: "400px", height: "auto", display: "block"}}
                />
                <Typography sx={{fontSize: "0.8rem"}}>
                  You don't have any Notification at the moment
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTop: "1px solid #e9ecef",
              backgroundColor: "#f8f9fa",
            }}
          >
            <GlobalCustomButton>View All</GlobalCustomButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AppNotifications;
