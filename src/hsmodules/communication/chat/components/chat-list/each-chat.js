import {useState, useContext, useCallback, useEffect} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import {returnAvatarString} from "../../../../helpers/returnAvatarString";
import {UserContext} from "../../../../../context";
import client from "../../../../../feathers";

const EachChat = ({chat}) => {
  const chatMessagesServer = client.service("chat");
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);

  const getRecentChatMessage = useCallback(() => {
    setLoading(true);
    chatMessagesServer
      .find({
        query: {
          chatroomId: chat._id,

          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        const data = {
          ...chat,
          messages: res.data,
        };

        console.log(data);
        setChatInfo(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getRecentChatMessage();
  }, [getRecentChatMessage]);

  const chatPartner = chat.members.find(
    item => item._id !== user.currentEmployee._id
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        padding: "10px 10px",
        borderBottom: "1px solid #f0f0f0",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <Box mr={0.6}>
        <Avatar {...returnAvatarString(`${chatPartner.name}`)} />
      </Box>

      <Box
        sx={{
          width: "calc(100% - 40px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            sx={{fontSize: "0.8rem", fontWeight: "bold", color: "#1976d2"}}
          >
            {chatPartner?.name}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "#006d77",
            }}
          >
            5 seconds ago
          </Typography>
        </Box>

        <Box
          sx={{
            overflowX: "hidden",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              overflowX: "hidden",
              width: "calc(100% - 50px)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{fontSize: "0.75rem", color: "#736f72", width: "100%"}}
              noWrap
            >
              Lorem ipsium lorem lafele ta pisiumu constafate ta be leh
              aporocosom
            </Typography>
          </Box>

          <Box
            sx={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#354f52",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{fontSize: "0.7rem", color: "#ffffff"}}>
              5
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EachChat;

//For Group Chat or Chat with more than 1 members
const ChannelChat = () => {};
