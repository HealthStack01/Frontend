import React, {useState} from 'react'
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import {Box, Grid, IconButton,Collapse, Typography,Stack} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Button from "../../../../components/buttons/CustomButton"

export default function Prescription({handleGoBack}){
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return(
      <Stack width="80%" p={4}>
          <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
         
        >
          <Button onClick={handleGoBack}>
            <ArrowBackIcon />
            Go Back
          </Button>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Prescription
          </Typography>
        </Box>
        <Box m="5rem">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          padding: "8px 8px",
          justifyContent: "space-between",
          boxShadow: 2,
          borderRadius: "7.5px",
          cursor:"pointer",
          
        }}
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        
      >
        <Box
          sx={{
            width: "80px",
            display: "flex",
            alignItems: "center",
            borderRight: "1px solid lightgray",
          }}
         
        >
          <Typography sx={{fontSize: "0.85rem", color: "#FCB222"}}>
            Pending
          </Typography>
        </Box>
  
        <Box sx={{width: "calc(100% - 250px)", display: "flex"}} >
          <Box sx={{width: "100%"}}>
          <Typography
                style={{fontSize: "1rem", color: "#000000", marginRight: "3px"}}
              >
              Tabs Paracetamol 1g TDS x 3/7	
              </Typography>
            <Typography sx={{fontSize: "0.90rem", color: "gray"}}>
              1, Capsule After Breakfast
            </Typography>
          </Box>
        </Box>
  
        <IconButton
          size="small"
          sx={{width: "30px", height: "30px"}}
          color="primary"
        >
          <MedicationLiquidIcon fontSize="medium" />
        </IconButton>
        
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <List>
      <Grid container alignItems="center" pb="1rem">
          <Grid item xs>
          <Typography>Drug Name</Typography>
          </Grid>
          <Grid item>
          <Typography color="gray">Tabs Paracetamol 1g TDS x 3/7</Typography>
          </Grid>
          </Grid>
      <Divider light />
      <Grid container alignItems="center" pb="1rem">
          <Grid item xs>
          <Typography>Strength</Typography>
          </Grid>
          <Grid item>
          <Typography color="gray">500mg</Typography>
          </Grid>
          </Grid>
          <Divider light />
          <Grid container alignItems="center" pb="1rem">
          <Grid item xs>
          <Typography>Dosage</Typography>
          </Grid>
          <Grid item>
          <Typography color="gray">1-2 Tablets</Typography>
          </Grid>
          </Grid>
      <Divider light />
      <Grid container alignItems="center" pb="1rem">
          <Grid item xs>
          <Typography>Duration</Typography>
          </Grid>
          <Grid item>
          <Typography color="gray">5 days</Typography>
          </Grid>
          </Grid>
      <Divider light />
      <Box pt="1rem" textAlign="center">
      <Typography paragraph color="gray">
          Take 1-2 tablets every 4-6 hours as required. 
          Do not take more than 8 tablets in 24 hours.
          </Typography>
          <Typography>Dr. Aniebiet Ubaha</Typography>
          <Typography>Doctor</Typography>
      </Box>
    </List>
      </Collapse>
      </Box>
      </Stack>
    )
}