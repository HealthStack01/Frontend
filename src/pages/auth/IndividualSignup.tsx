import React from 'react';

import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';
import { Link } from '../../components/menuitem/style';
import AuthWrapper from '../../helper/AuthWrapper';

import { Controller, useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
  password: yup.string().required(),
}).required();


function IndividualSignup() {
  const { control, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = (data) => console.log(data);

  return (
    <AuthWrapper paragraph="Login here as an organization">
      <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input {...field} 
                label="First Name" 
                placeholder="Enter your firstname" 
              />
            )}
          />
          <p style={{color: "red", fontSize: "16px" }}>{errors.firstName?.message}</p>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input {...field} 
                label="Last Name" 
                placeholder="Enter your lastname" 
              />
            )}
          />
          <p style={{color: "red", fontSize: "16px" }}>{errors.lastName?.message}</p>
          
          <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} 
                  label="Email" 
                  placeholder="Enter your email" 
                />
              )}
            />
          <p style={{color: "red", fontSize: "16px" }}>{errors.email?.message}</p>

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input {...field} 
                label="Phone Number" 
                placeholder="Enter your email" 
              />
            )}
          />
          <p style={{color: "red", fontSize: "16px" }}>{errors.phoneNumber?.message}</p>

          <Controller
            name="password"
            control={control}
            render={({ field }) => <PasswordInput {...field} />}
          />
          <p style={{color: "red", fontSize: "16px" }}>{errors.password?.message}</p>


        <Button type="submit" label="Signup" fullwidth />
      </form>

      <div className="bottom-center">
        <p>or continue with</p>
        <a href="#">
          <i className="bi bi-google" />
        </a>
        <a href="#">
          <i className="bi bi-facebook" />
        </a>
        <a href="#">
          <i className="bi bi-linkedin" />
        </a>

        <p>
          Want to create organization?
          <Link
            className="nav-link"
            style={{
              padding: '0',
              background: 'transparent',
              color: 'blue',
              marginLeft: '0.6rem',
            }}
            to="/signup"
          >
            Click here
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}

export default IndividualSignup;
