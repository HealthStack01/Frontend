import {Box,Typography,Stack} from "@mui/material";
import Button from "../../../../components/buttons/CustomButton"
import {
  Link
} from "react-router-dom"


export default function HealthInsurance(){
   return(
    <Box>
    <Stack gap="1rem">
     <Typography color="gray">You dont have any health insurance plan yet</Typography>
     <Link to="/app/managed-care/beneficiary">
     <Button>Get Insurance Now</Button>
     </Link>
    </Stack>
 </Box>
   )
}


