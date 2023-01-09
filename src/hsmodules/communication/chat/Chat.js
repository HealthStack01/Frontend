import {useState, useEffect, useCallback, useContext} from "react";
import {Box} from "@mui/system";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {Button, Typography} from "@mui/material";
import Textarea from "../../../components/inputs/basic/Textarea";
import {useForm} from "react-hook-form";
import VoiceTextArea from "../../../components/inputs/basic/Textarea/VoiceInput";
import CommunicationChatStaffsList from "./components/staffs-list/staffs-list";

const CommunicationChat = () => {
  const [text, setText] = useState("");

  const onSubmit = data => {
    console.log(text);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 60px)",
        backgroundColor: "green",
      }}
    >
      <Box sx={{height: "100%", width: "400px", background: "#ffffff"}}>
        <CommunicationChatStaffsList />
      </Box>
    </Box>
  );
};

export default CommunicationChat;
