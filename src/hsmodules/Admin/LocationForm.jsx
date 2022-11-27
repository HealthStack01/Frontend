import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
// import Button from '../../components/buttons/Button';
import GlobalCustomButton from "../../components/buttons/CustomButton";
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import { UserContext } from '../../context';
import { yupResolver } from '@hookform/resolvers/yup';
import { bandTypeOptions } from '../../dummy-data';
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
import ModalBox from '../../components/modal';

export const LocationForm = ({ open, setOpen }) => {
  const LocationServ = client.service('location');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  const data = localStorage.getItem('users');
  const user = JSON.parse(data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createBandSchema),

    defaultValues: {
      name: '',
      locationType: '',
      description: '',
    },
  });
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await LocationServ.create(data)
      .then(res => {
        toast.success(`Location successfully created`);
        setOpen(false);
        reset();
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to create a locationS. ${err}`);
      });
    setLoading(false);
  };
  return (
    <ModalBox open={open} onClose={setOpen}>
      <form onSubmit={handleSubmit(submit)}>
        <ToastContainer theme='colored' />

        <DetailsWrapper title='Create Band' defaultExpanded={true}>
          <Input
            label='Name of Location'
            register={register('name')}
            errorText={errors?.name?.message}
            sx={{marginBottom:"2rem"}}
          />
          <CustomSelect
            label='Choose Location Type'
            name='locationType'
            options={bandTypeOptions}
            register={register('locationType', { required: true })}
            sx={{marginBottom:"2rem"}}
          />
          <Input
            {...register('description', { required: true })}
            label='Description'
            name='description'
            type='text'
            placeholder='Description of Location'
          />

          <BottomWrapper>
          <GlobalCustomButton type='submit' loading={loading}>
          <ControlPointIcon fontSize="small" sx={{marginRight: "5px"}} />
            Create Location
          </GlobalCustomButton>
          </BottomWrapper>
        </DetailsWrapper>
      </form>
    </ModalBox>
  );
};
