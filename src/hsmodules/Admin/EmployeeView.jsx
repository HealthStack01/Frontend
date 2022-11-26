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
  GridBox
} from '../app/styles';
import dayjs, { Dayjs } from 'dayjs';
import {
  createEmployeeSchema,
} from './ui-components/schema';
import CustomSelect from '../../components/inputs/basic/Select';
import { bandTypeOptions } from '../../dummy-data';
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

// import { createClientSchema } from "./schema";

const EmployeeView = ({ open, setOpen, employee }) => {
  const EmployeeServ = client.service('employee');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const result = localStorage.getItem('user');
  const user = JSON.parse(result);

  // console.log('Employee>>>>>', employee);

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
          <div style={{width:"100%"}}>
            <h2>Employee Detail</h2>
          </div>
          <BottomWrapper>
          <GlobalCustomButton
          style={{ fontSize: "14px", fontWeight: "600" }}
             onClick={() => handleDelete()}
            color="error"
          >
            <DeleteIcon fontSize="small" sx={{marginRight: "5px"}} />
            Delete Employee
            </GlobalCustomButton>
           
            <GlobalCustomButton
          style={{ fontSize: "14px", fontWeight: "600" }}
           disabled={editing}
           onClick={() => {
             setEditing(!editing);
           }}
          >
             <CreateIcon fontSize="small" sx={{marginRight: "5px"}}/> 
             {`${!editing ? "Edit Employee" : "Cancel Employee"}`}
             
            </GlobalCustomButton>
          </BottomWrapper>
        </HeadWrapper> 
        <form onSubmit={handleSubmit(submit)} >
          <ToastContainer theme='colored' />
          <GridBox>
          {!editing ? (
            <Input
            label="First Name"
            register={register("firstname")}
            defaultValue={employee?.firstname}
          />
          ) : (
            <Input
              label='First Name'
              register={register('firstname')}
              errorText={errors?.firstname?.message}
            />
          )}
          {!editing ? (
            <Input
            label='Middle Name'
            register={register("middlename")}
            defaultValue={employee?.middlename}
          />
          ) : (
            <Input
              label='Middle Name'
              register={register('middlename')}
              errorText={errors?.middlename?.message}
            />
          )}
          {!editing ? (
            <Input
            label='Last Name'
            register={register("lastname")}
            defaultValue={employee?.lastname}
          />
          ) : (
            <Input
              label='Last Name'
              register={register('lastname')}
              errorText={errors?.lastname?.message}
            />
          )}
      </GridBox>
      <GridBox>
          {!editing ? (
            <Input
            label='Profession'
            register={register("profession")}
            defaultValue={employee?.profession}
          />
          ) : (
            <Input
              label='Profession'
              register={register('profession')}
              errorText={errors?.profession?.message}
            />
          )}
          {!editing ? (
           
            <Input
            label='Phone Number'
            register={register("phone")}
            defaultValue={employee?.phone}
          />
            
          ) : (
            <Input
              label='Phone Number'
              register={register('phone')}
              errorText={errors?.phone?.message}
            />
          )}
          {!editing ? (
          
            <Input
            label='Email'
            register={register("email")}
            defaultValue={employee?.email}
          />
          ) : (
            <Input
              label='Email'
              register={register('email')}
              type='email'
              errorText={errors?.email?.message}
            />
          )}
          </GridBox>
          <GridBox>
          {!editing ? (
           
            <Input
            label='Department'
            register={register("department")}
            defaultValue={employee?.department}
          />
          ) : (
            <Input
              label='Department'
              register={register('department')}
              errorText={errors?.department?.message}
            />
          )}
          {!editing ? (
            <Input
            label='Department Unit'
            register={register("depunit")}
            defaultValue={employee?.depunit}
          />
          ) : (
            <Input
              label='Department Unit'
              register={register('depunit')}
              errorText={errors?.depunit?.message}
            />
          )}
        </GridBox>
          {editing && (
            <BottomWrapper>
              <GlobalCustomButton  style={{ fontSize: "18px", fontWeight: "600" }} text='Save Form' type='submit' loading={loading} />
            </BottomWrapper>
          )}
        </form>
        
      </GrayWrapper>
    </PageWrapper>
  );
};

export default EmployeeView;
