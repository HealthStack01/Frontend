import {Box} from "@mui/material";
import {useForm} from "react-hook-form";
import Input from "../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../components/inputs/basic/Select";

const OrganizationForm = ({register, control, errors}) => {
  // const {reset, handleSubmit, register, control} = useForm();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      gap={2}
    >
      <Input
        label="Organization Name"
        register={register("facilityName")}
        errorText={errors?.facilityName?.message}
        important
      />

      <Input
        label="Organization CEO"
        register={register("facilityOwner")}
        errorText={errors?.facilityOwner?.message}
        important
      />

      <CustomSelect
        label="Organization Type"
        control={control}
        name="facilityType"
        errorText={errors?.facilityType?.message}
        options={[
          "Diagnostic Lab",
          "Diagnostics Imaging",
          "HMO",
          "Hospital",
          "Pharmacy",
          "Others",
        ]}
        important
      />

      <CustomSelect
        label="Organization Category"
        control={control}
        name="facilityCategory"
        required={"Select Organization Category"}
        errorText={errors?.facilityCategory?.message}
        options={["Healthcare", "Finance"]}
        important
      />

      <Input
        label="CAC Number"
        register={register("facilityCAC")}
        errorText={errors?.facilityCAC?.message}
        important
      />
    </Box>
  );
};

export default OrganizationForm;
