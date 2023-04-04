import {useContext, useState} from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {ObjectContext} from "../../../../../context";

const ChatConversationHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {state, setState} = useContext(ObjectContext);

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleOpenOptions = event => {
    setAnchorEl(event.currentTarget);
  };

  const showSearchInput = () => {
    setState(prev => ({
      ...prev,
      ChatModule: {
        ...prev.ChatModule,
        showSearch: true,
      },
    }));
  };

  const showRightSideBar = () => {
    setState(prev => ({
      ...prev,
      ChatModule: {
        ...prev.ChatModule,
        rightSideBar: true,
      },
    }));
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Avatar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            //gap: 0.4,
          }}
        >
          <Typography
            sx={{fontSize: "0.8rem", fontWeight: "600", color: "#2d2d2d"}}
          >
            John Doe
          </Typography>
          <Typography sx={{fontSize: "0.7rem", color: "#6c757d"}}>
            Doctor, Admin
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton onClick={showSearchInput}>
          <SearchIcon />
        </IconButton>

        <IconButton onClick={handleOpenOptions}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={handleCloseOptions}
          anchorOrigin={{horizontal: "right", vertical: "bottom"}}
          // sx={{padding: 0}}
        >
          <MenuItem
            sx={{fontSize: "0.8rem"}}
            onClick={() => {
              showRightSideBar();
              handleCloseOptions();
            }}
          >
            User Profile
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default ChatConversationHeader;
