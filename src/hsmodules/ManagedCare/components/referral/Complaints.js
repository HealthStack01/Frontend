import {useEffect, useState} from "react";
import {Box} from "@mui/system";

import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {useForm} from "react-hook-form";
import Input from "../../../../components/inputs/basic/Input";
import {Grid} from "@mui/material";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
import CustomSelect from "../../../../components/inputs/basic/Select";

const CreateComplaints = ({setComplaints, closeModal}) => {
  const {control, register, reset, handleSubmit, watch, setValue} = useForm();
  const [data, setData] = useState([]);

  const handleAddComplaint = data => {
    const complaint = {
      complaint: data.complaint,
      duration: `${data.length} ${data.calendrical}`,
      _id: uuidv4(),
    };
    setComplaints(prev => [complaint, ...prev]);
    toast.success("Complaint successfully listed.");
    reset({
      start_date: null,
      end_date: null,
      duration: "",
      complaint: "",
    });
  };

  return (
    <Box
      sx={{
        width: "750px",
      }}
    >
      <Grid container spacing={2} mb={2}>
        <Grid item lg={12}>
          <Input
            important
            label="Complaint"
            register={register("complaint", {
              required: "Please enter complaint",
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomSelect
            label="Calendrical Duration"
            options={["Day(s)", "Week(s)", "Month(s)", "Year(s)"]}
            control={control}
            name="calendrical"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            register={register("length", {required: true})}
            label="Duration Legnth"
            type="number"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <GlobalCustomButton onClick={handleSubmit(handleAddComplaint)}>
          Save Complaint
        </GlobalCustomButton>

        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default CreateComplaints;
