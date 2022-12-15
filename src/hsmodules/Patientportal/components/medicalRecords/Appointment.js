import React, {useState} from 'react'
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, Typography,CardHeader,Collapse,Fab} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import MuiCustomTimePicker from '../../../../components/inputs/Date/MuiTimePicker';
import Textarea from "../../../../components/inputs/basic/Textarea";
import ModalBox from "../../../../components/modal";
import Button from "../../../../components/buttons/CustomButton"
import { useForm } from "react-hook-form";


export default function Appointment(){
  const [appointmentCreateModal,setAppointmentCreateModal] = useState(false)

  const handleAppointmentCreateModal= () => {
    setAppointmentCreateModal(true)
  }

  const handleAppointmentCreateHideModal= () => {
    setAppointmentCreateModal(false)
  }

  return(
    <Stack>
      <AppointmentDetails showAppointmentCreate={handleAppointmentCreateModal}/>

      <ModalBox width="40vw" open={appointmentCreateModal} onClose={handleAppointmentCreateHideModal} header="Book Appointment">
        <AppointmentCreate/>
      </ModalBox>
    </Stack>
  )
}

export  function AppointmentDetails({showAppointmentCreate}){
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return(
      <Box>
       
        <Box
        sx={{
          width: "100%",
          display: "flex",
          padding: "8px 8px",
          justifyContent: "space-between",
          boxShadow: 2,
          borderRadius: "7.5px",
          cursor:"pointer"
        }}
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
      >
        <Box
          sx={{
            width: "80px",
            display: "flex",
            alignItems: "center",
            borderRight: "1px solid lightgray",
            
          }}
        >
          <Typography sx={{fontSize: "0.75rem",fontWeight:"bold",color: "gray"}}>
            8:45pm
          </Typography>
        </Box>
  
        <Box sx={{width: "calc(100% - 50px)", display: "flex", alignItems:"center", justifyContent:"space-between"}}>
          <CardHeader
                  avatar={
                     <DescriptionIcon fontSize="large" sx={{backgroundColor:"#FFF9E6",color:"#FBD233",borderRadius:"50%"}}  />
                  }
            
                  title={
                    <Typography variant="h1" fontSize="16px" fontWeight="bold" color="text.secondary">
                      Ante-Natal
                  </Typography>
                  }
                  subheader={
                    <Typography sx={{fontSize: "0.85rem", color: "gray"}}>
                    Pregnancy Visit
                    </Typography>
                  }
                  />
                  <IconButton
          size="small"
          sx={{width: "30px", height: "30px"}}
          color="error"
        >
          <DeleteIcon fontSize="medium" />
        </IconButton>
        </Box>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box px="2rem" py="1rem">
          <Box pb="1rem">
          <Typography variant="h6">Pregnancy Visit</Typography>
          </Box>
          <Box pb="1rem">
          <Typography>Venue</Typography>
          <Typography color="gray">Kings Hospital</Typography>
          </Box>
          <Box pb="1rem">
          <Typography>Time</Typography>
          <Typography color="gray">08:45am</Typography>
          </Box>
          <Box>
          <Typography>Instructions</Typography>
          <Typography color="gray">Do not exceed 4 doses in any 24 hours. If symptoms persist consult your doctor</Typography>
          </Box>
          </Box>
      </Collapse>
      <Box display="flex" justifyContent="flex-end" pt="1rem">
       <Fab color="primary" aria-label="add" onClick={showAppointmentCreate}>
        <AddIcon />
      </Fab>
       </Box>
      </Box>
    )
}



export function AppointmentCreate(){
  const { register, handleSubmit, watch, errors ,control} = useForm();
 

  return(
    <Stack>
      
        <Box display="flex" justifyContent="flex-end" gap="1rem" pb={4}>
          <Button>
          <BookOnlineIcon sx={{marginRight: "5px"}} fontSize="small" />
          Request
        </Button>
        <Button>
              <PaymentsIcon sx={{marginRight: "5px"}} fontSize="small" />
              Make Payment
            </Button>
        </Box>
        <form>
       <Stack pb="1rem">
       <MuiCustomDatePicker
                  label="Date"
                  name="date"
                  control={control}
                  register={register("date", {required: true})}
                />
       </Stack>
       <Stack  pb="1rem">
       <MuiCustomTimePicker label="Time" name="time" control={control} />
       </Stack>
           <Stack>
           <Textarea  
            register={register("Symptoms")} 
            label='Symptoms' 
            type="text" 
            name="symptoms"  
            />
           </Stack>
        </form>
    </Stack>
  )
}