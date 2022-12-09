import {Box, Button, Grid} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {FacilitySearch} from "../../../helpers/FacilitySearch";
import {useForm} from "react-hook-form";
import Textarea from "../../../../components/inputs/basic/Textarea";
import MuiCustomTimePicker from "../../../../components/inputs/Date/MuiTimePicker";
import {useState} from "react";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

const AppointmentDetail = ({closeModal}) => {
  const {control, register, handleSubmit} = useForm();
  const [edit, setEdit] = useState(false);

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Box sx={{width: "500px", maxHeight: "80vh"}}>
      <Box
        sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}
        gap={1.5}
      >
        {!edit ? (
          <GlobalCustomButton onClick={() => setEdit(true)} color="secondary">
            Edit
          </GlobalCustomButton>
        ) : (
          <>
            {" "}
            <GlobalCustomButton color="warning" onClick={closeModal}>
              Cancel
            </GlobalCustomButton>
            <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
              Update
            </GlobalCustomButton>
          </>
        )}
      </Box>
      <Grid container spacing={1} pt={1}>
        <Grid item xs={12}>
          {edit ? (
            <FacilitySearch />
          ) : (
            <Input defaultValue="NPA Lagos-Nigeria" />
          )}
        </Grid>

        <Grid item xs={12}>
          <Input
            label="Company Email"
            register={register("email")}
            defaultValue="companyemail@email.com"
            disabled={!edit}
          />
        </Grid>

        <Grid item xs={6}>
          <MuiCustomDatePicker
            label="Date"
            name="date"
            control={control}
            disabled={edit}
          />
        </Grid>

        <Grid item xs={6}>
          <MuiCustomTimePicker
            label="Time"
            name="time"
            control={control}
            disabled={!edit}
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            disabled={!edit}
            label="Apppointment Information"
            placeholder="Write here..."
            register={register("information")}
            defaultValue="Lorem ipsum dolor sit amet. Aut veniam quod aut voluptatem aliquam est error quas quo aliquid galisum et minus aliquam. Sed sapiente veniam et omnis inventore ut veritatis sunt ut incidunt voluptatibus? Et pariatur vitae aut consequatur blanditiis 33 quia assumenda qui adipisci cupiditate. In dolores nesciunt est placeat praesentium et iure nihil qui amet accusantium"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentDetail;
