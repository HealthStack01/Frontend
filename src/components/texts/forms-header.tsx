import {Typography} from "@mui/material";

interface componentProps {
  text: string | number;
  color?: string;
}

const FormsHeaderText = ({text, color = "#0064CC"}: componentProps) => {
  return (
    <Typography
      sx={{
        color: color,
        textTransform: "uppercase",
        fontWeight: "800",
        fontSize: "0.80rem !important",
        lineHeight: "28px",
        //marginBottom: "10px",
      }}
    >
      {text}
    </Typography>
  );
};

export default FormsHeaderText;
