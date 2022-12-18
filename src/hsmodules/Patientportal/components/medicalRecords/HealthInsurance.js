import {Box,Typography,Stack} from "@mui/material";
import Button from "../../../../components/buttons/CustomButton"


export default function HealthInsurance(){
   return(
    <Box>
    <Stack gap="1rem">
     <Typography color="gray">You dont have any health insurance plan yet</Typography>
     <Button>Get Insurance Now</Button>
    </Stack>
 </Box>
   )
}


export function HealthInsuranceOrg(){
  return(
    <Box>
        <Stack>
            
        </Stack>
    </Box>
  )
}