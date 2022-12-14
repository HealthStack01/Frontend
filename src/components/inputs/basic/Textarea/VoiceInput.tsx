import React, {TextareaHTMLAttributes, useRef, useState} from "react";
import {Controller} from "react-hook-form";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {TextareaField} from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorText?: string;
  register?: any;
  placeholder?: string;
  sx?: string;
  control?: any;
  handleOnBlur?: any;
  onFocus?: any;
  required?: boolean;
  name?: string;
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
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleOnchange = e => {};

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {onChange, onBlur, value, name, ref},
        fieldState: {invalid, isTouched, isDirty, error},
        formState,
      }) => (
        <div>
          <label>{label}</label>
          <TextareaField
            ref={useRef()}
            placeholder={placeholder}
            style={sx}
            name={name}
            value={inputValue}
            onChange={handleOnchange}
            onBlur={handleOnBlur}
            onFocus={onFocus}
          />
        </div>
      )}
    />
  );
};

export default VoiceTextArea;
