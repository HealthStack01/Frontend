import {Box, IconButton} from "@mui/material";
import {useContext, useState, useRef} from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AddIcon from "@mui/icons-material/Add";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Popover from "@mui/material/Popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import "./styles.scss";
import {ObjectContext, UserContext} from "../../../../../context";

const GeneralChatInputBox = () => {
  const {state} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [inputMessage, setInputMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleSendMessage = () => {};

  const handleChange = e => {
    const value = e.target.value;

    setInputMessage(value);
  };

  const handleEmoji = emoji => {
    setInputMessage(prev => prev.concat(emoji.native));
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
              //top: "calc(100vh - 410px)",

              top: -60,
            }}

            // anchorOrigin={{
            //   vertical: "bottom",
            //   horizontal: "left",
            // }}
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

        <IconButton>
          <AddIcon />
        </IconButton>
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
