import {useState, useContext, useEffect, useCallback} from "react";
import {Box} from "@mui/system";
import {IconButton, Typography} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Groups3Icon from "@mui/icons-material/Groups3";
import Tooltip from "@mui/material/Tooltip";

import ExpandableSearchInput from "../../../../../components/inputs/Search/ExpandableSearch";
import EachChat from "./each-chat";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import ModalBox from "../../../../../components/modal";
import CreateNewChannel from "./create-channel";
import client from "../../../../../feathers";
import {UserContext} from "../../../../../context";
import {toast} from "react-toastify";
import moment from "moment";

const CustomLoader = () => (
  <div
    style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="/loading.gif"
      style={{width: "200px", height: "auto", display: "block"}}
    />
    <Typography sx={{marginTop: "-2rem", fontSize: "0.85rem"}}>
      Hold on, whilst we fetch your data...
    </Typography>
  </div>
);

const CommunicationChatsList = ({showStaffsList}) => {
  const chatroomServer = client.service("chatroom");
  const {user} = useContext(UserContext);
  const [fetchingChats, setFetchingChats] = useState(false);
  const [createChannel, setCreateChannel] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = e => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const handleGetChatRooms = useCallback(() => {
    setFetchingChats(true);
    chatroomServer
      .find({
        query: {
          "members._id": user.currentEmployee._id,
          $sort: {
            updatedAt: -1,
          },
        },
      })
      .then(res => {
        //console.log(res.data);
        setChats(res.data);
        setFetchingChats(false);
      })
      .catch(error => {
        setFetchingChats(false);
        toast.error(
          `Sorry, an error ouccured fetching your chat rooms - ${error}`
        );
      });
  }, []);

  const sortedChats = chats.sort((a, b) => {
    const compA = moment(a.lastmessage ? a.lastmessage.time : a.createdAt);
    const compB = moment(b.lastmessage ? b.lastmessage.time : b.createdAt);
    return compB - compA;
  });

  useEffect(() => {
    handleGetChatRooms();

    chatroomServer.on("created", obj => setChats(prev => [obj, ...prev]));
    chatroomServer.on("patched", obj =>
      setChats(prev =>
        prev.map(item => {
          if (item._id === obj._id) {
            return obj;
          } else {
            return item;
          }
        })
      )
    );
    chatroomServer.on("removed", obj => {
      setChats(prev => prev.filter(item => item._id !== obj._id));
    });
    return () => {};
  }, [handleGetChatRooms]);

  console.log(chats[0]);

  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <ModalBox
        open={createChannel}
        onClose={() => setCreateChannel(false)}
        header="Create a new Channel and add members"
      >
        <CreateNewChannel closeModal={() => setCreateChannel(false)} />
      </ModalBox>
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

        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Tooltip title="Create New Channel">
            <IconButton
              sx={{
                backgroundColor: "#ffffff",
              }}
              onClick={() => setCreateChannel(true)}
            >
              <Groups3Icon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Start New Chat">
            <IconButton
              sx={{
                backgroundColor: "#ffffff",
              }}
              onClick={showStaffsList}
            >
              <ChatIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 50px)",
        }}
      >
        {fetchingChats ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomLoader />
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {sortedChats.length > 0 ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                {sortedChats.map(chat => {
                  return <EachChat key={chat._id} chat={chat} />;
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  minHeight: "calc(100vh - 110px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                gap={2}
              >
                <img
                  src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif"
                  alt=""
                  style={{height: "150px", width: "auto", display: "block"}}
                />
                <Typography sx={{fontSize: "0.8rem"}}>
                  You don't have any active chatroom yet...
                </Typography>
                <GlobalCustomButton onClick={() => showStaffsList()}>
                  <ChatIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Start New Chat
                </GlobalCustomButton>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CommunicationChatsList;
