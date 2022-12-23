import React, {useState, useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import BasicDatePicker from "../../components/inputs/Date";
import {ObjectContext, UserContext} from "../../context";
import {yupResolver} from "@hookform/resolvers/yup";
import {bandTypeOptions} from "../../dummy-data";
import client from "../../feathers";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {Box} from "@mui/system";
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
  GridBox,
} from "../app/styles";
// import { createBandSchema } from './schema';
import {createBandSchema, createEmployeeSchema} from "./ui-components/schema";
import ModalBox from "../../components/modal";
import PasswordInput from "../../components/inputs/basic/Password";

export const EmployeeForm = ({open, setOpen}) => {
  const EmployeeServ = client.service("employee");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);

  // const data = localStorage.getItem('user');
  // const user = JSON.parse(data);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: {isSubmitSuccessful, errors},
  } = useForm({
    resolver: yupResolver(createEmployeeSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const submit = async (data, e) => {
    showActionLoader();
    //setLoading(true);
    e.preventDefault();
    setSuccess(false);
    data.createdby = user._id;
    data.facility = user.currentEmployee.facility;

    // facility search search should be implemented,

    await EmployeeServ.create(data)
      .then(res => {
        hideActionLoader();
        toast.success(`Employee successfully created`);
        //setLoading(false);
        setOpen(false);
        reset();
      })
      .catch(err => {
        hideActionLoader();
        toast.error(`Sorry, You weren't able to create a Employee. ${err}`);
      });
    //setLoading(false);
  };

  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <Box sx={{width: "50vw"}}>
      <ToastContainer theme="colored" />
      <Box display="flex" justifyContent="flex-end">
        <GlobalCustomButton
          type="submit"
          //loading={loading}
          onClick={handleSubmit(submit)}
        >
          <ControlPointIcon fontSize="small" sx={{marginRight: "5px"}} />
          Create New Employee
        </GlobalCustomButton>
      </Box>
      <form>
        <GridBox>
          <Input
            register={register("firstname")}
            name="firstname"
            type="text"
            label="First Name"
            errorText={errors?.firstname?.message}
            important
          />
          <Input
            register={register("lastname")}
            name="lastname"
            type="text"
            label="Last Name"
            errorText={errors?.lastname?.message}
            important
          />

          <Input
            register={register("position")}
            name="position"
            type="text"
            label="Position"
            important
            errorText={errors?.position?.message}
          />
        </GridBox>
        <GridBox>
          <Input
            register={register("profession")}
            name="profession"
            type="text"
            label="Profession"
            errorText={errors?.profession?.message}
            important
          />

          <Input
            register={register("phone")}
            name="phone"
            type="tel"
            label="Phone No"
            errorText={errors?.phone?.message}
            important
          />
          <Input
            register={register("email")}
            name="email"
            type="email"
            label="Email"
            errorText={errors?.email?.message}
            important
          />
        </GridBox>
        <GridBox>
          <Input
            register={register("department")}
            name="department"
            type="text"
            label="Department"
            errorText={errors?.department?.message}
            important
          />
          <Input
            register={register("deptunit")}
            name="deptunit"
            type="text"
            label="Department Unit"
            errorText={errors?.deptunit?.message}
          />
          <PasswordInput
            register={register("password")}
            type="text"
            label="Password"
            errorText={errors?.password?.message}
            autoComplete="new-password"
            important
          />
        </GridBox>
      </form>
    </Box>
  );
};
