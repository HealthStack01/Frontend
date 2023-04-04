import {useContext, useState} from "react";
import {Box, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ChatInputBox from "../chat-input/ChatInput";
import ChatHeader from "../chat-header/Chat-Header";
import ChatMessages from "../chat-messages/Chat-Messages";
import MessagesSearchInput from "../search-input/Search-Input";
import {ObjectContext} from "../../../../../context";

const ChatBoardConversation = () => {
  const {state, setState} = useContext(ObjectContext);
  const [messages, setMessages] = useState([]);

  const {showSearch, rightSideBar} = state.ChatModule;

  const hideSearchInput = () => {
    setState(prev => ({
      ...prev,
      ChatModule: {
        ...prev.ChatModule,
        showSearch: false,
      },
    }));
  };

  const hideRightSideBar = () => {
    setState(prev => ({
      ...prev,
      ChatModule: {
        ...prev.ChatModule,
        rightSideBar: false,
      },
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          //width: "100%",
          flex: "50% 1",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          flex: 1,
          WebkitTransition: "all 0.5s ease;",
          MozTransition: "all 0.5s ease;",
          transition: "all 0.5s ease;",
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
          <ChatMessages messages={messages} />
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
          <ChatInputBox setMessages={setMessages} />
        </Box>
      </Box>

      <Box
        sx={{
          width: rightSideBar ? "400px" : 0,
          minWidth: 0,
          height: "100%",
          transition: "all 0.3s ease-in-out",
          overflowX: "hidden",
          display: "flex",
          //flex: sideBar ? "0.5" : 0,
          backgroundColor: "#ffffff",
          //borderLeft: "1px solid #ced4da",
          borderLeft: rightSideBar ? "1px solid #ced4da" : "none",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 15px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Box></Box>

          <IconButton onClick={hideRightSideBar}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBoardConversation;
