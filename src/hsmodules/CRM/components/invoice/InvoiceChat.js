import {useState, useRef, useEffect} from "react";
import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import Slide from "@mui/material/Slide";
import SendIcon from "@mui/icons-material/Send";
import {ThreeCircles} from "react-loader-spinner";

import "./styles.scss";
import moment from "moment";

import {messages} from "./data";

const InvoiceChat = () => {
  const [chatMessages, setChatMessages] = useState([...messages]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const messagesContainerRef = useRef(null);
  const chatBoxContainerRef = useRef(null);

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const sendNewChatMessage = () => {
    if (message === "") return;

    setSending(true);

    setTimeout(() => {
      const newChatMessage = {
        name: "Healthstack",
        time: moment.now(),
        _id: `${Math.random()}`,
        userId: "00",
        message: message,
        status: "delivered",
        dp: "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg",
      };

      setChatMessages(prev => [...prev, newChatMessage]);
      setMessage("");
      setSending(false);
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    //scroll to bottom everytime new chat message is added
    scrollToBottom();
  }, [chatMessages]);

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

  const formatChatMessages = [];

  return (
    <Box
      sx={{
        width: "500px",
        height: "80vh",
        overflow: "hidden",
      }}
    >
      {/* <Box
        sx={{
          height: "50px",
        }}
      ></Box> */}

      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 60px)",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 15px",
        }}
        ref={chatBoxContainerRef}
      >
        {chatMessages.map(messageItem => {
          const {message, _id, userId, time, name, status, dp} = messageItem;
          const currentUser = "00";
          const isUserMsg = currentUser === userId;
          return (
            <Slide
              direction="right"
              in={true}
              container={chatBoxContainerRef.current}
            >
              <Box
                key={_id}
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
                    backgroundColor: isUserMsg ? "#ffffff" : "#0064CC",
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
                        }}
                      >
                        {name}
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
                      {message} <div style={{width: "50px"}} />
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
        <div ref={messagesContainerRef} />
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
          onClick={sendNewChatMessage}
          variant="contained"
          sx={{
            padding: 0,
            minWidth: 0,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        >
          {sending ? <ThreeCirclesSpinner /> : <SendIcon />}
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceChat;

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
