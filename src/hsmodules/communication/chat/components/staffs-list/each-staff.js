import {useContext} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import {toast} from "react-toastify";

import client from "../../../../../feathers";
import {returnAvatarString} from "../../../../helpers/returnAvatarString";
import {ObjectContext, UserContext} from "../../../../../context";

const ChatEachStaff = ({staff}) => {
  const chatroomServer = client.service("chatroom");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);

  const handleOnStaffClick = async () => {
    const employee = user.currentEmployee;
    return console.log("hello world");
    showActionLoader();

    const newChatRoom = {
      name: "personal staffs chat",
      description: "personal chat conversation within 2 staffs",
      chatType: "personal",
      members: [
        {
          name: `${employee.firstname} ${employee.lastname}`,
          phone: employee.phone,
          email: employee.email,
          imageurl: employee.imageurl || "",
          profession: employee.profession,
          _id: employee._id,
          type: "staff",
          model: "employee",
        },
        {
          name: `${staff.firstname} ${staff.lastname}`,
          phone: staff.phone,
          email: staff.email,
          imageurl: staff.imageurl || "",
          profession: staff.profession,
          _id: staff._id,
          type: "staff",
          model: "employee",
        },
      ],
    };

    // return console.log(newChatRoom);

    return chatroomServer
      .find({
        query: {
          "members._id": newChatRoom.members,
        },
      })
      .then(res => {
        const data = res.data;
        if (data.length > 0) {
          const chatRoom = data[0];

          setState(prev => ({
            ...prev,
            ChatModule: {
              ...prev.ChatModule,
              chatRoom: chatRoom,
            },
          }));

          hideActionLoader();
          return;
        } else {
          return chatroomServer
            .create(newChatRoom)
            .then(res => {
              setState(prev => ({
                ...prev,
                ChatModule: {
                  ...prev.ChatModule,
                  chatRoom: res,
                },
              }));
              hideActionLoader();
            })
            .catch(error => {
              hideActionLoader();
              toast.error(`Something went wrong ${error}`);
              return console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
        toast.error(`Something went wrong ${error}`);
        hideActionLoader();
      });

    //console.log(newChatRoom);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #d9dcd6",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#ebebeb",
        },
      }}
      gap={1}
      p={1}
      onClick={handleOnStaffClick}
    >
      <Box>
        <Avatar
          src={staff.imageurl}
          {...returnAvatarString(
            `${staff.firstname.replace(/\s/g, "")} ${staff.lastname.replace(
              /\s/g,
              ""
            )}`
          )}
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
          {staff.firstname} {staff.lastname}
        </Typography>

        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "0.75rem",
            color: "#2d2d2d",
          }}
        >
          {staff.profession} - {staff.department}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatEachStaff;
