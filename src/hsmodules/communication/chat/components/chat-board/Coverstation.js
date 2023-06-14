import {useContext, useState, useEffect, useCallback, useRef} from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Zoom from "@mui/material/Zoom";
import {Box, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

import ChatInputBox from "../chat-input/ChatInput";
import ChatHeader from "../chat-header/Chat-Header";
import ChatMessages from "../chat-messages/Chat-Messages";
import MessagesSearchInput from "../search-input/Search-Input";
import {ObjectContext} from "../../../../../context";
import UserProfile from "../user-profile/User-Profile";
import ChatChannelDetails from "../channel-details/ChannelDetails";
import client from "../../../../../feathers";
import {toast} from "react-toastify";

const ChatBoardConversation = () => {
  //const [chatRoom, setChatRoom] = useState(null);
  const [fetchingMsgs, setFetchingMsgs] = useState(false);
  const [goDownIcon, setGoDownIcon] = useState(false);
  const chatMessagesServer = client.service("chat");
  const {state, setState} = useContext(ObjectContext);
  const [messages, setMessages] = useState([]);

  const {showSearch, rightSideBar} = state.ChatModule;

  // useEffect(() => {
  //   const room = state.ChatModule.chatRoom;
  //   setChatRoom(room);
  // }, [state.ChatModule.chatRoom]);

  const msgsContainerRef = useRef();

  const handleOnScroll = event => {
    //console.log(event);
    const target = event.target;
    const {scrollHeight, scrollTop, clientHeight} = target;
    const scrollPosition = scrollHeight - scrollTop - clientHeight;

    if (scrollPosition > 200) {
      setGoDownIcon(true);
    } else if (scrollPosition <= 0) {
      setGoDownIcon(false);
    }
  };

  const scrollToBottom = useCallback(() => {
    if (!msgsContainerRef.current) return;

    const scroll =
      msgsContainerRef.current.scrollHeight -
      msgsContainerRef.current.clientHeight;

    msgsContainerRef.current.scrollTo({
      top: scroll,
      behavior: "smooth",
    });
  }, [msgsContainerRef]);

  useEffect(() => {
    scrollToBottom();
  }, [state.ChatModule]);

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

  const getChatMessages = useCallback(() => {
    const chatRoom = state.ChatRoom;
    setFetchingMsgs(true);

    setFetchingMsgs(true);
    chatMessagesServer
      .find({
        query: {
          chatroomId: chatRoom._id,

          $sort: {
            createdAt: 1,
          },
        },
      })
      .then(res => {
        setFetchingMsgs(false);
        //  console.log(res);
        setMessages(res.data);
      })
      .catch(error => {
        setFetchingMsgs(false);
        toast.error(`An error occured ${error}`);
      });
  }, [state.ChatRoom]);

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

  useEffect(() => {
    getChatMessages();
  }, [getChatMessages]);

  if (fetchingMsgs)
    return (
      <Box sx={{width: "100%", padding: "20px"}}>
        <LinearProgress />
      </Box>
    );
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
        <Zoom in={goDownIcon}>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              right: "5%",
              bottom: "20%",
              zIndex: 9999,
              backgroundColor: "#0065B5",
              "&:hover": {
                backgroundColor: "#0065B5",
              },
              color: "#ffffff",
            }}
            onClick={scrollToBottom}
          >
            <ArrowCircleDownIcon fontSize="small" />
          </IconButton>
        </Zoom>

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
            height: "calc(100vh - 120px)",
            position: "relative",
            overflowY: "scroll",
          }}
          ref={msgsContainerRef}
          onScroll={handleOnScroll}
        >
          <ChatMessages msgs={messages} />
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

      <Box
        sx={{
          width: rightSideBar ? "400px" : 0,
          minWidth: 0,
          height: "100%",
          transition: "all 0.3s ease-in-out",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
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
          <IconButton onClick={hideRightSideBar}>
            <CloseIcon />
          </IconButton>
        </Box>
        {state?.ChatRoom?.chatType === "personal" ? (
          <UserProfile />
        ) : (
          <ChatChannelDetails />
        )}
      </Box>
    </Box>
  );
};

export default ChatBoardConversation;
