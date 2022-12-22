import {Stack,Box,Typography,Card,CardMedia,CardContent,CardActions,Paper,Grid} from '@mui/material'
import Input from '../../../../components/inputs/basic/Input'
import {useNavigate} from "react-router-dom"


export default function Product({product}){
 const navigate = useNavigate()
    return(
    <Box> 
    <Card sx={{ width: "250px"}} onClick={() => navigate(`/app/patient-portal/buy/${product.id}`)}>
    <CardMedia
      component="img"
      width="100%"
      height="192"
      image={product?.img}
      alt={product?.name}
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
      <Stack pt="1rem">
            <Typography variant="p" fontSize="14px" fontWeight="bold" color="text.secondary">
             {product?.review} reviews
            </Typography>
            </Stack>
    </CardContent>
  </Card> 
 
    
        </Box>
    )
}
