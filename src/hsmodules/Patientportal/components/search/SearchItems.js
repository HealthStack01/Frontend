import {Stack,Box,Typography,Card,CardMedia,CardContent
    ,Rating,CardActions,Drawer,Paper,CardHeader,Avatar,IconButton} from '@mui/material'
    import StarIcon from '@mui/icons-material/Star';

export default function SearchList(){
    return(
        <Box width="30%">
        <Card>
            <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
        
        <Typography variant="p" fontSize="16px" fontWeight="normal" color="text.secondary">
          4.5 
          <Box component="span" pt="0.5rem">
          <StarIcon sx={{color:"gold"}} />
          </Box>
       </Typography>
        }
        title="Chorizo Paella"
        subheader="Doctor"
      />
            </Card>
        </Box>
    )
}