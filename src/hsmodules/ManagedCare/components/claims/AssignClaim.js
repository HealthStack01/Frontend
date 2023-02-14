import {useState} from "react";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import GroupedRadio from "../../../../components/inputs/basic/Radio/GroupedRadio";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

const AssignClaim = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const {control, register} = useForm();

  return (
    <Box
      sx={{
        width: "600px",
      }}
    >
      <Grid container spacing={0.5} mb={2}>
        <Grid item xs={12}>
          <GroupedRadio
            control={control}
            label="Assign Condition"
            name="condition"
            options={["Vetting", "Auditing"]}
          />
        </Grid>

        <Grid item xs={12}>
          <EmployeeSearch />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <GlobalCustomButton color="success">Assign Claim</GlobalCustomButton>

        <GlobalCustomButton color="error">Cancel</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default AssignClaim;
