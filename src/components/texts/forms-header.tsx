import {Typography} from "@mui/material";

interface componentProps {
  text: string | number;
}

const FormsHeaderText = ({text}) => {
  return (
    <Typography
      sx={{
        color: "#0064CC",
        textTransform: "uppercase",
        fontWeight: "800",
        fontSize: "14px",
        lineHeight: "28px",
      }}
    >
      {text}:
    </Typography>
  );
};

export default FormsHeaderText;
