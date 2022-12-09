import React, { useState,useContext } from 'react';
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
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {Box} from "@mui/system";
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
  GridBox
} from '../app/styles';
// import { createBandSchema } from './schema';
import { createBandSchema, createEmployeeSchema } from './ui-components/schema';
import ModalBox from '../../components/modal';
import PasswordInput from '../../components/inputs/basic/Password';

export const EmployeeForm = ({ open, setOpen }) => {
  const EmployeeServ = client.service('employee');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(UserContext)

  // const data = localStorage.getItem('user');
  // const user = JSON.parse(data);

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
    <ModalBox open={open} onClose={setOpen} width={"50vw"} header="Create Employee">
      <ToastContainer theme="colored" />
      <Box display="flex" justifyContent="flex-end">
      <GlobalCustomButton type='submit' loading={loading} onClick={handleSubmit(submit)}>
          <ControlPointIcon fontSize="small" sx={{marginRight: "5px"}} />
            Create
          </GlobalCustomButton>
      </Box>
      <form >
        <GridBox>
        <Input
          register={register('firstname')}
          name='firstname'
          type='text'
          label='First Name'
        
          errorText={errors?.firstname?.message}
        />
        <Input
          register={register('middlename')}
          name='middlename'
          type='text'
          label='Middle Name'
          
          errorText={errors?.middlename?.message}
        />
        <Input
          register={register('lastname')}
          name='lastname'
          type='text'
          label='Last Name'
         
          errorText={errors?.lastname?.message}
        />
        </GridBox>
        <GridBox>
        <Input
          register={register('profession')}
          name='profession'
          type='text'
          label='Profession'
         
          errorText={errors?.profession?.message}
        />
        <Input
          register={register('phone')}
          name='phone'
          type='tel'
          label='Phone No'
          errorText={errors?.phone?.message}
        />
        <Input
          register={register('email')}
          name='email'
          type='email'
          label='Email'
          errorText={errors?.email?.message}
        />
</GridBox>
<GridBox>
        <Input
          register={register('department')}
          name='department'
          type='text'
          label='Department'
       
          errorText={errors?.department?.message}
        />
        <Input
          register={register('deptunit')}
          name='deptunit'
          type='text'
          label='Department Unit'
         
          errorText={errors?.deptunit?.message}
        />
        <PasswordInput
          register={register('password')}
          name='password'
          type='text'
          label='Password'
          errorText={errors?.password?.message}
        />
 </GridBox>
      </form>
    </ModalBox>
  );
};
