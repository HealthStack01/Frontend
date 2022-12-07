import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Typography} from "@mui/material";

interface componentProps {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  register: any;
  size: string;
}

const SingleCheckbox = ({
  checked,
  label,
  disabled,
  onChange,
  register,
  size = "small",
}: componentProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        label={
          <Typography sx={{fontSize: "0.8rem", marginLeft: "-5px"}}>
            {label}
          </Typography>
        }
        control={
          <Checkbox
            inputProps={{"aria-label": "controlled"}}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            {...register}
            size={size}
          />
        }
      />
    </FormGroup>
  );
};

export default SingleCheckbox;
