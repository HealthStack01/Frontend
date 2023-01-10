import {
  Stack,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating
} from '@mui/material';
import Input from '../../../../components/inputs/basic/Input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Product({ product }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(2);

  return (
    <Box>
      <Card
        sx={{ width: '250px', cursor: 'pointer' }}
        onClick={() => navigate(`/app/market-place/buy/${product.id}`)}
      >
        <CardMedia
          component="img"
          width="100%"
          height="192"
          image={product?.img}
          alt={product?.name}
        />
        <CardContent>
          <Stack>
            <Typography
              variant="p"
              fontSize="18px"
              fontWeight="bold"
              color="text.secondary"
            >
              {product?.name}
            </Typography>
          </Stack>
          <Stack>
            <Typography
              variant="p"
              fontSize="16px"
              fontWeight="semibold"
              color="blue"
            >
              {product?.price}
            </Typography>
          </Stack>
          <Stack pt="1rem">
          <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      
                    />
            <Typography
              variant="p"
              fontSize="14px"
              fontWeight="semibold"
              color="text.secondary"
            >
              {product?.review} reviews
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
