import {useContext, useEffect, useState, useCallback} from "react";
import {Box, LinearProgress} from "@mui/material";
import {toast} from "react-toastify";

import EachChatMessage from "./Each-Message";
import MessageSearchInput from "../search-input/Search-Input";
import {ObjectContext} from "../../../../../context";
import moment from "moment";
import client from "../../../../../feathers";

const groupMessagesByDate = (array, token) => {
  return array.reduce(function (val, obj) {
    let comp = moment(obj["createdAt"]).format(token);

    (val[comp] = val[comp] || []).push(obj);
    return val;
  }, []);
};

const ChatConversationMessages = ({msgs}) => {
  const [blah, setBlah] = useState([]);
  const [messages, setMessages] = useState([]);
  const chatMessagesServer = client.service("chat");
  const [fetchingMsgs, setFetchingMsgs] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const {state} = useContext(ObjectContext);

  useEffect(() => {
    setMessages(msgs);
  }, [msgs]);

  //const groupedMessages = messages ? groupMessagesByDate(messages, "D") : [];

  // useEffect(() => {
  //   setSearchValue(state.ChatModule.searchValue);
  // }, [state.ChatModule.searchValue]);

  // const searchedMessages = messages.filter(message => {
  //   if (searchValue.length <= 2 || searchValue.trim() === "") return message;
  //   if (message.message?.toLowerCase().includes(searchValue.toLowerCase()))
  //     return message;
  // });

  // const getChatMessages = useCallback(() => {
  //   const chatRoom = state.ChatRoom;
  //   setFetchingMsgs(true);
  //   setMessages([]);

  //   console.log(chatRoom);

  //   setFetchingMsgs(true);
  //   chatMessagesServer
  //     .find({
  //       query: {
  //         chatroomId: chatRoom._id,

  //         $sort: {
  //           createdAt: 1,
  //         },
  //       },
  //     })
  //     .then(res => {
  //       setFetchingMsgs(false);
  //       //  console.log(res);
  //       setMessages(res.data);
  //     })
  //     .catch(error => {
  //       setFetchingMsgs(false);
  //       toast.error(`An error occured ${error}`);
  //     });
  // }, [state.ChatRoom]);

  // const updateChatMessages = useCallback(() => {

  //   chatMessagesServer
  //     .find({
  //       query: {
  //         chatroomId: state.ChatModule.chatRoom._id,
  //         $sort: {
  //           createdAt: 1,
  //         },
  //       },
  //     })
  //     .then(res => {
  //       setMessages(res.data);
  //     })
  //     .catch(error => {
  //       toast.error(`An error occured updating your Chat-Rooms ${error}`);
  //     });
  // }, [chatRoom]);

  // useEffect(() => {
  //   getChatMessages();
  // }, [getChatMessages]);

  // useEffect(() => {
  //   getChatMessages();
  // }, [getChatMessages]);

  useEffect(() => {
    chatMessagesServer.on("created", obj => {
      setMessages(prev => [...prev, obj]);
    });
  }, []);

  // if (fetchingMsgs)
  //   return (
  //     <Box sx={{width: "100%", padding: "20px"}}>
  //       <LinearProgress />
  //     </Box>
  //   );
  return (
    <>
      {groupMessagesByDate(messages, "D").map(group => {
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
              height: "fit-content",
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
    </>
  );
};

export default ChatConversationMessages;
