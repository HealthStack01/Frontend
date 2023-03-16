import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./styles.scss";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import Textarea from "../../../../components/inputs/basic/Textarea";

const ProposalDescription = ({setDescription, closeModal, description}) => {
  const [text, setText] = useState("");

  const handleDone = () => {
    setDescription(text);
    closeModal();
  };

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
    // console.log("recording started");
    SpeechRecognition.startListening({continuous: true});
  };

  const handleStopRecording = () => {
    //console.log("Recording has stopped");
    SpeechRecognition.stopListening();
  };

  console.log(transcript);

  return (
    <Box
      sx={{
        width: "600px",
        maxHeight: "80vh",
      }}
    >
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

      {/* <CKEditor
        editor={ClassicEditor}
        data={transcript}
        onChange={(event, editor) => {
          const data = editor.getData();
          setText(data);
        }}
        onFocus={handleStartRecording}
        onBlur={handleStopRecording}
      /> */}

      <Box mt={2}>
        <GlobalCustomButton
          onClick={closeModal}
          sx={{marginRight: "5px"}}
          variant="outlined"
          color="error"
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleDone}>Done</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default ProposalDescription;
