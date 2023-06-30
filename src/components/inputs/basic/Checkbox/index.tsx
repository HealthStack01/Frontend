import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

interface CheckboxProps {
  label: string;
  name?: string;
  errorText?: string;
  disabled?: boolean;
  defaultValue?: string;
  options: any[];
  onChange?: (_) => void;
  register?: any;
  control?: any;
}

const CheckboxInput: React.FC<CheckboxProps> = ({
  label,
  defaultValue = "",
  onChange,
  disabled,
  errorText,
  options,
  register,
  name,
  control,
}) => {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const newValues = { ...values, [e.target.value]: !values[e.target.value] };
    setValues(newValues);
    const selected = Object.entries(newValues)
      .filter(([, value]) => value)
      .map(([key]) => key);
    onChange({ target: { value: selected } });
  };

  if (control)
    return (
      <FormControl
        disabled={disabled}
        component="fieldset"
        sx={{ width: "100%", mt: 1, mb: 1 }}
      >
        {label && (
          <FormLabel
            sx={{ color: "#000000", fontSize: "0.85rem" }}
            component="legend"
          >
            {label}
          </FormLabel>
        )}

        <FormGroup
          onChange={handleChange}
          defaultValue={defaultValue}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignContent: "flex-start",
          }}
        >
          {options.map((option, i) => (
            <Controller
              key={i}
              name={name}
              control={control}
              defaultValue={false}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { isTouched, isDirty, error },
                formState,
              }) => (
                <FormControlLabel
                  label={
                    <Typography sx={{ fontSize: "0.8rem", marginLeft: "-5px" }}>
                      {option.label || option}
                    </Typography>
                  }
                  control={
                    <Checkbox
                      onChange={onChange}
                      checked={value}
                      ref={ref}
                      name={name}
                      size="small"
                    />
                  }
                />
              )}
            />
          ))}
          <label>{errorText}</label>
        </FormGroup>
      </FormControl>
    );
  return (
    <FormControl
      disabled={disabled}
      component="fieldset"
      sx={{ width: "100%", mt: 1, mb: 1 }}
    >
      {label && (
        <FormLabel
          sx={{ color: "#000000", fontSize: "0.85rem" }}
          component="legend"
        >
          {label}
        </FormLabel>
      )}

      <FormGroup
        onChange={handleChange}
        defaultValue={defaultValue}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "flex-start",
        }}
      >
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            defaultValue={defaultValue}
            label={
              <Typography sx={{ fontSize: "0.8rem", marginLeft: "-5px" }}>
                {option.label || option}
              </Typography>
            }
            control={
              <Checkbox
                name={name}
                value={option.value || option || ""}
                disabled={disabled}
                {...register}
                size="small"
              />
            }
          />
        ))}
        <label>{errorText}</label>
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxInput;
