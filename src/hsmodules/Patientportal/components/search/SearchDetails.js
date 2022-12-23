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
import TabContext from '@mui/lab/TabContext'

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
    <Grid container spacing={6}>
    <Box width="40%" p="3rem">
    <Card sx={{ position: 'relative',height:"350px" }} >
      <CardMedia sx={{ height: '12.625rem' }} image='https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/images/cards/background-user.png' />
      <Avatar
        alt='Robert Meyer'
        sx={{
          width: 75,
          height: 75,
          left: '1.313rem',
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
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>Robert Meyer</Typography>
            <Typography variant='caption'>Doctor</Typography>
          </Box>
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
          <Box display="flex" gap="1.5rem" pb="1rem">
            {reviewData.map((data, i) => (
              <Card sx={{ width: '40%' }} key={i}>
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
    </Grid>
  )
}



 