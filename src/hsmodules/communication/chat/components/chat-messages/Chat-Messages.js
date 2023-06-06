import {useContext, useState} from "react";
import {Box} from "@mui/material";

import EachChatMessage from "./Each-Message";
import MessageSearchInput from "../search-input/Search-Input";
import {ObjectContext} from "../../../../../context";

const ChatConversationMessages = ({messages}) => {
  const {state} = useContext(ObjectContext);
  //const [messages, setMessages] = useState([]);
  //const [showSearch, setShowSearch] = useState(true);

  const {searchValue} = state.ChatModule;

  const searchedMessages = messages.filter(message => {
    if (searchValue === "") return message;
    if (message.message?.toLowerCase().includes(searchValue.toLowerCase()))
      return message;
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          //overflowY: "scroll",
        }}
      >
        {searchedMessages.map((msg, i) => (
          <Box key={i}>
            <EachChatMessage message={msg} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ChatConversationMessages;
