import {Box} from "@mui/system";

import NoChatConversationSelected from "./NoConversation";
import ChatBoardConversation from "./Coverstation";

const ChatBoard = () => {
  const activeChat = false;
  return (
    <Box sx={{width: "100%", height: "100%"}}>
      {activeChat ? <ChatBoardConversation /> : <NoChatConversationSelected />}
    </Box>
  );
};

export default ChatBoard;
