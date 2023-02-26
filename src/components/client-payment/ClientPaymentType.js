import {useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Box} from "@mui/material";

const ClientPaymentTypeSelect = ({payments, handleChange}) => {
  const [value, setValue] = useState("");

  const onChange = val => {
    handleChange(val);
  };

  // console.log(payments);

  return (
    <Autocomplete
      id="client-payment-select"
      sx={{width: "100%"}}
      //value={value}
      onChange={(event, newValue, reason) => {
        if (reason === "clear") {
          setValue("");
        } else {
          onChange(newValue);
        }
      }}
      options={payments || []}
      autoHighlight
      getOptionLabel={option =>
        `${option.paymentmode}  ${
          option.organizationName && `- ${option.organizationName}`
        }`
      }
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{fontSize: "0.85rem"}}>
          {option.paymentmode}{" "}
          {option.organizationName && `- ${option.organizationName}`}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          label={"Choose Payment Type"}
          //ref={inputEl}
          sx={{
            fontSize: "0.75rem",
            backgroundColor: "#ffffff",
            "& .MuiInputBase-input": {
              height: "0.9rem",
              fontSize: "0.8rem",
            },
          }}
          InputLabelProps={{
            Autocomplete: "new-password",
            shrink: true,
            style: {color: "#2d2d2d"},
          }}
        />
      )}
    />
  );
};

export default ClientPaymentTypeSelect;
