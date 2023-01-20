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
import client from "../../feathers";
import {UserContext} from "../../context";

const CustomLoader = () => (
  <div
    style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="/loading.gif"
      style={{width: "200px", height: "auto", display: "block"}}
    />
    <Typography sx={{marginTop: "-2rem", fontSize: "0.85rem"}}>
      Hold on, whilst we fetch your data...
    </Typography>
  </div>
);

const AppNotifications = () => {
  const notificationsServer = client.service("notification");
  const {user} = useContext(UserContext);
  //const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const getNotifications = useCallback(async () => {
    const userId = user.currentEmployee.userId;
    setLoading(true);

    if (!user.stacker) {
      const response = await notificationsServer.find({
        query: {
          facilityId: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          senderId: {
            $ne: user.currentEmployee.userId,
          },
          isRead: {$nin: [userId]},
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setNotifications(response.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const response = await notificationsServer.find({
          query: {
            $limit: 100,
            $sort: {
              facility: -1,
            },
          },
        });

        await setNotifications(response.data);
        setLoading(false);
      }
    }
  }, []);

  const updateNotifications = useCallback(async () => {
    const userId = user.currentEmployee.userId;
    if (user.currentEmployee) {
      const response = await notificationsServer.find({
        query: {
          facilityId: user.currentEmployee.facilityDetail._id,
          senderId: {
            $ne: user.currentEmployee.userId,
          },
          isRead: {$nin: [userId]},
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setNotifications(response.data);
      setLoading(false);
    } else {
      if (user.stacker) {
        const response = await notificationsServer.find({
          query: {
            senderId: {
              $ne: user.currentEmployee.userId,
            },
            isRead: {$nin: [userId]},
            $limit: 100,
            $sort: {
              facility: -1,
            },
          },
        });

        await setNotifications(response.data);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    notificationsServer.on("created", obj => updateNotifications());
    notificationsServer.on("updated", obj => updateNotifications());
    notificationsServer.on("patched", obj => updateNotifications());
    notificationsServer.on("removed", obj => updateNotifications());
  }, []);

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
          badgeContent={notifications.length}
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
            {notifications.length > 0 ? (
              <Box
                sx={{
                  width: "100%",
                  height: "calc(100vh - 6rem)",
                  overflowY: "auto",
                }}
              >
                {notifications.map((notification, i) => {
                  return (
                    <EachNotification
                      notification={notification}
                      key={i}
                      closeDrawer={() => setShowDrawer(false)}
                    />
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
