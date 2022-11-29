import {FormHelperText} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, {SelectHTMLAttributes, useEffect, useState} from "react";
import {toast} from "react-toastify";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: any;
  name?: string;
  errorText?: string;
  onChange?: (_: any) => void;
  defaultValue?: string;
  readonly?: boolean;
  register?: any;
  disabled?: boolean;
}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  options,
  name,
  defaultValue,
  onChange,
  errorText,
  readonly,
  register,
  disabled = false,
}) => {
  console.log(options);

  return (
    <FormControl
      size="small"
      sx={{
        width: "100%",
      }}
    >
      <InputLabel
        shrink
        sx={{
          "&.MuiInputLabel-root": {
            color: "black",
          },

          "&.Mui-focused": {
            color: "#007aff",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        disabled={disabled}
        label={label}
        name={name}
        notched
        //defaultValue={defaultValue || "Cash"}
        onChange={onChange}
        sx={{
          background: "white",
          height: "2.2rem",
          color: "#000000",
          fontSize: "0.93rem",

          "& 	.MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "black",
          },
        }}
        //inputRef={register}
        {...register}
        value={defaultValue}
      >
        <MenuItem value="" sx={{width: "100%"}}>
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            value={option.value ? option.value : option}
            key={index}
            sx={{width: "100%"}}
          >
            {option.label ? option.label : option}
          </MenuItem>
        ))}
      </Select>
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;

// import {FormHelperText} from "@mui/material";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import React, {SelectHTMLAttributes, useEffect, useState} from "react";
// import {Controller} from "react-hook-form";

// interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
//   label?: string;
//   options: any;
//   name?: string;
//   errorText?: string;
//   onChange?: (_: any) => void;
//   defaultValue?: string;
//   readonly?: boolean;
//   register?: any;
//   disabled?: boolean;
//   control?: any;
// }

// const CustomSelect: React.FC<SelectProps> = ({
//   label,
//   options,
//   name,
//   defaultValue,
//   onChange,
//   errorText,
//   readonly,
//   register,
//   disabled = false,
//   control,
// }) => {
//   console.log(options);

//   return (
//     <FormControl
//       disabled={disabled || readonly}
//       size="small"
//       sx={{
//         width: "100%",
//       }}
//     >
//       <InputLabel>{label}</InputLabel>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={defaultValue}
//         render={({field}) => (
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             {...field}
//             label={label}
//             disabled={disabled}
//             sx={{background: "white", height: "40px"}}
//           >
//             <MenuItem value="" sx={{width: "100%"}}>
//               <em>None</em>
//             </MenuItem>
//             {options.map((option, index) => (
//               <MenuItem
//                 value={option.value ? option.value : option}
//                 key={index}
//                 sx={{width: "100%"}}
//               >
//                 {option.label ? option.label : option}
//               </MenuItem>
//             ))}
//           </Select>
//         )}
//       />

//       {errorText && <FormHelperText error>{errorText}</FormHelperText>}
//     </FormControl>
//   );
// };

// export default CustomSelect;
