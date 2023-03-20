import { Typography } from '@mui/material';
export const McText = ({ txt, color, bold, type, size }) => {
  return (
    <Typography
      variant={type}
      style={{
        color: '#0064CC',
        fontWeight: bold ? '700' : 'normal',
      }}
      fontSize={size}
    >
      {txt}
    </Typography>
  );
};
