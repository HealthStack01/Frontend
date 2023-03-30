import {useContext} from "react";
import {Box} from "@mui/system";

import NoChatConversationSelected from "./NoConversation";
import ChatBoardConversation from "./Coverstation";
import {ObjectContext} from "../../../../../context";

const ChatBoard = () => {
  const {state} = useContext(ObjectContext);
  const activeChat = state.ChatModule.chatRoom !== null;
  return (
    <Box sx={{width: "100%", height: "100%"}}>
      {activeChat ? <ChatBoardConversation /> : <NoChatConversationSelected />}
    </Box>
  );
};

export default ChatBoard;
