import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import {useWatch, useController} from "react-hook-form";
//import {FormLabel} from "../";

const CheckboxGroup = ({control, label, name, options, row, disabled}) => {
  const {
    field: {ref, value, onChange, ...inputProps},
    formState: {errors},
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const checkboxIds = useWatch({control, name: name}) || [];

  const handleChange = value => {
    const newArray = [...checkboxIds];
    const item = value;

    //Ensure array isnt empty
    if (newArray.length > 0) {
      //Attempt to find an item in array with matching id
      const index = newArray.findIndex(x => x === item);

      // If theres no match add item to the array
      if (index === -1) {
        newArray.push(item);
      } else {
        //If there is a match and the value is empty, remove the item from the array
        newArray.splice(index, 1);
      }
    } else {
      //If the array is empty, add the item to the array
      newArray.push(item);
    }

    //Overwrite existing array with newArray}
    onChange(newArray);
  };

  return (
    <div>
      <FormControl sx={{marginTop: "0.75rem"}}>
        <FormLabel
          sx={{color: "#000000", fontSize: "0.85rem"}}
          component="legend"
        >
          {label}
        </FormLabel>
        <FormGroup row={row || true}>
          {options.map(option => (
            <FormControlLabel
              //classes={row && {root: classes.label}}
              control={
                <Checkbox
                  checked={value?.includes(option)}
                  {...inputProps}
                  inputRef={ref}
                  onChange={() => handleChange(option)}
                  size="small"
                  disabled={disabled}
                />
              }
              label={
                <Typography sx={{fontSize: "0.8rem", marginLeft: "-5px"}}>
                  {option}
                </Typography>
              }
              key={option}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormHelperText error variant="outlined">
        {errors?.[name]?.message || " "}
      </FormHelperText>
    </div>
  );
};

export default CheckboxGroup;
