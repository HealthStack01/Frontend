import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import AuthWrapper from '../../components/AuthWrapper';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';
import { Link } from '../../components/menuitem/style';

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function IndividualSignup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.debug(data);

  return (
    <AuthWrapper paragraph="Login here as an organization">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="First Name"
              placeholder="Enter your firstname"
            />
          )}
        />

        {errors.firstName && (
          <p style={{ color: 'blue', fontSize: '16px' }}>
            <> {errors.firstName?.message}</> 
          </p>
        )}
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Last Name"
              placeholder="Enter your lastname"
            />
          )}
        />
        {errors.lastName && (
          <p style={{ color: 'blue', fontSize: '16px' }}>
           <>{errors.lastName?.message}</> 
          </p>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Email" placeholder="Enter your email" />
          )}
        />

        {errors.email && (
          <p style={{ color: 'blue', fontSize: '16px' }}>
           <>  {errors.email?.message}</> 
          </p>
        )}

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Phone Number"
              placeholder="Enter your email"
            />
          )}
        />

        {errors.phoneNumber && (
          <p style={{ color: 'blue', fontSize: '16px' }}>
           <>  {errors.phoneNumber?.message}</> 
          </p>
        )}

        <Controller
          name="password"
          control={control}
          render={({ field }) => <PasswordInput {...field} />}
        />

        {errors.password && (
          <p style={{ color: 'blue', fontSize: '16px' }}>
           <>{errors.password?.message}</> 
          </p>
        )}

        <Button type="submit" label="Signup" fullwidth="true" />
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

        <p style={{ padding: '2rem 0' }}>
          Have an account?
          <Link
            className="nav-link"
            style={{
              padding: '0',
              background: 'transparent',
              color: 'blue',
              marginLeft: '0.6rem',
            }}
            to="/"
          >
            Login
          </Link>
        </p>

        <Link
          className="nav-link"
          style={{
            padding: '16px 32px',
            color: '#333',
            borderRadius: '4px',
            background: '#eeeeee',
            marginLeft: '0.6rem',
            position: 'fixed',
            top: '20px',
            right: '20px',
            textDecoration: 'none',
          }}
          to="/signup"
        >
          Signup as Organization
        </Link>
      </div>
    </AuthWrapper>
  );
}

export default IndividualSignup;
