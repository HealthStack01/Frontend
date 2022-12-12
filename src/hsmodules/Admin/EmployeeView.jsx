import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
// import Button from '../../components/buttons/Button';
import GlobalCustomButton from "../../components/buttons/CustomButton";
import Input from '../../components/inputs/basic/Input';
import ViewText from '../../components/viewtext';
// import { UserContext } from '../../context';
import {UserContext,ObjectContext} from '../../context'
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
import {Box} from "@mui/system";
import {
  createEmployeeSchema,
} from './ui-components/schema';
import CustomSelect from '../../components/inputs/basic/Select';
import { bandTypeOptions } from '../../dummy-data';
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalBox from '../../components/modal';

// import { createClientSchema } from "./schema";

const EmployeeView = ({ open, setOpen, employee }) => {
  const { register, handleSubmit, setValue,reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line 
  const [error, setError] =useState(false)
  // eslint-disable-next-line 
  const [success, setSuccess] =useState(false)
  // eslint-disable-next-line 
  const [message,setMessage] = useState("")
    // const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  // eslint-disable-next-line 
  const EmployeeServ=client.service('employee')
  //const history = useHistory()
   // eslint-disable-next-line
  const {user} = useContext(UserContext)
  const {state,setState} = useContext(ObjectContext)

  // const Employee =state.EmployeeModule.selectedEmployee 

      useEffect(() => {
          setValue("firstname", employee.firstname,  {
              shouldValidate: true,
              shouldDirty: true
          })
          setValue("lastname", employee.lastname,  {
              shouldValidate: true,
              shouldDirty: true
          })
          setValue("profession", employee.profession,  {
              shouldValidate: true,
              shouldDirty: true
          })
          setValue("phone", employee.phone,  {
              shouldValidate: true,
              shouldDirty: true
          })
          setValue("email", employee.email,  {
              shouldValidate: true,
              shouldDirty: true
          })
          setValue("department", employee.department,  {
              shouldValidate: true,
              shouldDirty: true
          })
          setValue("deptunit", employee.deptunit,  {
              shouldValidate: true,
              shouldDirty: true
          })
        /*   setValue("EmployeeCategory", Employee.EmployeeCategory,  {
              shouldValidate: true,
              shouldDirty: true
          }) */
          
          return () => {
              
          }
      },[])

 const handleCancel=async()=>{
  const    newEmployeeModule={
      selectedEmployee:{},
      show :'create'
    }
 await setState((prevstate)=>({...prevstate, EmployeeModule:newEmployeeModule}))
 //console.log(state)
         }


      const changeState =()=>{
      const    newEmployeeModule={
          selectedEmployee:{},
          show :'create'
      }
      setState((prevstate)=>({...prevstate, EmployeeModule:newEmployeeModule}))

      }
  const handleDelete=async()=>{
      let conf=window.confirm("Are you sure you want to delete this data?")
      
      const dleteId=employee._id
      if (conf){
           
      EmployeeServ.remove(dleteId)
      .then((res)=>{
              //console.log(JSON.stringify(res))
              reset();
             /*  setMessage("Deleted Employee successfully")
              setSuccess(true)
              changeState()
             setTimeout(() => {
              setSuccess(false)
              }, 200); */
              toast({
                  message: 'Employee deleted succesfully',
                  type: 'is-success',
                  dismissible: true,
                  pauseOnHover: true,
                })
              changeState()
          })
          .catch((err)=>{
             // setMessage("Error deleting Employee, probable network issues "+ err )
             // setError(true)
              toast({
                  message: "Error deleting Employee, probable network issues or "+ err,
                  type: 'is-danger',
                  dismissible: true,
                  pauseOnHover: true,
                })
          })
      }
  }

      

 /* ()=> setValue("firstName", "Bill", , {
          shouldValidate: true,
          shouldDirty: true
        })) */
  const submit = (data,e) =>{
      e.preventDefault();
      
      setSuccess(false)
      console.log(data)
      data.facility=employee.facility
        //console.log(data);
        
      EmployeeServ.patch(employee._id,data)
      .then((res)=>{
               toast({
                  message: 'Employee updated succesfully',
                  type: 'is-success',
                  dismissible: true,
                  pauseOnHover: true,
                })
                
              changeState()

          })
          .catch((err)=>{
              toast({
                  message: "Error updating Employee, probable network issues or "+ err,
                  type: 'is-danger',
                  dismissible: true,
                  pauseOnHover: true,
                })
          })

    } 
  

  return (
    <PageWrapper>
      <GrayWrapper >
      <ToastContainer theme="colored" />
      <Box>
            <h6 style={{fontSize:"14px"}}>Employee Detail</h6>
          </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center" gap="2rem">
         
          <GlobalCustomButton
             onClick={() => handleDelete()}
            color="error"
          >
            <DeleteIcon fontSize="small" sx={{marginRight: "5px"}} />
            Delete 
            </GlobalCustomButton>
           
          {!editing ?   <GlobalCustomButton
          
           disabled={editing}
           onClick={() => {
             setEditing(!editing);
           }}
          >
             <CreateIcon fontSize="small" sx={{marginRight: "5px"}}/> 
             Edit
             
            </GlobalCustomButton>
: <GlobalCustomButton onClick={handleSubmit(submit)} text='Update' color='success' type='submit'  />}
         
        </Box> 
        <form  >
          <ToastContainer theme='colored' />
          <GridBox>
          {!editing ? (
            <Input
            label="First Name"
            defaultValue={employee?.firstname}
            disabled={!editing}
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
            register={register('middlename')}
            defaultValue={employee?.middlename}
            disabled={!editing}
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

            defaultValue={employee?.lastname}
            disabled={!editing}
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
            
            defaultValue={employee?.profession}
            disabled={!editing}
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
           
            defaultValue={employee?.phone}
            disabled={!editing}
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
            
            defaultValue={employee?.email}
            disabled={!editing}
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
           
            defaultValue={employee?.department}
            disabled={!editing}
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
            
            defaultValue={employee?.deptunit}
            disabled={!editing}
          />
          ) : (
            <Input
              label='Department Unit'
              register={register('deptunit')}
              errorText={errors?.deptunit?.message}
            />
          )}
        </GridBox>
        </form>
    </GrayWrapper>
    </PageWrapper>
  );
};

export default EmployeeView;
