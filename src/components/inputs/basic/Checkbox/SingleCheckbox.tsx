import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface componentProps {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

const SingleCheckbox = ({
  checked,
  label,
  disabled,
  onChange,
}: componentProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            inputProps={{"aria-label": "controlled"}}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default SingleCheckbox;
