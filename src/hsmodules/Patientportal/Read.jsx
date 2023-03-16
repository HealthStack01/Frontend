import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

export default function Read(){
   
    const blogData = [{
        title:"POTS, a debilitating heart condition, is linked to Covid and, to a lesser degree, vaccines",
        subtitle:" The risk of POTS was smaller following vaccination than Covid infection, and more research is needed to confirm the findings."
    },
    {
        title:"POTS, a debilitating heart condition, is linked to Covid and, to a lesser degree, vaccines",
        subtitle:" The risk of POTS was smaller following vaccination than Covid infection, and more research is needed to confirm the findings."
    },
    {
        title:"POTS, a debilitating heart condition, is linked to Covid and, to a lesser degree, vaccines",
        subtitle:" The risk of POTS was smaller following vaccination than Covid infection, and more research is needed to confirm the findings."
    },
]


    return(
        <Box px={4} py={6}>
         <Box py={4}>
         <Typography gutterBottom variant="h5" component="div">
            Read about the latest blogs
          </Typography>
         </Box>
            <Grid container gap={4}>
    {blogData.map((data,index) =>  <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-260x130,f_auto,q_auto:best/rockcms/2022-12/221212-exhausted-woman-bed-stock-mn-1125-3a2f0e.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.subtitle}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card> ) }
      </Grid>
        </Box>
       
    )
}   