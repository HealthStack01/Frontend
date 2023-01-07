import {useState, useEffect, useCallback, useContext} from "react";
import {Box} from "@mui/system";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {Typography} from "@mui/material";
import Textarea from "../../../components/inputs/basic/Textarea";

const CommunicationChat = () => {
  const [text, setText] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartRecording = () => {
    console.log("recording started");
    SpeechRecognition.startListening({continuous: true});
  };

  const handleStopRecording = () => {
    console.log("Recording has stopped");
    SpeechRecognition.stopListening();
  };

  return (
    <Box>
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
          Microphone: {listening ? "on" : "off"}
        </Typography>
      </Box>

      <Textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={handleStartRecording}
        onBlur={handleStopRecording}
      />
    </Box>
  );
};

export default CommunicationChat;
