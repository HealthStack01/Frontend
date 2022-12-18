import { useState } from 'react';
import {Stack,Box,Typography,Card,CardMedia,CardContent,CardActions,Paper,Grid} from '@mui/material'
import Input from '../../../../components/inputs/basic/Input'
import Product from './product'
import { productData} from './data'

export default function Products(){
    const [products] = useState(productData)


    return(
        <Stack  p="2rem">
            <Stack>
                <Typography variant="h6" color="text.secondary">MarketPlace</Typography>
            </Stack>
            <Box py="1.5rem" width="50%">
            <Input type="search"/>
            </Box>
            <Grid container gap={4}> 
            {products.map(product => (
            <Product product={product} key={product.id} />
          ))}
            </Grid>
        </Stack>
    )
}