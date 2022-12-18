import {Box,Typography,Stack} from "@mui/material";
import Button from "../../../../components/buttons/CustomButton"
import {
  useNavigate
} from "react-router-dom"


export default function HealthInsurance(){
  const navigate = useNavigate();

   return(
    <Box>
    <Stack gap="1rem">
     <Typography color="gray">You dont have any health insurance plan yet</Typography>
     <Button onClick={() => navigate("/app/managed-care/beneficiary")}>Get Insurance Now</Button>
    </Stack>
 </Box>
   )
}


