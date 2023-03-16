import React, {useState} from 'react'
import { Avatar} from "@mui/material";
import {BiChevronDown} from 'react-icons/bi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BsArrowLeftShort} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {Collapse} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GlobalCustomButton from "../../components/buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatInterface from '../../components/chat/ChatInterface';
const DetailComplaint = () => {
    const [text, setText] = useState('')
    const [isOpen, setIsOpen] = useState(null);

const handleOpen = (clickedIndex) => {
  if (isOpen === clickedIndex) {
    setIsOpen(clickedIndex);
  } else {
    setIsOpen(clickedIndex);
  }
};

    const dummyComplaints = [
        {
            id:0,
            name:"Teejay Teko",
            category: "Medic care",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            status: "Pending",
            date: "27-10-21"
        },
        // {
        //     id:1,
        //     name:"Teejay Teko",
        //     category: "Medic care",
        //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        //     status: "Resolved",
        //     date: "27-10-21"
        // },
        // {
        //     id:2,
        //     name:"Teejay Teko",
        //     category: "Medic care",
        //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        //     status: "Pending",
        //     date: "27-10-21"
        // },
        // {
        //     id:3,
        //     name:"Teejay Teko",
        //     category: "Medic care",
        //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        //     status: "Resolved",
        //     date: "27-10-21"
        // },
      ]
      const navigate = useNavigate();
  return (
    <div >
        <GlobalCustomButton style={{margin: '2rem'}} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
            Go Back
          </GlobalCustomButton>
     {/* <h3 onClick={} ><BsArrowLeftShort style={{height:'1.5rem', width:'1.5rem',fontSize:"1rem"}}/></h3> */}
     <div>
 <div
              style={{
                width: '80%',
                // height: 'calc(100vh - 90px)',
                height: '600px',
                overflow: 'auto',
                margin: '0 auto',
                marginTop: '3rem',
                
                
              }}
            >              {
                dummyComplaints.map((data,index) => ( 
                  <Box>
                  <Card sx={{ maxWidth: "100%",overflow: 'auto', margin:"2rem",boxShadow:'5px 5px 5px 5px rgba(0,0,0,0.12)'}} key={index} onClick={() => handleOpen(index)}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:"space-between" }}>
                      <CardHeader
                  avatar={
                    <Avatar src="/img_avatar.png" alt=""  aria-label="recipe"/>
                  }
                  fontSize="16px" fontWeight="bold"
                  title={
                    <Typography variant="h1" fontSize="16px" fontWeight="bold" color="text.secondary">
                      {data.name}
                  </Typography>
                  }
                  
                  />
                  <CardContent>

                  <Typography variant="h1" fontSize="16px" fontWeight="bold" color="text.secondary">
                  Category: {data.category}
                  </Typography>
                  <Typography style={{color: data.status == 'Pending' ? "#17935C" : "#F1A153", fontWeight: 700, margin: '0.5rem'}} variant="p">
                    {data.status}
                  </Typography>
                  </CardContent>
                  </Box>
                 

                  <CardContent>
                  <Typography  variant="body2" fontSize="14px" color="black">
                     {data.description}
                  </Typography>
                  </CardContent>
                  <CardContent>
                  <Typography variant="h1" fontSize="12px" fontWeight="bold" color="text.secondary">
                     {data.date}
                  </Typography>
                  </CardContent>

                  </Card>
                  <Card sx={{maxWidth: "100%",margin:"3rem"}}>
                  <Collapse in={isOpen === index}>
                    <Box >
                    {/* <ChatInterface/> */}
                 <Box sx={{maxWidth: "100%", height:'100%', padding:"0.2rem",marginBottom:"1rem"}}>
                 <Box style={{width:"100%",display:"flex", flexDirection:"row"}}>
                    <CardHeader
                  avatar={
                    <Avatar src="/img_avatar.png" alt=""  aria-label="recipe"/>
                  }
                  title={
                    <Typography variant="h1" fontWeight="600" fontSize="14px" color="text.secondary">
                      Dr Adewale Idowu
                  </Typography>
                  }
                  />
                    </Box>
                      <Box sx={{background:"blue",padding:"1rem",width:"20%",borderRadius:"2rem",marginLeft:"1rem"}}>
                      <Typography variant="p" fontSize="16px" sx={{color:"white"}}>
                      Hi,i am fyn and you
                  </Typography>
                      </Box>
                    </Box> 
                 
                  <Box sx={{display:"flex", justifyContent:"flex-end",marginRight:"2rem"}}>
                    <Box sx={{maxWidth: "100%", height:'100%', padding:"0.2rem",marginBottom:"2rem"}}>
                 <Box style={{width:"100%"}}>
                    <CardHeader
                  avatar={
                    <Avatar src="/img_avatar.png" alt=""  aria-label="recipe"/>
                  }
                  title={
                    <Typography variant="h1" fontWeight="600" fontSize="14px" color="text.secondary">
                      Dr Adewale Idowu
                  </Typography>
                  }
                  />
                    </Box>
                      <Box sx={{background:"blue",padding:"1rem",width:"100%",borderRadius:"2rem",marginLeft:"1rem"}}>
                      <Typography variant="p" fontSize="16px" sx={{color:"white"}}>
                      Hi,i am fyn and you
                  </Typography>
                      </Box>
                    </Box> 
                    </Box>
                    </Box>
                    <form>
                    <CKEditor editor={ClassicEditor} data={text}/>
                    <GlobalCustomButton sx={{marginTop:"1rem",fontSize:"16px", fontWeight:"600"}} type="submit">Submit
                    </GlobalCustomButton>
                    </form>
                  </Collapse> 
                  </Card>
                  </Box>
                ))
              }
            </div>
     </div>
    </div>
  )
}



export default DetailComplaint


