/* eslint-disable */
// import {Button} from "@mui/material";
import React, {useState, useContext, useEffect, useRef} from "react";
import Draggable from "react-draggable";
import {Jutsu} from "react-jutsu";
import Button from "../../components/buttons/Button";
//import { useJitsi } from 'react-jutsu' // Custom hook
import {UserContext, ObjectContext} from "../../context";

const VideoConference = () => {
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
    if (room && name) setCall(true);
    // alert(`Kindly share link with client and other collaborators: https://meet.jit.si/${client._id}`)
  };

  //<Draggable> </Draggable>

  return call ? (
    <div className="mt-2">
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
        containerStyles={{width: "100%", height: "250px"}}
      />
      <p className="bckgrnd">
        {`Kindly share link with client and other collaborators: https://meet.jit.si/${client._id}`}
      </p>
    </div>
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
          fontSize: "0.8rem",
          width: "100%",
        }}
      >
        Join Teleconsultation
      </Button>
    </form>
  );
};

export default VideoConference;
