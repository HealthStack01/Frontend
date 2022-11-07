import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import { UserContext } from '../../context';
import { yupResolver } from '@hookform/resolvers/yup';
import { bandTypeOptions } from '../../dummy-data';
import client from '../../feathers';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../app/styles';
// import { createBandSchema } from './schema';
import { createBandSchema, createEmployeeSchema } from './ui-components/schema';
import ModalBox from '../../components/modal';
import PasswordInput from '../../components/inputs/basic/Password';

export const EmployeeForm = ({ open, setOpen }) => {
  const EmployeeServ = client.service('employee');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = localStorage.getItem('user');
  const user = JSON.parse(data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(createEmployeeSchema),
  });
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);
    data.createdby = user._id;
    data.facility = user.currentEmployee.facility;

    // facility search search should be implemented,

    await EmployeeServ.create(data)
      .then(res => {
        toast.success(`Employee successfully created`);
        setLoading(false);
        setOpen(false);
        reset();
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to create a Employee. ${err}`);
        setLoading(false);
      });
    setLoading(false);
  };
  return (
    <ModalBox open={open} onClose={setOpen}>
      <p className='card-header-title'>Create Employee</p>

      <form onSubmit={handleSubmit(submit)}>
        <Input
          register={register('firstname')}
          name='firstname'
          type='text'
          label='First Name'
          placeholder='First Name'
          errorText={errors?.firstname?.message}
        />
        <Input
          register={register('middlename')}
          name='middlename'
          type='text'
          label='Middle Name'
          placeholder='Middle Name'
          errorText={errors?.middlename?.message}
        />
        <Input
          register={register('lastname')}
          name='lastname'
          type='text'
          label='Last Name'
          placeholder='Last Name'
          errorText={errors?.lastname?.message}
        />
        <Input
          register={register('profession')}
          name='profession'
          type='text'
          label='Profession'
          placeholder='Profession'
          errorText={errors?.profession?.message}
        />
        <Input
          register={register('phone')}
          name='phone'
          type='tel'
          label='Phone No'
          placeholder='Phone No'
          errorText={errors?.phone?.message}
        />
        <Input
          register={register('email')}
          name='email'
          type='email'
          label='Email'
          placeholder='Email'
          errorText={errors?.email?.message}
        />

        <Input
          register={register('department')}
          name='department'
          type='text'
          label='Department'
          placeholder='Department'
          errorText={errors?.department?.message}
        />
        <Input
          register={register('depunit')}
          name='depunit'
          type='text'
          label='Department Unit'
          placeholder='Department Unit'
          errorText={errors?.depunit?.message}
        />
        <PasswordInput
          register={register('password')}
          name='password'
          type='text'
          label='Password'
          placeholder='Password'
          errorText={errors?.password?.message}
        />

        <BottomWrapper>
          <Button type='submit' loading={loading}>
            Create
          </Button>
        </BottomWrapper>
      </form>
    </ModalBox>
  );
};
