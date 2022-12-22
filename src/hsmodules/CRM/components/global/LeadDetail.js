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

const LeadDetailView = () => {
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
    deal_next_action: 'Third',
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
        <FormsHeaderText text="Lead Details" />

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
            options={['Open', 'Closed', 'Pending']}
            disabled={!editLead}
            defaultValue="Open"
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
            options={['First', 'Second', 'Third', 'Fourth']}
            disabled={!editLead}
            defaultValue="Second"
            //placeholder="Enter customer number"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LeadDetailView;

export const PageLeadDetailView = () => {
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
    deal_next_action: 'Third',
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
        <FormsHeaderText text="Lead Details" />

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
        <Grid item lg={2} md={4} sm={6} xs={12}>
          <Input
            register={register('deal_probability', { required: true })}
            label="Probability"
            disabled={!editLead}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Input
            register={register('deal_size', { required: true })}
            label="Size"
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={6}>
          <CustomSelect
            label="Status"
            options={['Open', 'Closed', 'Pending']}
            disabled={!editLead}
            control={control}
            name="deal_status"
            required={true}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={8}>
          <Input
            register={register('weight_forcast', { required: true })}
            label="Weight Forcast"
            disabled={!editLead}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={8}>
          <MuiCustomDatePicker
            label="Submission Date"
            name="submission_date"
            control={control}
            disabled={true}
          />
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={6}>
          <MuiCustomDatePicker
            label="Closing Date"
            name="closing_date"
            control={control}
            disabled={!editLead}
          />
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={6}>
          <CustomSelect
            label="Next Action"
            options={['First', 'Second', 'Third', 'Fourth']}
            disabled={!editLead}
            name="deal_next_action"
            control={control}
            required={true}
            //placeholder="Enter customer number"
          />
        </Grid>
      </Grid>
    </>
  );
};
