import {Box} from "@mui/system";
import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import {Controller, useForm} from "react-hook-form";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import GlobalCustomButton from "../../../buttons/CustomButton";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

import styled from "styled-components";

const TextareaField = styled.textarea<any>`
  padding: 0.9rem;
  width: 100%;
  min-height: 8rem;
  font-size: 0.85rem;
  border: 1.5px solid
    ${({theme, errorText}) => (!errorText ? theme.grayTwo : "red")};
  width: 100%;
  resize: none;
  &:hover {
    border: 1px solid #000000;
  }
  &:focus {
    border: 2px solid #3779eb;
  }
  &:disabled {
    color: #000000;
  }
`;

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorText?: string;
  register?: any;
  placeholder?: string;
  sx?: string;
  control?: any;
  handleOnBlur?: any;
  onFocus?: any;
  required?: boolean;
  name?: string;
  value?: string;
  handleChange?: (value: string) => void;
}

const VoiceTextArea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  register,
  sx,
  control,
  handleOnBlur,
  onFocus,
  required = false,
  name,
  handleChange,
  value,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [useVoice, setUseVoice] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const inputRef = useRef(null);

  const handleStartRecording = () => {
    // console.log("recording started");
    SpeechRecognition.startListening({continuous: true});
    inputRef.current.focus();
  };

  const handleStopRecording = () => {
    //console.log("Recording has stopped");
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    handleChange(transcript);
  }, [transcript]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "30px",
          backgroundColor: "#fff",
          border: "1.5px solid #BBBBBB",
          borderBottom: "none",
          paddingRight: "5px",
        }}
      >
        <Box sx={{display: "flex"}}>
          <GlobalCustomButton
            variant="text"
            color="success"
            onClick={handleStartRecording}
          >
            Start
          </GlobalCustomButton>
          <GlobalCustomButton
            variant="text"
            color="error"
            onClick={handleStopRecording}
          >
            Stop
          </GlobalCustomButton>
          <GlobalCustomButton
            variant="text"
            color="warning"
            onClick={() => resetTranscript()}
          >
            Clear
          </GlobalCustomButton>
        </Box>

        {listening ? <MicIcon /> : <MicOffIcon />}
      </Box>
      <Box>
        <TextareaField
          value={transcript}
          name={name}
          placeholder={placeholder}
          ref={inputRef}
        />
      </Box>
    </Box>
  );
};

export default VoiceTextArea;
