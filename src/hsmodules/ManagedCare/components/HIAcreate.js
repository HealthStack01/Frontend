import {forwardRef} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import House from '../../../assets/images/photoP.svg'
import {FormsHeaderText} from "../../../components/texts";
import CustomSelect from "../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import DownloadIcon from '@mui/icons-material/Download';
import {MdFileDownload} from 'react-icons/md'
// MdFileDownload

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
      {/* ********************************************USER DETAILS SECTION FOR FORM********************************************* */}
      <Box item>
        <FormsHeaderText text="Employers Details" />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Input
              register={register("employers_name", {required: true})}
              label="Employers Name"
              placeholder="Enter your first name here"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              register={register("phone_number", {required: true})}
              label="Phone Number"
              placeholder="Enter phone number"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              register={register("neighbourhood_address", {required: true})}
              label="Neighbourhood"
              placeholder="Enter your residential address line 1 here"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Input
              register={register("address", {required: true})}
              label="Address"
              placeholder="Enter address"
            />
          </Grid>
        </Grid>
      </Box>

      {/* ********************************************ADDRESS SECTION FOR FORM********************************************* */}

      <Box>
        <FormsHeaderText text="Business Contact Details" />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Input
              register={register("contact_name", {required: true})}
              label="Contact Name"
              placeholder="Enter contact name"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              register={register("contact_position", {required: true})}
              label="Contact Position"
              placeholder="Enter contact position"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              register={register("contact_phonenumber", {required: true})}
              label="Contact Phone Number"
              placeholder="Enter contact phone number"
            />
          </Grid>

          
        </Grid>

        {/* ***************************************************************************************** */}

        <Grid container spacing={2}>
        <Grid item xs={7}>
            <Input
              register={register("contact_email", {required: true})}
              label="Contact Email"
              placeholder="Enter contact email"
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <FormsHeaderText text="IT Contact Details" />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              register={register("contact_name", {required: true})}
              label="Contact Name"
              placeholder="Enter contact name"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              register={register("contact_position", {required: true})}
              label="Contact Position"
              type="text"
              placeholder="Enter contact position"
            />
          </Grid>

          <Grid item xs={3}>
            <Input
              register={register("contact_phone", {required: true})}
              label="Contact Phone Number"
              placeholder="Enter contact phone number"
            />
          </Grid>

          <Grid item xs={3}>
            <Input
              register={register("contact_name", {required: true})}
              label="Type"
              options={["TYPE 1", "TYPE 2", "TYPE 3"]}
              placeholder="Select from the options"
            />
          </Grid>
        </Grid>

        {/* ***************************************************************************************** */}

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Input
              register={register("contact_email", {required: true})}
              label="Contact Email"
              type="email"
              placeholder="Enter contact email"
            />
          </Grid>
          <Grid item xs={5}>
            <Input
              register={register("contact_position", {required: true})}
              label= "Bank Account Number"
              type="text"
              placeholder="Enter bank account number"
            />
          </Grid>
        </Grid>

         <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              register={register("contact_phone", {required: true})}
              label="Plan"
              placeholder="Enter plan type"
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              register={register("contact_email", {required: true})}
              label="Policy Number"
              placeholder="Enter policy number"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Input
              register={register("contact_phone", {required: true})}
              label="NHIS Number"
              placeholder="Enter NHIS number"
            />
          </Grid>

          <Grid item xs={4}>
            <Input
              register={register("contact_email", {required: true})}
              label="CIN Number"
              placeholder="Enter CIN number"
             
            />
          </Grid>

          <Grid item xs={4}>
            <MuiCustomDatePicker
                register={register("contact_email", {required: true})}
                label="Registration Date"
            
            //placeholder="Enter customer number"
          />          
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={{position: 'relative', textAlign: 'center' }}>
            <Input
              register={register("employee_list", {required: true})}
              label="List of Employees " 
              style={{width: '100%'}}
            />
            <MdFileDownload style={{position: 'absolute',  top: '0.5rem', height: '2rem', width: '2rem', color: '#1565c0', }} />
            </div>
          </Grid>

          <Grid item xs={6}>
          <div style={{position: 'relative', textAlign: 'center' }}>
            <Input
              register={register("employee_list", {required: true})}
              label="List of Beneficaries " 
              style={{width: '100%'}}
            //   placeholder="Download list"
            />
            <MdFileDownload style={{position: 'absolute',  top: '0.5rem', height: '2rem', width: '2rem', color: '#1565c0', }} />
            </div>
          </Grid>
        </Grid>

      </Box>

      <Box container>
        <FormsHeaderText text="Photo" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src={House} alt='' />
            {/* <Input label="Telestaff name" /> */}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{display: "flex", alignItems: "center"}}>
        <Button
          variant="outlined"
          color="error"
          sx={{
            width: "150px",
            height: "40px",
            textTransform: "capitalize",
            marginRight: "15px",
          }}
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{width: "150px", height: "40px", textTransform: "capitalize"}}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default HiaCreate;
