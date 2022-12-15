import AccordionBox from '../../../../components/accordion';
import {Stack,Typography,Box} from '@mui/material'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "../../../../components/buttons/CustomButton"


export default function ClinicalNotes({handleGoBack}){
    return(
        <Stack>
             <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
          p={4}
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
            Clinical Notes
          </Typography>
        </Box>
             <Box width="50%" textAlign="center" px={4}>
             <AccordionBox title="Blood Cancer Treatment">
               <Typography>Both Ulna and Radius bones fractured, significant displacement diagnosed.</Typography>
        </AccordionBox>
             </Box>
        </Stack>
    )
}