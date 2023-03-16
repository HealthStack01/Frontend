import { useState,useDebugValue } from 'react';
import {
  Stack,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import Input from '../../../../components/inputs/basic/Input';
import Product from './product';
import { productDetailsData } from './data';

export default function Products() {
  const [products] = useState(productDetailsData);
  const [searchFeild, setSearchFeild] = useState('');
  //  const searchFeildValue = useDebugValue(searchFeild);
  const filterProduct =
    products?.length > 0 &&
    products?.filter((data) => {
      if (searchFeild === '') {
        return data;
      } else if (data.name.toLowerCase().includes(searchFeild.toLowerCase())) {
        return data;
      }
    });

  return (
    <Stack p="2rem">
      <Stack>
        <Typography variant="h6" color="text.secondary">
          MarketPlace
        </Typography>
      </Stack>
      <Box py="1.5rem" width="30%">
        <Input
          type="search"
          placeholder="Search..."
          onChange={(event) => setSearchFeild(event.target.value)}
        />
      </Box>
      <div
        style={{
          height: '80vh',
          overflowY: 'scroll',
        }}
      >
        <Grid
          container
          gap={4}
          mb={2}
          sx={{
            paddingBottom: '5rem',
          }}
        >
          {filterProduct.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </Grid>
      </div>
    </Stack>
  );
}
