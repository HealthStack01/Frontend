import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import { Box, Grid } from "@mui/material";


const ContinuationSheet = ({onSubmit}) => {
  const {register, handleSubmit,control} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Continuation Sheet</p>
        </div>

       
       <Box mb="1rem">
          <Input
                  {...register("surname")}
                  name="surname"
                  label="Surname"
                  type="text"
                  
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('firstname')}
                  name="firstname"
                  label="Firstname"
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
          <Textarea
              {...register('description')}
              name="description"
              label="Descriptiom/Remark"
             type="text"
            />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('signature')}
                  name="signature"
                  label="Signature"
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
      </div>
    </form>
  );
};

export default ContinuationSheet;
