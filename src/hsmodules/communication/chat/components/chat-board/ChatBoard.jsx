import {Box} from "@mui/system";

import NoChatConversationSelected from "./NoConversation";

const ChatBoard = () => {
  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <NoChatConversationSelected />
    </Box>
  );
};

export default ChatBoard;
