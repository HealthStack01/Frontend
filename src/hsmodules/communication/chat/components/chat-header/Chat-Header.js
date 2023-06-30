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

import {ObjectContext, UserContext} from "../../../../../context";
import client from "../../../../../feathers";
import {toast} from "react-toastify";
import {returnAvatarString} from "../../../../helpers/returnAvatarString";

const ChatConversationHeader = () => {
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const chatroomServer = client.service("chatroom");
  const [anchorEl, setAnchorEl] = useState(null);

  const chatRoom = state.ChatRoom;

  const chatPartner = chatRoom.members.find(
    item => item._id !== user.currentEmployee._id
  );

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

  const handleDeleteChat = () => {
    const chat_id = state.ChatRoom._id;

    chatroomServer
      .remove(chat_id)
      .then(res => {
        setState(prev => ({
          ...prev,

          ChatRoom: null,
        }));
        toast.success("You have successfully deleted a chat");
      })
      .catch(error => {
        toast.error(`An error occured trying to delete chat - ${error}`);
      });
  };

  const handleCloseChat = () => {
    setState(prev => ({
      ...prev,
      ChatRoom: null,
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
        {chatRoom.chatType === "personal" ? (
          <Avatar
            {...returnAvatarString(`${chatPartner?.name}`)}
            src={chatPartner?.imageurl}
          />
        ) : (
          <Avatar src="https://www.pngkit.com/png/detail/128-1284523_group-chat-icon-google-group-chat-icon.png" />
        )}

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
            {chatRoom.chatType === "personal"
              ? chatPartner?.name
              : chatRoom.name}
          </Typography>
          <Typography sx={{fontSize: "0.7rem", color: "#6c757d"}}>
            {chatRoom.chatType === "personal"
              ? chatPartner.profession
              : chatRoom.description}
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
            sx={{
              fontSize: "0.8rem",
              display: chatRoom.chatType === "personal" ? "flex" : "none",
            }}
            onClick={() => {
              showRightSideBar();
              handleCloseOptions();
            }}
          >
            User Profile
          </MenuItem>

          <MenuItem
            sx={{
              fontSize: "0.8rem",
              display: chatRoom.chatType !== "personal" ? "flex" : "none",
            }}
            onClick={() => {
              showRightSideBar();
              handleCloseOptions();
            }}
          >
            View Members
          </MenuItem>

          <MenuItem
            sx={{fontSize: "0.8rem"}}
            onClick={() => {
              handleCloseChat();
              handleCloseOptions();
            }}
          >
            Close Chat
          </MenuItem>

          <MenuItem
            sx={{fontSize: "0.8rem", color: "red"}}
            onClick={() => {
              handleDeleteChat();
              handleCloseOptions();
            }}
          >
            Delete Chat
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default ChatConversationHeader;
