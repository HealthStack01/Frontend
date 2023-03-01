import {Stack,Rating,CardActions,Drawer,Paper,CardHeader,IconButton} from '@mui/material';

import { useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'
import Badge from '@mui/material/Badge'
import TabContext from '@mui/lab/TabContext'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import GButton from '../../../../components/buttons/CustomButton';
import VerifiedIcon from '@mui/icons-material/Verified';
// import AvatarGroup from '@mui/material/AvatarGroup'
export const reviewData = [
  {
    img: 'D',
    name: 'Danalle',
    time: '4 hours',
    description:
      'Nexus Pharma’s Gluta-1 Injections are all lyophilized (freeze dried) glutathione.',
  },
  {
    img: 'P',
    name: 'Paella',
    time: '6 hours',
    description:
      'Nexus Pharma’s Gluta-1 Injections are all lyophilized (freeze dried) glutathione.',
  },
];

export default function SearchDetails(){
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
      setValue(newValue)
    }
  return (
    // <Grid container spacing={6}>
      <Stack sx={{
      height: '80vh',
      overflowY: 'scroll',
      px:"14rem"
    }}>
    <Box width="70%"  my="3rem">
    <Card sx={{ position: 'relative',height:"490px"}}>
      <CardMedia sx={{ height: '12.625rem',backgroundColor:"#edede9"}}/>
      <Avatar
        alt='Robert Meyer'
        sx={{
          width: 95,
          height: 95,
          left: '18rem',
          top: '10.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      >AD</Avatar>
     
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign:"center"
          }}
        >

          <Box sx={{ mr: 2, display: 'flex', flexDirection:'column' }}>
            <Typography variant='h5'>Robert Meyer</Typography>
            <Typography variant='h6' sx={{color:"#8a817c"}}>Doctor</Typography>
          </Box>
         
        </Box>
        <Box sx={{display: 'flex', justifyContent:"space-around", pb:"2rem"}}>
            <Stack sx={{textAlign:"center" }}>
              <PersonOutlinedIcon sx={{ml:2,fontSize:"30px",color:"#8a817c"}}/>
              <Typography variant='h6'>1000+</Typography>
              <Typography variant='caption' sx={{color:"#8a817c"}}>Patients</Typography>
            </Stack>
            <Stack sx={{textAlign:"center" }}>
              <LocationOnOutlinedIcon sx={{ml:2,fontSize:"30px",color:"#8a817c"}}/>
              <Typography variant='h6'>15km</Typography>
              <Typography variant='caption' sx={{color:"#8a817c"}}>From You</Typography>
            </Stack>
            <Stack sx={{textAlign:"center" }}>
              <StarBorderOutlinedIcon sx={{ml:1,fontSize:"30px",color:"#8a817c"}}/>
              <Typography variant='h6'>4.5</Typography>
              <Typography variant='caption' sx={{color:"#8a817c"}}>Rating</Typography>
            </Stack>
          </Box>
      </CardContent>
    </Card>
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='About' />
          <Tab value='2' label='Location' />
          <Tab value='3' label='Availability' />
          <Tab value='4' label='Review' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
           <Box>
           <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Boigraphy
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Pudding tiramisu caramels. Gingerbread gummies danish chocolate bar toffee marzipan. Wafer wafer cake
              powder danish oat cake.
            </Typography>
           </Box>
           <Box>
           <Typography variant='h6' sx={{ marginBottom: 2 }}>
           Availability
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Pudding tiramisu caramels. Gingerbread gummies danish chocolate bar toffee marzipan. Wafer wafer cake
              powder danish oat cake.
            </Typography>
           </Box>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Header Two
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Dragée chupa chups soufflé cheesecake jelly tootsie roll cupcake marzipan. Carrot cake sweet roll gummi
              bears caramels jelly beans.
            </Typography>
            
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Header Three
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Icing cake macaroon macaroon jelly chocolate bar. Chupa chups dessert dessert soufflé chocolate bar
              jujubes gummi bears lollipop.
            </Typography>
          </TabPanel>
          <TabPanel value='4' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Header Three
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Icing cake macaroon macaroon jelly chocolate bar. Chupa chups dessert dessert soufflé chocolate bar
              jujubes gummi bears lollipop.
            </Typography>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
    </Box>
    <Box pt="2rem">
          <Typography
            variant="h1"
            fontSize="16px"
            fontWeight="bold"
            color="text.secondary"
          >
            Reviews
          </Typography>
          <Box display="flex" flexDirection="column" gap="1.5rem" pb="1rem">
            {reviewData.map((data, i) => (
              <Card sx={{ width: '70%' }} key={i}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                      {data?.img}
                    </Avatar>
                  }
                  action={
                    <Typography
                      variant="p"
                      fontSize="16px"
                      fontWeight="normal"
                      color="text.secondary"
                    >
                      {data?.time} ago
                    </Typography>
                  }
                  title={data?.name}
                  subheader={
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  }
                />

                <Stack width="80%" p="1.5rem">
                  <Typography
                    variant="p"
                    fontSize="14px"
                    fontWeight="normal"
                    color="text.secondary"
                  >
                    {data?.description}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Box>
        </Box>
       <Stack width="50%" mx="3rem">
       <GButton>Book Appointment</GButton>
       </Stack>
        </Stack>
    
  )
}



 