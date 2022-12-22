import {Stack,Box,Typography,Card,CardMedia,CardContent
    ,Rating,CardActions,Drawer,Paper,CardHeader,Avatar,IconButton} from '@mui/material'
    import Input from '../../components/inputs/basic/Input'
import SearchList from './components/search/SearchItems'
export default function Search(){
    return(
        <Box px="1rem">
             <Box py="1.5rem" width="30%">
            <Input 
            type="search" 
            placeholder="Search..."
            //    onChange={(event) => setSearchFeild(event.target.value)}
               />
            </Box>
            <SearchList/>
</Box>            
    )
}