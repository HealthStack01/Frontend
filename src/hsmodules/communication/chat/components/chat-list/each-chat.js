import {Avatar, Box, Typography} from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const EachChat = ({chat}) => {
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
        <Avatar {...stringAvatar(`John Doe`)} />
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
            John Doe
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
            width: "calc(100% - 50px)",
          }}
        >
          <Typography
            sx={{fontSize: "0.75rem", color: "#736f72", width: "100%"}}
            noWrap
          >
            Lorem ipsium lorem lafele ta pisiumu constafate ta be leh aporocosom
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EachChat;
