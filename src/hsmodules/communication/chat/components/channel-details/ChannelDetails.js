import {Box, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useContext, useEffect, useState} from "react";

import {ObjectContext, UserContext} from "../../../../../context";
import {returnAvatarString} from "../../../../helpers/returnAvatarString";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import client from "../../../../../feathers";
import CustomConfirmationDialog from "../../../../../components/confirm-dialog/confirm-dialog";
import {toast} from "react-toastify";

const ChatChannelDetails = () => {
  const [chatRoom, setChatRoom] = useState();
  const chatroomServer = client.service("chatroom");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    type: "",
    message: "",
  });

  //console.log(user);

  useEffect(() => {
    const chatRoom = state.ChatRoom;
    setChatRoom(chatRoom);
  }, [state.ChatModule]);

  const confirmRemove = member => {
    setConfirmDialog({
      open: true,
      action: () => removeMember(member),
      message:
        user.currentEmployee._id !== member._id
          ? `You're about to remove ${member.name} from the channel ${chatRoom.name}`
          : `Are you sure you want to leave the chat channel ${chatRoom.name}?`,
      type: "warning",
    });
  };

  const cancelConfrim = () => {
    setConfirmDialog({open: false, action: null, type: "", message: ""});
  };

  const removeMember = member => {
    showActionLoader();
    const currentMembers = chatRoom.members;

    const newMembers = currentMembers.filter(item => item._id !== member._id);

    const updatedChannel = {
      ...chatRoom,
      members: newMembers,
    };

    chatroomServer
      .patch(chatRoom._id, updatedChannel)
      .then(res => {
        hideActionLoader();
        console.log(res);
        setState(prev => ({
          ...prev,
          ChatModule: {
            ...prev.ChatModule,
            chatRoom: res,
          },
        }));
        cancelConfrim();
        toast.success(`Successfully removed ${member.name} from channel`);
      })
      .catch(err => {
        hideActionLoader();
        console.log(err);
        toast.error("Failed to remove member");
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100% - 50px)",
        overflowY: "auto",
        borderTop: "1px solid #d9dcd6",
        //backgroundColor: "red",
      }}
    >
      <CustomConfirmationDialog
        open={confirmDialog.open}
        cancelAction={cancelConfrim}
        message={confirmDialog.message}
        confirmationAction={confirmDialog.action}
        type={confirmDialog.type}
      />
      <Box>
        {chatRoom &&
          chatRoom.members.map(item => (
            <Box
              sx={{
                width: "100%",
                height: "60px",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #d9dcd6",
                position: "relative",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#ebebeb",
                },
              }}
              gap={1}
              p={1}
              //onClick={handleOnStaffClick}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "10px",
                }}
              >
                <GlobalCustomButton
                  variant="text"
                  color="error"
                  onClick={() => confirmRemove(item)}
                >
                  {user.currentEmployee._id === item._id
                    ? "Leave Channel"
                    : "Remove"}
                </GlobalCustomButton>
              </Box>
              <Box>
                <Avatar
                  src={item.imageurl}
                  {...returnAvatarString(item.name)}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                >
                  {user.currentEmployee._id === item._id ? "You" : item.name}
                </Typography>

                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "0.75rem",
                    color: "#2d2d2d",
                  }}
                >
                  {item.profession} - {item.email}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <GlobalCustomButton>Add New Member</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default ChatChannelDetails;
