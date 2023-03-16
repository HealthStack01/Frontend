import {Box, Typography} from "@mui/material";

import no_chat_gif from "../../assets/no_chat_gif.gif";
import no_chat_gif_2 from "../../assets/no_chat_gif_2.gif";

const NoChatConversationSelected = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={no_chat_gif_2}
        alt=""
        style={{display: "block", width: "30%", height: "auto"}}
      />
      <Typography sx={{fontSize: "0.8rem"}}>
        Your Chat Conversations will display here when you select a Chat
      </Typography>
    </Box>
  );
};

export default NoChatConversationSelected;
