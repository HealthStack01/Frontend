import {useState, useEffect, useContext, useCallback} from "react";
import {Badge, Box, IconButton} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

import {FormsHeaderText} from "../texts";
import GlobalCustomButton from "../buttons/CustomButton";

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
              minheight: "calc=(100vh - 6rem)",
            }}
          ></Box>

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
