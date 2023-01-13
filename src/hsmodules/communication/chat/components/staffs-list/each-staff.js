import {Avatar, Box, Typography} from "@mui/material";
import {returnAvatarString} from "../../../../helpers/returnAvatarString";

const ChatEachStaff = ({staff}) => {
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
