import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Typography} from "@mui/material";
import {Controller} from "react-hook-form";

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
  value?: any;
  control?: any;
  name?: string;
  defaultChecked?: boolean;
  defaultValue?: any;
}

const SingleCheckbox = ({
  checked,
  label,
  disabled,
  onChange,
  register,
  size = "small",
  control,
  name,
  defaultChecked,
  defaultValue,
  value,
}: componentProps) => {
  console.log("Single Check Box", defaultChecked);
  if (control)
    return (
      <FormControlLabel
        label={label}
        control={
          <Controller
            name={name}
            control={control}
            defaultValue={!!defaultChecked}
            render={({field}) => (
              <Checkbox
                checked={field.value}
                onChange={field.onChange}
                inputProps={{"aria-label": "controlled"}}
                size={"small"}
              />
            )}
          />
        }
      />
    );
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
            // value={value}
          />
        }
      />
    </FormGroup>
  );
};

export default SingleCheckbox;
