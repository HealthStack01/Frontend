import React from "react";
import {Box} from "@mui/material";
import Textarea from ".";
import GlobalCustomButton from "../../../buttons/CustomButton";
import VoiceTextArea from "./VoiceInput";
import {FormsHeaderText} from "../../../texts";

interface componentProps {
  changeType: (type: string) => null;
  type: string;
  voiceOnChange: () => null;
  name: string;
  label: string;
  register: any;
}

const TextAreaVoiceAndText = ({
  changeType,
  type,
  voiceOnChange,
  name,
  label,
  register,
}: componentProps) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text={label} />

        <Box>
          {type === "voice" ? (
            <GlobalCustomButton
              color="success"
              onClick={() => changeType("type")}
            >
              Type
            </GlobalCustomButton>
          ) : (
            <GlobalCustomButton
              color="warning"
              onClick={() => changeType("voice")}
            >
              Speech
            </GlobalCustomButton>
          )}
        </Box>
      </Box>

      {type === "voice" ? (
        <VoiceTextArea
          handleChange={voiceOnChange}
          placeholder="click start before talking...."
        />
      ) : (
        <Textarea register={register} placeholder="Write here......" />
      )}
    </Box>
  );
};

export default TextAreaVoiceAndText;
