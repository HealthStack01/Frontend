import {useState, useRef, useEffect, useCallback, useContext} from "react";
import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import Slide from "@mui/material/Slide";
import SendIcon from "@mui/icons-material/Send";
import {ThreeCircles} from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Zoom from "@mui/material/Zoom";
import Highlighter from "react-highlight-words";

import "./styles.scss";
import moment from "moment";

import FilterMenu from "../utilities/FilterMenu";
import ExpandableSearchInput from "../inputs/Search/ExpandableSearch";
import {toast} from "react-toastify";
import {ObjectContext, UserContext} from "../../context";
import client from "../../feathers";
import EachChatMessage from "./EachMessage";

const ChatInterface = ({
  closeChat,
  messages = [],
  sendMessage,
  message,
  setMessage,
  isSendingMessage = false,
  markMsgAsSeen,
}) => {
  const dealServer = client.service("deal");
  const [chatMessages, setChatMessages] = useState([]);
  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);
  const [goDownIcon, setGoDownIcon] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const messagesContainerRef = useRef(null);
  const chatBoxContainerRef = useRef(null);

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const scrollToBottom = useCallback(() => {
    const scroll =
      chatBoxContainerRef.current.scrollHeight -
      chatBoxContainerRef.current.clientHeight;

    chatBoxContainerRef.current.scrollTo({
      top: scroll,
      behaviour: "smooth",
    });
  }, [chatBoxContainerRef]);

  const handleOnScroll = event => {
    const {scrollHeight, scrollTop, clientHeight} = event.target;
    const scrollPosition = scrollHeight - scrollTop - clientHeight;

    if (scrollPosition > 400) {
      setGoDownIcon(true);
    } else if (scrollPosition <= 0) {
      setGoDownIcon(false);
    }
  };

  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const searchedMessages = messages.filter(message => {
    if (searchValue === "") return message;
    if (message.message?.toLowerCase().includes(searchValue.toLowerCase()))
      return message;
  });

  // useEffect(() => {
  //   markMsgsAsSeen();
  // }, [markMsgsAsSeen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentMessages = searchValue === "" ? messages : searchedMessages;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f0f0f0",
          padding: "0 15px",
        }}
      >
        <Box sx={{width: "calc(100% - 100px)"}}>
          {/* <FilterMenu onSearch={handleSearch} value={searchValue} /> */}
          <ExpandableSearchInput
            onChange={handleSearchChange}
            value={searchValue}
          />
        </Box>

        <IconButton onClick={closeChat}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 110px)",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 15px",
        }}
        ref={chatBoxContainerRef}
        onScroll={handleOnScroll}
      >
        {currentMessages.map(messageItem => {
          return (
            <EachChatMessage
              key={messageItem._id}
              messageObj={messageItem}
              searchValue={searchValue}
              chatBoxContainerRef={chatBoxContainerRef}
              markAsSeen={markMsgAsSeen}
            />
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
          padding: "0 15px",
        }}
      >
        <Box
          sx={{
            width: "calc(100% - 50px)",
          }}
        >
          <form
            onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              className="chat-input-box"
              placeholder="Enter your message..."
              tabIndex="0"
              value={message}
              onChange={handleChange}
            />
          </form>
        </Box>

        <Button
          onClick={sendMessage}
          variant="contained"
          sx={{
            padding: 0,
            minWidth: 0,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        >
          {isSendingMessage ? <ThreeCirclesSpinner /> : <SendIcon />}
        </Button>
      </Box>

      <Zoom in={goDownIcon}>
        <IconButton
          sx={{
            position: "absolute",
            right: "5%",
            bottom: "10%",
            zIndex: 9999,
            backgroundColor: "#386641",
            "&:hover": {
              backgroundColor: "#386641",
            },
            color: "#ffffff",
          }}
          onClick={scrollToBottom}
        >
          <ArrowCircleDownIcon />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default ChatInterface;

const ThreeCirclesSpinner = () => {
  return (
    <ThreeCircles
      height="25"
      width="25"
      color="#ffffff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
};
