import {useContext} from "react";
import {Box} from "@mui/system";

import NoChatConversationSelected from "./NoConversation";
import ChatBoardConversation from "./Coverstation";
import {ObjectContext} from "../../../../../context";

import GoogleAutoComplete from "../../../../../components/google-autocomplete";

const ChatBoard = () => {
  const {state} = useContext(ObjectContext);
  const activeChat = state.ChatRoom !== null;
  return (
    <Box sx={{width: "100%", height: "100%"}}>
      {activeChat ? <ChatBoardConversation /> : <NoChatConversationSelected />}
      {/* <GoogleAutoComplete /> */}
    </Box>
  );
};

export default ChatBoard;
