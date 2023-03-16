import {
  Box,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "../../../../components/buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';

export default function HMOCompanyDetails() {
  const navigate = useNavigate();
  
 
  return (
    <>
    <Box p="1.4rem">
    <Button  onClick={() => navigate("/app/patient-portal/view/hmo")}>
            <ArrowBackIcon />
            Go Back
          </Button>
    </Box>
    <Stack m="1rem" display="flex" flexDirection="column" alignItems="center">
      <Box textAlign="center" py="2rem" width="80%">
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Reliance Health Care
        </Typography>
        <Typography variant="h6" py="1rem">
          Choose between the monthly, quarterly or yearly payment periods and
          select any of our health insurance plans that fit your needs,After
          paying, watch out for the series of emails you’ll get from your no. 1
          HMO in Nigeria, explaining how to use your health plans to stay
          healthy.{" "}
        </Typography>
      </Box>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#03045e",
            width: "250px",
            height: "320px",
            borderRadius: "5px",
          }}
          p="1rem"
        >
          <Stack p="1rem">
            <Typography color="white" fontSize="16px" fontWeight="bold">
              GOLD PLAN
            </Typography>
            <Typography V color="white">
              ₦40.50
            </Typography>
          </Stack>
          <List sx={{color: "white"}}>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
          </List>
          <Stack mt="3rem">
            <Button width="80%">
              Buy Plan
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: "#0096c7",
            width: "250px",
            height: "320px",
            borderRadius: "5px",
          }}
          p="1rem"
        >
          <Stack p="1rem">
            <Typography color="white" fontSize="16px" fontWeight="bold">
              SLIVER PLAN
            </Typography>
            <Typography color="white">₦40.50</Typography>
          </Stack>
          <List sx={{color: "white"}}>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
          </List>
          <Stack mt="3rem">
            <Button width="80%">
              Buy Plan
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: "#007f5f",
            width: "250px",
            height: "320px",
            borderRadius: "5px",
          }}
          p="1rem"
        >
          <Stack p="1rem">
            <Typography color="white" fontSize="16px" fontWeight="bold">
              PREMIUM PLAN
            </Typography>
            <Typography color="white">₦40.50</Typography>
          </Stack>
          <List sx={{color: "white"}}>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <CheckCircleIcon sx={{color: "white"}} />
              </ListItemIcon>
              <ListItemText>Brunch this weekend</ListItemText>
            </ListItem>
          </List>
          <Stack mt="3rem">
            <Button width="80%">
              Buy Plan
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
    </>
  );
}
