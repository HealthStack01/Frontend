import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import {Controller} from "react-hook-form";

interface RadioProps {
  name: string;
  title?: string;
  options: {value: string; label: string; disabled?: boolean}[] | string[];
  onChange?: (e: any) => void;
  defaultValue?: string;
  disabled?: boolean;
  register?: any;
  checked?: any;
  value?: any;
  control?: any;
}

const RadioButton: React.FC<RadioProps> = ({
  name,
  title,
  disabled,
  options,
  onChange,
  defaultValue = "",
  register,
  checked,
  value,
  control,
}) => {
  if (control)
    return (
      <FormControl
        disabled={disabled}
        component="fieldset"
        sx={{width: "100%"}}
      >
        <FormLabel
          sx={{color: "#000000", fontSize: "0.85rem", margin: 0, padding: 0}}
          component="legend"
        >
          {title}
        </FormLabel>

        <Controller
          rules={{required: true}}
          control={control}
          name={name}
          render={({field}) => (
            <RadioGroup {...field}>
              {options.map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={option.value || option || ""}
                  control={
                    <>
                      {console.log(field)}
                      <Radio
                        sx={{margin: 0}}
                        size="small"
                        checked={field.value === option}
                      />
                    </>
                  }
                  label={
                    <Typography sx={{fontSize: "0.8rem", marginLeft: "-5px"}}>
                      {option.label || option || ""}
                    </Typography>
                  }
                  sx={{transform: "scale(0.8)", marginLeft: "-1.2rem"}}
                />
              ))}
            </RadioGroup>
          )}
        />
      </FormControl>
    );
  return (
    <FormControl disabled={disabled} component="fieldset" sx={{width: "100%"}}>
      <FormLabel
        sx={{color: "#000000", fontSize: "0.85rem", margin: 0, padding: 0}}
        component="legend"
      >
        {title}
      </FormLabel>
      <RadioGroup
        row
        aria-label={name}
        name={name}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      >
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            value={option.value || option || ""}
            control={<Radio {...register} sx={{margin: 0}} size="small" />}
            label={
              <Typography sx={{fontSize: "0.8rem", marginLeft: "-5px"}}>
                {option.label || option || ""}
              </Typography>
            }
            disabled={option.disabled}
            defaultValue={defaultValue}
            sx={{transform: "scale(0.8)", marginLeft: "-1.2rem"}}
            // checked={defaultValue === (option.value || option || '')}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;
