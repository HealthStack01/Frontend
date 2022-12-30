import { useState } from "react";
import Input from "../../../../components/inputs/basic/Input";
import Button from "../../../../components/buttons/CustomButton"
import {Stack,Box,Typography} from '@mui/material'
import { useForm } from "react-hook-form";
import {FacilitySearch} from "../../../helpers/FacilitySearch"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IncomingReferral from "../../../Referral/ReferralListIncoming";


export default function Referral({handleGoBack}){
    const { register, handleSubmit, watch, errors ,control} = useForm();
    const [success, setSuccess] = useState(false);
    const [chosen, setChosen] = useState('');

    const getSearchfacility = (obj) => {
      setChosen(obj);
  
      /*  setCategoryName(obj.categoryname)
          setChosen2(obj) */
  
      if (!obj) {
        //"clear stuff"
        /*  setCategoryName("")
               setChosen2() */
      }
    };

    return(
        <Stack>
             <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
         p={4}
        >
          <Button onClick={handleGoBack}>
            <ArrowBackIcon />
            Go Back
          </Button>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Referral
          </Typography>
        </Box>
        <Box>
        <IncomingReferral/>
        </Box>
            {/* <Box display="flex" justifyContent="flex-end" pb={2}> 
            <Button variant='contained' sx={{marginRight:"1.5rem"}}>
              Refer
            </Button>
        </Box>
            <form>
            <Box pb={4}>
           <Input  
            register={register("email")} 
            label='Email' 
            type="email" 
            name="email"  
            />
           </Box>
           <Box>
           <FacilitySearch
                getSearchfacility={getSearchfacility}
                clear={success}
                label="Hospital"
              /> 
           </Box>

            </form> */}
        </Stack>
    )
}