import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import AuthWrapper from "../../components/AuthWrapper";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import client from "../../feathers";
import {toast, ToastContainer} from "react-toastify";
import {yupResolver} from "@hookform/resolvers/yup";
import {forgotPasswordSchema} from "./schema";
import axios from "axios";
import GlobalCustomButton from "../../components/buttons/CustomButton";

const ForgotPassword = () => {
  const ClientServ = client.service("auth-management");
  const baseuRL = "https://healthstack-backend.herokuapp.com";

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  let navigate = useNavigate();

  const submit = async (data, event) => {
    event.preventDefault();
    setLoading(true);

    let body = {
      action: "sendResetPwd",
      value: {
        email: data.email,
      },
    };

   /*  axios
      .post(`${baseuRL}/auth-management`, body, {
        headers: {"Content-Type": "application/json"},
      }) */

      ClientServ.create({
        action: 'sendResetPwd',
        value: {
          email: data.email,
          notifierOptions: {}
        },

      })
      .then(response => {
        toast.success(
          `An email has been sent to you for your account password reset`
        );
        navigate("/", {replace: true});
      })
      .catch(err => {
        toast.error(
          `Sorry, An error occured trying to reset your account password ${err}`
        );
        console.log(err)
      });

    setLoading(false);
  };
  return (
    <AuthWrapper paragraph="Forgot your password">
      <form onSubmit={handleSubmit(submit)}>
        <ToastContainer theme="colored" />

        <Input
          label="Email"
          placeholder="Enter your email address"
          register={register("email")}
          errorText={errors?.email?.message}
        />

        <GlobalCustomButton
          loading={loading}
          sx={{marginTop: "15px", width: "100%"}}
          onClick={handleSubmit(submit)}
        >
          Confirm Email
        </GlobalCustomButton>

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

export default ForgotPassword;
