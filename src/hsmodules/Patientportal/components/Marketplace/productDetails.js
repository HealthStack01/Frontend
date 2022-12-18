import {Stack,Box,Typography,Card,CardMedia,CardContent, IconButton,CardActions,Drawer,Paper,Grid} from '@mui/material'
import { useState } from 'react';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { productData } from './data';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from "../../../../components/buttons/CustomButton"



export default function ProductDetails(){
  const [product] = useState(productData)
  const [healthInsuranceModal, setHealthInsuranceModal] = useState(false)
  const drawerWidth = 240;

  // let params = useParams();
  const handleHideInsuranceModal = () => {
    setHealthInsuranceModal(false);
  };

  const handleInsuranceModal = () => {
    setHealthInsuranceModal(true);
  };
  // const fetchProduct = productId => {
  //   return products.filter(product => product.id === productId);
  // };

  // let product = fetchProduct(params.id);

  // console.log(product)
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
            image="https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/81NujKDCsXL._AC_SL1500_.jpg"
            alt="green iguana"
          />
          </Stack>
          <Stack>
          <CardContent>
            <Stack>
            <Typography variant="p" fontSize="14px" fontWeight="bold" color="text.secondary">
             {product[0]?.name}
            </Typography>
            </Stack>
            <Stack pb="1rem">
            <Typography variant="p" fontSize="14px" fontWeight="bold" color="text.secondary">
            ₦{product[0]?.price}
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
            Nexus Pharma’s Gluta-1 Injections are all lyophilized (freeze dried) glutathione. 
            This advanced manufacturing process enhances purity and potency meaning 
            they are engineered for injection use.
            </Typography>
            </Stack>
            <Stack>
            <Typography variant="p" fontSize="16px" fontWeight="bold" color="text.secondary">
              Dosage
            </Typography>
            <Typography variant="p" fontSize="14px" color="text.secondary">
            While most of the world’s Glutathione 
            Injections are plain API (raw ingredient in powder form), 
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