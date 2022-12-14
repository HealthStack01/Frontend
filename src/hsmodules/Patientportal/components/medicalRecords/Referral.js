import { useState } from "react";
import Input from "../../../../components/inputs/basic/Input";
import Button from "../../../../components/buttons/CustomButton"
import {Stack,Box} from '@mui/material'
import { useForm } from "react-hook-form";
import {FacilitySearch} from "../../../helpers/FacilitySearch"


export default function Referral(){
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
            <Box display="flex" justifyContent="flex-end" pb={2}> 
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

            </form>
        </Stack>
    )
}