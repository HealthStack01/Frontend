import {Box,Typography,Card,CardHeader,Avatar,Stack} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import {doctorData} from "./data"
import { useState } from 'react';
import Input from '../../../../components/inputs/basic/Input'
import { useNavigate } from 'react-router-dom';

export default function SearchList(){
  const [doctors] = useState(doctorData);
  const [searchFeild, setSearchFeild] = useState('');
  const navigate = useNavigate();

  const filterDoctor =
    doctors?.length > 0 &&
    doctors?.filter((data) => {
      if (searchFeild === '') {
        return data;
      } else if (data.name.toLowerCase().includes(searchFeild.toLowerCase())) {
        return data;
      }
    });
    return(
      <Stack m="6rem" sx={{
        height: '80vh',
        overflowY: 'scroll',
      }}>
       <Box width="80%" mb="2rem">
            <Input 
            type="search" 
            placeholder="Search..."
               onChange={(event) => setSearchFeild(event.target.value)}
               />
            </Box>
        <Box width="80%" display="flex" flexDirection="column" gap="2rem">
          {filterDoctor.map((data,i) => (
          <Card  key={i} onClick={() => navigate(`/app/patient-portal/search/${data.id}`)}>
              <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {data.img}
            </Avatar>
          }
          action={
          
          <Typography variant="p" fontSize="16px" fontWeight="normal" color="text.secondary">
            {data.rating}
            <Box component="span" pt="0.5rem">
            <StarIcon sx={{color:"gold"}} />
            </Box>
         </Typography>
          }
          title={data.name}
          subheader={data.title}
        />
              </Card>
          ))}
        </Box>
        </Stack>
    )
}