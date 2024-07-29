import { useState, useEffect } from 'react';
import ModeEditOutlineOutlined from '@mui/icons-material/ModeEditOutlineOutlined';
import UpgradeOutlined from '@mui/icons-material/UpgradeOutlined';
import { Box, Grid } from '@mui/material';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import GlobalCustomButton from '../../../../components/buttons/CustomButton';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import MuiCustomDatePicker from '../../../../components/inputs/Date/MuiDatePicker';
import { FormsHeaderText } from '../../../../components/texts';

const DealDetailView = () => {
  const { register, reset, control, handleSubmit } = useForm();
  const [editLead, setEditLead] = useState(false);

  const udpateLead = (data) => {
    toast.success('Lead Detail Updated');
    setEditLead(false);
  };

  const initFormState = {
    deal_probability: '90%',
    deal_size: 'Extra Large',
    deal_status: 'Closed',
    deal_next_action: 'Unknown',
    weight_forcast: 'Unknown',
    submission_date: moment().subtract(100, 'days').calendar(),
    closing_date: moment().add(3, 'years').calendar(),
  };

  useEffect(() => {
    reset(initFormState);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
        }}
        mb={1}
      >
        <FormsHeaderText text="Deal Details" />

        {editLead ? (
          <GlobalCustomButton
            color="success"
            onClick={handleSubmit(udpateLead)}
          >
            <UpgradeOutlined fontSize="small" sx={{ marginRight: '5px' }} />
            Update
          </GlobalCustomButton>
        ) : (
          <GlobalCustomButton onClick={() => setEditLead(true)}>
            <ModeEditOutlineOutlined
              fontSize="small"
              sx={{ marginRight: '5px' }}
            />
            Edit
          </GlobalCustomButton>
        )}
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Input
            register={register('deal_probability', { required: true })}
            label="Probability"
            disabled={!editLead}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register('deal_size', { required: true })}
            label="Size"
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={3}>
          <CustomSelect
            register={register('deal_status', { required: true })}
            label="Status"
            options={['Open', 'Closed', 'Pending',"Converted to prospect"]}
            disabled={!editLead}
            defaultValue="Closed"
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register('weight_forcast', { required: true })}
            label="Weight Forcast"
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={4}>
          <MuiCustomDatePicker
            label="Submission Date"
            name="submission_date"
            control={control}
            disabled={true}
          />
        </Grid>

        <Grid item xs={4}>
          <MuiCustomDatePicker
            label="Closing Date"
            name="closing_date"
            control={control}
            disabled={!editLead}
          />
        </Grid>

        <Grid item xs={4}>
          <CustomSelect
            register={register('deal_next_action', { required: true })}
            label="Next Action"
            options={['First', 'Second', 'Third', 'Fourth', 'Completed']}
            disabled={!editLead}
            defaultValue="Completed"
            //placeholder="Enter customer number"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DealDetailView;
