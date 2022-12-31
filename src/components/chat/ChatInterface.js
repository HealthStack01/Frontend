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

import {messages} from "./data";
import FilterMenu from "../utilities/FilterMenu";
import ExpandableSearchInput from "../inputs/Search/ExpandableSearch";
import {toast} from "react-toastify";
import {UserContext} from "../../context";

const ChatInterface = ({
  closeChat,
  messages = [],
  sendMessage,
  message,
  setMessage,
  isSendingMessage = false,
}) => {
  const [chatMessages, setChatMessages] = useState([]);
  const {user} = useContext(UserContext);
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

    if (scrollPosition > 200) {
      setGoDownIcon(true);
    } else if (scrollPosition <= 0) {
      setGoDownIcon(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, scrollToBottom]);

  const messageStatus = status => {
    switch (status.toLowerCase()) {
      case "delivered":
        return (
          <Typography style={{color: "#17935C", fontSize: "0.75rem"}}>
            {status}
          </Typography>
        );

      case "seen":
        return (
          <Typography style={{color: "#FFA500", fontSize: "0.75rem"}}>
            {status}
          </Typography>
        );

      case "failed":
        return (
          <Typography style={{color: "#ED0423", fontSize: "0.75rem"}}>
            {status}
          </Typography>
        );

      default:
        break;
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
          const {message, _id, senderId, time, sender, status, dp} =
            messageItem;
          const currentUser = user.currentEmployee.userId;
          const isUserMsg = currentUser === senderId;
          return (
            <Slide
              direction="right"
              in={true}
              container={chatBoxContainerRef.current}
              key={_id}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: isUserMsg ? "flex-end" : "flex-start",
                }}
              >
                {!isUserMsg && (
                  <Avatar
                    src={dp}
                    sx={{width: "40px", height: "40px", marginRight: "7px"}}
                  />
                )}
                <Box
                  sx={{
                    width: "calc(100% - 50px)",
                    padding: "10px",
                    boxShadow: 3,
                    borderRadius: "7.5px",
                    backgroundColor: isUserMsg ? "#f8f7ff" : "#0064CC",
                  }}
                  mb={2}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    mb={0.7}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.7,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: isUserMsg ? "#0064CC" : "#ffffff",
                          fontWeight: "600",
                          textTransform: "capitalize",
                        }}
                      >
                        {sender}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: isUserMsg ? "#2d2d2d" : "#ffffff",
                      }}
                    >
                      {moment(time).calendar()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: isUserMsg ? "#000000" : "#ffffff",
                      }}
                    >
                      <Highlighter
                        highlightClassName="chat-message-highlight-search"
                        searchWords={[`${searchValue}`]}
                        autoEscape={true}
                        textToHighlight={message}
                        activeIndex={1}
                      />
                      <div style={{width: "50px"}} />
                    </Typography>

                    <Box
                      sx={{
                        width: "100%",
                        //position: "absolute",
                        right: 0,
                        bottom: "0px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {isUserMsg && messageStatus(status)}
                    </Box>
                  </Box>
                </Box>
                {isUserMsg && (
                  <Avatar
                    src={dp}
                    sx={{width: "40px", height: "40px", marginLeft: "7px"}}
                  />
                )}
              </Box>
            </Slide>
          );
        })}
        {/* <div ref={messagesContainerRef} /> */}
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
          <input
            type="text"
            className="chat-input-box"
            placeholder="Enter your message..."
            tabIndex="0"
            value={message}
            onChange={handleChange}
          />
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
