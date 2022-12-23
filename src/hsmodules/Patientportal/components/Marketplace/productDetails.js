import {
  Stack,
  Box,
  Typography,
  Grid,
  CardMedia,
  CardContent,
  Rating,
  CardActions,
  Drawer,
  Paper,
  CardHeader,
  Avatar,
  Button,
  ButtonGroup,
  Badge,
  Card,
} from '@mui/material';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productDetailsData } from './data';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GButton from '../../../../components/buttons/CustomButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
export default function ProductDetails({ handleGoBack }) {
  const navigate = useNavigate();
  const [products] = useState(productDetailsData);
  const [healthInsuranceModal, setHealthInsuranceModal] = useState(false);
  const [value, setValue] = useState(2);
  const [count, setCount] = useState(1);

  const drawerWidth = 240;

  // let {id} = useParams();
  const handleHideInsuranceModal = () => {
    setHealthInsuranceModal(false);
  };

  const handleInsuranceModal = () => {
    setHealthInsuranceModal(true);
  };
  const { productId } = useParams();

  const product = products.find((prod) => prod.id == productId);

  return (
    <Box m={4}>
      <Box display="flex" justifyContent="space-between" pb="2rem">
        <GButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
          Go Back
        </GButton>
        <Badge color="secondary" badgeContent={count}>
          <ShoppingBagIcon />
        </Badge>
      </Box>
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
      ></Drawer>
      {/* <Card> */}
      <Box
        style={{
          height: '80vh',
          overflowY: 'scroll',
        }}
      >
        <Grid container spacing={6}>
          <StyledGrid item md={5} xs={12}>
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img width="30%" height="40%" alt="" src={product?.img} />
            </CardContent>
          </StyledGrid>
          <Grid
            item
            xs={6}
            md={7}
            sx={{
              paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
              paddingLeft: [
                '2.5rem !important',
                '1.5rem !important',
                '0 !important',
              ],
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }} pt="1rem">
                {product?.name}
              </Typography>
              <Stack pb="1rem">
                <Typography
                  variant="p"
                  fontSize="16px"
                  fontWeight="bold"
                  sx={{ color: 'blue' }}
                >
                  {product?.price}
                </Typography>
              </Stack>
              <Stack pb="1rem">
                <Typography
                  variant="p"
                  fontSize="16px"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  {product?.review} reviews
                </Typography>
              </Stack>
              <Stack pb="1rem">
                <Typography
                  variant="p"
                  fontSize="16px"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Description
                </Typography>
                <Typography
                  variant="p"
                  width="50%"
                  fontSize="14px"
                  color="text.secondary"
                >
                  {product?.description}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  variant="p"
                  fontSize="16px"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Dosage
                </Typography>
                <Typography
                  variant="p"
                  width="50%"
                  fontSize="14px"
                  color="text.secondary"
                >
                  {product?.dosage}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 0));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </CardActions>
            <CardActions className="card-action-dense">
              <Box sx={{ display: 'flex', gap: '2rem' }}>
                <GButton>Add To Cart</GButton>
                <GButton>Buy Now</GButton>
              </Box>
            </CardActions>
          </Grid>
        </Grid>

        {/* </Card> */}
        {/* <Box sx={{ display:"flex",gap:"6rem"}} mt="1rem">
          
          <CardMedia
            component="img"
            sx={{width:"250px",height:"",objectFit:"cover" }}
            image={product?.img}
            alt={product?.name}
          />
        
          <Stack>
          <CardContent >
            <Stack>
            <Typography variant="h1" fontSize="20px" fontWeight="bold" color="text.secondary">
             {product?.name}
            </Typography>
            </Stack>
            <Stack pb="1rem">
            <Typography variant="p" fontSize="16px" fontWeight="bold" sx={{color:"blue"}}>
            {product?.price}
            </Typography>
            </Stack>
            <Stack pb="1rem">
            <Typography variant="p" fontSize="16px" fontWeight="bold" color="text.secondary">
            {product?.review} reviews
            </Typography>
            </Stack>
            <Stack pb="1rem">
            <Typography variant="p" fontSize="16px" fontWeight="bold" color="text.secondary">
              Description
            </Typography>
            <Typography variant="p" width="50%" fontSize="14px" color="text.secondary">
            {product?.description}
            </Typography>
            </Stack>
            <Stack>
            <Typography variant="p" fontSize="16px" fontWeight="bold" color="text.secondary">
              Dosage
            </Typography>
            <Typography variant="p" width="50%" fontSize="14px" color="text.secondary">
           {product?.dosage}
            </Typography>
            </Stack>
          </CardContent>
          <CardActions display="flex" gap="2rem">
          <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        </CardActions>
          <CardActions display="flex" gap="2rem">
          <GButton>Add To Cart</GButton>
          <GButton>Buy Now</GButton>
          </CardActions>

          </Stack>
          <Stack>

</Stack>
</Box>  */}
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
      </Box>
    </Box>
  );
}
