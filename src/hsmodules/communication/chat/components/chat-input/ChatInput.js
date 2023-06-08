import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import {useContext, useState, useRef} from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AddIcon from "@mui/icons-material/Add";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Popover from "@mui/material/Popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import "./styles.scss";
import {ObjectContext, UserContext} from "../../../../../context";
import dayjs from "dayjs";
import client from "../../../../../feathers";
import {toast} from "react-toastify";

const GeneralChatInputBox = () => {
  const chatMessagesServer = client.service("chat");
  const {state} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [inputMessage, setInputMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileAnchorEl, setFileAnchorEl] = useState(null);

  const selectedChat = state.ChatModule.chatRoom;

  const inputRef = useRef(null);

  const showEmojis = event => {
    setAnchorEl(event.currentTarget);
  };

  const hideEmojis = () => {
    inputRef.current.focus();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = e => {
    const value = e.target.value;

    setInputMessage(value);
  };

  const handleEmoji = emoji => {
    setInputMessage(prev => prev.concat(emoji.native));
  };

  const handleCloseOptions = () => {
    setFileAnchorEl(null);
  };

  const handleOpenOptions = event => {
    setFileAnchorEl(event.currentTarget);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "")
      return toast.warning("You can't send an invalid message");
    const employee = user.currentEmployee;

    //  chatroom:{ type: Schema.Types.Mixed,  },
    // chatroomId:{ type: Schema.Types.ObjectId,},

    // return toast.error("Can't send messages at the moment");

    const message = {
      subject: "new-message",
      chatroom: selectedChat,
      chatroomId: selectedChat?._id,
      messageType: "text",
      message: inputMessage,
      status: "sent",
      createdby: employee,
      createdbyId: employee._id,
      geolocation: {
        type: "Point",
        coordinates: [state.coordinates.latitude, state.coordinates.longitude],
      },
      createdAt: dayjs(Date.now()).toISOString(),
    };

    // return console.log(message);

    chatMessagesServer
      .create(message)
      .then(res => {
        toast.success("Message sent.");
        setInputMessage("");
      })
      .catch(error => {
        toast.error(`Message failed ${error}`);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
        padding: "0 15px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80px",
        }}
      >
        <>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={hideEmojis}
            sx={{
              top: -60,
            }}
          >
            <Picker
              data={data}
              onEmojiSelect={handleEmoji}
              previewPosition="none"
              theme="light"
            />
          </Popover>

          <IconButton onClick={showEmojis}>
            <EmojiEmotionsIcon />
          </IconButton>
        </>

        <IconButton onClick={handleOpenOptions}>
          <AddIcon />
        </IconButton>

        <Menu
          anchorEl={fileAnchorEl}
          id="account-menu"
          open={Boolean(fileAnchorEl)}
          onClose={handleCloseOptions}
          anchorOrigin={{horizontal: "right", vertical: "bottom"}}
          // sx={{padding: 0}}
        >
          <MenuItem
            sx={{fontSize: "0.8rem"}}
            onClick={() => {
              handleCloseOptions();
            }}
          >
            Image
          </MenuItem>
          <MenuItem
            sx={{fontSize: "0.8rem"}}
            onClick={() => {
              handleCloseOptions();
            }}
          >
            Video
          </MenuItem>{" "}
          <MenuItem
            sx={{fontSize: "0.8rem"}}
            onClick={() => {
              handleCloseOptions();
            }}
          >
            Document
          </MenuItem>
        </Menu>
      </Box>

      <Box
        sx={{
          width: "calc(100% - 140px)",
        }}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            className="general-chat-input-box"
            placeholder="Enter your message..."
            tabIndex="0"
            value={inputMessage}
            onChange={handleChange}
            ref={inputRef}
          />
        </form>
      </Box>

      <IconButton>
        <KeyboardVoiceIcon />
      </IconButton>
    </Box>
  );
};

export default GeneralChatInputBox;
