import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
// import Button from '../../components/buttons/Button';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import { UserContext } from '../../context';
import { yupResolver } from '@hookform/resolvers/yup';
import { locationTypeOptions } from '../../dummy-data';
import client from '../../feathers';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../app/styles';
// import { createBandSchema } from './schema';
import { createBandSchema } from './ui-components/schema';
import { createLocationSchema } from './ui-components/schema';
import ModalBox from '../../components/modal';

export const LocationForm = ({ open, setOpen }) => {
  // const { register, handleSubmit,setValue} = useForm();
  const LocationServ = client.service('location');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  // const data = localStorage.getItem('users');
  // const user = JSON.parse(data);
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createLocationSchema),

    // defaultValues: {
    //   name: location.name,
    //   locationType: location.locationType,
    //   facility: user.currentEmployee.facilityDetail._id,
    // },
  });

  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);
    console.log(data);
    await LocationServ.create(data)
      .then((res) => {
        toast.success(`Location successfully created`);
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(`Sorry, You weren't able to create a location. ${err}`);
        setLoading(false);
      });

    setLoading(false);
  };

  return (
    <ModalBox open={open} onClose={setOpen} header="Create Location">
      <form>
        <ToastContainer theme="colored" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            label="Name of Location"
            register={register('name')}
            errorText={errors?.name?.message}
            sx={{ marginBottom: '2rem' }}
          />
          <CustomSelect
            label="Choose Location Type"
            name="locationType"
            options={locationTypeOptions}
            register={register('locationType')}
            sx={{ marginBottom: '2rem' }}
          />
          {/* <Input
            {...register('description')}
            label='Description'
            name='description'
            type='text'

          /> */}
        </div>
        <BottomWrapper>
          <GlobalCustomButton type="submit" onClick={handleSubmit(submit)}>
            <ControlPointIcon fontSize="small" sx={{ marginRight: '5px' }} />
            Create Location
          </GlobalCustomButton>
        </BottomWrapper>
      </form>
    </ModalBox>
  );
};
