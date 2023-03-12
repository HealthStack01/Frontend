import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthWrapper from "../../components/AuthWrapper";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import PasswordInput from "../../components/inputs/basic/Password";
import {useForm} from "react-hook-form";
import client from "../../feathers";
import {toast, ToastContainer} from "react-toastify";
import {yupResolver} from "@hookform/resolvers/yup";
import {createPasswordSchema} from "./schema";
import {Box} from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";

const CreatePassword = () => {
  const ClientServ = client.service("auth-management");

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(createPasswordSchema),

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  let token = "";

  let navigate = useNavigate();
  const submit = async (event, data) => {
    delete data.confirmPassword;
    event.preventDefault();
    setLoading(true);

    await ClientServ.create({
      action: "passwordChange",
      value: {password: data.password, token: token},
      notifierOptions: {},
    })
      .then(res => {
        toast.success(`You have succesfully created an new password`);
        navigate("/", {replace: true});
      })
      .catch(err => {
        toast.error(`Sorry, Unable to create a new password. ${err}`);
      });
    setLoading(false);

    navigate("/create-password", {replace: true});
  };
  return (
    <AuthWrapper paragraph="Reset your Account Password">
      <form onSubmit={handleSubmit(submit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <PasswordInput
            label="Enter new password"
            register={register("password")}
            errors={errors?.password?.message}
          />
          <PasswordInput
            label="Confirm new password"
            register={register("confirmPassword")}
            errors={errors?.confirmPassword?.message}
          />

          <GlobalCustomButton
            loading={loading}
            sx={{width: "100%"}}
            onClick={handleSubmit(submit)}
          >
            Reset Password
          </GlobalCustomButton>
        </Box>

        <p>
          Remember your passowrd?
          <Link
            className="nav-link"
            style={{
              padding: "0",
              background: "transparent",
              color: "blue",
              marginLeft: "0.6rem",
            }}
            to="/"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthWrapper>
  );
};

export default CreatePassword;
