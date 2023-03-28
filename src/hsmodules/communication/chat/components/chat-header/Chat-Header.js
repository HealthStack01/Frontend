import {useContext} from "react";
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {ObjectContext} from "../../../../../context";

const ChatConversationHeader = () => {
  const {state, setState} = useContext(ObjectContext);

  const showSearchInput = () => {
    setState(prev => ({
      ...prev,
      ChatModule: {
        ...prev.ChatModule,
        showSearch: true,
      },
    }));
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Avatar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            //gap: 0.4,
          }}
        >
          <Typography
            sx={{fontSize: "0.8rem", fontWeight: "600", color: "#2d2d2d"}}
          >
            John Doe
          </Typography>
          <Typography sx={{fontSize: "0.7rem", color: "#6c757d"}}>
            Doctor, Admin
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton onClick={showSearchInput}>
          <SearchIcon />
        </IconButton>

        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatConversationHeader;
