import {forwardRef} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {BiChevronDown} from 'react-icons/bi';

const DatePickerCustomInput = forwardRef(({value, onClick}, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    style={{
      width: "100%",
      height: "48px",
      border: "1.5px solid #BBBBBB",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      margin: "0.75rem 0",
      fontSize: "0.85rem",
      padding: "0 15px",
      color: "#000000",
      backgroundColor: "#fff",
    }}
  >
    {value === "" ? "Pick Date" : value}
  </div>
));

const HiaCreate = ({closeModal}) => {
  const {register} = useForm();
  return (
    <Box
      container
      sx={{
        width: "800px",
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      <Box item style={{paddingLeft: '8rem'}}>
        <Grid container spacing={2} >
          <Grid item xs={10}>
            <label>To</label>
            <Input
              register={register("employers_name", {required: true})}
              placeholder="Type here"
            />
          </Grid>
         
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={10}>
            <label>Copy</label>
            <Input
              register={register("address", {required: true})}
              placeholder="Type here"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={10}>
            <label>Subject</label>
            <Input
              register={register("address", {required: true})}
              placeholder="Type here"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={10}>
            <label>Category</label>
            <Input
              register={register("address", {required: true})}
              placeholder="Type here"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={10}>
            <label>Complaint</label>
            <Input
              register={register("address", {required: true})}
              placeholder="Type here"
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{display: "flex", alignItems: "center", paddingLeft: '8rem'}}>

        <Button
          variant="contained"
          sx={{width: "150px", height: "40px", textTransform: "capitalize"}}
        >
          OK
        </Button>
      </Box>
    </Box>
  );
};

export default HiaCreate;
