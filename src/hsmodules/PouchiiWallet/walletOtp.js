import React from "react";
import Input from "../../components/inputs/basic/Input"
import { Box, Portal, Grid, Button as MuiButton } from "@mui/material";
import api from "../../utils/api";



export default function WalletOTP(){
    const  handleOtp= async () =>{
    try {
        const res = await api.post(
          '/',
          {
            phoneNumber: "+2347032041903",
            password: "kennis008907"
          }
        );
      console.log(res.data)
          toast.success('Wallet Created Successfully');
          return res.data
    } catch (error) {
      toast.error(error);
      console.log(error)
    }
}



    return(
        <Box>
             <Input
                    register={register("phone")}
                    label="Phone"
                  />
                <Input
                    register={register("otp")}
                    label="Otp"
                  /> 
                  <Button onClick={handleOtp}>Verify Otp</Button> 
        </Box>
    )
}