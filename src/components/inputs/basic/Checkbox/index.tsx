import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React, {useState} from "react";

interface CheckboxProps {
  label: string;
  name?: string;
  errorText?: string;
  disabled?: boolean;
  defaultValue?: string;
  options: any[];
  onChange?: (_) => void;
  register?: any;
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
}) => {
  const [values, setValues] = useState({});

  const handleChange = e => {
    const newValues = {...values, [e.target.value]: !values[e.target.value]};
    setValues(newValues);
    const selected = Object.entries(newValues)
      .filter(([, value]) => value)
      .map(([key]) => key);
    onChange({target: {value: selected}});
  };

  return (
    <FormControl
      disabled={disabled}
      component="fieldset"
      sx={{width: "100%", mt: 1, mb: 1}}
    >
      {label && (
        <FormLabel
          sx={{color: "#000000", fontSize: "0.85rem"}}
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
          margin: 0,
        }}
      >
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            defaultValue={defaultValue}
            sx={{transform: "scale(0.8)"}}
            control={
              <Checkbox
                name={name}
                value={option.value || option || ""}
                disabled={disabled}
                {...register}
              />
            }
            label={option.label || option}
          />
        ))}
        <label>{errorText}</label>
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxInput;
