import React, {useState, useCallback, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Input from "../../components/inputs/basic/Input";
import {Box, Portal, Grid, Typography} from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import VerifiedIcon from "@mui/icons-material/Verified";
import RefreshIcon from "@mui/icons-material/Refresh";
import api from "../../utils/api";
import {toast} from "react-toastify";

function WalletOTP() {
  const [timer, setTimer] = useState(60);
  const [count, setCount] = useState(2); //Number of times user has requested for OTP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  // console.log(phoneNumber)
  // const {
  //   register,
  //   handleSubmit,
  //   formState: {errors, isValid},
  // } = useForm({mode: "onChange", criteriaMode: "all"});

  const timeOutCallback = useCallback(
    () => setTimer(currTimer => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  function resetTimer() {
    if (!timer) {
      setTimer(60);
    }
  }

  const handleOtp = async () => {
    // const {otp, phone_number} = data;
    try {
      const res = await api.get(`/verify-otp/${otp}/${phoneNumber}`);
      // console.log(res.data)
      toast.success("Phone Number Verified");
      localStorage.setItem("wallet", JSON.stringify(res.data));
      navigate("/wallet-pin");
      return res.data;
    } catch (error) {
      toast.error(error.message);
      // console.log(error.message)
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await api.get(`/send-otp/${phoneNumber}`);
      // console.log(res.data)
      toast.success("OTP Sent!!!");
      return res.data;
    } catch (error) {
      toast.error(error.message);
      // console.log(error)
    }
    //Resend the OTP when successful reset timer
    setCount(prev => prev + 1);
    setTimer(60);
  };

  const otpImg =
    "https://img.freepik.com/premium-vector/otp-onetime-password-2step-authentication-data-protection-internet-security-concept_100456-10200.jpg?w=2000";

  const pounchiiLogo =
    "https://mywallet.remita.net/static/media/pouchii-ts.e40722f2.svg";

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "60px",
            width: "400px",
            boxShadow: "2",
            borderRadius: "7px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          mb={2}
        >
          <img
            style={{
              height: "50px",
              width: "auto",
              display: "block",
            }}
            src="https://healthstack.africa/wp-content/uploads/2021/10/Healthstack-logo1-300x92.png"
            alt=""
          />
        </Box>

        <Box
          sx={{
            width: "400px",
            minHeight: "400px",
            boxShadow: "2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "7px",
          }}
        >
          <Box sx={{width: "200px"}}>
            <img
              src={otpImg}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            mb={2}
          >
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#0064CC",
              }}
            >
              Please enter the OTP and your phone number
            </Typography>
          </Box>

          <form
            // onSubmit={handleSubmit(handleOtp)}
            style={{
              width: "100%",
              padding: "0 15px",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
              mb={2}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} mb={1}>
                  <Input
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    label="OTP"
                    placeholder="Enter the OTP code"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
          </form>

          <Box mb={2}>
            <GlobalCustomButton
              onClick={handleOtp}
              sx={{
                marginRight: "15px",
              }}
            >
              <VerifiedIcon fontSize="small" sx={{marginRight: "5px"}} />
              Verify Otp
            </GlobalCustomButton>

            <GlobalCustomButton
              color="success"
              disabled={timer > 0}
              onClick={handleResendOtp}
            >
              <RefreshIcon fontSize="small" sx={{marginRight: "5px"}} />
              Resend Otp
            </GlobalCustomButton>
          </Box>

          {timer > 0 && (
            <Box
              sx={{
                minWidth: "70%",
                padding: "0 15px",
                height: "40px",
                boxShadow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "7px",
              }}
              mb={2}
            >
              <Typography
                sx={{fontSize: "0.85rem", color: "green"}}
                onClick={resetTimer}
              >
                Resend OTP in 00:{timer}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default WalletOTP;
