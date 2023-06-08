import {useContext, useEffect, useState} from "react";
import {Box} from "@mui/material";

import EachChatMessage from "./Each-Message";
import MessageSearchInput from "../search-input/Search-Input";
import {ObjectContext} from "../../../../../context";
import moment from "moment";

const ChatConversationMessages = ({messages}) => {
  const [searchValue, setSearchValue] = useState("");
  const {state} = useContext(ObjectContext);

  const groupMessagesByDate = (array, token) => {
    return array.reduce(function (val, obj) {
      let comp = moment(obj["createdAt"]).format(token);

      (val[comp] = val[comp] || []).push(obj);
      return val;
    }, []);
  };

  const groupedMessages = messages ? groupMessagesByDate(messages, "D") : [];

  useEffect(() => {
    setSearchValue(state.ChatModule.searchValue);
  }, [state.ChatModule.searchValue]);

  const searchedMessages = messages.filter(message => {
    if (searchValue.length <= 2 || searchValue.trim() === "") return message;
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
        {groupedMessages.map(group => {
          const time = group[0].createdAt;
          const messagesDay = moment(time);
          const currentDay = moment(new Date());
          const prevDay = moment().subtract(1, "day");
          const weekDifference = currentDay.diff(messagesDay, "weeks");
          const isCurrentDay = messagesDay.isSame(currentDay, "day");
          const isPrevDay = messagesDay.isSame(prevDay, "day");
          return (
            <Box
              key={group[0]._id}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "content-fit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {weekDifference > 0 ? (
                  <p>{moment(time).format("L")}</p>
                ) : (
                  <p>
                    {isCurrentDay
                      ? "Today"
                      : isPrevDay
                      ? "Yesterday"
                      : moment(time).format("dddd")}
                  </p>
                )}
              </Box>

              {group.map((msg, i) => {
                return (
                  <Box key={msg._id}>
                    <EachChatMessage message={msg} />
                  </Box>
                );
              })}
            </Box>
          );
        })}

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
