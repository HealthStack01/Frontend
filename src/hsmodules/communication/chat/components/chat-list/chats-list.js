import {useState} from "react";
import {Box} from "@mui/system";
import {IconButton, Typography} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

import ExpandableSearchInput from "../../../../../components/inputs/Search/ExpandableSearch";
import EachChat from "./each-chat";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";

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
  const [fetchingChats, setFetchingChats] = useState(false);
  const [chats, setChats] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 22, 222, 32, 34, 54, 345, 898, 900, 980,
  ]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = e => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  return (
    <Box sx={{width: "100%", height: "100%"}}>
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

        <IconButton onClick={showStaffsList}>
          <ChatIcon />
        </IconButton>
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
            {chats.length > 0 ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                {chats.map(chat => {
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
                <Typography sx={{fontSize: "0.85rem"}}>
                  You don't have any chat yet...
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
