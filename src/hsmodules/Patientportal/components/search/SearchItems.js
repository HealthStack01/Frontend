import {Stack,Box,Typography,Card,CardMedia,CardContent
    ,Rating,CardActions,Drawer,Paper,CardHeader,Avatar,IconButton} from '@mui/material'
    import StarIcon from '@mui/icons-material/Star';
    import {doctorData} from "./data"

export default function SearchList(){
    return(
        <Box width="30%">
          {doctorData.map((data) => (
              <Card>
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
    )
}