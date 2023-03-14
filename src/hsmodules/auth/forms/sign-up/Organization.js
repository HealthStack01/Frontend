import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useForm} from "react-hook-form";
import Input from "../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../components/inputs/basic/Select";

import {facilityTypes} from "../../../app/facility-types";

const OrganizationForm = ({
  register,
  control,
  errors,
  watch,
  setValue,
  option = "",
}) => {
  const [selectedType, setSelectedType] = useState(null);
  // const {reset, handleSubmit, register, control} = useForm();

  const filterFacilityTypes =
    option !== ""
      ? facilityTypes.filter(item => item.option === option)
      : facilityTypes;

  const facTypes = filterFacilityTypes
    .map(item => item.type)
    .sort((a, b) => a.localeCompare(b));

  const type = watch("facilityType");

  useEffect(() => {
    setSelectedType(facilityTypes.find(item => item.type === type));
    setValue("facilityCategory", "");
  }, [type]);

  ///const selectedType = facilityTypes.find(item => item.type === type);

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
        options={facTypes}
        important
      />

      <CustomSelect
        label="Organization Category"
        control={control}
        name="facilityCategory"
        //required={"Select Organization Category"}
        errorText={errors?.facilityCategory?.message}
        options={
          selectedType
            ? selectedType?.categories?.sort((a, b) => a.localeCompare(b))
            : []
        }
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
