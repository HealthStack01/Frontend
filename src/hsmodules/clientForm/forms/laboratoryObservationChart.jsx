import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
// import CustomSelect from "../../../components/inputs/basic/Select";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import { Box, Grid } from "@mui/material";

const LaboratoryObservationChart = ({onSubmit}) => {
  const {register, handleSubmit,control} = useForm();
  return (

    <div className="card">
        <div className="card-header">
          <p className="card-header-title">Laboratory Observation Chart</p>
        </div>
    <form onSubmit={handleSubmit(onSubmit)}>
     
          <Box mb="1rem">
          <Input
                  {...register("name")}
                  name="name"
                  label="Name"
                  type="text"
                  
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('regno')}
                  name="regno"
                  label="Reg.No"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <MuiCustomDatePicker
                     name="date_time"
                     label="Date & Time"
                    control={control}
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('temp')}
                  name="temp"
                  label="Temp"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('p')}
                  name="P"
                  label="P"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('r')}
                  name="R"
                  label="R"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('b/p')}
                  name="b/p"
                  label="B/P"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('fh')}
                  name="fh"
                  label="FH"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('fluid_intake')}
                  name="fluid_intake"
                  label="Fluid Intake"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('fluid_intake')}
                  name="fluid_intake"
                  label="Fluid Intake"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('fluid_output')}
                  name="fluid_output"
                  label="Fluid Output"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('contractions')}
                  name="contractions"
                  label="Contractions Frequency & Strength"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Textarea
             {...register('remark')}
             name="remark"
             label="Remark"
             type="text"
            />
          </Box>
          <Box mb="1rem">
          <GlobalCustomButton
              text="Submit Form"
              customStyles={{
                marginRight: "5px",
              }}
            />
          </Box>
          </form>
          </div>
  );
};

export default LaboratoryObservationChart;
