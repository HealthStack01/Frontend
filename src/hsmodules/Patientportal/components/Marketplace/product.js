import {Stack,Box,Typography,Card,CardMedia,CardContent,CardActions,Paper,Grid} from '@mui/material'
import Input from '../../../../components/inputs/basic/Input'
import {Link} from "react-router-dom"


export default function Product({product}){
 
    return(
        <Box>
           
   <Link to={`/app/patient-portal/buy/${product.id}`}>
    <Card sx={{ width: "250px"}}>
    <CardMedia
      component="img"
      width="100%"
      height="192"
      image={product?.img}
      alt="green iguana"
    //   sx={{padding:"1rem"}}
    />
    <CardContent>
      <Stack>
      <Typography variant="p" fontSize="14px" fontWeight="semibold" color="text.secondary">
       {product?.name}
      </Typography>
      </Stack>
      <Stack>
      <Typography variant="p" fontSize="16px" fontWeight="bold" color="text.secondary">
        {product?.price}
      </Typography>
      </Stack>
    </CardContent>
  </Card> 
  </Link>
    
        </Box>
    )
}
