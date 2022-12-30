import { useState } from 'react'
import {Stack,Box,Typography,Card,CardMedia,CardContent,CardActions,Paper,Grid} from '@mui/material'
import Products from './components/Marketplace/products';


export default function Buy(){
  const [currentView, setCurrentView] = useState("buy");

  const handleGoBack = () => {
    setCurrentView("buy");
  };

  return(
    <Box>
       {/* <Products /> */}

      {currentView === "buy" && (
        <Products handleGoBack={handleGoBack} />
      )}
    </Box>
  )
}
