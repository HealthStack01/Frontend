import { forwardRef } from 'react';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Input from '../../../components/inputs/basic/Input';
import GlobalCustomButton from '../../../components/buttons/CustomButton';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import House from '../../../assets/images/photoP.svg';
import { FormsHeaderText } from '../../../components/texts';
import CustomSelect from '../../../components/inputs/basic/Select';
import BasicDatePicker from '../../../components/inputs/Date';
import MuiCustomDatePicker from '../../../components/inputs/Date/MuiDatePicker';
import Textarea from '../../../components/inputs/basic/Textarea';
import DownloadIcon from '@mui/icons-material/Download';
import { MdFileDownload } from 'react-icons/md';
// MdFileDownload

const DatePickerCustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    style={{
      width: '100%',
      height: '48px',
      border: '1.5px solid #BBBBBB',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      margin: '0.75rem 0',
      fontSize: '0.85rem',
      padding: '0 15px',
      color: '#000000',
      backgroundColor: '#fff',
    }}
  >
    {value === '' ? 'Pick Date' : value}
  </div>
));

const HiaCreate = ({ goBack }) => {
  const { register, control } = useForm();
  return (
    <Box
      container
      sx={{
        width: '80vw',
        maxHeight: '80vh',
        overflow: 'hidden',
        padding: '10px',
      }}
    >
      {/* ********************************************USER DETAILS SECTION FOR FORM********************************************* */}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GlobalCustomButton
            onClick={goBack}
            text="Back"
            color="warning"
            customStyles={{ float: 'right' }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormsHeaderText text="Employers Details" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('employers_name', { required: true })}
                  label="Employers Name"
                  placeholder="Enter your first name here"
                />
              </Box>
              <Box>
                <Input
                  register={register('phone_number', { required: true })}
                  label="Phone Number"
                  placeholder="Enter phone number"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('neighbourhood_address', {
                    required: true,
                  })}
                  label="Neighbourhood"
                  placeholder="Enter your residential address line 1 here"
                />
              </Box>
              <Box>
                <Input
                  register={register('address', { required: true })}
                  label="Address"
                  placeholder="Enter address"
                />
              </Box>
            </Grid>
          </Grid>

          {/* ********************************************ADDRESS SECTION FOR FORM********************************************* */}

          <FormsHeaderText text="Business Contact Details" />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('contact_name', { required: true })}
                  label="Contact Name"
                  placeholder="Enter contact name"
                />
              </Box>
              <Box>
                <Input
                  register={register('contact_position', { required: true })}
                  label="Contact Position"
                  placeholder="Enter contact position"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('contact_phonenumber', { required: true })}
                  label="Contact Phone Number"
                  placeholder="Enter contact phone number"
                />
              </Box>
              <Box>
                <Input
                  register={register('contact_email', { required: true })}
                  label="Contact Email"
                  placeholder="Enter contact email"
                />
              </Box>
            </Grid>
          </Grid>

          {/* ***************************************************************************************** */}

          {/* <Grid container spacing={2}>
          <Grid item xs={7}>
            <Input
              register={register('contact_email', { required: true })}
              label="Contact Email"
              placeholder="Enter contact email"
            />
          </Grid>
        </Grid> */}
          <Box container>
            <FormsHeaderText text="Photo" />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img src={House} alt="" />
                {/* <Input label="Telestaff name" /> */}
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <FormsHeaderText text="IT Contact Details" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('contact_name', { required: true })}
                  label="Contact Name"
                  placeholder="Enter contact name"
                />
              </Box>
              <Box>
                <Input
                  register={register('contact_position', { required: true })}
                  label="Contact Position"
                  type="text"
                  placeholder="Enter contact position"
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('contact_phone', { required: true })}
                  label="Contact Phone Number"
                  placeholder="Enter contact phone number"
                />
              </Box>
              <Box>
                <Input
                  register={register('contact_name', { required: true })}
                  label="Type"
                  options={['TYPE 1', 'TYPE 2', 'TYPE 3']}
                  placeholder="Select from the options"
                />
              </Box>
            </Grid>

            {/* ***************************************************************************************** */}

            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('contact_email', { required: true })}
                  label="Contact Email"
                  type="email"
                  placeholder="Enter contact email"
                />
              </Box>
              <Box>
                <Input
                  register={register('contact_position', { required: true })}
                  label="Bank Account Number"
                  type="text"
                  placeholder="Enter bank account number"
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('contact_phone', { required: true })}
                  label="Plan"
                  placeholder="Enter plan type"
                />
              </Box>
              <Box>
                <Input
                  register={register('contact_email', { required: true })}
                  label="Policy Number"
                  placeholder="Enter policy number"
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box mb={2}>
                <Input
                  register={register('contact_phone', { required: true })}
                  label="NHIS Number"
                  placeholder="Enter NHIS number"
                />
              </Box>

              <Box>
                <Input
                  register={register('contact_email', { required: true })}
                  label="CIN Number"
                  placeholder="Enter CIN number"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  marginBottom: '16px',
                }}
              >
                <Input
                  register={register('employee_list', { required: true })}
                  label="List of Employees "
                  style={{ width: '100%' }}
                />
                <MdFileDownload
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    height: '2rem',
                    width: '2rem',
                    color: '#1565c0',
                  }}
                />
              </div>
              <div style={{ position: 'relative', textAlign: 'center' }}>
                <Input
                  register={register('employee_list', { required: true })}
                  label="List of Beneficaries "
                  style={{ width: '100%' }}
                  placeholder="Download list"
                />
                <MdFileDownload
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    height: '2rem',
                    width: '2rem',
                    color: '#1565c0',
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              marginTop: '1rem',
              gap: '1rem',
            }}
          >
            <GlobalCustomButton
              onClick={goBack}
              variant="outlined"
              color="error"
            >
              <AddCircleOutline fontSize="small" sx={{ marginRight: '5px' }} />
              Cancel
            </GlobalCustomButton>
            <GlobalCustomButton>Submit</GlobalCustomButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HiaCreate;
