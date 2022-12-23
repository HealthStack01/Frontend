import {Stack,Box,Typography,Card,CardMedia,CardContent
    ,Rating,CardActions,Drawer,Paper,CardHeader,Avatar,IconButton} from '@mui/material'
    
import SearchList from './components/search/SearchItems'
export default function Search(){
    return(
        <Box mx="16rem" my="3rem">   
            <SearchList/>
          </Box>            
    )
}