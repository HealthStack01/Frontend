import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React, {useState} from "react";

import {DictionaryOf} from "../../../../../../types";
interface CheckboxProps {
  label: string;
  name?: string;
  errorText?: string;
  disabled?: boolean;
  defaultValue?: string;
  options: any[];
  onChange?: (_) => void;
}

const CheckboxInput: React.FC<CheckboxProps> = ({
  label,
  defaultValue = "",
  onChange,
  disabled,
  errorText,
  options,
}) => {
  const [values, setValues] = useState<DictionaryOf<boolean>>({});

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
      sx={{width: "1r00%", mt: 1, mb: 1}}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            defaultValue={defaultValue}
            control={
              <Checkbox
                name={option.label || option}
                value={option.value || option || ""}
                onChange={handleChange}
                disabled={disabled}
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
