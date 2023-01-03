import {Box,Typography,Stack,Grid} from "@mui/material";
import Button from "../../../../components/buttons/CustomButton"
import React, { useState, useContext} from 'react';

import Policy from '../../../ManagedCare/Policy';

// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export default function HealthInsurance(){
  
   return(
    <Box p="1rem">
      
    {/* <Stack display="flex" flexDirection="column" alignItems="center" gap="1rem">
      <HealthAndSafetyIcon sx={{color:"#f4f3ee",fontSize:'450px'}}/>
     <Typography color="gray">You dont have any health insurance plan yet</Typography>
     <Button width="70%" onClick={() => navigate("/app/managed-care/beneficiary")}>Get Insurance Now</Button>
    </Stack>  */}
    <Policy/>
 </Box>
   )
}
