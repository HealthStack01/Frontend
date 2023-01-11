import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import React, {useContext, useEffect, useRef, useState} from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {useNavigate} from "react-router-dom";

import {Models} from "../../hsmodules/app/Constants";
import useRepository from "../hooks/repository";
import {FileUploader} from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import axios from "axios";
import {toast} from "react-toastify";
import {getBase64} from "../../hsmodules/helpers/getBase64";
import client from "../../feathers";
import {ObjectContext, UserContext} from "../../context";
import {Box} from "@mui/system";
import GlobalCustomButton from "../buttons/CustomButton";
import ModalBox from "../modal";
//import {Avatar} from "../topmenu/styles";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageUploadModal, setImageUploadModal] = useState(false);

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleOpenOptions = event => {
    setAnchorEl(event.currentTarget);
  };

  // return focus to the button when we transitioned from !open -> open

  return (
    <div style={{position: "relative", zIndex: "100"}}>
      <ModalBox
        open={imageUploadModal}
        onClose={() => setImageUploadModal(false)}
        header="Upload New Profile Photo"
      >
        <UpdateProfilePhoto closeModal={() => setImageUploadModal(false)} />
      </ModalBox>
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <IconButton onClick={handleOpenOptions}>
          <Avatar src={user.currentEmployee.imageurl} />
        </IconButton>

        {/* <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {user.firstname} {user.lastname}
        </Typography> */}
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleCloseOptions}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        // sx={{padding: 0}}
      >
        {/* <Typography>
          {user.firstname} {user.lastname}
        </Typography> */}
        {/* <MenuItem>View Logo</MenuItem> */}
        <MenuItem sx={{fontSize: "0.85rem"}}>Remove Image</MenuItem>
        <MenuItem
          sx={{fontSize: "0.85rem"}}
          onClick={() => {
            setImageUploadModal(true);
            handleCloseOptions();
          }}
        >
          Change Image
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: "0.85rem",
            backgroundColor: "#b21e35",
            color: "#ffffff",
            ":hover": {
              backgroundColor: "#bd1f36",
            },
          }}
          onClick={() => {
            localStorage.setItem("user", "");
            navigate("/");
            handleCloseOptions();
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "100%",
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
      <Typography>Select Logo Image or Drag and Drop here</Typography>
    </Box>
  );
};

export const UpdateProfilePhoto = ({closeModal}) => {
  const employeeServer = client.service("employee");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);

  const [file, setFile] = useState(null);

  const handleChange = file => {
    //console.log(file);
    //setFile(file);

    getBase64(file)
      .then(res => {
        //console.log(res);
        setFile(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUploadLogo = async () => {
    if (file === null) return toast.error("Please select an Image to upload");
    showActionLoader();
    const token = localStorage.getItem("feathers-jwt");
    axios
      .post(
        "https://healthstack-backend.herokuapp.com/upload",
        {uri: file},
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(async res => {
        const imageUrl = res.data.url;
        const employee = user.currentEmployee;

        const documentId = employee._id;

        await employeeServer
          .patch(documentId, {imageurl: imageUrl})
          .then(res => {
            hideActionLoader();
            closeModal();
            toast.success("You've successfully updated your profile photo");
          })
          .catch(err => {
            hideActionLoader();

            toast.error(
              `Error Updating profile photo, probable network issues or ${err}`
            );
          });
      })
      .catch(error => {
        hideActionLoader();
        toast.error(
          `An error occured whilst updating your profile photo ${error}`
        );
        console.log(error);
      });
  };

  return (
    <Box sx={{width: "400px", maxHeight: "80vw"}}>
      {file ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={file}
            alt="logo"
            style={{width: "200px", height: "auto", display: "block"}}
          />
        </Box>
      ) : (
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="upload"
          types={["jpeg", "png", "jpg"]}
          children={<UploadComponent />}
        />
      )}

      <Box sx={{display: "flex"}} gap={2} mt={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleUploadLogo} disabled={file === null}>
          Upload Image
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
