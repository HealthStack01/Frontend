import {useState, useEffect} from "react";
import {Box} from "@mui/material";

import {Nigeria} from "../../../app/Nigeria";
import Input from "../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GoogleAddressInput from "../../../../components/google-autocomplete";

const ContactForm = ({register, control, watch, errors, setValue}) => {
  // const [selectedState, setSelectedState] = useState(null);
  // const states = Nigeria.map(obj => obj.state);

  // //alphabetically arrange state
  // const sortedStates = states.sort((a, b) => a.localeCompare(b));

  // const state = watch("facilityState");

  // useEffect(() => {
  //   setSelectedState(Nigeria.find(item => item.state === state));
  //   setValue("facilityCity", "");
  //   setValue("facilityLGA", "");
  // }, [state]);

  //const selectedState = Nigeria.find(item => item.state === state);
  //console.log(selectedState);

  const handleGoogleAddressSelect = obj => {
    //console.log(obj);
    setValue("facilityAddress", obj.address);
    setValue("facilityState", obj.state);
    setValue("facilityCity", obj.lga);
    setValue("facilityLGA", obj.lga);
    setValue("facilityCountry", obj.country);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      gap={2}
    >
      <GoogleAddressInput
        label="Official Address"
        register={register("facilityAddress")}
        getSelectedAddress={handleGoogleAddressSelect}
        errorText={errors?.facilityAddress?.message}
      />

      <Input
        label="LGA"
        register={register("facilityLGA")}
        errorText={errors?.facilityLGA?.message}
        important
      />

      <Input
        label="City"
        register={register("facilityCity")}
        errorText={errors?.facilityCity?.message}
        important
      />

      <Input
        label="State"
        register={register("facilityState")}
        errorText={errors?.facilityState?.message}
        important
      />
      <Input
        label="Country"
        register={register("facilityCountry")}
        errorText={errors?.facilityCountry?.message}
        important
      />

      <Input
        label="Phone Number"
        register={register("facilityContactPhone")}
        errorText={errors?.facilityContactPhone?.message}
        important
      />

      <Input
        label="Email Address"
        register={register("facilityEmail")}
        errorText={errors?.facilityEmail?.message}
        important
      />
    </Box>
  );
};

export default ContactForm;
