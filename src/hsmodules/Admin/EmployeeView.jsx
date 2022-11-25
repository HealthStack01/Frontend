import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
// import Button from '../../components/buttons/Button';
import GlobalCustomButton from "../../components/buttons/CustomButton";
import Input from '../../components/inputs/basic/Input';
import ViewText from '../../components/viewtext';
import { UserContext } from '../../context';
import client from '../../feathers';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../app/styles';
import dayjs, { Dayjs } from 'dayjs';
import {
  createEmployeeSchema,
} from './ui-components/schema';
import CustomSelect from '../../components/inputs/basic/Select';
import { bandTypeOptions } from '../../dummy-data';
// import { createClientSchema } from "./schema";

const EmployeeView = ({ open, setOpen, employee }) => {
  const EmployeeServ = client.service('employee');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const result = localStorage.getItem('user');
  const user = JSON.parse(result);

  console.log('Employee>>>>>', employee);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createEmployeeSchema),

    defaultValues: {
      firstname: employee?.firstname,
      middlename: employee?.middlename,
      lastname: employee?.lastname,
      profession: employee?.profession,
      phone: employee?.phone,
      email: employee?.email,
      department: employee?.department,
      depunit: employee?.depunit,
      password: employee?.password,
      facility: employee?.facility,
    },
  });

  useEffect(() => {
    reset({
      firstname: employee?.firstname,
      middlename: employee?.middlename,
      lastname: employee?.lastname,
      profession: employee?.profession,
      phone: employee?.phone,
      email: employee?.email,
      department: employee?.department,
      depunit: employee?.depunit,
      password: employee?.password,
      facility: employee?.facility,
    });
  }, []);
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    data.createdby = user._id;
    data.facility = user.currentEmployee.facility;

    await EmployeeServ.patch(employee._id, data)
      .then(res => {
        toast.success(`Employee successfully updated`);
        setLoading(false);
        setOpen(false);
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to updated an employee. ${err}`);
        setLoading(false);
      });

    setLoading(false);
  };

  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');
    const dleteId = employee._id;
    if (conf) {
      EmployeeServ.remove(dleteId)
        .then(res => {
          toast.success(`Employee successfully deleted!`);
          setOpen(false);
        })
        .catch(err => {
          toast.error(`Sorry, Unable to delete employee. ${err}`);
        });
    }
  };

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Employee Detail</h2>
            <span>Employee detail of {employee?.firstname}</span>
          </div>
          <BottomWrapper>
            <GlobalCustomButton
              text='Delete Employee'
              color=''
              onClick={() => handleDelete()}
            />

            <GlobalCustomButton
              text={`${!editing ? 'Edit Employee' : 'Cancel Editing'}`}
              color=''
              showicon
              icon='bi bi-pen-fill'
              disabled={editing}
              onClick={() => {
                setEditing(!editing);
              }}
            />
          </BottomWrapper>
        </HeadWrapper>
        <form onSubmit={handleSubmit(submit)}>
          <ToastContainer theme='colored' />

          {!editing ? (
            <ViewText label='First Name' text={employee?.firstname} />
          ) : (
            <Input
              label='First Name'
              register={register('firstname')}
              errorText={errors?.firstname?.message}
            />
          )}
          {!editing ? (
            <ViewText label='Middle Name' text={employee?.middlename} />
          ) : (
            <Input
              label='Middle Name'
              register={register('middlename')}
              errorText={errors?.middlename?.message}
            />
          )}
          {!editing ? (
            <ViewText label='Last Name' text={employee?.lastname} />
          ) : (
            <Input
              label='Last Name'
              register={register('lastname')}
              errorText={errors?.lastname?.message}
            />
          )}
          {!editing ? (
            <ViewText label='Profession' text={employee?.profession} />
          ) : (
            <Input
              label='Profession'
              register={register('profession')}
              errorText={errors?.profession?.message}
            />
          )}
          {!editing ? (
            <ViewText label='Phone Number' text={employee?.phone} />
          ) : (
            <Input
              label='Phone Number'
              register={register('phone')}
              errorText={errors?.phone?.message}
            />
          )}
          {!editing ? (
            <ViewText label='Email' text={employee?.email} />
          ) : (
            <Input
              label='Email'
              register={register('email')}
              type='email'
              errorText={errors?.email?.message}
            />
          )}
          {!editing ? (
            <ViewText label='Department' text={employee?.department} />
          ) : (
            <Input
              label='Department'
              register={register('department')}
              errorText={errors?.department?.message}
            />
          )}
          {!editing ? (
            <ViewText label='Department Unit' text={employee?.depunit} />
          ) : (
            <Input
              label='Department Unit'
              register={register('depunit')}
              errorText={errors?.depunit?.message}
            />
          )}

          {editing && (
            <BottomWrapper>
              <GlobalCustomButton text='Save Form' type='submit' loading={loading} />
            </BottomWrapper>
          )}
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default EmployeeView;
