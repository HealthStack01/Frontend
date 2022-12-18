import { useState } from 'react'
import {Stack,Box,Typography,Card,CardMedia,CardContent,CardActions,Paper,Grid} from '@mui/material'
import Product from './components/Marketplace/product'
import  ProductDetails  from './components/Marketplace/productDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";
import Products from './components/Marketplace/products';


export default function Buy(){
  const [currentView, setCurrentView] = useState("buy");
 

  const handleGoBack = () => {
    setCurrentView("buy");
  };
  return(
    <Box>
{currentView === "buy" && (
       <BuyItems showMarketPlace={() => setCurrentView("product")} />
       )}

{/* 
   {currentView === "product" && (
        
      )} */}
      
    </Box>
  )
}


export function BuyItems(){
  return(
    <Box>
    {/* <Products/> */}
    <ProductDetails />
 </Box>
  )
}