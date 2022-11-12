/* eslint-disable */
// import {Button} from "@mui/material";
import React, {useState, useContext, useEffect, useRef} from "react";
import Draggable from "react-draggable";
import {Jutsu} from "react-jutsu";
import Button from "../../components/buttons/Button";
//import { useJitsi } from 'react-jutsu' // Custom hook
import {UserContext, ObjectContext} from "../../context";

const VideoConference = ({activateCall, setActivateCall}) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [call, setCall] = useState(false);
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
    if (room && name) setActivateCall(true);
    // alert(`Kindly share link with client and other collaborators: https://meet.jit.si/${client._id}`)
  };

  //<Draggable> </Draggable>

  return activateCall ? (
    <Draggable>
      {/* <div
        style={{
          position: "fixed",
          width: "750px",
          height: "500px",
          left: "100px",
          top: "100px",
        }}
      >
        <Jutsu
          roomName={room}
          displayName={name}
          password={password}
          onMeetingEnd={() => setCall(false)}
          loadingComponent={<p>loading ...</p>}
          errorComponent={
            <>
              <p>Oops, something went wrong</p>{" "}
            </>
          }
          containerStyles={{width: "100%", height: "100%"}}
        />
        <p className="bckgrnd">
          {`Kindly share link with client and other collaborators: https://meet.jit.si/${client._id}`}
        </p>
      </div> */}
      <div
        style={{
          position: "fixed",
          right: "calc(50% - 375px)",
          top: "calc(50% - 250px)",
          width: "750px",
          height: "500px",
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
          containerStyles={{width: "100%", height: "430px"}}
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
      {/* <input id='room' type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
      <input id='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /> */}
      {/*  <input id='password' type='text' placeholder='Password (optional)' value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      <Button
        variant="contained"
        onClick={e => handleClick(e)}
        type="submit"
        style={{
          fontSize: "0.9rem",
          width: "100%",
          minHeight: "48px",
        }}
      >
        Join Teleconsultation
      </Button>
    </form>
  );
};

export default VideoConference;
