import {useState} from "react";
import {Box, Typography} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlockIcon from "@mui/icons-material/Block";

import "./styles.scss";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

const InvoiceDeclineReason = ({setReason, closeModal, reason}) => {
  const [text, setText] = useState(reason);

  const handleDone = () => {
    setReason(text);
    closeModal();
  };
  return (
    <Box
      sx={{
        width: "60vw",
        maxHeight: "80vh",
      }}
    >
      <Box
        sx={{
          height: "45px",
          backgroundColor: "#0075D9",
          display: "flex",
          alignItems: "center",
          paddingLeft: "25px",
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            fontWeight: "500",
          }}
        >
          Reason for Decline
        </Typography>
      </Box>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(event, editor) => {
          const data = editor.getData();
          setText(data);
        }}
      />

      <Box mt={2}>
        <GlobalCustomButton
          onClick={closeModal}
          sx={{marginRight: "15px"}}
          variant="outlined"
          color="warning"
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleDone} color="error">
          <BlockIcon fontSize="small" sx={{marginRight: "5px"}} />
          Decline Invoice
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default InvoiceDeclineReason;
