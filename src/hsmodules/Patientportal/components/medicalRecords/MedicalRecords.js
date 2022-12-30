import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Input from "../../../../components/inputs/basic/Input";
import Button from "../../../../components/buttons/CustomButton"
import CustomSelect from "../../../../components/inputs/basic/Select";
import { useForm } from "react-hook-form";
import {FacilitySearch} from "../../../helpers/FacilitySearch"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function MedicalRecords ({handleGoBack}){
  const { register, handleSubmit, watch, errors ,control} = useForm();
    const [editing,setEditing]= useState(false)
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
       <Box  px="2rem">
         <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
          py={4}
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
            Medical Records
          </Typography>
        </Box>
          <Box display="flex" justifyContent="flex-end" pb={4}>
            {!editing ?
          <Button variant='contained' color="warning" onClick={() => setEditing(true)}>
          Edit Records
        </Button>
        :  
       <Box>
         <Button variant='contained' sx={{marginRight:"1.5rem"}}>
        Save Changes
        </Button>
        <Button  variant='contained' color="error" onClick={() => setEditing(false)}>
        Cancel
        </Button>
       </Box>
        } 
          </Box>
          <Grid container spacing={7} >
          <Grid item xs={6}>
         {!editing ? 
          <CustomSelect
          label="Blood Type"
          name="bloodType"
          options={["O+","O-","B+","B-","AB+","AB-","A+","A-"]}
          register={register("bloodType")}
          defaultValue="O+"
          disabled={!editing}
        /> 
        :
        <CustomSelect
        label="Blood Type"
          name="bloodType"
          options={["O+","O-","B+","B-","AB+","AB-","A+","A-"]}
          register={register("bloodType")}
          defaultValue="O+"
        control={control}
      />
        }
          </Grid>
          <Grid item xs={6} >
          {!editing ?   <Input register={register("allergies")} 
            label='Allergies' 
            type="name" 
            name="allergies"  
            defaultValue='Ibuprofen' 
            disabled={!editing}
            /> : 
            <Input  
            register={register("allergies")} 
            label='Allergies' 
            type="name" 
            name="allergies"  
            defaultValue='Ibuprofen'
            />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?   <Input register={register("diseases")} 
            label='Diseases' 
            type="name" 
            name="diseases"  
            defaultValue='Cholesterol' 
            disabled={!editing}
            /> :  
            <Input register={register("diseases")} 
            label='Diseases' 
            type="name" 
            name="diseases"  
            defaultValue='Cholesterol' 
            />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?   <Input register={register("height")} 
            label='Height(cm)' 
            type="name" 
            name="height"  
            defaultValue='150cm' 
            disabled={!editing}
            /> :  
            <Input 
            register={register("height")} 
            label='Height(cm)' 
            type="name" 
            name="height"  
            defaultValue='150cm'  
            />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?   <Input register={register("weight")} 
            label='Weight(kg)' 
            type="name" 
            name="weight"  
            defaultValue='150kg' 
            disabled={!editing}
            /> :  
            <Input 
            register={register("weight")} 
            label='Weight(kg)' 
            type="name" 
            name="weight"  
            defaultValue='150kg'  
            />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?    <FacilitySearch
                  getSearchfacility={getSearchfacility}
                  clear={success}
                  defaultValue="Ikeja Hospital"
                  disabled={!editing}
                  label="Hospital"
                />:  
                <FacilitySearch
                getSearchfacility={getSearchfacility}
                clear={success}
                defaultValue="Ikeja Hospital"
                label="Hospital"
              /> 
            
            }
          </Grid>
         </Grid>
       </Box>
    )
}