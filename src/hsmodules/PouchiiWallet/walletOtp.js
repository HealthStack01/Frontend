import React,{useState,useCallback,useEffect} from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/inputs/basic/Input"
import { Box, Portal, Grid, Typography } from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import api from "../../utils/api";


 function WalletOTP(){  
const [otpNumber, setOtpNumber] = useState("");
const [phone,setPhone] = useState("")
const [timer, setTimer] = useState(60);   

const {
  register,
  handleSubmit,
  formState: { errors, isValid }
} = useForm({ mode: "onChange", criteriaMode: "all" });


const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

useEffect(() => {
  timer > 0 && setTimeout(timeOutCallback, 1000);
}, [timer, timeOutCallback]);

console.log(timer);

function resetTimer  () {
  if (!timer) {
    setTimer(60);
  }
};


    const handleOtp= async (otp,phoneNumber) =>{
    try {
        const res = await api.get(
          `/verify-otp/${otp}/${phoneNumber}`,
          {
            otp: "008907",
            phoneNumber: "+2347032041903",
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
        <Box sx={{display:"flex", marginTop:"4rem", flexDirection:"column", alignItems:"center",gap:"2rem"}}>
           <form onSubmit={handleOtp}>
           <Typography mb={4} sx={{fontSize:"20px", fontWeight:"bold"}}>Please enter the  Otp and your Phone Number</Typography>
           <Input
                    register={register("otp")}
                    label="OTP"
                    placeholder="Enter your OTP code here"
                    value={otpNumber}
                    onChange={(e) => setOtpNumber(e.target.value)}
                    sx={{width:"50%"}}
                  />
                <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={phone}
                    errorText={errors.username?.message}
                    onChange={(e) => setPhone(e.target.value)}
                    {...register("phone", {
                      required: "Phone number is Required",
                      pattern: {
                        value: /^[5-9]\d{9}$/,
                        message: "Enter a valid phone number"
                      }
                    })}
                    sx={{width:"50%"}}
                  /> 
                 <GlobalCustomButton
                sx={{marginTop: "15px",fontSize:"16px", fontWeight:"bold",paddingInline:"2rem"}}
              >
  
                Verify
              </GlobalCustomButton>
              <GlobalCustomButton
                sx={{marginTop: "15px",fontSize:"16px", fontWeight:"bold",paddingInline:"2rem"}}
              >
                Send Otp
              </GlobalCustomButton>
              <Typography mt={4} sx={{fontSize:"17px", fontWeight:"bold"}} onClick={resetTimer}>Resend OTP in 00:{timer}</Typography>
           </form>
        </Box>
    )
}

export default WalletOTP;