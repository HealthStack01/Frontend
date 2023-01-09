import {useState, useEffect, useCallback, useContext} from "react";
import {Box} from "@mui/system";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {Button, Typography} from "@mui/material";
import Textarea from "../../../components/inputs/basic/Textarea";
import {useForm} from "react-hook-form";
import VoiceTextArea from "../../../components/inputs/basic/Textarea/VoiceInput";

const CommunicationChat = () => {
  const [text, setText] = useState("");

  const onSubmit = data => {
    console.log(text);
  };

  return (
    <Box>
      <Button onClick={onSubmit}>Hello, Submit Me</Button>

      <VoiceTextArea
        name="voice"
        label="Testing Voice"
        handleChange={value => setText(value)}
      />
    </Box>
  );
};

export default CommunicationChat;
