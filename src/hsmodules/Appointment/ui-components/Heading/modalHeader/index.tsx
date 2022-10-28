import { Typography } from '@mui/material';
const ModalHeader = ({ text }) => {
  const style = {
    fontSize: '20px',
    color: '#000000',
    fontWeight: '500',
    lineHeight: '27px',
  };

  return (
    <>
      <Typography style={style}>{text}</Typography>
    </>
  );
};

export default ModalHeader;
