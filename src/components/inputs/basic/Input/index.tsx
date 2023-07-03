import React from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import { InputBox, InputField, InputLabel } from "./styles";

interface InputProps {
  label?: string;
  inputId?: string;
  errors?: boolean;
  errorText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (_) => void;
  helperText?: string;
  name?: string;
  type?: string;
  defaultValue?: string;
  value?: any;
  placeholder?: string;
  size?: "small" | "medium";
  disabled?: boolean;
  inputRef?: any;
  register?: any;
  onBlur?: () => void;
  autoComplete?: boolean;
  sx?: {};
  important?: boolean;
  labelObj?: any;
}

// Reset Input MUI

// https://stackoverflow.com/questions/57419955/how-to-set-or-clear-value-of-material-ui-input-in-reactjs

const Input: React.FC<InputProps> = ({
  label,
  errorText,
  type,
  name,
  defaultValue = "",
  onChange,
  onKeyDown,
  placeholder,
  // size = 'medium',
  disabled = false,
  register,
  value,
  autoComplete = true,
  onBlur,
  sx,
  inputRef,
  important,
}) => (
  <div>
    <InputBox>
      <InputField
        onChange={onChange}
        type={type ? type : "text"}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        {...register}
        onBlur={onBlur}
        autoComplete={autoComplete}
        sx={{ width: "16px", ...sx }}
        //className={errorText ? "has-errors" : ""}
        error={errorText ? true : false}
        //error={true}
      />
      <InputLabel
        error={errorText ? true : false}
        className="form__label"
        htmlFor={name}
      >
        {label}
        {important && (
          <AcUnitIcon sx={{ color: "red", width: "12px", height: "12px" }} />
        )}
      </InputLabel>
    </InputBox>
    {errorText && (
      <label style={{ color: "red", fontSize: "0.7rem", textAlign: "left" }}>
        {errorText}
      </label>
    )}
  </div>
);

export default Input;

// Reset Input MUI

// https://stackoverflow.com/questions/57419955/how-to-set-or-clear-value-of-material-ui-input-in-reactjs

export const GoogleInput: React.FC<InputProps> = ({
  label,
  errorText,
  type,
  name,
  defaultValue = "",
  onChange,
  onKeyDown,
  placeholder,
  // size = 'medium',
  disabled = false,
  register,
  value,
  autoComplete = true,
  onBlur,
  sx,
  inputRef,
  important,
}) => (
  <div>
    <InputBox>
      <InputField
        onChange={onChange}
        type={type ? type : "text"}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        {...register}
        ref={(e) => {
          register.ref(e);
          inputRef.current = e;
        }}
        onBlur={onBlur}
        autoComplete={autoComplete}
        sx={{ width: "16px", ...sx }}
        //className={errorText ? "has-errors" : ""}
        error={errorText ? true : false}
        //error={true}

        //ref={inputRef}
      />
      <InputLabel
        error={errorText ? true : false}
        className="form__label"
        htmlFor={name}
      >
        {label}
        {important && (
          <AcUnitIcon sx={{ color: "red", width: "12px", height: "12px" }} />
        )}
      </InputLabel>
    </InputBox>
    {errorText && (
      <label style={{ color: "red", fontSize: "0.7rem", textAlign: "left" }}>
        {errorText}
      </label>
    )}
  </div>
);

export const InputForm: React.FC<InputProps> = ({
  label,
  errorText,
  type,
  name,
  defaultValue = "",
  onChange,
  onKeyDown,
  placeholder,
  // size = 'medium',
  disabled = false,
  register,
  value,
  autoComplete = true,
  onBlur,
  sx,
  inputRef,
  important,
  labelObj = { sup: false, supValue: "", sub: false, subValue: "" },
}) => (
  <div>
    <InputBox>
      <InputField
        onChange={onChange}
        type={type ? type : "text"}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        {...register}
        onBlur={onBlur}
        autoComplete={autoComplete}
        sx={{ width: "16px", ...sx }}
        //className={errorText ? "has-errors" : ""}
        error={errorText ? true : false}
        //error={true}
      />
      <InputLabel
        error={errorText ? true : false}
        className="form__label"
        htmlFor={name}
      >
        {label}
        {labelObj.sub ? (
          <span style={{ fontSize: "0.8rem", verticalAlign: "sub" }}>
            {labelObj.subValue}
          </span>
        ) : labelObj.sup ? (
          <span
            style={{
              fontSize: "0.8rem",
              verticalAlign: "super",
              lineHeight: "1",
            }}
          >
            {labelObj.supValue}
          </span>
        ) : (
          ""
        )}
        {important && (
          <AcUnitIcon sx={{ color: "red", width: "12px", height: "12px" }} />
        )}
      </InputLabel>
    </InputBox>
    {errorText && (
      <label style={{ color: "red", fontSize: "0.7rem", textAlign: "left" }}>
        {errorText}
      </label>
    )}
  </div>
);
