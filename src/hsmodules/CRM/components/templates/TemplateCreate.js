import {useContext, useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {FileUploader} from "react-drag-drop-files";
import CustomSelect from "../../../../components/inputs/basic/Select";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import moment from "moment";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import client from "../../../../feathers";
import {toast} from "react-toastify";
import {ObjectContext, UserContext} from "../../../../context";
import axios from "axios";
import {getBase64} from "../../../helpers/getBase64";
import Textarea from "../../../../components/inputs/basic/Textarea";

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

const TemplateCreate = ({closeModal}) => {
  const dealServer = client.service("deal");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("");
  const [docType, setDoctype] = useState("");
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState(null);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);

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

  const imageTypes = ["png", "jpg", "jpeg"];
  const docTypes = ["docx", "doc"];

  const handleChange = file => {
    getBase64(file[0])
      .then(res => {
        // console.log(file);
        setFile(file);
        setBase64(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUploadFile = async () => {
    return toast.error("Danger Zone, keep off!!");
    if (file === null || base64 === null)
      return toast.error("Please select a File to upload");

    showActionLoader();

    const token = localStorage.getItem("feathers-jwt");

    axios
      .post(
        "https://healthstack-backend.herokuapp.com/upload",
        {uri: base64},
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(async res => {
        const employee = user.currentEmployee;
        const currentDeal = state.DealModule.selectedDeal;

        const document = {
          uploadUrl: res.data.url,
          uploadType: res.data.contentType,
          fileType: file[0].name.split(".").pop(),
          name: file[0].name,
          template: docType,
          uploadedAt: new Date(),
          uploadedBy: employee.userId,
          uploadedByName: `${employee.firstname} ${employee.lastname}`,
          comment: description,
          dealId: currentDeal._id,
        };

        const prevUploads = currentDeal.uploads || [];

        const newUploads = [document, ...prevUploads];

        const documentId = currentDeal._id;

        await dealServer
          .patch(documentId, {uploads: newUploads})
          .then(resp => {
            hideActionLoader();
            setState(prev => ({
              ...prev,
              DealModule: {...prev.DealModule, selectedDeal: resp},
            }));
            closeModal();
            toast.success("You have successfully uploaded a Template");
          })
          .catch(error => {
            hideActionLoader();
            toast.error(
              `An error occured whilst uploading the Template ${error}`
            );
            console.error(error);
          });
      })
      .catch(error => {
        hideActionLoader();
        toast.error(`An error occured whilst uploading the Template ${error}`);
        console.log(error);
      });
  };

  return (
    <Box sx={{width: "500px", maxHeight: "600px"}}>
      <Box mt={1} mb={2}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomSelect
              options={["SLA", "Letter of Intrest", "Invoice", "Proposal"]}
              label="Type"
              onChange={e => setDoctype(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="upload"
          types={docTypes}
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

      <Box>
        <Textarea
          label="Comment"
          placeholder="write here..."
          onChange={e => setDescription(e.target.value)}
        />
      </Box>

      <Box sx={{display: "flex", alignItems: "center"}} mt={2} gap={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          variant="contained"
          onClick={handleUploadFile}
          disabled={file === null || base64 === null}
        >
          <UploadFileIcon fontSize="small" sx={{marginRight: "5px"}} />
          Upload File
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default TemplateCreate;
