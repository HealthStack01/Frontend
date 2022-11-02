import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import PasswordInput from '../../components/inputs/basic/Password';

const CreatePassword = () => {
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    navigate('/create-password', { replace: true });
  };
  return (
    <AuthWrapper paragraph='Forgot your password'>
      <form onSubmit={handleSubmit}>
        <PasswordInput label='Enter new password' />
        <PasswordInput label='Confirm new password' />

        <Button
          type='submit'
          label='Create Password'
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
            to='/'
          >
            Login
          </Link>
        </p>
      </form>
    </AuthWrapper>
  );
};

export default CreatePassword;
