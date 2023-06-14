import {Box, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useContext} from "react";

import {ObjectContext, UserContext} from "../../../../../context";
import {returnAvatarString} from "../../../../helpers/returnAvatarString";

const ChatUserProfile = () => {
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const chatRoom = state.ChatRoom;

  const chatPartner = chatRoom.members.find(
    item => item._id !== user.currentEmployee._id
  );

  return (
    <Box pt={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          {...returnAvatarString(`${chatPartner.name}`, 120, "4.5rem")}
          src={chatPartner?.imageurl}
        />

        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#1976d2",
          }}
        >
          {chatPartner.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "#2d2d2d",
          }}
        >
          {chatPartner.profession}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatUserProfile;
