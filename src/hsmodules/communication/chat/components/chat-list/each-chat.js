import {useState, useContext, useCallback, useEffect} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import {returnAvatarString} from "../../../../helpers/returnAvatarString";
import {ObjectContext, UserContext} from "../../../../../context";
import client from "../../../../../feathers";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import moment from "moment";

const EachChat = ({chat}) => {
  const chatMessagesServer = client.service("chat");
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);
  const [unreadMsgs, setUnreadMsgs] = useState([]);

  const getUnreadChatMessages = useCallback(() => {}, []);

  const chatPartner = chat.members.find(
    item => item._id !== user.currentEmployee._id
  );

  const handleSelectChatRoom = () => {
    setState(prev => ({
      ...prev,
      ChatRoom: chat,
    }));
  };

  const timestamp = chat.lastmessage ? chat.lastmessage.time : chat.createdAt;

  const messagesDay = moment(timestamp);
  const currentDay = moment(new Date());
  const prevDay = moment().subtract(1, "day");
  const weekDifference = currentDay
    .startOf("day")
    .diff(messagesDay.startOf("day"), "weeks");
  const isCurrentDay = messagesDay.isSame(currentDay, "day");
  const isPrevDay = messagesDay.isSame(prevDay, "day");

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #f0f0f0",
        }}
        gap={0.5}
        p="10px"
      >
        <Skeleton animation="wave" variant="circular" width={30} height={30} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Skeleton animation="wave" height={10} width="40%" />
          <Skeleton animation="wave" height={10} width="80%" />
        </Box>
      </Box>
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
      onClick={handleSelectChatRoom}
    >
      <Box mr={0.6}>
        {chat.chatType === "personal" ? (
          <Avatar
            {...returnAvatarString(`${chatPartner?.name}`)}
            src={chatPartner?.imageurl}
          />
        ) : (
          <Avatar src="https://www.pngkit.com/png/detail/128-1284523_group-chat-icon-google-group-chat-icon.png" />
        )}
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
            {chat.chatType === "personal" ? chatPartner?.name : chat.name}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "#006d77",
            }}
          >
            {weekDifference > 0 ? (
              <>{moment(timestamp).format("L")}</>
            ) : (
              <>
                {isCurrentDay
                  ? moment(timestamp).format("LT")
                  : isPrevDay
                  ? "Yesterday"
                  : moment(timestamp).format("dddd")}
              </>
            )}
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
            {chat.lastmessage && (
              <Typography
                sx={{fontSize: "0.75rem", color: "#736f72", width: "100%"}}
                noWrap
              >
                <span
                  style={{
                    color: "green",
                    fontWeight: "600",
                    marginRight: "5px",
                  }}
                >
                  {chat?.lastmessage?.createdby?._id ===
                  user?.currentEmployee?._id
                    ? "You"
                    : chat?.lastmessage?.createdby?.firstname}
                  :
                </span>
                {chat?.lastmessage?.message}
              </Typography>
            )}
          </Box>

          {/* {chatInfo?.messages?.length > 0 && (
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
          )} */}
        </Box>
      </Box>
    </Box>
  );
};

export default EachChat;

//For Group Chat or Chat with more than 1 members
const ChannelChat = () => {};
