import {Stack,Box,Typography,Card,CardMedia,CardContent, IconButton,CardActions,Drawer,Paper,Grid} from '@mui/material'
import { useState } from 'react';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { productDetailsData,productData } from './data';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from "../../../../components/buttons/CustomButton"



export default function ProductDetails(){
  const [productDetails] = useState(productDetailsData)
  const [products] = useState(productData)
  const [healthInsuranceModal, setHealthInsuranceModal] = useState(false)
  const drawerWidth = 240;

  // let params = useParams();
  const handleHideInsuranceModal = () => {
    setHealthInsuranceModal(false);
  };

  const handleInsuranceModal = () => {
    setHealthInsuranceModal(true);
  };


  const fetchProduct = productDetails.find(productDetail => productDetail.id === products.id);


  // let product = fetchProduct(params.id);

  console.log(fetchProduct)
    return(
     
      <Box m={4}>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={healthInsuranceModal}
      >
        <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={handleHideInsuranceModal}>
          <ShoppingBagIcon/>
          </IconButton>
        </Box>
      </Drawer>
        
          <Card sx={{ width: "60%", display:"flex",gap:"3rem"}}>
          <Stack>
          <CardMedia
            component="img"
            width="100%"
            height="100%"
            image={fetchProduct?.img}
            alt={fetchProduct?.name}
          />
          </Stack>
          <Stack>
          <CardContent>
            <Stack>
            <Typography variant="p" fontSize="14px" fontWeight="bold" color="text.secondary">
             {fetchProduct?.name}
            </Typography>
            </Stack>
            <Stack pb="1rem">
            <Typography variant="p" fontSize="14px" fontWeight="bold" color="text.secondary">
            ₦{fetchProduct?.price}
            </Typography>
            </Stack>
            <Stack pb="1rem">
            <Typography variant="p" fontSize="14px" fontWeight="bold" color="text.secondary">
             500 reviews
            </Typography>
            </Stack>
            <Stack pb="1rem">
            <Typography variant="p" fontSize="16px" fontWeight="bold" color="text.secondary">
              Description
            </Typography>
            <Typography variant="p" fontSize="14px" color="text.secondary">
            {fetchProduct?.description}
            </Typography>
            </Stack>
            <Stack>
            <Typography variant="p" fontSize="16px" fontWeight="bold" color="text.secondary">
              Dosage
            </Typography>
            <Typography variant="p" fontSize="14px" color="text.secondary">
           {fetchProduct?.dosage}
            </Typography>
            </Stack>
          </CardContent>
          <CardActions display="flex" gap="2rem">
        <IconButton aria-label="add" sx={{padding:"0.3rem",fontSize:"14px",color:"white",backgroundColor:"gray", borderRadius:"50%"}}>
         <AddIcon />
       </IconButton>
       <IconButton aria-label="remove" sx={{padding:"0.3rem",fontSize:"14px",color:"white",backgroundColor:"gray", borderRadius:"50%"}}>
         <RemoveIcon />
       </IconButton>
        </CardActions>
          <CardActions>
          <Button>Add To Cart</Button>
          </CardActions>

          </Stack>
          <Stack>

</Stack>
        </Card>
        
       

      </Box>
    )
  }