import {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {FileUploader} from "react-drag-drop-files";
import CustomSelect from "../../../../components/inputs/basic/Select";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "200px",
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

const LeadUpload = ({closeModal}) => {
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);

  const selectOptions = [
    {
      label: "Image",
      value: "image",
    },
    {
      label: "Document",
      value: "document",
    },
  ];

  const images = ["png", "jpg", "jpeg"];

  const handleChange = file => {
    setFile(file);
  };

  return (
    <Box sx={{width: "400px", maxHeight: "600px"}}>
      <Box mt={1} mb={2}>
        <CustomSelect options={selectOptions} label="File Type" />
      </Box>

      <Box>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="upload"
          types={fileType === "image" ? images : ["jpeg"]}
          children={<UploadComponent />}
        />
      </Box>

      <Box
        sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
        mt={2}
      >
        <Typography sx={{fontSize: "0.8rem", color: "#000000"}}>
          {file
            ? `File name: ${file[0].name}`
            : "You haven't selected any file"}
        </Typography>
      </Box>

      <Box sx={{display: "flex", alignItems: "center"}} mt={2}>
        <Button
          variant="outlined"
          color="error"
          size="small"
          sx={{
            textTransform: "capitalize",
            marginRight: "15px",
          }}
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{textTransform: "capitalize"}}
          //onClick={handleSubmit(onSubmit)}
          size="small"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default LeadUpload;
