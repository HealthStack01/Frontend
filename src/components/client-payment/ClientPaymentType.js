import {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Box} from "@mui/material";

const ClientPaymentTypeSelect = ({
  payments = [],
  handleChange,
  disabled = false,
}) => {
  const [value, setValue] = useState(null);

  const onChange = val => {
    handleChange(val);
    setValue(val);
  };

  // console.log(payments);

  useEffect(() => {
    if (payments?.some(checkHMO)) {
      const selectedPayment = payments[1];
      setValue(selectedPayment);
      handleChange(selectedPayment);
    } else {
      const selectedPayment = payments[0];
      setValue(selectedPayment);
      handleChange(selectedPayment);
    }
  }, [payments]);

  const checkHMO = obj => obj.paymentmode === "HMO";

  return (
    <Autocomplete
      disabled={disabled}
      id="client-payment-select"
      sx={{width: "100%"}}
      value={value}
      onChange={(event, newValue, reason) => {
        if (reason === "clear") {
          setValue(null);
        } else {
          onChange(newValue);
        }
      }}
      options={payments || []}
      autoHighlight
      getOptionLabel={option =>
        `${option.paymentmode}  ${
          option.organizationName ? `- ${option.organizationName}` : ""
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
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
              color: "black",
            },
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
// sx={{
//       width: "100%",
//       "& .MuiInputBase-input.Mui-disabled": {
//         WebkitTextFillColor: "#000000",
//         color: "black",
//       },
//     }}
