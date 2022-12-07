import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import { Box, Grid } from "@mui/material";


const PressureAreasTreatmentChart = ({onSubmit}) => {
  const {register, handleSubmit,control} = useForm();
  return (
    <div className="card">
        <div className="card-header">
          <p className="card-header-title">Pressure Areas Treatment Chart</p>
        </div>
    <form onSubmit={handleSubmit(onSubmit)}>
        
          <Box mb="1rem">
          <MuiCustomDatePicker
                     name="date_time"
                     label="Date & Time"
                    control={control}
                  />
          </Box>
<Box mb="1rem">
  <h2>Repositioning (using Codes)</h2>
</Box>
          <Box mb="1rem">
          <Input
                  {...register('from')}
                  name="from"
                  label="From"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('to')}
                  name="to"
                  label="To"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Textarea
                  {...register('pressure_area')}
                  name="pressure_area"
                  label="Pressure Area Treatment"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Textarea
                  {...register('skin_inspection')}
                  name="skin_inspection"
                  label="Skin Inspection Comments"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('name_signature')}
                  name="name_signature"
                  label="Name/Signature"
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

export default PressureAreasTreatmentChart;
