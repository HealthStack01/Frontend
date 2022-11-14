import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface componentProps {
  label?: string;
  maxRows?: number;
  value?: string | number;
  onChange?: () => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}

const MuiTextArea = ({
  label,
  maxRows = 6,
  rows = 4,
  value,
  onChange,
  multiline = true,
  placeholder,
}: componentProps) => {
  return (
    <TextField
      id="outlined-multiline-flexible"
      label={label}
      multiline
      maxRows={maxRows}
      rows={4}
      value={value}
      onChange={onChange}
      size="small"
      placeholder={placeholder}
    />
  );
};

export default MuiTextArea;
