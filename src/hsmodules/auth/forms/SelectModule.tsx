import {Box, FormGroup, Stack} from "@mui/material";
import React from "react";

import DynamicInput from "../../../components/inputs/DynamicInput";
import {ModulesSchema} from "../../app/schema/ModelSchema";

function SelectModule({control}) {
  return (
    <Stack spacing={3} sx={{width: "100%", mt: 4, mb: 4}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {ModulesSchema.map((field, i) => (
          <FormGroup key={i}>
            <DynamicInput
              {...field}
              key={i}
              name={field.key}
              control={control}
              label={field.name}
              inputType={field.inputType}
              options={field.options || []}
            />
          </FormGroup>
        ))}
      </Box>
    </Stack>
  );
}

export default SelectModule;
