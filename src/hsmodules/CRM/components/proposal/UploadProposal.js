import {useState} from "react";
import {Box} from "@mui/system";
import {FileUploader} from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {Typography} from "@mui/material";

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "400px",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px dashed gray",
        cursor: "pointer",
        borderRadius: "7.5px",
      }}
    >
      <FileUploadOutlinedIcon />
      <Typography>Select File or Drag and Drop here</Typography>
    </Box>
  );
};

const UploadProposal = ({closeModal}) => {
  const [file, setFile] = useState(null);

  const handleChange = file => {
    setFile(file);
    closeModal();
  };

  return (
    <Box>
      <Box>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="upload"
          types={["jpeg"]}
          children={<UploadComponent />}
        />
      </Box>
    </Box>
  );
};

export default UploadProposal;
