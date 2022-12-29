import {Box,Typography,Stack} from "@mui/material";
import Button from "../../../../components/buttons/CustomButton"
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import {
  useNavigate,
  useParams
} from "react-router-dom"

export const healthCompany = [
  {
    id:1,
    name:"Reliance HMO",
    img:"https://www.reliancehmo.com/img/main_logo.svg"
  },
  {
    id:2,
    name:"Avon HMO",
    img:""
  },
  {
    id: 3,
    name:"MetroHealth HMO",
    img:""
  }
]
export default function HealthInsurance(){
  
   return(
    <Box >
       {/* <Stack pt="2rem">
       <HMOCompany/>
       </Stack> */}
    <Stack display="flex" flexDirection="column" alignItems="center" gap="1rem">
      <HealthAndSafetyIcon sx={{color:"#f4f3ee",fontSize:'450px'}}/>
     <Typography color="gray">You dont have any health insurance plan yet</Typography>
     <Button width="70%" onClick={() => navigate("/app/managed-care/beneficiary")}>Get Insurance Now</Button>
    
     
    </Stack> 
 </Box>
   )
}

export function HMOCompany (){
  const navigate = useNavigate();

  return(
   <Box display="flex" flexDirection="row" justifyContent="center" gap="5rem">
       {healthCompany.map((data,i)=> (
          <Box key={i} onClick={() => navigate(`/app/patient-portal/view/hmo/${data.id}`)} textAlign="center">
            <Box sx={{width:'150px',height:"150px",backgroundColor:"#f4f3ee",borderRadius:"50%"}}>
              <img src={data.img} alt="hmo"/>
            </Box>
          <Typography color="black" variant="p">{data.name}</Typography>
          </Box>
       ))}
   </Box>
  )
}


