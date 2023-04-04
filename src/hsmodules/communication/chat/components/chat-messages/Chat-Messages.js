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

  const msgs = [
    {
      message: "hello, how are you doing ?",
      isSent: true,
    },
    {
      message: "I'm doing great, how about you?",
      isSent: false,
    },
    {
      message: "I'm good as well",
      isSent: true,
    },
    {
      message: "That's great to hear",
      isSent: false,
    },
    {
      message: "How are your kids? wife and work as well",
      isSent: false,
    },
    {
      message: "also heard you relocated from Lagos to the UK..",
      isSent: false,
    },
    {
      message: "Fams and work are all good, thank God",
      isSent: true,
    },

    {
      message: "Yes oh, I now stay in the UK",
      isSent: true,
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      isSent: false,
    },
    {
      message:
        "Leprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      isSent: false,
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      isSent: true,
    },
  ];

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
          overflowY: "scroll",
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
