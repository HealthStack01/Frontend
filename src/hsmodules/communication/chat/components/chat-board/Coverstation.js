import {useContext} from "react";
import {Box} from "@mui/material";

import ChatInputBox from "../chat-input/ChatInput";
import ChatHeader from "../chat-header/Chat-Header";
import ChatMessages from "../chat-messages/Chat-Messages";
import MessagesSearchInput from "../search-input/Search-Input";
import {ObjectContext} from "../../../../../context";

const ChatBoardConversation = () => {
  const {state, setState} = useContext(ObjectContext);

  const {showSearch} = state.ChatModule;

  const hideSearchInput = () => {
    setState(prev => ({
      ...prev,
      ChatModule: {
        ...prev.ChatModule,
        showSearch: false,
      },
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: showSearch ? "flex" : "none",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          transition: "1s ease-in-out",
          zIndex: 99,
        }}
      >
        <Box
          onClick={hideSearchInput}
          sx={{
            width: "100%",
            height: "100%",

            background: " rgba(0,0,0,0.1)",
            //zIndex: 99,
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            zIndex: 9,
          }}
        >
          <MessagesSearchInput />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <ChatHeader />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 120px)",
          position: "relative",
        }}
      >
        <ChatMessages />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <ChatInputBox />
      </Box>
    </Box>
  );
};

export default ChatBoardConversation;
