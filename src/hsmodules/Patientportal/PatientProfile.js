import { useState } from 'react'
import Input from "../../components/inputs/basic/Input";
import Button from "../../components/buttons/CustomButton"
import CustomSelect from "../../components/inputs/basic/Select";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";

// import Button from '@mui/material/Button'
import {
  GridBox
} from "../app/styles";


const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))


const PatientProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    control
  } = useForm()
  const [imgSrc, setImgSrc] = useState('https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg')
  const [editing,setEditing]= useState(false)
  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <Box mx="4rem" width="80%">
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 2, marginBottom: 3 }}>
            <Box sx={{position:"relative"}}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box sx={{position:"absolute", left:"6rem", bottom:"-4px"}}>
                <IconButton color="primary" aria-label="upload picture" component="label" bgColor="red">
        <input hidden  accept='image/png, image/jpeg'
                    id='account-settings-upload-image' type="file"  onChange={onChange}/>
        <UploadFileIcon/>
      </IconButton>
              </Box>
            </Box>
          </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end">
            {!editing ?
          <Button variant='contained' color="warning" onClick={() => setEditing(true)}>
          Edit Profile
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
        <GridBox>
        <Grid item xs={6}>
         {!editing ?    <Input register={register("firstName")} 
            label='First Name' 
            type="name" 
            name="firstName"  
            defaultValue='John' 
            disabled={!editing}
            /> : 
            <Input register={register("firstName")} 
            label='First Name' 
            type="name" 
            name="firstName"  
            defaultValue='John' 
            />}
          </Grid>
          <Grid item xs={6}>
          {!editing ?   <Input register={register("lastName")} 
            label='Last Name' 
            type="name" 
            name="lastName" 
            defaultValue='Doe'
            disabled={!editing}
            /> :
            <Input register={register("lastName")} 
            label='Last Name' 
            type="name" 
            name="lastName" 
            defaultValue='Doe' />
            
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?   <Input register={register("middleName")} 
            label='Middle Name' 
            type="name" 
            name="middleName"  
            defaultValue='Pop' 
            disabled={!editing}
            /> : 
            <Input register={register("middleName")} 
            label='Middle Name' 
            type="name" 
            name="middleName"  
            defaultValue='Pop' />
            }
          </Grid>
          </GridBox>
        
        <Box sx={{marginTop:"16px", marginBottom: "14px"}}>
      <Typography variant='p' sx={{ color:"blue",fontSize:"14px",fontWeight:"bold" }}>
         BIO DATA
     </Typography>
        </Box>
  <GridBox>
          <Grid item xs={6} >
           {!editing ?  <Input
              type='email'
              label='Email'
              register={register("email")}
              defaultValue='johnDoe@example.com'
              disabled={!editing}
            /> : 
            <Input
            type='email'
            label='Email'
            register={register("email")}
            defaultValue='johnDoe@example.com'
          />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing? <Input 
              type='phone'
              label='Phone Number 1'
              defaultValue='08101234567'
              register={register("phoneNumber1")}
              disabled={!editing}
            />:
            <Input 
              type='phone'
              label='Phone Number 1'
              defaultValue='08101234567'
              register={register("phoneNumber1")}
            />
            }
          </Grid>
          <Grid item xs={6}>
          {!editing ?
          <Input 
          type='phone'
          label='Phone Number 2'
          defaultValue='08101234567'
          register={register("phoneNumber2")}
          disabled={!editing}
        />  
           :
           <Input 
              type='phone'
              label='Phone Number 2'
              defaultValue='08101234567'
              register={register("phoneNumber2")}
            />
           }
          </Grid>
          <Grid item xs={6}>
         {!editing ? 
          <CustomSelect
          label="Gender"
          name="gender"
          options={["Male","Female","Other"]}
          register={register("gender")}
          defaultValue="Male"
          disabled={!editing}
        /> 
        :
        <CustomSelect
        label="Gender"
        name="gender"
        options={["Male","Female","Other"]}
        register={register("gender")}
      />
        }
          </Grid>
          <Grid item xs={6}>
          {!editing ? 
        <MuiCustomDatePicker
        label="Closing Date"
        name="closing_date"
        control={control}
      />  
        :
        <MuiCustomDatePicker
                    label="Closing Date"
                    name="closing_date"
                    control={control}
                  />
        }
          </Grid>
          <Grid item xs={6}>
          {!editing ? 
          <CustomSelect
          label="Religion"
          name="religion"
          options={["Christianity","Islam","Other"]}
          register={register("religion")}
          defaultValue="Islam"
          disabled={!editing}
        /> 
        :
        <CustomSelect
        label="Religion"
          name="religion"
          options={["Christianity","Islam","Other"]}
          register={register("religion")}
          defaultValue="Islam"
      />
        }
          </Grid>
          <Grid item xs={6}>
          {!editing ?   
          <Input
              type='text'
              label='Profession'
              defaultValue='Doctor'
              register={register("profession")}
              disabled={!editing}
            /> :
            <Input
            type='text'
            label='Profession'
            defaultValue='Doctor'
            register={register("profession")}
          />
            }
          </Grid>
          <Grid item xs={6}>
          {!editing ? <CustomSelect
            label="Martial Status"
            name="martial_status"
            options={["Single","Married","Complicated","Divorce"]}
            defaultValue="Single"
            register={register("martial_status")}
            disabled={!editing}
          />
        :
        <CustomSelect
            label="Martial Status"
            name="martial_status"
            options={["Single","Married","Complicated","Divorce"]}
            register={register("martial_status")}
            defaultValue="Single"
          />
        }
          </Grid>
          </GridBox>

  <Box sx={{marginTop:"16px", marginBottom: "14px"}}>
  <Typography variant='p' sx={{ color:"blue",fontSize:"14px",fontWeight:"bold"}}>
   ADDRESS
  </Typography>
  </Box>
  <GridBox>
          <Grid item xs={6}>
           {!editing ?  
           <Input
              type='text'
              label='Country'
              defaultValue='Nigeria'
              register={register("country")}
              disabled={!editing}
            />:
            <Input
            type='text'
            label='Country'
            defaultValue='Nigeria'
            register={register("country")}
          />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?  
           <Input
              type='address'
              label='Residential  Address'
              defaultValue='53b,oduduwa way,ikeja GRA.'
              register={register("address")}
              disabled={!editing}
            />
            :
            <Input
            type='address'
            label='Residential  Address'
            defaultValue='53b,oduduwa way,ikeja GRA.'
            register={register("address")}
          />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?  
           <Input
              type='text'
              label='State'
              defaultValue='Lagos'
              register={register("state")}
              disabled={!editing}
            />
            :
            <Input
            type='text'
            label='State'
            defaultValue='Lagos'
            register={register("state")}
          />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?  
           <Input
              type='text'
              label='Local Government'
              defaultValue='Ikeja LGA'
              register={register("local_gov")}
              disabled={!editing}
            />
            :
            <Input
            type='text'
              label='Local Government'
              defaultValue='Ikeja LGA'
              register={register("local_gov")}
          />
            }
             
          </Grid>
          <Grid item xs={6} >
          {!editing ?  
           <Input
              type='text'
              label='Town'
              defaultValue='Ikeja'
              register={register("town")}
              disabled={!editing}
            />
            :
            <Input
            type='text'
              label='Town'
              defaultValue='Ikeja'
              register={register("town")}
          />
            } 
          </Grid>
          <Grid item xs={6} >
          {!editing ?  
           <Input
              type='text'
              label='City'
              defaultValue='Ikeja'
              register={register("city")}
              disabled={!editing}
            />
            :
            <Input
            type='text'
            label='City'
            defaultValue='Ikeja'
            register={register("city")}
          />
            }
          </Grid>
          <Grid item xs={6} >
          {!editing ?  
           <Input
              type='text'
              label='Neigbourhood'
              defaultValue='Ikeja'
              register={register("neigbourhood")}
              disabled={!editing}
            />
            :
            <Input
            type='text'
            label='Neigbourhood'
            defaultValue='Ikeja'
            register={register("neigbourhood")}
          />
            }
          </Grid>
          <Grid item xs={6}>
          {!editing ?  
           <Input
              type='text'
              label='Street Address'
              defaultValue='Ikeja'
              register={register("streetAddress")}
              disabled={!editing}
            />
            :
            <Input
            type='text'
              label='Street Address'
              defaultValue='Ikeja'
              register={register("streetAddress")}
          />
            }
          </Grid>
          </GridBox>
      </form>
    </Box>
  )
}

export default PatientProfile