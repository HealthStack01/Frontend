import {Box} from "@mui/material";

import {Nigeria} from "../../../app/Nigeria";
import Input from "../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../components/inputs/basic/Select";

const ContactForm = ({register, control, watch, errors}) => {
  const states = Nigeria.map(obj => obj.state);

  //alphabetically arrange state
  const sortedStates = states.sort((a, b) => a.localeCompare(b));

  const title = watch("facilityState");

  const selectedState = Nigeria.find(item => item.state === title);
  //console.log(selectedState);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      gap={2}
    >
      <CustomSelect
        label="Country"
        control={control}
        name="facilityCountry"
        errorText={errors?.facilityCountry?.message}
        options={["Nigeria"]}
        important
      />

      <CustomSelect
        label="State"
        control={control}
        name="facilityState"
        errorText={errors?.facilityState?.message}
        options={sortedStates}
        important
      />

      <CustomSelect
        label="LGA"
        control={control}
        name="facilityLGA"
        errorText={errors?.facilityLGA?.message}
        options={
          selectedState
            ? selectedState.lgas.sort((a, b) => a.localeCompare(b))
            : []
        }
        important
      />

      <CustomSelect
        label="City"
        control={control}
        name="facilityCity"
        errorText={errors?.facilityCity?.message}
        options={
          selectedState
            ? selectedState.lgas.sort((a, b) => a.localeCompare(b))
            : []
        }
        important
      />

      <Input
        label="Official Address"
        register={register("facilityAddress")}
        errorText={errors?.facilityAddress?.message}
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
