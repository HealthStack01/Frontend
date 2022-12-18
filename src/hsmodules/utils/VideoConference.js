/* eslint-disable */
// import {Button} from "@mui/material";
import {Button} from "@mui/material";
import React, {useState, useContext, useEffect, useRef} from "react";
import Draggable from "react-draggable";
import {Jutsu} from "react-jutsu";
import GlobalCustomButton from "../../components/buttons/CustomButton";
//import Button from "../../components/buttons/Button";
//import { useJitsi } from 'react-jutsu' // Custom hook
import {UserContext, ObjectContext} from "../../context";

const VideoConference = ({activateCall, setActivateCall, label}) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const client = state.ClientModule.selectedClient;
  const {user, setUser} = useContext(UserContext);

  const handleClick = event => {
    event.preventDefault();
    setRoom(client._id);
    setName(user.firstname);
    setActivateCall(true);

    // alert(`Kindly share link with client and other collaborators: https://meet.jit.si/${client._id}`)
  };

  return activateCall ? (
    <Draggable>
      <div
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "500px",
          height: "300px",
          backgroundColor: "#4d4d4d",
          zIndex: "9999",
        }}
      >
        <Jutsu
          roomName={room}
          displayName={name}
          password={password}
          onMeetingEnd={() => setActivateCall(false)}
          loadingComponent={<p>loading ...</p>}
          errorComponent={
            <>
              <p>Oops, something went wrong</p>{" "}
            </>
          }
          containerStyles={{width: "100%", height: "220px"}}
        />
        <div
          style={{
            width: "100%",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span style={{fontSize: "20px", color: "#ffffff", fontWeight: "600"}}>
            Click here to Drag
          </span>
        </div>
      </div>
    </Draggable>
  ) : (
    <form>
      <GlobalCustomButton
        color="success"
        onClick={e => handleClick(e)}
        sx={{
          width: "100%",
        }}
      >
        {label || "Teleconsultation"}
      </GlobalCustomButton>
    </form>
  );
};

export default VideoConference;
