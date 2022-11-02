import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import client from '../../feathers';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  // const ClientServ = client.service('auth/management');

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  let navigate = useNavigate();
  const submit = async (data, event) => {
    event.preventDefault();
    setLoading(true);

    await client
      .authenticate({
        strategy: 'local',
        // email,
        // password,
      })
      .then(res => {
        toast.success(`A recovery email has been sent to you`);
        navigate('/create-password', { replace: true });
      })
      .catch(err => {
        toast.error(`Sorry, Unable to reset password. ${err}`);
      });
    setLoading(false);
  };
  return (
    <AuthWrapper paragraph='Forgot your password'>
      <form onSubmit={handleSubmit(submit)}>
        <ToastContainer theme='colored' />

        <Input label='Email' placeholder='Enter your email address' />

        <Button
          type='submit'
          label='Confirm Email'
          fullwidth='true'
          loading={loading}
        />
        <p>
          Remember your passowrd?
          <Link
            className='nav-link'
            style={{
              padding: '0',
              background: 'transparent',
              color: 'blue',
              marginLeft: '0.6rem',
            }}
            to='/login'
          >
            Login
          </Link>
        </p>
      </form>
    </AuthWrapper>
  );
};

export default ForgotPassword;
