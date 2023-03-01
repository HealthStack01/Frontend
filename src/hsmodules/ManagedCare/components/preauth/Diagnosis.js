import {useEffect, useState} from "react";
import {Box} from "@mui/system";

import {FormsHeaderText} from "../../../../components/texts";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {useForm} from "react-hook-form";
import Input from "../../../../components/inputs/basic/Input";
import {Grid} from "@mui/material";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";
import CustomSelect from "../../../../components/inputs/basic/Select";

const ClaimCreateDiagnosis = ({setDiagnosis, closeModal}) => {
  const {control, register, reset, handleSubmit, watch, setValue} = useForm();
  const [data, setData] = useState([]);

  const handleAddDiagnosis = data => {
    const diagnosis = {
      ...data,
      _id: uuidv4(),
    };
    setDiagnosis(prev => [diagnosis, ...prev]);
    toast.success("Diagnosis successfully listed.");
    reset({
      type: null,
      diagnosis: null,
      code: "",
    });
  };

  return (
    <Box
      sx={{
        width: "600px",
      }}
    >
      <Grid container spacing={2} mb={2}>
        <Grid item lg={12}>
          <CustomSelect
            important
            label="Diagnosis Type"
            control={control}
            name="type"
            options={[
              "Associated diagnosis",
              "Co-morbidity Diagnosis",
              "Principal diagnosis",
              "Provisional Diagnosis",
              "Rule-Out Diagnosis ",
              "Working Diagnosis",
            ]}
          />
        </Grid>

        <Grid item lg={12}>
          <Input
            important
            label="Diagnosis"
            register={register("diagnosis", {
              required: "Please enter Diagnosis",
            })}
          />
        </Grid>

        <Grid item lg={12}>
          <Input
            label="Search for code"
            //disabled
            register={register("code")}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <GlobalCustomButton onClick={handleSubmit(handleAddDiagnosis)}>
          Save Diagnosis
        </GlobalCustomButton>

        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default ClaimCreateDiagnosis;
