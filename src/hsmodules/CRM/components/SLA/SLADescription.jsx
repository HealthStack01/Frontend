import {useState} from "react";
import {Box, Typography} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./styles.scss";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

const SLADescription = ({setDescription, closeModal, description}) => {
  const [text, setText] = useState(description);

  const handleDone = () => {
    setDescription(text);
    closeModal();
  };
  return (
    <Box
      sx={{
        width: "600px",
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
            fontWeight: "600",
          }}
        >
          Description
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
          sx={{marginRight: "5px"}}
          variant="outlined"
          color="error"
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleDone}>Done</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default SLADescription;
