import AccordionBox from '../../../../components/accordion';
import {Stack,Typography} from '@mui/material'


export default function ClinicalNotes(){
    return(
        <Stack>
              <AccordionBox title="Blood Cancer Treatment">
               <Typography>Both Ulna and Radius bones fractured, significant displacement diagnosed.</Typography>
        </AccordionBox>
        </Stack>
    )
}