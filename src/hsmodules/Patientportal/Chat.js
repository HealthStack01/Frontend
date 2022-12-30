import ChatInterface from "../../components/chat/ChatInterface";
import Box from '@mui/material/Box';


export default function Chat(){
    return(
        <Box overflow="auto" m="5rem" width="80%" height="500px">
            <ChatInterface/>
        </Box>
    )
}