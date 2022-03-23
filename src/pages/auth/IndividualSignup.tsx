import React from 'react';

import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';
import { Link } from '../../components/menuitem/style';
import AuthWrapper from '../../helper/AuthWrapper';

import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <AuthWrapper paragraph="Login here as an organization">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("firstName")} label="First Name" placeholder="Enter your first name" />
        <p>{errors.firstName?.message}</p>
        
        <Input {...register("lastName")} label="Last Name" placeholder="Enter your last name" />
        <p>{errors.lastName?.message}</p>
        
        <Input {...register("email")} label="Email address" placeholder="Enter your email" />
        <p>{errors.email?.message}</p>
        
        <Input {...register("phoneNumber")} label="Phone number" placeholder="Enter your phone number" />
        <p>{errors.phoneNumber?.message}</p>
        
        <PasswordInput {...register("password")} onChange={() => {}} />
        <p>{errors.password?.message}</p>

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
